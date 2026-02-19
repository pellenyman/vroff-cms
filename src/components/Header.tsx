"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Pris", href: "#pricing" },
    { label: "Kundcase", href: "#cases" },
    { label: "Om oss", href: "#security" },
    { label: "Media", href: "#film" },
  ];

  const scrollTo = (href: string) => {
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); return; }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full flex justify-center pt-4 pointer-events-none px-4 md:px-0">
      <div className={`bg-[#fafafa] rounded-[20px] pointer-events-auto transition-all duration-500 ease-out ${scrolled ? "shadow-md" : ""} ${menuOpen ? "w-full md:w-[542px] flex flex-col md:flex-row items-center gap-0 md:gap-[15px] justify-center px-0" : "w-[calc(100%-32px)] md:w-[351px] h-[70px] flex items-center justify-between px-[30px]"}`}>
        {menuOpen ? (
          <>
            <div className="flex md:hidden flex-col items-center w-full py-4 gap-2">
              <button type="button" onClick={() => scrollTo("#")} className="cursor-pointer p-3">
                <span className="text-[#5d0f0f] text-[24px] font-bold">Vroff</span>
              </button>
              {navItems.map((item) => (
                <button key={item.label} type="button" onClick={() => scrollTo(item.href)} className="w-full text-center py-3 text-[#5d0f0f] text-[16px] font-semibold cursor-pointer hover:bg-[#5d0f0f]/5 transition-colors rounded-[10px]">{item.label}</button>
              ))}
              <button type="button" onClick={() => setMenuOpen(false)} className="mt-1 py-2 text-[#5d0f0f]/40 text-[14px] cursor-pointer">Stäng</button>
            </div>
            <div className="hidden md:flex items-center gap-[15px] h-[70px]">
              <button type="button" onClick={() => scrollTo("#pricing")} className="flex items-center px-[10px] py-[3px] h-[70px] text-[#5d0f0f] text-[16px] font-semibold cursor-pointer hover:opacity-70 transition-opacity">Pris</button>
              <button type="button" onClick={() => scrollTo("#cases")} className="flex items-center px-[10px] py-[3px] h-[70px] text-[#5d0f0f] text-[16px] font-semibold cursor-pointer hover:opacity-70 transition-opacity">Kundcase</button>
              <button type="button" onClick={() => scrollTo("#")} className="cursor-pointer shrink-0 p-[14px]"><span className="text-[#5d0f0f] text-[24px] font-bold">Vroff</span></button>
              <button type="button" onClick={() => scrollTo("#security")} className="flex items-center px-[10px] py-[3px] h-[70px] text-[#5d0f0f] text-[16px] font-semibold cursor-pointer hover:opacity-70 transition-opacity">Om oss</button>
              <button type="button" onClick={() => scrollTo("#film")} className="flex items-center px-[10px] py-[3px] h-[70px] text-[#5d0f0f] text-[16px] font-semibold cursor-pointer hover:opacity-70 transition-opacity">Media</button>
            </div>
          </>
        ) : (
          <>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="cursor-pointer"><span className="text-[#5d0f0f] text-[20px] font-bold">Vroff</span></button>
            <button type="button" onClick={() => setMenuOpen(true)} className="cursor-pointer" aria-label="Meny">
              <svg width="20" height="12" fill="none" viewBox="0 0 20 12.5">
                <line stroke="#5D0F0F" strokeLinecap="round" strokeWidth="2.5" x1="1.25" x2="18.75" y1="1.25" y2="1.25" />
                <line stroke="#5D0F0F" strokeLinecap="round" strokeWidth="2.5" x1="1.25" x2="18.75" y1="11.25" y2="11.25" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
