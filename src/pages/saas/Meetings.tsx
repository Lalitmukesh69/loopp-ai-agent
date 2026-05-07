import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  FileText, 
  MoreHorizontal,
  Search,
  Play,
  Share2,
  Command
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface Loop {
  id: string;
  title: string;
  description: string | null;
  status: string;
  duration_seconds: number | null;
  started_at: string;
  participants: string[] | null;
  language: string | null;
}

/* -------------------------------------------------------------------------- */
/* Components: Meeting Archive Rows                                           */
/* -------------------------------------------------------------------------- */

const MeetingRow = ({ meeting, onOpen }: { meeting: Loop; onOpen: () => void }) => {
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0 min';
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const getStatusProgress = () => {
    switch (meeting.status) {
      case 'completed': return 0;
      case 'processing': return 80;
      case 'live': return 50;
      default: return 113;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.005, backgroundColor: "#F5F5F7" }}
      onClick={onOpen}
      className="w-full h-16 flex items-center px-4 mb-1 rounded-xl cursor-pointer transition-all duration-200 ease-out group border-b border-gray-50 last:border-none"
    >
      <div className="relative w-10 h-10 flex items-center justify-center mr-4">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="20" cy="20" r={18} fill="transparent" stroke="#E5E7EB" strokeWidth="2" />
          <circle 
            cx="20" cy="20" r={18} fill="transparent" 
            stroke={meeting.status === 'completed' ? '#34C759' : meeting.status === 'live' ? '#FF3B30' : '#86868B'} 
            strokeWidth="2" 
            strokeDasharray="113" 
            strokeDashoffset={getStatusProgress()}
            strokeLinecap="round" 
          />
        </svg>
        <Mic className="w-4 h-4 text-gray-600" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-semibold text-black truncate tracking-tight">{meeting.title}</h4>
        <div className="flex items-center gap-2 text-[12px] text-gray-500 font-medium">
          <span>{formatDuration(meeting.duration_seconds)}</span>
          {meeting.language && (
            <>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>{meeting.language}</span>
            </>
          )}
        </div>
      </div>

      <div className="hidden md:flex items-center -space-x-2 px-8">
        {(meeting.participants || []).slice(0, 3).map((_, i) => (
          <img 
            key={i} 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${meeting.id}${i}`} 
            className="h-6 w-6 rounded-full ring-2 ring-white bg-gray-100" 
            alt="participant"
          />
        ))}
        {!meeting.participants?.length && (
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${meeting.id}`} 
            className="h-6 w-6 rounded-full ring-2 ring-white bg-gray-100" 
            alt="participant"
          />
        )}
      </div>

      <div className="hidden sm:flex items-center gap-3 px-8">
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
          meeting.status === 'completed' ? 'bg-green-50 text-green-700' :
          meeting.status === 'live' ? 'bg-red-50 text-red-600' :
          'bg-gray-50 text-gray-600'
        }`}>
          {meeting.status}
        </div>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
        <div className="flex items-center gap-1 bg-white shadow-sm border border-black/5 rounded-full p-1">
          <button className="p-1.5 hover:bg-black/5 rounded-full transition-colors"><Play className="w-3.5 h-3.5 fill-black" /></button>
          <button className="p-1.5 hover:bg-black/5 rounded-full transition-colors"><Share2 className="w-3.5 h-3.5" /></button>
          <button className="p-1.5 hover:bg-black/5 rounded-full transition-colors"><MoreHorizontal className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN PAGE COMPONENT                                                        */
/* -------------------------------------------------------------------------- */

export default function LoopMeetings() {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);
  const [filter, setFilter] = useState('All');
  const [loops, setLoops] = useState<Loop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLoops = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('loops')
        .select('id, title, description, status, duration_seconds, started_at, participants, language')
        .eq('user_id', session.user.id)
        .order('started_at', { ascending: false });

      if (data) {
        setLoops(data as Loop[]);
      }
      setLoading(false);
    };

    fetchLoops();
  }, [navigate]);

  const getDateGroup = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM dd, yyyy');
  };

  const filteredLoops = loops.filter(loop => {
    if (searchQuery && !loop.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filter === 'All') return true;
    if (filter === 'Drafts') return loop.status === 'live';
    if (filter === 'Processed') return loop.status === 'completed';
    return true;
  });

  const groupedLoops = filteredLoops.reduce((acc, loop) => {
    const group = getDateGroup(loop.started_at);
    acc[group] = acc[group] || [];
    acc[group].push(loop);
    return acc;
  }, {} as Record<string, Loop[]>);

  const totalDuration = loops.reduce((acc, loop) => acc + (loop.duration_seconds || 0), 0);
  const hoursSaved = Math.floor(totalDuration / 3600);

  return (
    <div className="h-full px-12 py-10 overflow-y-auto custom-scroll flex flex-col">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-6xl serif-italic text-[#1D1D1F]">Meeting Archive</h1>
          <p className="text-sm font-medium text-[#86868B] mt-2 tracking-tight">
            {loops.length} Recordings • {hoursSaved}hrs Saved
          </p>
        </div>

        <div className="relative flex items-center">
          <motion.div 
            animate={{ width: searchFocused ? 384 : 320 }}
            className={`flex items-center h-10 px-4 bg-[#F5F5F7] rounded-full transition-shadow ${searchFocused ? 'ring-4 ring-indigo-500/10' : ''}`}
          >
            <Search className="w-4 h-4 text-gray-400 mr-3" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)} 
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent outline-none text-sm w-full font-medium" 
              placeholder="Search transcripts..." 
            />
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white rounded border border-black/5 text-[10px] font-bold text-gray-400 ml-2">
              <Command className="w-2 h-2" />
              <span>F</span>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="mt-8 mb-6 flex items-center gap-2 overflow-x-auto no-scrollbar p-1">
        {["All", "Drafts", "Processed", "Favorites", "Shared"].map(p => (
          <button 
            key={p} 
            onClick={() => setFilter(p)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${filter === p ? 'bg-[#1D1D1F] text-white shadow-md' : 'text-gray-500 border border-gray-100 hover:border-gray-200'}`}
          >
            {p}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredLoops.length > 0 ? (
        <div className="flex flex-col">
          {Object.keys(groupedLoops).map(group => (
            <div key={group} className="mb-6">
              <h3 className="sticky top-0 bg-white/90 backdrop-blur-sm py-2 text-[11px] font-bold text-[#86868B] uppercase tracking-[0.2em] mb-3 z-10">{group}</h3>
              <div className="flex flex-col">
                {groupedLoops[group].map(loop => (
                  <MeetingRow 
                    key={loop.id} 
                    meeting={loop} 
                    onOpen={() => navigate(`/loop/${loop.id}`)} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center pb-20">
          <FileText className="w-24 h-24 text-gray-200 mb-6" strokeWidth={1} />
          <h2 className="text-2xl font-medium text-[#1D1D1F]">No meetings yet</h2>
          <p className="text-gray-500 font-medium mt-2">Start your first Loop to see it here.</p>
        </div>
      )}
    </div>
  );
}
