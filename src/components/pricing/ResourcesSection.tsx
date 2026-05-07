import React, { useEffect, useState } from 'react';

// --- Custom Solid Pastel SVGs (Pixel-Perfect to the image) ---

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-[#A4B54C] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 origin-bottom-left">
    <path d="M17 10H19C20.1046 10 21 10.8954 21 12V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V12C3 10.8954 3.89543 10 5 10H7V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V10ZM12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18ZM9 10H15V7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7V10Z" />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-[#87A1CD] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 origin-bottom-right">
    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM13 3.5L18.5 9H14C13.4477 9 13 8.55228 13 8V3.5Z" />
  </svg>
);

const QuestionIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-[#A382B4] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[15deg] origin-center">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 19C11.1716 19 10.5 18.3284 10.5 17.5C10.5 16.6716 11.1716 16 12 16C12.8284 16 13.5 16.6716 13.5 17.5C13.5 18.3284 12.8284 19 12 19ZM13.46 14C13.46 13.2 14.2 12.6 14.8 12.1C15.5 11.5 16 10.8 16 9.8C16 8.3 14.7 7 12 7C9.6 7 8.2 8.4 8 9.5L9.8 10C9.9 9.3 10.7 8.6 12 8.6C13.2 8.6 14 9.3 14 10.1C14 10.8 13.4 11.3 12.8 11.8C11.9 12.5 11.5 13.2 11.5 14V14.5H13.46V14Z" />
  </svg>
);

// --- Reusable Resource Card Component ---
const ResourceCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <div 
      className="bg-white border border-[#E5E5E5] rounded-[8px] p-6 flex flex-col group cursor-pointer hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-gray-300 hover:-translate-y-1 transition-all duration-400 ease-out animate-[fadeUp_0.8s_ease-out_both]"
      style={{ animationDelay: delay }}
    >
      {/* Animated Icon */}
      <div className="mb-4">
        <Icon />
      </div>
      
      {/* Typography */}
      <h3 className="text-[17px] font-serif font-bold text-[#1A1A1A] mb-1.5 tracking-tight group-hover:text-[#4B5921] transition-colors">
        {title}
      </h3>
      <p className="text-[13px] text-[#737373] leading-relaxed">
        {description}
      </p>
    </div>
  );
};

// --- Main Section Component ---
export default function ResourcesSection() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const resourceCards = [
    {
      title: "Security",
      description: "How we secure your data & privacy",
      icon: LockIcon
    },
    {
      title: "Policies",
      description: "Everything you need to know about our terms",
      icon: DocumentIcon
    },
    {
      title: "Other FAQs",
      description: "All other questions you may have",
      icon: QuestionIcon
    }
  ];

  return (
    <div className="min-h-[50vh] bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center">
      
      {/* Section Header */}
      <div 
        className={`text-center max-w-2xl mx-auto mb-10 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[32px] md:text-[36px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight">
          Resources
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {resourceCards.map((card, index) => (
          <ResourceCard 
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
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