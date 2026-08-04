import React from "react";
import Reveal from "./Reveal";

export default function SectionHeading({ kicker, title, italic, intro, align = "left", light }) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left";
  return (
    <Reveal className={`flex flex-col gap-5 max-w-2xl ${alignCls}`}>
      {kicker && (
        <div className={`kicker ${light ? "text-[#C5A059]" : "text-[#C5A059]"}`}>{kicker}</div>
      )}
      <h2 className={`text-4xl md:text-6xl ${light ? "text-[#F9F7F2]" : "text-foreground"}`}>
        {title} {italic && <span className="italic text-[#2D5A43]">{italic}</span>}
      </h2>
      {intro && (
        <p className={`text-base md:text-lg ${light ? "text-[#F9F7F2]/70" : "text-muted-foreground"}`}>
          {intro}
        </p>
      )}
      <div className="gold-rule w-28 mt-1" />
    </Reveal>
  );
}