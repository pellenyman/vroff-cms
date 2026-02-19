"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { fallbackImages } from "@/lib/images";

export default function CaseBlock({ blok }: { blok: any }) {
  const items = blok.items || [];
  const [slide, setSlide] = useState(0);
  const dragRef = useRef<{ x: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(977);
  const maxSlide = Math.max(0, items.length - 1);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const first = trackRef.current.firstElementChild as HTMLElement;
    if (first) setStep(first.offsetWidth + 59);
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
    <section id="cases" className="bg-[#ede1c9] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[51px]">
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{blok.headline || "Case"}</h2>
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" onPointerDown={onPointerDown} onPointerUp={onPointerUp} style={{ touchAction: "pan-y" }}>
          <div ref={trackRef} className="flex gap-[59px] transition-transform duration-500 ease-out select-none" style={{ transform: `translateX(${-slide * step}px)` }}>
            {items.map((c: any, i: number) => (
              <div key={c._uid || i} onClick={() => setSlide(i)}
                className={`shrink-0 bg-[#b4bbfd] rounded-[10px] p-[24px] md:p-[55px] w-[calc(100vw-48px)] md:w-[918px] transition-opacity duration-300 cursor-pointer ${i === slide ? "opacity-100" : "opacity-50"}`}>
                <div className="flex flex-col md:flex-row md:justify-between w-full gap-[24px] md:gap-0 md:h-[390px]">
                  <div className="w-full h-[220px] md:h-full md:w-[390px] rounded-[10px] overflow-hidden shrink-0 md:order-2">
                    <img src={c.image?.filename || fallbackImages.case1} alt={c.name} className="w-full h-full object-cover" draggable={false} />
                  </div>
                  <div className="flex flex-col justify-between md:order-1 gap-[20px]">
                    <div>
                      <h3 className="text-[#5d0f0f] text-[32px] md:text-[60px] font-semibold leading-[0.9] tracking-[-2px] md:tracking-[-3px] whitespace-pre-wrap">{c.title}</h3>
                      <p className="text-[#5d0f0f] text-[14px] md:text-[16px] font-medium leading-[1.5] mt-4 md:mt-6 max-w-[321px]">{c.description}</p>
                    </div>
                    <a href={c.link?.cached_url || "#"} className="bg-[#6674f2] text-[#d7dbfe] font-semibold text-[14px] px-[30px] py-[12px] rounded-[15px] w-[155px] text-center cursor-pointer hover:bg-[#5664e2] transition-colors">
                      {c.button_text || "Läs hela story"}
                    </a>
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
