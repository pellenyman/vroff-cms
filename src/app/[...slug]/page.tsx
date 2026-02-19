"use client";

import { useState, useEffect, use } from "react";
import PageRenderer from "@/components/PageRenderer";

export default function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = use(params);
  // Storyblok preview catch-all
  const fullSlug = slug.join("/");
  const [sections, setSections] = useState<any[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.storyblok.com/v2/cdn/stories/${fullSlug}?token=${process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN}&version=draft`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setSections(d.story?.content?.body || null))
      .catch(() => setError(true));
  }, [fullSlug]);

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

  // Add breadcrumb for case stories (kundcase/katarina or just katarina)
  const isCaseSingle = (slug.length === 2 && slug[0] === "case") || (slug.length === 1 && ["katarina", "lena", "erik"].includes(slug[0]));
  return <PageRenderer sections={sections} breadcrumb={isCaseSingle ? { label: "Alla kundcase", href: "/case" } : undefined} />;
}
