import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Hero from "@/components/home/Hero";
import SearchCard from "@/components/home/SearchCard";
import Intro from "@/components/home/Intro";
import RoomsPreview from "@/components/home/RoomsPreview";
import Amenities from "@/components/home/Amenities";
import Dining from "@/components/home/Dining";
import ExperienceStrip from "@/components/home/ExperienceStrip";
import Attractions from "@/components/home/Attractions";
import Offers from "@/components/home/Offers";
import Testimonials from "@/components/home/Testimonials";
import ContactStrip from "@/components/home/ContactStrip";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [offers, setOffers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const { hash } = useLocation();

  useEffect(() => {
    (async () => {
      const [r, o, t] = await Promise.all([
        base44.entities.Room.filter({ status: "active" }, "sort_order"),
        base44.entities.Offer.filter({ active: true }),
        base44.entities.Testimonial.filter({ published: true }, "-created_date", 6),
      ]);
      setRooms(r);
      setOffers(o);
      setTestimonials(t);
    })();
  }, []);

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
  }, [hash, rooms.length]);

  return (
    <>
      <Hero />
      <SearchCard roomTypes={rooms} />
      <Intro />
      <RoomsPreview rooms={rooms} />
      <Amenities />
      <Dining />
      <ExperienceStrip />
      <Offers offers={offers} />
      <Attractions />
      <Testimonials testimonials={testimonials} />
      <ContactStrip />
    </>
  );
}