import React from 'react';

// Custom Windows Icon SVG
const WindowsIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/>
  </svg>
);

export default function SimpleHeroApp() {
  return (
    <div className="min-h-[75vh] bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black flex flex-col items-center justify-center px-6">
      
      {/* Animated Content Wrapper */}
      <div className="flex flex-col items-center animate-[fadeUp_0.8s_ease-out_both] max-w-4xl mx-auto w-full">
        
        {/* Headline */}
        <h1 className="text-[44px] md:text-[64px] font-serif text-[#1A1A1A] leading-[1.1] font-medium tracking-tight text-center mb-6 cursor-default transition-transform duration-500 hover:scale-[1.01]">
          More than an AI note-taker
        </h1>
        
        {/* Sub-headline */}
        <p className="text-[18px] md:text-[20px] text-[#737373] max-w-[780px] text-center leading-[1.6] mb-12 cursor-default">
          Discover the difference between an AI note-taker and an AI notepad. Learn about<br className="hidden md:block" />
          how Loop helps you stay focused in meetings and in control of your notes.
        </p>
        
        {/* Interactive CTA Button */}
        <button className="group relative bg-[#546522] hover:bg-[#43521b] text-white px-8 py-3.5 rounded-full text-[15px] font-bold transition-all duration-300 flex items-center gap-2.5 shadow-[0_4px_15px_rgba(84,101,34,0.25)] hover:shadow-[0_8px_25px_rgba(84,101,34,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] overflow-hidden">
          {/* Subtle shine effect on hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
          
          <WindowsIcon className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110 group-active:scale-95" />
          <span className="relative z-10">Try it for free</span>
        </button>

      </div>

      {/* Embedded Animation Styles */}
      <style>
        {`
          @keyframes fadeUp {
            from { 
              opacity: 0; 
              transform: translateY(24px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
}