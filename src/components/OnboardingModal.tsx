"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Sparkles, Users, Calendar, Shield } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: ""
  });

  if (!isOpen) return null;

  const steps = [
    {
      title: "Välkommen till Vroff",
      subtitle: "Låt oss komma igång på 2 minuter",
      icon: Sparkles,
    },
    {
      title: "Berätta om dig själv",
      subtitle: "Hjälp oss att anpassa din upplevelse",
      icon: Users,
    },
    {
      title: "Du är redo!",
      subtitle: "Börja samarbeta på ett mänskligare sätt",
      icon: CheckCircle2,
    }
  ];

  const currentStep = steps[step - 1];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final step - close modal
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#f5efe4] rounded-[20px] max-w-[600px] w-full my-4 md:my-0 shadow-2xl animate-in zoom-in-95 duration-300 border-2 border-[#5d0f0f]/10">
        {/* Header */}
        <div className="relative p-4 md:p-8 pb-4 md:pb-6 border-b border-[#5d0f0f]/10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#5d0f0f]/10 transition-colors z-10 cursor-pointer"
          >
            <X className="w-5 h-5 text-[#5d0f0f]" />
          </button>
          
          <div className="flex flex-col items-center gap-3 md:gap-4 pr-8">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#b4bbfd] flex items-center justify-center">
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#6674f2]" />
            </div>
            <div className="text-center">
              <h2 className="text-[20px] md:text-[32px] font-medium text-[#5d0f0f] tracking-[-0.4px] md:tracking-[-0.64px] leading-tight">
                {currentStep.title}
              </h2>
              <p className="text-[14px] md:text-[16px] text-[#5d0f0f]/70 mt-1 md:mt-2">
                {currentStep.subtitle}
              </p>
            </div>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mt-4 md:mt-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-8 bg-[#6674f2]' : 'w-1.5 bg-[#5d0f0f]/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8">
          {step === 1 && (
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white rounded-[10px] p-4 md:p-5 flex flex-col gap-2 md:gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d9ddfe] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#6674f2]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[14px] md:text-[16px] text-[#5d0f0f]">Smart kalender</h4>
                    <p className="text-[12px] md:text-[14px] text-[#5d0f0f]/70 mt-1">Schemalägg möten enkelt</p>
                  </div>
                </div>

                <div className="bg-white rounded-[10px] p-4 md:p-5 flex flex-col gap-2 md:gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d9ddfe] flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#6674f2]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[14px] md:text-[16px] text-[#5d0f0f]">Teamsamarbete</h4>
                    <p className="text-[12px] md:text-[14px] text-[#5d0f0f]/70 mt-1">Arbeta tillsammans sömlöst</p>
                  </div>
                </div>

                <div className="bg-white rounded-[10px] p-4 md:p-5 flex flex-col gap-2 md:gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d9ddfe] flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#6674f2]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[14px] md:text-[16px] text-[#5d0f0f]">Säker data</h4>
                    <p className="text-[12px] md:text-[14px] text-[#5d0f0f]/70 mt-1">Din integritet är viktig</p>
                  </div>
                </div>

                <div className="bg-white rounded-[10px] p-4 md:p-5 flex flex-col gap-2 md:gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d9ddfe] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#6674f2]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[14px] md:text-[16px] text-[#5d0f0f]">AI-assistans</h4>
                    <p className="text-[12px] md:text-[14px] text-[#5d0f0f]/70 mt-1">Automatisera repetitiva uppgifter</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4 md:gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[12px] md:text-[14px] font-medium text-[#5d0f0f]">Ditt namn</label>
                <input
                  type="text"
                  placeholder="Anna Andersson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-[10px] bg-white border border-[#5d0f0f]/10 focus:border-[#6674f2] focus:outline-none text-[14px] md:text-[16px] text-[#5d0f0f] placeholder:text-[#5d0f0f]/40 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] md:text-[14px] font-medium text-[#5d0f0f]">E-postadress</label>
                <input
                  type="email"
                  placeholder="anna@företag.se"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-[10px] bg-white border border-[#5d0f0f]/10 focus:border-[#6674f2] focus:outline-none text-[14px] md:text-[16px] text-[#5d0f0f] placeholder:text-[#5d0f0f]/40 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] md:text-[14px] font-medium text-[#5d0f0f]">Företag (valfritt)</label>
                <input
                  type="text"
                  placeholder="Ditt företagsnamn"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-[10px] bg-white border border-[#5d0f0f]/10 focus:border-[#6674f2] focus:outline-none text-[14px] md:text-[16px] text-[#5d0f0f] placeholder:text-[#5d0f0f]/40 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] md:text-[14px] font-medium text-[#5d0f0f]">Teamstorlek</label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-[10px] bg-white border border-[#5d0f0f]/10 focus:border-[#6674f2] focus:outline-none text-[14px] md:text-[16px] text-[#5d0f0f] transition-colors"
                >
                  <option value="">Välj teamstorlek</option>
                  <option value="1-10">1-10 personer</option>
                  <option value="11-50">11-50 personer</option>
                  <option value="51-200">51-200 personer</option>
                  <option value="200+">200+ personer</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center gap-4 md:gap-6 py-4 md:py-8">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#b4bbfd] flex items-center justify-center animate-in zoom-in duration-500">
                <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-[#6674f2]" />
              </div>
              <div className="text-center">
                <h3 className="text-[20px] md:text-[24px] font-medium text-[#5d0f0f] mb-2">
                  Grattis! Du är redo att börja
                </h3>
                <p className="text-[14px] md:text-[16px] text-[#5d0f0f]/70">
                  Vi har skickat en bekräftelse till {formData.email || "din e-post"}
                </p>
              </div>
              
              <div className="w-full bg-white rounded-[10px] p-4 md:p-5 mt-2 md:mt-4">
                <h4 className="font-medium text-[14px] md:text-[16px] text-[#5d0f0f] mb-3">Nästa steg:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[12px] md:text-[14px] text-[#5d0f0f]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#6674f2] mt-0.5 shrink-0" />
                    <span>Bjud in ditt team</span>
                  </li>
                  <li className="flex items-start gap-2 text-[12px] md:text-[14px] text-[#5d0f0f]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#6674f2] mt-0.5 shrink-0" />
                    <span>Skapa ditt första projekt</span>
                  </li>
                  <li className="flex items-start gap-2 text-[12px] md:text-[14px] text-[#5d0f0f]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#6674f2] mt-0.5 shrink-0" />
                    <span>Utforska våra mallar</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-8 pt-0 flex justify-between items-center gap-2">
          {step > 1 && step < 3 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 md:px-6 py-2 text-[14px] md:text-[16px] text-[#5d0f0f] hover:bg-[#5d0f0f]/5 rounded-full transition-colors cursor-pointer"
            >
              Tillbaka
            </button>
          )}
          <div className="flex-1" />
          <button
            type="button"
            onClick={handleNext}
            className="bg-[#6674f2] text-white rounded-full px-6 md:px-8 py-2.5 md:py-3 text-[14px] md:text-[16px] hover:bg-[#5664e2] transition-colors shadow-lg hover:shadow-xl cursor-pointer"
          >
            {step === 3 ? 'Börja använda Vroff' : step === 2 ? 'Fortsätt' : 'Kom igång'}
          </button>
        </div>
      </div>
    </div>
  );
}