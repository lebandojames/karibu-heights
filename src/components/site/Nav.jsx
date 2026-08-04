import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { HOTEL } from "@/lib/hotel";

const LINKS = [
  { label: "Rooms", to: "/rooms" },
  { label: "Dining", to: "/#dining" },
  { label: "Gallery", to: "/gallery" },
  { label: "Conference", to: "/conference" },
  { label: "Offers", to: "/#offers" },
  { label: "Contact", to: "/contact" },
];

export default function Nav({ overHero = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const light = overHero && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? "glass border-b border-black/5 py-3" : "py-6"
      }`}
    >
      <nav className="shell flex items-center justify-between gap-6">
        <Link to="/" className="flex flex-col leading-none">
          <span
            className={`font-display text-xl md:text-2xl ${light ? "text-[#F9F7F2]" : "text-foreground"}`}
          >
            Karibu <span className="italic">Heights</span>
          </span>
          <span className={`kicker mt-1 ${light ? "text-[#F9F7F2]/60" : "text-muted-foreground"}`}>
            Nairobi · Kenya
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`text-sm transition-colors hover:text-[#C5A059] ${
                light ? "text-[#F9F7F2]/85" : "text-foreground/75"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={HOTEL.phoneHref}
            className={`text-sm ${light ? "text-[#F9F7F2]/85" : "text-foreground/75"}`}
          >
            {HOTEL.phone}
          </a>
          <Link
            to="/booking"
            className="rounded-full bg-[#2D5A43] text-[#F9F7F2] text-sm px-6 py-3 hover:bg-[#244836] transition-colors"
          >
            Book Now
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className={`lg:hidden p-2 rounded-full ${light ? "text-[#F9F7F2]" : "text-foreground"}`}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden mt-3 mx-4 rounded-3xl bg-[#F9F7F2] border border-black/5 shadow-xl p-6 flex flex-col gap-4">
          {LINKS.map((l) => (
            <Link key={l.label} to={l.to} className="text-base text-foreground/80">
              {l.label}
            </Link>
          ))}
          <a href={HOTEL.phoneHref} className="text-base text-foreground/80">
            {HOTEL.phone}
          </a>
          <Link
            to="/booking"
            className="rounded-full bg-[#2D5A43] text-[#F9F7F2] text-center px-6 py-3"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}