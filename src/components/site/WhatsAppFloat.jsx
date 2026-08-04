import React from "react";
import { MessageCircle } from "lucide-react";
import { HOTEL } from "@/lib/hotel";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(
        "Hello Karibu Heights, I would like to enquire about a reservation."
      )}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with our concierge on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-0 hover:gap-3 rounded-full bg-[#2D5A43] text-[#F9F7F2] shadow-xl shadow-black/20 h-12 pl-3.5 pr-3.5 hover:pr-5 transition-all duration-500"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="max-w-0 group-hover:max-w-[160px] overflow-hidden whitespace-nowrap text-sm transition-all duration-500">
        Concierge Online
      </span>
    </a>
  );
}