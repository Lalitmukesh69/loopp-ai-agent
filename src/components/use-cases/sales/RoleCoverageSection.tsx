import React, { useEffect, useState } from 'react';

// --- Custom Pixel-Perfect Checkmark SVG ---
const CustomCheck = () => (
  <div className="min-w-[18px] w-[18px] h-[18px] rounded-full bg-[#EBF0D6] flex items-center justify-center mt-1 transform transition-transform duration-300 group-hover/item:scale-125 group-hover/item:bg-[#E1E8C5]">
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 6.5L4.5 8.5L9.5 3.5" stroke="#84963C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

// --- Reusable Role Card Component ---
const RoleCard = ({ badgeText, badgeBg, badgeTextColor, items, delay }) => {
  return (
    <div 
      className="bg-white border border-[#E5E5E5] rounded-[10px] p-7 md:p-8 flex flex-col group cursor-pointer hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 ease-out animate-[fadeUp_0.8s_ease-out_both]"
      style={{ animationDelay: delay }}
    >
      {/* Role Badge */}
      <div className="mb-10">
        <span 
          className={`inline-block px-3.5 py-1.5 rounded-full text-[13px] font-semibold tracking-tight ${badgeBg} ${badgeTextColor} transition-transform duration-300 group-hover:scale-105 origin-left`}
        >
          {badgeText}
        </span>
      </div>

      {/* Checklist Items */}
      <div className="space-y-5 flex-1">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3 group/item">
            <CustomCheck />
            <p className="text-[14px] md:text-[15px] text-[#404040] leading-[1.6] transition-colors duration-300 group-hover/item:text-[#1A1A1A]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Section Component ---
export default function RoleCoverageSection() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const rolesData = [
    {
      badgeText: "Account Executives",
      badgeBg: "bg-[#E6E1F0]",
      badgeTextColor: "text-[#46395A]",
      items: [
        "Keep your CRM up to date automatically",
        "Send personalised follow up emails minutes after the call"
      ]
    },
    {
      badgeText: "Sales Managers",
      badgeBg: "bg-[#F4D7D1]",
      badgeTextColor: "text-[#552D26]",
      items: [
        "Review calls quickly, to spot coaching moments",
        "Track deal risks before they become lost revenue"
      ]
    },
    {
      badgeText: "Business Development",
      badgeBg: "bg-[#E1EAF4]",
      badgeTextColor: "text-[#2F435C]",
      items: [
        "Focus on your conversations instead of scribbling notes",
        "Easily send call summaries to account managers"
      ]
    }
  ];

  return (
    <div className="min-h-[70vh] bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Section Header */}
      <div 
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[40px] md:text-[46px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight">
          Whatever your role,<br />
          we've got you covered
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {rolesData.map((role, index) => (
          <RoleCard 
            key={index}
            badgeText={role.badgeText}
            badgeBg={role.badgeBg}
            badgeTextColor={role.badgeTextColor}
            items={role.items}
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