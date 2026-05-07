import React, { useState, useEffect } from 'react';
import { ChevronLeft, Home } from 'lucide-react';

// --- Custom Brand Logo ---
const LoopSwirlLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
    <path d="M12 12c0-1.5-1-2-2-2s-2 .5-2 2 1 3 3 3 4-1 4-4-2-5-5-5-6 2-6 6 3 8 8 8 9-4 9-10" />
  </svg>
);

// --- Custom Overlapping Documents Icon ---
const EmptyStateIcon = () => (
  <div className="relative w-[80px] h-[90px] mb-6 animate-[float_6s_ease-in-out_infinite] cursor-default group">
    
    {/* Back Note */}
    <div className="absolute top-0 left-0 w-[54px] h-[72px] bg-white border-2 border-[#E5E5E5] rounded-[6px] -rotate-6 transition-transform duration-500 group-hover:-rotate-12 group-hover:-translate-x-2">
      <div className="absolute top-2.5 left-2 w-6 h-[2.5px] bg-[#F0F0F0] rounded-full"></div>
      <div className="absolute top-5 left-2 w-8 h-[2.5px] bg-[#F0F0F0] rounded-full"></div>
      <div className="absolute top-7.5 left-2 w-5 h-[2.5px] bg-[#F0F0F0] rounded-full"></div>
    </div>
    
    {/* Front Note */}
    <div className="absolute top-3 left-4 w-[58px] h-[76px] bg-white border-2 border-[#E5E5E5] shadow-[0_4px_12px_rgba(0,0,0,0.04)] rounded-[6px] rotate-3 transition-transform duration-500 group-hover:rotate-6 group-hover:translate-x-2 group-hover:-translate-y-1">
      <div className="absolute top-3 left-2.5 w-8 h-[3px] bg-[#F0F0F0] rounded-full"></div>
      <div className="absolute top-6.5 left-2.5 w-6 h-[3px] bg-[#F0F0F0] rounded-full"></div>
      <div className="absolute top-10 left-2.5 w-9 h-[3px] bg-[#F0F0F0] rounded-full"></div>
      
      {/* Brand Swirl on the note */}
      <div className="absolute bottom-1.5 right-1.5 text-[#D4D4D4]">
        <LoopSwirlLogo className="w-3.5 h-3.5" />
      </div>
    </div>

  </div>
);

export default function SharedWithMeScreen() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black relative flex flex-col overflow-hidden">
      
      {/* --- Top Absolute Overlay for Controls --- */}
      <div className="absolute top-0 w-full px-4 pt-4 flex items-start justify-between z-20">
        
        {/* Left: Navigation Button */}
        <button 
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-transparent text-[#666666] hover:text-[#1A1A1A] hover:bg-white hover:shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#D1D1D1] transition-all duration-300 active:scale-95 outline-none transform ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <ChevronLeft size={16} strokeWidth={2} />
          <Home size={15} strokeWidth={2} />
        </button>
      </div>

      {/* --- Top Header Title Area --- */}
      <div 
        className={`absolute top-0 w-full pt-16 flex flex-col items-center text-center z-10 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
        style={{ transitionDelay: '0.2s' }}
      >
        <h1 className="text-[28px] font-serif text-[#1A1A1A] tracking-tight mb-1">
          Shared with me
        </h1>
        <p className="text-[14px] text-[#737373]">
          Notes that others have shared with you will appear here.
        </p>
      </div>

      {/* --- Center Empty State Area --- */}
      <div 
        className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
        style={{ transitionDelay: '0.3s' }}
      >
        <EmptyStateIcon />
        
        <h2 className="text-[15px] font-semibold text-[#404040] mb-1">
          No shared notes yet
        </h2>
        <p className="text-[13px] text-[#808080] max-w-[300px] text-center leading-[1.4]">
          When someone shares a note with you, it will show up here
        </p>
      </div>

      {/* Global Animation Keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
        `}
      </style>
    </div>
  );
}