import React from "react";
import {
  Wifi, Waves, UtensilsCrossed, Presentation, Flower2, Dumbbell, CircleParking,
  Plane, Shirt, BedDouble, ConciergeBell, Clock,
} from "lucide-react";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";

const ITEMS = [
  { icon: Wifi, label: "Free WiFi", note: "Fibre throughout" },
  { icon: Waves, label: "Swimming Pool", note: "Heated infinity" },
  { icon: UtensilsCrossed, label: "Restaurant", note: "Farm to table" },
  { icon: Presentation, label: "Conference Facilities", note: "Up to 320 guests" },
  { icon: Flower2, label: "Spa", note: "Highland rituals" },
  { icon: Dumbbell, label: "Gym", note: "Open 05:00–23:00" },
  { icon: CircleParking, label: "Free Parking", note: "Secure basement" },
  { icon: Plane, label: "Airport Transfer", note: "JKIA & Wilson" },
  { icon: Shirt, label: "Laundry", note: "Same-day press" },
  { icon: BedDouble, label: "Daily Housekeeping", note: "Twice daily turndown" },
  { icon: ConciergeBell, label: "Room Service", note: "In-suite dining" },
  { icon: Clock, label: "24 Hour Reception", note: "Always awake" },
];

export default function Amenities() {
  return (
    <section id="amenities" className="section-pad bg-[#141615]">
      <div className="shell">
        <SectionHeading
          light
          kicker="Hotel Amenities"
          title="Everything considered,"
          italic="nothing announced"
          intro="Twelve standards we hold quietly, every day of the year."
        />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {ITEMS.map((it, i) => (
            <Reveal key={it.label} delay={(i % 4) * 0.06}>
              <div className="group border-t border-white/10 pt-6">
                <it.icon className="w-6 h-6 text-[#C5A059] transition-transform duration-500 group-hover:-translate-y-1" />
                <div className="mt-4 text-[#F9F7F2] text-base">{it.label}</div>
                <div className="mt-1 text-xs text-[#F9F7F2]/45">{it.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}