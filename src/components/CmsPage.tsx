"use client";

import { useState, useEffect } from "react";
import V2PageStatic from "./V2PageStatic";
import OnboardingModal from "./OnboardingModal";
import PageRenderer from "./PageRenderer";

interface CmsPageProps {
  storySlug: string;
  language?: string | null;
  breadcrumb?: { label: string; href: string };
}

function findSection(sections: any[] | null | undefined, component: string): any | null {
  if (!sections) return null;
  return sections.find((s: any) => s.component === component) || null;
}

export default function CmsPage({ storySlug, language, breadcrumb }: CmsPageProps) {
  const [sections, setSections] = useState<any[] | null>(null);
  const [globalData, setGlobalData] = useState<any[] | null>(null);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const token = process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN;
  const langParam = language ? `&language=${language}` : "";

  useEffect(() => {
    fetch(`https://api.storyblok.com/v2/cdn/stories/${storySlug}?token=${token}&version=draft${langParam}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setSections(d.story?.content?.body || null))
      .catch(() => setError(true));
  }, [storySlug, language]);

  useEffect(() => {
    if (storySlug === "home") return;
    fetch(`https://api.storyblok.com/v2/cdn/stories/home?token=${token}&version=draft${langParam}`)
      .then(r => r.json())
      .then(d => setGlobalData(d.story?.content?.body || null))
      .catch(() => {});
  }, [storySlug, language]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5efdf]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
        <p className="text-[#5d0f0f] text-[20px]">Sidan hittades inte.</p>
      </div>
    );
  }

  const isHome = storySlug === "home";

  if (isHome) {
    return (
      <>
        <V2PageStatic onOpenModal={() => setModalOpen(true)} cmsData={sections} />
        <OnboardingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  const navCms = findSection(globalData, "navigation");
  const footerCms = findSection(globalData, "footer");

  if (!sections) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5efdf]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-[40px] h-[40px] border-[3px] border-[#5d0f0f] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#5d0f0f] text-[18px] font-medium">Laddar...</p>
        </div>
      </div>
    );
  }

  return <PageRenderer sections={sections} breadcrumb={breadcrumb} navCms={navCms} footerCms={footerCms} />;
}
