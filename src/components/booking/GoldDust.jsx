import React from "react";
import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 0.8,
  size: 3 + Math.random() * 5,
}));

export default function GoldDust() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[#C5A059]"
          style={{ left: `${p.x}%`, width: p.size, height: p.size }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0] }}
          transition={{ duration: 2.6, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}