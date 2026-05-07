import React, { useEffect, useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles, 
  Briefcase, 
  Layers,
  ArrowRight
} from 'lucide-react';

// --- Reusable Interactive Card Component ---
const ExploreCard = ({ title, description, icon: Icon, iconBg, iconColor, delay }) => {
  return (
    <div 
      className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 md:p-7 flex flex-col group cursor-pointer hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-gray-300 hover:-translate-y-1 transition-all duration-400 ease-out animate-[fadeUp_0.8s_ease-out_both] relative overflow-hidden"
      style={{ animationDelay: delay }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[17px] font-serif font-bold text-[#1A1A1A] tracking-tight group-hover:text-[#4B5921] transition-colors pr-6 mt-1">
          {title}
        </h3>
        {/* Colorful Animated Icon Block */}
        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${iconBg} ${iconColor} transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </div>
      
      <p className="text-[14px] text-[#737373] leading-[1.6] flex-1">
        {description}
      </p>

      {/* Subtle interactive arrow indicator that slides in slightly on hover */}
      <div className="mt-5 flex items-center text-[12px] font-semibold text-[#A2B64F] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        Learn more <ArrowRight size={14} className="ml-1" />
      </div>
    </div>
  );
};

// --- Main Section Component ---
export default function ExploreMoreSection() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const learnCards = [
    {
      title: "AI-notepad vs note-taker",
      description: "Understand the difference between Loop's AI notepad and traditional note-taking approaches.",
      icon: BookOpen,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600"
    },
    {
      title: "Security",
      description: "Learn how Loop secures your data and protects your privacy.",
      icon: ShieldCheck,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      title: "Help Center",
      description: "Find answers to common questions and learn how to use Loop.",
      icon: HelpCircle,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600"
    },
    {
      title: "Updates",
      description: "Stay up to date with the latest features and improvements to Loop.",
      icon: Sparkles,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  const rolesCards = [
    {
      title: "The AI notepad for Sales teams",
      description: "Capture and use every customer conversation. Loop is an AI notepad for Sales teams – from call notes to CRM updates, all in one place.",
      icon: Briefcase,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600"
    },
    {
      title: "The AI notepad for Product teams",
      description: "Turn every customer conversation into product insights. Loop is an AI notepad for Product teams – from user research to feature requests, all in one place.",
      icon: Layers,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600"
    }
  ];

  return (
    // Increased top spacing (pt-40)
    <div className="min-h-[80vh] bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black pt-40 pb-24 px-6 flex flex-col items-center">
      
      {/* Section Header */}
      <div 
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[44px] md:text-[52px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight mb-4">
          Explore More
        </h2>
        <p className="text-[17px] md:text-[19px] text-[#737373] leading-[1.5]">
          Learn about all that Loop has to offer.
        </p>
      </div>

      <div className="w-full max-w-[1000px] mx-auto flex flex-col">
        
        {/* --- ROW 1: Learn --- */}
        <div className="border-t border-[#E5E5E5] pt-10 pb-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
          
          {/* Category Label */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className={`text-[20px] md:text-[22px] font-serif text-[#1A1A1A] tracking-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              Learn
            </h3>
          </div>
          
          {/* Cards Grid */}
          <div className="md:col-span-9 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {learnCards.map((card, index) => (
              <ExploreCard 
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                iconBg={card.iconBg}
                iconColor={card.iconColor}
                delay={`${(index * 0.1) + 0.2}s`}
              />
            ))}
          </div>

        </div>

        {/* --- ROW 2: Loop For --- */}
        <div className="border-t border-[#E5E5E5] pt-10 pb-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
          
          {/* Category Label */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className={`text-[20px] md:text-[22px] font-serif text-[#1A1A1A] tracking-tight transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              Loop For
            </h3>
          </div>
          
          {/* Cards Grid */}
          <div className="md:col-span-9 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {rolesCards.map((card, index) => (
              <ExploreCard 
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                iconBg={card.iconBg}
                iconColor={card.iconColor}
                delay={`${(index * 0.1) + 0.5}s`}
              />
            ))}
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
        `}
      </style>
    </div>
  );
}