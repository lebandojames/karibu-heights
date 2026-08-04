import React from "react";

const SECTIONS = [
  { t: "Reservations & Cancellation", b: "Rooms are held on a provisional basis until confirmed by our reservations office. Cancellations made more than 48 hours before arrival are free of charge. Later cancellations and no-shows are charged the first night." },
  { t: "Check-in & Check-out", b: "Check-in from 14:00, check-out by 11:00. Early arrival and late departure are offered subject to availability. A valid photo ID is required at check-in." },
  { t: "Children & Extra Beds", b: "Children under 12 stay free when sharing existing bedding. Extra beds and cots are available in most categories on request." },
  { t: "Payments", b: "This website is a demonstration property. No card details are collected and no real payment is processed — all payment options simulate the booking flow only." },
  { t: "Privacy", b: "We collect only the details needed to hold and service your reservation: name, contact details, country and any requests you share. We never sell guest data and we do not share it with third parties beyond what is required to deliver your stay." },
  { t: "Smoking & Pets", b: "All rooms are non-smoking; designated terraces are provided. Assistance animals are welcome; other pets cannot be accommodated." },
];

export default function Policies() {
  return (
    <div className="pt-36 pb-28 shell max-w-3xl">
      <div className="kicker text-[#C5A059]">Guest Information</div>
      <h1 className="mt-5 text-5xl md:text-6xl">
        Policies & <span className="italic text-[#2D5A43]">privacy</span>
      </h1>
      <div className="mt-14 space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.t} className="border-t border-black/10 pt-7">
            <h2 className="text-2xl">{s.t}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{s.b}</p>
          </section>
        ))}
      </div>
    </div>
  );
}