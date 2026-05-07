import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

export default function SecurityHeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[60vh] bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center">
      
      {/* Content Wrapper - Left Aligned but Constrained */}
      <div className="max-w-[900px] w-full mx-auto md:mx-0">
        
        {/* Headline */}
        <h1 
          className={`text-[46px] md:text-[56px] lg:text-[68px] font-serif text-[#1A1A1A] leading-[1.05] tracking-tight mb-6 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          Security, privacy, and how it all works
        </h1>
        
        {/* Sub-headline */}
        <p 
          className={`text-[18px] md:text-[21px] text-[#737373] leading-[1.5] max-w-[700px] mb-12 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.2s' }}
        >
          Your security and privacy are of utmost importance to us. Find the most important details below, followed by FAQs, and then links to all our terms and policies at the bottom of this page.
        </p>

        {/* Vulnerability Notice Box (Interactive) */}
        <div 
          className={`max-w-[680px] bg-[#F9F9F6] border border-transparent rounded-[8px] p-6 md:p-8 flex items-start gap-4 group cursor-default transition-all duration-500 ease-out transform hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#EAEADF] hover:bg-[#FDFDFC] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.3s' }}
        >
          {/* Requested Icon Addition */}
          <div className="mt-0.5 shrink-0 text-[#A2B64F] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
            <Shield size={20} strokeWidth={2} />
          </div>
          
          <div className="text-[15px] text-[#666666] leading-[1.6]">
            We encourage security vulnerability reports and maintain a public{' '}
            <a 
              href="#" 
              className="text-[#666666] underline decoration-[#C2C2C2] hover:text-[#1A1A1A] hover:decoration-[#1A1A1A] underline-offset-4 transition-all duration-300 font-medium"
            >
              Vulnerability Disclosure Policy
            </a>
            {' '}with reporting guidelines and procedures.
          </div>
        </div>

      </div>

    </div>
  );
}