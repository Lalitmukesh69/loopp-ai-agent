import React, { useState, useRef } from 'react';
import { Bot, X } from 'lucide-react';

// Reusable Interactive & Draggable Notification Card
const NotificationCard = ({ 
  iconColorClass, 
  iconBgClass, 
  text, 
  hasDeny, 
  positionClass, 
  rotation, 
  delayClass,
  zIndexClass
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // --- Drag Handlers ---
  const handlePointerDown = (e) => {
    // Prevent drag if clicking the Deny or Close buttons
    if (e.target.closest('button')) return;
    
    setIsDragging(true);
    // Calculate initial click offset relative to the current translation
    dragStartPos.current = { 
      x: e.clientX - offset.x, 
      y: e.clientY - offset.y 
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStartPos.current.x,
      y: e.clientY - dragStartPos.current.y
    });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      // Outer wrapper handles positioning, z-index prioritization, and the physical drag translation
      className={`absolute ${positionClass} ${isDragging ? 'z-[100]' : zIndexClass}`}
      style={{ 
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        touchAction: 'none' // Crucial for mobile touch dragging
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Middle wrapper separates CSS animations from inline transforms to prevent conflicts */}
      <div 
        className="animate-[popIn_0.6s_ease-out_both,float_6s_ease-in-out_infinite]"
        style={{ animationDelay: `${delayClass}, ${delayClass}` }}
      >
        {/* Inner visual card handles rotation, scaling, and shadows */}
        <div 
          className={`
            w-[280px] sm:w-[320px] bg-white rounded-xl border border-gray-100 p-3 flex gap-3
            transition-all duration-300 ease-out select-none
            ${isDragging 
              ? 'cursor-grabbing scale-[1.05] shadow-[0_16px_40px_rgba(0,0,0,0.15)]' 
              : 'cursor-grab hover:scale-[1.05] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]'
            }
          `}
          style={{
            // Reset rotation to 0 when hovered or dragged to make it readable
            transform: (!isDragging && !isHovered) ? `rotate(${rotation}deg)` : 'rotate(0deg)'
          }}
        >
          {/* Icon */}
          <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${iconBgClass} ${iconColorClass}`}>
            <Bot size={18} />
          </div>

          {/* Content */}
          <div className="flex-1 pr-4">
            <p className="text-[13px] leading-[1.3] text-gray-800 font-medium">
              <span dangerouslySetInnerHTML={{ __html: text }}></span>
            </p>
          </div>

          {/* Optional Deny Button */}
          {hasDeny && (
            <div className="shrink-0 self-center">
              <button 
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[12px] font-medium px-3 py-1.5 rounded-md transition-colors shadow-sm active:scale-95 cursor-pointer"
                onPointerDown={(e) => e.stopPropagation()} // Prevents drag
              >
                Deny
              </button>
            </div>
          )}

          {/* Close 'X' */}
          <button 
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition-colors p-0.5 cursor-pointer"
            onPointerDown={(e) => e.stopPropagation()} // Prevents drag
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function WhatsAnAINotetakerSection() {
  return (
    <div className="min-h-screen bg-[#FCFCFA] font-sans selection:bg-[#BAC66E] selection:text-black py-24 flex flex-col items-center justify-center overflow-hidden">
      
      {/* --- Floating Cards Cluster Area --- */}
      <div className="relative w-full max-w-[800px] h-[340px] mb-12 flex justify-center perspective-[1000px]">
        
        {/* Pink Card - Top */}
        <NotificationCard 
          positionClass="top-[20px] ml-[-40px]"
          rotation={4}
          delayClass="0.1s"
          zIndexClass="z-10"
          iconBgClass="bg-pink-100"
          iconColorClass="text-pink-500"
          text="<b>Sam's AI notetaker</b> is requesting permission to record this meeting"
        />

        {/* Purple Card - Left */}
        <NotificationCard 
          positionClass="top-[90px] left-[10%] sm:left-[15%]"
          rotation={-8}
          delayClass="0.3s"
          zIndexClass="z-20"
          iconBgClass="bg-purple-100"
          iconColorClass="text-purple-500"
          text="<b>AI notetaker</b> is asking to join this meeting"
          hasDeny={true}
        />

        {/* Lime Card - Right */}
        <NotificationCard 
          positionClass="top-[70px] right-[10%] sm:right-[15%]"
          rotation={6}
          delayClass="0.5s"
          zIndexClass="z-20"
          iconBgClass="bg-lime-100"
          iconColorClass="text-lime-600"
          text="<b>Jonathan's AI notetaker</b> is requesting permission to record this meeting"
        />

        {/* Teal Card - Bottom Left */}
        <NotificationCard 
          positionClass="top-[160px] left-[15%] sm:left-[22%]"
          rotation={-12}
          delayClass="0.7s"
          zIndexClass="z-30"
          iconBgClass="bg-teal-100"
          iconColorClass="text-teal-600"
          text="<b>Tanya's AI notetaker</b> wants to record this meeting"
        />

        {/* Red Card - Bottom Right */}
        <NotificationCard 
          positionClass="top-[140px] right-[15%] sm:right-[22%]"
          rotation={14}
          delayClass="0.9s"
          zIndexClass="z-40"
          iconBgClass="bg-red-100"
          iconColorClass="text-red-500"
          text="<b>AI notetaker</b> wants to record this meeting"
          hasDeny={true}
        />

        {/* Yellow Card - Bottom Center */}
        <NotificationCard 
          positionClass="top-[210px] ml-[20px]"
          rotation={-4}
          delayClass="1.1s"
          zIndexClass="z-10"
          iconBgClass="bg-yellow-100"
          iconColorClass="text-yellow-600"
          text="<b>Jack's AI notetaker</b> is requesting permission to record this meeting"
        />

      </div>

      {/* --- Text Content Area --- */}
      <div className="max-w-3xl mx-auto px-6 text-center animate-[fadeUp_1s_ease-out_1.2s_both]">
        
        <h2 className="text-[40px] md:text-[46px] font-serif text-[#1A1A1A] leading-[1.1] mb-8">
          What's an AI note-taker?
        </h2>
        
        <div className="text-[18px] md:text-[20px] text-[#737373] leading-[1.6] space-y-6 max-w-2xl mx-auto">
          <p>
            An AI note-taker records and transcribes your conversations so you have a written record to come back to. It's a handy way to avoid scribbling during calls.
          </p>
          <p>
            The catch is, that's often where it stops. You'll often get a transcript and AI notes that you can't edit. Some tools even decide what to keep and what to leave out.
          </p>
        </div>

      </div>

      {/* --- Global Animations --- */}
      <style>
        {`
          @keyframes popIn {
            0% { 
              opacity: 0; 
              transform: translateY(40px) scale(0.8); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0px) scale(1);
            }
          }
          
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

          @keyframes float {
            0%, 100% { 
              margin-top: 0px; 
            }
            50% { 
              margin-top: -10px; 
            }
          }
        `}
      </style>
    </div>
  );
}