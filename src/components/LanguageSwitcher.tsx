"use client";

import { useState, useEffect, useRef } from "react";

interface Language {
  code: string;
  name: string;
}

const LANG_LABELS: Record<string, string> = {
  sv: "SV",
  en: "EN",
  de: "DE",
  fr: "FR",
  es: "ES",
  no: "NO",
  da: "DA",
  fi: "FI",
};

const LANG_FLAGS: Record<string, string> = {
  sv: "🇸🇪",
  en: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
  es: "🇪🇸",
  no: "🇳🇴",
  da: "🇩🇰",
  fi: "🇫🇮",
};

function getCurrentLang(): string {
  if (typeof window === "undefined") return "sv";
  const path = window.location.pathname;
  const first = path.split("/").filter(Boolean)[0];
  if (first && first.length === 2 && /^[a-z]{2}$/.test(first)) return first;
  return "sv";
}

function buildLangUrl(langCode: string): string {
  if (typeof window === "undefined") return "/";
  const path = window.location.pathname;
  const parts = path.split("/").filter(Boolean);
  const currentLang = getCurrentLang();

  let pathWithoutLang = parts;
  if (currentLang !== "sv" && parts[0] === currentLang) {
    pathWithoutLang = parts.slice(1);
  }

  if (langCode === "sv") {
    return "/" + pathWithoutLang.join("/");
  }
  return "/" + langCode + "/" + pathWithoutLang.join("/");
}

export default function LanguageSwitcher({ variant = "dark" }: { variant?: "dark" | "light" }) {
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
          { code: "sv", name: "Svenska" },
          ...codes.map((c: string) => ({
            code: c,
            name: c === "en" ? "English" : c === "de" ? "Deutsch" : c === "fr" ? "Français" : c === "es" ? "Español" : c === "no" ? "Norsk" : c === "da" ? "Dansk" : c === "fi" ? "Suomi" : c.toUpperCase(),
          })),
        ];
        setLanguages(langs);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (languages.length < 2) return null;

  const isDark = variant === "dark";
  const textColor = isDark ? "text-[#5d0f0f]" : "text-[#b4bbfd]";
  const hoverBg = isDark ? "hover:bg-[#5d0f0f]/5" : "hover:bg-white/10";
  const dropdownBg = isDark ? "bg-white" : "bg-[#3b0101]";
  const activeBg = isDark ? "bg-[#5d0f0f]/10" : "bg-white/10";
  const borderColor = isDark ? "border-[#5d0f0f]/10" : "border-[#b4bbfd]/20";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-[6px] px-[10px] py-[6px] rounded-[8px] ${textColor} ${hoverBg} transition-colors cursor-pointer text-[14px] font-semibold`}
      >
        <span>{LANG_FLAGS[currentLang] || ""}</span>
        <span>{LANG_LABELS[currentLang] || currentLang.toUpperCase()}</span>
        <svg width="10" height="6" fill="none" viewBox="0 0 10 6" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className={`absolute top-full right-0 mt-[4px] ${dropdownBg} rounded-[10px] border ${borderColor} shadow-lg min-w-[140px] py-[4px] z-50`}>
          {languages.map((lang) => (
            <a
              key={lang.code}
              href={buildLangUrl(lang.code)}
              className={`flex items-center gap-[8px] px-[14px] py-[8px] ${textColor} text-[14px] font-medium ${hoverBg} transition-colors ${
                lang.code === currentLang ? activeBg : ""
              }`}
              onClick={() => setOpen(false)}
            >
              <span>{LANG_FLAGS[lang.code] || ""}</span>
              <span>{lang.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
