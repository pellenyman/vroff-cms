"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { fallbackImages } from "@/lib/images";

export default function FeatureBlock({ blok }: { blok: any }) {
  const items = blok.items || [];
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
    <section className="bg-[#f5efdf] w-full py-[100px] md:py-[150px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[65px]">
        <div>
          <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">
            {blok.headline || "Detta är Vroff"}
          </h2>
          {blok.description && (
            <p className="text-[#5d0f0f] text-[16px] font-medium leading-[1.5] mt-4 max-w-[672px]">{blok.description}</p>
          )}
        </div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown} onPointerUp={onPointerUp} style={{ touchAction: "pan-y" }}>
          <div ref={trackRef} className="flex gap-[57px] transition-transform duration-500 ease-out select-none"
            style={{ transform: `translateX(${-slide * step}px)` }}>
            {items.map((item: any, i: number) => (
              <div key={item._uid || i} onClick={() => setSlide(Math.max(0, Math.min(maxSlide, i)))}
                className={`shrink-0 w-[calc(100vw-48px)] md:w-[500px] flex flex-col transition-opacity duration-300 cursor-pointer ${i === slide ? "opacity-100" : "opacity-50"}`}>
                <div className="h-[280px] md:h-[380px] rounded-[10px] overflow-hidden relative"
                  style={item.background_color ? { backgroundColor: item.background_color } : undefined}>
                  <img src={item.image?.filename || [fallbackImages.feature1, fallbackImages.feature2, fallbackImages.feature3][i % 3]} alt={item.title} className="w-full h-full object-cover" draggable={false} />
                </div>
                <div className="pt-[30px] pr-[40px] md:pr-[120px]">
                  <h3 className="text-[#5d0f0f] text-[24px] md:text-[32px] font-semibold tracking-[-0.64px]">{item.title}</h3>
                  <p className="text-[#5d0f0f] text-[16px] font-medium leading-[1.5] mt-4">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
