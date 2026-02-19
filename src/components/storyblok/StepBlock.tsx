"use client";

import { useState, useRef, useEffect } from "react";

const defaultSteps = [
  { label: "Ladda ned", title: "Ladda ned Vroff", content: "Välj din plattform och ladda ned appen." },
  { label: "Skapa konto", title: "Skapa ditt konto", content: "Fyll i namn och e-post." },
  { label: "Bjuder in andra", title: "Bjud in ditt team", content: "Lägg till kollegor med e-post." },
  { label: "Öppna rummet", title: "Öppna ert första rum", content: "Skapa ett rum och börja samarbeta." },
  { label: "Nu är du igång :-)", title: "Klart!", content: "Du och ditt team är redo." },
];

export default function StepBlock({ blok }: { blok: any }) {
  const steps = blok.steps?.length ? blok.steps : defaultSteps;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => setActive((p) => (p + 1) % steps.length), 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, active, steps.length]);

  return (
    <section className="bg-[#b4bbfd] w-full py-[100px] md:py-[150px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[60px] md:gap-[104px]">
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{blok.headline || "Komma igång på 30 sekunder"}</h2>
        <div className="flex flex-col md:flex-row gap-[40px] md:gap-[64px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="bg-[#d7dbfe] rounded-[10px] py-[25px] w-full md:w-[330px] shrink-0">
            {steps.map((s: any, i: number) => (
              <button key={i} type="button" onClick={() => { setActive(i); setPaused(true); }}
                className={`w-full text-left px-[30px] py-[16px] text-[20px] font-semibold tracking-[-0.4px] text-[#5d0f0f] cursor-pointer transition-colors duration-200 ${i === active ? "bg-[#e6e8fc]" : "hover:bg-[#e6e8fc]/50"}`}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="bg-[#3b0101] rounded-[10px] flex-1 p-[33px] md:p-[40px] min-h-[400px] md:min-h-[533px] flex flex-col justify-between">
            <div className="flex flex-col gap-[20px]" key={active}>
              <div className="bg-[#5d0f0f] w-[33px] h-[33px] rounded-[10px] flex items-center justify-center">
                <span className="text-white text-[16px] font-bold">{active + 1}</span>
              </div>
              <h3 className="text-white text-[24px] md:text-[32px] font-semibold tracking-[-0.64px]">{steps[active].title}</h3>
              <p className="text-[#e0d1b4] text-[16px] md:text-[18px] font-medium leading-[1.5] max-w-[500px]">{steps[active].content}</p>
            </div>
            <div className="mt-8 bg-[#5d0f0f] rounded-[10px] h-[8px] overflow-hidden">
              <div className="h-full bg-[#9b3316] rounded-[10px] transition-all duration-300" style={{ width: `${((active + 1) / steps.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
