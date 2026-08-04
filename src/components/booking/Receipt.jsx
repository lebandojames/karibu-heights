import React from "react";
import { fmt, priceBreakdown } from "@/lib/hotel";

export default function Receipt({ room, criteria, guest }) {
  const p = priceBreakdown(room, criteria.check_in, criteria.check_out);
  return (
    <div className="rounded-[24px] bg-white border border-black/5 overflow-hidden lg:sticky lg:top-28">
      <img
        src={(room.images && room.images[0]) || ""}
        alt={`${room.name} at Karibu Heights Hotel`}
        className="w-full h-40 object-cover"
      />
      <div className="p-8">
        <div className="kicker text-[#C5A059]">Booking Summary</div>
        <h3 className="mt-4 text-2xl">{room.name}</h3>
        <div className="mt-6 space-y-3 text-sm">
          <Row k="Guest" v={guest?.guest_name || "—"} />
          <Row k="Guests" v={`${criteria.adults} adult${criteria.adults > 1 ? "s" : ""}, ${criteria.children} children`} />
          <Row k="Check-in" v={`${criteria.check_in} · from 14:00`} />
          <Row k="Check-out" v={`${criteria.check_out} · by 11:00`} />
          <Row k="Nights" v={p.nights} />
          <Row k="Price per night" v={fmt(p.rate)} />
          <Row k="Subtotal" v={fmt(p.subtotal)} />
          <Row k="Taxes & levies (16%, demo)" v={fmt(p.taxes)} />
        </div>
        <div className="gold-rule my-6" />
        <div className="flex items-baseline justify-between">
          <span className="kicker text-muted-foreground">Grand Total</span>
          <span className="font-display text-3xl text-[#2D5A43]">{fmt(p.total)}</span>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          No card is charged. Payments are simulated for this demonstration.
        </p>
      </div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between gap-6">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-right">{v}</span>
    </div>
  );
}