import React from "react";
import { Link } from "react-router-dom";
import { HOTEL, IMG } from "@/lib/hotel";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";

export default function ContactStrip() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={IMG.honeymoon}
        alt="Honeymoon suite with canopy bed and stone bathtub overlooking the Kenyan hills at sunset"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#1A1C1B]/70" />
      <div className="relative shell py-28 md:py-40 text-center flex flex-col items-center">
        <Reveal>
          <div className="kicker text-[#C5A059]">Reserve Direct</div>
          <h2 className="mt-6 text-4xl md:text-6xl text-[#F9F7F2] max-w-3xl">
            Your room on the ridge is <span className="italic">waiting</span>
          </h2>
          <p className="mt-6 text-[#F9F7F2]/70 max-w-xl mx-auto">
            Best available rate, complimentary highland breakfast and a flexible
            48-hour cancellation — only when you book with us directly.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/booking"
              className="rounded-full bg-[#2D5A43] text-[#F9F7F2] px-9 py-4 text-sm hover:bg-[#244836] transition-colors"
            >
              Book Your Stay
            </Link>
            <a
              href={`https://wa.me/${HOTEL.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#F9F7F2]/40 text-[#F9F7F2] px-9 py-4 text-sm hover:bg-[#F9F7F2]/10 transition-colors"
            >
              WhatsApp Reservations
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}