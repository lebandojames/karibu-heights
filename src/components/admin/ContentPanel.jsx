import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

const input = "w-full bg-transparent border border-white/15 rounded-xl px-4 py-2.5 text-sm text-[#F9F7F2] outline-none focus:border-[#C5A059]";

export default function ContentPanel({ offers, testimonials, reload }) {
  const [offer, setOffer] = useState({ title: "", discount_label: "", description: "", terms: "" });
  const [t, setT] = useState({ guest_name: "", country: "", rating: 5, review: "", initials: "" });

  const addOffer = async () => {
    if (!offer.title) return;
    await base44.entities.Offer.create({ ...offer, active: true });
    setOffer({ title: "", discount_label: "", description: "", terms: "" });
    reload();
  };

  const addT = async () => {
    if (!t.guest_name || !t.review) return;
    await base44.entities.Testimonial.create({
      ...t,
      rating: Number(t.rating),
      initials: t.initials || t.guest_name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
      published: true,
    });
    setT({ guest_name: "", country: "", rating: 5, review: "", initials: "" });
    reload();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="rounded-[24px] bg-[#141615] border border-white/10 p-7">
        <div className="kicker text-[#C5A059]">Promotions</div>
        <div className="mt-5 space-y-3">
          <input className={input} placeholder="Title" value={offer.title} onChange={(e) => setOffer({ ...offer, title: e.target.value })} />
          <input className={input} placeholder="Badge, e.g. Save 25%" value={offer.discount_label} onChange={(e) => setOffer({ ...offer, discount_label: e.target.value })} />
          <textarea rows={2} className={input} placeholder="Description" value={offer.description} onChange={(e) => setOffer({ ...offer, description: e.target.value })} />
          <input className={input} placeholder="Terms" value={offer.terms} onChange={(e) => setOffer({ ...offer, terms: e.target.value })} />
          <button onClick={addOffer} className="flex items-center gap-2 rounded-full bg-[#2D5A43] text-[#F9F7F2] px-5 py-2.5 text-sm hover:bg-[#356b50]">
            <Plus className="w-4 h-4" /> Add promotion
          </button>
        </div>
        <ul className="mt-6 divide-y divide-white/5">
          {offers.map((o) => (
            <li key={o.id} className="py-3 flex items-center justify-between gap-4 text-sm">
              <div>
                <div className="text-[#F9F7F2]">{o.title}</div>
                <div className="text-xs text-white/40">{o.discount_label}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={async () => { await base44.entities.Offer.update(o.id, { active: !o.active }); reload(); }}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs hover:border-[#C5A059]"
                >
                  {o.active ? "Hide" : "Show"}
                </button>
                <button
                  onClick={async () => { await base44.entities.Offer.delete(o.id); reload(); }}
                  className="rounded-full border border-white/15 p-2 hover:border-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[24px] bg-[#141615] border border-white/10 p-7">
        <div className="kicker text-[#C5A059]">Testimonials</div>
        <div className="mt-5 space-y-3">
          <input className={input} placeholder="Guest name" value={t.guest_name} onChange={(e) => setT({ ...t, guest_name: e.target.value })} />
          <input className={input} placeholder="Country" value={t.country} onChange={(e) => setT({ ...t, country: e.target.value })} />
          <select className={input} value={t.rating} onChange={(e) => setT({ ...t, rating: e.target.value })}>
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n} className="bg-[#141615]">{n} stars</option>)}
          </select>
          <textarea rows={3} className={input} placeholder="Review" value={t.review} onChange={(e) => setT({ ...t, review: e.target.value })} />
          <button onClick={addT} className="flex items-center gap-2 rounded-full bg-[#2D5A43] text-[#F9F7F2] px-5 py-2.5 text-sm hover:bg-[#356b50]">
            <Plus className="w-4 h-4" /> Add review
          </button>
        </div>
        <ul className="mt-6 divide-y divide-white/5">
          {testimonials.map((r) => (
            <li key={r.id} className="py-3 flex items-start justify-between gap-4 text-sm">
              <div>
                <div className="text-[#F9F7F2]">{r.guest_name} · {r.rating}★</div>
                <div className="text-xs text-white/40 line-clamp-1">{r.review}</div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={async () => { await base44.entities.Testimonial.update(r.id, { published: !r.published }); reload(); }}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs hover:border-[#C5A059]"
                >
                  {r.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={async () => { await base44.entities.Testimonial.delete(r.id); reload(); }}
                  className="rounded-full border border-white/15 p-2 hover:border-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}