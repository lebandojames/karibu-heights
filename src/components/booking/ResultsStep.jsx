import React from "react";
import { Link } from "react-router-dom";
import { CalendarX } from "lucide-react";
import RoomCard from "@/components/rooms/RoomCard";
import Reveal from "@/components/site/Reveal";
import { fmt, nightsBetween, priceBreakdown } from "@/lib/hotel";

export default function ResultsStep({ criteria, results, onSelect, onBack }) {
  const nights = nightsBetween(criteria.check_in, criteria.check_out);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl">
            Available <span className="italic text-[#2D5A43]">rooms</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            {criteria.check_in} → {criteria.check_out} · {nights} night{nights > 1 ? "s" : ""} ·{" "}
            {criteria.adults + criteria.children} guest{criteria.adults + criteria.children > 1 ? "s" : ""}
          </p>
        </div>
        <button onClick={onBack} className="text-sm text-[#2D5A43] hover:text-[#C5A059]">
          ← Change dates
        </button>
      </div>

      {!results.length && (
        <div className="mt-14 rounded-[24px] bg-white border border-black/5 p-12 text-center">
          <CalendarX className="w-8 h-8 mx-auto text-[#C5A059]" />
          <h2 className="mt-6 text-2xl">No rooms available for those nights</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Try shifting your dates by a day or two, or reduce the number of guests.
          </p>
          <button onClick={onBack} className="mt-8 rounded-full bg-[#2D5A43] text-[#F9F7F2] px-8 py-3.5 text-sm">
            Adjust search
          </button>
        </div>
      )}

      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map(({ room, remaining }, i) => {
          const p = priceBreakdown(room, criteria.check_in, criteria.check_out);
          return (
            <Reveal key={room.id} delay={(i % 3) * 0.08}>
              <RoomCard
                room={room}
                footer={
                  <div>
                    <div className="flex items-baseline justify-between border-t border-black/5 pt-5">
                      <div>
                        <div className="text-xl">{fmt(room.price_per_night)}</div>
                        <div className="text-[11px] text-muted-foreground uppercase tracking-[0.14em]">per night</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#2D5A43]">{fmt(p.total)} total</div>
                        <div className="text-[11px] text-[#C5A059]">
                          {remaining} room{remaining > 1 ? "s" : ""} left
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => onSelect(room)}
                        className="flex-1 rounded-full bg-[#2D5A43] text-[#F9F7F2] px-5 py-3 text-sm hover:bg-[#244836] transition-colors"
                      >
                        Book Now
                      </button>
                      <Link
                        to={`/rooms/${room.id}`}
                        className="flex-1 text-center rounded-full border border-black/10 px-5 py-3 text-sm hover:border-[#C5A059] transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                }
              />
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}