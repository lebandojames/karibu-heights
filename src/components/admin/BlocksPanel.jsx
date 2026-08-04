import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { addDays, todayISO } from "@/lib/hotel";

const input = "w-full bg-transparent border border-white/15 rounded-xl px-4 py-2.5 text-sm text-[#F9F7F2] outline-none focus:border-[#C5A059]";

export default function BlocksPanel({ rooms, blocks, reload }) {
  const [form, setForm] = useState({
    room_id: "", start_date: todayISO(), end_date: addDays(todayISO(), 2), reason: "maintenance", notes: "",
  });

  const add = async () => {
    if (!form.room_id) return;
    const room = rooms.find((r) => r.id === form.room_id);
    await base44.entities.RoomBlock.create({ ...form, room_name: room?.name || "" });
    reload();
  };

  const remove = async (b) => {
    await base44.entities.RoomBlock.delete(b.id);
    reload();
  };

  return (
    <div className="grid lg:grid-cols-[1fr_1.3fr] gap-5">
      <div className="rounded-[24px] bg-[#141615] border border-white/10 p-7">
        <div className="kicker text-[#C5A059]">Block a room</div>
        <p className="mt-3 text-xs text-white/40">
          Blocked nights are removed from availability and shown as maintenance on
          the room calendar.
        </p>
        <div className="mt-6 space-y-4">
          <select className={input} value={form.room_id} onChange={(e) => setForm({ ...form, room_id: e.target.value })}>
            <option value="" className="bg-[#141615]">Select room…</option>
            {rooms.map((r) => <option key={r.id} value={r.id} className="bg-[#141615]">{r.name}</option>)}
          </select>
          <input type="date" className={input} value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
          <input type="date" className={input} value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
          <select className={input} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}>
            <option value="maintenance" className="bg-[#141615]">Maintenance</option>
            <option value="blocked" className="bg-[#141615]">Blocked / held</option>
          </select>
          <input className={input} placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button onClick={add} className="w-full rounded-full bg-[#2D5A43] text-[#F9F7F2] px-6 py-3 text-sm hover:bg-[#356b50]">
            Update availability
          </button>
        </div>
      </div>

      <div className="rounded-[24px] bg-[#141615] border border-white/10 p-7">
        <div className="kicker text-white/40">Active blocks</div>
        <ul className="mt-5 divide-y divide-white/5">
          {blocks.map((b) => (
            <li key={b.id} className="py-4 flex items-center justify-between gap-4 text-sm">
              <div>
                <div className="text-[#F9F7F2]">{b.room_name}</div>
                <div className="text-xs text-white/40 mt-1">
                  {b.start_date} → {b.end_date} · {b.reason}{b.notes ? ` · ${b.notes}` : ""}
                </div>
              </div>
              <button onClick={() => remove(b)} className="rounded-full border border-white/15 p-2 hover:border-destructive hover:text-destructive">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
          {!blocks.length && <li className="py-4 text-sm text-white/40">No blocked dates.</li>}
        </ul>
      </div>
    </div>
  );
}