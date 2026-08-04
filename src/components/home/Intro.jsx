import React from "react";
import { IMG } from "@/lib/hotel";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";

const STATS = [
  { k: "62", v: "Rooms & Suites" },
  { k: "4.9", v: "Guest Rating" },
  { k: "12", v: "Minutes to CBD" },
  { k: "24/7", v: "Reception" },
];

export default function Intro() {
  return (
    <section className="section-pad shell grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      <div>
        <SectionHeading
          kicker="The Property"
          title="A quiet grandeur,"
          italic="rooted in Kenya"
          intro="Karibu Heights was built around a single idea: that true luxury is unhurried. Local stone, hand-finished timber and vast panes of glass frame the ridge, the gardens and the distant city — while our team keeps everything else invisible."
        />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.v} delay={i * 0.08}>
              <div className="font-display text-4xl text-[#2D5A43]">{s.k}</div>
              <div className="mt-2 text-xs text-muted-foreground uppercase tracking-[0.16em]">{s.v}</div>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Reveal className="col-span-2">
          <img
            src={IMG.reception}
            alt="Double-height reception lobby with carved timber desk and woven pendant lights at Karibu Heights"
            className="w-full h-[300px] md:h-[360px] object-cover rounded-[24px]"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <img
            src={IMG.garden}
            alt="Manicured tropical gardens with stone pathways at Karibu Heights Hotel"
            className="w-full h-[200px] object-cover rounded-[24px]"
          />
        </Reveal>
        <Reveal delay={0.18}>
          <img
            src={IMG.spa}
            alt="Stone massage table with rising steam in the Karibu Heights spa"
            className="w-full h-[200px] object-cover rounded-[24px]"
          />
        </Reveal>
      </div>
    </section>
  );
}