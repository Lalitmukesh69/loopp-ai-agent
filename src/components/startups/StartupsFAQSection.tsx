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

// --- Startups FAQ Section ---
export default function StartupsFAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the Loop Startup Program?",
      answer: "The Loop Startup Program gives qualifying early-stage companies one free year of Loop Business. You get full access to AI-powered meeting notes, team collaboration, and all Business-tier features — no credit card required."
    },
    {
      question: "Who is eligible to apply?",
      answer: "The program is open to startups with fewer than 30 employees that have raised a pre-seed or seed round from a recognized investor or accelerator. Your company must not have previously paid for Loop or redeemed a Loop coupon."
    },
    {
      question: "How long does the application take?",
      answer: "The application itself takes about 2 minutes. Our team typically reviews applications within 3–5 business days. You'll receive an email with your approval status and instructions to activate your free year."
    },
    {
      question: "What happens after the free year ends?",
      answer: "When your free year is over, you can continue on the Loop Business plan at the standard rate or switch to our free tier. Your data and notes are always yours — nothing gets deleted."
    },
    {
      question: "Can my whole team use Loop during the free year?",
      answer: "Yes. The Loop Business plan covers your entire team. Every member gets their own AI notepad, access to shared meeting notes, and all collaboration features included in the Business tier."
    },
    {
      question: "Do you offer any other discounts for startups?",
      answer: "The Startup Program is our primary offering for early-stage companies. If your team doesn't meet the eligibility criteria, reach out to us at startups@loop.ai — we're happy to explore options that work for you."
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
