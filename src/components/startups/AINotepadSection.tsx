import React, { useEffect, useState } from 'react';

// --- Custom Solid SVG Icons (Pixel-Perfect to the image) ---

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 origin-bottom-left">
    <path d="M13.13 2.13a2.98 2.98 0 0 0-4.26 0l-1.39 1.38c-.37.38-.6.88-.67 1.41L6.2 9.53a3 3 0 0 0 .52 2.25l1.6 2.14-3.5 3.5a1 1 0 0 0 0 1.41l2.83 2.83a1 1 0 0 0 1.41 0l3.5-3.5 2.14 1.6a3 3 0 0 0 2.25.52l4.61-.62c.53-.07 1.03-.3 1.41-.67l1.38-1.39a2.98 2.98 0 0 0 0-4.26l-11.22-11.21zM9.41 12.46a1.5 1.5 0 1 1 2.12-2.12 1.5 1.5 0 0 1-2.12 2.12z" />
    <path d="M5.5 18.5a2.5 2.5 0 0 0-3.53 3.53l.53.53a1 1 0 0 0 1.41-1.41l-.53-.53a.5.5 0 0 1 .71-.71l.53.53a1 1 0 0 0 1.41-1.41l-.53-.53z" opacity="0.5" />
  </svg>
);

const ParagraphIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px] transition-transform duration-300 group-hover:scale-110">
    <rect x="4" y="6" width="16" height="2.5" rx="1" />
    <rect x="4" y="11" width="16" height="2.5" rx="1" />
    <rect x="4" y="16" width="10" height="2.5" rx="1" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// --- Reusable Feature Card Component ---
const FeatureCard = ({ icon: Icon, iconBg, iconColor, title, description, delay }) => {
  return (
    <div 
      className="bg-white border border-[#E5E5E5] rounded-[8px] p-7 md:p-9 flex flex-col group cursor-pointer hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 ease-out animate-[fadeUp_0.8s_ease-out_both]"
      style={{ animationDelay: delay }}
    >
      {/* Icon Container with perfectly matched pastel backgrounds */}
      <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center mb-6 ${iconBg} ${iconColor} transform transition-transform duration-300 shadow-sm`}>
        <Icon />
      </div>
      
      {/* Typography */}
      <h3 className="text-[19px] md:text-[21px] font-serif text-[#1A1A1A] mb-3.5 tracking-tight group-hover:text-[#4B5921] transition-colors">
        {title}
      </h3>
      <p className="text-[14px] md:text-[15px] text-[#737373] leading-[1.65]">
        {description}
      </p>
    </div>
  );
};

// --- Main Section Component ---
export default function BackToBackSection() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const featureCards = [
    {
      title: "Move fast, stay aligned",
      description: "Everyone's wearing multiple hats. Loop keeps your team on the same page without slowing you down.",
      icon: RocketIcon,
      iconBg: "bg-[#F3EEF8]",
      iconColor: "text-[#9D83C6]"
    },
    {
      title: "Never lose context",
      description: "Investor calls, customer discovery, team syncs – capture everything so nothing falls through the cracks.",
      icon: ParagraphIcon,
      iconBg: "bg-[#EBF1F5]",
      iconColor: "text-[#82A0C8]"
    },
    {
      title: "Stay present in every conversation",
      description: "Focus on building relationships and making decisions. Loop handles the notes.",
      icon: HeartIcon,
      iconBg: "bg-[#F3F4E8]",
      iconColor: "text-[#AAB45A]"
    }
  ];

  return (
    <div className="min-h-[70vh] bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center">
      
      {/* Section Header */}
      <div 
        className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[36px] md:text-[44px] lg:text-[48px] font-serif text-[#1A1A1A] leading-[1.15] tracking-tight mb-6 text-balance">
          Loop is the AI notepad<br className="hidden md:block" />
          for people in back-to-back meetings
        </h2>
        <p className="text-[17px] md:text-[19px] text-[#737373] leading-[1.6] max-w-2xl mx-auto text-balance">
          When you're building something from scratch, every<br className="hidden md:block"/>
          conversation counts. Loop makes sure nothing gets lost.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-6">
        {featureCards.map((card, index) => (
          <FeatureCard 
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            iconBg={card.iconBg}
            iconColor={card.iconColor}
            delay={`${(index * 0.15) + 0.2}s`}
          />
        ))}
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
        `}
      </style>
    </div>
  );
}