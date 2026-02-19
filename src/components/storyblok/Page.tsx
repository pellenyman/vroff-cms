import { StoryblokServerComponent } from "@storyblok/react/rsc";

export default function Page({ blok }: { blok: any }) {
  return (
    <main>
      {blok.body?.map((nestedBlok: any) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
