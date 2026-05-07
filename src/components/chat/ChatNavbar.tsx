import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatNavbar({ scrolled }: { scrolled: boolean }) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFeaturesEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setMegaMenuOpen(true);
  };
  const handleFeaturesLeave = () => {
    megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 250);
  };
  const handleMenuEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
  };
  const handleMenuLeave = () => {
    megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 250);
  };

  return (
    <>
      {/* TopNavBar */}
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          className="pointer-events-auto relative flex items-center gap-1 bg-white/90 backdrop-blur-md border border-[#e8e8e6] rounded-full px-3 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          animate={{
            boxShadow: scrolled
              ? '0 4px 24px rgba(0,0,0,0.10)'
              : '0 2px 12px rgba(0,0,0,0.06)',
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-1.5 mr-3 pl-1 shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1c1b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2A10 10 0 1 0 22 12"/>
              <path d="M12 6A6 6 0 1 0 18 12"/>
              <circle cx="12" cy="12" r="2" fill="#1a1c1b"/>
            </svg>
            <span className="text-[17px] font-bold tracking-tight text-[#1a1c1b]">loop</span>
          </a>

          {/* Nav Links */}
          <div className="flex items-center gap-0.5">
            {/* Features — hover trigger */}
            <div
              className="relative"
              onMouseEnter={handleFeaturesEnter}
              onMouseLeave={handleFeaturesLeave}
            >
              <button
                className={`text-[15px] font-medium transition-all duration-200 cursor-pointer select-none inline-block px-3.5 py-1 rounded-full ${
                  megaMenuOpen ? 'text-[#1a1c1b] bg-[#f3f3f1]' : 'text-[#1a1c1b]/60 hover:text-[#1a1c1b] bg-transparent'
                }`}
              >
                Features
              </button>
            </div>
            <a className="text-[15px] font-medium text-[#1a1c1b]/60 hover:text-[#1a1c1b] transition-colors px-3.5 py-1 rounded-full hover:bg-[#f3f3f1]" href="/pricing">Pricing</a>
            <a className="text-[15px] font-medium text-[#1a1c1b]/60 hover:text-[#1a1c1b] transition-colors px-3.5 py-1 rounded-full hover:bg-[#f3f3f1]" href="/blog">Blog</a>
            <a className="text-[15px] font-medium text-[#1a1c1b]/60 hover:text-[#1a1c1b] transition-colors px-3.5 py-1 rounded-full hover:bg-[#f3f3f1]" href="#">Careers</a>
          </div>

          {/* CTA */}
          <motion.button
            onClick={() => window.location.href = '/auth'}
            animate={{
              backgroundColor: scrolled ? '#4b6319' : '#ffffff',
              color: scrolled ? '#ffffff' : '#1a1c1b',
              borderColor: scrolled ? '#4b6319' : '#e5e5e5',
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="ml-2 border px-4 py-2 rounded-full font-medium text-[15px] flex items-center gap-2.5 shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:opacity-90 active:scale-[0.97] transition-[opacity,transform]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/>
            </svg>
            Get Started for Free
          </motion.button>

          {/* Mega Menu Dropdown — anchored to nav, full-width */}
          <AnimatePresence>
            {megaMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-2xl border border-[#e8e8e6] shadow-[0_16px_48px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.03)] z-50 overflow-hidden"
                onMouseEnter={handleMenuEnter}
                onMouseLeave={handleMenuLeave}
              >
                <div className="flex">
                  {/* Left Column: Feature Items */}
                  <div className="flex-1 py-4 px-3">
                    {/* Notepad */}
                    <motion.a
                      href="#"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex items-start gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 hover:bg-[#f7f7f5]"
                    >
                      <div className="w-[46px] h-[38px] rounded-lg bg-[#f0efe8] flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105 overflow-hidden">
                        <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
                          <rect x="1" y="1" width="28" height="20" rx="3" fill="#e8e5d0" />
                          <rect x="1" y="1" width="28" height="7" rx="3" fill="#c8c88c" />
                          <line x1="5" y1="12" x2="20" y2="12" stroke="#a0a060" strokeWidth="1.2" strokeLinecap="round"/>
                          <line x1="5" y1="15" x2="16" y2="15" stroke="#a0a060" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                        </svg>
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <div className="text-[15px] font-semibold text-[#1a1c1b] mb-0.5 group-hover:text-[#4b6319] transition-colors leading-none">Notepad</div>
                        <div className="text-[13.5px] text-[#6d6d6d] leading-[1.35] font-normal">The AI notepad for people<br/>in back-to-back meetings</div>
                      </div>
                    </motion.a>

                    {/* Chat */}
                    <motion.a
                      href="#"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex items-start gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 hover:bg-[#f7f7f5]"
                    >
                      <div className="w-[46px] h-[38px] rounded-lg bg-[#f0efe8] flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105 overflow-hidden">
                        <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
                          <rect x="2" y="2" width="22" height="14" rx="4" fill="#e8e5d8" stroke="#c5c0a8" strokeWidth="0.7"/>
                          <path d="M8 16 L12 16 L9 21 Z" fill="#e8e5d8" stroke="#c5c0a8" strokeWidth="0.7" strokeLinejoin="round"/>
                          <rect x="6" y="8" width="14" height="6" rx="2" fill="#d8d4c0" opacity="0.5"/>
                          <text x="8" y="13" fontSize="7" fontWeight="600" fill="#8a8470" fontFamily="system-ui, sans-serif">Ask</text>
                        </svg>
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <div className="text-[15px] font-semibold text-[#1a1c1b] mb-0.5 group-hover:text-[#4b6319] transition-colors leading-none">Chat</div>
                        <div className="text-[13.5px] text-[#6d6d6d] leading-[1.35] font-normal">AI chat that already knows<br/>what you're working on</div>
                      </div>
                    </motion.a>

                    {/* Loop for iPhone */}
                    <motion.a
                      href="#"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.09, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex items-start gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 hover:bg-[#f7f7f5]"
                    >
                      <div className="w-[46px] h-[38px] rounded-lg bg-[#eef3e0] flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105 overflow-hidden">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3d5014" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2A10 10 0 1 0 22 12"/>
                          <path d="M12 6A6 6 0 1 0 18 12"/>
                          <circle cx="12" cy="12" r="2" fill="#3d5014"/>
                        </svg>
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <div className="text-[15px] font-semibold text-[#1a1c1b] mb-0.5 group-hover:text-[#4b6319] transition-colors leading-none">Loop for iPhone</div>
                        <div className="text-[13.5px] text-[#6d6d6d] leading-[1.35] font-normal">Meeting notes on the go<br/>and for your phone calls</div>
                      </div>
                    </motion.a>
                  </div>

                  {/* Right Column: Promo Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="w-[280px] p-4 pl-1"
                  >
                    <a href="#" className="group block h-full bg-[#f5f5f0] rounded-xl border border-[#ebeae6] p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-[#d8d8d2] hover:-translate-y-0.5 cursor-pointer">
                      <div>
                        {/* Logo */}
                        <div className="flex items-center gap-2 mb-3.5">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1c1b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2A10 10 0 1 0 22 12"/>
                            <path d="M12 6A6 6 0 1 0 18 12"/>
                            <circle cx="12" cy="12" r="2" fill="#1a1c1b"/>
                          </svg>
                          <span className="text-[19px] font-bold tracking-tight text-[#1a1c1b]">loop</span>
                        </div>

                        {/* Tags */}
                        <div className="text-[7.5px] text-[#8a8a8a] font-semibold tracking-[0.08em] uppercase leading-[1.6] mb-4">
                          PUBLIC BETA · ENTERPRISE API<br/>
                          PERSONAL API · MCP · ENTERPRISE<br/>ANALYTICS
                        </div>
                      </div>

                      {/* Headline */}
                      <div>
                        <p className="text-[13.5px] font-semibold text-[#1a1c1b] leading-[1.35] mb-1.5">
                          Loop Public Beta is here: Join the future of collaborative AI
                        </p>
                        <span className="text-[13px] text-[#1a1c1b]/70 font-medium inline-flex items-center gap-1 group-hover:text-[#4b6319] transition-colors">
                          Learn more
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </span>
                      </div>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}
