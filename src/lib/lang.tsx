"use client";

import { createContext, useContext } from "react";

const LangContext = createContext<string | null>(null);

export function LangProvider({ lang, children }: { lang: string | null; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): string | null {
  return useContext(LangContext);
}

export function localizeHref(href: string, lang: string | null): string {
  if (!href || !lang) return href;
  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return href;
  if (href.startsWith(`/${lang}/`) || href === `/${lang}`) return href;
  if (href === "/") return `/${lang}`;
  return `/${lang}${href}`;
}
