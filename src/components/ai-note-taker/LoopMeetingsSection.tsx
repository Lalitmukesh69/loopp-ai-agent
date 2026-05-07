import React, { useEffect, useState } from 'react';
import { Pen, Maximize, Users } from 'lucide-react';

// --- Reusable Feature Card Component ---
const FeatureCard = ({ icon: Icon, iconBg, iconColor, title, description, delay }) => {
  return (
    <div 
      className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 md:p-8 flex flex-col group hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 ease-out animate-[fadeUp_0.8s_ease-out_both] cursor-pointer"
      style={{ animationDelay: delay }}
    >
      {/* Icon Container with specific pastel backgrounds */}
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 ${iconBg} transform transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
        <Icon size={18} strokeWidth={2.5} className={iconColor} />
      </div>
      
      {/* Text Content */}
      <h3 className="text-[20px] md:text-[22px] font-serif text-[#1A1A1A] mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-[14px] md:text-[15px] text-[#737373] leading-[1.6]">
        {description}
      </p>
    </div>
  );
};

// --- Main Section Component ---
export default function WhyLoopFeelsDifferent() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[70vh] bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Section Header */}
      <div 
        className={`text-center max-w-xl mx-auto mb-14 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[38px] md:text-[44px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight mb-5">
          Why Loop feels different
        </h2>
        <p className="text-[17px] md:text-[19px] text-[#737373] leading-[1.5] max-w-[400px] mx-auto">
          Loop fits into the way you already<br className="hidden md:block"/>
          work. After meetings, you can...
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="w-full max-w-[1050px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Edit in seconds */}
        <FeatureCard 
          icon={Pen}
          iconBg="bg-[#F4F5EE]" // Soft greenish beige
          iconColor="text-[#A2B64F]" // Muted green
          title="Edit in seconds with AI"
          description="Ask for more detail, change the tone, or correct misspelled names."
          delay="0.1s"
        />

        {/* Card 2: Integrate everywhere */}
        <FeatureCard 
          icon={Maximize}
          iconBg="bg-[#F0F4F8]" // Soft bluish grey
          iconColor="text-[#859ECB]" // Muted blue
          title="Integrate everywhere"
          description="You can send notes straight to your CRM, project board, or Slack."
          delay="0.25s"
        />

        {/* Card 3: Work with your team */}
        <FeatureCard 
          icon={Users}
          iconBg="bg-[#F5F2F6]" // Soft purplish grey
          iconColor="text-[#A480B2]" // Muted purple
          title="Work with your team"
          description="Folders, private spaces and powerful search keep things organised."
          delay="0.4s"
        />

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