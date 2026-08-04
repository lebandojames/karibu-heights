import React from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import RoomCard from "@/components/rooms/RoomCard";

export default function RoomsPreview({ rooms = [] }) {
  return (
    <section id="rooms" className="section-pad shell">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          kicker="Rooms & Suites"
          title="Six ways to"
          italic="settle in"
          intro="Every room opens to light and air — from our serene Standard rooms to the sweeping Presidential Suite."
        />
        <Reveal>
          <Link
            to="/rooms"
            className="rounded-full border border-black/10 px-7 py-3.5 text-sm hover:border-[#C5A059] hover:text-[#2D5A43] transition-colors"
          >
            All Rooms & Suites
          </Link>
        </Reveal>
      </div>
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.slice(0, 3).map((r, i) => (
          <Reveal key={r.id} delay={i * 0.1}>
            <RoomCard room={r} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}