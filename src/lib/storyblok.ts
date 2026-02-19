import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

import Page from "@/components/storyblok/Page";
import HeroBlock from "@/components/storyblok/HeroBlock";
import FeatureBlock from "@/components/storyblok/FeatureBlock";
import TestimonialBlock from "@/components/storyblok/TestimonialBlock";
import SecurityBlock from "@/components/storyblok/SecurityBlock";
import FilmBlock from "@/components/storyblok/FilmBlock";
import StepBlock from "@/components/storyblok/StepBlock";
import PricingBlock from "@/components/storyblok/PricingBlock";
import FaqBlock from "@/components/storyblok/FaqBlock";
import CaseBlock from "@/components/storyblok/CaseBlock";
import CtaBlock from "@/components/storyblok/CtaBlock";
import FooterBlock from "@/components/storyblok/FooterBlock";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    hero: HeroBlock,
    feature: FeatureBlock,
    testimonial: TestimonialBlock,
    security: SecurityBlock,
    film: FilmBlock,
    step: StepBlock,
    pricing: PricingBlock,
    faq: FaqBlock,
    case_study: CaseBlock,
    cta: CtaBlock,
    footer: FooterBlock,
  },
  apiOptions: {
    region: "eu",
  },
});
