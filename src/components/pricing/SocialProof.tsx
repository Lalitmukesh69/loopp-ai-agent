import React from 'react';

// --- Custom SVG Logos to match the image precisely ---
const BrexLogo = () => (
  <div className="flex items-center gap-1.5 font-sans font-bold text-xl tracking-tight">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.4">
      <path d="M4 12V6h10l4 6-4 6H4v-6zm2-4v8h7.5l2.5-4-2.5-4H6z"/>
    </svg>
    Brex
  </div>
);

const ReplitLogo = () => (
  <div className="flex items-center gap-1.5 font-sans font-bold text-[22px] tracking-tight">
    <div className="grid grid-cols-2 gap-[2px] w-5 h-5 opacity-70">
      <div className="bg-current rounded-sm w-2 h-2"></div>
      <div className="bg-current rounded-sm w-2 h-2 opacity-0"></div>
      <div className="bg-current rounded-sm w-2 h-2"></div>
      <div className="bg-current rounded-sm w-2 h-2"></div>
    </div>
    replit
  </div>
);

const VercelLogo = () => (
  <div className="flex items-center gap-1.5 font-sans font-bold text-[22px] tracking-tighter">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L24 22H0L12 1Z" />
    </svg>
    Vercel
  </div>
);

const PostHogLogo = () => (
  <div className="flex items-center gap-1.5 font-sans font-extrabold text-xl tracking-tight">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.8">
      <path d="M2 18h20v-2l-2-2v-2l-2-2v-2l-2-2v-2L12 4 2 14v4zm10-12l6 6v4H6v-4l6-6z"/>
    </svg>
    PostHog
  </div>
);

const IntercomLogo = () => (
  <div className="flex items-center gap-2 font-sans font-bold text-[14px] tracking-widest uppercase">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-4h2v4zm4 0h-2v-6h2v6zm4-2h-2v-2h2v2z"/>
    </svg>
    Intercom
  </div>
);

const RampLogo = () => (
  <div className="flex items-center font-serif font-medium text-[24px] tracking-tight italic">
    ramp
  </div>
);

// --- Reusable Card Component ---
const LogoCard = ({ children }) => (
  <div className="w-[170px] h-[72px] flex items-center justify-center bg-white border border-[#EBEBEB] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.015)] transition-all duration-300 ease-out hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 cursor-pointer group shrink-0 mx-2">
    <div className="text-[#1A1A1A] opacity-60 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105">
      {children}
    </div>
  </div>
);

// --- Marquee Block ---
const LogoBlock = () => (
  <div className="flex items-center shrink-0">
    <LogoCard><BrexLogo /></LogoCard>
    <LogoCard><ReplitLogo /></LogoCard>
    <LogoCard><VercelLogo /></LogoCard>
    <LogoCard><PostHogLogo /></LogoCard>
    <LogoCard><IntercomLogo /></LogoCard>
    <LogoCard><RampLogo /></LogoCard>
  </div>
);

export default function TrustedBySection() {
  return (
    <div className="bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-32 flex flex-col items-center overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-14 px-6 animate-[fadeUp_0.8s_ease-out_both]">
        <h2 className="text-[32px] md:text-[36px] font-serif text-[#1A1A1A] leading-[1.2] tracking-tight">
          Helping the world's best product<br className="hidden md:block"/>
          teams get more out of their meetings
        </h2>
      </div>

      {/* Infinite Animated Marquee Container */}
      <div className="relative w-full max-w-[1400px] mx-auto group/marquee">
        
        {/* Soft fading edges to blend seamlessly into the background */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="flex w-max animate-[scrollLogos_40s_linear_infinite] group-hover/marquee:[animation-play-state:paused] py-4">
          <LogoBlock />
          <LogoBlock />
          <LogoBlock />
          <LogoBlock />
        </div>

      </div>

      {/* Global Animation Styles */}
      <style>
        {`
          @keyframes scrollLogos {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } 
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}