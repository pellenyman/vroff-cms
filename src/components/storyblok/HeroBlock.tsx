"use client";

export default function HeroBlock({ blok }: { blok: any }) {
  const imgSrc = blok.background_image?.filename || "/assets/a4d848fc8e2e4a83a5179b20fc12c3245deb2b64.png";

  return (
    <section className="relative w-full h-[700px] md:h-[800px] flex items-center justify-center overflow-hidden">
      <img src={imgSrc} alt={blok.headline || "Hero"} className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 flex flex-col items-center gap-[30px] pt-[80px] text-center px-6">
        <h1 className="text-[#fafafa] text-[40px] md:text-[76px] font-semibold leading-[1.01] tracking-[-2px] md:tracking-[-3.8px] max-w-[759px]">
          {blok.headline || "Vroff är det nya mänskligare sättet att samarbeta"}
        </h1>
        <p className="text-white text-[16px] md:text-[20px] max-w-[600px]">
          {blok.subtext || "Lorem ipsum dolor Esse ipsam incidunt eligendi veroihil utsit amet."}
        </p>
        {blok.cta_text && (
          <a href={blok.cta_link?.cached_url || "#"} className="bg-[#6674f2] text-[#fafafa] font-semibold px-[30px] py-[12px] rounded-[20px] text-[16px] cursor-pointer hover:bg-[#5664e2] transition-colors">
            {blok.cta_text}
          </a>
        )}
      </div>
    </section>
  );
}
