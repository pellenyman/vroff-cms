import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

export default async function Home() {
  let story;
  try {
    const { data } = await fetchData();
    story = data.story;
  } catch {
    // Fallback: render default V2 page if Storyblok is not configured yet
    return <FallbackPage />;
  }

  return (
    <div className="w-full min-h-screen">
      <StoryblokStory story={story} />
    </div>
  );
}

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get("cdn/stories/home", { version: "draft" });
}

// Fallback renders the static V2 page until Storyblok content is set up
function FallbackPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-8">
      <div className="max-w-[600px] text-center flex flex-col gap-6">
        <h1 className="text-[48px] font-bold tracking-[-2px]">Vroff</h1>
        <p className="text-[20px] font-medium text-[#5d0f0f]/70">
          CMS-projektet är redo. Konfigurera ditt Storyblok Space med content för att se sidan.
        </p>
        <div className="bg-white rounded-[10px] p-6 text-left text-[14px] font-medium">
          <p className="font-semibold mb-2">Nästa steg:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Logga in på <a href="https://app.storyblok.com" className="text-[#6674f2] underline" target="_blank">app.storyblok.com</a></li>
            <li>Skapa blocks (hero, feature, testimonial, etc.)</li>
            <li>Skapa en "home" story med page content type</li>
            <li>Lägg till sektioner i body-fältet</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
