"use client";

import { useState } from "react";
import V2PageStatic from "@/components/V2PageStatic";
import OnboardingModal from "@/components/OnboardingModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <V2PageStatic onOpenModal={() => setModalOpen(true)} />
      <OnboardingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
