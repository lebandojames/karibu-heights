import React from "react";
import { Check } from "lucide-react";

const STEPS = ["Search", "Rooms", "Guest Details", "Summary", "Confirmed"];

export default function StepBar({ step }) {
  return (
    <div className="flex items-center gap-3 md:gap-5 overflow-x-auto hide-scrollbar">
      {STEPS.map((s, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <div key={s} className="flex items-center gap-3 shrink-0">
            <div
              className={`w-8 h-8 rounded-full grid place-items-center text-xs transition-colors ${
                done
                  ? "bg-[#2D5A43] text-[#F9F7F2]"
                  : active
                  ? "bg-[#C5A059] text-[#1A1C1B]"
                  : "bg-black/5 text-muted-foreground"
              }`}
            >
              {done ? <Check className="w-4 h-4" /> : n}
            </div>
            <span className={`text-xs uppercase tracking-[0.16em] ${active ? "text-foreground" : "text-muted-foreground"}`}>
              {s}
            </span>
            {i < STEPS.length - 1 && <div className="w-8 md:w-14 h-px bg-black/10" />}
          </div>
        );
      })}
    </div>
  );
}