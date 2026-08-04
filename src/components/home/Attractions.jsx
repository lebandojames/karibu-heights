import React from "react";
import { MapPin, Car } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";

const PLACES = [
  { name: "Nairobi National Park", km: "9.4 km", time: "18 min", copy: "Lions and rhino against a city skyline — the only park of its kind." },
  { name: "Karen Blixen Museum", km: "7.1 km", time: "15 min", copy: "The colonial farmhouse of Out of Africa, set in original gardens." },
  { name: "Giraffe Centre", km: "11.2 km", time: "22 min", copy: "Meet the endangered Rothschild's giraffe at eye level." },
  { name: "Karura Forest", km: "8.6 km", time: "20 min", copy: "Waterfalls, caves and 50 km of shaded walking and cycling trails." },
  { name: "Village Market", km: "10.5 km", time: "24 min", copy: "Open-air shopping, crafts and the Friday Masai market." },
  { name: "Westgate Mall", km: "5.8 km", time: "12 min", copy: "Premium retail, cinema and dining a short drive from the ridge." },
];

export default function Attractions() {
  return (
    <section id="attractions" className="section-pad shell">
      <SectionHeading
        kicker="Local Attractions"
        title="Nairobi, within"
        italic="easy reach"
        intro="Distances and drive times from our front door — our concierge arranges every transfer."
      />
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">
        {PLACES.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 0.07}>
            <div className="group border-t border-black/10 py-7 hover:border-[#C5A059] transition-colors">
              <h3 className="text-xl">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.copy}</p>
              <div className="mt-4 flex gap-6 text-xs text-[#2D5A43]">
                <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{p.km}</span>
                <span className="flex items-center gap-2"><Car className="w-3.5 h-3.5" />{p.time} drive</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}