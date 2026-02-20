"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import svgPaths from "../svg-9z9wiml24b";
import { PlusIcon, PlusSmallIcon } from "./Icons";
import PricingComparison from "./PricingComparison";
import SharedHeader from "./SharedHeader";
import SharedFooter from "./SharedFooter";
import { useLang, localizeHref } from "@/lib/lang";

const BASE = "";
const imgHero = `${BASE}/assets/a4d848fc8e2e4a83a5179b20fc12c3245deb2b64.png`;
const imgFeature1 = `${BASE}/assets/50bd69f5fdd8bee31086dcd752e9faef3c2d5853.png`;
const imgFeature2 = `${BASE}/assets/a3c84ae7751b81b4cbd620fcee7d2577b3f201dc.png`;
const imgFeature3 = `${BASE}/assets/573e77a25801c64ed5aee33c55804dfe3fcf92d1.png`;
const imgAvatar = `${BASE}/assets/283a376b0fafb9874fefe43652d98fad3cdad31c.png`;
const imgSec1 = `${BASE}/assets/4c252a4b255cda49a808c6317a1e8e87c8b89453.png`;
const imgSec2 = `${BASE}/assets/487818f4b6cf2397615f34f309fe40a712ebec95.png`;
const imgSec3 = `${BASE}/assets/5281ab6aa0636038040ed64dad74e65a1211041f.png`;
const imgFilm = `${BASE}/assets/1f0e5946b884ef95fa586fc7af2e5bdca32525e7.png`;
const imgCase = `${BASE}/assets/4dc6e4130302c1fff2514ea9247cc5842789902a.png`;

const fallbackFeatureImgs = [imgFeature1, imgFeature2, imgFeature3];
const fallbackSecImgs = [imgSec1, imgSec2, imgSec3];

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

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 50 50">
      <rect fill="currentColor" height="50" rx="25" width="50" opacity="0.2" />
      <path clipRule="evenodd" d={svgPaths.p2ce0ba00} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 46.875 46.875">
      <path clipRule="evenodd" d={svgPaths.p363b18f0} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/* Header and Footer are now shared components (SharedHeader, SharedFooter) */

/* ═══════════════════════════════════════════════════
   HERO – fully CMS-driven
   ═══════════════════════════════════════════════════ */
function V2Hero({ onOpenModal, cms }: { onOpenModal: () => void; cms: any }) {
  return (
    <section className="relative w-full h-[700px] md:h-[800px] flex items-center justify-center overflow-hidden">
      <img src={cms?.background_image?.filename || imgHero} alt="Vroff hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 flex flex-col items-center gap-[30px] pt-[80px] text-center px-6">
        <h1 className="text-[#fafafa] text-[40px] md:text-[76px] font-semibold leading-[1.01] tracking-[-2px] md:tracking-[-3.8px] max-w-[759px]">
          {cms?.headline}
        </h1>
        <p className="text-white text-[16px] md:text-[20px] max-w-[600px]">
          {cms?.subtext}
        </p>
        <button type="button" onClick={onOpenModal} className="bg-[#6674f2] text-[#fafafa] font-semibold px-[30px] py-[12px] rounded-[20px] text-[16px] cursor-pointer hover:bg-[#5664e2] transition-colors">
          {cms?.cta_text}
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FEATURES – fully CMS-driven carousel
   ═══════════════════════════════════════════════════ */
function V2Features({ cms }: { cms: any }) {
  const items = (cms?.items || []).map((it: any, i: number) => ({
    title: it.title,
    desc: it.description,
    img: it.image?.filename || fallbackFeatureImgs[i % 3],
    bg: it.background_color || undefined,
    imgClass: it.background_color ? "absolute bottom-0 right-0 w-[95%] h-[86%] object-cover" : "w-full h-full object-cover",
  }));
  const [slide, setSlide] = useState(0);
  const dragRef = useRef<{ x: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(557);
  const maxSlide = Math.max(0, items.length - 1);

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

  if (!items.length) return null;

  return (
    <section className="bg-[#f5efdf] w-full py-[100px] md:py-[150px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[65px]">
        <div>
          <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{cms?.headline}</h2>
          <p className="text-[#5d0f0f] text-[16px] font-medium leading-[1.5] mt-4 max-w-[672px]">{cms?.description}</p>
        </div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown} onPointerUp={onPointerUp} style={{ touchAction: "pan-y" }}>
          <div ref={trackRef} className="flex gap-[57px] transition-transform duration-500 ease-out select-none"
            style={{ transform: `translateX(${-slide * step}px)` }}>
            {items.map((f: any, i: number) => (
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
   TESTIMONIALS – fully CMS-driven carousel
   ═══════════════════════════════════════════════════ */
function V2Testimonials({ cms }: { cms: any }) {
  const tItems = (cms?.items || []).map((t: any) => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    image: t.avatar?.filename || imgAvatar,
  }));
  const [slide, setSlide] = useState(0);
  const dragRef = useRef<{ x: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(370);
  const maxSlide = Math.max(0, tItems.length - 1);

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

  if (!tItems.length) return null;

  return (
    <section className="bg-[#fafafa] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[50px]">
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{cms?.headline}</h2>
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" onPointerDown={onPointerDown} onPointerUp={onPointerUp} style={{ touchAction: "pan-y" }}>
          <div ref={trackRef} className="flex gap-[40px] transition-transform duration-500 ease-out select-none" style={{ transform: `translateX(${-slide * step}px)` }}>
            {tItems.map((t: any, i: number) => (
              <div key={i} onClick={() => setSlide(Math.max(0, Math.min(maxSlide, i)))} className={`shrink-0 w-[calc(100vw-48px)] md:w-[330px] bg-[#e8eaff] rounded-[10px] p-[35px] flex flex-col gap-[23px] justify-between transition-opacity duration-300 cursor-pointer ${i === slide ? "opacity-100" : "opacity-50"}`}>
                <p className="text-[#5d0f0f] text-[20px] font-medium leading-[1.5] flex-1">{t.quote}</p>
                <div className="flex items-center gap-[16px]">
                  <img src={t.image} alt={t.name} className="w-[48px] h-[48px] rounded-full object-cover" />
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
   SECURITY – fully CMS-driven
   ═══════════════════════════════════════════════════ */
function V2Security({ cms }: { cms: any }) {
  const sItems = (cms?.items || []).map((s: any, i: number) => ({
    title: s.title,
    desc: s.description,
    img: s.image?.filename || fallbackSecImgs[i % 3],
  }));

  if (!sItems.length) return null;

  return (
    <section id="v2-security" className="bg-[#3b0101] w-full py-[100px] md:py-[150px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[50px]">
        <div>
          <h2 className="text-[#ac4324] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{cms?.headline}</h2>
          <p className="text-[#c15333] text-[16px] font-medium leading-[1.5] mt-4 max-w-[672px]">{cms?.description}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-[30px]">
          {sItems.map((s: any, i: number) => (
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
   FILM – CMS-driven video player
   ═══════════════════════════════════════════════════ */
function V2Film({ cms }: { cms: any }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const duration = cms?.duration || "4:13";
  const [durMin, durSec] = duration.split(":").map(Number);
  const totalSec = durMin * 60 + durSec;

  const togglePlay = () => {
    if (playing) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setPlaying(false);
    } else {
      setPlaying(true);
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
        <div className="relative w-full h-[400px] md:h-[709px]">
          <img src={cms?.thumbnail?.filename || imgFilm} alt={cms?.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className={`absolute inset-0 transition-colors duration-300 ${playing ? "bg-black/5" : hovering ? "bg-black/30" : "bg-black/15"}`} />
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-white/90 rounded-full flex items-center justify-center transition-transform duration-300 ${hovering ? "scale-110" : "scale-100"}`}>
                <PlayIcon className="w-[50px] h-[50px] text-[#5d0f0f] ml-1" />
              </div>
            </div>
          )}
          {playing && hovering && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-white/80 rounded-full flex items-center justify-center gap-[8px]">
                <div className="w-[8px] h-[28px] bg-[#5d0f0f] rounded-[2px]" />
                <div className="w-[8px] h-[28px] bg-[#5d0f0f] rounded-[2px]" />
              </div>
            </div>
          )}
        </div>

        <div className="bg-[#1a1a1a] px-[20px] md:px-[35px] py-[16px] flex items-center gap-[16px]">
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
          <span className="text-[#fafafa] text-[14px] font-medium shrink-0 w-[40px]">{formatTime(progress)}</span>
          <div className="flex-1 h-[4px] bg-white/20 rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.max(0, Math.min(100, pct)));
            }}>
            <div className="h-full bg-[#6674f2] rounded-full transition-[width] duration-100" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[#fafafa]/60 text-[14px] font-medium shrink-0">{duration}</span>
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
   GET STARTED – fully CMS-driven stepper
   ═══════════════════════════════════════════════════ */
function V2GetStarted({ cms }: { cms: any }) {
  const stepsData = (cms?.steps || []).map((s: any) => ({
    label: s.label,
    mockTitle: s.title,
    mockContent: s.content,
  }));
  const [activeStep, setActiveStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || !stepsData.length) return;
    timerRef.current = setInterval(() => {
      setActiveStep((p) => (p + 1) % stepsData.length);
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, activeStep, stepsData.length]);

  if (!stepsData.length) return null;

  return (
    <section className="bg-[#b4bbfd] w-full py-[100px] md:py-[150px] px-6 md:px-[120px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[60px] md:gap-[104px]">
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{cms?.headline}</h2>

        <div className="flex flex-col md:flex-row gap-[40px] md:gap-[64px]"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="bg-[#d7dbfe] rounded-[10px] py-[25px] w-full md:w-[330px] shrink-0">
            {stepsData.map((s: any, i: number) => (
              <button key={i} type="button"
                onClick={() => { setActiveStep(i); setPaused(true); }}
                className={`w-full text-left px-[30px] py-[16px] text-[20px] font-semibold tracking-[-0.4px] text-[#5d0f0f] cursor-pointer transition-colors duration-200 ${
                  i === activeStep ? "bg-[#e6e8fc]" : "hover:bg-[#e6e8fc]/50"
                }`}>
                {s.label}
              </button>
            ))}
          </div>

          <div className="bg-[#3b0101] rounded-[10px] flex-1 p-[33px] md:p-[40px] min-h-[400px] md:min-h-[533px] flex flex-col justify-between">
            <div className="flex flex-col gap-[20px]" key={activeStep}>
              <div className="bg-[#5d0f0f] w-[33px] h-[33px] rounded-[10px] flex items-center justify-center">
                <span className="text-white text-[16px] font-bold">{activeStep + 1}</span>
              </div>
              <h3 className="text-white text-[24px] md:text-[32px] font-semibold tracking-[-0.64px] animate-[slideInRight_0.35s_ease-out]">{stepsData[activeStep].mockTitle}</h3>
              <p className="text-[#e0d1b4] text-[16px] md:text-[18px] font-medium leading-[1.5] max-w-[500px] animate-[slideInRight_0.35s_ease-out]">{stepsData[activeStep].mockContent}</p>

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

            <div className="mt-8 bg-[#5d0f0f] rounded-[10px] h-[8px] overflow-hidden">
              <div className="h-full bg-[#9b3316] rounded-[10px] transition-all duration-300" style={{ width: `${((activeStep + 1) / stepsData.length) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-[25px]">
          {stepsData.map((_: any, i: number) => (
            <button key={i} type="button" onClick={() => setActiveStep(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${i === activeStep ? "bg-[#5d0f0f] w-[82px] h-[15px]" : "bg-[#5d0f0f] w-[15px] h-[15px] opacity-30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PRICING – fully CMS-driven
   ═══════════════════════════════════════════════════ */
function V2Pricing({ onOpenModal, cms }: { onOpenModal: () => void; cms: any }) {
  const tiers = (cms?.tiers || []).map((t: any) => ({
    name: t.name,
    sub: t.sub,
    price: t.price,
    priceSub: t.price_sub,
    desc: t.desc,
    features: (t.features || []).map((f: any) => ({ name: f.name, included: f.included })),
  }));
  const [selected, setSelected] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  if (!tiers.length) return null;

  return (
    <>
      <section id="v2-pricing" className="bg-[#d7dbfe] w-full py-[100px] md:py-[150px] px-6 md:px-[120px]">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-[50px]">
          <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{cms?.headline}</h2>
          <div className="flex flex-col md:flex-row gap-[30px] items-stretch">
            {tiers.map((p: any, i: number) => (
              <div key={i} onClick={() => setSelected(i)}
                className={`bg-[#e6e8fc] rounded-[10px] p-[35px] flex flex-col flex-1 cursor-pointer transition-all duration-200 ${
                  selected === i ? "ring-2 ring-[#5d0f0f]" : "hover:ring-1 hover:ring-[#b4bbfd]"
                }`}>
                <div>
                  <h3 className="text-[#5d0f0f] text-[26px] font-semibold tracking-[-0.52px]">{p.name}</h3>
                  <p className="text-[#5d0f0f] text-[16px] font-medium">{p.sub}</p>
                </div>
                <div className="mt-[29px]">
                  <p className="text-[#5d0f0f] text-[22px] font-semibold tracking-[-0.44px]">{p.price}</p>
                  <p className="text-[#5d0f0f]/60 text-[14px] font-medium leading-[1.4]">{p.priceSub}</p>
                </div>
                <p className="text-[#5d0f0f] text-[16px] font-medium leading-[1.5] mt-4">{p.desc}</p>
                <button type="button" onClick={(e) => { e.stopPropagation(); onOpenModal(); }}
                  className={`mt-6 font-semibold text-[16px] rounded-[10px] h-[40px] w-full flex items-center justify-center cursor-pointer transition-colors ${
                    selected === i
                      ? "bg-[#5d0f0f] text-[#fafafa] hover:bg-[#3b0101]"
                      : "bg-[#5d0f0f]/10 text-[#5d0f0f] hover:bg-[#5d0f0f]/20"
                  }`}>
                  {selected === i ? "Vald" : "Prova på"}
                </button>
                <div className="border-t border-[#d7dbfe] mt-6" />
                <div className="flex flex-col gap-[12px] mt-6">
                  {p.features.map((f: any, j: number) => (
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
          <button type="button" onClick={() => setShowComparison(true)}
            className="text-[#5d0f0f] text-[16px] font-semibold border border-[#5d0f0f] rounded-[50px] px-6 py-2 self-start cursor-pointer hover:bg-[#5d0f0f] hover:text-[#fafafa] transition-colors">
            {cms?.compare_button_text || "Se fullständig prisjämförelse"}
          </button>
        </div>
      </section>
      <PricingComparison isOpen={showComparison} onClose={() => setShowComparison(false)} />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   FAQ – fully CMS-driven accordion
   ═══════════════════════════════════════════════════ */
function V2FAQ({ cms }: { cms: any }) {
  const lang = useLang();
  const fItems = (cms?.items || []).map((f: any) => ({ q: f.question, a: f.answer }));
  const [open, setOpen] = useState(2);

  if (!fItems.length) return null;

  return (
    <section className="bg-[#fafafa] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[59px]">
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{cms?.headline}</h2>
        <div className="flex flex-col">
          {fItems.map((f: any, i: number) => (
            <FAQItemV2 key={i} q={f.q} a={f.a} isOpen={open === i} onClick={() => setOpen(open === i ? -1 : i)} isLast={i === fItems.length - 1} />
          ))}
        </div>
        {cms?.cta_text && (
          <a href={localizeHref(cms?.cta_link || "/faq", lang)} className="text-[#5d0f0f] text-[16px] font-semibold border border-[#5d0f0f] rounded-[50px] px-6 py-3 self-start cursor-pointer hover:bg-[#5d0f0f] hover:text-[#fafafa] transition-colors mt-4">
            {cms.cta_text}
          </a>
        )}
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
   CASES – fully CMS-driven carousel
   ═══════════════════════════════════════════════════ */
function V2Cases({ cms }: { cms: any }) {
  const lang = useLang();
  const cases = (cms?.items || []).map((c: any) => ({
    name: c.name,
    title: c.title,
    desc: c.description,
    img: c.image?.filename || imgCase,
    buttonText: c.button_text,
    slug: c.slug || c.name?.toLowerCase(),
  }));
  const [slide, setSlide] = useState(0);
  const dragRef = useRef<{ x: number } | null>(null);
  const trackRef2 = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(977);
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

  if (!cases.length) return null;

  return (
    <section id="v2-cases" className="bg-[#ede1c9] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[51px]">
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{cms?.headline}</h2>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown} onPointerUp={onPointerUp} style={{ touchAction: "pan-y" }}>
          <div ref={trackRef2} className="flex gap-[59px] transition-transform duration-500 ease-out select-none"
            style={{ transform: `translateX(${-slide * step}px)` }}>
            {cases.map((c: any, i: number) => (
              <div key={i} onClick={() => setSlide(i)} className={`shrink-0 bg-[#b4bbfd] rounded-[10px] p-[24px] md:p-[55px] w-[calc(100vw-48px)] md:w-[918px] transition-opacity duration-300 cursor-pointer ${i === slide ? "opacity-100" : "opacity-50"}`}>
                <div className="flex flex-col md:flex-row md:justify-between w-full gap-[24px] md:gap-0 md:h-[390px]">
                  <div className="w-full h-[220px] md:h-full md:w-[390px] rounded-[10px] overflow-hidden shrink-0 md:order-2">
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover" draggable={false} />
                  </div>
                  <div className="flex flex-col justify-between md:order-1 gap-[20px]">
                    <div>
                      <h3 className="text-[#5d0f0f] text-[32px] md:text-[60px] font-semibold leading-[0.9] tracking-[-2px] md:tracking-[-3px] whitespace-pre-wrap">{c.title}</h3>
                      <p className="text-[#5d0f0f] text-[14px] md:text-[16px] font-medium leading-[1.5] mt-4 md:mt-6 max-w-[321px]">{c.desc}</p>
                    </div>
                    <a href={localizeHref(`/case/${c.slug}`, lang)} className="bg-[#6674f2] text-[#d7dbfe] font-semibold text-[14px] px-[30px] py-[12px] rounded-[15px] w-[155px] text-center cursor-pointer hover:bg-[#5664e2] transition-colors">{c.buttonText}</a>
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

/* Footer is now a shared component (SharedFooter) */

/* ═══════════════════════════════════════════════════
   MAIN PAGE – orchestrates all CMS sections
   ═══════════════════════════════════════════════════ */
function findSection(sections: any[] | null | undefined, component: string): any | null {
  if (!sections) return null;
  return sections.find((s: any) => s.component === component) || null;
}

export default function V2Page({ onOpenModal, cmsData }: V2PageProps) {
  const navData = findSection(cmsData, "navigation");
  const heroData = findSection(cmsData, "hero");
  const featureData = findSection(cmsData, "feature");
  const testimonialData = findSection(cmsData, "testimonial");
  const securityData = findSection(cmsData, "security");
  const filmData = findSection(cmsData, "film_section");
  const stepperData = findSection(cmsData, "stepper");
  const pricingData = findSection(cmsData, "pricing_section");
  const faqData = findSection(cmsData, "faq");
  const caseData = findSection(cmsData, "case_study");
  const footerData = findSection(cmsData, "footer");

  if (!cmsData) {
    return (
      <div className="w-full min-h-screen bg-[#f5efdf] flex items-center justify-center" style={{ fontFamily: "'Quicksand', sans-serif" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-[40px] h-[40px] border-[3px] border-[#5d0f0f] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#5d0f0f] text-[18px] font-medium">Laddar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f5efdf]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
      <SharedHeader cms={navData} />
      {heroData && <V2Hero onOpenModal={onOpenModal} cms={heroData} />}
      {featureData && <V2Features cms={featureData} />}
      {testimonialData && <V2Testimonials cms={testimonialData} />}
      {securityData && <V2Security cms={securityData} />}
      {filmData && <V2Film cms={filmData} />}
      {stepperData && <V2GetStarted cms={stepperData} />}
      {pricingData && <V2Pricing onOpenModal={onOpenModal} cms={pricingData} />}
      {faqData && <V2FAQ cms={faqData} />}
      {caseData && <V2Cases cms={caseData} />}
      <SharedFooter cms={footerData} />
    </div>
  );
}
