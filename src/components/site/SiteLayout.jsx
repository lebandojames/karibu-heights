import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";

export default function SiteLayout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1C1B]">
      <Nav overHero={pathname === "/"} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}