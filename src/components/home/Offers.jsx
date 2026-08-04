import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";

export default function Offers({ offers = [] }) {
  if (!offers.length) return null;
  return (
    <section id="offers" className="section-pad bg-[#F1EEE6]">
      <div className="shell">
        <SectionHeading
          kicker="Special Offers"
          title="Reasons to stay"
          italic="a little longer"
          intro="Available only when you book direct with us — never through an agent."
        />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((o, i) => (
            <Reveal key={o.id} delay={(i % 3) * 0.07}>
              <div className="h-full rounded-[24px] bg-white border border-black/5 p-8 flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <Sparkles className="w-5 h-5 text-[#C5A059]" />
                  <span className="rounded-full bg-[#2D5A43] text-[#F9F7F2] px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase">
                    {o.discount_label}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl">{o.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{o.description}</p>
                <p className="mt-4 text-xs text-muted-foreground/70 italic">{o.terms}</p>
                <Link
                  to="/booking"
                  className="mt-auto pt-7 text-sm text-[#2D5A43] hover:text-[#C5A059] transition-colors"
                >
                  Reserve this offer →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}