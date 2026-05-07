import React, { useEffect, useState } from 'react';
import { 
  Heart, Zap, Link2, MessageSquare, Lightbulb, UserCheck 
} from 'lucide-react';
import { PRODUCT_TESTIMONIAL_AVATAR } from '@/data/marketingImages';

// --- Custom SVGs with Micro-Animations ---

const EmpathyIcon = () => (
  <svg 
    width="18" height="18" viewBox="0 0 24 24" fill="currentColor" 
    className="transition-transform duration-300 group-hover:animate-[heartbeat_1s_ease-in-out_infinite]"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const InsightsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" className="transition-all duration-300 group-hover:translate-y-[-1px]" />
    <path d="M12 8h.01" className="transition-all duration-300 group-hover:scale-125" />
  </svg>
);

const ConnectionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" className="transition-all duration-300 group-hover:translate-x-1" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" className="transition-all duration-300 group-hover:translate-x-[-1px]" />
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

export default function WhyProductTeamsSection() {
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
          Why Product teams use Loop
        </h2>
        <p className="text-[17px] md:text-[19px] text-[#737373] leading-[1.5] max-w-[480px] mx-auto">
          Looking for an AI note taker for your user research calls?<br className="hidden md:block"/>
          Loop's that, and a lot more too.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Stay present */}
        <FeatureCard 
          icon={EmpathyIcon}
          iconBg="bg-[#F2F4E6]" 
          iconColor="text-[#A4B54C]" 
          title="Stay present in interviews"
          description="Loop transcribes sessions in the background; you focus on the user's non-verbal cues and pain points."
          delay="0.1s"
        />

        {/* Card 2: Synthesize insights */}
        <FeatureCard 
          icon={InsightsIcon}
          iconBg="bg-[#EEF3F8]" 
          iconColor="text-[#87A1CD]" 
          title="Synthesize insights faster"
          description="After the session, Loop automatically identifies feature requests, bugs, and usability friction points."
          delay="0.25s"
        />

        {/* Card 3: Connect to your stack */}
        <FeatureCard 
          icon={ConnectionIcon}
          iconBg="bg-[#F4EFF5]" 
          iconColor="text-[#A382B4]" 
          title="Connect to your roadmap"
          description="Pipe insights directly into Linear, Jira, or Notion. Keep your engineering and design teams aligned with user needs."
          delay="0.4s"
        />

      </div>

      {/* Testimonial Section */}
      <div 
        className={`mt-24 max-w-3xl mx-auto text-center transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: '0.6s' }}
      >
        <h3 className="text-[26px] md:text-[32px] lg:text-[36px] font-serif text-[#333333] leading-[1.35] mb-8 tracking-tight">
          "Loop has transformed how we do user research<br className="hidden md:block"/>
          — I can't imagine building product without it now."
        </h3>
        
        <div className="flex items-center justify-center gap-4 group cursor-pointer">
          <img 
            src={PRODUCT_TESTIMONIAL_AVATAR} 
            alt="Elena Rossi" 
            className="w-[52px] h-[52px] rounded-[14px] object-cover shadow-sm border border-gray-100 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md" 
          />
          <div className="text-left">
            <p className="text-[16px] md:text-[17px] font-bold text-[#333333] leading-tight mb-0.5">
              Elena Rossi
            </p>
            <p className="text-[14px] md:text-[15px] text-[#737373] font-medium">
              Product Lead, Vercel
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
