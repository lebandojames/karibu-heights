import React from "react";
import { Link } from "react-router-dom";
import { IMG } from "@/lib/hotel";
import Reveal from "@/components/site/Reveal";

const TILES = [
  { img: IMG.pool, title: "Heated Infinity Pool", to: "/gallery" },
  { img: IMG.conference, title: "Conference & Events", to: "/conference" },
  { img: IMG.gym, title: "Fitness Studio", to: "/gallery" },
  { img: IMG.wedding, title: "Garden Weddings", to: "/conference" },
];

export default function ExperienceStrip() {
  return (
    <section className="pb-24 md:pb-36 shell grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {TILES.map((t, i) => (
        <Reveal key={t.title} delay={i * 0.07}>
          <Link to={t.to} className="group block relative rounded-[24px] overflow-hidden">
            <img
              src={t.img}
              alt={`${t.title} at Karibu Heights Hotel, Nairobi`}
              className="w-full h-[320px] object-cover transition-transform duration-[1400ms] group-hover:scale-[1.08]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1B]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="gold-rule w-10 mb-3" />
              <div className="text-[#F9F7F2] text-lg font-display">{t.title}</div>
            </div>
          </Link>
        </Reveal>
      ))}
    </section>
  );
}