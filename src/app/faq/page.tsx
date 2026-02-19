import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

export default async function FaqPage() {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories/faq", { version: "draft" });
    return <StoryblokStory story={data.story} />;
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[20px] font-medium">FAQ-sidan är inte konfigurerad i Storyblok ännu.</p>
      </div>
    );
  }
}
