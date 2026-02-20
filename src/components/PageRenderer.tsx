"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import svgPaths from "../svg-9z9wiml24b";
import SharedHeader from "./SharedHeader";
import { useLang, localizeHref } from "@/lib/lang";
import SharedFooter from "./SharedFooter";

const imgAvatar = "/assets/283a376b0fafb9874fefe43652d98fad3cdad31c.png";
const imgCase = "/assets/4dc6e4130302c1fff2514ea9247cc5842789902a.png";

/* Shared section renderer for CMS pages (FAQ, Case, Kontakt) */

const heroImages: Record<string, string> = {
  "Vanliga frågor": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=80",
  "Kundcase": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80",
  "Kontakta oss": "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1400&q=80",
  "Träffa Katarina!": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1400&q=80",
  "Träffa Lena": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1400&q=80",
  "Träffa Erik!": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80",
};
const defaultHeroImg = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80";

function HeroSection({ blok }: { blok: any }) {
  const lang = useLang();
  const bgImg = blok.background_image?.filename || heroImages[blok.headline] || defaultHeroImg;

  return (
    <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden -mt-[90px]">
      <img src={bgImg} alt={blok.headline || ""} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center flex flex-col items-center gap-[20px] md:gap-[30px] pt-[80px] px-6">
        <h1 className="text-[#fafafa] text-[36px] md:text-[64px] font-semibold tracking-[-2px] md:tracking-[-3px] leading-[1.05] max-w-[700px]">{blok.headline}</h1>
        {blok.subtext && <p className="text-white text-[16px] md:text-[20px] font-medium max-w-[600px]">{blok.subtext}</p>}
        {blok.cta_text && (
          <a href={localizeHref(blok.cta_link?.cached_url || "/contact", lang)} className="bg-[#6674f2] text-[#fafafa] font-semibold px-[30px] py-[12px] rounded-[20px] text-[16px] mt-2 hover:bg-[#5664e2] transition-colors cursor-pointer">{blok.cta_text}</a>
        )}
      </div>
    </section>
  );
}

function ContentSection({ blok }: { blok: any }) {
  return (
    <section className="bg-[#f5efdf] w-full py-[80px] px-6 md:px-[120px]">
      <div className="max-w-[800px] mx-auto flex flex-col gap-[24px]">
        {blok.headline && <h2 className="text-[#5d0f0f] text-[28px] md:text-[44px] font-semibold tracking-[-1.5px]">{blok.headline}</h2>}
        {blok.body && <p className="text-[#5d0f0f] text-[16px] md:text-[20px] font-medium leading-[1.6]">{blok.body}</p>}
        {blok.image?.filename && (
          <div className="rounded-[10px] overflow-hidden mt-4">
            <img src={blok.image.filename} alt={blok.headline || ""} className="w-full h-auto object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}

function CtaSection({ blok }: { blok: any }) {
  const lang = useLang();
  return (
    <section className="bg-[#b4bbfd] w-full py-[80px] px-6 md:px-[120px]">
      <div className="max-w-[800px] mx-auto text-center flex flex-col items-center gap-[20px]">
        <h2 className="text-[#5d0f0f] text-[28px] md:text-[44px] font-semibold tracking-[-1.5px]">{blok.headline}</h2>
        {blok.description && <p className="text-[#5d0f0f] text-[16px] md:text-[20px] font-medium">{blok.description}</p>}
        {blok.cta_text && (
          <a href={localizeHref(blok.cta_link?.cached_url || "/contact", lang)} className="bg-[#6674f2] text-[#fafafa] font-semibold px-[30px] py-[12px] rounded-[20px] text-[16px] hover:bg-[#5664e2] transition-colors">{blok.cta_text}</a>
        )}
      </div>
    </section>
  );
}

function FaqFilterSection({ blok }: { blok: any }) {
  return null; // Filter is now integrated into FaqSection
}

function slugify(str: string): string {
  return str.toLowerCase().replace(/å/g, "a").replace(/ä/g, "a").replace(/ö/g, "o").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function FaqSection({ blok }: { blok: any }) {
  const lang = useLang();
  const allItems = blok.items || [];
  const allLabel = blok.all_label || "All";
  const countSuffix = blok.count_suffix || "questions";
  const categoryNames = [allLabel, ...Array.from(new Set(allItems.map((f: any) => f.category).filter(Boolean))) as string[]];

  const [active, setActive] = useState(allLabel);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("category");
    if (slug) {
      const match = categoryNames.find((c) => slugify(c) === slug);
      if (match) setActive(match);
    }
  }, []);

  const selectCategory = (cat: string) => {
    setActive(cat);
    setOpen(0);
    const url = new URL(window.location.href);
    if (cat === allLabel) { url.searchParams.delete("category"); }
    else { url.searchParams.set("category", slugify(cat)); }
    window.history.pushState({}, "", url.toString());
  };

  const items = active === allLabel ? allItems : allItems.filter((f: any) => f.category === active);

  return (
    <section id="faq" className="bg-[#fafafa] w-full py-[60px] md:py-[80px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[30px] md:gap-[40px]">
        {blok.headline && <h2 className="text-[#5d0f0f] text-[24px] md:text-[44px] font-semibold tracking-[-1px] md:tracking-[-1.5px]">{blok.headline}</h2>}

        {categoryNames.length > 1 && (
          <div className="flex flex-wrap gap-[8px] md:gap-[12px]">
            {categoryNames.map((cat: string) => (
              <a key={cat} href={localizeHref(cat === allLabel ? "/faq" : `/faq?category=${slugify(cat)}`, lang)}
                onClick={(e) => { e.preventDefault(); selectCategory(cat); }}
                className={`px-[16px] md:px-[20px] py-[8px] rounded-[50px] text-[13px] md:text-[14px] font-semibold cursor-pointer transition-colors ${
                  active === cat ? "bg-[#5d0f0f] text-[#fafafa]" : "bg-white text-[#5d0f0f] hover:bg-[#5d0f0f]/10"
                }`}>{cat}</a>
            ))}
          </div>
        )}

        <p className="text-[#5d0f0f]/50 text-[14px] font-medium">{items.length} {countSuffix}{active !== allLabel ? ` — ${active}` : ""}</p>

        {/* FAQ items */}
        <div className="flex flex-col">
          {items.map((f: any, i: number) => (
            <FaqItem key={f._uid || i} q={f.question} a={f.answer} isOpen={open === i} onClick={() => setOpen(open === i ? -1 : i)} isLast={i === items.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

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

function CaseStudySection({ blok }: { blok: any }) {
  const lang = useLang();
  const items = blok.items || [];
  return (
    <section className="bg-[#ede1c9] w-full py-[60px] md:py-[80px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[30px] md:gap-[40px]">
        {blok.headline && <h2 className="text-[#5d0f0f] text-[24px] md:text-[44px] font-semibold tracking-[-1px] md:tracking-[-1.5px]">{blok.headline}</h2>}
        <div className="flex flex-col md:flex-row gap-[20px] md:gap-[30px]">
          {items.map((c: any, i: number) => (
            <div key={c._uid || i} className="bg-[#b4bbfd] rounded-[10px] p-[24px] md:p-[35px] flex-1 flex flex-col gap-[16px] md:gap-[20px]">
              <div className="h-[180px] md:h-[200px] rounded-[10px] overflow-hidden">
                <img src={c.image?.filename || imgCase} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[#5d0f0f] text-[20px] md:text-[24px] font-semibold whitespace-pre-wrap">{c.title}</h3>
              <p className="text-[#5d0f0f] text-[14px] md:text-[16px] font-medium leading-[1.5]">{c.description}</p>
              <a href={localizeHref(c.link?.cached_url || `/case/${c.slug || c.name?.toLowerCase()}`, lang)} className="bg-[#6674f2] text-[#d7dbfe] font-semibold text-[14px] px-[24px] py-[10px] rounded-[15px] w-fit hover:bg-[#5664e2] transition-colors">{c.button_text}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactFormSection({ blok }: { blok: any }) {
  const [submitted, setSubmitted] = useState(false);
  const fields = blok.fields || [];
  return (
    <section className="bg-[#fafafa] w-full py-[60px] md:py-[80px] px-6 md:px-[120px]">
      <div className="max-w-[600px] mx-auto flex flex-col gap-[24px] md:gap-[30px]">
        {blok.headline && <h2 className="text-[#5d0f0f] text-[24px] md:text-[36px] font-semibold tracking-[-0.5px] md:tracking-[-1px]">{blok.headline}</h2>}
        {blok.description && <p className="text-[#5d0f0f] text-[16px] font-medium">{blok.description}</p>}
        {submitted ? (
          <div className="bg-[#e6e8fc] rounded-[10px] p-[40px] text-center">
            <p className="text-[#5d0f0f] text-[20px] font-semibold">Tack för ditt meddelande!</p>
            <p className="text-[#5d0f0f] text-[16px] font-medium mt-2">Vi återkommer inom 24 timmar.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-[16px]">
            {fields.map((f: any) => (
              <div key={f._uid} className="flex flex-col gap-[6px]">
                <label className="text-[#5d0f0f] text-[14px] font-semibold">{f.label}{f.required && " *"}</label>
                {f.type === "textarea" ? (
                  <textarea placeholder={f.placeholder} required={f.required} rows={4}
                    className="bg-white border border-[#b4bbfd] rounded-[10px] px-[16px] py-[12px] text-[16px] text-[#5d0f0f] outline-none focus:border-[#6674f2] transition-colors resize-none" />
                ) : (
                  <input type={f.type || "text"} placeholder={f.placeholder} required={f.required}
                    className="bg-white border border-[#b4bbfd] rounded-[10px] px-[16px] py-[12px] text-[16px] text-[#5d0f0f] outline-none focus:border-[#6674f2] transition-colors h-[48px]" />
                )}
              </div>
            ))}
            <button type="submit" className="bg-[#5d0f0f] text-[#fafafa] font-semibold text-[16px] h-[48px] rounded-[10px] mt-2 cursor-pointer hover:bg-[#3b0101] transition-colors">
              {blok.submit_text || "Skicka"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* Block router */
const blockComponents: Record<string, React.FC<{ blok: any }>> = {
  hero: HeroSection,
  content_block: ContentSection,
  cta: CtaSection,
  faq_filter: FaqFilterSection,
  faq: FaqSection,
  case_study: CaseStudySection,
  contact_form: ContactFormSection,
};

export default function PageRenderer({ sections, breadcrumb, navCms, footerCms }: { sections: any[]; breadcrumb?: { label: string; href: string }; navCms?: any; footerCms?: any }) {
  return (
    <div className="w-full min-h-screen bg-[#f5efdf]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
      <SharedHeader cms={navCms} />

      {breadcrumb && (
        <div className="bg-[#f5efdf] w-full px-6 md:px-[120px] py-3 -mt-[10px]">
          <div className="max-w-[1200px] mx-auto">
            <a href={breadcrumb.href} className="text-[#5d0f0f]/60 text-[14px] font-medium hover:text-[#5d0f0f] transition-colors cursor-pointer">
              &larr; {breadcrumb.label}
            </a>
          </div>
        </div>
      )}

      {sections.map((blok: any) => {
        if (blok.component === "footer" || blok.component === "navigation") return null;
        const Component = blockComponents[blok.component];
        if (!Component) return null;
        return <Component key={blok._uid} blok={blok} />;
      })}

      <SharedFooter cms={footerCms} />
    </div>
  );
}
