import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

// --- Custom Reusable UI Elements ---

const CheckCircle = () => (
  <div className="w-8 h-8 rounded-full bg-[#F0F4E3] text-[#697A33] flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-[#e4ecc4] cursor-default shadow-sm">
    <Check size={16} strokeWidth={2.5} />
  </div>
);

const CrossCircle = () => (
  <div className="w-8 h-8 rounded-full bg-[#F5F5F5] text-[#A3A3A3] flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-[#EAEAEA] cursor-default shadow-sm">
    <X size={16} strokeWidth={2.5} />
  </div>
);

const TextStatus = ({ text }) => (
  <div className="text-[15px] font-sans text-[#737373] transform transition-all duration-300 hover:text-[#1A1A1A] cursor-default">
    {text}
  </div>
);

// --- Main Component ---

export default function ComparisonSection() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const comparisonData = [
    {
      label: "Captures meeting notes",
      aiNoteTaker: <CheckCircle />,
      aiNotepad: <CheckCircle />
    },
    {
      label: "Edit and refine notes",
      aiNoteTaker: <CrossCircle />,
      aiNotepad: <CheckCircle />
    },
    {
      label: "Works with your other tools",
      aiNoteTaker: <TextStatus text="Sometimes" />,
      aiNotepad: <CheckCircle />
    },
    {
      label: "You control what's kept",
      aiNoteTaker: <CrossCircle />,
      aiNotepad: <CheckCircle />
    }
  ];

  return (
    <div className="min-h-[80vh] bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 flex flex-col items-center px-6">
      
      {/* Section Title */}
      <h2 
        className={`text-[40px] md:text-[46px] font-serif text-[#1A1A1A] text-center mb-16 tracking-tight transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        AI note-taker vs AI notepad
      </h2>

      {/* Comparison Table Container */}
      <div className="w-full max-w-[900px] mx-auto">
        
        {/* Table Headers */}
        <div 
          className={`grid grid-cols-[2fr_1fr_1fr] md:grid-cols-[2.5fr_1fr_1fr] gap-4 pb-4 border-b border-[#E5E5E5] transition-all duration-700 delay-100 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div>{/* Empty top-left cell */}</div>
          <div className="text-center font-serif text-[18px] md:text-[20px] text-[#1A1A1A]">
            AI note-taker
          </div>
          <div className="text-center font-serif text-[18px] md:text-[20px] text-[#1A1A1A]">
            AI notepad
          </div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col">
          {comparisonData.map((row, index) => (
            <div 
              key={index}
              className={`grid grid-cols-[2fr_1fr_1fr] md:grid-cols-[2.5fr_1fr_1fr] gap-4 items-center py-5 md:py-6 border-b border-[#E5E5E5] group hover:bg-[#FAFAFA] hover:shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 rounded-lg -mx-4 px-4 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(index + 2) * 100}ms, 0ms, 0ms` }} // Delay applies to entrance transform/opacity, but not hover bg
            >
              {/* Row Label */}
              <div className="text-[15px] md:text-[16px] text-[#1A1A1A] font-medium pr-4">
                {row.label}
              </div>
              
              {/* AI Note-taker Column */}
              <div className="flex justify-center items-center">
                {row.aiNoteTaker}
              </div>
              
              {/* AI Notepad Column */}
              <div className="flex justify-center items-center">
                {row.aiNotepad}
              </div>
            </div>
          ))}
        </div>
        
      </div>

    </div>
  );
}