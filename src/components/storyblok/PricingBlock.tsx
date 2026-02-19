"use client";

import { useState } from "react";

const defaultTiers = [
  { name: "Free", sub: "Prova", price: "0 SEK", price_sub: "Gratis för alla", desc: "Perfekt för att testa.", features: [{ name: "5 användare", included: true }, { name: "10 GB lagring", included: true }, { name: "Support", included: true }, { name: "Mobil app", included: true }, { name: "Video 30 min", included: true }, { name: "Realtidsredigering", included: false }, { name: "API", included: false }] },
  { name: "Pro", sub: "Vardags", price: "10 SEK", price_sub: "Per månad", desc: "För växande team.", features: [{ name: "25 användare", included: true }, { name: "100 GB lagring", included: true }, { name: "Prioriterad support", included: true }, { name: "Mobil app", included: true }, { name: "Video 2h", included: true }, { name: "Realtidsredigering", included: true }, { name: "API", included: false }] },
  { name: "Max", sub: "Allt", price: "20 SEK", price_sub: "Per person/mån", desc: "Fullständig lösning.", features: [{ name: "Obegränsat", included: true }, { name: "1 TB", included: true }, { name: "Dedikerad support", included: true }, { name: "Mobil app", included: true }, { name: "Obegränsad video", included: true }, { name: "Realtidsredigering", included: true }, { name: "API", included: true }] },
];

export default function PricingBlock({ blok }: { blok: any }) {
  const tiers = blok.tiers?.length ? blok.tiers : defaultTiers;
  const [selected, setSelected] = useState(0);

  return (
    <section id="pricing" className="bg-[#d7dbfe] w-full py-[100px] md:py-[150px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[50px]">
        <h2 className="text-[#5d0f0f] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{blok.headline || "Pris"}</h2>
        <div className="flex flex-col md:flex-row gap-[30px] items-stretch">
          {tiers.map((p: any, i: number) => (
            <div key={i} onClick={() => setSelected(i)}
              className={`bg-[#e6e8fc] rounded-[10px] p-[35px] flex flex-col flex-1 cursor-pointer transition-all duration-200 ${selected === i ? "ring-2 ring-[#5d0f0f]" : "hover:ring-1 hover:ring-[#b4bbfd]"}`}>
              <div>
                <h3 className="text-[#5d0f0f] text-[26px] font-semibold tracking-[-0.52px]">{p.name}</h3>
                <p className="text-[#5d0f0f] text-[16px] font-medium">{p.sub}</p>
              </div>
              <div className="mt-[29px]">
                <p className="text-[#5d0f0f] text-[22px] font-semibold tracking-[-0.44px]">{p.price}</p>
                <p className="text-[#5d0f0f]/60 text-[14px] font-medium">{p.price_sub}</p>
              </div>
              <p className="text-[#5d0f0f] text-[16px] font-medium leading-[1.5] mt-4">{p.desc}</p>
              <button type="button" className={`mt-6 font-semibold text-[16px] rounded-[10px] h-[40px] w-full flex items-center justify-center cursor-pointer transition-colors ${selected === i ? "bg-[#5d0f0f] text-[#fafafa]" : "bg-[#5d0f0f]/10 text-[#5d0f0f]"}`}>
                {selected === i ? "Vald" : "Prova på"}
              </button>
              <div className="border-t border-[#d7dbfe] mt-6" />
              <div className="flex flex-col gap-[12px] mt-6">
                {(p.features || []).map((f: any, j: number) => (
                  <div key={j} className="flex items-start gap-2">
                    <span className={`text-[14px] mt-[1px] ${f.included ? "text-[#5d0f0f]" : "text-[#5d0f0f]/25"}`}>{f.included ? "✓" : "—"}</span>
                    <span className={`text-[14px] font-medium ${f.included ? "text-[#5d0f0f]" : "text-[#5d0f0f]/40"}`}>{f.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
