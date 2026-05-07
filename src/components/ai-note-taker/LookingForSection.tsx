import React, { useState, useEffect } from 'react';

// Custom Minimalist Window Controls (matching the image)
const WindowControls = () => (
  <div className="absolute top-6 right-6 flex items-center gap-4 text-gray-400">
    {/* Minimize */}
    <button className="hover:text-gray-800 transition-colors cursor-pointer group p-1">
      <svg width="12" height="2" viewBox="0 0 12 2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0.5H12V1.5H0V0.5Z" />
      </svg>
    </button>
    {/* Maximize */}
    <button className="hover:text-gray-800 transition-colors cursor-pointer group p-1">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.6" y="0.6" width="8.8" height="8.8" />
      </svg>
    </button>
    {/* Close */}
    <button className="hover:text-gray-800 transition-colors cursor-pointer group p-1">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.20711 0.5L5 4.29289L8.79289 0.5L9.5 1.20711L5.70711 5L9.5 8.79289L8.79289 9.5L5 5.70711L1.20711 9.5L0.5 8.79289L4.29289 5L0.5 1.20711L1.20711 0.5Z" />
      </svg>
    </button>
  </div>
);

// Component for the typing animation effect in the notepad
const TypingNote = () => {
  const rawNotes = [
    "100, growing",
    "use tuesday.ai, v manual",
    "180",
    '"a priority for q2"'
  ];

  const structuredNotes = [
    { type: 'header', text: 'AllFound Overview' },
    { type: 'item', text: '100 employees, adding 20 more next quarter' },
    { type: 'faded', text: 'Office in San Francisco and Austin' },
    { type: 'header', text: 'Current Provider (Tuesday.ai)' },
    { type: 'item', text: 'Data input is too manual' },
    { type: 'faded', text: 'Too complex for non-technical team members' },
    { type: 'item', text: '$180 per employee per year ("too expensive")' },
    { type: 'header', text: 'Their Requirements' },
    { type: 'item', text: 'Finding a better tool is "a priority for Q2"' },
    { type: 'faded', text: 'Need secure information sharing' }
  ];

  const [phase, setPhase] = useState('typing_raw');
  const [rawLines, setRawLines] = useState([]);
  const [rawLineIdx, setRawLineIdx] = useState(0);
  const [rawCharIdx, setRawCharIdx] = useState(0);

  const [structItems, setStructItems] = useState([]);
  const [structLineIdx, setStructLineIdx] = useState(0);
  const [structCharIdx, setStructCharIdx] = useState(0);

  // Phase 1: Typing Raw Notes
  useEffect(() => {
    if (phase === 'typing_raw') {
      if (rawLineIdx < rawNotes.length) {
        const currentLine = rawNotes[rawLineIdx];
        if (rawCharIdx < currentLine.length) {
          const timeout = setTimeout(() => {
            const newLines = [...rawLines];
            newLines[rawLineIdx] = currentLine.substring(0, rawCharIdx + 1);
            setRawLines(newLines);
            setRawCharIdx(prev => prev + 1);
          }, 40);
          return () => clearTimeout(timeout);
        } else {
          const timeout = setTimeout(() => {
            setRawLineIdx(prev => prev + 1);
            setRawCharIdx(0);
          }, 400);
          return () => clearTimeout(timeout);
        }
      } else {
        const timeout = setTimeout(() => setPhase('transition'), 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [phase, rawLineIdx, rawCharIdx]);

  // Phase 2: Transition out raw notes
  useEffect(() => {
    if (phase === 'transition') {
      const timeout = setTimeout(() => setPhase('generating'), 500);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  // Phase 3: "Generating" Structured Notes
  useEffect(() => {
    if (phase === 'generating') {
      if (structLineIdx < structuredNotes.length) {
        const currentItem = structuredNotes[structLineIdx];
        if (structCharIdx < currentItem.text.length) {
          const timeout = setTimeout(() => {
            const newItems = [...structItems];
            newItems[structLineIdx] = {
              type: currentItem.type,
              text: currentItem.text.substring(0, structCharIdx + 1)
            };
            setStructItems(newItems);
            setStructCharIdx(prev => prev + 1);
          }, 15); // Fast "AI generation" speed
          return () => clearTimeout(timeout);
        } else {
          const timeout = setTimeout(() => {
            setStructLineIdx(prev => prev + 1);
            setStructCharIdx(0);
          }, 150);
          return () => clearTimeout(timeout);
        }
      } else {
        const timeout = setTimeout(() => setPhase('done'), 5000);
        return () => clearTimeout(timeout);
      }
    }
  }, [phase, structLineIdx, structCharIdx]);

  // Phase 4: Reset loop
  useEffect(() => {
    if (phase === 'done') {
      setRawLines([]);
      setStructItems([]);
      setRawLineIdx(0);
      setRawCharIdx(0);
      setStructLineIdx(0);
      setStructCharIdx(0);
      setPhase('typing_raw');
    }
  }, [phase]);

  return (
    <div className="relative min-h-[350px]">
      {/* Magic Glow Effect during AI generation */}
      <div className={`absolute -inset-4 bg-gradient-to-r from-transparent via-[#BAC66E]/10 to-transparent blur-xl transition-opacity duration-1000 ${phase === 'generating' ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Raw Notes Layer */}
      {(phase === 'typing_raw' || phase === 'transition') && (
        <div className={`absolute top-0 left-0 w-full flex flex-col gap-4 text-[15px] text-[#333333] font-sans transition-opacity duration-500 ${phase === 'transition' ? 'opacity-0' : 'opacity-100'}`}>
          {rawLines.map((line, index) => (
            <div key={index} className="min-h-[22px] flex items-center">
              {line}
              {index === rawLineIdx && phase === 'typing_raw' && (
                <span className="inline-block w-[1.5px] h-4 bg-black ml-1 animate-[blink_1s_step-end_infinite]"></span>
              )}
            </div>
          ))}
          {rawLines.length === 0 && (
            <div className="min-h-[22px] flex items-center">
              <span className="inline-block w-[1.5px] h-4 bg-black ml-1 animate-[blink_1s_step-end_infinite]"></span>
            </div>
          )}
        </div>
      )}

      {/* Structured Notes Layer */}
      {(phase === 'generating' || phase === 'done') && (
        <div className="relative w-full flex flex-col font-sans animate-[fadeUp_0.5s_ease-out_both]">
          {structItems.map((item, index) => {
            const isHeader = item.type === 'header';
            const isFaded = item.type === 'faded';

            return (
              <div key={index} className={`
                ${isHeader ? 'mt-5 mb-1.5 text-[15px] font-semibold text-[#1A1A1A]' : 'ml-4 text-[14px] mb-1'}
                ${isFaded ? 'text-[#9CA3AF]' : (!isHeader ? 'text-[#333333]' : '')}
                min-h-[22px] flex items-center flex-wrap leading-tight
              `}>
                {item.text}
                {index === structLineIdx && phase === 'generating' && (
                  <span className="inline-block w-[6px] h-[14px] bg-[#BAC66E] ml-1.5 animate-pulse align-middle rounded-[1px]"></span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function LookingForSection() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 flex justify-center items-center px-6">
      
      {/* Main Container Card */}
      <div className="w-full max-w-[1100px] flex flex-col md:flex-row rounded-[12px] border border-[#E5E5E5] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden animate-[fadeUp_0.8s_ease-out_both] group hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-500">
        
        {/* Left Column (Text) */}
        <div className="w-full md:w-[55%] bg-[#F6F6F2] p-10 md:p-14 lg:p-[72px] flex flex-col justify-center">
          <h2 className="text-[36px] md:text-[42px] lg:text-[46px] font-serif text-[#1A1A1A] leading-[1.15] tracking-tight mb-8">
            Looking for an AI note-taker for your meetings?
          </h2>
          
          <div className="text-[17px] text-[#5A5A5A] leading-[1.65] space-y-6">
            <p>
              Loop's that and a lot more. Most AI note-takers transcribe what was said in a meeting, then send you a summary afterwards. We like to think of Loop as a notepad—it still transcribes for you, but at the same time it's a blank canvas for you to jot down notes yourself.
            </p>
            <p>
              When the meeting's done, Loop uses your notes to write even better summaries and action items, which you can edit as much as you'd like.
            </p>
          </div>
        </div>

        {/* Right Column (Notepad Mockup) */}
        <div className="w-full md:w-[45%] bg-white p-10 md:p-14 relative flex flex-col border-l border-[#E5E5E5]">
          <WindowControls />
          
          <div className="mt-8 md:mt-12 flex-1">
            <h3 className="text-[24px] font-serif text-[#1A1A1A] mb-6">
              Intro call: AllFound
            </h3>
            
            {/* Animated Notepad Area */}
            <TypingNote />
          </div>
        </div>

      </div>

      {/* Global Animations */}
      <style>
        {`
          @keyframes fadeUp {
            from { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}