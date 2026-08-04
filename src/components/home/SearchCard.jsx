import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { addDays, todayISO } from "@/lib/hotel";
import Reveal from "@/components/site/Reveal";

const field = "w-full bg-transparent text-sm text-foreground outline-none";
const wrap = "flex flex-col gap-1.5 px-5 py-4 md:py-5 border-b md:border-b-0 md:border-r border-black/5 last:border-none";
const label = "kicker text-muted-foreground";

export default function SearchCard({ roomTypes = [] }) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(addDays(todayISO(), 1));
  const [checkOut, setCheckOut] = useState(addDays(todayISO(), 3));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [type, setType] = useState("any");

  const submit = (e) => {
    e.preventDefault();
    const p = new URLSearchParams({ check_in: checkIn, check_out: checkOut, adults, children, type });
    navigate(`/booking?${p.toString()}`);
  };

  return (
    <div className="relative shell -mt-16 md:-mt-20 z-20">
      <Reveal>
        <form
          onSubmit={submit}
          className="rounded-[24px] bg-white shadow-[0_30px_80px_-40px_rgba(26,28,27,0.45)] border border-black/5 grid md:grid-cols-6 overflow-hidden"
        >
          <div className={wrap}>
            <span className={label}>Check-in</span>
            <input
              type="date" className={field} value={checkIn} min={todayISO()}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (e.target.value >= checkOut) setCheckOut(addDays(e.target.value, 1));
              }}
            />
          </div>
          <div className={wrap}>
            <span className={label}>Check-out</span>
            <input
              type="date" className={field} value={checkOut} min={addDays(checkIn, 1)}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className={wrap}>
            <span className={label}>Adults</span>
            <select className={field} value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>)}
            </select>
          </div>
          <div className={wrap}>
            <span className={label}>Children</span>
            <select className={field} value={children} onChange={(e) => setChildren(Number(e.target.value))}>
              {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} Child{n === 1 ? "" : "ren"}</option>)}
            </select>
          </div>
          <div className={wrap}>
            <span className={label}>Room Type</span>
            <select className={field} value={type} onChange={(e) => setType(e.target.value)}>
              <option value="any">Any room</option>
              {roomTypes.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#2D5A43] text-[#F9F7F2] px-6 py-5 text-sm hover:bg-[#244836] transition-colors"
          >
            <Search className="w-4 h-4" /> Search Availability
          </button>
        </form>
      </Reveal>
    </div>
  );
}