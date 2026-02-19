"use client";

import { useState, useRef, useEffect } from "react";

export default function FilmBlock({ blok }: { blok: any }) {
  const imgSrc = blok.thumbnail?.filename || "/assets/1f0e5946b884ef95fa586fc7af2e5bdca32525e7.png";
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const togglePlay = () => {
    if (playing) {
      if (timerRef.current) clearInterval(timerRef.current);
      setPlaying(false);
    } else {
      setPlaying(true);
      if (progress >= 100) setProgress(0);
      timerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { if (timerRef.current) clearInterval(timerRef.current); setPlaying(false); return 100; }
          return p + 0.4;
        });
      }, 100);
    }
  };

  useEffect(() => { return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const totalSec = 253;
  const formatTime = (pct: number) => {
    const cur = Math.floor((pct / 100) * totalSec);
    return `${Math.floor(cur / 60)}:${(cur % 60).toString().padStart(2, "0")}`;
  };

  return (
    <section id="film" className="bg-[#ede1c9] w-full py-[100px] flex justify-center px-6">
      <div className="relative w-full max-w-[1152px] rounded-[10px] overflow-hidden cursor-pointer group"
        onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} onClick={togglePlay}>
        <div className="relative w-full h-[400px] md:h-[709px]">
          <img src={imgSrc} alt={blok.title || "Film"} className="absolute inset-0 w-full h-full object-cover" />
          <div className={`absolute inset-0 transition-colors duration-300 ${playing ? "bg-black/5" : hovering ? "bg-black/25" : "bg-black/10"}`} />
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-white/90 rounded-full flex items-center justify-center transition-transform duration-300 ${hovering ? "scale-110" : ""}`}>
                <svg className="w-[50px] h-[50px] text-[#5d0f0f] ml-1" fill="none" viewBox="0 0 46.875 46.875">
                  <path clipRule="evenodd" d="M23.4375 46.875C10.4933 46.875 0 36.3817 0 23.4375C0 10.4933 10.4933 0 23.4375 0C36.3817 0 46.875 10.4933 46.875 23.4375C46.875 36.3817 36.3817 46.875 23.4375 46.875ZM19.8017 13.2514C17.2645 12.2406 14.8817 13.7677 14.5145 16.474C14.2658 18.3072 14.0625 20.6564 14.0625 23.4375C14.0625 26.2186 14.2658 28.5678 14.5145 30.401C14.8817 33.1073 17.2645 34.6344 19.8017 33.6236C21.3997 32.9871 23.4974 32.032 26.1949 30.599C28.7427 29.2454 30.7555 28.034 32.3176 27.0094C35.0809 25.1969 35.0809 21.6781 32.3176 19.8656C30.7555 18.841 28.7427 17.6296 26.1949 16.276C23.4974 14.843 21.3997 13.8879 19.8017 13.2514Z" fill="currentColor" fillRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="bg-[#1a1a1a] px-[20px] md:px-[35px] py-[16px] flex items-center gap-[16px]" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={togglePlay} className="shrink-0 cursor-pointer text-white">
            {playing ? <div className="flex gap-[3px]"><div className="w-[3px] h-[14px] bg-white rounded-[1px]" /><div className="w-[3px] h-[14px] bg-white rounded-[1px]" /></div> : <span className="text-[14px]">&#9654;</span>}
          </button>
          <span className="text-white text-[14px] font-medium shrink-0 w-[36px]">{formatTime(progress)}</span>
          <div className="flex-1 h-[3px] bg-white/20 rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setProgress(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100))); }}>
            <div className="h-full bg-[#6674f2] rounded-full transition-[width] duration-100" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-white/50 text-[14px] font-medium shrink-0">{blok.duration || "4:13"}</span>
        </div>
      </div>
    </section>
  );
}
