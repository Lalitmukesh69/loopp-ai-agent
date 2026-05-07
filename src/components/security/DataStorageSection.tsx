import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// --- Individual Interactive Accordion Item ---
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
        <h3 className="text-[16px] md:text-[18px] font-serif font-semibold text-[#1A1A1A] group-hover:text-[#546522] transition-colors duration-300 pr-6">
          {question}
        </h3>
        
        {/* Chevron Icon with smooth rotation */}
        <div 
          className={`shrink-0 text-[#A3A3A3] group-hover:text-[#1A1A1A] transition-transform duration-400 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </div>
      </button>

      {/* Smooth Accordion Expansion using grid-template-rows */}
      <div 
        className={`grid transition-all duration-400 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 text-[15px] text-[#666666] leading-[1.65] font-sans pr-10">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Section Component ---
export default function DataStorageSection() {
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

  // Data perfectly mapped to the image, replacing Loop -> Loop for brand consistency
  const faqs = [
    {
      question: "What happens to my data if I delete my account?",
      answer: "When you delete your account, all your personal data, meeting transcripts, and notes are permanently deleted from our active servers within 30 days, in accordance with our strict data retention policy."
    },
    {
      question: "Can I request a copy of all my data?",
      answer: "Yes. You can request a full export of your data at any time from your account settings. We provide your data in standard, readable formats like JSON or Markdown so you can take it anywhere."
    },
    {
      question: "Does Loop have a data backup policy?",
      answer: "Yes. We perform automated daily backups of all databases. These backups are encrypted and stored securely in a separate, isolated environment, and are retained for 30 days before being securely destroyed."
    },
    {
      question: "What are your data retention policies?",
      answer: "We retain your data only for as long as your account is active. Enterprise customers have the additional ability to configure custom auto-deletion periods (e.g., 30, 60, or 90 days) for all meeting data across their organization."
    },
    {
      question: "How does Loop use data from my Google account?",
      answer: "Loop only requests the minimum necessary permissions from your Google account to sync your calendar events. We do not read your emails, and we never use your calendar data for any purpose other than facilitating your meeting notes."
    }
  ];

  return (
    <div className="min-h-[70vh] bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center justify-center">
      
      {/* Section Header */}
      <div 
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[36px] md:text-[42px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight">
          Data Storage & Processing
        </h2>
      </div>

      {/* Accordion List Container */}
      <div className="w-full max-w-[800px] mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
            delay={`${(index * 0.08) + 0.1}s`} // Staggered entrance animation
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