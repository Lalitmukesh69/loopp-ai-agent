import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Home, Command, ArrowRight, HelpCircle } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Design Tokens & Styles                                                     */
/* -------------------------------------------------------------------------- */
const ErrorStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
    
    :root {
      --ceramic-silver: #F5F5F7;
      --ink-black: #1D1D1F;
      --indigo-accent: #4F46E5;
    }

    body {
      background-color: var(--ceramic-silver);
      color: var(--ink-black);
      font-family: 'Raleway', sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow: hidden;
    }

    .serif-italic { font-family: 'Raleway', sans-serif; font-style: italic; }
    .font-mono { font-family: 'Raleway', sans-serif; }

    .bg-noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E");
    }

    .spotlight {
      background: radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%);
    }

    .glass-ring {
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
        0 20px 40px rgba(0,0,0,0.05),
        inset 0 0 20px rgba(255,255,255,0.6);
      border: 1px solid rgba(255,255,255,0.5);
    }

    .command-pill {
      background: rgba(29, 29, 31, 0.9);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
  `}</style>
);

/* -------------------------------------------------------------------------- */
/* Component: The Broken Loop (Hero Visual)                                   */
/* -------------------------------------------------------------------------- */

const BrokenLoop = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  // Mapping mouse position to perspective rotation
  const rotateX = useTransform(mouseY, [-400, 400], [15, -15]);
  const rotateY = useTransform(mouseX, [-400, 400], [-15, 15]);

  // Magnetism for the broken ends
  const end1Offset = useTransform(mouseX, [-400, 400], [-10, 5]);
  const end2Offset = useTransform(mouseX, [-400, 400], [10, -5]);

  return (
    <motion.div
      style={{ 
        perspective: 1000,
        rotateX,
        rotateY
      }}
      className="relative w-80 h-80 flex items-center justify-center animate-float"
    >
      {/* The Ring - Constructed via SVGs for precise "Broken" gap */}
      <div className="relative w-full h-full">
        {/* Left Semi-Circle */}
        <motion.div 
          style={{ x: end1Offset }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="300" height="300" viewBox="0 0 100 100" className="drop-shadow-2xl">
            <path 
              d="M 50,10 A 40,40 0 1 0 50,90" 
              fill="none" 
              stroke="white" 
              strokeWidth="12" 
              strokeLinecap="round"
              className="opacity-80"
              style={{ filter: 'blur(0.5px)' }}
            />
            {/* Glossy Overlay */}
            <path 
              d="M 50,10 A 40,40 0 1 0 50,90" 
              fill="none" 
              stroke="rgba(255,255,255,0.4)" 
              strokeWidth="10" 
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Right Semi-Circle */}
        <motion.div 
          style={{ x: end2Offset }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="300" height="300" viewBox="0 0 100 100" className="drop-shadow-2xl">
            <path 
              d="M 50,10 A 40,40 0 0 1 50,90" 
              fill="none" 
              stroke="white" 
              strokeWidth="12" 
              strokeLinecap="round"
              className="opacity-80"
            />
             {/* Glossy Overlay */}
             <path 
              d="M 50,10 A 40,40 0 0 1 50,90" 
              fill="none" 
              stroke="rgba(255,255,255,0.4)" 
              strokeWidth="10" 
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Central Core Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 bg-white/20 blur-3xl rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Main Page Component                                                        */
/* -------------------------------------------------------------------------- */

export default function NotFound() {
  const [isExiting, setIsExiting] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  const handleRecovery = () => {
    setIsExiting(true);
    setTimeout(() => {
      // Simulate navigation
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-screen h-screen flex flex-col items-center justify-center selection:bg-indigo-100 overflow-hidden"
    >
      <ErrorStyles />
      
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#F5F5F7]" />
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full spotlight blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <motion.div 
        animate={{ 
          scale: isExiting ? 2.5 : 1,
          opacity: isExiting ? 0 : 1,
          filter: isExiting ? 'blur(20px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-16"
      >
        {/* HERO VISUAL */}
        <BrokenLoop mouseX={springX} mouseY={springY} />

        {/* TYPOGRAPHY */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-[11px] font-bold text-gray-400 uppercase tracking-[1em] pl-[1em]"
          >
            {[..."404"].map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          <h1 className="serif-italic text-7xl md:text-8xl text-black tracking-tighter leading-tight">
            Signal lost.
          </h1>

          <p className="text-gray-500 font-medium max-w-md mx-auto leading-relaxed px-6">
            The conversation you're looking for doesn't exist. <br/>
            Or maybe it's just silence.
          </p>
        </div>

        {/* COMMAND CAPSULE */}
        <motion.button
          onClick={handleRecovery}
          whileHover={{ width: 260 }}
          whileTap={{ scale: 0.96 }}
          className="command-pill h-14 w-56 rounded-full flex items-center justify-between px-6 transition-all duration-300 group cursor-pointer overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <Home className="w-4 h-4 text-white opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="text-sm font-bold text-white whitespace-nowrap">Return to Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-80 transition-opacity">
            <div className="px-1.5 py-0.5 rounded-md border border-white/20 bg-white/10 text-[10px] font-bold text-white">K</div>
          </div>
        </motion.button>
      </motion.div>

      {/* FOOTER */}
      <footer className="fixed bottom-12 left-0 right-0 flex justify-center text-[11px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2">
          <span>Need help?</span>
          <button className="text-black underline underline-offset-4 hover:text-indigo-600 transition-colors">
            Contact Support
          </button>
        </div>
      </footer>

      {/* EXIT OVERLAY */}
      <AnimatePresence>
        {isExiting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-white z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
