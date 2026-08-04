import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, ShieldAlert } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Overview from "@/components/admin/Overview";
import BookingsPanel from "@/components/admin/BookingsPanel";
import RoomsPanel from "@/components/admin/RoomsPanel";
import BlocksPanel from "@/components/admin/BlocksPanel";
import ContentPanel from "@/components/admin/ContentPanel";
import EnquiriesPanel from "@/components/admin/EnquiriesPanel";

const TABS = ["Dashboard", "Bookings", "Rooms", "Availability", "Content", "Enquiries"];

export default function Admin() {
  const [user, setUser] = useState(null);
  const [state, setState] = useState("loading");
  const [tab, setTab] = useState("Dashboard");
  const [data, setData] = useState({ rooms: [], bookings: [], blocks: [], offers: [], testimonials: [], enquiries: [] });

  const load = useCallback(async () => {
    const [rooms, bookings, blocks, offers, testimonials, enquiries] = await Promise.all([
      base44.entities.Room.list("sort_order"),
      base44.entities.Booking.list("-created_date", 500),
      base44.entities.RoomBlock.list("-created_date", 300),
      base44.entities.Offer.list("-created_date"),
      base44.entities.Testimonial.list("-created_date"),
      base44.entities.Enquiry.list("-created_date", 200),
    ]);
    setData({ rooms, bookings, blocks, offers, testimonials, enquiries });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        if (me.role !== "admin") return setState("forbidden");
        await load();
        setState("ready");
      } catch {
        setState("anon");
      }
    })();
  }, [load]);

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-[#0D0E0E] grid place-items-center">
        <div className="w-8 h-8 border-2 border-white/10 border-t-[#C5A059] rounded-full animate-spin" />
      </div>
    );
  }

  if (state !== "ready") {
    return (
      <div className="min-h-screen bg-[#0D0E0E] text-[#F9F7F2] grid place-items-center px-6">
        <div className="max-w-md text-center">
          <ShieldAlert className="w-8 h-8 mx-auto text-[#C5A059]" />
          <h1 className="mt-7 text-3xl font-display">Staff access only</h1>
          <p className="mt-4 text-sm text-white/50">
            {state === "forbidden"
              ? `You are signed in as ${user?.email}, which does not have administrator rights for this property.`
              : "Sign in with your Karibu Heights staff account to manage rooms, reservations and enquiries."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {state === "anon" ? (
              <button
                onClick={() => base44.auth.redirectToLogin("/admin")}
                className="rounded-full bg-[#2D5A43] px-8 py-3.5 text-sm hover:bg-[#356b50]"
              >
                Staff Sign In
              </button>
            ) : (
              <button
                onClick={() => base44.auth.logout("/admin")}
                className="rounded-full bg-[#2D5A43] px-8 py-3.5 text-sm hover:bg-[#356b50]"
              >
                Sign in as another user
              </button>
            )}
            <Link to="/" className="rounded-full border border-white/15 px-8 py-3.5 text-sm">Back to website</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0E0E] text-[#F9F7F2]">
      <div className="border-b border-white/10">
        <div className="shell py-6 flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="font-display text-2xl">Karibu <span className="italic text-[#C5A059]">Heights</span></div>
            <div className="kicker text-white/35 mt-1">Property Management</div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/40 hidden sm:block">{user?.email}</span>
            <Link to="/" className="rounded-full border border-white/15 px-5 py-2.5 hover:border-[#C5A059]">View site</Link>
            <button
              onClick={() => base44.auth.logout("/")}
              className="rounded-full border border-white/15 p-2.5 hover:border-[#C5A059]"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="shell py-8">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-6 py-2.5 text-sm whitespace-nowrap transition-colors ${
                tab === t ? "bg-[#C5A059] text-[#1A1C1B]" : "border border-white/15 text-white/70 hover:border-[#C5A059]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "Dashboard" && (
            <Overview rooms={data.rooms} bookings={data.bookings} blocks={data.blocks} enquiries={data.enquiries} />
          )}
          {tab === "Bookings" && <BookingsPanel bookings={data.bookings} rooms={data.rooms} reload={load} />}
          {tab === "Rooms" && <RoomsPanel rooms={data.rooms} reload={load} />}
          {tab === "Availability" && <BlocksPanel rooms={data.rooms} blocks={data.blocks} reload={load} />}
          {tab === "Content" && (
            <ContentPanel offers={data.offers} testimonials={data.testimonials} reload={load} />
          )}
          {tab === "Enquiries" && <EnquiriesPanel enquiries={data.enquiries} reload={load} />}
        </div>
      </div>
    </div>
  );
}