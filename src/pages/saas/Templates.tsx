import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check,
  RefreshCw,
  X,
  FileUp,
  Search,
  UploadCloud,
  Plus
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Components: Template Patterns                                              */
/* -------------------------------------------------------------------------- */

const MiniDocPreview = ({ variant }) => {
  return (
    <div className="p-6 space-y-4 template-content-scroll">
      {/* Abstract Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-2 w-12 bg-gray-400 rounded-full" />
        <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
      </div>

      <div className="h-3 w-3/4 bg-gray-800 rounded-sm" />
      
      {/* Body Lines */}
      <div className="space-y-2">
        <div className="h-1.5 w-full bg-gray-200 rounded-full" />
        <div className="h-1.5 w-full bg-gray-200 rounded-full" />
        <div className="h-1.5 w-2/3 bg-gray-200 rounded-full" />
      </div>

      {/* Feature Blocks */}
      {variant === 'Meetings' && (
        <div className="pt-4 space-y-2">
           {[1, 2].map(i => (
             <div key={i} className="flex gap-2 items-center">
               <div className="h-2 w-2 border border-gray-300 rounded-[2px]" />
               <div className="h-1.5 w-16 bg-gray-100 rounded-full" />
             </div>
           ))}
        </div>
      )}

      {variant === 'Strategy' && (
        <div className="pt-4 grid grid-cols-2 gap-2">
           <div className="h-8 bg-gray-50 rounded-md border border-gray-100" />
           <div className="h-8 bg-gray-50 rounded-md border border-gray-100" />
        </div>
      )}

      {/* More text for scroll effect */}
      <div className="pt-10 space-y-2 opacity-50">
        <div className="h-1.5 w-full bg-gray-200 rounded-full" />
        <div className="h-1.5 w-full bg-gray-200 rounded-full" />
        <div className="h-1.5 w-full bg-gray-200 rounded-full" />
        <div className="h-1.5 w-1/2 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
};

const TemplateCard = ({ title, category, tags }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col gap-4"
    >
      <div className="relative aspect-[3/4] bg-[#F9F9F9] rounded-[24px] border border-gray-100 overflow-hidden group-hover:scale-[1.02] transition-all duration-300 group-hover:shadow-xl group-hover:border-indigo-500/20 cursor-pointer">
        <MiniDocPreview variant={category} />
        
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
           <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
             Use Template
           </button>
        </div>
      </div>

      <div className="px-1 flex items-start justify-between">
        <div>
          <h4 className="font-medium text-black text-[15px]">{title}</h4>
          <div className="flex gap-2 mt-1">
            {tags.map(tag => (
              <span key={tag} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ImportModal = ({ isOpen, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsDone(true);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-8">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl glass-modal rounded-[32px] shadow-2xl overflow-hidden border border-white/40"
          >
            <div className="p-8">
               <div className="flex justify-between items-start mb-10">
                 <div>
                   <h2 className="text-2xl font-bold tracking-tight">Import Template</h2>
                   <p className="text-gray-500 text-sm mt-1">Teach Loop your documentation style.</p>
                 </div>
                 <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full text-gray-400 transition-colors">
                   <X className="w-5 h-5" />
                 </button>
               </div>

               <div 
                 onClick={startScan}
                 className={`relative h-64 border-2 border-dashed rounded-[24px] transition-all flex flex-col items-center justify-center cursor-pointer ${isScanning ? 'border-indigo-500 bg-indigo-50/10' : 'border-gray-200 bg-white hover:border-gray-300'}`}
               >
                 {isScanning && <div className="scan-line" />}
                 
                 <AnimatePresence mode="wait">
                   {isDone ? (
                      <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                           <Check className="w-8 h-8" />
                        </div>
                        <p className="font-bold text-green-700">Structure Detected</p>
                      </motion.div>
                   ) : isScanning ? (
                      <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                        <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin mx-auto mb-4" />
                        <p className="font-medium text-indigo-600">Analyzing Layout...</p>
                      </motion.div>
                   ) : (
                      <motion.div key="idle" className="text-center">
                        <FileUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="font-bold text-gray-900">Drop PDF or DOCX</p>
                      </motion.div>
                   )}
                 </AnimatePresence>
               </div>

               <div className="mt-8 flex gap-3">
                 <button disabled={!isDone} className={`flex-1 h-12 rounded-full font-bold transition-all ${isDone ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                   Add to Library
                 </button>
                 <button onClick={onClose} className="h-12 px-6 rounded-full font-bold bg-white border border-gray-200">Cancel</button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN PAGE COMPONENT                                                        */
/* -------------------------------------------------------------------------- */

const TemplateStyles = () => (
  <style>{`
    .template-content-scroll::-webkit-scrollbar {
      display: none;
    }
    .template-content-scroll {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .glass-modal {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(12px);
    }
    .scan-line {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(to right, transparent, #6366f1, transparent);
      animation: scan 2s linear infinite;
    }
    @keyframes scan {
      0% { top: 0; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
  `}</style>
);

export default function LoopTemplates() {
  const [activeSegment, setActiveSegment] = useState('All');
  const [isImportOpen, setIsImportOpen] = useState(false);

  const templates = [
    { title: "Standard Standup", category: "Meetings", tags: ["Bullet"] },
    { title: "Quarterly Board", category: "Meetings", tags: ["Formal"] },
    { title: "Product Vision", category: "Strategy", tags: ["Creative"] },
    { title: "API Spec Review", category: "Engineering", tags: ["Markdown"] },
  ];

  return (
    <div className="h-full px-12 py-10 overflow-y-auto custom-scroll flex flex-col">
      <TemplateStyles />
      <ImportModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} />
          
          {/* Header */}
          <header className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-6xl serif-italic text-[#1D1D1F]">Document Patterns</h1>
              <p className="text-sm font-medium text-[#86868B] mt-2">Define how the AI structures your thoughts.</p>
            </div>

            <button 
              onClick={() => setIsImportOpen(true)}
              className="bg-[#1D1D1F] text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
            >
              <UploadCloud className="w-4 h-4" />
              Import Design
            </button>
          </header>

          {/* Segmented Control */}
          <div className="bg-[#F5F5F7] p-1 rounded-full inline-flex w-fit mb-12">
            {["All", "Meetings", "Strategy", "Engineering", "Custom"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveSegment(tab)}
                className="relative px-6 py-1.5 text-sm font-semibold transition-colors z-10"
              >
                {activeSegment === tab && (
                  <motion.div layoutId="segment" className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className={activeSegment === tab ? 'text-black' : 'text-gray-500 hover:text-gray-700'}>{tab}</span>
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
             {/* Custom Upload Card */}
             <div 
               onClick={() => setIsImportOpen(true)}
               className="flex flex-col gap-4"
             >
               <div className="aspect-[3/4] rounded-[24px] border-2 border-dashed border-gray-200 bg-white flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-all cursor-pointer">
                  <Plus className="w-8 h-8" />
                  <span className="font-bold text-sm">Create Blank</span>
               </div>
               <div className="px-1">
                 <h4 className="font-medium text-black text-[15px]">Custom Workflow</h4>
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Build your own</p>
               </div>
             </div>

             {/* Existing Templates */}
             {templates.map((template, i) => (
               <TemplateCard key={i} {...template} />
             ))}
          </div>

        </div>
  );
}
