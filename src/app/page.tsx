import { getStoryblokApi } from "@/lib/storyblok";
import V2PageCMS from "@/components/V2PageCMS";

export default async function Home() {
  let cmsData = null;
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories/home", { version: "draft" });
    cmsData = data.story.content.body;
  } catch {
    // Storyblok not configured -- render with defaults
  }
  return <V2PageCMS sections={cmsData} />;
}
