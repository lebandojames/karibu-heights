import React, { useState } from "react";
import Receipt from "./Receipt";
import { COUNTRIES } from "@/lib/hotel";

const wrap = "flex flex-col gap-2 rounded-2xl border border-black/10 px-5 py-4 focus-within:border-[#2D5A43] transition-colors";
const label = "kicker text-muted-foreground";
const field = "w-full bg-transparent text-base outline-none";

const clean = (s) => String(s || "").replace(/[<>]/g, "").trim().slice(0, 600);

export default function GuestStep({ room, criteria, guest, setGuest, onBack, onNext }) {
  const [errors, setErrors] = useState({});
  const set = (k, v) => setGuest((g) => ({ ...g, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!guest.guest_name || guest.guest_name.trim().length < 3) err.guest_name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(guest.email || "")) err.email = "Enter a valid email address.";
    if (!/^\+?[0-9\s-]{9,16}$/.test(guest.phone || "")) err.phone = "Enter a valid phone number.";
    if (!guest.country) err.country = "Select your country.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setGuest((g) => ({
      ...g,
      guest_name: clean(g.guest_name),
      email: clean(g.email),
      phone: clean(g.phone),
      special_requests: clean(g.special_requests),
    }));
    onNext();
  };

  return (
    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
      <form onSubmit={submit} noValidate>
        <h1 className="text-4xl md:text-5xl">
          Guest <span className="italic text-[#2D5A43]">details</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-lg">
          Held under your name — we'll confirm by email and WhatsApp within the hour.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Field label="Full name" error={errors.guest_name} className="sm:col-span-2">
            <input className={field} value={guest.guest_name || ""} onChange={(e) => set("guest_name", e.target.value)} maxLength={80} placeholder="Amina Wanjiru" />
          </Field>
          <Field label="Phone number" error={errors.phone}>
            <input className={field} value={guest.phone || ""} onChange={(e) => set("phone", e.target.value)} maxLength={20} placeholder="+254 7.. ... ..." />
          </Field>
          <Field label="Email address" error={errors.email}>
            <input className={field} type="email" value={guest.email || ""} onChange={(e) => set("email", e.target.value)} maxLength={120} placeholder="you@email.com" />
          </Field>
          <Field label="Country" error={errors.country} className="sm:col-span-2">
            <select className={field} value={guest.country || ""} onChange={(e) => set("country", e.target.value)}>
              <option value="">Select country</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Special requests" className="sm:col-span-2">
            <textarea
              rows={4} className={`${field} resize-none`} maxLength={600}
              value={guest.special_requests || ""}
              onChange={(e) => set("special_requests", e.target.value)}
              placeholder="Airport transfer, high floor, anniversary…"
            />
          </Field>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <button type="submit" className="rounded-full bg-[#2D5A43] text-[#F9F7F2] px-9 py-4 text-sm hover:bg-[#244836] transition-colors">
            Continue to Summary
          </button>
          <button type="button" onClick={onBack} className="text-sm text-[#2D5A43] hover:text-[#C5A059]">
            ← Back to rooms
          </button>
        </div>
      </form>

      <Receipt room={room} criteria={criteria} guest={guest} />
    </div>
  );
}

function Field({ label: l, error, children, className = "" }) {
  return (
    <div className={className}>
      <div className={`${wrap} ${error ? "border-destructive" : ""}`}>
        <span className={label}>{l}</span>
        {children}
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}