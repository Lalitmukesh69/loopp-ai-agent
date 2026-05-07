import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// --- Individual FAQ Accordion Item ---
const FAQItem = ({ question, answer, isOpen, onClick, delay }) => {
  return (
    <div 
      className="border-b border-[#E5E5E5] first:border-t animate-[fadeUp_0.8s_ease-out_both]"
      style={{ animationDelay: delay }}
    >
      <button 
        className="w-full flex items-center justify-between py-5 md:py-6 text-left cursor-pointer group outline-none"
        onClick={onClick}
      >
        <h3 className="text-[18px] md:text-[20px] font-serif text-[#1A1A1A] group-hover:text-[#546522] transition-colors duration-300 pr-6">
          {question}
        </h3>
        <div 
          className={`shrink-0 text-[#737373] transition-transform duration-400 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <ChevronDown size={20} strokeWidth={1.5} />
        </div>
      </button>

      {/* Smooth Accordion Expansion 
        Using grid-template-rows trick for smooth height animation without fixed heights
      */}
      <div 
        className={`grid transition-all duration-400 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-[16px] text-[#737373] leading-[1.6] font-sans pr-10">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main FAQ Section ---
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Content based on the screenshot, with logical placeholder answers
  const faqs = [
    {
      question: "What's the best AI note-taker?",
      answer: "While there are many AI note-takers on the market, the best one depends on your workflow. Loop is uniquely designed as an AI notepad—giving you the perfect balance of automated transcription and the freedom to jot down your own thoughts."
    },
    {
      question: "Can AI take meeting notes for me?",
      answer: "Yes. Loop captures everything said in your meeting and intelligently transcribes it. It then uses that context, along with any notes you manually typed, to generate a highly accurate, polished summary."
    },
    {
      question: "How is an AI notepad different from an AI note-taker?",
      answer: "A standard AI note-taker acts like a passive bot that joins your calls and hands you a rigid summary at the end. An AI notepad works alongside you—it gives you a blank canvas to type your own thoughts during the meeting, and uses those thoughts to guide the final AI summary."
    },
    {
      question: "Is Loop an AI note-taker?",
      answer: "Loop is an AI notepad. It encompasses all the benefits of an AI note-taker (like transcription and summarization) but adds a layer of manual control, allowing you to edit, refine, and structure your notes exactly how you want them."
    }
  ];

  return (
    <div className="min-h-[70vh] bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center justify-center">
      
      {/* Section Header */}
      <div 
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[36px] md:text-[44px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight">
          Frequently asked questions
        </h2>
      </div>

      {/* Accordion List */}
      <div className="w-full max-w-[720px] mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
            // Stagger the entrance animation based on the index
            delay={`${(index * 0.1) + 0.2}s`}
          />
        ))}
      </div>

      {/* Embedded Animations */}
      <style>
        {`
          @keyframes fadeUp {
            from { 
              opacity: 0; 
              transform: translateY(20px); 
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