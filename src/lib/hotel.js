export const HOTEL = {
  name: "Karibu Heights Hotel",
  tagline: "A high-altitude sanctuary above the Kenyan skyline",
  phone: "+254 720 145 880",
  phoneHref: "tel:+254720145880",
  whatsapp: "254720145880",
  email: "reservations@karibuheights.co.ke",
  address: "Karibu Heights, Kilimani Ridge, Nairobi, Kenya",
  mapsEmbed:
    "https://www.google.com/maps?q=Kilimani,+Nairobi,+Kenya&output=embed",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Kilimani,+Nairobi,+Kenya",
};

export const IMG = {
  exterior: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/f45e34282_generated_2a5f3dc3.png",
  reception: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/cf88481f3_generated_b71b152e.png",
  deluxe: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/46cab212c_generated_95d036e8.png",
  executive: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/67b8b1a73_generated_a0de10a5.png",
  family: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/a672a1eb6_generated_17246bbd.png",
  honeymoon: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/d6b64cdbb_generated_4a2ff3e4.png",
  pool: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/bcec41edd_generated_87277b69.png",
  restaurant: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/ca0492864_generated_11a57875.png",
  breakfast: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/38fd0491d_generated_ea64b28b.png",
  rooftop: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/db1bcba29_generated_79c09e6b.png",
  garden: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/3db610967_generated_9331248c.png",
  conference: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/3e1bf1275_generated_99e950ee.png",
  spa: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/b3d9b5d43_generated_86238dc2.png",
  gym: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/337a417bb_generated_99f0b80b.png",
  standard: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/8b3a61aea_generated_383d2ccb.png",
  presidential: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/56c6666a4_generated_7dfca742.png",
  outdoor: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/a650f8435_generated_3cab8215.png",
  cocktails: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/ada71754c_generated_71211e35.png",
  coffee: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/5dcb573b0_generated_c9a240c3.png",
  wedding: "https://media.base44.com/images/public/6a7190453ea06960e2a84d94/2de62fa4f_generated_15a9ad50.png",
};

export const TAX_RATE = 0.16;

export const fmt = (n) =>
  "KES " + Math.round(Number(n) || 0).toLocaleString("en-KE");

export const toISO = (d) => new Date(d).toISOString().slice(0, 10);

export const addDays = (iso, days) => {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return toISO(d);
};

export const todayISO = () => toISO(new Date());

export const nightsBetween = (inISO, outISO) => {
  if (!inISO || !outISO) return 0;
  const ms = new Date(outISO + "T00:00:00") - new Date(inISO + "T00:00:00");
  return Math.max(0, Math.round(ms / 86400000));
};

export const datesInRange = (startISO, endISO) => {
  const out = [];
  let cur = startISO;
  while (cur < endISO) {
    out.push(cur);
    cur = addDays(cur, 1);
  }
  return out;
};

const overlaps = (aIn, aOut, bIn, bOut) => aIn < bOut && bIn < aOut;

export const ACTIVE_STATUSES = ["pending", "confirmed", "checked_in"];

/** Units of a room occupied on a given night (bookings + blocks). */
export function unitsTaken(room, dayISO, bookings, blocks) {
  const next = addDays(dayISO, 1);
  const booked = bookings.filter(
    (b) =>
      b.room_id === room.id &&
      ACTIVE_STATUSES.includes(b.status || "pending") &&
      overlaps(dayISO, next, b.check_in, b.check_out)
  ).length;
  const blocked = blocks.filter(
    (bl) => bl.room_id === room.id && overlaps(dayISO, next, bl.start_date, bl.end_date)
  ).length;
  return { booked, blocked };
}

/** Day status for a room availability calendar. */
export function dayStatus(room, dayISO, bookings, blocks) {
  if (room.status === "maintenance") return "maintenance";
  const { booked, blocked } = unitsTaken(room, dayISO, bookings, blocks);
  if (blocked > 0) return "maintenance";
  const units = room.total_units || 1;
  if (booked >= units) return "booked";
  return "available";
}

/** Smallest number of remaining units across the stay. */
export function remainingUnits(room, checkIn, checkOut, bookings, blocks) {
  const days = datesInRange(checkIn, checkOut);
  if (!days.length) return room.total_units || 0;
  let min = room.total_units || 0;
  for (const d of days) {
    const { booked, blocked } = unitsTaken(room, d, bookings, blocks);
    min = Math.min(min, (room.total_units || 0) - booked - blocked);
  }
  return Math.max(0, min);
}

export function priceBreakdown(room, checkIn, checkOut) {
  const nights = nightsBetween(checkIn, checkOut);
  const rate = room?.price_per_night || 0;
  const subtotal = nights * rate;
  const taxes = Math.round(subtotal * TAX_RATE);
  return { nights, rate, subtotal, taxes, total: subtotal + taxes };
}

export function makeReference(seq) {
  const year = new Date().getFullYear();
  const n = String(seq).padStart(6, "0");
  return `KH-${year}-${n}`;
}

export const COUNTRIES = [
  "Kenya", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "Nigeria", "South Africa",
  "United Kingdom", "United States", "Germany", "France", "Netherlands",
  "United Arab Emirates", "India", "China", "Australia", "Other",
];

export const PAYMENT_METHODS = [
  { value: "card_demo", label: "Credit Card (Demo)" },
  { value: "mpesa_demo", label: "M-Pesa (Demo)" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "pay_on_arrival", label: "Pay on Arrival" },
];