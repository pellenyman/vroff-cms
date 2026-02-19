"use client";

import { useState } from "react";
import V2PageStatic from "./V2PageStatic";
import OnboardingModal from "./OnboardingModal";

interface V2PageCMSProps {
  sections: any[] | null;
}

export default function V2PageCMS({ sections }: V2PageCMSProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <V2PageStatic onOpenModal={() => setModalOpen(true)} cmsData={sections} />
      <OnboardingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
