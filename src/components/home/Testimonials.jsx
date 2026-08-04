import React from "react";
import { Star } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";

export default function Testimonials({ testimonials = [] }) {
  if (!testimonials.length) return null;
  return (
    <section id="reviews" className="section-pad shell">
      <SectionHeading
        kicker="Guest Reviews"
        title="What our guests"
        italic="take home"
        align="center"
      />
      <div className="mt-16 flex gap-6 overflow-x-auto hide-scrollbar snap-x pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={(i % 3) * 0.08} className="min-w-[86%] sm:min-w-[380px] lg:min-w-0 snap-center">
            <div className="h-full rounded-[24px] bg-white border border-black/5 p-8 flex flex-col">
              <div className="flex gap-1 text-[#C5A059]">
                {Array.from({ length: t.rating || 5 }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-[#C5A059]" />
                ))}
              </div>
              <p className="mt-6 text-base leading-relaxed text-foreground/85 font-display text-xl">
                “{t.review}”
              </p>
              <div className="mt-auto pt-8 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#2D5A43] text-[#F9F7F2] grid place-items-center text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm">{t.guest_name}</div>
                  <div className="text-xs text-muted-foreground">{t.country}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}