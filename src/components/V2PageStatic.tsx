"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import svgPaths from "../svg-9z9wiml24b";
import { PlusIcon, PlusSmallIcon } from "./Icons";
import PricingComparison from "./PricingComparison";

const imgHero = "/assets/a4d848fc8e2e4a83a5179b20fc12c3245deb2b64.png";
const imgFeature1 = "/assets/50bd69f5fdd8bee31086dcd752e9faef3c2d5853.png";
const imgFeature2 = "/assets/a3c84ae7751b81b4cbd620fcee7d2577b3f201dc.png";
const imgFeature3 = "/assets/573e77a25801c64ed5aee33c55804dfe3fcf92d1.png";
const imgAvatar = "/assets/283a376b0fafb9874fefe43652d98fad3cdad31c.png";
const imgSec1 = "/assets/4c252a4b255cda49a808c6317a1e8e87c8b89453.png";
const imgSec2 = "/assets/487818f4b6cf2397615f34f309fe40a712ebec95.png";
const imgSec3 = "/assets/5281ab6aa0636038040ed64dad74e65a1211041f.png";
const imgFilm = "/assets/1f0e5946b884ef95fa586fc7af2e5bdca32525e7.png";
const imgCase = "/assets/4dc6e4130302c1fff2514ea9247cc5842789902a.png";

interface V2PageProps {
  onOpenModal: () => void;
  cmsData?: any[] | null;
}

/* ─── SVG Logo ─── */
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

function VroffLogoLarge({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 1200 360">
      <path d={svgPaths.p28c08800} fill="currentColor" />
      <path d={svgPaths.p1b850880} fill="currentColor" />
      <path d={svgPaths.p1f099800} fill="currentColor" />
      <path d={svgPaths.p1934e700} fill="currentColor" />
      <path d={svgPaths.p2b9be440} fill="currentColor" />
    </svg>
  );
}

/* ─── Arrow icon ─── */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 50 50">
      <rect fill="currentColor" height="50" rx="25" width="50" opacity="0.2" />
      <path clipRule="evenodd" d={svgPaths.p2ce0ba00} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/* ─── Play icon ─── */
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 46.875 46.875">
      <path clipRule="evenodd" d={svgPaths.p363b18f0} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════ */
function V2Header({ onOpenModal, scrolled }: { onOpenModal: () => void; scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const allNavItems = [
    { label: "Pris", href: "#v2-pricing" },
    { label: "Kundcase", href: "#v2-cases" },
    { label: "__logo__", href: "#" },
    { label: "Om oss", href: "#v2-security" },
    { label: "Media", href: "#v2-film" },
  ];

  const scrollTo = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMenuOpen(false);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full flex justify-center pt-4 pointer-events-none px-4 md:px-0">
      <div
        className={`bg-[#fafafa] rounded-[20px] pointer-events-auto transition-all duration-500 ease-out ${
          scrolled ? "shadow-md" : ""
        } ${menuOpen
          ? "w-full md:w-[542px] flex flex-col md:flex-row items-center gap-0 md:gap-[15px] justify-center px-0"
          : "w-[calc(100%-32px)] md:w-[351px] h-[70px] flex items-center justify-between px-[30px]"
        }`}
      >
        {menuOpen ? (
          <>
            {/* Mobile: vertical nav with logo on top */}
            <div className="flex md:hidden flex-col items-center w-full py-4 gap-2">
              <button type="button" onClick={() => scrollTo("#")} className="cursor-pointer p-3">
                <VroffLogo className="w-[86px] h-[25.8px] text-[#5d0f0f]" />
              </button>
              {allNavItems.filter(n => n.label !== "__logo__").map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollTo(item.href)}
                  className="w-full text-center py-3 text-[#5d0f0f] text-[16px] font-semibold cursor-pointer hover:bg-[#5d0f0f]/5 transition-colors rounded-[10px]"
                >
                  {item.label}
                </button>
              ))}
              <button type="button" onClick={() => setMenuOpen(false)} className="mt-1 py-2 text-[#5d0f0f]/40 text-[14px] cursor-pointer">
                Stäng
              </button>
            </div>

            {/* Desktop: horizontal nav */}
            <div className="hidden md:flex items-center gap-[15px] h-[70px]">
              {allNavItems.map((item) =>
                item.label === "__logo__" ? (
                  <button key="logo" type="button" onClick={() => scrollTo("#")} className="cursor-pointer shrink-0 p-[14px] flex items-center justify-center">
                    <VroffLogo className="w-[86px] h-[25.8px] text-[#5d0f0f]" />
                  </button>
                ) : (
                  <button key={item.label} type="button" onClick={() => scrollTo(item.href)}
                    className="flex items-center px-[10px] py-[3px] h-[70px] text-[#5d0f0f] text-[16px] font-semibold leading-[1.36] text-center cursor-pointer hover:opacity-70 transition-opacity">
                    {item.label}
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          <>
            <button type="button" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} className="cursor-pointer flex items-center justify-center">
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

/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */
function V2Hero({ onOpenModal, cms }: { onOpenModal: () => void; cms?: any }) {
  return (
    <section className="relative w-full h-[700px] md:h-[800px] flex items-center justify-center overflow-hidden -mt-[90px]">
      <img src={cms?.background_image?.filename || imgHero} alt="Vroff hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 flex flex-col items-center gap-[30px] pt-[80px] text-center px-6">
        <h1 className="text-[#fafafa] text-[40px] md:text-[76px] font-semibold leading-[1.01] tracking-[-2px] md:tracking-[-3.8px] max-w-[759px]">
          {cms?.headline || "Vroff är det nya mänskligare sättet att samarbeta"}
        </h1>
        <p className="text-white text-[16px] md:text-[20px] max-w-[600px]">
          {cms?.subtext || "Lorem ipsum dolor Esse ipsam incidunt eligendi veroihil utsit amet, onsectetur adipiscing elit."}
        </p>
        <button type="button" onClick={onOpenModal} className="bg-[#6674f2] text-[#fafafa] font-semibold px-[30px] py-[12px] rounded-[20px] text-[16px] cursor-pointer hover:bg-[#5664e2] transition-colors">
          Prova på
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FEATURES - carousel
   ═══════════════════════════════════════════════════ */
const featureData = [
  { title: "Allt på ett ställe", img: imgFeature1, desc: "Voluptas veritatis delectus debitis officia. Eaque et nulla reprehenderit occaecati expedita quia deleniti error dolor labore quod.", bg: undefined, imgClass: "w-full h-full object-cover" },
  { title: "Kalendar", img: imgFeature2, desc: "Voluptas veritatis delectus debitis officia. Eaque et nulla reprehenderit occaecati expedita quia deleniti error dolor labore quod. Fuga veritatis eligendi unde ut.", bg: "#b4bbfd", imgClass: "absolute bottom-0 right-0 w-[95%] h-[86%] object-cover" },
  { title: "Allt på ett ställe", img: imgFeature3, desc: "Voluptas veritatis delectus debitis officia. Eaque et nulla reprehenderit occaecati expedita quia deleniti error dolor labore quod. Fuga veritatis eligendi unde ut.", bg: undefined, imgClass: "w-full h-full object-cover" },
];

function V2Features({ cms }: { cms?: any }) {
  const [slide, setSlide] = useState(0);
  const dragRef = useRef<{ x: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(557);
  const maxSlide = Math.max(0, featureData.length - 1);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const first = trackRef.current.firstElementChild as HTMLElement;
    if (first) setStep(first.offsetWidth + 57);
  }, []);
  useEffect(() => { measure(); window.addEventListener("resize", measure); return () => window.removeEventListener("resize", measure); }, [measure]);

  const onPointerDown = (e: React.PointerEvent) => { dragRef.current = { x: e.clientX }; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    dragRef.current = null;
    if (Math.abs(dx) > 40) setSlide((p) => Math.max(0, Math.min(maxSlide, p + (dx > 0 ? -1 : 1))));
  };

  return (
    <section className="bg-[#f5efdf] w-full py-[100px] md:py-[150px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[65px]">
        <div>
          <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{cms?.headline || "Detta är Vroff"}</h2>
          <p className="text-[#5d0f0f] text-[16px] font-medium leading-[1.5] mt-4 max-w-[672px]">Voluptas veritatis delectus debitis officia. Eaque et nulla reprehenderit occaecati expedita quia deleniti error dolor labore quod. Fuga veritatis eligendi unde ut.</p>
        </div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown} onPointerUp={onPointerUp} style={{ touchAction: "pan-y" }}>
          <div ref={trackRef} className="flex gap-[57px] transition-transform duration-500 ease-out select-none"
            style={{ transform: `translateX(${-slide * step}px)` }}>
            {featureData.map((f, i) => (
              <div key={i} onClick={() => setSlide(Math.max(0, Math.min(maxSlide, i)))} className={`shrink-0 w-[calc(100vw-48px)] md:w-[500px] flex flex-col transition-opacity duration-300 cursor-pointer ${i === slide ? "opacity-100" : "opacity-50"}`}>
                <div className="h-[280px] md:h-[380px] rounded-[10px] overflow-hidden relative" style={f.bg ? { backgroundColor: f.bg } : undefined}>
                  <img src={f.img} alt={f.title} className={f.imgClass} draggable={false} />
                </div>
                <div className="pt-[30px] pr-[40px] md:pr-[120px]">
                  <h3 className="text-[#5d0f0f] text-[24px] md:text-[32px] font-semibold tracking-[-0.64px]">{f.title}</h3>
                  <p className="text-[#5d0f0f] text-[16px] font-medium leading-[1.5] mt-4">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-[10px]">
          <button type="button" onClick={() => setSlide((p) => Math.max(0, p - 1))}
            className="w-[50px] h-[50px] rotate-180 cursor-pointer text-[#ac4324] hover:opacity-70 transition-opacity">
            <ArrowIcon className="w-full h-full" />
          </button>
          <button type="button" onClick={() => setSlide((p) => Math.min(maxSlide, p + 1))}
            className="w-[50px] h-[50px] cursor-pointer text-[#ac4324] hover:opacity-70 transition-opacity">
            <ArrowIcon className="w-full h-full" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   TESTIMONIALS - carousel with swipe
   ═══════════════════════════════════════════════════ */
const testimonialData = [
  { quote: '"Totam unde adipisci eius dolor quam adipisci aut ut aliquam est perspiciatis et. Molestiae qui sequi labore et asper."', name: "Helen Hansson", role: "Rolebeskrivning" },
  { quote: '"Detta verktyg har revolutionerat vårt sätt att arbeta. Teamet älskar hur enkelt det är."', name: "Erik Svensson", role: "Product Manager" },
  { quote: '"Enkelt att komma igång och supportsystemet är förstklassigt."', name: "Anna Karlsson", role: "CEO" },
  { quote: '"Vi har testat många lösningar men denna är överlägsen."', name: "Maria Andersson", role: "Team Lead" },
];

function V2Testimonials({ cms }: { cms?: any }) {
  const [slide, setSlide] = useState(0);
  const dragRef = useRef<{ x: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(370);
  const maxSlide = Math.max(0, testimonialData.length - 1);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const first = trackRef.current.firstElementChild as HTMLElement;
    if (first) setStep(first.offsetWidth + 40);
  }, []);
  useEffect(() => { measure(); window.addEventListener("resize", measure); return () => window.removeEventListener("resize", measure); }, [measure]);

  const onPointerDown = (e: React.PointerEvent) => { dragRef.current = { x: e.clientX }; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    dragRef.current = null;
    if (Math.abs(dx) > 40) setSlide((p) => Math.max(0, Math.min(maxSlide, p + (dx > 0 ? -1 : 1))));
  };

  return (
    <section className="bg-[#fafafa] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[50px]">
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{cms?.headline || "Vad folk säger"}</h2>
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" onPointerDown={onPointerDown} onPointerUp={onPointerUp} style={{ touchAction: "pan-y" }}>
          <div ref={trackRef} className="flex gap-[40px] transition-transform duration-500 ease-out select-none" style={{ transform: `translateX(${-slide * step}px)` }}>
            {testimonialData.map((t, i) => (
              <div key={i} onClick={() => setSlide(Math.max(0, Math.min(maxSlide, i)))} className={`shrink-0 w-[calc(100vw-48px)] md:w-[330px] bg-[#e8eaff] rounded-[10px] p-[35px] flex flex-col gap-[23px] justify-between transition-opacity duration-300 cursor-pointer ${i === slide ? "opacity-100" : "opacity-50"}`}>
                <p className="text-[#5d0f0f] text-[20px] font-medium leading-[1.5] flex-1">{t.quote}</p>
                <div className="flex items-center gap-[16px]">
                  <img src={imgAvatar} alt={t.name} className="w-[48px] h-[48px] rounded-full object-cover" />
                  <div>
                    <p className="text-[#5d0f0f] text-[16px] font-bold">{t.name}</p>
                    <p className="text-[#5d0f0f] text-[14px] font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-[10px]">
          <button type="button" onClick={() => setSlide((p) => Math.max(0, p - 1))} className="w-[50px] h-[50px] rotate-180 cursor-pointer text-[#8c96f9] hover:opacity-70 transition-opacity"><ArrowIcon className="w-full h-full" /></button>
          <button type="button" onClick={() => setSlide((p) => Math.min(maxSlide, p + 1))} className="w-[50px] h-[50px] cursor-pointer text-[#8c96f9] hover:opacity-70 transition-opacity"><ArrowIcon className="w-full h-full" /></button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECURITY
   ═══════════════════════════════════════════════════ */
const securityData = [
  { title: "Krypterat", desc: "Självklart är Vroff fullt krypterat (AES). Ingen annan än dina medarbetare kan komma åt datan.", img: imgSec1 },
  { title: "Oberoende", desc: "Atque corporis maxime debitis modi vero aliquid. Consequatur voluptas quos atque minima omnis.", img: imgSec2 },
  { title: "Svenskt", desc: "Vroff utvecklas och driftas i Sverige och omfattas av GDPR, DORA, NIS2 och övriga EU regelverk.", img: imgSec3 },
];

function V2Security({ cms }: { cms?: any }) {
  return (
    <section id="v2-security" className="bg-[#3b0101] w-full py-[100px] md:py-[150px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[50px]">
        <div>
          <h2 className="text-[#ac4324] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">Säkerhet</h2>
          <p className="text-[#c15333] text-[16px] font-medium leading-[1.5] mt-4 max-w-[672px]">Voluptas veritatis delectus debitis officia. Eaque et nulla reprehenderit occaecati expedita quia deleniti error dolor labore quod.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-[30px]">
          {securityData.map((s, i) => (
            <div key={i} className="bg-[#5d0f0f] rounded-[10px] p-[44px] flex flex-col gap-[25px] flex-1">
              <div className="h-[220px] rounded-[7px] overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[#fafafa] text-[18px] font-semibold">{s.title}</p>
                <p className="text-[#c15333] text-[18px] font-medium leading-[1.5] mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FILM - with play button pulse
   ═══════════════════════════════════════════════════ */
function V2Film() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const togglePlay = () => {
    if (playing) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setPlaying(false);
    } else {
      setPlaying(true);
      const start = progress >= 100 ? 0 : progress;
      if (progress >= 100) setProgress(0);
      timerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = null;
            setPlaying(false);
            return 100;
          }
          return p + 0.4;
        });
      }, 100);
    }
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const formatTime = (pct: number) => {
    const totalSec = 253; // 4:13
    const current = Math.floor((pct / 100) * totalSec);
    const min = Math.floor(current / 60);
    const sec = current % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <section id="v2-film" className="bg-[#ede1c9] w-full py-[100px] flex justify-center px-6">
      <div
        className="relative w-full max-w-[1152px] rounded-[10px] overflow-hidden cursor-pointer group"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={togglePlay}
      >
        {/* Thumbnail */}
        <div className="relative w-full h-[400px] md:h-[709px]">
          <img src={imgFilm} alt="Demo film" className="absolute inset-0 w-full h-full object-cover" />

          {/* Dark overlay – stronger when paused */}
          <div className={`absolute inset-0 transition-colors duration-300 ${playing ? "bg-black/5" : hovering ? "bg-black/30" : "bg-black/15"}`} />

          {/* Center play/pause indicator */}
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-white/90 rounded-full flex items-center justify-center transition-transform duration-300 ${hovering ? "scale-110" : "scale-100"}`}>
                <PlayIcon className="w-[50px] h-[50px] text-[#5d0f0f] ml-1" />
              </div>
            </div>
          )}

          {/* Pause icon when playing and hovering */}
          {playing && hovering && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-white/80 rounded-full flex items-center justify-center gap-[8px]">
                <div className="w-[8px] h-[28px] bg-[#5d0f0f] rounded-[2px]" />
                <div className="w-[8px] h-[28px] bg-[#5d0f0f] rounded-[2px]" />
              </div>
            </div>
          )}
        </div>

        {/* Controls bar */}
        <div className="bg-[#1a1a1a] px-[20px] md:px-[35px] py-[16px] flex items-center gap-[16px]">
          {/* Play/Pause button */}
          <button type="button" onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="shrink-0 cursor-pointer">
            {playing ? (
              <div className="flex items-center gap-[4px]">
                <div className="w-[4px] h-[16px] bg-[#fafafa] rounded-[1px]" />
                <div className="w-[4px] h-[16px] bg-[#fafafa] rounded-[1px]" />
              </div>
            ) : (
              <PlayIcon className="w-[20px] h-[20px] text-[#fafafa]" />
            )}
          </button>

          {/* Time */}
          <span className="text-[#fafafa] text-[14px] font-medium shrink-0 w-[40px]">{formatTime(progress)}</span>

          {/* Progress bar */}
          <div className="flex-1 h-[4px] bg-white/20 rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.max(0, Math.min(100, pct)));
            }}>
            <div className="h-full bg-[#6674f2] rounded-full transition-[width] duration-100" style={{ width: `${progress}%` }} />
          </div>

          {/* Duration */}
          <span className="text-[#fafafa]/60 text-[14px] font-medium shrink-0">4:13</span>

          {/* Fullscreen icon placeholder */}
          <button type="button" onClick={(e) => e.stopPropagation()} className="shrink-0 cursor-pointer text-[#fafafa]/60 hover:text-[#fafafa] transition-colors">
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   GET STARTED - interactive stepper
   ═══════════════════════════════════════════════════ */
const steps = [
  { label: "Ladda ned", mockTitle: "Ladda ned Vroff", mockContent: "Välj din plattform och ladda ned appen. Finns för Mac, Windows, iOS och Android." },
  { label: "Skapa konto", mockTitle: "Skapa ditt konto", mockContent: "Fyll i namn och e-post. Du får en bekräftelse direkt." },
  { label: "Bjuder in andra", mockTitle: "Bjud in ditt team", mockContent: "Lägg till kollegor med e-post. De får en inbjudan inom sekunder." },
  { label: "Öppna rummet", mockTitle: "Öppna ert första rum", mockContent: "Skapa ett rum, ge det ett namn, och börja samarbeta direkt." },
  { label: "Nu är du igång :-)", mockTitle: "Klart!", mockContent: "Du och ditt team är nu redo att samarbeta på ett mänskligare sätt." },
];

function V2GetStarted({ cms }: { cms?: any }) {
  const [activeStep, setActiveStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActiveStep((p) => (p + 1) % steps.length);
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, activeStep]);

  return (
    <section className="bg-[#b4bbfd] w-full py-[100px] md:py-[150px] px-6 md:px-[120px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[60px] md:gap-[104px]">
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{cms?.headline || "Komma igång på 30 sekunder"}</h2>

        <div className="flex flex-col md:flex-row gap-[40px] md:gap-[64px]"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Step list */}
          <div className="bg-[#d7dbfe] rounded-[10px] py-[25px] w-full md:w-[330px] shrink-0">
            {steps.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setActiveStep(i); setPaused(true); }}
                className={`w-full text-left px-[30px] py-[16px] text-[20px] font-semibold tracking-[-0.4px] text-[#5d0f0f] cursor-pointer transition-colors duration-200 ${
                  i === activeStep ? "bg-[#e6e8fc]" : "hover:bg-[#e6e8fc]/50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Demo area – röd skala, vit kontrast */}
          <div className="bg-[#3b0101] rounded-[10px] flex-1 p-[33px] md:p-[40px] min-h-[400px] md:min-h-[533px] flex flex-col justify-between">
            <div className="flex flex-col gap-[20px]" key={activeStep}>
              {/* Step icon */}
              <div className="bg-[#5d0f0f] w-[33px] h-[33px] rounded-[10px] flex items-center justify-center">
                <span className="text-white text-[16px] font-bold">{activeStep + 1}</span>
              </div>
              <h3 className="text-white text-[24px] md:text-[32px] font-semibold tracking-[-0.64px] animate-[slideInRight_0.35s_ease-out]">{steps[activeStep].mockTitle}</h3>
              <p className="text-[#e0d1b4] text-[16px] md:text-[18px] font-medium leading-[1.5] max-w-[500px] animate-[slideInRight_0.35s_ease-out]">{steps[activeStep].mockContent}</p>

              {/* Step 0: Download – platform buttons */}
              {activeStep === 0 && (
                <div className="flex flex-wrap gap-3 mt-4 animate-[slideInRight_0.4s_ease-out]">
                  {["macOS", "Windows", "iOS", "Android"].map((p) => (
                    <div key={p} className="bg-[#5d0f0f] border border-[#822727] rounded-[10px] px-5 py-3 flex items-center gap-2 cursor-pointer hover:bg-[#822727] transition-colors">
                      <div className="w-[20px] h-[20px] rounded-[4px] bg-[#9b3316]" />
                      <span className="text-white text-[14px] font-semibold">{p}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 1: Create account – form fields */}
              {activeStep === 1 && (
                <div className="flex flex-col gap-3 mt-4 animate-[slideInRight_0.4s_ease-out]">
                  <div className="bg-[#5d0f0f] border border-[#822727] rounded-[10px] px-4 py-3">
                    <span className="text-[#e0d1b4]/60 text-[14px]">namn@exempel.se</span>
                  </div>
                  <div className="bg-[#5d0f0f] border border-[#822727] rounded-[10px] px-4 py-3">
                    <span className="text-[#e0d1b4]/60 text-[14px]">Ditt namn</span>
                  </div>
                  <div className="bg-[#822727] rounded-[10px] px-4 py-3 mt-1 flex items-center justify-center cursor-pointer hover:bg-[#9b3316] transition-colors">
                    <span className="text-white text-[14px] font-semibold">Skapa konto</span>
                  </div>
                </div>
              )}

              {/* Step 2: Invite – contact list */}
              {activeStep === 2 && (
                <div className="flex flex-col gap-3 mt-4 animate-[slideInRight_0.4s_ease-out]">
                  {[
                    { name: "Anna Svensson", email: "anna@foretag.se", added: true },
                    { name: "Erik Lindqvist", email: "erik@foretag.se", added: true },
                    { name: "Maria Karlsson", email: "maria@foretag.se", added: false },
                  ].map((c) => (
                    <div key={c.name} className="bg-[#5d0f0f] border border-[#822727] rounded-[10px] px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-[32px] h-[32px] rounded-full bg-[#822727] flex items-center justify-center">
                          <span className="text-[#e0d1b4] text-[12px] font-bold">{c.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-white text-[14px] font-semibold">{c.name}</p>
                          <p className="text-[#e0d1b4]/60 text-[12px]">{c.email}</p>
                        </div>
                      </div>
                      {c.added ? (
                        <span className="text-[#e0d1b4] text-[12px] font-medium">Inbjuden</span>
                      ) : (
                        <div className="bg-[#822727] rounded-[6px] px-3 py-1 cursor-pointer hover:bg-[#9b3316] transition-colors">
                          <span className="text-white text-[12px] font-semibold">Bjud in</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Open room – room preview */}
              {activeStep === 3 && (
                <div className="mt-4 animate-[slideInRight_0.4s_ease-out]">
                  <div className="bg-[#5d0f0f] border border-[#822727] rounded-[10px] p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white text-[16px] font-semibold">Mitt första rum</p>
                        <p className="text-[#e0d1b4]/60 text-[12px]">3 deltagare online</p>
                      </div>
                      <div className="flex -space-x-2">
                        {["A", "E", "M"].map((l) => (
                          <div key={l} className="w-[28px] h-[28px] rounded-full bg-[#822727] border-2 border-[#5d0f0f] flex items-center justify-center">
                            <span className="text-[#e0d1b4] text-[10px] font-bold">{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {["Chatt", "Filer", "Kalender"].map((t) => (
                        <div key={t} className="bg-[#822727] rounded-[6px] px-3 py-1.5">
                          <span className="text-[#e0d1b4] text-[12px] font-medium">{t}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 space-y-2">
                      {[76, 138, 93].map((w, j) => (
                        <div key={j} className="h-[8px] bg-[#822727] rounded-full" style={{ width: w }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Done – success */}
              {activeStep === 4 && (
                <div className="mt-6 flex flex-col items-center gap-4 animate-[slideInRight_0.4s_ease-out]">
                  <div className="w-[80px] h-[80px] rounded-full border-[3px] border-white flex items-center justify-center">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-white text-[18px] font-semibold">Allt klart!</p>
                </div>
              )}
            </div>

            {/* Progress – röd skala */}
            <div className="mt-8 bg-[#5d0f0f] rounded-[10px] h-[8px] overflow-hidden">
              <div className="h-full bg-[#9b3316] rounded-[10px] transition-all duration-300" style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Dot indicators – röd skala */}
        <div className="flex items-center justify-center gap-[25px]">
          {steps.map((_, i) => (
            <button key={i} type="button" onClick={() => setActiveStep(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${i === activeStep ? "bg-[#5d0f0f] w-[82px] h-[15px]" : "bg-[#5d0f0f] w-[15px] h-[15px] opacity-30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PRICING - selectable cards
   ═══════════════════════════════════════════════════ */
interface V2Feature {
  name: string;
  included: boolean;
}

const v2PricingTiers = [
  {
    name: "Free", sub: "Prova", price: "0 SEK", priceSub: "Gratis för alla",
    desc: "Perfekt för att testa och komma igång.",
    features: [
      { name: "5 användare", included: true },
      { name: "10 GB lagring", included: true },
      { name: "Grundläggande support", included: true },
      { name: "Mobil app", included: true },
      { name: "Videomöten 30 min", included: true },
      { name: "Realtidsredigering", included: false },
      { name: "API-åtkomst", included: false },
    ] as V2Feature[],
  },
  {
    name: "Pro", sub: "Vardags användning", price: "10 SEK", priceSub: "Per månad med årsrabatt.",
    desc: "För växande team som behöver mer kraft.",
    features: [
      { name: "25 användare", included: true },
      { name: "100 GB lagring", included: true },
      { name: "Prioriterad support", included: true },
      { name: "Mobil app", included: true },
      { name: "Videomöten 2 timmar", included: true },
      { name: "Realtidsredigering", included: true },
      { name: "API-åtkomst", included: false },
    ] as V2Feature[],
  },
  {
    name: "Max", sub: "Allt vi har plus mer", price: "20 SEK", priceSub: "Per månad per person",
    desc: "Fullständig lösning för större organisationer.",
    features: [
      { name: "Obegränsat användare", included: true },
      { name: "1 TB lagring", included: true },
      { name: "Dedikerad support", included: true },
      { name: "Mobil app", included: true },
      { name: "Obegränsade videomöten", included: true },
      { name: "Realtidsredigering", included: true },
      { name: "API-åtkomst", included: true },
    ] as V2Feature[],
  },
];

function V2Pricing({ onOpenModal }: { onOpenModal: () => void }) {
  const [selected, setSelected] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <>
      <section id="v2-pricing" className="bg-[#d7dbfe] w-full py-[100px] md:py-[150px] px-6 md:px-[120px]">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-[50px]">
          <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">Pris</h2>
          <div className="flex flex-col md:flex-row gap-[30px] items-stretch">
            {v2PricingTiers.map((p, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className={`bg-[#e6e8fc] rounded-[10px] p-[35px] flex flex-col flex-1 cursor-pointer transition-all duration-200 ${
                  selected === i ? "ring-2 ring-[#5d0f0f]" : "hover:ring-1 hover:ring-[#b4bbfd]"
                }`}
              >
                {/* Header */}
                <div>
                  <h3 className="text-[#5d0f0f] text-[26px] font-semibold tracking-[-0.52px]">{p.name}</h3>
                  <p className="text-[#5d0f0f] text-[16px] font-medium">{p.sub}</p>
                </div>

                {/* Price */}
                <div className="mt-[29px]">
                  <p className="text-[#5d0f0f] text-[22px] font-semibold tracking-[-0.44px]">{p.price}</p>
                  <p className="text-[#5d0f0f]/60 text-[14px] font-medium leading-[1.4]">{p.priceSub}</p>
                </div>

                {/* Description */}
                <p className="text-[#5d0f0f] text-[16px] font-medium leading-[1.5] mt-4">{p.desc}</p>

                {/* CTA */}
                <button type="button" onClick={(e) => { e.stopPropagation(); onOpenModal(); }}
                  className={`mt-6 font-semibold text-[16px] rounded-[10px] h-[40px] w-full flex items-center justify-center cursor-pointer transition-colors ${
                    selected === i
                      ? "bg-[#5d0f0f] text-[#fafafa] hover:bg-[#3b0101]"
                      : "bg-[#5d0f0f]/10 text-[#5d0f0f] hover:bg-[#5d0f0f]/20"
                  }`}>
                  {selected === i ? "Vald" : "Prova på"}
                </button>

                {/* Divider */}
                <div className="border-t border-[#d7dbfe] mt-6" />

                {/* Features with check/dash */}
                <div className="flex flex-col gap-[12px] mt-6">
                  {p.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-2">
                      {f.included ? (
                        <span className="text-[#5d0f0f] text-[14px] mt-[1px]">&#10003;</span>
                      ) : (
                        <span className="text-[#5d0f0f]/25 text-[14px] mt-[1px]">—</span>
                      )}
                      <span className={`text-[14px] font-medium ${f.included ? "text-[#5d0f0f]" : "text-[#5d0f0f]/40"}`}>{f.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Compare button */}
          <button
            type="button"
            onClick={() => setShowComparison(true)}
            className="text-[#5d0f0f] text-[16px] font-semibold border border-[#5d0f0f] rounded-[50px] px-6 py-2 self-start cursor-pointer hover:bg-[#5d0f0f] hover:text-[#fafafa] transition-colors"
          >
            Se fullständig prisjämförelse
          </button>
        </div>
      </section>

      {/* Reuse V1 comparison modal */}
      <PricingComparison isOpen={showComparison} onClose={() => setShowComparison(false)} />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   FAQ - animated accordion
   ═══════════════════════════════════════════════════ */
const faqData = [
  { q: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", a: "Nihil commodi sint adipisci dignissimos ducimus quidem dolorem recusandae et sint quia doloremque. Voluptatem sed et ut impedit possimus nihil quaerat dolores architecto" },
  { q: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", a: "Nihil commodi sint adipisci dignissimos ducimus quidem dolorem recusandae et sint quia doloremque." },
  { q: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", a: "Nihil commodi sint adipisci dignissimos ducimus quidem dolorem recusandae et sint quia doloremque." },
  { q: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", a: "Nihil commodi sint adipisci dignissimos ducimus quidem dolorem recusandae." },
];

function V2FAQ({ cms }: { cms?: any }) {
  const [open, setOpen] = useState(2); // third item open by default like Figma
  return (
    <section className="bg-[#fafafa] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[59px]">
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{cms?.headline || "Vanliga frågor"}</h2>
        <div className="flex flex-col">
          {faqData.map((f, i) => (
            <FAQItemV2 key={i} q={f.q} a={f.a} isOpen={open === i} onClick={() => setOpen(open === i ? -1 : i)} isLast={i === faqData.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItemV2({ q, a, isOpen, onClick, isLast }: { q: string; a: string; isOpen: boolean; onClick: () => void; isLast?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  useEffect(() => { if (ref.current) setH(isOpen ? ref.current.scrollHeight : 0); }, [isOpen]);

  return (
    <div className={`border-t border-[#b4bbfd] ${isLast ? "border-b" : ""}`}>
      <button type="button" onClick={onClick} className="w-full flex items-center justify-between py-[20px] cursor-pointer" aria-expanded={isOpen}>
        <span className="text-[#5d0f0f] text-[16px] md:text-[20px] font-semibold text-left pr-4">{q}</span>
        <div className={`shrink-0 transition-transform duration-400 ${isOpen ? "rotate-45" : ""}`}>
          {isOpen ? <PlusIcon className="w-[25px] h-[25px] text-[#5d0f0f]" /> : <PlusSmallIcon className="w-[18px] h-[18px] text-[#5d0f0f]" />}
        </div>
      </button>
      <div className="overflow-hidden transition-[max-height,opacity] duration-400" style={{ maxHeight: h, opacity: isOpen ? 1 : 0 }}>
        <div ref={ref} className="pb-[20px] pl-[20px] pr-[60px] md:pr-[200px]">
          <p className="text-[#9b3316] text-[16px] md:text-[20px] font-medium leading-[1.5]">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CASES - horizontal scroll with drag + edge fade
   ═══════════════════════════════════════════════════ */
function V2Cases({ cms }: { cms?: any }) {
  const [slide, setSlide] = useState(0);
  const dragRef = useRef<{ x: number } | null>(null);
  const trackRef2 = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(977);
  const cases = [
    { name: "Katarina", title: "Träffa\nKatarina!", desc: "Voluptas veritatis delectus debitis officia. Eaque et nulla reprehenderit occaecati." },
    { name: "Lena", title: "Träffa\nLena", desc: "Voluptas veritatis delectus debitis officia. Eaque et nulla reprehenderit occaecati." },
    { name: "Erik", title: "Träffa\nErik!", desc: "Eaque et nulla reprehenderit occaecati expedita quia deleniti error dolor labore quod." },
  ];
  const maxSlide = Math.max(0, cases.length - 1);

  const measure2 = useCallback(() => {
    if (!trackRef2.current) return;
    const first = trackRef2.current.firstElementChild as HTMLElement;
    if (first) setStep(first.offsetWidth + 59);
  }, []);
  useEffect(() => { measure2(); window.addEventListener("resize", measure2); return () => window.removeEventListener("resize", measure2); }, [measure2]);

  const onPointerDown = (e: React.PointerEvent) => { dragRef.current = { x: e.clientX }; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    dragRef.current = null;
    if (Math.abs(dx) > 40) setSlide((p) => Math.max(0, Math.min(maxSlide, p + (dx > 0 ? -1 : 1))));
  };

  return (
    <section id="v2-cases" className="bg-[#ede1c9] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[51px]">
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{cms?.headline || "Case"}</h2>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown} onPointerUp={onPointerUp} style={{ touchAction: "pan-y" }}>
          <div ref={trackRef2} className="flex gap-[59px] transition-transform duration-500 ease-out select-none"
            style={{ transform: `translateX(${-slide * step}px)` }}>
            {cases.map((c, i) => (
              <div key={i} onClick={() => setSlide(i)} className={`shrink-0 bg-[#b4bbfd] rounded-[10px] p-[24px] md:p-[55px] w-[calc(100vw-48px)] md:w-[918px] transition-opacity duration-300 cursor-pointer ${i === slide ? "opacity-100" : "opacity-50"}`}>
                <div className="flex flex-col md:flex-row md:justify-between w-full gap-[24px] md:gap-0 md:h-[390px]">
                  {/* Image first on mobile */}
                  <div className="w-full h-[220px] md:h-full md:w-[390px] rounded-[10px] overflow-hidden shrink-0 md:order-2">
                    <img src={imgCase} alt={c.name} className="w-full h-full object-cover" draggable={false} />
                  </div>
                  {/* Text */}
                  <div className="flex flex-col justify-between md:order-1 gap-[20px]">
                    <div>
                      <h3 className="text-[#5d0f0f] text-[32px] md:text-[60px] font-semibold leading-[0.9] tracking-[-2px] md:tracking-[-3px] whitespace-pre-wrap">{c.title}</h3>
                      <p className="text-[#5d0f0f] text-[14px] md:text-[16px] font-medium leading-[1.5] mt-4 md:mt-6 max-w-[321px]">{c.desc}</p>
                    </div>
                    <button type="button" className="bg-[#6674f2] text-[#d7dbfe] font-semibold text-[14px] px-[30px] py-[12px] rounded-[15px] w-[155px] cursor-pointer hover:bg-[#5664e2] transition-colors">Läs hela story</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-[10px]">
          <button type="button" onClick={() => setSlide((p) => Math.max(0, p - 1))} className="w-[50px] h-[50px] rotate-180 cursor-pointer text-[#ac4324] hover:opacity-70 transition-opacity"><ArrowIcon className="w-full h-full" /></button>
          <button type="button" onClick={() => setSlide((p) => Math.min(maxSlide, p + 1))} className="w-[50px] h-[50px] cursor-pointer text-[#ac4324] hover:opacity-70 transition-opacity"><ArrowIcon className="w-full h-full" /></button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════ */
function V2Footer() {
  const cols = [
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum", "Praesentium", "praesentium.", "Numquam unde"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum", "Praesentium"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum", "Praesentium", "praesentium.", "Numquam unde"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum", "praesentium.", "Unde"] },
  ];

  return (
    <footer className="bg-[#5d0f0f] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[63px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-[16px] tracking-[-0.32px]">
          {cols.map((col, i) => (
            <div key={i} className="flex flex-col gap-1 leading-[1.8]">
              <p className="text-[#fafafa] font-semibold">{col.title}</p>
              {col.links.map((l, j) => (
                <p key={j} className="text-[#b4bbfd] font-medium cursor-pointer hover:text-white transition-colors">{l}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="pt-[46px] border-t border-[#b4bbfd]/40">
          <VroffLogoLarge className="w-[160px] h-[48px] text-[#6674f2]" />
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */
function findSection(sections: any[] | null | undefined, component: string): any | null {
  if (!sections) return null;
  return sections.find((s: any) => s.component === component) || null;
}

export default function V2Page({ onOpenModal, cmsData }: V2PageProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parse CMS sections -- each section component reads from its CMS block
  const heroData = findSection(cmsData, "hero");
  const featureData_cms = findSection(cmsData, "feature");
  const testimonialData_cms = findSection(cmsData, "testimonial");
  const securityData_cms = findSection(cmsData, "security");
  const faqData_cms = findSection(cmsData, "faq");
  const caseData_cms = findSection(cmsData, "case_study");
  const stepperData_cms = findSection(cmsData, "stepper");

  return (
    <div className="w-full min-h-screen bg-[#f5efdf]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
      <V2Header onOpenModal={onOpenModal} scrolled={scrolled} />
      <V2Hero onOpenModal={onOpenModal} cms={heroData} />
      <V2Features cms={featureData_cms} />
      <V2Testimonials cms={testimonialData_cms} />
      <V2Security cms={securityData_cms} />
      <V2Film />
      <V2GetStarted cms={stepperData_cms} />
      <V2Pricing onOpenModal={onOpenModal} />
      <V2FAQ cms={faqData_cms} />
      <V2Cases cms={caseData_cms} />
      <V2Footer />
    </div>
  );
}
