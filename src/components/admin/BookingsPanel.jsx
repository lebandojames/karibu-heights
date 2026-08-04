import React, { useMemo, useState } from "react";
import { FileDown, FileSpreadsheet, Search } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { fmt } from "@/lib/hotel";
import { exportBookingsCSV, exportBookingsPDF } from "@/lib/exporters";

const STATUS_ACTIONS = {
  pending: [["confirmed", "Approve"], ["rejected", "Reject"]],
  confirmed: [["checked_in", "Check In"], ["cancelled", "Cancel"]],
  checked_in: [["checked_out", "Check Out"]],
};

const input = "bg-transparent border border-white/15 rounded-xl px-4 py-2.5 text-sm text-[#F9F7F2] outline-none focus:border-[#C5A059]";

export default function BookingsPanel({ bookings, rooms, reload }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [room, setRoom] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return bookings.filter((b) => {
      if (status !== "all" && b.status !== status) return false;
      if (room !== "all" && b.room_id !== room) return false;
      if (from && b.check_in < from) return false;
      if (to && b.check_in > to) return false;
      if (!term) return true;
      return [b.reference, b.guest_name, b.email, b.phone, b.room_name]
        .some((v) => String(v || "").toLowerCase().includes(term));
    });
  }, [bookings, q, status, room, from, to]);

  const setStatusOf = async (b, next) => {
    await base44.entities.Booking.update(b.id, { status: next });
    reload();
  };

  return (
    <div className="rounded-[24px] bg-[#141615] border border-white/10 p-7">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 border border-white/15 rounded-xl px-4 py-2.5 flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-white/40" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search reference, guest, email…"
            className="bg-transparent text-sm text-[#F9F7F2] outline-none w-full"
          />
        </div>
        <select className={input} value={status} onChange={(e) => setStatus(e.target.value)}>
          {["all", "pending", "confirmed", "checked_in", "checked_out", "rejected", "cancelled"].map((s) => (
            <option key={s} value={s} className="bg-[#141615]">{s.replace("_", " ")}</option>
          ))}
        </select>
        <select className={input} value={room} onChange={(e) => setRoom(e.target.value)}>
          <option value="all" className="bg-[#141615]">All rooms</option>
          {rooms.map((r) => <option key={r.id} value={r.id} className="bg-[#141615]">{r.name}</option>)}
        </select>
        <input type="date" className={input} value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="date" className={input} value={to} onChange={(e) => setTo(e.target.value)} />
        <button onClick={() => exportBookingsCSV(rows)} className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm hover:border-[#C5A059]">
          <FileSpreadsheet className="w-4 h-4" /> Excel
        </button>
        <button onClick={() => exportBookingsPDF(rows)} className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm hover:border-[#C5A059]">
          <FileDown className="w-4 h-4" /> PDF
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="text-white/40 text-xs uppercase tracking-widest">
            <tr>
              {["Reference", "Guest", "Room", "Dates", "Guests", "Total", "Status", ""].map((h) => (
                <th key={h} className="text-left font-normal py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((b) => (
              <tr key={b.id} className="hover:bg-white/[0.03]">
                <td className="py-4 text-[#C5A059]">{b.reference}</td>
                <td className="py-4">
                  <div>{b.guest_name}</div>
                  <div className="text-xs text-white/40">{b.email}</div>
                </td>
                <td className="py-4 text-white/70">{b.room_name}</td>
                <td className="py-4 text-white/70">{b.check_in} → {b.check_out}</td>
                <td className="py-4 text-white/70">{b.adults}A {b.children}C</td>
                <td className="py-4">{fmt(b.total)}</td>
                <td className="py-4">
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs capitalize">
                    {String(b.status || "").replace("_", " ")}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex gap-2 justify-end">
                    {(STATUS_ACTIONS[b.status] || []).map(([next, label]) => (
                      <button
                        key={next}
                        onClick={() => setStatusOf(b, next)}
                        className="rounded-full bg-[#2D5A43] text-[#F9F7F2] px-4 py-1.5 text-xs hover:bg-[#356b50]"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={8} className="py-10 text-center text-white/40">No reservations match these filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}