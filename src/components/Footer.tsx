export default function Footer() {
  const cols = [
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum", "Praesentium", "praesentium.", "Numquam unde"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum", "Praesentium"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum", "Praesentium", "praesentium.", "Numquam unde"] },
    { title: "Neque natus", links: ["Suisquam", "Muasi nostrum", "praesentium.", "Unde"] },
  ];

  return (
    <footer className="bg-[#5d0f0f] w-full py-[100px] px-6 md:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[63px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-[16px] tracking-[-0.32px]">
          {cols.map((col, i) => (
            <div key={i} className="flex flex-col gap-1 leading-[1.8]">
              <p className="text-[#fafafa] font-semibold">{col.title}</p>
              {col.links.map((l, j) => (
                <p key={j} className="text-[#b4bbfd] font-medium cursor-pointer hover:text-white transition-colors duration-200">{l}</p>
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
