"use client";

import { use } from "react";
import CmsPage from "@/components/CmsPage";

const SUPPORTED_LANGS = ["en"];

export default function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = use(params);

  const lang = SUPPORTED_LANGS.includes(slug[0]) ? slug[0] : null;
  const pathParts = lang ? slug.slice(1) : slug;
  const storySlug = pathParts.join("/") || "home";

  const isCaseSingle = pathParts.length === 2 && pathParts[0] === "case";
  const breadcrumb = isCaseSingle ? { label: "Alla kundcase", href: "/case" } : undefined;

  return <CmsPage storySlug={storySlug} language={lang} breadcrumb={breadcrumb} />;
}
