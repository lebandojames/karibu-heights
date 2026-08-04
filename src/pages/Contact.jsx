import React, { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { HOTEL } from "@/lib/hotel";
import Reveal from "@/components/site/Reveal";

const wrap = "flex flex-col gap-2 rounded-2xl border border-black/10 px-5 py-4 focus-within:border-[#2D5A43] transition-colors";
const field = "w-full bg-transparent text-base outline-none";
const clean = (s) => String(s || "").replace(/[<>]/g, "").trim().slice(0, 800);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "Reservation enquiry", message: "", honey: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.honey) return;
    const err = {};
    if (form.name.trim().length < 3) err.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(form.email)) err.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) err.message = "Tell us a little more.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setBusy(true);
    await base44.entities.Enquiry.create({
      name: clean(form.name),
      email: clean(form.email),
      phone: clean(form.phone),
      subject: clean(form.subject),
      message: clean(form.message),
      status: "new",
    });
    setBusy(false);
    setSent(true);
  };

  return (
    <div className="pt-36 pb-28">
      <div className="shell">
        <div className="kicker text-[#C5A059]">Contact</div>
        <h1 className="mt-5 text-5xl md:text-7xl">
          Talk to our <span className="italic text-[#2D5A43]">concierge</span>
        </h1>

        <div className="mt-16 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-start">
          <Reveal className="space-y-8">
            <Item icon={Phone} label="Reservations">
              <a href={HOTEL.phoneHref} className="hover:text-[#2D5A43]">{HOTEL.phone}</a>
            </Item>
            <Item icon={Mail} label="Email">
              <a href={`mailto:${HOTEL.email}`} className="hover:text-[#2D5A43]">{HOTEL.email}</a>
            </Item>
            <Item icon={MessageCircle} label="WhatsApp">
              <a href={`https://wa.me/${HOTEL.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-[#2D5A43]">
                Chat with us on WhatsApp
              </a>
            </Item>
            <Item icon={MapPin} label="Address">
              {HOTEL.address}
              <a href={HOTEL.mapsLink} target="_blank" rel="noreferrer" className="block mt-2 text-sm text-[#2D5A43]">
                Get directions →
              </a>
            </Item>
            <Item icon={Clock} label="Business hours">
              <ul className="text-sm space-y-1">
                <li>Reception — 24 hours, every day</li>
                <li>Reservations office — 07:00 – 21:00</li>
                <li>Restaurant — 06:30 – 22:30</li>
                <li>Spa — 09:00 – 20:00</li>
              </ul>
            </Item>
          </Reveal>

          <Reveal>
            {sent ? (
              <div className="rounded-[24px] bg-white border border-black/5 p-10 text-center">
                <h2 className="text-3xl">Asante sana</h2>
                <p className="mt-4 text-muted-foreground">
                  Your enquiry has reached our front office. We reply within one hour
                  during office hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="rounded-[24px] bg-white border border-black/5 p-8 grid sm:grid-cols-2 gap-4">
                <Field label="Your name" error={errors.name} className="sm:col-span-2">
                  <input className={field} value={form.name} onChange={(e) => set("name", e.target.value)} maxLength={80} />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input className={field} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={120} />
                </Field>
                <Field label="Phone (optional)">
                  <input className={field} value={form.phone} onChange={(e) => set("phone", e.target.value)} maxLength={20} />
                </Field>
                <Field label="Subject" className="sm:col-span-2">
                  <select className={field} value={form.subject} onChange={(e) => set("subject", e.target.value)}>
                    <option>Reservation enquiry</option>
                    <option>Conference & events</option>
                    <option>Wedding enquiry</option>
                    <option>Group booking</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Message" error={errors.message} className="sm:col-span-2">
                  <textarea rows={5} maxLength={800} className={`${field} resize-none`} value={form.message} onChange={(e) => set("message", e.target.value)} />
                </Field>
                <input
                  type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
                  value={form.honey} onChange={(e) => set("honey", e.target.value)}
                  className="hidden"
                />
                <button
                  type="submit" disabled={busy}
                  className="sm:col-span-2 rounded-full bg-[#2D5A43] text-[#F9F7F2] px-8 py-4 text-sm hover:bg-[#244836] disabled:opacity-50 transition-colors"
                >
                  {busy ? "Sending…" : "Send Enquiry"}
                </button>
              </form>
            )}
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <iframe
            title="Karibu Heights Hotel location on Google Maps"
            src={HOTEL.mapsEmbed}
            className="w-full h-[420px] rounded-[24px] border border-black/5"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </div>
  );
}

function Item({ icon: Icon, label, children }) {
  return (
    <div className="border-t border-black/10 pt-6">
      <div className="flex items-center gap-3 kicker text-[#C5A059]">
        <Icon className="w-4 h-4" /> {label}
      </div>
      <div className="mt-3 text-foreground/80">{children}</div>
    </div>
  );
}

function Field({ label, error, children, className = "" }) {
  return (
    <div className={className}>
      <div className={`${wrap} ${error ? "border-destructive" : ""}`}>
        <span className="kicker text-muted-foreground">{label}</span>
        {children}
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}