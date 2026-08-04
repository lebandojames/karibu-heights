import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import RoomCard from "@/components/rooms/RoomCard";
import Reveal from "@/components/site/Reveal";
import { IMG } from "@/lib/hotel";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    base44.entities.Room.filter({ status: "active" }, "sort_order").then(setRooms);
  }, []);

  return (
    <>
      <section className="relative h-[58vh] min-h-[420px] overflow-hidden">
        <img
          src={IMG.deluxe}
          alt="Deluxe room with hardwood floors opening onto a balcony with floor-to-ceiling glass"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1A1C1B]/60" />
        <div className="relative shell h-full flex flex-col justify-end pb-16">
          <div className="kicker text-[#C5A059]">Accommodation</div>
          <h1 className="mt-5 text-5xl md:text-7xl text-[#F9F7F2]">
            Rooms & <span className="italic">Suites</span>
          </h1>
          <p className="mt-5 max-w-xl text-[#F9F7F2]/75">
            Six categories, each with its own light, outlook and rhythm — all with
            highland breakfast and complimentary WiFi included.
          </p>
        </div>
      </section>

      <section className="section-pad shell grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((r, i) => (
          <Reveal key={r.id} delay={(i % 3) * 0.08}>
            <RoomCard room={r} />
          </Reveal>
        ))}
      </section>
    </>
  );
}