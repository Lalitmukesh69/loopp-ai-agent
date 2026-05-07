import React, { useEffect, useState } from 'react';
import { SALES_TESTIMONIAL_AVATAR } from '@/data/marketingImages';

// --- Custom SVGs with Micro-Animations ---

const HeartIcon = () => (
  <svg 
    width="18" height="18" viewBox="0 0 24 24" fill="currentColor" 
    className="transition-transform duration-300 group-hover:animate-[heartbeat_1s_ease-in-out_infinite]"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const LinesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" className="transition-all duration-300 group-hover:translate-x-1" />
    <line x1="4" y1="12" x2="20" y2="12" className="transition-all duration-300 group-hover:translate-x-0.5 delay-75" />
    <line x1="4" y1="18" x2="16" y2="18" className="transition-all duration-300 group-hover:translate-x-1.5 delay-150" />
  </svg>
);

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" className="transition-transform duration-300 origin-center group-hover:scale-125" />
    <circle cx="6" cy="12" r="3" className="transition-transform duration-300 origin-center group-hover:scale-125 delay-75" />
    <circle cx="18" cy="19" r="3" className="transition-transform duration-300 origin-center group-hover:scale-125 delay-150" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

// --- Reusable Feature Card Component ---

const FeatureCard = ({ icon: Icon, iconBg, iconColor, title, description, delay }) => {
  return (
    <div 
      className="bg-white border border-[#E5E5E5] rounded-[8px] p-7 md:p-9 flex flex-col group hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 ease-out animate-[fadeUp_0.8s_ease-out_both] cursor-pointer"
      style={{ animationDelay: delay }}
    >
      {/* Icon Container */}
      <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center mb-6 ${iconBg} ${iconColor} transform transition-transform duration-300 group-hover:scale-105 shadow-sm`}>
        <Icon />
      </div>
      
      {/* Text Content */}
      <h3 className="text-[19px] md:text-[21px] font-serif text-[#1A1A1A] mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-[14px] md:text-[15px] text-[#737373] leading-[1.6]">
        {description}
      </p>
    </div>
  );
};

// --- Main Section Component ---

export default function WhySalesTeamsSection() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[70vh] bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Section Header */}
      <div 
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[38px] md:text-[44px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight mb-5">
          Why Sales teams use Loop
        </h2>
        <p className="text-[17px] md:text-[19px] text-[#737373] leading-[1.5] max-w-[480px] mx-auto">
          Looking for an AI note taker for your sales calls<br className="hidden md:block"/>
          with clients? Loop's that, and a lot more too.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Stay present */}
        <FeatureCard 
          icon={HeartIcon}
          iconBg="bg-[#F2F4E6]" 
          iconColor="text-[#A4B54C]" 
          title="Stay present in your calls"
          description="Loop transcribes in the background; you jot important notes, if you want."
          delay="0.1s"
        />

        {/* Card 2: Never miss details */}
        <FeatureCard 
          icon={LinesIcon}
          iconBg="bg-[#EEF3F8]" 
          iconColor="text-[#87A1CD]" 
          title="Never miss key details"
          description="After the meeting, Loop takes your notes and builds them out into a structured summary and action items."
          delay="0.25s"
        />

        {/* Card 3: Seamless CRM */}
        <FeatureCard 
          icon={ShareIcon}
          iconBg="bg-[#F4EFF5]" 
          iconColor="text-[#A382B4]" 
          title="Seamless CRM updates"
          description="Pipe notes directly through to Hubspot, Affinity, Attio or Zapier. No more lost details or manual CRM updates."
          delay="0.4s"
        />

      </div>

      {/* Investor Testimonial Section */}
      <div 
        className={`mt-24 max-w-3xl mx-auto text-center transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: '0.6s' }}
      >
        <h3 className="text-[26px] md:text-[32px] lg:text-[36px] font-serif text-[#333333] leading-[1.35] mb-8 tracking-tight">
          "Loop has become indispensable<br className="hidden md:block"/>
          — feels like I'm living in the future."
        </h3>
        
        <div className="flex items-center justify-center gap-4 group cursor-pointer">
          <img 
            src={SALES_TESTIMONIAL_AVATAR} 
            alt="John Borthwick" 
            className="w-[52px] h-[52px] rounded-[14px] object-cover shadow-sm border border-gray-100 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md" 
          />
          <div className="text-left">
            <p className="text-[16px] md:text-[17px] font-bold text-[#333333] leading-tight mb-0.5">
              John Borthwick
            </p>
            <p className="text-[14px] md:text-[15px] text-[#737373] font-medium">
              Investor, Betaworks
            </p>
          </div>
        </div>
      </div>

      {/* Global Embedded Animations */}
      <style>
        {`
          @keyframes fadeUp {
            from { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            15% { transform: scale(1.15); }
            30% { transform: scale(1); }
            45% { transform: scale(1.15); }
            60% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}