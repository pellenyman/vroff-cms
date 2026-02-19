import { fallbackImages } from "@/lib/images";

export default function SecurityBlock({ blok }: { blok: any }) {
  const items = blok.items || [];
  return (
    <section id="security" className="bg-[#3b0101] w-full py-[100px] md:py-[150px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[50px]">
        <div>
          <h2 className="text-[#ac4324] text-[36px] md:text-[56px] font-semibold tracking-[-2.24px]">{blok.headline || "Säkerhet"}</h2>
          {blok.description && <p className="text-[#c15333] text-[16px] font-medium leading-[1.5] mt-4 max-w-[672px]">{blok.description}</p>}
        </div>
        <div className="flex flex-col md:flex-row gap-[30px]">
          {items.map((s: any, i: number) => (
            <div key={s._uid || i} className="bg-[#5d0f0f] rounded-[10px] p-[44px] flex flex-col gap-[25px] flex-1">
              <div className="h-[220px] rounded-[7px] overflow-hidden">
                <img src={s.image?.filename || [fallbackImages.security1, fallbackImages.security2, fallbackImages.security3][i % 3]} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[#fafafa] text-[18px] font-semibold">{s.title}</p>
                <p className="text-[#c15333] text-[18px] font-medium leading-[1.5] mt-1">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
