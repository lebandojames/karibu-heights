import React from "react";
import { Link } from "react-router-dom";
import { Maximize, Users, BedDouble } from "lucide-react";
import { fmt } from "@/lib/hotel";
import { Image } from "@/components/ui/image";

export default function RoomCard({ room, footer, query = "" }) {
  return (
    <article className="group rounded-[24px] bg-white border border-black/5 overflow-hidden flex flex-col shadow-[0_20px_60px_-45px_rgba(26,28,27,0.5)] hover:shadow-[0_30px_80px_-40px_rgba(26,28,27,0.4)] transition-shadow duration-500">
      <div className="relative overflow-hidden">
        <Image
          src={(room.images && room.images[0]) || ""}
          alt={`${room.name} at Karibu Heights Hotel, Nairobi`}
          className="w-full h-[260px] md:h-[300px] object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 rounded-full glass px-4 py-1.5 text-[11px] tracking-[0.14em] uppercase">
          {fmt(room.price_per_night)} / night
        </div>
      </div>
      <div className="p-7 flex flex-col flex-1">
        <h3 className="text-2xl">{room.name}</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {room.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-2"><Maximize className="w-3.5 h-3.5 text-[#C5A059]" />{room.size_sqm} m²</span>
          <span className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-[#C5A059]" />Up to {room.max_guests}</span>
          <span className="flex items-center gap-2"><BedDouble className="w-3.5 h-3.5 text-[#C5A059]" />{room.bed_type}</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {(room.amenities || []).slice(0, 4).map((a) => (
            <span key={a} className="rounded-full bg-[#F1EEE6] px-3 py-1 text-[11px] text-foreground/70">{a}</span>
          ))}
        </div>
        <div className="mt-auto pt-7">
          {footer || (
            <div className="flex gap-3">
              <Link
                to={`/booking?room=${room.id}${query}`}
                className="flex-1 text-center rounded-full bg-[#2D5A43] text-[#F9F7F2] px-5 py-3 text-sm hover:bg-[#244836] transition-colors"
              >
                Book Now
              </Link>
              <Link
                to={`/rooms/${room.id}`}
                className="flex-1 text-center rounded-full border border-black/10 px-5 py-3 text-sm hover:border-[#C5A059] hover:text-[#2D5A43] transition-colors"
              >
                View Details
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}