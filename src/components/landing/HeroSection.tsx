import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HERO_PARTICIPANT_1, HERO_PARTICIPANT_2 } from '@/data/marketingImages';

/* ─── Typing data for left card ─── */
const TYPING_LINES = [
  '100, growing',
  'use tuesday.ai, v manual',
  '180',
  '"a priority for Q2"',
];

/* ─── AI-generated content — flat list of tokens for right card generation ─── */
const AI_CONTENT = [
  { type: 'heading' as const, text: 'AllFound Overview' },
  { type: 'line' as const, text: '100 employees, adding 20 more next quarter', dim: false },
  { type: 'line' as const, text: 'Office in San Francisco and Austin', dim: true },
  { type: 'heading' as const, text: 'Current Provider (Tuesday.ai)' },
  { type: 'line' as const, text: 'Data input is too manual', dim: false },
  { type: 'line' as const, text: 'Too complex for non-technical team members', dim: true },
  { type: 'line' as const, text: '$180 per employee per year ("too expensive")', dim: false },
  { type: 'heading' as const, text: 'Their Requirements' },
  { type: 'line' as const, text: 'Finding a better tool is a "priority for Q2"', dim: false },
  { type: 'line' as const, text: 'Need secure information sharing', dim: true },
];

/*
 * Right card phases:
 *   'raw'         – shows the same user-written raw notes
 *   'dissolving'  – raw notes blur/dissolve away with shimmer overlay
 *   'generating'  – AI content types in line-by-line with a green cursor
 *   'done'        – all AI content visible, hold, then loop restarts
 */
type RightPhase = 'raw' | 'dissolving' | 'generating' | 'done';

/* ─── Waveform bar component ─── */
function WaveformBar({ delay, height }: { delay: number; height: number }) {
  return (
    <div
      className="waveform-bar"
      style={{
        width: 3,
        borderRadius: 9999,
        backgroundColor: '#4b6319',
        animationDelay: `${delay}ms`,
        height,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                       MAIN HERO                            */
/* ─────────────────────────────────────────────────────────── */
export default function HeroSection() {
  // ── Loop key: bumping this resets the entire animation cycle ──
  const [loopKey, setLoopKey] = useState(0);

  return (
    <>
      <HeroAnimationStyles />
      <section className="pt-32 pb-16 text-center px-6">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#f0f4e8] text-[#4b6319] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-[#4b6319]/10">
            Public Beta is now live
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </div>
        </div>
        <h1 className="font-headline text-4xl md:text-[4.5rem] font-normal tracking-tight text-[#1a1c1b] max-w-4xl mx-auto leading-[1.05] text-balance mb-6">
          The AI notepad for people in back-to-back meetings
        </h1>
        <p className="font-body text-lg md:text-xl text-[#1a1c1b]/60 max-w-2xl mx-auto mb-10">
          Loop takes your raw meeting notes and makes them awesome
        </p>
        <div className="flex flex-col items-center gap-4">
          <button onClick={() => window.location.href = '/auth'} className="liquid-glass-cta group relative overflow-hidden rounded-full px-8 py-3.5 font-bold text-base flex items-center gap-3 transition-all duration-500 active:scale-95 cursor-pointer">
            {/* Shimmer sweep */}
            <span className="liquid-glass-shimmer" />
            {/* Inner highlight refraction */}
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background: 'radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.18) 0%, transparent 60%)'}} />
            <span className="material-symbols-outlined text-[20px] relative z-10 drop-shadow-sm">arrow_forward</span>
            <span className="relative z-10 drop-shadow-sm">Get Started for Free</span>
          </button>
        </div>

        {/* The animated card pair — keyed so it fully remounts on loop reset */}
        <HeroCards key={loopKey} onCycleComplete={() => setLoopKey((k) => k + 1)} />
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*              ANIMATED CARD PAIR (remountable)              */
/* ─────────────────────────────────────────────────────────── */
function HeroCards({ onCycleComplete }: { onCycleComplete: () => void }) {
  // ── Left card: typing ──
  const [leftLine, setLeftLine] = useState(0);
  const [leftChar, setLeftChar] = useState(0);
  const [leftLines, setLeftLines] = useState<string[]>([]);
  const [typingDone, setTypingDone] = useState(false);
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typingDone) return;
    if (leftLine >= TYPING_LINES.length) { setTypingDone(true); return; }
    const line = TYPING_LINES[leftLine];
    if (leftChar <= line.length) {
      tRef.current = setTimeout(() => {
        setLeftLines((prev) => { const c = [...prev]; c[leftLine] = line.slice(0, leftChar); return c; });
        setLeftChar((c) => c + 1);
      }, 50);
    } else {
      tRef.current = setTimeout(() => { setLeftLine((l) => l + 1); setLeftChar(0); }, 450);
    }
    return () => { if (tRef.current) clearTimeout(tRef.current); };
  }, [leftLine, leftChar, typingDone]);

  // ── Right card state machine ──
  const [rightPhase, setRightPhase] = useState<RightPhase>('raw');
  const [genLine, setGenLine] = useState(0);      // which AI_CONTENT item we're on
  const [genChar, setGenChar] = useState(0);       // char position within that item's text
  const [genLines, setGenLines] = useState<string[]>([]);  // partially-typed text per item
  const [genDone, setGenDone] = useState(false);
  const gRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typing done → start dissolve
  useEffect(() => {
    if (!typingDone) return;
    const t = setTimeout(() => setRightPhase('dissolving'), 500);
    return () => clearTimeout(t);
  }, [typingDone]);

  // Dissolve → generating
  useEffect(() => {
    if (rightPhase !== 'dissolving') return;
    const t = setTimeout(() => setRightPhase('generating'), 1200);
    return () => clearTimeout(t);
  }, [rightPhase]);

  // Generate AI content char-by-char
  useEffect(() => {
    if (rightPhase !== 'generating') return;
    if (genDone) return;
    if (genLine >= AI_CONTENT.length) { setGenDone(true); setRightPhase('done'); return; }

    const item = AI_CONTENT[genLine];
    // Headings appear instantly; lines type char by char
    if (item.type === 'heading') {
      setGenLines((prev) => { const c = [...prev]; c[genLine] = item.text; return c; });
      gRef.current = setTimeout(() => { setGenLine((l) => l + 1); setGenChar(0); }, 200);
    } else {
      if (genChar <= item.text.length) {
        gRef.current = setTimeout(() => {
          setGenLines((prev) => { const c = [...prev]; c[genLine] = item.text.slice(0, genChar); return c; });
          setGenChar((ch) => ch + 1);
        }, 22); // fast AI typing speed
      } else {
        gRef.current = setTimeout(() => { setGenLine((l) => l + 1); setGenChar(0); }, 120);
      }
    }
    return () => { if (gRef.current) clearTimeout(gRef.current); };
  }, [rightPhase, genLine, genChar, genDone]);

  // Done → hold 3s → loop
  useEffect(() => {
    if (rightPhase !== 'done') return;
    const t = setTimeout(onCycleComplete, 3500);
    return () => clearTimeout(t);
  }, [rightPhase, onCycleComplete]);

  // Is the AI cursor actively typing on a line?
  const isGeneratingLine = rightPhase === 'generating' && !genDone;

  return (
    <div className="mt-12 md:mt-20 mb-10 max-w-6xl mx-auto relative flex flex-col md:flex-row justify-center items-center md:items-start gap-1 md:gap-2 px-2 md:px-4 w-full text-left hero-cards-wrapper">
      
      {/* Background Line */}
      <div className="hidden md:block absolute top-[280px] left-0 w-full h-[1px] bg-[#e5e5e5] -z-10"></div>

      {/* ═══════════════ LEFT CARD ═══════════════ */}
      <div className="relative flex items-start z-10 w-full max-w-[420px] hero-card-left hero-left-enter">
        {/* Avatars */}
        <div className="hidden md:flex absolute -left-[90px] top-[350px] flex-col bg-white rounded-[16px] shadow-[0_4px_16px_rgb(0,0,0,0.08)] border border-[#e5e5e5] overflow-hidden -z-10">
          <div className="w-[110px] h-[110px] bg-[#f5f5f5] p-[4px] pb-[2px]">
            <img src={HERO_PARTICIPANT_1} alt="Participant 1" className="w-full h-full object-cover rounded-[10px] shadow-sm" />
          </div>
          <div className="w-[110px] h-[110px] bg-[#f5f5f5] p-[4px] pt-[2px]">
            <img src={HERO_PARTICIPANT_2} alt="Participant 2" className="w-full h-full object-cover rounded-[10px] shadow-sm" />
          </div>
        </div>

        <div className="w-full flex flex-col items-start">
          <div className="text-[12px] md:text-[14px] text-[#1a1c1b] mb-3 md:mb-4 font-medium tracking-wide hero-label-left">Your notes + transcript</div>
          <div className="w-full h-[420px] md:h-[600px] bg-white rounded-xl border border-[#e8e8e8] flex flex-col relative z-10 shadow-[0_2px_24px_rgb(0,0,0,0.04)]">
            <div className="w-full h-11 flex justify-end items-center px-5 gap-4 text-gray-400">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6h8"/></svg>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="1.5" width="9" height="9"/></svg>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l8 8M10 2l-8 8"/></svg>
            </div>
            <div className="px-5 md:px-10 py-3 md:py-4 flex-1 text-left">
              <h4 className="font-headline text-[18px] md:text-[24px] mb-4 md:mb-8 text-[#1a1c1b]">Intro call: AllFound</h4>
              <div className="space-y-4 text-[13.5px] text-[#3c3c3c] font-body leading-[1.6]">
                {leftLines.map((line, i) => (
                  <p key={i} className="flex items-center min-h-[1.6em]">
                    {line}
                    {i === leftLine && !typingDone && (
                      <span className="typing-cursor inline-block w-[2px] h-[15px] bg-[#4b6319] ml-[1px]" />
                    )}
                  </p>
                ))}
                {!typingDone && leftLine < TYPING_LINES.length && leftLines.length <= leftLine && (
                  <p className="flex items-center min-h-[1.6em]">
                    <span className="typing-cursor inline-block w-[2px] h-[15px] bg-[#4b6319]" />
                  </p>
                )}
              </div>
            </div>
            {/* Recording Pill */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <div className="bg-white border border-[#e5e5e5] shadow-[0_2px_8px_rgb(0,0,0,0.04)] rounded-full px-5 py-2.5 flex items-center gap-5">
                <div className="flex items-center gap-[3px]">
                  <WaveformBar delay={0} height={14} />
                  <WaveformBar delay={200} height={20} />
                  <WaveformBar delay={400} height={14} />
                  <WaveformBar delay={100} height={18} />
                  <WaveformBar delay={300} height={12} />
                </div>
                <div className="w-3.5 h-3.5 rounded-[3px] bg-red-500 opacity-80 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow separator */}
      <div className="hidden md:flex items-center justify-center mt-[320px] z-10 bg-white p-1 text-[#1a1c1b]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>

      {/* ═══════════════ RIGHT CARD ═══════════════ */}
      <div className="flex flex-col items-end z-10 w-full max-w-[420px] hero-card-right hero-right-enter">
        <div className="flex items-center gap-2 mb-3 md:mb-4 text-[12px] md:text-[14px] text-[#1a1c1b] font-medium tracking-wide hero-label-right">
          <span className="material-symbols-outlined text-[14px] md:text-[16px] text-green-700">auto_awesome</span>
          AI enhanced
        </div>
        <div className="w-full h-[420px] md:h-[600px] bg-white rounded-xl border border-[#e8e8e8] flex flex-col pb-6 md:pb-8 shadow-[0_2px_24px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <div className="w-full h-11 flex justify-end items-center px-5 gap-4 text-gray-400">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6h8"/></svg>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="1.5" width="9" height="9"/></svg>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l8 8M10 2l-8 8"/></svg>
          </div>

          {/* Dissolving shimmer overlay */}
          {rightPhase === 'dissolving' && <div className="generating-overlay" />}

          {/* Green glow border during generation */}
          {rightPhase === 'generating' && <div className="gen-glow-border" />}

          <div className="px-5 md:px-12 py-3 md:py-4 flex-1 text-left relative">
            <h4 className="font-headline text-[18px] md:text-[24px] text-[#1a1c1b] mb-4 md:mb-8">Intro call: AllFound</h4>

            {/* ── Phase: Raw notes ── */}
            {rightPhase === 'raw' && (
              <div className="space-y-4 text-[13.5px] text-[#3c3c3c] font-body leading-[1.6]">
                <p>100, growing</p>
                <p>use tuesday.ai, v manual</p>
                <p>180</p>
                <p>"a priority for Q2"</p>
              </div>
            )}

            {/* ── Phase: Dissolving ── */}
            {rightPhase === 'dissolving' && (
              <div className="space-y-4 text-[13.5px] text-[#3c3c3c] font-body leading-[1.6] dissolve-exit">
                <p>100, growing</p>
                <p>use tuesday.ai, v manual</p>
                <p>180</p>
                <p>"a priority for Q2"</p>
              </div>
            )}

            {/* ── Phase: AI Generating (char-by-char) ── */}
            {(rightPhase === 'generating' || rightPhase === 'done') && (
              <div className="space-y-1 font-body">
                {AI_CONTENT.map((item, idx) => {
                  const text = genLines[idx];
                  if (text === undefined || text === null) return null;

                  if (item.type === 'heading') {
                    return (
                      <h5 key={idx} className="font-semibold text-[13.5px] text-[#2d2d2d] mt-5 mb-1.5 first:mt-0 ai-line-enter">
                        {text}
                      </h5>
                    );
                  }

                  const isDim = 'dim' in item && item.dim;
                  const isCurrentLine = idx === genLine && isGeneratingLine;
                  return (
                    <p key={idx} className={`text-[13px] leading-[1.7] ai-line-enter ${isDim ? 'text-gray-400' : 'text-[#3c3c3c]'}`}>
                      {text}
                      {isCurrentLine && (
                        <span className="gen-cursor" />
                      )}
                    </p>
                  );
                })}

                {/* Shimmer skeleton for upcoming content */}
                {isGeneratingLine && (
                  <div className="space-y-2 mt-4 opacity-60">
                    <div className="ai-shimmer h-[10px] rounded-full w-3/5" />
                    <div className="ai-shimmer h-[10px] rounded-full w-2/5" />
                  </div>
                )}
              </div>
            )}

            {/* Generating badge */}
            {(rightPhase === 'dissolving' || rightPhase === 'generating') && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#f0f4e8] border border-[#4b6319]/15 rounded-full px-4 py-2 gen-badge">
                <span className="material-symbols-outlined text-[14px] text-[#4b6319]">auto_awesome</span>
                <span className="text-[11px] font-semibold text-[#4b6319] tracking-wide">
                  {rightPhase === 'dissolving' ? 'Analyzing...' : 'Generating...'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                     ANIMATION STYLES                       */
/* ─────────────────────────────────────────────────────────── */
function HeroAnimationStyles() {
  return (
    <style>{`
      /* ── Liquid Glass CTA ── */
      .liquid-glass-cta {
        background: linear-gradient(135deg, rgba(75,99,25,0.85) 0%, rgba(60,80,20,0.75) 50%, rgba(75,99,25,0.9) 100%);
        color: #fff;
        backdrop-filter: blur(16px) saturate(1.6);
        -webkit-backdrop-filter: blur(16px) saturate(1.6);
        border: 1px solid rgba(255,255,255,0.18);
        box-shadow:
          0 0 0 1px rgba(75,99,25,0.3),
          0 4px 24px rgba(75,99,25,0.25),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.08);
        text-shadow: 0 1px 2px rgba(0,0,0,0.15);
        animation: liquidIdle 4s ease-in-out infinite;
      }
      .liquid-glass-cta:hover {
        background: linear-gradient(135deg, rgba(75,99,25,0.95) 0%, rgba(55,75,18,0.85) 50%, rgba(75,99,25,1) 100%);
        box-shadow:
          0 0 0 1px rgba(75,99,25,0.4),
          0 8px 32px rgba(75,99,25,0.35),
          0 0 48px rgba(75,99,25,0.12),
          inset 0 1px 2px rgba(255,255,255,0.25),
          inset 0 -1px 1px rgba(0,0,0,0.1);
        transform: translateY(-1px);
      }

      /* Shimmer sweep effect */
      .liquid-glass-shimmer {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(
          105deg,
          transparent 20%,
          rgba(255,255,255,0.12) 35%,
          rgba(255,255,255,0.25) 42%,
          rgba(255,255,255,0.12) 49%,
          transparent 64%
        );
        background-size: 250% 100%;
        animation: glassShimmer 5s ease-in-out infinite;
        pointer-events: none;
        z-index: 5;
      }

      @keyframes glassShimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      @keyframes liquidIdle {
        0%, 100% {
          box-shadow:
            0 0 0 1px rgba(75,99,25,0.3),
            0 4px 24px rgba(75,99,25,0.25),
            inset 0 1px 1px rgba(255,255,255,0.2),
            inset 0 -1px 1px rgba(0,0,0,0.08);
        }
        50% {
          box-shadow:
            0 0 0 1px rgba(75,99,25,0.35),
            0 6px 28px rgba(75,99,25,0.3),
            0 0 20px rgba(75,99,25,0.06),
            inset 0 1px 1px rgba(255,255,255,0.22),
            inset 0 -1px 1px rgba(0,0,0,0.08);
        }
      }

      /* ── Waveform bars ── */
      @keyframes waveform {
        0%, 100% { transform: scaleY(0.4); }
        50% { transform: scaleY(1); }
      }
      .waveform-bar {
        animation: waveform 1.2s ease-in-out infinite;
        transform-origin: center;
      }

      /* ── Typing cursor blink ── */
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .typing-cursor {
        animation: blink 0.85s step-end infinite;
      }

      /* ── AI generation cursor (green glowing bar) ── */
      .gen-cursor {
        display: inline-block;
        width: 2px;
        height: 14px;
        margin-left: 1px;
        background: #4b6319;
        border-radius: 1px;
        vertical-align: text-bottom;
        box-shadow: 0 0 6px rgba(75,99,25,0.5), 0 0 12px rgba(75,99,25,0.2);
        animation: blink 0.6s step-end infinite;
      }

      /* ── Dissolving: raw text blurs and fades ── */
      @keyframes dissolve {
        0%   { opacity: 1; transform: translateY(0); filter: blur(0px); }
        40%  { opacity: 0.7; filter: blur(1px); }
        100% { opacity: 0; transform: translateY(6px); filter: blur(4px); }
      }
      .dissolve-exit {
        animation: dissolve 1s ease-in forwards;
      }

      /* ── Shimmer overlay during dissolve ── */
      @keyframes shimmerSweep {
        0%   { background-position: -100% 0; }
        100% { background-position: 200% 0; }
      }
      .generating-overlay {
        position: absolute;
        inset: 0;
        z-index: 2;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(75,99,25,0.05) 20%,
          rgba(75,99,25,0.12) 50%,
          rgba(75,99,25,0.05) 80%,
          transparent 100%
        );
        background-size: 50% 100%;
        animation: shimmerSweep 1s ease-in-out infinite;
        pointer-events: none;
        border-radius: 12px;
      }

      /* ── Green glow border during generation ── */
      @keyframes glowPulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.7; }
      }
      .gen-glow-border {
        position: absolute;
        inset: -1px;
        border-radius: 13px;
        border: 1.5px solid rgba(75,99,25,0.25);
        box-shadow: 0 0 16px rgba(75,99,25,0.08), inset 0 0 16px rgba(75,99,25,0.03);
        pointer-events: none;
        z-index: 0;
        animation: glowPulse 2s ease-in-out infinite;
      }

      /* ── Each AI line fades in ── */
      @keyframes lineSlideIn {
        from { opacity: 0; transform: translateX(4px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      .ai-line-enter {
        animation: lineSlideIn 0.25s ease-out forwards;
      }

      /* ── Shimmer skeleton lines ── */
      @keyframes shimmer {
        0%   { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .ai-shimmer {
        background: linear-gradient(90deg, rgba(75,99,25,0.04) 25%, rgba(75,99,25,0.12) 50%, rgba(75,99,25,0.04) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s ease-in-out infinite;
      }

      /* ── Sparkle icon ── */
      @keyframes sparkle {
        0%, 100% { opacity: 0.4; transform: scale(0.85); }
        50%      { opacity: 1;   transform: scale(1.1); }
      }
      .ai-sparkle {
        animation: sparkle 2s ease-in-out infinite;
      }

      /* ── Generating badge pulse ── */
      @keyframes genPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(75,99,25,0.3); }
        50%      { box-shadow: 0 0 0 6px rgba(75,99,25,0); }
      }
      .gen-badge {
        animation: genPulse 1.5s ease-in-out infinite;
      }

      /* ── Card entry ── */
      @keyframes slideRevealRight {
        from { opacity: 0; transform: translateX(40px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      .hero-right-enter {
        animation: slideRevealRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      @keyframes slideRevealLeft {
        from { opacity: 0; transform: translateX(-40px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      .hero-left-enter {
        animation: slideRevealLeft 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }

      /* ─── Mobile stacking: left card peeks from left behind right card ─── */
      @media (max-width: 767px) {
        .hero-cards-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          min-height: 520px;
          padding: 0 4px;
        }
        .hero-label-left {
          position: absolute;
          top: 0;
          left: 4px;
          z-index: 0;
        }
        .hero-label-right {
          margin-right: 4px;
        }
        .hero-card-left {
          position: absolute;
          top: 28px;
          left: -8px;
          z-index: 1;
          width: 72%;
          max-width: 300px;
          transform: scale(0.88);
          transform-origin: top left;
          opacity: 0.7;
          filter: brightness(0.97);
        }
        .hero-card-left .hero-label-left {
          display: none;
        }
        .hero-card-right {
          position: relative;
          z-index: 5;
          width: 88%;
          max-width: 380px;
          margin-top: 24px;
          margin-right: 0;
        }
      }

      /* ─── Very small phones ─── */
      @media (max-width: 400px) {
        .hero-card-left {
          width: 68%;
          max-width: 260px;
          transform: scale(0.82);
          opacity: 0.6;
          left: -12px;
        }
        .hero-card-right {
          width: 92%;
        }
      }
    `}</style>
  );
}
