import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export default function MoveFasterSection() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[50vh] bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 flex flex-col items-center justify-center px-6">
      
      {/* Animated Content Wrapper */}
      <div className="flex flex-col items-center text-center max-w-[800px] w-full">
        
        {/* Headline */}
        <h2 
          className={`text-[42px] md:text-[56px] lg:text-[64px] font-serif text-[#1A1A1A] leading-[1.1] font-medium tracking-tight mb-5 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          Move faster with Loop
        </h2>
        
        {/* Sub-headline */}
        <p 
          className={`text-[17px] md:text-[20px] text-[#666666] leading-[1.5] mb-12 max-w-[720px] transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.2s' }}
        >
          Get 1 year free of Loop Business for your startup. Move fast without losing context — capture every conversation, align your team, and ship faster
        </p>
        
        {/* Interactive CTA Button */}
        <div 
          className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.3s' }}
        >
          <button className="group relative bg-[#546522] hover:bg-[#43521b] text-white px-10 py-3.5 rounded-full text-[16px] font-bold transition-all duration-300 flex items-center gap-2 shadow-[0_4px_15px_rgba(84,101,34,0.2)] hover:shadow-[0_8px_25px_rgba(84,101,34,0.35)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.97] overflow-hidden">
            
            {/* Subtle shine effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
            
            <span className="relative z-10">Apply</span>
            <Zap 
              size={18} 
              strokeWidth={2.5} 
              className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:translate-x-0.5 fill-current opacity-90 group-hover:opacity-100" 
            />
          </button>
        </div>

      </div>

      {/* Embedded Animation Styles */}
      <style>
        {`
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