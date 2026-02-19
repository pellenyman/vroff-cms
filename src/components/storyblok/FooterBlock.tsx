export default function FooterBlock({ blok }: { blok: any }) {
  const columns = blok.columns || [];
  return (
    <footer className="bg-[#5d0f0f] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[63px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-[16px] tracking-[-0.32px]">
          {columns.map((col: any, i: number) => (
            <div key={col._uid || i} className="flex flex-col gap-1 leading-[1.8]">
              <p className="text-[#fafafa] font-semibold">{col.title}</p>
              {(col.links || []).map((link: any, j: number) => (
                <a key={j} href={link.url?.cached_url || "#"} className="text-[#b4bbfd] font-medium cursor-pointer hover:text-white transition-colors duration-200">
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="pt-[46px] border-t border-[#b4bbfd]/40">
          <span className="text-[#6674f2] text-[24px] font-bold">Vroff</span>
        </div>
      </div>
    </footer>
  );
}
