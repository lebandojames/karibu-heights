import React from "react";
import { CreditCard, Smartphone, Landmark, Hotel } from "lucide-react";
import Receipt from "./Receipt";
import { PAYMENT_METHODS } from "@/lib/hotel";

const ICONS = {
  card_demo: CreditCard,
  mpesa_demo: Smartphone,
  bank_transfer: Landmark,
  pay_on_arrival: Hotel,
};

export default function SummaryStep({ room, criteria, guest, setGuest, onBack, onConfirm, saving }) {
  const method = guest.payment_method || "pay_on_arrival";

  return (
    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
      <div>
        <h1 className="text-4xl md:text-5xl">
          Review & <span className="italic text-[#2D5A43]">reserve</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-lg">
          One last look. Choose how you'd like to settle — all payment options are
          simulated for this demonstration.
        </p>

        <div className="mt-10 rounded-[24px] bg-white border border-black/5 p-8">
          <div className="kicker text-[#C5A059]">Guest</div>
          <div className="mt-5 grid sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <Row k="Name" v={guest.guest_name} />
            <Row k="Phone" v={guest.phone} />
            <Row k="Email" v={guest.email} />
            <Row k="Country" v={guest.country} />
            {guest.special_requests && (
              <div className="sm:col-span-2">
                <Row k="Special requests" v={guest.special_requests} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-[24px] bg-white border border-black/5 p-8">
          <div className="kicker text-[#C5A059]">Payment method (demo)</div>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((m) => {
              const Icon = ICONS[m.value];
              const active = method === m.value;
              return (
                <button
                  key={m.value}
                  onClick={() => setGuest((g) => ({ ...g, payment_method: m.value }))}
                  className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-sm text-left transition-colors ${
                    active ? "border-[#2D5A43] bg-[#2D5A43]/5" : "border-black/10 hover:border-[#C5A059]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-[#2D5A43]" : "text-[#C5A059]"}`} />
                  {m.label}
                </button>
              );
            })}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            No real payment is processed. Reserve now and settle on arrival, or pay
            later using the reference we generate for you.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onConfirm}
            disabled={saving}
            className="rounded-full bg-[#2D5A43] text-[#F9F7F2] px-9 py-4 text-sm hover:bg-[#244836] disabled:opacity-50 transition-colors"
          >
            {saving ? "Reserving…" : "Reserve Now"}
          </button>
          <button
            onClick={() => {
              setGuest((g) => ({ ...g, payment_method: "pay_on_arrival" }));
              onConfirm();
            }}
            disabled={saving}
            className="rounded-full border border-black/10 px-9 py-4 text-sm hover:border-[#C5A059] disabled:opacity-50 transition-colors"
          >
            Pay Later
          </button>
          <button onClick={onBack} className="text-sm text-[#2D5A43] hover:text-[#C5A059]">
            ← Edit details
          </button>
        </div>
      </div>

      <Receipt room={room} criteria={criteria} guest={guest} />
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div>
      <div className="text-muted-foreground text-xs uppercase tracking-[0.14em]">{k}</div>
      <div className="mt-1">{v || "—"}</div>
    </div>
  );
}