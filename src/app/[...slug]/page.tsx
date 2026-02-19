"use client";

import { useState, useEffect, use } from "react";
import PageRenderer from "@/components/PageRenderer";

const SUPPORTED_LANGS = ["en"];

export default function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = use(params);

  const lang = SUPPORTED_LANGS.includes(slug[0]) ? slug[0] : null;
  const pathParts = lang ? slug.slice(1) : slug;
  const storySlug = pathParts.join("/") || "home";

  const [sections, setSections] = useState<any[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const langParam = lang ? `&language=${lang}` : "";
    fetch(`https://api.storyblok.com/v2/cdn/stories/${storySlug}?token=${process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN}&version=draft${langParam}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setSections(d.story?.content?.body || null))
      .catch(() => setError(true));
  }, [storySlug, lang]);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5efdf]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
      <p className="text-[#5d0f0f] text-[20px]">Sidan hittades inte.</p>
    </div>
  );

  if (!sections) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5efdf]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
      <p className="text-[#5d0f0f] text-[20px]">Laddar...</p>
    </div>
  );

  const isCaseSingle = (pathParts.length === 2 && pathParts[0] === "case") || (pathParts.length === 1 && ["katarina", "lena", "erik"].includes(pathParts[0]));
  return <PageRenderer sections={sections} breadcrumb={isCaseSingle ? { label: "Alla kundcase", href: "/case" } : undefined} />;
}
