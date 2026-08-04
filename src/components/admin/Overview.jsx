import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, LineChart, Line } from "recharts";
import { addDays, datesInRange, fmt, todayISO, unitsTaken } from "@/lib/hotel";

const ACTIVE = ["pending", "confirmed", "checked_in"];

export default function Overview({ rooms, bookings, blocks, enquiries }) {
  const today = todayISO();
  const todays = bookings.filter((b) => (b.created_date || "").slice(0, 10) === today);
  const arrivals = bookings
    .filter((b) => b.check_in >= today && ACTIVE.includes(b.status))
    .sort((a, b) => a.check_in.localeCompare(b.check_in))
    .slice(0, 6);

  const totalUnits = rooms.reduce((s, r) => s + (r.total_units || 0), 0) || 1;
  const occToday = rooms.reduce((s, r) => s + unitsTaken(r, today, bookings, blocks).booked, 0);
  const occupancy = Math.round((occToday / totalUnits) * 100);

  const month = today.slice(0, 7);
  const revenue = bookings
    .filter((b) => (b.check_in || "").slice(0, 7) === month && b.status !== "rejected" && b.status !== "cancelled")
    .reduce((s, b) => s + (b.total || 0), 0);

  const next14 = datesInRange(today, addDays(today, 14)).map((d) => ({
    day: d.slice(8),
    occupied: rooms.reduce((s, r) => s + unitsTaken(r, d, bookings, blocks).booked, 0),
  }));

  const perRoom = rooms.map((r) => ({
    name: r.name.replace(" Room", "").replace(" Suite", ""),
    bookings: bookings.filter((b) => b.room_id === r.id && b.status !== "rejected").length,
    revenue: bookings.filter((b) => b.room_id === r.id && b.status !== "rejected").reduce((s, b) => s + (b.total || 0), 0),
  }));

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <Stat label="Today's Bookings" value={todays.length} sub="new reservations today" />
        <Stat label="Upcoming Arrivals" value={arrivals.length} sub="confirmed & pending" />
        <Stat label="Occupancy Rate" value={`${occupancy}%`} sub={`${occToday} of ${totalUnits} units`} ring={occupancy} />
        <Stat label="Monthly Revenue (Demo)" value={fmt(revenue)} sub={month} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card title="Occupied units — next 14 nights">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={next14}>
                <XAxis dataKey="day" stroke="#5c625f" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#141615", border: "1px solid #2a2d2b", borderRadius: 12, color: "#F9F7F2" }} />
                <Line type="monotone" dataKey="occupied" stroke="#C5A059" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Room performance — bookings">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perRoom}>
                <XAxis dataKey="name" stroke="#5c625f" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#141615", border: "1px solid #2a2d2b", borderRadius: 12, color: "#F9F7F2" }} />
                <Bar dataKey="bookings" fill="#3f8060" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Upcoming arrivals">
          <ul className="divide-y divide-white/5">
            {arrivals.map((a) => (
              <li key={a.id} className="py-3 flex justify-between gap-4 text-sm">
                <span>{a.guest_name}</span>
                <span className="text-white/40">{a.room_name}</span>
                <span className="text-[#C5A059]">{a.check_in}</span>
              </li>
            ))}
            {!arrivals.length && <li className="py-3 text-sm text-white/40">No upcoming arrivals.</li>}
          </ul>
        </Card>

        <Card title="Recent enquiries">
          <ul className="divide-y divide-white/5">
            {enquiries.slice(0, 6).map((e) => (
              <li key={e.id} className="py-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span>{e.name}</span>
                  <span className="text-white/40">{e.subject}</span>
                </div>
                <p className="text-white/40 text-xs mt-1 line-clamp-1">{e.message}</p>
              </li>
            ))}
            {!enquiries.length && <li className="py-3 text-sm text-white/40">No enquiries yet.</li>}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, ring }) {
  return (
    <div className="rounded-[24px] bg-[#141615] border border-white/10 p-7">
      <div className="kicker text-[#C5A059]">{label}</div>
      <div className="mt-4 font-display text-4xl text-[#F9F7F2]">{value}</div>
      <div className="mt-2 text-xs text-white/40">{sub}</div>
      {typeof ring === "number" && (
        <div className="mt-5 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-[#C5A059]" style={{ width: `${Math.min(100, ring)}%` }} />
        </div>
      )}
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-[24px] bg-[#141615] border border-white/10 p-7">
      <div className="kicker text-white/40">{title}</div>
      <div className="mt-5">{children}</div>
    </div>
  );
}