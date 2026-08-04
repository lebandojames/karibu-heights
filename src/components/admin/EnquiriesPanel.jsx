import React, { useState } from "react";
import { base44 } from "@/api/base44Client";

const input = "w-full bg-transparent border border-white/15 rounded-xl px-4 py-2.5 text-sm text-[#F9F7F2] outline-none focus:border-[#C5A059]";

export default function EnquiriesPanel({ enquiries, reload }) {
  const [drafts, setDrafts] = useState({});

  const respond = async (e) => {
    const text = drafts[e.id];
    if (!text) return;
    await base44.entities.Enquiry.update(e.id, { response: text, status: "responded" });
    setDrafts((d) => ({ ...d, [e.id]: "" }));
    reload();
  };

  return (
    <div className="rounded-[24px] bg-[#141615] border border-white/10 p-7">
      <div className="kicker text-white/40">{enquiries.length} enquiries</div>
      <ul className="mt-5 divide-y divide-white/5">
        {enquiries.map((e) => (
          <li key={e.id} className="py-6">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <div className="text-[#F9F7F2]">{e.name} · <span className="text-white/40 text-sm">{e.email}</span></div>
                <div className="text-xs text-[#C5A059] mt-1">{e.subject}</div>
              </div>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs capitalize h-fit">{e.status}</span>
            </div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">{e.message}</p>
            {e.response && (
              <p className="mt-4 text-sm text-white/50 border-l-2 border-[#2D5A43] pl-4">Reply: {e.response}</p>
            )}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <input
                className={input} placeholder="Write a reply…"
                value={drafts[e.id] || ""}
                onChange={(ev) => setDrafts((d) => ({ ...d, [e.id]: ev.target.value }))}
              />
              <button onClick={() => respond(e)} className="rounded-full bg-[#2D5A43] text-[#F9F7F2] px-6 py-2.5 text-sm shrink-0 hover:bg-[#356b50]">
                Save reply
              </button>
              <button
                onClick={async () => { await base44.entities.Enquiry.update(e.id, { status: "closed" }); reload(); }}
                className="rounded-full border border-white/15 px-6 py-2.5 text-sm shrink-0 hover:border-[#C5A059]"
              >
                Close
              </button>
            </div>
          </li>
        ))}
        {!enquiries.length && <li className="py-6 text-sm text-white/40">No enquiries yet.</li>}
      </ul>
    </div>
  );
}