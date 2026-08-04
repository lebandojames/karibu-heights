import React from "react";
import { Search } from "lucide-react";
import { addDays, nightsBetween, todayISO } from "@/lib/hotel";

const wrap = "flex flex-col gap-2 rounded-2xl border border-black/10 px-5 py-4 focus-within:border-[#2D5A43] transition-colors";
const label = "kicker text-muted-foreground";
const field = "w-full bg-transparent text-base outline-none";

export default function SearchStep({ criteria, setCriteria, rooms, onSearch }) {
  const set = (k, v) => setCriteria((c) => ({ ...c, [k]: v }));
  const nights = nightsBetween(criteria.check_in, criteria.check_out);

  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
      <div>
        <h1 className="text-4xl md:text-5xl">
          Select your <span className="italic text-[#2D5A43]">dates</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-lg">
          Tell us when you're arriving and who's travelling. We'll show only the
          rooms genuinely available for those nights.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <div className={wrap}>
            <span className={label}>Check-in</span>
            <input
              type="date" className={field} value={criteria.check_in} min={todayISO()}
              onChange={(e) => {
                set("check_in", e.target.value);
                if (e.target.value >= criteria.check_out) set("check_out", addDays(e.target.value, 1));
              }}
            />
          </div>
          <div className={wrap}>
            <span className={label}>Check-out</span>
            <input
              type="date" className={field} value={criteria.check_out}
              min={addDays(criteria.check_in, 1)}
              onChange={(e) => set("check_out", e.target.value)}
            />
          </div>
          <div className={wrap}>
            <span className={label}>Adults</span>
            <select className={field} value={criteria.adults} onChange={(e) => set("adults", Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className={wrap}>
            <span className={label}>Children</span>
            <select className={field} value={criteria.children} onChange={(e) => set("children", Number(e.target.value))}>
              {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className={`${wrap} sm:col-span-2`}>
            <span className={label}>Room type</span>
            <select className={field} value={criteria.type} onChange={(e) => set("type", e.target.value)}>
              <option value="any">Any room or suite</option>
              {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={onSearch}
          disabled={nights < 1}
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#2D5A43] text-[#F9F7F2] px-9 py-4 text-sm hover:bg-[#244836] disabled:opacity-40 transition-colors"
        >
          <Search className="w-4 h-4" /> Search Availability
        </button>
      </div>

      <aside className="rounded-[24px] bg-white border border-black/5 p-8">
        <div className="kicker text-[#C5A059]">Your search</div>
        <div className="mt-6 space-y-4 text-sm">
          <Row k="Arrival" v={criteria.check_in} />
          <Row k="Departure" v={criteria.check_out} />
          <Row k="Nights" v={nights} />
          <Row k="Guests" v={`${criteria.adults} adult${criteria.adults > 1 ? "s" : ""}, ${criteria.children} children`} />
        </div>
        <div className="gold-rule mt-8" />
        <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
          Booking direct includes highland breakfast for two, complimentary WiFi
          and free cancellation up to 48 hours before arrival.
        </p>
      </aside>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between gap-6 border-b border-black/5 pb-3">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-foreground">{v}</span>
    </div>
  );
}