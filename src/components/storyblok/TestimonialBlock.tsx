"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function TestimonialBlock({ blok }: { blok: any }) {
  const items = blok.items || [];
  const [slide, setSlide] = useState(0);
  const dragRef = useRef<{ x: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(370);
  const maxSlide = Math.max(0, items.length - 1);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const first = trackRef.current.firstElementChild as HTMLElement;
    if (first) setStep(first.offsetWidth + 40);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

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
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">
          {blok.headline || "Vad folk säger"}
        </h2>
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" onPointerDown={onPointerDown} onPointerUp={onPointerUp} style={{ touchAction: "pan-y" }}>
          <div ref={trackRef} className="flex gap-[40px] transition-transform duration-500 ease-out select-none" style={{ transform: `translateX(${-slide * step}px)` }}>
            {items.map((t: any, i: number) => (
              <div key={t._uid || i} onClick={() => setSlide(i)}
                className={`shrink-0 w-[calc(100vw-48px)] md:w-[330px] bg-[#e8eaff] rounded-[10px] p-[35px] flex flex-col gap-[23px] justify-between transition-opacity duration-300 cursor-pointer ${i === slide ? "opacity-100" : "opacity-50"}`}>
                <p className="text-[#5d0f0f] text-[20px] font-medium leading-[1.5] flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-[16px]">
                  {t.avatar?.filename && <img src={t.avatar.filename} alt={t.name} className="w-[48px] h-[48px] rounded-full object-cover" />}
                  <div>
                    <p className="text-[#5d0f0f] text-[16px] font-bold">{t.name}</p>
                    <p className="text-[#5d0f0f] text-[14px] font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
