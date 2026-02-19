import { getStoryblokApi } from "@/lib/storyblok";
import PageRenderer from "@/components/PageRenderer";

export default async function FaqPage() {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories/faq", { version: "draft" });
    return <PageRenderer sections={data.story.content.body} />;
  } catch {
    return <div className="min-h-screen flex items-center justify-center"><p>FAQ-sidan laddas...</p></div>;
  }
}
