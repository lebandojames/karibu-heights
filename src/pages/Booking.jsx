import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import StepBar from "@/components/booking/StepBar";
import SearchStep from "@/components/booking/SearchStep";
import ResultsStep from "@/components/booking/ResultsStep";
import GuestStep from "@/components/booking/GuestStep";
import SummaryStep from "@/components/booking/SummaryStep";
import ConfirmationStep from "@/components/booking/ConfirmationStep";
import {
  addDays, makeReference, priceBreakdown, remainingUnits, todayISO,
} from "@/lib/hotel";

export default function Booking() {
  const [params] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [saving, setSaving] = useState(false);
  const [emailState, setEmailState] = useState("idle");

  const [criteria, setCriteria] = useState({
    check_in: params.get("check_in") || addDays(todayISO(), 1),
    check_out: params.get("check_out") || addDays(todayISO(), 3),
    adults: Number(params.get("adults") || 2),
    children: Number(params.get("children") || 0),
    type: params.get("type") || params.get("room") || "any",
  });

  const [guest, setGuest] = useState({ payment_method: "pay_on_arrival" });

  useEffect(() => {
    (async () => {
      const [r, b, bl] = await Promise.all([
        base44.entities.Room.filter({ status: "active" }, "sort_order"),
        base44.entities.Booking.list("-created_date", 500),
        base44.entities.RoomBlock.list("-created_date", 300),
      ]);
      setRooms(r);
      setBookings(b);
      setBlocks(bl);
      setLoading(false);
      const preRoom = params.get("room");
      if (preRoom && r.some((x) => x.id === preRoom)) setStep(2);
    })();
  }, []);

  const results = useMemo(() => {
    const guests = criteria.adults + criteria.children;
    return rooms
      .filter((r) => (criteria.type === "any" ? true : r.id === criteria.type))
      .filter((r) => (r.max_guests || 1) >= guests)
      .map((r) => ({ room: r, remaining: remainingUnits(r, criteria.check_in, criteria.check_out, bookings, blocks) }))
      .filter((x) => x.remaining > 0);
  }, [rooms, bookings, blocks, criteria]);

  const chooseRoom = (room) => {
    setSelected(room);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goto = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmBooking = async () => {
    setSaving(true);
    const p = priceBreakdown(selected, criteria.check_in, criteria.check_out);
    const seq = 1284 + bookings.length + 1;
    const record = await base44.entities.Booking.create({
      reference: makeReference(seq),
      room_id: selected.id,
      room_name: selected.name,
      guest_name: guest.guest_name,
      email: guest.email,
      phone: guest.phone,
      country: guest.country,
      special_requests: guest.special_requests || "",
      check_in: criteria.check_in,
      check_out: criteria.check_out,
      adults: criteria.adults,
      children: criteria.children,
      nights: p.nights,
      price_per_night: p.rate,
      subtotal: p.subtotal,
      taxes: p.taxes,
      total: p.total,
      status: "pending",
      payment_method: guest.payment_method || "pay_on_arrival",
      payment_status: "unpaid",
    });
    setConfirmed(record);
    setSaving(false);
    goto(5);
  };

  const sendDemoEmail = async () => {
    setEmailState("sending");
    try {
      await base44.integrations.Core.SendEmail({
        to: confirmed.email,
        from_name: "Karibu Heights Hotel",
        subject: `Your reservation ${confirmed.reference} is confirmed`,
        body:
          `Karibu ${confirmed.guest_name},\n\nYour reservation at Karibu Heights Hotel is confirmed.\n\n` +
          `Reference: ${confirmed.reference}\nRoom: ${confirmed.room_name}\n` +
          `Check-in: ${confirmed.check_in} (from 14:00)\nCheck-out: ${confirmed.check_out} (by 11:00)\n` +
          `Nights: ${confirmed.nights}\nTotal: KES ${confirmed.total.toLocaleString()}\n\n` +
          `We look forward to welcoming you.\nKaribu Heights Hotel, Nairobi`,
      });
      setEmailState("sent");
    } catch (e) {
      setEmailState("error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="w-8 h-8 border-2 border-black/10 border-t-[#2D5A43] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-28 bg-[#F9F7F2] min-h-screen">
      <div className="shell">
        <div className="kicker text-[#C5A059]">Direct Booking Engine</div>
        <div className="mt-6 mb-14">
          <StepBar step={step} />
        </div>

        {step === 1 && (
          <SearchStep criteria={criteria} setCriteria={setCriteria} rooms={rooms} onSearch={() => goto(2)} />
        )}
        {step === 2 && (
          <ResultsStep criteria={criteria} results={results} onSelect={chooseRoom} onBack={() => goto(1)} />
        )}
        {step === 3 && selected && (
          <GuestStep
            room={selected} criteria={criteria} guest={guest} setGuest={setGuest}
            onBack={() => goto(2)} onNext={() => goto(4)}
          />
        )}
        {step === 4 && selected && (
          <SummaryStep
            room={selected} criteria={criteria} guest={guest} setGuest={setGuest}
            onBack={() => goto(3)} onConfirm={confirmBooking} saving={saving}
          />
        )}
        {step === 5 && confirmed && (
          <ConfirmationStep booking={confirmed} onEmail={sendDemoEmail} emailState={emailState} />
        )}
      </div>
    </div>
  );
}