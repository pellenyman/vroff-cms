"use client";

import { use } from "react";
import CmsPage from "@/components/CmsPage";

function isLangCode(s: string): boolean {
  return s.length === 2 && /^[a-z]{2}$/.test(s) && s !== "sv";
}

export default function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = use(params);

  const lang = isLangCode(slug[0]) ? slug[0] : null;
  const pathParts = lang ? slug.slice(1) : slug;
  const storySlug = pathParts.join("/").toLowerCase() || "home";

  const isCaseSingle = pathParts.length === 2 && pathParts[0] === "case";
  const bcHref = lang ? `/${lang}/case` : "/case";
  const breadcrumb = isCaseSingle ? { label: "Case", href: bcHref } : undefined;

  return <CmsPage storySlug={storySlug} language={lang} breadcrumb={breadcrumb} />;
}
