import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Mic,
  Trash2,
  Layers,
  Wand2,
  Zap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface Draft {
  id: string;
  title: string;
  date: string;
  status: 'processing' | 'review' | 'raw';
  progress?: number;
  snippet?: string;
}

/* -------------------------------------------------------------------------- */
/* Components: Draft Intelligence                                             */
/* -------------------------------------------------------------------------- */

const ProgressRing = ({ progress }: { progress: number }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg className="w-full h-full -rotate-90">
        <circle cx="40" cy="40" r={radius} stroke="rgba(0,0,0,0.03)" strokeWidth="5" fill="transparent" />
        <motion.circle 
          cx="40" cy="40" r={radius} 
          stroke="url(#grad)" strokeWidth="5" 
          strokeDasharray={circumference} 
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (progress/100)*circumference }}
          strokeLinecap="round" fill="transparent" 
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-[11px] font-mono font-bold text-indigo-600">{progress}%</div>
    </div>
  );
};

const DraftCard = ({ draft, onFinalize, onDelete }: { draft: Draft; onFinalize: (id: string) => void; onDelete: (id: string) => void }) => {
  const isProcessing = draft.status === 'processing';
  const isReview = draft.status === 'review';
  const isRaw = draft.status === 'raw';

  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.01 }}
      animate={isProcessing ? { scale: [1, 1.01, 1] } : {}}
      transition={isProcessing ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : { type: "spring", stiffness: 300 }}
      className={`
        relative group flex flex-col justify-between p-6 bg-white rounded-[24px] border transition-all duration-300
        ${isProcessing ? 'animate-pulse border-indigo-100 shadow-sm' : 'border-gray-100 shadow-sm hover:shadow-md'}
        ${isRaw ? 'border-dashed border-gray-300 bg-white/50' : ''}
      `}
    >
      {isReview && <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#FFCC00] rounded-r-full" />}

      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
              {draft.date}
            </span>
            <h4 className={`text-[17px] font-bold leading-tight ${isProcessing ? 'text-gray-400' : 'text-black'}`}>
              {draft.title}
            </h4>
          </div>
          {isReview && (
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-200" />
            </div>
          )}
        </div>

        {isProcessing && draft.progress !== undefined && (
          <div className="flex flex-col items-center py-4">
            <ProgressRing progress={draft.progress} />
            <p className="text-[11px] font-mono text-indigo-500 mt-4 font-bold uppercase tracking-wider">Transcribing...</p>
          </div>
        )}

        {isReview && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium">
              {draft.snippet}
            </p>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                <Mic className="w-2.5 h-2.5" /> Audio
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                <FileText className="w-2.5 h-2.5" /> Transcript
              </span>
            </div>
          </div>
        )}

        {isRaw && (
          <div className="py-4 flex flex-col items-center justify-center opacity-40">
             <div className="flex items-center gap-1 h-8">
               {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8, 0.4, 0.6].map((h, i) => (
                 <div key={i} className="w-1 bg-gray-300 rounded-full" style={{ height: `${h * 100}%` }} />
               ))}
             </div>
             <span className="text-[10px] font-mono mt-4">RAW AUDIO</span>
          </div>
        )}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <div className="text-[11px] font-medium text-gray-400 text-center">
               Processing...
            </div>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => onFinalize(draft.id)}
                className={`flex-1 h-10 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isRaw ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-black text-white hover:bg-gray-800'
              }`}>
                {isRaw && <Wand2 className="w-3 h-3" />}
                {isRaw ? 'Generate Document' : 'Open Editor'}
              </button>
              <button 
                onClick={() => onDelete(draft.id)}
                className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN PAGE COMPONENT                                                        */
/* -------------------------------------------------------------------------- */

export default function LoopDrafts() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch loops that are in processing or live status (drafts)
      const { data, error } = await supabase
        .from('loops')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['live', 'processing'])
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedDrafts: Draft[] = (data || []).map(loop => {
        let status: 'processing' | 'review' | 'raw' = 'raw';
        if (loop.status === 'processing') status = 'processing';
        else if (loop.transcript) status = 'review';

        return {
          id: loop.id,
          title: loop.title,
          date: format(new Date(loop.created_at), 'MMM d, h:mm a'),
          status,
          progress: loop.status === 'processing' ? 45 : undefined,
          snippet: loop.summary || loop.description || undefined
        };
      });

      setDrafts(formattedDrafts);
    } catch (error) {
      console.error('Error fetching drafts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalize = async (id: string) => {
    // Mark as completed
    await supabase
      .from('loops')
      .update({ status: 'completed' })
      .eq('id', id);
    
    setDrafts(prev => prev.filter(d => d.id !== id));
  };

  const handleDelete = async (id: string) => {
    await supabase.from('loops').delete().eq('id', id);
    setDrafts(prev => prev.filter(d => d.id !== id));
  };

  if (loading) {
    return (
      <div className="h-full bg-white px-12 py-10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="h-full bg-white px-12 py-10 overflow-y-auto custom-scroll flex flex-col">
      
      {/* Header */}
      <header className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-6xl serif-italic text-[#1D1D1F]">Drafts</h1>
              <p className="text-sm font-medium text-[#86868B] mt-2">
                {drafts.filter(d => d.status === 'processing').length} Processing • {drafts.filter(d => d.status === 'review').length} Needs Review
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-sm font-semibold text-gray-400 hover:text-black transition-colors">Select All</button>
              <div className="w-[1px] h-6 bg-gray-200 mx-1" />
              <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/10">
                <Zap className="w-4 h-4" />
                Process All
              </button>
            </div>
          </header>

          {/* Active Queue Grid */}
          {drafts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pb-32"
            >
              <AnimatePresence mode="popLayout">
                {drafts.map((draft) => (
                  <DraftCard key={draft.id} draft={draft} onFinalize={handleFinalize} onDelete={handleDelete} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty State: Zero Inbox */
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center pb-20 opacity-50"
            >
              <div className="w-48 h-48 mb-8 text-gray-200">
                 <Layers className="w-full h-full stroke-[0.5]" />
              </div>
              <h2 className="text-3xl serif-italic font-medium text-black">Zero Inbox.</h2>
              <p className="text-gray-500 font-medium mt-2">All meetings have been processed.</p>
              <button className="mt-8 text-indigo-600 font-bold hover:underline">Start a new recording</button>
            </motion.div>
          )}

        </div>
  );
}