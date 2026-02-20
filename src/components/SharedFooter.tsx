"use client";

import svgPaths from "../svg-9z9wiml24b";
import LanguageSwitcher from "./LanguageSwitcher";

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

interface SharedFooterProps {
  cms?: any;
}

export default function SharedFooter({ cms }: SharedFooterProps) {
  const columns = (cms?.columns || []).map((col: any) => ({
    title: col.title,
    links: (col.links || []).map((l: any) => ({ label: l.label, url: l.url })),
  }));

  return (
    <footer className="bg-[#5d0f0f] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[63px]">
        {columns.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-[16px] tracking-[-0.32px]">
            {columns.map((col: any, i: number) => (
              <div key={i} className="flex flex-col gap-1 leading-[1.8]">
                <p className="text-[#fafafa] font-semibold">{col.title}</p>
                {col.links.map((l: any, j: number) => (
                  <a key={j} href={l.url} className="text-[#b4bbfd] font-medium cursor-pointer hover:text-white transition-colors">{l.label}</a>
                ))}
              </div>
            ))}
          </div>
        )}
        <div className="pt-[46px] border-t border-[#b4bbfd]/40 flex items-center justify-between">
          <VroffLogoLarge className="w-[160px] h-[48px] text-[#6674f2]" />
          <LanguageSwitcher variant="footer" />
        </div>
      </div>
    </footer>
  );
}
