import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

// --- Custom SVGs for Branding and Icons ---
const BrandSwirl = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
    <path d="M12 12c0-1.5-1-2-2-2s-2 .5-2 2 1 3 3 3 4-1 4-4-2-5-5-5-6 2-6 6 3 8 8 8 9-4 9-10" />
  </svg>
);

const WindowsIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/>
  </svg>
);

// --- Pixel-Perfect Interactive Mega Menu Icons ---
const NotepadIcon = () => (
  <div className="w-10 h-10 rounded-[10px] overflow-hidden flex flex-col shadow-sm border border-gray-200/60 group-hover/link:border-[#93A543]/40 group-hover/link:shadow-md transition-all duration-300 group-hover/link:scale-105 bg-white shrink-0">
    <div className="h-3.5 bg-[#93A543]"></div>
    <div className="flex-1 flex flex-col justify-center gap-1.5 px-2">
      <div className="h-[2px] bg-gray-200 rounded-full w-full"></div>
      <div className="h-[2px] bg-gray-200 rounded-full w-[70%]"></div>
    </div>
  </div>
);

const ChatIcon = () => (
  <div className="w-10 h-10 rounded-[10px] bg-[#93A543] p-[6px] shadow-sm flex items-center justify-center transition-all duration-300 group-hover/link:shadow-md group-hover/link:scale-105 shrink-0">
    <div className="w-full h-full bg-white rounded-[4px] flex items-center justify-center relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center">
        <span className="text-[9px] text-gray-500 font-bold tracking-tight">Ask</span>
        <span className="w-[1px] h-2.5 bg-gray-400 ml-[1px] animate-pulse"></span>
      </div>
      {/* Tiny speech bubble tail */}
      <div className="absolute -left-[3px] bottom-1.5 w-1.5 h-1.5 bg-white rotate-45 transform origin-top-left rounded-[1px]"></div>
    </div>
  </div>
);

const PhoneIcon = () => (
  <div className="w-10 h-10 rounded-[10px] bg-[#93A543] flex items-center justify-center shadow-sm transition-all duration-300 group-hover/link:shadow-md group-hover/link:scale-105 shrink-0">
    <BrandSwirl className="w-[18px] h-[18px] text-[#2A2A2A]" />
  </div>
);

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll detection for the Download button color change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* --- Floating Navigation Container --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-[720px] animate-[fadeDown_0.6s_ease-out_both] font-sans">
        
        {/* Nav Pill */}
        <div className="bg-white/95 backdrop-blur-md rounded-full px-2 py-1.5 flex items-center justify-between w-full shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-gray-200 relative z-50">
          
          {/* Logo (Loop) */}
          <Link to="/" className="pl-4 flex items-center gap-1.5 cursor-pointer group">
            <BrandSwirl className="w-[22px] h-[22px] text-[#1A1A1A] group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-bold text-[20px] tracking-tight text-[#1A1A1A]">Loop</span>
          </Link>
          
          {/* Main Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-1 text-[14px] font-medium text-[#404040]">
            
            {/* Features Link with Mega Menu Dropdown */}
            <div className="group/navitem">
              <a href="#" className="px-4 py-2 rounded-full hover:bg-[#F9F8F4] group-hover/navitem:bg-[#F9F8F4] transition-colors flex items-center">
                Features
              </a>
              
              {/* Mega Menu Popover (Centered underneath the entire Navbar dock) */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[640px] opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible transition-all duration-300 ease-out translate-y-2 group-hover/navitem:translate-y-0">
                <div className="bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-gray-200 p-4 flex gap-4 overflow-hidden relative before:content-[''] before:absolute before:inset-0 before:shadow-[inset_0_1px_0_white] before:rounded-[20px] pointer-events-auto">
                  
                  {/* Left Column: Interactive Feature Links */}
                  <div className="flex-1 flex flex-col space-y-1 z-10">
                    
                    <Link to="/home" className="flex items-start gap-4 p-3 rounded-2xl hover:bg-[#F9F9F6] transition-all duration-300 group/link">
                      <NotepadIcon />
                      <div className="pt-0.5">
                        <h4 className="text-[14.5px] font-semibold text-[#1A1A1A] mb-0.5 group-hover/link:text-[#677727] transition-colors">Notepad</h4>
                        <p className="text-[13px] text-[#737373] leading-[1.35]">The AI notepad for people<br/>in back-to-back meetings</p>
                      </div>
                    </Link>

                    <Link to="/chat" className="flex items-start gap-4 p-3 rounded-2xl hover:bg-[#F9F9F6] transition-all duration-300 group/link">
                      <ChatIcon />
                      <div className="pt-0.5">
                        <h4 className="text-[14.5px] font-semibold text-[#1A1A1A] mb-0.5 group-hover/link:text-[#677727] transition-colors">Chat</h4>
                        <p className="text-[13px] text-[#737373] leading-[1.35]">AI chat that already knows<br/>what you're working on</p>
                      </div>
                    </Link>

                    <Link to="/explore" className="flex items-start gap-4 p-3 rounded-2xl hover:bg-[#F9F9F6] transition-all duration-300 group/link">
                      <PhoneIcon />
                      <div className="pt-0.5">
                        <h4 className="text-[14.5px] font-semibold text-[#1A1A1A] mb-0.5 group-hover/link:text-[#677727] transition-colors">Loop for iPhone</h4>
                        <p className="text-[13px] text-[#737373] leading-[1.35]">Meeting notes on the go<br/>and for your phone calls</p>
                      </div>
                    </Link>

                  </div>

                  {/* Right Column: Featured News Card (Interactive) */}
                  <div className="w-[300px] bg-white rounded-2xl p-2 group/card cursor-pointer flex flex-col justify-center transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 border border-transparent hover:border-gray-100 z-10">
                    <div className="w-full h-[150px] bg-[#F2F2EC] rounded-[14px] mb-4 flex flex-col items-center justify-center relative overflow-hidden">
                      
                      {/* Decorative intersecting arcs matching the image */}
                      <div className="absolute inset-0">
                         <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                           <path d="M-10,50 Q50,-20 110,50" stroke="#000" strokeWidth="0.25" fill="none" className="opacity-20"/>
                           <path d="M-10,50 Q50,120 110,50" stroke="#000" strokeWidth="0.25" fill="none" className="opacity-20"/>
                         </svg>
                      </div>
                      
                      <div className="flex items-center gap-1.5 mb-3 relative z-10 transform transition-transform duration-500 group-hover/card:scale-105">
                        <BrandSwirl className="w-6 h-6 text-[#1A1A1A]" />
                        <span className="font-bold text-[24px] tracking-tight text-[#1A1A1A]">Loop</span>
                      </div>
                      
                      <div className="text-[8px] font-bold text-[#666666] tracking-[0.1em] text-center leading-[1.6] relative z-10 px-4 uppercase">
                        Public Beta · Enterprise API<br/>
                        Personal API · MCP · Enterprise Analytics
                      </div>
                    </div>
                    
                    <h4 className="text-[15px] font-serif font-bold text-[#1A1A1A] leading-snug px-2 mb-2">
                      Loop Public Beta is here: Join the future of collaborative AI
                    </h4>
                    
                    <div className="px-2 flex items-center text-[13px] font-medium text-[#737373] group-hover/card:text-[#4B5921] transition-colors">
                      Learn more <ArrowRight size={14} className="ml-1 transform transition-transform duration-300 group-hover/card:translate-x-1.5" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
            {/* Standard Links */}
            <Link to="/pricing" className="px-4 py-2 rounded-full hover:bg-[#F9F8F4] transition-colors">Pricing</Link>
            <Link to="/blog" className="px-4 py-2 rounded-full hover:bg-[#F9F8F4] transition-colors">Blog</Link>
            <a href="#" className="px-4 py-2 rounded-full hover:bg-[#F9F8F4] transition-colors">Careers</a>
          </div>

          {/* Right Side: Interactive Download Button & Mobile Hamburger */}
          <div className="flex items-center gap-1 relative z-50">
            <Link 
              to="/auth"
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-400 ease-out shadow-sm border border-transparent
                ${isScrolled 
                  ? 'bg-[#4B5921] text-white hover:bg-[#3D491A] hover:shadow-md hover:-translate-y-px' 
                  : 'bg-white border-gray-200 text-[#1A1A1A] hover:bg-gray-50'
                }
              `}
            >
              Log in
            </Link>

            {/* Mobile Hamburger Icon */}
            <button 
              className="md:hidden p-2 ml-1 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* --- Mobile Dropdown Menu --- */}
        <div className={`
          absolute top-[calc(100%+8px)] left-0 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-4 flex flex-col gap-2 transition-all duration-300 md:hidden z-40
          ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'}
        `}>
          <div className="flex flex-col text-[15px] font-medium text-[#404040]">
            <Link to="/home" className="px-4 py-3 rounded-xl hover:bg-[#F9F8F4] hover:text-[#1A1A1A] transition-colors">Features</Link>
            <Link to="/pricing" className="px-4 py-3 rounded-xl hover:bg-[#F9F8F4] hover:text-[#1A1A1A] transition-colors">Pricing</Link>
            <Link to="/blog" className="px-4 py-3 rounded-xl hover:bg-[#F9F8F4] hover:text-[#1A1A1A] transition-colors">Blog</Link>
            <a href="#" className="px-4 py-3 rounded-xl hover:bg-[#F9F8F4] hover:text-[#1A1A1A] transition-colors">Careers</a>
          </div>
        </div>

      </nav>

      <style>
        {`
          @keyframes fadeDown {
            from { 
              opacity: 0; 
              transform: translate(-50%, -20px); 
            }
            to { 
              opacity: 1; 
              transform: translate(-50%, 0); 
            }
          }
        `}
      </style>
    </>
  );
}