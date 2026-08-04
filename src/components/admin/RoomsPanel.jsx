import React, { useState } from "react";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { fmt } from "@/lib/hotel";

const input = "w-full bg-transparent border border-white/15 rounded-xl px-4 py-2.5 text-sm text-[#F9F7F2] outline-none focus:border-[#C5A059]";
const label = "kicker text-white/40";

const EMPTY = {
  name: "", tagline: "", description: "", long_description: "", size_sqm: 30,
  bed_type: "King", max_guests: 2, price_per_night: 15000, total_units: 4,
  amenities: [], images: [], policies: [], status: "active", sort_order: 99,
};

export default function RoomsPanel({ rooms, reload }) {
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);

  const save = async () => {
    const payload = {
      ...editing,
      size_sqm: Number(editing.size_sqm),
      max_guests: Number(editing.max_guests),
      price_per_night: Number(editing.price_per_night),
      total_units: Number(editing.total_units),
      sort_order: Number(editing.sort_order),
      amenities: typeof editing.amenities === "string" ? editing.amenities.split(",").map((s) => s.trim()).filter(Boolean) : editing.amenities,
      policies: typeof editing.policies === "string" ? editing.policies.split("|").map((s) => s.trim()).filter(Boolean) : editing.policies,
    };
    if (editing.id) await base44.entities.Room.update(editing.id, payload);
    else await base44.entities.Room.create(payload);
    setEditing(null);
    reload();
  };

  const remove = async (r) => {
    await base44.entities.Room.delete(r.id);
    reload();
  };

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setEditing((r) => ({ ...r, images: [...(r.images || []), file_url] }));
    setUploading(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div className="kicker text-white/40">{rooms.length} room categories</div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-2 rounded-full bg-[#2D5A43] text-[#F9F7F2] px-5 py-2.5 text-sm hover:bg-[#356b50]"
        >
          <Plus className="w-4 h-4" /> Add Room
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {rooms.map((r) => (
          <div key={r.id} className="rounded-[24px] bg-[#141615] border border-white/10 overflow-hidden">
            <img src={(r.images || [])[0]} alt={`${r.name} thumbnail`} className="w-full h-36 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg text-[#F9F7F2]">{r.name}</h3>
                  <div className="text-xs text-white/40 mt-1">{r.total_units} units · {r.status}</div>
                </div>
                <div className="text-[#C5A059] text-sm">{fmt(r.price_per_night)}</div>
              </div>
              <div className="mt-5 flex gap-2">
                <button onClick={() => setEditing({ ...r })} className="flex-1 rounded-full border border-white/15 px-4 py-2 text-xs hover:border-[#C5A059]">Edit</button>
                <button onClick={() => remove(r)} className="rounded-full border border-white/15 px-3 py-2 hover:border-destructive hover:text-destructive">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto p-4 md:p-10" onClick={() => setEditing(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl mx-auto rounded-[24px] bg-[#141615] border border-white/10 p-8"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-[#F9F7F2]">{editing.id ? "Edit room" : "New room"}</h2>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5 text-white/50" /></button>
            </div>

            <div className="mt-7 grid sm:grid-cols-2 gap-5">
              <Field l="Name"><input className={input} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
              <Field l="Tagline"><input className={input} value={editing.tagline || ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} /></Field>
              <Field l="Price per night (KES)"><input type="number" className={input} value={editing.price_per_night} onChange={(e) => setEditing({ ...editing, price_per_night: e.target.value })} /></Field>
              <Field l="Total units"><input type="number" className={input} value={editing.total_units} onChange={(e) => setEditing({ ...editing, total_units: e.target.value })} /></Field>
              <Field l="Size (m²)"><input type="number" className={input} value={editing.size_sqm} onChange={(e) => setEditing({ ...editing, size_sqm: e.target.value })} /></Field>
              <Field l="Bed type"><input className={input} value={editing.bed_type || ""} onChange={(e) => setEditing({ ...editing, bed_type: e.target.value })} /></Field>
              <Field l="Max guests"><input type="number" className={input} value={editing.max_guests} onChange={(e) => setEditing({ ...editing, max_guests: e.target.value })} /></Field>
              <Field l="Status">
                <select className={input} value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                  {["active", "maintenance", "hidden"].map((s) => <option key={s} value={s} className="bg-[#141615]">{s}</option>)}
                </select>
              </Field>
              <Field l="Short description" span>
                <textarea rows={2} className={input} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </Field>
              <Field l="Long description" span>
                <textarea rows={3} className={input} value={editing.long_description || ""} onChange={(e) => setEditing({ ...editing, long_description: e.target.value })} />
              </Field>
              <Field l="Amenities (comma separated)" span>
                <textarea rows={2} className={input} value={Array.isArray(editing.amenities) ? editing.amenities.join(", ") : editing.amenities} onChange={(e) => setEditing({ ...editing, amenities: e.target.value })} />
              </Field>
              <Field l="Policies (separate with |)" span>
                <textarea rows={2} className={input} value={Array.isArray(editing.policies) ? editing.policies.join(" | ") : editing.policies} onChange={(e) => setEditing({ ...editing, policies: e.target.value })} />
              </Field>
            </div>

            <div className="mt-7">
              <span className={label}>Images</span>
              <div className="mt-3 flex flex-wrap gap-3">
                {(editing.images || []).map((img, i) => (
                  <div key={img + i} className="relative">
                    <img src={img} alt={`Room image ${i + 1}`} className="w-24 h-20 object-cover rounded-xl" />
                    <button
                      onClick={() => setEditing({ ...editing, images: editing.images.filter((_, k) => k !== i) })}
                      className="absolute -top-2 -right-2 bg-[#141615] border border-white/20 rounded-full p-1"
                    >
                      <X className="w-3 h-3 text-white/70" />
                    </button>
                  </div>
                ))}
                <label className="w-24 h-20 rounded-xl border border-dashed border-white/20 grid place-items-center cursor-pointer hover:border-[#C5A059]">
                  <input type="file" accept="image/*" onChange={upload} className="hidden" />
                  <Upload className="w-4 h-4 text-white/40" />
                </label>
              </div>
              {uploading && <p className="mt-2 text-xs text-white/40">Uploading…</p>}
            </div>

            <div className="mt-8 flex gap-3">
              <button onClick={save} className="rounded-full bg-[#2D5A43] text-[#F9F7F2] px-7 py-3 text-sm hover:bg-[#356b50]">Save room</button>
              <button onClick={() => setEditing(null)} className="rounded-full border border-white/15 px-7 py-3 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ l, children, span }) {
  return (
    <div className={span ? "sm:col-span-2" : ""}>
      <span className={label}>{l}</span>
      <div className="mt-2">{children}</div>
    </div>
  );
}