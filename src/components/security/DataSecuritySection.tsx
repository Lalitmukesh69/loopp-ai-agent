import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, Lock, Cloud, ShieldAlert, Search, 
  Award, Bug, Laptop, Cpu, Server, KeyRound 
} from 'lucide-react';

// --- Individual Interactive Accordion Item ---
const FAQItem = ({ question, answer, icon: Icon, isOpen, onClick, delay }) => {
  return (
    <div 
      className="border-b border-[#E5E5E5] first:border-t animate-[fadeUp_0.8s_ease-out_both]"
      style={{ animationDelay: delay }}
    >
      <button 
        className="w-full flex items-center justify-between py-5 md:py-6 text-left cursor-pointer group outline-none"
        onClick={onClick}
      >
        <div className="flex items-center gap-4 pr-6">
          {/* Added Icon with Hover Micro-Animations */}
          <div className="text-[#A3A3A3] group-hover:text-[#A2B64F] transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-3">
            <Icon size={20} strokeWidth={2} />
          </div>
          <h3 className="text-[16px] md:text-[18px] font-serif font-semibold text-[#1A1A1A] group-hover:text-[#546522] transition-colors duration-300">
            {question}
          </h3>
        </div>
        
        {/* Chevron Icon */}
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
          <div className="pb-6 pl-9 text-[15px] text-[#666666] leading-[1.65] font-sans pr-10">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Section Component ---
export default function DataSecuritySection() {
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

  // Data perfectly mapped to the image, replacing Loop -> Loop
  const faqs = [
    {
      question: "How does Loop secure customer data?",
      answer: "Loop employs industry-standard encryption at rest and in transit. Our infrastructure is hosted within secure Virtual Private Clouds (VPCs) on AWS, ensuring strict access controls and continuous monitoring to protect your meeting data.",
      icon: Lock
    },
    {
      question: "Does Loop work locally or send data to the cloud?",
      answer: "Loop securely processes audio in the cloud to leverage the most advanced transcription and summarization models available. We do not store the audio after processing; only the encrypted transcripts and notes remain.",
      icon: Cloud
    },
    {
      question: "How does Loop manage security vulnerabilities?",
      answer: "We maintain a rigorous vulnerability management program, including automated scanning, dependency tracking, and regular code reviews to identify and remediate potential security risks swiftly.",
      icon: ShieldAlert
    },
    {
      question: "Does Loop conduct penetration testing?",
      answer: "Yes. Loop undergoes regular, comprehensive penetration testing performed by independent, top-tier third-party security firms to validate our security posture.",
      icon: Search
    },
    {
      question: "Does Loop have any security certifications?",
      answer: "Yes, Loop has achieved SOC 2 Type II compliance, demonstrating our commitment to maintaining stringent security and privacy protocols validated by independent auditors.",
      icon: Award
    },
    {
      question: "How can I report security vulnerabilities to Loop?",
      answer: "We actively encourage security vulnerability reports. Please refer to our public Vulnerability Disclosure Policy for safe reporting guidelines and procedures.",
      icon: Bug
    },
    {
      question: "Does Loop implement endpoint security?",
      answer: "Absolutely. All employee devices are secured with Mobile Device Management (MDM), endpoint detection and response (EDR) software, and strict access policies.",
      icon: Laptop
    },
    {
      question: "Can I bring my own models?",
      answer: "Currently, Loop integrates with best-in-class models (like OpenAI and Anthropic) to ensure optimal performance. Custom model integration is available on select Enterprise plans.",
      icon: Cpu
    },
    {
      question: "Can I use a version of Loop in a private cloud?",
      answer: "Yes, dedicated single-tenant or private cloud deployments are available for our Enterprise customers with strict compliance requirements.",
      icon: Server
    },
    {
      question: "Do you support SSO/SAML?",
      answer: "Yes. Single Sign-On (SSO) via SAML and OIDC integrations (such as Okta, Google Workspace, and Azure AD) is fully supported on our Enterprise plans.",
      icon: KeyRound
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center justify-center">
      
      {/* Section Header */}
      <div 
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[40px] md:text-[46px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight">
          Data Security
        </h2>
      </div>

      {/* Accordion List Container */}
      <div className="w-full max-w-[800px] mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            icon={faq.icon}
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