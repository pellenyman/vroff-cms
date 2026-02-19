"use client";

import { useState, useEffect } from "react";
import V2PageStatic from "@/components/V2PageStatic";
import OnboardingModal from "@/components/OnboardingModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cmsData, setCmsData] = useState<any[] | null>(null);

  useEffect(() => {
    fetch(`https://api.storyblok.com/v2/cdn/stories/home?token=${process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN}&version=draft`)
      .then(r => r.json())
      .then(d => setCmsData(d.story?.content?.body || null))
      .catch(() => {});
  }, []);

  return (
    <>
      <V2PageStatic onOpenModal={() => setModalOpen(true)} cmsData={cmsData} />
      <OnboardingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
