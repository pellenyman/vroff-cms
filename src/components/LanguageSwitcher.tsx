"use client";

import { useState, useEffect, useRef } from "react";

interface Language {
  code: string;
  name: string;
}

const LANG_NAMES: Record<string, string> = {
  sv: "Svenska",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  no: "Norsk",
  da: "Dansk",
  fi: "Suomi",
};

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 20 20" strokeWidth="1.4" stroke="currentColor">
      <circle cx="10" cy="10" r="8" />
      <path d="M2.5 10h15M10 2c2.5 3 3 5 3 8s-.5 5-3 8M10 2c-2.5 3-3 5-3 8s.5 5 3 8" />
    </svg>
  );
}

function getCurrentLang(): string {
  if (typeof window === "undefined") return "sv";
  const first = window.location.pathname.split("/").filter(Boolean)[0];
  if (first && first.length === 2 && /^[a-z]{2}$/.test(first)) return first;
  return "sv";
}

function buildLangUrl(langCode: string): string {
  if (typeof window === "undefined") return "/";
  const parts = window.location.pathname.split("/").filter(Boolean);
  const current = getCurrentLang();
  const pathWithoutLang = current !== "sv" && parts[0] === current ? parts.slice(1) : parts;
  if (langCode === "sv") return "/" + pathWithoutLang.join("/");
  return "/" + langCode + "/" + pathWithoutLang.join("/");
}

export default function LanguageSwitcher({ variant = "floating" }: { variant?: "floating" | "footer" }) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("sv");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentLang(getCurrentLang());
    fetch(`https://api.storyblok.com/v2/cdn/spaces/me?token=${process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN}`)
      .then(r => r.json())
      .then(d => {
        const codes: string[] = d.space?.language_codes || [];
        const langs: Language[] = [
          { code: "sv", name: LANG_NAMES.sv },
          ...codes.map((c: string) => ({ code: c, name: LANG_NAMES[c] || c.toUpperCase() })),
        ];
        setLanguages(langs);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (languages.length < 2) return null;

  if (variant === "footer") {
    return (
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-[5px] px-[6px] py-[4px] rounded-[6px] text-[#b4bbfd] hover:bg-white/10 transition-colors cursor-pointer text-[13px] font-semibold"
        >
          <GlobeIcon className="w-[15px] h-[15px]" />
          <span>{currentLang.toUpperCase()}</span>
          <svg width="8" height="5" fill="none" viewBox="0 0 8 5" className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <div className="absolute bottom-full right-0 mb-[4px] bg-[#3b0101] rounded-[8px] border border-[#b4bbfd]/20 shadow-lg min-w-[130px] py-[3px] z-50">
            {languages.map((lang) => (
              <a key={lang.code} href={buildLangUrl(lang.code)}
                className={`flex items-center gap-[8px] px-[12px] py-[7px] text-[#b4bbfd] text-[13px] font-medium hover:bg-white/10 transition-colors ${lang.code === currentLang ? "bg-white/10" : ""}`}
                onClick={() => setOpen(false)}>
                <span className="w-[18px] text-center font-semibold opacity-60">{lang.code.toUpperCase()}</span>
                <span>{lang.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="fixed top-4 right-4 z-[60]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-[40px] h-[40px] bg-[#fafafa] rounded-full shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow text-[#5d0f0f]"
        aria-label="Byt språk"
      >
        <GlobeIcon className="w-[18px] h-[18px]" />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-[6px] bg-white rounded-[10px] border border-[#5d0f0f]/10 shadow-lg min-w-[140px] py-[4px] z-50">
          {languages.map((lang) => (
            <a key={lang.code} href={buildLangUrl(lang.code)}
              className={`flex items-center gap-[8px] px-[14px] py-[8px] text-[#5d0f0f] text-[13px] font-medium hover:bg-[#5d0f0f]/5 transition-colors ${lang.code === currentLang ? "bg-[#5d0f0f]/10" : ""}`}
              onClick={() => setOpen(false)}>
              <span className="w-[18px] text-center font-semibold opacity-60">{lang.code.toUpperCase()}</span>
              <span>{lang.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
