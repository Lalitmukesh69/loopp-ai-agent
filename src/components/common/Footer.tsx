import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

// --- Custom SVGs for Brand & Socials ---

const LoopSwirlLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
    {/* A continuous abstract spiral path to match the logo style */}
    <path d="M12 12c0-1.5-1-2-2-2s-2 .5-2 2 1 3 3 3 4-1 4-4-2-5-5-5-6 2-6 6 3 8 8 8 9-4 9-10" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// --- Reusable Footer Link Component ---
const FooterLink = ({ text, to = "#" }) => (
  <li>
    <Link 
      to={to} 
      className="text-[14.5px] text-[#404040] hover:text-[#1A1A1A] font-medium transition-all duration-300 inline-block transform hover:translate-x-1.5"
    >
      {text}
    </Link>
  </li>
);

// --- Main Footer Component ---
export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="relative bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black pt-24 pb-12 overflow-hidden border-t border-[#E5E5E5]">
      
      {/* --- Giant Background Watermark (Updated to LOOP) --- */}
      <div className="absolute bottom-[-12%] left-1/2 -translate-x-1/2 w-full flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
        <div className="flex items-center text-[#F2F1EA] font-sans font-bold tracking-tighter leading-none" style={{ fontSize: '26vw' }}>
          <LoopSwirlLogo className="w-[18vw] h-[18vw] text-[#F2F1EA] mr-[-1.5vw]" />
          loop
        </div>
      </div>

      {/* --- Foreground Content --- */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Top Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 mb-20">
          
          {/* Logo Column */}
          <div className={`md:col-span-3 lg:col-span-4 animate-[fadeUp_0.8s_ease-out_both]`} style={{ animationDelay: '0.1s' }}>
            <div className="w-9 h-9 transform transition-transform duration-500 hover:rotate-180 hover:scale-110 cursor-pointer">
              <LoopSwirlLogo className="w-full h-full text-[#1A1A1A]" />
            </div>
          </div>

          {/* Links Columns Grid */}
          <div className="md:col-span-9 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            
            {/* Features */}
            <div className={`animate-[fadeUp_0.8s_ease-out_both]`} style={{ animationDelay: '0.2s' }}>
              <h4 className="text-[14px] font-medium text-[#808080] mb-6 tracking-wide">
                Features
              </h4>
              <ul className="space-y-4">
                <FooterLink text="Notepad" to="/home" />
                <FooterLink text="Chat" to="/chat" />
                <FooterLink text="Mobile" to="#" />
              </ul>
            </div>

            {/* Product */}
            <div className={`animate-[fadeUp_0.8s_ease-out_both]`} style={{ animationDelay: '0.3s' }}>
              <h4 className="text-[14px] font-medium text-[#808080] mb-6 tracking-wide">
                Product
              </h4>
              <ul className="space-y-4">
                <FooterLink text="Pricing" to="/pricing" />
                <FooterLink text="Enterprise" to="/enterprise" />
                <FooterLink text="AI-notepad vs note-taker" to="/ai-note-taker" />
                <FooterLink text="For sales" to="/use-cases/sales" />
                <FooterLink text="For product management" to="/use-cases/product" />
                <FooterLink text="Explore more..." to="/explore" />
              </ul>
            </div>

            {/* Company */}
            <div className={`animate-[fadeUp_0.8s_ease-out_both]`} style={{ animationDelay: '0.4s' }}>
              <h4 className="text-[14px] font-medium text-[#808080] mb-6 tracking-wide">
                Company
              </h4>
              <ul className="space-y-4">
                <FooterLink text="Careers" />
                <FooterLink text="Press" />
                <FooterLink text="Startup program" to="/startups" />
              </ul>
            </div>

            {/* Resources */}
            <div className={`animate-[fadeUp_0.8s_ease-out_both]`} style={{ animationDelay: '0.5s' }}>
              <h4 className="text-[14px] font-medium text-[#808080] mb-6 tracking-wide">
                Resources
              </h4>
              <ul className="space-y-4">
                <FooterLink text="Blog" to="/blog" />
                <FooterLink text="Security" to="/security" />
                <FooterLink text="Help Center" to="#" />
                <FooterLink text="Status" to="#" />

                <FooterLink text="Contact us" to="/contact" />
                <FooterLink text="Terms" to="/terms" />
                <FooterLink text="Privacy" to="/privacy" />

              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar Area - Perfectly aligned to the columns above */}
        <div 
          className={`border-t border-[#E5E5E5] pt-8 grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 animate-[fadeUp_0.8s_ease-out_both]`} 
          style={{ animationDelay: '0.6s' }}
        >
          {/* Spacer to push content to match above grid */}
          <div className="hidden md:block md:col-span-3 lg:col-span-4"></div>
          
          <div className="md:col-span-9 lg:col-span-8 grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4">
            
            {/* Social Icons (Aligned with Features) */}
            <div className="flex items-center gap-5">
              <a href="#" className="text-[#808080] hover:text-[#1A1A1A] transition-all duration-300 transform hover:scale-125 hover:-translate-y-1">
                <LinkedinIcon />
              </a>
              <a href="#" className="text-[#808080] hover:text-[#1A1A1A] transition-all duration-300 transform hover:scale-125 hover:-translate-y-1">
                <XIcon />
              </a>
              <a href="#" className="text-[#808080] hover:text-[#1A1A1A] transition-all duration-300 transform hover:scale-125 hover:-translate-y-1">
                <YoutubeIcon />
              </a>
            </div>

            {/* Empty space matching Product column */}
            <div className="hidden md:block"></div>

            {/* Copyright (Aligned with Company) */}
            <div className="flex items-center text-[13px] text-[#666666] font-medium tracking-wide">
              © LOOP, Inc. 2026
            </div>

            {/* Made with Love (Aligned with Resources, Updated Location) */}
            <div className="flex items-center text-[13px] text-[#666666] font-medium group cursor-default">
              Made with 
              <Heart size={14} className="mx-1.5 text-[#666666] fill-[#666666] transition-colors duration-300 group-hover:text-red-500 group-hover:fill-red-500 animate-[heartbeat_2s_ease-in-out_infinite]" /> 
              in Bareilly
            </div>

          </div>
        </div>
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
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            15% { transform: scale(1.25); }
            30% { transform: scale(1); }
            45% { transform: scale(1.25); }
            60% { transform: scale(1); }
          }
        `}
      </style>
    </footer>
  );
}