"use client";

import { useState, useRef, useEffect } from "react";

const defaultFaqs = [
  { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Nihil commodi sint adipisci dignissimos ducimus quidem dolorem recusandae." },
  { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Nihil commodi sint adipisci dignissimos ducimus quidem dolorem." },
  { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Nihil commodi sint adipisci dignissimos ducimus." },
];

function FaqItem({ q, a, isOpen, onClick, isLast }: { q: string; a: string; isOpen: boolean; onClick: () => void; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  useEffect(() => { if (ref.current) setH(isOpen ? ref.current.scrollHeight : 0); }, [isOpen]);

  return (
    <div className={`border-t border-[#b4bbfd] ${isLast ? "border-b" : ""}`}>
      <button type="button" onClick={onClick} className="w-full flex items-center justify-between py-[20px] cursor-pointer" aria-expanded={isOpen}>
        <span className="text-[#5d0f0f] text-[16px] md:text-[20px] font-semibold text-left pr-4">{q}</span>
        <span className={`shrink-0 text-[#5d0f0f] text-[20px] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className="overflow-hidden transition-[max-height,opacity] duration-400" style={{ maxHeight: h, opacity: isOpen ? 1 : 0 }}>
        <div ref={ref} className="pb-[20px] pl-[20px] pr-[60px] md:pr-[200px]">
          <p className="text-[#9b3316] text-[16px] md:text-[20px] font-medium leading-[1.5]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqBlock({ blok }: { blok: any }) {
  const items = blok.items?.length ? blok.items : defaultFaqs;
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#fafafa] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[59px]">
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{blok.headline || "Vanliga frågor"}</h2>
        <div className="flex flex-col">
          {items.map((f: any, i: number) => (
            <FaqItem key={i} q={f.question} a={f.answer} isOpen={open === i} onClick={() => setOpen(open === i ? -1 : i)} isLast={i === items.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
