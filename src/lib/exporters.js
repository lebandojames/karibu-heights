import jsPDF from "jspdf";

const COLS = [
  ["reference", "Reference"],
  ["guest_name", "Guest"],
  ["room_name", "Room"],
  ["check_in", "Check-in"],
  ["check_out", "Check-out"],
  ["nights", "Nights"],
  ["adults", "Adults"],
  ["children", "Children"],
  ["status", "Status"],
  ["payment_method", "Payment"],
  ["total", "Total (KES)"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["country", "Country"],
];

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportBookingsCSV(bookings) {
  const head = COLS.map(([, l]) => l).join(",");
  const rows = bookings.map((b) =>
    COLS.map(([k]) => `"${String(b[k] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  download(
    new Blob([[head, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" }),
    `karibu-heights-bookings-${new Date().toISOString().slice(0, 10)}.csv`
  );
}

export function exportBookingsPDF(bookings) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  doc.setFontSize(16);
  doc.text("Karibu Heights Hotel — Reservations", 40, 40);
  doc.setFontSize(9);
  doc.text(`Generated ${new Date().toLocaleString()} · ${bookings.length} records`, 40, 58);

  let y = 86;
  const cols = [
    ["Reference", 40], ["Guest", 150], ["Room", 280], ["In", 410],
    ["Out", 480], ["Nts", 550], ["Status", 590], ["Total", 690],
  ];
  doc.setFontSize(9);
  cols.forEach(([l, x]) => doc.text(l, x, y));
  doc.line(40, y + 6, 800, y + 6);
  y += 22;

  bookings.forEach((b) => {
    if (y > 540) {
      doc.addPage();
      y = 60;
    }
    doc.text(String(b.reference || ""), 40, y);
    doc.text(String(b.guest_name || "").slice(0, 20), 150, y);
    doc.text(String(b.room_name || "").slice(0, 20), 280, y);
    doc.text(String(b.check_in || ""), 410, y);
    doc.text(String(b.check_out || ""), 480, y);
    doc.text(String(b.nights ?? ""), 550, y);
    doc.text(String(b.status || ""), 590, y);
    doc.text(`KES ${Number(b.total || 0).toLocaleString()}`, 690, y);
    y += 18;
  });

  doc.save(`karibu-heights-bookings-${new Date().toISOString().slice(0, 10)}.pdf`);
}