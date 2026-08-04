import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dayStatus, todayISO, toISO } from "@/lib/hotel";

const DOW = ["M", "T", "W", "T", "F", "S", "S"];

const STYLES = {
  available: "bg-[#2D5A43]/10 text-[#2D5A43]",
  booked: "bg-black/5 text-muted-foreground line-through",
  maintenance: "bg-[#C5A059]/20 text-[#8a6c2f] line-through",
  past: "text-muted-foreground/35",
};

export default function AvailabilityCalendar({ room, bookings = [], blocks = [] }) {
  const now = new Date();
  const [cursor, setCursor] = useState({ y: now.getFullYear(), m: now.getMonth() });

  const first = new Date(cursor.y, cursor.m, 1);
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const lead = (first.getDay() + 6) % 7;
  const today = todayISO();

  const shift = (d) => {
    const nd = new Date(cursor.y, cursor.m + d, 1);
    setCursor({ y: nd.getFullYear(), m: nd.getMonth() });
  };

  return (
    <div className="rounded-[24px] bg-white border border-black/5 p-7">
      <div className="flex items-center justify-between">
        <div className="kicker text-[#C5A059]">Availability</div>
        <div className="flex items-center gap-2">
          <button onClick={() => shift(-1)} aria-label="Previous month" className="p-2 rounded-full hover:bg-black/5">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm w-36 text-center">
            {first.toLocaleString("en-GB", { month: "long", year: "numeric" })}
          </span>
          <button onClick={() => shift(1)} aria-label="Next month" className="p-2 rounded-full hover:bg-black/5">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1.5 text-center">
        {DOW.map((d, i) => (
          <div key={i} className="text-[10px] uppercase tracking-widest text-muted-foreground py-1">{d}</div>
        ))}
        {Array.from({ length: lead }).map((_, i) => <div key={`l${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const iso = toISO(new Date(cursor.y, cursor.m, i + 1));
          const past = iso < today;
          const status = past ? "past" : dayStatus(room, iso, bookings, blocks);
          return (
            <div
              key={iso}
              title={past ? "Past date" : status}
              className={`aspect-square grid place-items-center rounded-xl text-sm ${STYLES[status]}`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <Legend cls="bg-[#2D5A43]/40" label="Available" />
        <Legend cls="bg-black/15" label="Booked" />
        <Legend cls="bg-[#C5A059]/60" label="Maintenance" />
      </div>
    </div>
  );
}

function Legend({ cls, label }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${cls}`} /> {label}
    </span>
  );
}