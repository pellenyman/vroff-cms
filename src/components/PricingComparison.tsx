"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";

interface PricingComparisonProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  { key: "free", name: "Free", price: "0 SEK", priceSub: "Gratis för alla", color: "bg-white" },
  { key: "pro", name: "Pro", price: "10 SEK", priceSub: "Per månad", color: "bg-[#e6e8fc]" },
  { key: "max", name: "Max", price: "20 SEK", priceSub: "Per person/mån", color: "bg-[#d7dbfe]" },
];

const features = [
  { category: "Grundläggande", items: [
    { name: "Användare", free: "5", pro: "25", max: "Obegränsat" },
    { name: "Lagring", free: "10 GB", pro: "100 GB", max: "1 TB" },
    { name: "Projektstöd", free: true, pro: true, max: true },
    { name: "Mobil app", free: true, pro: true, max: true },
  ]},
  { category: "Samarbete", items: [
    { name: "Delning av filer", free: true, pro: true, max: true },
    { name: "Realtidsredigering", free: false, pro: true, max: true },
    { name: "Videomöten", free: "30 min", pro: "2 timmar", max: "Obegränsat" },
    { name: "Skärminspelning", free: false, pro: true, max: true },
  ]},
  { category: "Avancerat", items: [
    { name: "API-åtkomst", free: false, pro: false, max: true },
    { name: "Integrationer", free: false, pro: false, max: true },
    { name: "Prioriterad support", free: false, pro: true, max: true },
    { name: "Kontohanterare", free: false, pro: false, max: true },
  ]},
  { category: "Säkerhet", items: [
    { name: "SSL-kryptering", free: true, pro: true, max: true },
    { name: "Tvåfaktorsautentisering", free: true, pro: true, max: true },
    { name: "SSO", free: false, pro: true, max: true },
    { name: "Datalagring i EU", free: false, pro: false, max: true },
  ]},
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value
      ? <Check className="w-5 h-5 text-[#6674f2]" />
      : <span className="text-[#5d0f0f]/20 text-[16px]">—</span>;
  }
  return <span className="text-[#5d0f0f] text-[13px] md:text-[14px] font-medium">{value}</span>;
}

export default function PricingComparison({ isOpen, onClose }: PricingComparisonProps) {
  const [selected, setSelected] = useState("pro");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div className="bg-[#f5efdf] rounded-[20px] max-w-[900px] w-full my-4 md:my-8 relative" onClick={(e) => e.stopPropagation()} style={{ fontFamily: "'Quicksand', sans-serif" }}>

        {/* Header */}
        <div className="p-5 md:p-8 pb-0">
          <button type="button" onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#5d0f0f]/10 transition-colors cursor-pointer">
            <X className="w-5 h-5 text-[#5d0f0f]" />
          </button>
          <h2 className="text-[24px] md:text-[36px] font-semibold text-[#5d0f0f] tracking-[-1px] pr-10">Jämför prisplaner</h2>
          <p className="text-[14px] md:text-[16px] text-[#5d0f0f]/60 font-medium mt-1">Välj den plan som passar ditt team bäst.</p>
        </div>

        {/* Plan cards - selectable */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 p-5 md:px-8">
          {plans.map((plan) => (
            <button key={plan.key} type="button" onClick={() => setSelected(plan.key)}
              className={`rounded-[12px] p-3 md:p-5 text-left cursor-pointer transition-all duration-200 ${
                selected === plan.key
                  ? "bg-[#5d0f0f] text-[#fafafa] ring-2 ring-[#5d0f0f]"
                  : `${plan.color} text-[#5d0f0f] hover:ring-1 hover:ring-[#b4bbfd]`
              }`}>
              <p className={`text-[16px] md:text-[22px] font-semibold ${selected === plan.key ? "text-[#fafafa]" : "text-[#5d0f0f]"}`}>{plan.name}</p>
              <p className={`text-[18px] md:text-[24px] font-bold mt-1 ${selected === plan.key ? "text-[#fafafa]" : "text-[#5d0f0f]"}`}>{plan.price}</p>
              <p className={`text-[11px] md:text-[13px] font-medium mt-0.5 ${selected === plan.key ? "text-[#fafafa]/70" : "text-[#5d0f0f]/50"}`}>{plan.priceSub}</p>
              {selected === plan.key && (
                <div className="mt-3 bg-[#6674f2] text-[#fafafa] text-[12px] md:text-[14px] font-semibold py-1.5 rounded-[8px] text-center">Vald</div>
              )}
            </button>
          ))}
        </div>

        {/* Feature comparison table */}
        <div className="px-5 md:px-8 pb-5 md:pb-8 overflow-x-auto">
          {features.map((cat, ci) => (
            <div key={ci} className="mb-4">
              <h4 className="text-[13px] md:text-[15px] font-semibold text-[#5d0f0f] mb-2 mt-4">{cat.category}</h4>
              {cat.items.map((feat, fi) => (
                <div key={fi} className="grid grid-cols-4 gap-2 py-2.5 border-b border-[#b4bbfd]/30">
                  <div className="text-[12px] md:text-[14px] text-[#5d0f0f] font-medium flex items-center">{feat.name}</div>
                  <div className={`flex items-center justify-center rounded-[6px] py-1 ${selected === "free" ? "bg-[#5d0f0f]/5" : ""}`}>
                    <Cell value={feat.free} />
                  </div>
                  <div className={`flex items-center justify-center rounded-[6px] py-1 ${selected === "pro" ? "bg-[#5d0f0f]/5" : ""}`}>
                    <Cell value={feat.pro} />
                  </div>
                  <div className={`flex items-center justify-center rounded-[6px] py-1 ${selected === "max" ? "bg-[#5d0f0f]/5" : ""}`}>
                    <Cell value={feat.max} />
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* CTA */}
          <div className="mt-6 pt-6 border-t border-[#5d0f0f]/10 flex flex-col md:flex-row items-center gap-4 justify-between">
            <p className="text-[#5d0f0f] text-[16px] font-semibold">
              Vald plan: <span className="text-[#6674f2]">{plans.find(p => p.key === selected)?.name}</span> — {plans.find(p => p.key === selected)?.price}
            </p>
            <button type="button" onClick={onClose}
              className="bg-[#5d0f0f] text-[#fafafa] font-semibold text-[16px] px-8 py-3 rounded-[12px] cursor-pointer hover:bg-[#3b0101] transition-colors w-full md:w-auto">
              Välj {plans.find(p => p.key === selected)?.name} — Prova gratis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
