import { getStoryblokApi } from "@/lib/storyblok";
import PageRenderer from "@/components/PageRenderer";

export default async function CasePage() {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories/case", { version: "draft" });
    return <PageRenderer sections={data.story.content.body} />;
  } catch {
    return <div className="min-h-screen flex items-center justify-center"><p>Case-sidan laddas...</p></div>;
  }
}
