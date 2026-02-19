"use client";

import { useState, useEffect, use } from "react";
import PageRenderer from "@/components/PageRenderer";

export default function CaseSinglePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [sections, setSections] = useState<any[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.storyblok.com/v2/cdn/stories/kundcase/${slug}?token=${process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN}&version=draft`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setSections(d.story?.content?.body || null))
      .catch(() => setError(true));
  }, [slug]);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5efdf]">
      <p className="text-[#5d0f0f] text-[20px]">Case hittades inte.</p>
    </div>
  );

  if (!sections) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5efdf]">
      <p className="text-[#5d0f0f] text-[20px]">Laddar...</p>
    </div>
  );

  return <PageRenderer sections={sections} breadcrumb={{ label: "Alla kundcase", href: "/kundcase" }} />;
}
