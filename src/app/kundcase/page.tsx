"use client";

import { useState, useEffect } from "react";
import PageRenderer from "@/components/PageRenderer";

export default function CasePage() {
  const [sections, setSections] = useState<any[] | null>(null);

  useEffect(() => {
    fetch(`https://api.storyblok.com/v2/cdn/stories/kundcase/?token=${process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN}&version=draft`)
      .then(r => r.json())
      .then(d => setSections(d.story?.content?.body || null))
      .catch(() => {});
  }, []);

  if (!sections) return <div className="min-h-screen flex items-center justify-center bg-[#f5efdf]"><p className="text-[#5d0f0f] text-[20px]">Laddar...</p></div>;
  return <PageRenderer sections={sections} />;
}
