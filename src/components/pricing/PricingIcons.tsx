import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ───── Shared Icon Components ───── */

export function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="#4b6319" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PlusCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#4b6319" strokeWidth="2"/>
      <path d="M12 8v8M8 12h8" stroke="#4b6319" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function InfoTooltip({ text }: { text?: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex ml-1 shrink-0" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-40 cursor-help">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <AnimatePresence>
        {show && text && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[260px] bg-[#1a1c1b] text-white text-[12.5px] leading-[1.5] px-3.5 py-2.5 rounded-lg shadow-lg z-50 pointer-events-none"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#1a1c1b]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

export function ChevronDown({ open }: { open: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="shrink-0 text-[#888]"
    >
      <path d="M6 9l6 6 6-6"/>
    </motion.svg>
  );
}

export function VerifiedBadge() {
  return (
    <svg className="tweet-verified" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="11" fill="#1d9bf0"/>
      <path d="M9.5 14.25l-3.5-3.5 1.41-1.41L9.5 11.42l5.09-5.09L16 7.75l-6.5 6.5z" fill="#fff"/>
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}
