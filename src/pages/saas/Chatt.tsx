import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Users, Minus, Square, X, 
  Paperclip, ChevronDown, LayoutGrid, 
  ChevronRight, FileText, Folder, Plus, Check,
  Video, MessageCircle, Sparkles, ArrowUp, GripVertical
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import SlashCommandMenu from '@/components/SlashCommandMenu';
import { Recipe } from '@/hooks/useRecipes';

interface RecentLoop {
  id: string;
  title: string;
  status: string;
  started_at: string;
  duration_seconds: number | null;
}

interface RecentChat {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

type RecentItem = 
  | { type: 'meeting'; data: RecentLoop; sortDate: Date }
  | { type: 'chat'; data: RecentChat; sortDate: Date };

interface AttachedSource {
  id: string;
  title: string;
  type: 'meeting' | 'chat';
}

// --- Custom SVGs for Slant/Slash Icons ---
const SlashIcon = ({ bgClass, textClass }) => (
  <div className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center font-bold text-[13px] italic shadow-sm shrink-0 ${bgClass} ${textClass}`}>
    /
  </div>
);

// --- Reusable Recipe Pill Component ---
const RecipePill = ({ text, bgClass, textClass, onClick }: { text: string; bgClass: string; textClass: string; onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2.5 bg-white border border-[#E5E5E5] rounded-[10px] pl-1.5 pr-3.5 py-1.5 shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 hover:border-[#D1D1D1] transition-all duration-300 active:scale-95 group"
  >
    <SlashIcon bgClass={bgClass} textClass={textClass} />
    <span className="text-[13.5px] font-medium text-[#1A1A1A] tracking-tight">{text}</span>
  </button>
);

// --- Reusable Recent Item Component ---
const RecentListItem = ({ icon: Icon, iconBg, iconBorder, iconColor, title, time, badge, badgeBg, badgeText, onClick, dragData }: {
  icon: any; iconBg: string; iconBorder: string; iconColor: string;
  title: string; time: string;
  badge: string; badgeBg: string; badgeText: string;
  onClick?: () => void;
  dragData?: { id: string; title: string; type: 'meeting' | 'chat' };
}) => (
  <div 
    onClick={onClick}
    draggable={!!dragData}
    onDragStart={(e) => {
      if (!dragData) return;
      e.dataTransfer.setData('application/json', JSON.stringify(dragData));
      e.dataTransfer.effectAllowed = 'copy';
      (e.currentTarget as HTMLElement).style.opacity = '0.5';
    }}
    onDragEnd={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
    className="flex items-center justify-between p-2 -mx-2 rounded-xl hover:bg-[#F5F4EF]/80 cursor-grab active:cursor-grabbing transition-colors group"
  >
    <div className="flex items-center gap-3 min-w-0">
      <div className="text-[#C2C2C2] group-hover:text-[#A3A3A3] transition-colors shrink-0 -mr-1"><GripVertical size={14} strokeWidth={2} /></div>
      <div className={`w-[34px] h-[34px] rounded-[8px] border ${iconBorder} ${iconBg} shadow-sm flex items-center justify-center shrink-0 transform transition-transform duration-300 group-hover:scale-105`}>
        <Icon size={16} className={iconColor} strokeWidth={2} />
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-[14px] font-medium text-[#1A1A1A] truncate">{title}</span>
        <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${badgeBg} ${badgeText}`}>{badge}</span>
      </div>
    </div>
    <span className="text-[13px] text-[#A3A3A3] font-medium pr-2 shrink-0 ml-3">{time}</span>
  </div>
);

// --- Custom SVGs for Models ---
const AnthropicIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#666666]">
    <path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7" />
  </svg>
);

const OpenAIIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#666666]">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
    <path d="M12 2v10l8.5 5M12 12L3.5 17M12 12l8.5-5" />
  </svg>
);

const GoogleGIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#666666]">
    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
  </svg>
);

const formatTimeAgo = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// --- Main Dashboard Component ---
export default function AskAnythingDashboard() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [useTranscripts, setUseTranscripts] = useState(false);
  
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);

  const [recentLoops, setRecentLoops] = useState<RecentLoop[]>([]);
  const [recentChats, setRecentChats] = useState<RecentChat[]>([]);
  const [loadingRecents, setLoadingRecents] = useState(true);

  const [attachedSources, setAttachedSources] = useState<AttachedSource[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const isSlashMenuOpen = inputValue.startsWith('/') && (!selectedRecipe || !inputValue.startsWith(`/${selectedRecipe.name}`));
  const slashQuery = isSlashMenuOpen ? inputValue.slice(1) : '';

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data?.id && data?.title) {
        setAttachedSources(prev => prev.some(s => s.id === data.id) ? prev : [...prev, { id: data.id, title: data.title, type: data.type || 'meeting' }]);
      }
    } catch {}
  };

  const handleSubmit = () => {
    let text = inputValue.trim();
    if (selectedRecipe && text.startsWith(`/${selectedRecipe.name}`)) {
      const extraText = text.slice(`/${selectedRecipe.name}`.length).trim();
      text = selectedRecipe.prompt + (extraText ? '\n\n' + extraText : '');
    }
    if (!text && attachedSources.length === 0) return;
    const meetingIds = attachedSources.filter(s => s.type === 'meeting').map(s => s.id);
    const chatIds = attachedSources.filter(s => s.type === 'chat').map(s => s.id);
    const params = new URLSearchParams();
    if (text) params.set('q', encodeURIComponent(text));
    if (meetingIds.length > 0) params.set('meetings', meetingIds.join(','));
    if (chatIds.length > 0) params.set('chats', chatIds.join(','));
    navigate(`/chat-preview?${params.toString()}`);
  };

  const contextRef = useRef(null);
  const modelRef = useRef(null);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch real recent loops AND chats from Supabase
  useEffect(() => {
    const fetchRecents = async () => {
      setLoadingRecents(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const [loopsRes, chatsRes] = await Promise.all([
          supabase
            .from('loops')
            .select('id, title, status, started_at, duration_seconds')
            .eq('user_id', session.user.id)
            .order('started_at', { ascending: false })
            .limit(5),
          supabase
            .from('chat_conversations')
            .select('id, title, created_at, updated_at')
            .eq('user_id', session.user.id)
            .order('updated_at', { ascending: false })
            .limit(5)
        ]);

        if (loopsRes.data && !loopsRes.error) {
          setRecentLoops(loopsRes.data as RecentLoop[]);
        }
        if (chatsRes.data && !chatsRes.error) {
          setRecentChats(chatsRes.data as RecentChat[]);
        }
      } catch (err) {
        console.error('Failed to fetch recents:', err);
      } finally {
        setLoadingRecents(false);
      }
    };

    fetchRecents();
  }, []);

  // Handle clicking outside to close popovers
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextRef.current && !contextRef.current.contains(e.target)) {
        setIsContextMenuOpen(false);
      }
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        setIsModelMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-full w-full bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black relative flex flex-col items-center pt-24 pb-12 overflow-y-auto">
      
      {/* --- Top Absolute Navigation & Controls --- */}
      <div className="absolute top-0 w-full px-5 pt-5 flex items-start justify-between z-20">
        {/* Left: Back/Users Button */}
        <button 
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-transparent text-[#666666] hover:text-[#1A1A1A] hover:bg-white hover:shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#D1D1D1] transition-all duration-300 active:scale-95 outline-none transform ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
        >
          <ChevronLeft size={16} strokeWidth={2.5} className="mr-[-2px]" />
          <Users size={16} strokeWidth={2} />
        </button>

        {/* Right: Window Controls */}
        <div 
          className={`flex items-center gap-5 text-[#808080] pt-1.5 transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
        >
          <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><Minus size={16} strokeWidth={1.5} /></button>
          <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><Square size={13} strokeWidth={1.5} /></button>
          <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><X size={18} strokeWidth={1.5} /></button>
        </div>
      </div>

      {/* --- Main Content Wrapper --- */}
      <div className="w-full max-w-[640px] flex flex-col z-10 px-4">
        
        {/* Heading */}
        <h1 
          className={`text-[28px] md:text-[32px] font-serif text-[#1A1A1A] tracking-tight mb-8 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          Ask anything
        </h1>

        {/* --- 1. Interactive Search Input Card --- */}
        <div 
          className={`relative z-20 bg-white rounded-[20px] p-4 flex flex-col transition-all duration-500 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${
            isDragOver
              ? 'border-[#A2B64F] shadow-[0_8px_30px_rgba(162,182,79,0.15)] bg-[#FCFDF7]'
              : isInputFocused 
                ? 'border-[#C2C2C2] shadow-[0_8px_30px_rgba(0,0,0,0.08)]' 
                : 'border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.05)] hover:border-[#D1D1D1]'
          } border`}
          style={{ transitionDelay: '0.2s' }}
          onClick={() => setIsInputFocused(true)}
          onMouseLeave={() => { setIsInputFocused(false); setIsDragOver(false); }}
          onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          {/* Drop indicator */}
          {isDragOver && (
            <div className="flex items-center justify-center py-2 text-[13px] text-[#7A8B37] font-medium animate-pulse border-b border-[#E4EAC0] mb-2">
              <Sparkles size={14} strokeWidth={2} className="mr-1.5" /> Drop to add as source
            </div>
          )}

          {/* Attached Sources Chips */}
          {attachedSources.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {attachedSources.map(s => (
                <div key={s.id} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 shadow-sm animate-[popIn_0.2s_ease-out_both] border ${
                  s.type === 'meeting' 
                    ? 'bg-[#ECFAE1] border-[#C5E8B0]' 
                    : 'bg-[#EDE6FA] border-[#D4C5F0]'
                }`}>
                  {s.type === 'meeting' 
                    ? <Video size={12} className="text-[#3E7A2D]" strokeWidth={2} />
                    : <MessageCircle size={12} className="text-[#7B4DC7]" strokeWidth={2} />
                  }
                  <span className={`text-[12px] font-medium max-w-[140px] truncate ${
                    s.type === 'meeting' ? 'text-[#3E7A2D]' : 'text-[#7B4DC7]'
                  }`}>{s.title}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setAttachedSources(prev => prev.filter(x => x.id !== s.id)); }}
                    className="text-[#C2C2C2] hover:text-[#1A1A1A] transition-colors"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Top Context Pill */}
          <div className="relative" ref={contextRef}>
            <div 
              className="flex items-center w-max bg-white border border-[#E5E5E5] rounded-full px-3 py-1.5 text-[13px] shadow-sm cursor-pointer hover:bg-[#FAFAFA] transition-colors group"
              onClick={(e) => { e.stopPropagation(); setIsContextMenuOpen(!isContextMenuOpen); }}
            >
              <span className="font-semibold text-[#1A1A1A]">My notes</span>
              <span className="text-[#808080] ml-1.5 mr-1 group-hover:text-[#404040] transition-colors">All meetings</span>
              <ChevronDown size={14} className={`text-[#808080] group-hover:text-[#1A1A1A] transition-transform duration-300 ${isContextMenuOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
            </div>

            {/* Context Popover */}
            {isContextMenuOpen && (
              <div 
                className="absolute top-[calc(100%+8px)] left-0 bg-white border border-[#E5E5E5] rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-2.5 w-[220px] z-50 animate-[popIn_0.2s_ease-out_both] origin-top-left cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-1 py-0.5">
                  <span className="text-[14px] font-medium text-[#1A1A1A]">Use transcripts</span>
                  <button 
                    className={`w-9 h-5 rounded-full relative transition-colors duration-300 focus:outline-none ${useTranscripts ? 'bg-[#A2B64F]' : 'bg-[#D4D4D4]'}`}
                    onClick={() => setUseTranscripts(!useTranscripts)}
                  >
                    <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-transform duration-300 shadow-sm ${useTranscripts ? 'left-[19px]' : 'left-[3px]'}`}></div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Text Area */}
          <div className="w-full mt-4 relative">
            {isSlashMenuOpen && (
              <SlashCommandMenu
                query={slashQuery}
                position="bottom"
                onClose={() => setInputValue('')}
                onSelect={(recipe) => {
                  setSelectedRecipe(recipe);
                  setInputValue(`/${recipe.name} `);
                }}
              />
            )}
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => {
                const val = e.target.value;
                setInputValue(val);
                if (selectedRecipe && !val.startsWith(`/${selectedRecipe.name}`)) {
                  setSelectedRecipe(null);
                }
              }}
              onKeyDown={(e) => { 
                if (e.key === 'Enter' && !e.shiftKey && !isSlashMenuOpen) { 
                  e.preventDefault(); 
                  handleSubmit(); 
                } 
              }}
              placeholder={attachedSources.length > 0 ? `Ask about ${attachedSources.length} source${attachedSources.length > 1 ? 's' : ''}...` : "What did we talk about yesterday?"}
              className={`w-full bg-transparent outline-none text-[15.5px] placeholder-[#808080] transition-colors ${isInputFocused ? 'text-[#1A1A1A]' : 'text-[#404040]'}`}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="p-1.5 rounded-full hover:bg-[#F5F5F5] transition-colors text-[#808080] group-hover:text-[#1A1A1A]">
                <Paperclip size={18} strokeWidth={2} />
              </div>
              
              <div className="relative" ref={modelRef}>
                <div 
                  className="flex items-center gap-1 text-[13px] font-medium text-[#666666] group-hover:text-[#1A1A1A] transition-colors px-1 py-0.5 rounded-md hover:bg-[#F5F5F5]"
                  onClick={(e) => { e.stopPropagation(); setIsModelMenuOpen(!isModelMenuOpen); }}
                >
                  Sonnet 4.6 <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-300 ${isModelMenuOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Model Menu Popover */}
                {isModelMenuOpen && (
                  <div 
                    className="absolute top-[calc(100%+8px)] left-0 w-[220px] bg-white border border-[#E5E5E5] rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2 z-50 animate-[popIn_0.2s_ease-out_both] origin-top-left cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="mb-1 text-[12px] font-bold text-[#A3A3A3] px-2 pt-1 tracking-wide">Standard Models</div>
                    <div className="flex flex-col gap-0.5 mb-3">
                      <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-[#F5F5F5] cursor-pointer">
                        <div className="flex items-center gap-2.5">
                           <AnthropicIcon />
                           <span className="text-[13.5px] font-medium text-[#1A1A1A]">Sonnet 4.6</span>
                        </div>
                        <Check size={14} className="text-[#1A1A1A]" strokeWidth={2.5} />
                      </div>
                      <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-[#F5F5F5] cursor-pointer">
                        <div className="flex items-center gap-2.5">
                           <OpenAIIcon />
                           <span className="text-[13.5px] font-medium text-[#1A1A1A]">GPT-5.4</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-1 text-[12px] font-bold text-[#A3A3A3] px-2 tracking-wide">Thinking Models</div>
                    <div className="flex flex-col gap-0.5 pb-1">
                      <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-[#F5F5F5] cursor-pointer">
                        <div className="flex items-center gap-2.5">
                           <AnthropicIcon />
                           <span className="text-[13.5px] font-medium text-[#1A1A1A]">Sonnet 4.6 Thinking</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-[#F5F5F5] cursor-pointer">
                        <div className="flex items-center gap-2.5">
                           <AnthropicIcon />
                           <span className="text-[13.5px] font-medium text-[#1A1A1A]">Opus 4.6</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-[#F5F5F5] cursor-pointer">
                        <div className="flex items-center gap-2.5">
                           <OpenAIIcon />
                           <span className="text-[13.5px] font-medium text-[#1A1A1A]">GPT-5.4 Thinking</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-[#F5F5F5] cursor-pointer">
                        <div className="flex items-center gap-2.5">
                           <GoogleGIcon />
                           <span className="text-[13.5px] font-medium text-[#1A1A1A]">Gemini 3.1 Pro</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            

            <button 
              onClick={(e) => { e.stopPropagation(); handleSubmit(); }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 ${
                inputValue.trim() || attachedSources.length > 0
                  ? 'bg-[#546522] text-white hover:bg-[#43521b] shadow-sm'
                  : 'bg-[#F0F0F0] text-[#C2C2C2] cursor-not-allowed'
              }`}
              disabled={!inputValue.trim() && attachedSources.length === 0}
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* --- 2. Recipes Section --- */}
        <div 
          className={`mt-8 mb-8 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.3s' }}
        >
          <h3 className="text-[12.5px] font-semibold text-[#808080] mb-3 px-1 tracking-wide">
            Recipes
          </h3>
          
          <div className="flex flex-wrap gap-3">
            <RecipePill text="List recent todos" bgClass="bg-[#E4F4D6]" textClass="text-[#3E7A2D]" onClick={() => navigate('/chat-preview?recipe=List+recent+todos')} />
            <RecipePill text="Coach me Matt" bgClass="bg-[#FCEFCA]" textClass="text-[#A07D22]" onClick={() => navigate('/chat-preview?recipe=Coach+me+Matt')} />
            <RecipePill text="Write weekly recap" bgClass="bg-[#FCECDA]" textClass="text-[#C96B2E]" onClick={() => navigate('/chat-preview?recipe=Write+weekly+recap')} />
            <RecipePill text="Streamline my calendar" bgClass="bg-[#DCE6FA]" textClass="text-[#3B66B5]" onClick={() => navigate('/chat-preview?recipe=Streamline+my+calendar')} />
            <RecipePill text="Blind spots" bgClass="bg-[#F0F4E3]" textClass="text-[#7A8B37]" onClick={() => navigate('/chat-preview?recipe=Blind+spots')} />
            
            {/* See All Button */}
            <button 
              onClick={() => navigate('/recipes')}
              className="flex items-center gap-1.5 bg-white border border-[#E5E5E5] rounded-[10px] pl-3 pr-2.5 py-1.5 shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 hover:border-[#D1D1D1] transition-all duration-300 active:scale-95 group"
            >
              <LayoutGrid size={14} className="text-[#808080] group-hover:text-[#1A1A1A] transition-colors" strokeWidth={2} />
              <span className="text-[13.5px] font-medium text-[#1A1A1A] ml-0.5">See all</span>
              <ChevronRight size={14} className="text-[#808080] group-hover:text-[#1A1A1A] transition-colors" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* --- 3. Recents Section (Meetings + Chats) --- */}
        <div 
          className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.4s' }}
        >
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-[12.5px] font-semibold text-[#808080] tracking-wide">
              Recents
            </h3>
            <button 
              onClick={() => navigate('/meetings')}
              className="flex items-center gap-1 text-[12.5px] font-semibold text-[#808080] hover:text-[#1A1A1A] transition-colors cursor-pointer"
            >
              See all <Plus size={12} strokeWidth={3} />
            </button>
          </div>
          
          {loadingRecents ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#E5E5E5] border-t-[#1A1A1A]"></div>
            </div>
          ) : (() => {
            // Combine meetings and chats into a single sorted list
            const combined: RecentItem[] = [
              ...recentLoops.map(loop => ({
                type: 'meeting' as const,
                data: loop,
                sortDate: new Date(loop.started_at),
              })),
              ...recentChats.map(chat => ({
                type: 'chat' as const,
                data: chat,
                sortDate: new Date(chat.updated_at),
              })),
            ]
              .sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime())
              .slice(0, 8);

            return combined.length > 0 ? (
              <div className="flex flex-col gap-1">
                {combined.map(item => {
                  if (item.type === 'meeting') {
                    return (
                      <RecentListItem
                        key={`meeting-${item.data.id}`}
                        icon={Video}
                        iconBg="bg-[#ECFAE1]"
                        iconBorder="border-[#C5E8B0]"
                        iconColor="text-[#3E7A2D]"
                        title={item.data.title}
                        time={formatTimeAgo(item.data.started_at)}
                        badge="Meeting"
                        badgeBg="bg-[#E4F4D6]"
                        badgeText="text-[#3E7A2D]"
                        onClick={() => navigate(`/loop/${item.data.id}`)}
                        dragData={{ id: item.data.id, title: item.data.title, type: 'meeting' }}
                      />
                    );
                  } else {
                    return (
                      <RecentListItem
                        key={`chat-${item.data.id}`}
                        icon={MessageCircle}
                        iconBg="bg-[#EDE6FA]"
                        iconBorder="border-[#D4C5F0]"
                        iconColor="text-[#7B4DC7]"
                        title={item.data.title || 'New chat'}
                        time={formatTimeAgo(item.data.updated_at)}
                        badge="Chat"
                        badgeBg="bg-[#EDE6FA]"
                        badgeText="text-[#7B4DC7]"
                        onClick={() => navigate(`/chat-preview?conv=${item.data.id}`)}
                        dragData={{ id: item.data.id, title: item.data.title || 'New chat', type: 'chat' }}
                      />
                    );
                  }
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="w-10 h-10 text-[#E5E5E5] mb-3" strokeWidth={1} />
                <p className="text-[13px] text-[#808080]">No recent activity yet</p>
              </div>
            );
          })()}
        </div>

      </div>

      {/* Global Animation Styles */}
      <style>
        {`
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
          @keyframes eq {
            0%, 100% { transform: scaleY(0.5); }
            50% { transform: scaleY(1); }
          }
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.95) translateY(-5px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}
      </style>
    </div>
  );
}