import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, ArrowLeft, FileText, Clock, MoreHorizontal, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface FolderData {
  id: string;
  name: string;
  description: string | null;
  icon: string;
}

interface LoopInFolder {
  id: string;
  title: string;
  status: string;
  started_at: string;
  duration_seconds: number | null;
  summary: string | null;
}

export default function FolderView() {
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();
  const [folder, setFolder] = useState<FolderData | null>(null);
  const [loops, setLoops] = useState<LoopInFolder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!folderId) return;

    const fetchData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch folder details
      const { data: folderData } = await supabase
        .from('folders')
        .select('*')
        .eq('id', folderId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (folderData) setFolder(folderData);

      // Fetch meetings in this folder
      const { data: loopsData } = await supabase
        .from('loops')
        .select('id, title, status, started_at, duration_seconds, summary')
        .eq('folder_id', folderId)
        .eq('user_id', user.id)
        .order('started_at', { ascending: false });

      if (loopsData) setLoops(loopsData);
      setLoading(false);
    };

    fetchData();
  }, [folderId]);

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0 min';
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!folder) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 text-[#86868B]">
        <Folder size={48} strokeWidth={1.5} />
        <p className="text-[15px]">Folder not found</p>
        <button
          onClick={() => navigate('/home')}
          className="text-[13px] text-[#0071E3] hover:underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scroll">
      <div className="max-w-4xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-lg hover:bg-[#F5F5F7] transition-colors"
          >
            <ArrowLeft size={18} className="text-[#86868B]" />
          </button>
          <div className="text-2xl">{folder.icon === 'folder' ? '📁' : folder.icon}</div>
          <h1 className="text-[28px] font-bold text-[#1D1D1F] tracking-tight">
            {folder.name}
          </h1>
        </div>

        {folder.description && (
          <p className="text-[14px] text-[#86868B] ml-[52px] mb-8">{folder.description}</p>
        )}

        {/* Meetings List */}
        {loops.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 gap-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#F5F5F7] flex items-center justify-center">
              <FileText size={28} strokeWidth={1.5} className="text-[#86868B]" />
            </div>
            <p className="text-[15px] font-medium text-[#1D1D1F]">No meetings yet</p>
            <p className="text-[13px] text-[#86868B] text-center max-w-xs">
              Meetings assigned to this folder will appear here. Start a recording and add it to this folder.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-2 mt-6">
            <AnimatePresence>
              {loops.map((loop, i) => (
                <motion.div
                  key={loop.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(`/loop/${loop.id}`)}
                  className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white border border-[#E5E5EA] hover:border-[#D1D1D6] hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] flex items-center justify-center group-hover:bg-[#EDEDF0] transition-colors">
                      <FileText size={18} strokeWidth={1.5} className="text-[#86868B]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#1D1D1F]">{loop.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[12px] text-[#86868B]">
                          {formatDistanceToNow(new Date(loop.started_at), { addSuffix: true })}
                        </span>
                        <span className="text-[10px] text-[#D1D1D6]">•</span>
                        <span className="text-[12px] text-[#86868B]">
                          {formatDuration(loop.duration_seconds)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                      loop.status === 'completed' 
                        ? 'bg-[#34C759]/10 text-[#34C759]' 
                        : loop.status === 'processing'
                        ? 'bg-[#FFCC00]/10 text-[#FFCC00]'
                        : 'bg-[#0071E3]/10 text-[#0071E3]'
                    }`}>
                      {loop.status}
                    </span>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[#F5F5F7] transition-all"
                    >
                      <MoreHorizontal size={16} className="text-[#86868B]" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
