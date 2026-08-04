import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { BedDouble, Check, Maximize, Users } from "lucide-react";
import AvailabilityCalendar from "@/components/rooms/AvailabilityCalendar";
import Reveal from "@/components/site/Reveal";
import { fmt } from "@/lib/hotel";

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [active, setActive] = useState(0);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      const all = await base44.entities.Room.list("sort_order");
      const found = all.find((r) => r.id === id);
      if (!found) return setNotFound(true);
      setRoom(found);
      const [b, bl] = await Promise.all([
        base44.entities.Booking.filter({ room_id: id }, "-created_date", 20),
        base44.entities.RoomBlock.filter({ room_id: id }, "-created_date", 20),
      ]);
      setBookings(b);
      setBlocks(bl);
    })();
  }, [id]);

  if (notFound) {
    return (
      <div className="pt-40 pb-28 shell text-center">
        <h1 className="text-4xl">Room not found</h1>
        <Link to="/rooms" className="mt-6 inline-block text-[#2D5A43]">← All rooms & suites</Link>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="w-8 h-8 border-2 border-black/10 border-t-[#2D5A43] rounded-full animate-spin" />
      </div>
    );
  }

  const images = room.images || [];

  return (
    <div className="pt-28 pb-28">
      <div className="shell">
        <Link to="/rooms" className="text-sm text-[#2D5A43] hover:text-[#C5A059]">← Rooms & Suites</Link>

        <div className="mt-8 grid lg:grid-cols-[1.6fr_1fr] gap-6">
          <div className="rounded-[24px] overflow-hidden">
            <img
              src={images[active]}
              alt={`${room.name} at Karibu Heights Hotel — view ${active + 1}`}
              className="w-full h-[380px] md:h-[560px] object-cover"
            />
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-2 gap-4 content-start">
            {images.map((img, i) => (
              <button
                key={img + i}
                onClick={() => setActive(i)}
                className={`rounded-2xl overflow-hidden border-2 transition-colors ${
                  active === i ? "border-[#C5A059]" : "border-transparent"
                }`}
              >
                <img src={img} alt={`${room.name} gallery thumbnail ${i + 1}`} className="w-full h-24 lg:h-32 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start">
          <div>
            <div className="kicker text-[#C5A059]">{room.tagline}</div>
            <h1 className="mt-5 text-4xl md:text-6xl">{room.name}</h1>
            <div className="gold-rule w-28 mt-7" />
            <p className="mt-8 text-lg text-foreground/80 leading-relaxed">{room.description}</p>
            <p className="mt-5 text-muted-foreground leading-relaxed">{room.long_description}</p>

            <div className="mt-12 grid sm:grid-cols-3 gap-6">
              <Spec icon={Maximize} label="Room size" value={`${room.size_sqm} m²`} />
              <Spec icon={BedDouble} label="Bed" value={room.bed_type} />
              <Spec icon={Users} label="Maximum guests" value={room.max_guests} />
            </div>

            <h2 className="mt-16 text-3xl">Amenities</h2>
            <div className="mt-7 grid sm:grid-cols-2 gap-y-3 gap-x-8">
              {(room.amenities || []).map((a) => (
                <div key={a} className="flex items-start gap-3 text-sm">
                  <Check className="w-4 h-4 mt-1 text-[#2D5A43]" /> {a}
                </div>
              ))}
            </div>

            <h2 className="mt-16 text-3xl">Policies</h2>
            <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
              {(room.policies || []).map((p) => (
                <li key={p} className="border-t border-black/10 pt-3">{p}</li>
              ))}
            </ul>
          </div>

          <Reveal className="lg:sticky lg:top-28 space-y-6">
            <div className="rounded-[24px] bg-white border border-black/5 p-8">
              <div className="kicker text-muted-foreground">From</div>
              <div className="mt-2 font-display text-4xl text-[#2D5A43]">{fmt(room.price_per_night)}</div>
              <div className="text-xs text-muted-foreground mt-1">per night, taxes extra</div>
              <Link
                to={`/booking?room=${room.id}`}
                className="mt-7 block text-center rounded-full bg-[#2D5A43] text-[#F9F7F2] px-6 py-4 text-sm hover:bg-[#244836] transition-colors"
              >
                Check Availability & Book
              </Link>
            </div>
            <AvailabilityCalendar room={room} bookings={bookings} blocks={blocks} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="border-t border-black/10 pt-5">
      <Icon className="w-5 h-5 text-[#C5A059]" />
      <div className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg">{value}</div>
    </div>
  );
}