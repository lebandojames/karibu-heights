import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { IMG } from "@/lib/hotel";

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <motion.img
        src={IMG.exterior}
        alt="Karibu Heights Hotel exterior at dusk with warm light glowing from floor-to-ceiling windows"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1C1B]/70 via-[#1A1C1B]/35 to-[#1A1C1B]/80" />

      <div className="relative z-10 min-h-[100svh] shell flex flex-col justify-between pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease }}
          className="max-w-xl"
        >
          <div className="kicker text-[#C5A059]">Nairobi · Kenya · Est. 2009</div>
          <h1 className="mt-6 text-[15vw] sm:text-[9rem] leading-[0.85] text-[#F9F7F2]">Karibu</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease }}
          className="self-end text-right max-w-xl"
        >
          <h1 className="text-[15vw] sm:text-[9rem] leading-[0.85] italic text-[#F9F7F2]">Heights</h1>
          <p className="mt-6 text-[#F9F7F2]/80 text-base md:text-lg">
            A high-altitude sanctuary of stone, timber and light — where the calm of
            the Kenyan highlands meets a quietly flawless standard of service.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 justify-end">
            <Link
              to="/booking"
              className="rounded-full bg-[#2D5A43] text-[#F9F7F2] px-8 py-4 text-sm hover:bg-[#244836] transition-colors"
            >
              Book Your Stay
            </Link>
            <Link
              to="/rooms"
              className="rounded-full border border-[#F9F7F2]/40 text-[#F9F7F2] px-8 py-4 text-sm hover:bg-[#F9F7F2]/10 transition-colors"
            >
              View Rooms
            </Link>
          </div>
        </motion.div>

        <div className="flex items-center gap-3 text-[#F9F7F2]/50 text-xs kicker">
          <ArrowDownRight className="w-4 h-4" /> Check availability
        </div>
      </div>
    </section>
  );
}