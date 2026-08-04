import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { HOTEL } from "@/lib/hotel";

export default function Footer() {
  return (
    <footer className="bg-[#141615] text-[#F9F7F2]">
      <div className="shell py-20 grid gap-14 md:grid-cols-4">
        <div className="md:col-span-2 max-w-sm">
          <div className="font-display text-3xl">
            Karibu <span className="italic text-[#C5A059]">Heights</span>
          </div>
          <p className="mt-5 text-[#F9F7F2]/60 text-sm leading-relaxed">
            A quietly grand retreat above Nairobi — stone, timber and light, with
            genuine Kenyan warmth at its centre. Reserve directly with us for our
            best available rate.
          </p>
          <div className="gold-rule w-24 mt-8" />
        </div>

        <div className="text-sm">
          <div className="kicker text-[#C5A059] mb-5">Explore</div>
          <ul className="space-y-3 text-[#F9F7F2]/70">
            <li><Link to="/rooms" className="hover:text-[#C5A059]">Rooms & Suites</Link></li>
            <li><Link to="/booking" className="hover:text-[#C5A059]">Book Direct</Link></li>
            <li><Link to="/gallery" className="hover:text-[#C5A059]">Gallery</Link></li>
            <li><Link to="/conference" className="hover:text-[#C5A059]">Conference & Events</Link></li>
            <li><Link to="/contact" className="hover:text-[#C5A059]">Contact</Link></li>
            <li><Link to="/policies" className="hover:text-[#C5A059]">Policies & Privacy</Link></li>
            <li><Link to="/admin" className="hover:text-[#C5A059]">Staff Login</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="kicker text-[#C5A059] mb-5">Reservations</div>
          <ul className="space-y-4 text-[#F9F7F2]/70">
            <li className="flex gap-3">
              <Phone className="w-4 h-4 mt-1 text-[#C5A059]" />
              <a href={HOTEL.phoneHref} className="hover:text-[#C5A059]">{HOTEL.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="w-4 h-4 mt-1 text-[#C5A059]" />
              <a href={`mailto:${HOTEL.email}`} className="hover:text-[#C5A059]">{HOTEL.email}</a>
            </li>
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 mt-1 text-[#C5A059]" />
              <span>{HOTEL.address}</span>
            </li>
          </ul>
          <a
            href={`https://wa.me/${HOTEL.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 rounded-full border border-[#C5A059]/50 text-[#C5A059] px-5 py-2.5 text-xs hover:bg-[#C5A059]/10"
          >
            WhatsApp Concierge
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell py-6 flex flex-col md:flex-row gap-2 justify-between text-xs text-[#F9F7F2]/40">
          <span>© {new Date().getFullYear()} Karibu Heights Hotel. A demonstration property.</span>
          <span>Rates in Kenyan Shillings · Payments simulated for demo purposes</span>
        </div>
      </div>
    </footer>
  );
}