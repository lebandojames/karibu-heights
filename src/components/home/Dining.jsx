import React from "react";
import { IMG } from "@/lib/hotel";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";

const VENUES = [
  { img: IMG.breakfast, title: "Breakfast", note: "06:30 – 10:30", copy: "A highland buffet of tropical fruit, warm pastries and single-origin Kenyan coffee.", alt: "Breakfast buffet with tropical fruit, pastries and a Kenyan coffee station" },
  { img: IMG.restaurant, title: "Lunch", note: "12:30 – 15:00", copy: "Light, garden-led plates served beside arched windows overlooking the lawns.", alt: "Fine dining table set with emerald napkins and gold cutlery" },
  { img: IMG.outdoor, title: "Dinner", note: "18:30 – 22:30", copy: "A five-course tasting menu built around Rift Valley produce and coastal seafood.", alt: "Outdoor terrace dining under festoon lights at dusk" },
  { img: IMG.coffee, title: "Coffee", note: "All day", copy: "Estate beans roasted weekly, poured slowly at our timber coffee bar.", alt: "Kenyan single-origin coffee being poured into a ceramic cup" },
  { img: IMG.cocktails, title: "Cocktails", note: "16:00 – 01:00", copy: "Signature pours with dawa honey, tamarind and highland botanicals.", alt: "Two signature cocktails with gold garnish on a dark stone bar" },
  { img: IMG.rooftop, title: "Rooftop Lounge", note: "17:00 – 00:00", copy: "Low emerald seating, a fire pit and the whole Nairobi skyline glowing.", alt: "Rooftop lounge with fire pit overlooking the Nairobi skyline at dusk" },
];

export default function Dining() {
  return (
    <section id="dining" className="section-pad shell">
      <SectionHeading
        kicker="Restaurant & Bars"
        title="Dining that follows"
        italic="the light"
        intro="Six distinct experiences across the day — from first coffee to the last cocktail on the roof."
      />
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {VENUES.map((v, i) => (
          <Reveal key={v.title} delay={(i % 3) * 0.08}>
            <div className="group rounded-[24px] overflow-hidden bg-white border border-black/5">
              <div className="overflow-hidden">
                <Image
                  src={v.img}
                  alt={v.alt}
                  className="w-full h-[240px] object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                  loading="lazy"
                />
              </div>
              <div className="p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl">{v.title}</h3>
                  <span className="kicker text-[#C5A059]">{v.note}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.copy}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}