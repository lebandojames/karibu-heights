import React, { useState } from "react";
import { motion } from "framer-motion";
import { IMG } from "@/lib/hotel";
import Reveal from "@/components/site/Reveal";

const ITEMS = [
  { cat: "Rooms", img: IMG.deluxe, alt: "Deluxe room with balcony and floor-to-ceiling glass" },
  { cat: "Rooms", img: IMG.executive, alt: "Executive suite with timber panelling and writing desk" },
  { cat: "Rooms", img: IMG.honeymoon, alt: "Honeymoon suite with canopy bed and stone bathtub" },
  { cat: "Rooms", img: IMG.family, alt: "Family suite with connecting twin bedroom" },
  { cat: "Pool", img: IMG.pool, alt: "Heated infinity pool at golden hour" },
  { cat: "Restaurant", img: IMG.restaurant, alt: "Fine dining table with emerald napkins and gold cutlery" },
  { cat: "Restaurant", img: IMG.breakfast, alt: "Breakfast buffet with tropical fruit and pastries" },
  { cat: "Restaurant", img: IMG.cocktails, alt: "Signature cocktails on a dark stone bar" },
  { cat: "Conference", img: IMG.conference, alt: "Conference hall with upholstered seating and presentation screen" },
  { cat: "Garden", img: IMG.garden, alt: "Tropical gardens with stone pathways" },
  { cat: "Reception", img: IMG.reception, alt: "Double-height reception lobby with timber desk" },
  { cat: "Events", img: IMG.wedding, alt: "Garden wedding setup with floral arch" },
  { cat: "Events", img: IMG.rooftop, alt: "Rooftop lounge with fire pit and skyline views" },
  { cat: "Rooms", img: IMG.presidential, alt: "Presidential suite living area with emerald velvet sofas" },
  { cat: "Pool", img: IMG.gym, alt: "Fitness studio overlooking the gardens" },
  { cat: "Garden", img: IMG.outdoor, alt: "Outdoor terrace dining under festoon lights" },
];

const CATS = ["All", "Rooms", "Pool", "Restaurant", "Conference", "Garden", "Reception", "Events"];

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const shown = cat === "All" ? ITEMS : ITEMS.filter((i) => i.cat === cat);

  return (
    <div className="pt-36 pb-28">
      <div className="shell">
        <div className="kicker text-[#C5A059]">Gallery</div>
        <h1 className="mt-5 text-5xl md:text-7xl">
          The house, <span className="italic text-[#2D5A43]">in light</span>
        </h1>

        <div className="mt-12 flex flex-wrap gap-3">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-6 py-2.5 text-sm border transition-colors ${
                cat === c ? "bg-[#2D5A43] text-[#F9F7F2] border-[#2D5A43]" : "border-black/10 hover:border-[#C5A059]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {shown.map((it, i) => (
            <Reveal key={it.img + i} delay={(i % 3) * 0.05} className="mb-6 break-inside-avoid">
              <button onClick={() => setLightbox(it)} className="block w-full group">
                <div className="rounded-[24px] overflow-hidden">
                  <img
                    src={it.img}
                    alt={it.alt}
                    className={`w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05] ${
                      i % 3 === 1 ? "h-[420px]" : "h-[300px]"
                    }`}
                  />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-[#1A1C1B]/92 grid place-items-center p-6 cursor-zoom-out"
        >
          <img src={lightbox.img} alt={lightbox.alt} className="max-h-[86vh] max-w-full rounded-[24px]" />
        </motion.div>
      )}
    </div>
  );
}