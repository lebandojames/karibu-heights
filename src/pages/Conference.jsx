import React from "react";
import { Link } from "react-router-dom";
import { Users, Wifi, Presentation, Coffee } from "lucide-react";
import { IMG } from "@/lib/hotel";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";

const SPACES = [
  { name: "The Ridge Conference Hall", cap: "320 guests", copy: "Our flagship hall with tiered acoustics, dual projection and a private pre-function foyer.", img: IMG.conference },
  { name: "Acacia Meeting Rooms", cap: "12 – 40 guests", copy: "Four naturally lit boardrooms with writable walls, conference phones and barista service.", img: IMG.reception },
  { name: "Garden Events Lawn", cap: "500 guests", copy: "An open lawn for weddings, launches and gala dinners under festoon lights.", img: IMG.wedding },
];

const PACKAGES = [
  { title: "Corporate Day Package", price: "KES 4,800 per delegate", items: ["Full-day venue hire", "Two tea breaks & buffet lunch", "Projector, screen & flip charts", "Fibre WiFi and technician"] },
  { title: "Business Events Residential", price: "KES 16,500 per delegate", items: ["Overnight accommodation", "All meals & breaks", "Meeting room hire", "Airport transfers"] },
  { title: "Wedding Package", price: "From KES 690,000", items: ["Garden ceremony & reception", "Bridal honeymoon suite", "Five-course plated dinner", "Dedicated events manager"] },
];

export default function Conference() {
  return (
    <div className="pt-36 pb-28">
      <div className="shell">
        <div className="kicker text-[#C5A059]">Conference & Events</div>
        <h1 className="mt-5 text-5xl md:text-7xl max-w-3xl">
          Business, held <span className="italic text-[#2D5A43]">beautifully</span>
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Six flexible spaces, a dedicated events team and highland catering — from
          twelve-person boardrooms to a 500-guest garden lawn.
        </p>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, k: "500", v: "Max capacity" },
            { icon: Presentation, k: "6", v: "Event spaces" },
            { icon: Wifi, k: "1 Gbps", v: "Dedicated fibre" },
            { icon: Coffee, k: "All-day", v: "Barista service" },
          ].map((s, i) => (
            <Reveal key={s.v} delay={i * 0.07}>
              <div className="rounded-[24px] bg-white border border-black/5 p-7">
                <s.icon className="w-5 h-5 text-[#C5A059]" />
                <div className="mt-5 font-display text-3xl text-[#2D5A43]">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.v}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 space-y-8">
          {SPACES.map((s, i) => (
            <Reveal key={s.name} delay={0.05}>
              <div className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                <img
                  src={s.img}
                  alt={`${s.name} at Karibu Heights Hotel, Nairobi`}
                  className="w-full h-[300px] md:h-[400px] object-cover rounded-[24px]"
                />
                <div className="[direction:ltr]">
                  <div className="kicker text-[#C5A059]">{s.cap}</div>
                  <h2 className="mt-4 text-3xl md:text-4xl">{s.name}</h2>
                  <p className="mt-5 text-muted-foreground leading-relaxed">{s.copy}</p>
                  <Link to="/contact" className="mt-7 inline-block text-sm text-[#2D5A43] hover:text-[#C5A059]">
                    Request a proposal →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-28">
          <SectionHeading kicker="Packages" title="Clear pricing," italic="fully inclusive" />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="h-full rounded-[24px] bg-white border border-black/5 p-8 flex flex-col">
                  <h3 className="text-2xl">{p.title}</h3>
                  <div className="mt-3 text-[#C5A059] text-sm">{p.price}</div>
                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                    {p.items.map((it) => (
                      <li key={it} className="border-t border-black/5 pt-3">{it}</li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-auto pt-8 text-sm text-[#2D5A43] hover:text-[#C5A059]"
                  >
                    Enquire about this package →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}