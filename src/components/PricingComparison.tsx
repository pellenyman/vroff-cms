import React from "react";
import { X, Check } from "lucide-react";

interface PricingComparisonProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingComparison({ isOpen, onClose }: PricingComparisonProps) {
  if (!isOpen) return null;

  const features = [
    { category: "Grundläggande funktioner", items: [
      { name: "Användare", mini: "5 användare", mellan: "25 användare", max: "Obegränsat" },
      { name: "Lagringsutrymme", mini: "10 GB", mellan: "100 GB", max: "1 TB" },
      { name: "Projektstöd", mini: true, mellan: true, max: true },
      { name: "Mobil app", mini: true, mellan: true, max: true },
    ]},
    { category: "Samarbete", items: [
      { name: "Delning av filer", mini: true, mellan: true, max: true },
      { name: "Realtidsredigering", mini: false, mellan: true, max: true },
      { name: "Videomöten", mini: "30 min", mellan: "2 timmar", max: "Obegränsat" },
      { name: "Skärminspelning", mini: false, mellan: true, max: true },
    ]},
    { category: "Avancerade funktioner", items: [
      { name: "API-åtkomst", mini: false, mellan: false, max: true },
      { name: "Anpassade integrationer", mini: false, mellan: false, max: true },
      { name: "Prioriterad support", mini: false, mellan: true, max: true },
      { name: "Dedikerad kontohanterare", mini: false, mellan: false, max: true },
    ]},
    { category: "Säkerhet", items: [
      { name: "SSL-kryptering", mini: true, mellan: true, max: true },
      { name: "Tvåfaktorsautentisering", mini: true, mellan: true, max: true },
      { name: "SSO (Single Sign-On)", mini: false, mellan: true, max: true },
      { name: "Datalagring i EU", mini: false, mellan: false, max: true },
    ]},
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#f5efe4] rounded-[20px] max-w-[1000px] w-full my-4 md:my-8 shadow-2xl animate-in zoom-in-95 duration-300 border-2 border-[#5d0f0f]/10 relative">
        {/* Header */}
        <div className="bg-[#f5efe4] rounded-t-[20px] p-4 md:p-8 pb-4 md:pb-6 border-b border-[#5d0f0f]/10 sticky top-0 z-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#5d0f0f]/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-[#5d0f0f]" />
          </button>
          
          <h2 className="text-[20px] md:text-[32px] font-medium text-[#5d0f0f] tracking-[-0.4px] md:tracking-[-0.64px] leading-tight pr-8">
            Fullständig prisjämförelse
          </h2>
          <p className="text-[12px] md:text-[16px] text-[#5d0f0f]/70 mt-1 md:mt-2">
            Jämför alla funktioner mellan våra prisplaner
          </p>
        </div>

        {/* Pricing Table */}
        <div className="p-4 md:p-8 overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6 min-w-[600px]">
            <div className="text-[10px] md:text-[14px] font-medium text-[#5d0f0f]">Funktioner</div>
            <div className="bg-white rounded-[10px] p-2 md:p-4 text-center">
              <h3 className="text-[14px] md:text-[20px] font-medium text-[#5d0f0f] mb-0.5 md:mb-1">Mini</h3>
              <p className="text-[10px] md:text-[14px] text-[#5d0f0f]/70">Nivå 1</p>
            </div>
            <div className="bg-[#b4bbfd] rounded-[10px] p-2 md:p-4 text-center">
              <h3 className="text-[14px] md:text-[20px] font-medium text-[#5d0f0f] mb-0.5 md:mb-1">Mellan</h3>
              <p className="text-[10px] md:text-[14px] text-[#5d0f0f]/70">Nivå 2</p>
            </div>
            <div className="bg-white rounded-[10px] p-2 md:p-4 text-center">
              <h3 className="text-[14px] md:text-[20px] font-medium text-[#5d0f0f] mb-0.5 md:mb-1">Max</h3>
              <p className="text-[10px] md:text-[14px] text-[#5d0f0f]/70">Nivå 3</p>
            </div>
          </div>

          {/* Feature Categories */}
          <div className="min-w-[600px]">
            {features.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-4 md:mb-6">
                <h4 className="text-[12px] md:text-[16px] font-medium text-[#5d0f0f] mb-2 md:mb-3 px-1 md:px-2">
                  {category.category}
                </h4>
                
                {category.items.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex} 
                    className="grid grid-cols-4 gap-2 md:gap-4 py-2 md:py-3 px-1 md:px-2 hover:bg-white/30 rounded-[10px] transition-colors"
                  >
                    <div className="text-[10px] md:text-[14px] text-[#5d0f0f] flex items-center">
                      {feature.name}
                    </div>
                    <div className="flex items-center justify-center">
                      {typeof feature.mini === 'boolean' ? (
                        feature.mini ? (
                          <Check className="w-4 h-4 md:w-5 md:h-5 text-[#6674f2]" />
                        ) : (
                          <span className="text-[#5d0f0f]/30">—</span>
                        )
                      ) : (
                        <span className="text-[10px] md:text-[14px] text-[#5d0f0f] text-center">{feature.mini}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-center">
                      {typeof feature.mellan === 'boolean' ? (
                        feature.mellan ? (
                          <Check className="w-4 h-4 md:w-5 md:h-5 text-[#6674f2]" />
                        ) : (
                          <span className="text-[#5d0f0f]/30">—</span>
                        )
                      ) : (
                        <span className="text-[10px] md:text-[14px] text-[#5d0f0f] text-center">{feature.mellan}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-center">
                      {typeof feature.max === 'boolean' ? (
                        feature.max ? (
                          <Check className="w-4 h-4 md:w-5 md:h-5 text-[#6674f2]" />
                        ) : (
                          <span className="text-[#5d0f0f]/30">—</span>
                        )
                      ) : (
                        <span className="text-[10px] md:text-[14px] text-[#5d0f0f] text-center">{feature.max}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#5d0f0f]/10 min-w-[600px]">
            <div></div>
            <button type="button" className="bg-[#d9ddfe] text-[#5d0f0f] rounded-[50px] px-3 md:px-6 py-2 md:py-3 text-[12px] md:text-[16px] hover:bg-[#c4cbfb] transition-colors cursor-pointer">
              Välj Mini
            </button>
            <button type="button" className="bg-[#6674f2] text-white rounded-[50px] px-3 md:px-6 py-2 md:py-3 text-[12px] md:text-[16px] hover:bg-[#5664e2] transition-colors cursor-pointer">
              Välj Mellan
            </button>
            <button type="button" className="border border-[#5d0f0f] text-[#5d0f0f] rounded-[50px] px-3 md:px-6 py-2 md:py-3 text-[12px] md:text-[16px] hover:bg-[#5d0f0f] hover:text-white transition-colors cursor-pointer">
              Välj Max
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}