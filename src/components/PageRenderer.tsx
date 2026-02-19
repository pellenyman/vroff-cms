"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const imgAvatar = "/assets/283a376b0fafb9874fefe43652d98fad3cdad31c.png";
const imgCase = "/assets/4dc6e4130302c1fff2514ea9247cc5842789902a.png";

/* Shared section renderer for CMS pages (FAQ, Case, Kontakt) */

function HeroSection({ blok }: { blok: any }) {
  return (
    <section className="bg-[#5d0f0f] w-full py-[80px] md:py-[120px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center gap-[20px]">
        <h1 className="text-[#fafafa] text-[36px] md:text-[64px] font-semibold tracking-[-2px] leading-[1.05]">{blok.headline}</h1>
        {blok.subtext && <p className="text-[#b4bbfd] text-[16px] md:text-[20px] font-medium max-w-[600px]">{blok.subtext}</p>}
        {blok.cta_text && (
          <a href={blok.cta_link?.cached_url || "/kontakt"} className="bg-[#6674f2] text-[#fafafa] font-semibold px-[30px] py-[12px] rounded-[20px] text-[16px] mt-4 hover:bg-[#5664e2] transition-colors">{blok.cta_text}</a>
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
  return (
    <section className="bg-[#b4bbfd] w-full py-[80px] px-6 md:px-[120px]">
      <div className="max-w-[800px] mx-auto text-center flex flex-col items-center gap-[20px]">
        <h2 className="text-[#5d0f0f] text-[28px] md:text-[44px] font-semibold tracking-[-1.5px]">{blok.headline}</h2>
        {blok.description && <p className="text-[#5d0f0f] text-[16px] md:text-[20px] font-medium">{blok.description}</p>}
        {blok.cta_text && (
          <a href={blok.cta_link?.cached_url || "/kontakt"} className="bg-[#6674f2] text-[#fafafa] font-semibold px-[30px] py-[12px] rounded-[20px] text-[16px] hover:bg-[#5664e2] transition-colors">{blok.cta_text}</a>
        )}
      </div>
    </section>
  );
}

function FaqFilterSection({ blok }: { blok: any }) {
  const [active, setActive] = useState("Alla");
  const categories = ["Alla", ...(blok.categories || []).map((c: any) => c.name)];
  return (
    <section className="bg-[#f5efdf] w-full py-[40px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-wrap gap-[12px]">
        {categories.map((cat: string) => (
          <button key={cat} type="button" onClick={() => setActive(cat)}
            className={`px-[20px] py-[8px] rounded-[50px] text-[14px] font-semibold cursor-pointer transition-colors ${
              active === cat ? "bg-[#5d0f0f] text-[#fafafa]" : "bg-white text-[#5d0f0f] hover:bg-[#5d0f0f]/10"
            }`}>{cat}</button>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ blok }: { blok: any }) {
  const [open, setOpen] = useState(0);
  const items = blok.items || [];
  return (
    <section className="bg-[#fafafa] w-full py-[80px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[40px]">
        {blok.headline && <h2 className="text-[#5d0f0f] text-[28px] md:text-[44px] font-semibold tracking-[-1.5px]">{blok.headline}</h2>}
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
  const items = blok.items || [];
  return (
    <section className="bg-[#ede1c9] w-full py-[80px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[40px]">
        {blok.headline && <h2 className="text-[#5d0f0f] text-[28px] md:text-[44px] font-semibold tracking-[-1.5px]">{blok.headline}</h2>}
        <div className="flex flex-col md:flex-row gap-[30px]">
          {items.map((c: any, i: number) => (
            <div key={c._uid || i} className="bg-[#b4bbfd] rounded-[10px] p-[35px] flex-1 flex flex-col gap-[20px]">
              <div className="h-[200px] rounded-[10px] overflow-hidden">
                <img src={c.image?.filename || imgCase} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[#5d0f0f] text-[24px] font-semibold whitespace-pre-wrap">{c.title}</h3>
              <p className="text-[#5d0f0f] text-[16px] font-medium leading-[1.5]">{c.description}</p>
              <a href={c.link?.cached_url || "#"} className="bg-[#6674f2] text-[#d7dbfe] font-semibold text-[14px] px-[30px] py-[12px] rounded-[15px] w-fit hover:bg-[#5664e2] transition-colors">{c.button_text || "Läs mer"}</a>
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
    <section className="bg-[#fafafa] w-full py-[80px] px-6 md:px-[120px]">
      <div className="max-w-[600px] mx-auto flex flex-col gap-[30px]">
        {blok.headline && <h2 className="text-[#5d0f0f] text-[28px] md:text-[36px] font-semibold tracking-[-1px]">{blok.headline}</h2>}
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

function FooterSection() {
  const cols = [
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum", "Praesentium", "praesentium.", "Numquam unde"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum", "Praesentium"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum", "Praesentium", "praesentium.", "Numquam unde"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum", "praesentium.", "Unde"] },
  ];
  return (
    <footer className="bg-[#5d0f0f] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[63px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-[16px] tracking-[-0.32px]">
          {cols.map((col, i) => (
            <div key={i} className="flex flex-col gap-1 leading-[1.8]">
              <p className="text-[#fafafa] font-semibold">{col.title}</p>
              {col.links.map((l, j) => (
                <p key={j} className="text-[#b4bbfd] font-medium cursor-pointer hover:text-white transition-colors duration-200">{l}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="pt-[46px] border-t border-[#b4bbfd]/40">
          <span className="text-[#6674f2] text-[24px] font-bold">Vroff</span>
        </div>
      </div>
    </footer>
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
  footer: ({ blok }) => <FooterSection />,
};

export default function PageRenderer({ sections }: { sections: any[] }) {
  return (
    <div className="w-full min-h-screen bg-[#f5efdf]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
      {/* Nav */}
      <nav className="bg-[#fafafa] w-full py-4 px-6 md:px-[120px] flex items-center justify-between">
        <a href="/" className="text-[#5d0f0f] text-[20px] font-bold cursor-pointer">Vroff</a>
        <div className="flex items-center gap-[24px]">
          <a href="/" className="text-[#5d0f0f] text-[16px] font-semibold hover:opacity-70 transition-opacity">Hem</a>
          <a href="/faq" className="text-[#5d0f0f] text-[16px] font-semibold hover:opacity-70 transition-opacity">FAQ</a>
          <a href="/case" className="text-[#5d0f0f] text-[16px] font-semibold hover:opacity-70 transition-opacity">Case</a>
          <a href="/kontakt" className="text-[#5d0f0f] text-[16px] font-semibold hover:opacity-70 transition-opacity">Kontakt</a>
        </div>
      </nav>

      {/* Sections */}
      {sections.map((blok: any) => {
        const Component = blockComponents[blok.component];
        if (!Component) return null;
        return <Component key={blok._uid} blok={blok} />;
      })}
    </div>
  );
}
