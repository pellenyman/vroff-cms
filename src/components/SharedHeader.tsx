"use client";

import { useState, useEffect } from "react";
import svgPaths from "../svg-9z9wiml24b";
import LanguageSwitcher from "./LanguageSwitcher";

function VroffLogo({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 86 25.8">
      <path d={svgPaths.pfbf4c80} fill="currentColor" />
      <path d={svgPaths.pea9c280} fill="currentColor" />
      <path d={svgPaths.p35edc900} fill="currentColor" />
      <path d={svgPaths.p2a2071c0} fill="currentColor" />
      <path d={svgPaths.p294dfb00} fill="currentColor" />
    </svg>
  );
}

interface SharedHeaderProps {
  cms?: any;
  scrolled?: boolean;
}

export default function SharedHeader({ cms, scrolled = false }: SharedHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(scrolled);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = cms?.items?.length
    ? cms.items.map((n: any) => ({ label: n.label, href: n.href }))
    : [];

  const goTo = (href: string) => {
    setMenuOpen(false);
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (href.startsWith("/")) { window.location.href = href; return; }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const allNavItems = [
    ...navItems.slice(0, 2),
    { label: "__logo__", href: "#" },
    ...navItems.slice(2),
  ];

  return (
    <div className="sticky top-0 z-50 w-full flex justify-center pt-4 pointer-events-none px-4 md:px-0">
      <div
        className={`bg-[#fafafa] rounded-[20px] pointer-events-auto transition-all duration-500 ease-out ${
          isScrolled ? "shadow-md" : ""
        } ${menuOpen
          ? "w-full md:w-[542px] flex flex-col md:flex-row items-center gap-0 md:gap-[15px] justify-center px-0"
          : "w-[calc(100%-32px)] md:w-[351px] h-[70px] flex items-center justify-between px-[30px]"
        }`}
      >
        {menuOpen ? (
          <>
            <div className="flex md:hidden flex-col items-center w-full py-4 gap-2">
              <button type="button" onClick={() => goTo("#")} className="cursor-pointer p-3">
                <VroffLogo className="w-[86px] h-[25.8px] text-[#5d0f0f]" />
              </button>
              {allNavItems.filter(n => n.label !== "__logo__").map((item: any) => (
                <button key={item.label} type="button" onClick={() => goTo(item.href)}
                  className="w-full text-center py-3 text-[#5d0f0f] text-[16px] font-semibold cursor-pointer hover:bg-[#5d0f0f]/5 transition-colors rounded-[10px]">
                  {item.label}
                </button>
              ))}
              <div className="mt-2"><LanguageSwitcher variant="dark" /></div>
              <button type="button" onClick={() => setMenuOpen(false)} className="mt-1 py-2 text-[#5d0f0f]/40 text-[14px] cursor-pointer">
                Stäng
              </button>
            </div>
            <div className="hidden md:flex items-center gap-[15px] h-[70px]">
              {allNavItems.map((item: any) =>
                item.label === "__logo__" ? (
                  <button key="logo" type="button" onClick={() => goTo("#")} className="cursor-pointer shrink-0 p-[14px] flex items-center justify-center">
                    <VroffLogo className="w-[86px] h-[25.8px] text-[#5d0f0f]" />
                  </button>
                ) : (
                  <button key={item.label} type="button" onClick={() => goTo(item.href)}
                    className="flex items-center px-[10px] py-[3px] h-[70px] text-[#5d0f0f] text-[16px] font-semibold leading-[1.36] text-center cursor-pointer hover:opacity-70 transition-opacity">
                    {item.label}
                  </button>
                )
              )}
              <LanguageSwitcher variant="dark" />
            </div>
          </>
        ) : (
          <>
            <button type="button" onClick={() => goTo("/")} className="cursor-pointer flex items-center justify-center">
              <VroffLogo className="w-[86px] h-[25.8px] text-[#5d0f0f]" />
            </button>
            <button type="button" onClick={() => setMenuOpen(true)} className="cursor-pointer flex items-center justify-center w-[20px] h-[10px] relative" aria-label="Öppna meny">
              <svg className="block w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 12.5" style={{ position: "absolute", inset: "-25% 0 0 0", width: "100%", height: "auto" }}>
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
