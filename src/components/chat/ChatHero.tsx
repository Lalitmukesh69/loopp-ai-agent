import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Sparkles, MessageSquare, BrainCircuit, Zap, FileText, Users } from 'lucide-react';

// --- Floating Conversation Bubbles (ambient background elements) ---
const floatingBubbles = [
  { text: "What were the key decisions?", x: '8%', y: '22%', delay: 0, size: 'md', icon: MessageSquare },
  { text: "Summarize the standup", x: '72%', y: '18%', delay: 0.3, size: 'sm', icon: FileText },
  { text: "Draft a follow-up email", x: '82%', y: '55%', delay: 0.6, size: 'md', icon: Zap },
  { text: "Who owns the Q2 roadmap?", x: '5%', y: '62%', delay: 0.9, size: 'sm', icon: Users },
  { text: "What did Sarah say about pricing?", x: '65%', y: '72%', delay: 1.2, size: 'lg', icon: BrainCircuit },
  { text: "Prep me for the next call", x: '18%', y: '82%', delay: 0.4, size: 'sm', icon: Sparkles },
  { text: "Pull action items from today", x: '48%', y: '88%', delay: 0.7, size: 'md', icon: FileText },
  { text: "Compare Q1 vs Q2 metrics", x: '88%', y: '35%', delay: 1.0, size: 'sm', icon: BrainCircuit },
];

const FloatingBubble = ({ text, x, y, delay, size, icon: Icon }: {
  text: string; x: string; y: string; delay: number; size: string; icon: React.ElementType;
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2.5 text-[12px]',
    md: 'px-5 py-3 text-[13px]',
    lg: 'px-6 py-3.5 text-[14px]',
  };

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} bg-white/[0.55] backdrop-blur-md border border-white/40 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-[#3a3a38] font-medium flex items-center gap-2.5 pointer-events-none select-none whitespace-nowrap`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={{
        opacity: [0, 0.7, 0.5, 0.7],
        y: [30, 0, -8, 0],
        scale: [0.85, 1, 1.02, 1],
      }}
      transition={{
        delay: delay + 0.8,
        duration: 6,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      <Icon size={size === 'sm' ? 13 : size === 'md' ? 15 : 17} className="text-[#6b8a2e] opacity-70 shrink-0" />
      {text}
    </motion.div>
  );
};

// --- Typing words that rotate in the input bar ---
const rotatingPrompts = [
  "What just got discussed?",
  "Summarize today's standup",
  "Draft a follow-up email",
  "Who owns the next steps?",
  "What did the client say about pricing?",
  "Prep me for my 2pm meeting",
];

const TypingPrompt = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPrompt = rotatingPrompts[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentPrompt.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPrompt.slice(0, displayText.length + 1));
        }, 45 + Math.random() * 35);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2800);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 25);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % rotatingPrompts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <span className="loop-serif text-[#1a1c1b] tracking-tight">
      {displayText}
      <span className="inline-block w-[2px] h-[1.15em] bg-[#6b8a2e] ml-0.5 align-middle animate-pulse" />
    </span>
  );
};

// --- Radial gradient orbs ---
const GlowOrb = ({ color, size, x, y, blur, delay }: { color: string; size: string; x: string; y: string; blur: string; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      background: color,
      width: size,
      height: size,
      left: x,
      top: y,
      filter: `blur(${blur})`,
    }}
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: [0, 0.35, 0.2, 0.35], scale: [0.6, 1, 1.1, 1] }}
    transition={{ delay, duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
  />
);

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-[#fbfcfa] font-sans selection:bg-[#c8d97a] selection:text-[#1a1c1b] relative overflow-hidden flex flex-col">

      {/* --- Grain texture overlay --- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* --- Ambient glow orbs --- */}
      <GlowOrb color="radial-gradient(circle, rgba(182,205,90,0.18) 0%, transparent 70%)" size="600px" x="-5%" y="-10%" blur="80px" delay={0} />
      <GlowOrb color="radial-gradient(circle, rgba(107,138,46,0.1) 0%, transparent 70%)" size="500px" x="65%" y="50%" blur="100px" delay={1.5} />
      <GlowOrb color="radial-gradient(circle, rgba(239,176,46,0.08) 0%, transparent 70%)" size="400px" x="30%" y="70%" blur="90px" delay={3} />

      {/* --- Floating bubbles (behind content) --- */}
      <div className="absolute inset-0 z-[2]">
        {floatingBubbles.map((bubble, i) => (
          <FloatingBubble key={i} {...bubble} />
        ))}
      </div>

      {/* --- Subtle dot grid pattern --- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #1a1c1b 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* --- Main Hero Content --- */}
      <div className="relative z-10 pt-[140px] md:pt-[160px] pb-6 px-6 text-center flex flex-col items-center">

        {/* Badge pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-[#eef3e0] text-[#4b6319] px-4 py-2 rounded-full text-[12px] font-bold tracking-wide border border-[#4b6319]/10 shadow-[0_1px_4px_rgba(75,99,25,0.06)]">
            <Sparkles size={13} className="text-[#6b8a2e]" />
            AI Chat — Now with full meeting context
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="loop-serif text-[48px] md:text-[72px] lg:text-[82px] text-[#1a1c1b] leading-[1.04] font-medium tracking-[-0.025em] max-w-4xl mb-7"
        >
          AI chat that<br />
          <span className="relative inline-block">
            understands
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#b5cb4e] via-[#8aad2a] to-[#6b8a2e] rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>{' '}
          your work
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-[17px] md:text-[19px] text-[#6d6d6d] max-w-[540px] leading-[1.55] mb-12 font-normal"
        >
          Loop Chat combines your meetings, notes, and work context
          with the world's best AI models — so you're always ready.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <button
            onClick={() => window.location.href = '/auth'}
            className="group bg-[#4b6319] hover:bg-[#3d5014] text-white px-8 py-4 rounded-full text-[15px] font-bold transition-all duration-300 flex items-center gap-2.5 shadow-[0_4px_20px_rgba(75,99,25,0.25)] hover:shadow-[0_8px_32px_rgba(75,99,25,0.35)] hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/>
            </svg>
            Try Loop
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </motion.div>

      </div>

      {/* --- Glassmorphic Chat Input Bar (Centerpiece) --- */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 mx-auto w-[92%] max-w-[740px] mb-8"
      >
        <div className="bg-white/80 backdrop-blur-2xl rounded-[28px] py-5 px-6 md:px-8 flex items-center justify-between shadow-[0_8px_48px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] border border-[#e8e8e6]/80 transition-all duration-300 hover:shadow-[0_12px_56px_rgba(0,0,0,0.12)] hover:border-[#d8d8d2] cursor-text group">
          <div className="text-[20px] md:text-[26px] lg:text-[30px] flex items-center min-w-0 overflow-hidden">
            <TypingPrompt />
          </div>
          <button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#4b6319] text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#3d5014] hover:scale-105 shrink-0 shadow-[0_4px_12px_rgba(75,99,25,0.25)] ml-4">
            <ArrowUp size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Subtle model badges under input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex items-center justify-center gap-3 mt-5 text-[11px] text-[#9a9a94] font-medium"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b5cb4e] inline-block" />
            GPT-4o
          </span>
          <span className="text-[#d8d8d2]">·</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7aa0c4] inline-block" />
            Claude 4
          </span>
          <span className="text-[#d8d8d2]">·</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a853] inline-block" />
            Gemini 2.5
          </span>
          <span className="text-[#d8d8d2]">·</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c77dba] inline-block" />
            DeepSeek
          </span>
        </motion.div>
      </motion.div>

      {/* --- Visual Context Cards (staggered reveal) --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="relative z-10 mx-auto w-full max-w-[900px] px-6 pb-20 pt-6"
      >
        <div className="grid grid-cols-3 gap-4">
          {/* Card 1: Meeting context */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 border border-[#ebeae6] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#eef3e0] flex items-center justify-center">
                <MessageSquare size={14} className="text-[#4b6319]" />
              </div>
              <span className="text-[10px] font-bold text-[#9a9a94] uppercase tracking-[0.08em]">Meetings</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b5cb4e]" />
                <div className="h-[6px] bg-[#eaeae8] rounded-full w-[85%]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4ce]" />
                <div className="h-[6px] bg-[#eaeae8] rounded-full w-[65%]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4ce]" />
                <div className="h-[6px] bg-[#eaeae8] rounded-full w-[75%]" />
              </div>
            </div>
            <div className="mt-3 text-[11px] text-[#6d6d6d] font-medium">12 meetings this week</div>
          </motion.div>

          {/* Card 2: Notes context */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 border border-[#ebeae6] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#fef4dc] flex items-center justify-center">
                <FileText size={14} className="text-[#c89520]" />
              </div>
              <span className="text-[10px] font-bold text-[#9a9a94] uppercase tracking-[0.08em]">Notes</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#efb02e]" />
                <div className="h-[6px] bg-[#eaeae8] rounded-full w-[90%]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4ce]" />
                <div className="h-[6px] bg-[#eaeae8] rounded-full w-[70%]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4ce]" />
                <div className="h-[6px] bg-[#eaeae8] rounded-full w-[80%]" />
              </div>
            </div>
            <div className="mt-3 text-[11px] text-[#6d6d6d] font-medium">47 notes with context</div>
          </motion.div>

          {/* Card 3: AI Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 border border-[#ebeae6] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#ede0f5] flex items-center justify-center">
                <BrainCircuit size={14} className="text-[#8b5fc7]" />
              </div>
              <span className="text-[10px] font-bold text-[#9a9a94] uppercase tracking-[0.08em]">AI Actions</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c77dba]" />
                <div className="h-[6px] bg-[#eaeae8] rounded-full w-[80%]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4ce]" />
                <div className="h-[6px] bg-[#eaeae8] rounded-full w-[60%]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4ce]" />
                <div className="h-[6px] bg-[#eaeae8] rounded-full w-[72%]" />
              </div>
            </div>
            <div className="mt-3 text-[11px] text-[#6d6d6d] font-medium">Write, draft, summarize</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fbfcfa] to-transparent z-30 pointer-events-none" />
    </div>
  );
}