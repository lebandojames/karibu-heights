import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Mail, MessageCircle } from "lucide-react";
import GoldDust from "./GoldDust";
import { HOTEL, fmt } from "@/lib/hotel";

export default function ConfirmationStep({ booking, onEmail, emailState }) {
  const [showDust] = useState(true);
  const waText = encodeURIComponent(
    `Hello Karibu Heights, I have reserved ${booking.room_name} from ${booking.check_in} to ${booking.check_out}. My booking reference is ${booking.reference}.`
  );

  return (
    <div className="relative max-w-3xl mx-auto text-center">
      {showDust && <GoldDust />}
      <div className="w-14 h-14 rounded-full bg-[#2D5A43] text-[#F9F7F2] grid place-items-center mx-auto">
        <Check className="w-6 h-6" />
      </div>
      <div className="kicker text-[#C5A059] mt-8">Reservation Confirmed</div>
      <h1 className="mt-5 text-4xl md:text-6xl">
        Karibu, <span className="italic text-[#2D5A43]">{(booking.guest_name || "").split(" ")[0]}</span>
      </h1>
      <p className="mt-5 text-muted-foreground">
        Your room is held. Please quote this reference in any correspondence.
      </p>

      <div className="mt-10 rounded-[24px] bg-white border border-black/5 p-10">
        <div className="kicker text-muted-foreground">Booking Reference</div>
        <div className="mt-3 font-display text-4xl md:text-5xl text-[#1A1C1B] tracking-wide">
          {booking.reference}
        </div>
        <div className="gold-rule my-8" />
        <div className="grid sm:grid-cols-2 gap-y-5 gap-x-10 text-sm text-left">
          <Row k="Room" v={booking.room_name} />
          <Row k="Guests" v={`${booking.adults} adults, ${booking.children} children`} />
          <Row k="Check-in" v={`${booking.check_in} from 14:00`} />
          <Row k="Check-out" v={`${booking.check_out} by 11:00`} />
          <Row k="Nights" v={booking.nights} />
          <Row k="Rate per night" v={fmt(booking.price_per_night)} />
          <Row k="Taxes (demo)" v={fmt(booking.taxes)} />
          <Row k="Grand total" v={fmt(booking.total)} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={`https://wa.me/${HOTEL.whatsapp}?text=${waText}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#2D5A43] text-[#F9F7F2] px-8 py-4 text-sm hover:bg-[#244836] transition-colors"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp Reservation
        </a>
        <button
          onClick={onEmail}
          disabled={emailState === "sending" || emailState === "sent"}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 px-8 py-4 text-sm hover:border-[#C5A059] disabled:opacity-60 transition-colors"
        >
          <Mail className="w-4 h-4" />
          {emailState === "sent" ? "Confirmation Sent" : emailState === "sending" ? "Sending…" : "Email Confirmation (Demo)"}
        </button>
        <Link to="/" className="inline-flex items-center rounded-full border border-black/10 px-8 py-4 text-sm hover:border-[#C5A059] transition-colors">
          Back to Hotel
        </Link>
      </div>
      {emailState === "error" && (
        <p className="mt-4 text-xs text-muted-foreground">
          Demo email could not be sent — your reservation is still confirmed.
        </p>
      )}
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div>
      <div className="text-muted-foreground text-xs uppercase tracking-[0.14em]">{k}</div>
      <div className="mt-1">{v}</div>
    </div>
  );
}