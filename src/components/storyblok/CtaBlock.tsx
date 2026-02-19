export default function CtaBlock({ blok }: { blok: any }) {
  return (
    <section className="bg-[#b4bbfd] w-full py-[80px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-[24px]">
        <h2 className="text-[#5d0f0f] text-[28px] md:text-[44px] font-semibold tracking-[-1.5px]">{blok.headline || "Redo att börja?"}</h2>
        {blok.description && <p className="text-[#5d0f0f] text-[16px] md:text-[20px] font-medium max-w-[600px]">{blok.description}</p>}
        {blok.cta_text && (
          <a href={blok.cta_link?.cached_url || "#"} className="bg-[#6674f2] text-[#fafafa] font-semibold px-[30px] py-[12px] rounded-[20px] text-[16px] hover:bg-[#5664e2] transition-colors">
            {blok.cta_text}
          </a>
        )}
      </div>
    </section>
  );
}
