import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { 
  ChevronLeft, User, Minus, Square, X, 
  Globe, CheckCircle2, Bookmark, Search, 
  LayoutGrid, ChevronDown, Plus, Play, 
  Info, FileText, Layers, AlertTriangle, Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SYSTEM_RECIPES } from '@/data/systemRecipes';

// --- Custom Icons & Logos ---

const LoopSwirlLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
    <path d="M12 12c0-1.5-1-2-2-2s-2 .5-2 2 1 3 3 3 4-1 4-4-2-5-5-5-6 2-6 6 3 8 8 8 9-4 9-10" />
  </svg>
);

const DiamondIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
  </svg>
);

const SlashIcon = ({ bgClass, textClass }) => (
  <div className={`w-[26px] h-[26px] rounded-[6px] flex items-center justify-center font-bold text-[14px] italic shadow-sm shrink-0 ${bgClass} ${textClass} transition-transform duration-300 group-hover:scale-110`}>
    /
  </div>
);

// --- Window Controls ---
const WindowControls = () => (
  <div className="flex items-center gap-5 text-[#808080]">
    <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><Minus size={16} strokeWidth={1.5} /></button>
    <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><Square size={13} strokeWidth={1.5} /></button>
    <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><X size={18} strokeWidth={1.5} /></button>
  </div>
);

// --- Reusable Recipe Card Component ---
const RecipeCard = ({ title, desc, bgClass, textClass, author, avatar, uses, isBrand, delay }: { title: string; desc: string; bgClass: string; textClass: string; author: string; avatar?: string; uses: string; isBrand: boolean; delay: string }) => {
  return (
    <div 
      className="bg-white border border-[#E5E5E5] rounded-[16px] p-5 flex flex-col group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-[#D1D1D1] transition-all duration-400 ease-out animate-[fadeUp_0.6s_ease-out_both] min-h-[190px]"
      style={{ animationDelay: delay }}
    >
      <SlashIcon bgClass={bgClass} textClass={textClass} />
      
      <div className="mt-4 mb-2">
        <h3 className="text-[15px] font-bold text-[#1A1A1A] leading-tight group-hover:text-[#4B5921] transition-colors">{title}</h3>
      </div>
      
      <p className="text-[13px] text-[#737373] leading-[1.45] line-clamp-2 flex-1">
        {desc}
      </p>
      
      <div className="mt-4 flex items-center justify-between text-[12px] text-[#808080] font-medium pt-3 border-t border-transparent group-hover:border-[#F0F0F0] transition-colors">
        <div className="flex items-center gap-2">
          {isBrand ? (
            <LoopSwirlLogo className="w-4 h-4 text-[#4B5921]" />
          ) : (
            <img src={avatar} alt={author} className="w-5 h-5 rounded-full grayscale group-hover:grayscale-0 transition-all duration-300 object-cover" />
          )}
          <span className="truncate max-w-[120px]">{author}</span>
        </div>
        <div className="flex items-center gap-1">
          <DiamondIcon />
          <span>{uses}</span>
        </div>
      </div>
    </div>
  );
};

// --- Create Recipe Modal Component ---
const CreateRecipeModal = ({ isOpen, onClose, onSaved }: { isOpen: boolean; onClose: () => void; onSaved?: () => void }) => {
  const [name, setName] = useState('');
  const [madeFor, setMadeFor] = useState('single');
  const [prompt, setPrompt] = useState('');
  const [saving, setSaving] = useState(false);
  
  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);

  // Check if user has entered any data
  const isDirty = name.trim() !== '' || prompt.trim() !== '';
  const canSave = name.trim() !== '' && prompt.trim() !== '';

  const handleCloseAttempt = () => {
    if (isDirty) {
      setIsConfirmCloseOpen(true);
    } else {
      onClose();
    }
  };

  const handleForceClose = () => {
    setIsConfirmCloseOpen(false);
    setName('');
    setPrompt('');
    setMadeFor('single');
    onClose();
  };

  if (!isOpen && !isConfirmCloseOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Dark Blur Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"></div>
      
      {/* Main Modal Content */}
      <div className={`relative w-full max-w-[1000px] h-[85vh] bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden transform origin-bottom ${!isConfirmCloseOpen ? 'animate-[popIn_0.3s_ease-out_both]' : ''}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-3">
            <div className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center font-bold text-[13px] italic bg-gradient-to-br from-[#D6E4F0] to-[#E9D6F4] text-[#1A1A1A] shadow-sm">
              /
            </div>
            <span className="text-[16px] font-bold text-[#1A1A1A]">New recipe</span>
          </div>
          <button 
            onClick={handleCloseAttempt}
            className="text-[#A3A3A3] hover:text-[#1A1A1A] transition-colors p-1 active:scale-95"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center py-10 px-6">
          <div className="w-full max-w-[580px] flex flex-col gap-8">
            
            {/* Recipe Name Field */}
            <div>
              <label className="text-[13px] font-semibold text-[#666666] mb-2 block">Recipe name</label>
              <div className="flex items-center gap-3 w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-[10px] p-1.5 focus-within:border-[#C2C2C2] focus-within:bg-white focus-within:shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-200">
                <div className="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center font-bold text-[14px] italic bg-gradient-to-br from-[#D6E4F0] to-[#E9D6F4] text-[#1A1A1A] shadow-sm shrink-0 ml-1">
                  /
                </div>
                <input 
                  type="text" 
                  placeholder="New recipe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[15px] text-[#1A1A1A] placeholder-[#A3A3A3] pb-0.5"
                  autoFocus
                />
              </div>
            </div>

            {/* Made For Field */}
            <div>
              <label className="text-[13px] font-semibold text-[#666666] mb-2 block">Made for</label>
              <div className="grid grid-cols-2 gap-4">
                {/* Single Meeting Card */}
                <div 
                  className={`p-4 rounded-[12px] border cursor-pointer transition-all duration-200 ${madeFor === 'single' ? 'bg-white border-[#84963C] shadow-[0_0_0_1px_rgba(132,150,60,1)]' : 'bg-white border-[#E5E5E5] hover:border-[#C2C2C2] hover:bg-[#FAFAFA]'}`}
                  onClick={() => setMadeFor('single')}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-[4px] bg-[#EAF2D7] flex items-center justify-center">
                        <FileText size={12} className="text-[#698229]" />
                      </div>
                      <span className="text-[14px] font-bold text-[#1A1A1A]">Single meeting</span>
                    </div>
                    <p className="text-[12.5px] text-[#737373] leading-[1.4]">Use this recipe during or after an individual meeting</p>
                  </div>
                </div>

                {/* Multiple Meetings Card */}
                <div 
                  className={`p-4 rounded-[12px] border cursor-pointer transition-all duration-200 ${madeFor === 'multiple' ? 'bg-white border-[#84963C] shadow-[0_0_0_1px_rgba(132,150,60,1)]' : 'bg-white border-[#E5E5E5] hover:border-[#C2C2C2] hover:bg-[#FAFAFA]'}`}
                  onClick={() => setMadeFor('multiple')}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-[4px] bg-[#E8EDF5] flex items-center justify-center">
                        <Layers size={12} className="text-[#5B799B]" />
                      </div>
                      <span className="text-[14px] font-bold text-[#1A1A1A]">Multiple meetings</span>
                    </div>
                    <p className="text-[12.5px] text-[#737373] leading-[1.4]">Use this recipe across meetings, folders, people or companies</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Field */}
            <div>
              <label className="text-[13px] font-semibold text-[#666666] mb-2 block">Prompt</label>
              <div className="relative">
                <textarea 
                  placeholder="Summarize the main concerns or blockers mentioned in this meeting" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-[240px] bg-[#FAFAFA] border border-[#E5E5E5] rounded-[12px] p-4 pb-16 outline-none text-[15px] text-[#1A1A1A] placeholder-[#A3A3A3] resize-none focus:border-[#C2C2C2] focus:bg-white focus:shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-200 font-sans italic"
                />
                
                {/* Embedded Test Recipe Button */}
                <button className="absolute bottom-4 left-4 bg-white border border-[#E5E5E5] rounded-full pl-2 pr-3 py-1.5 flex items-center gap-1.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95 text-[#A3A3A3] hover:text-[#1A1A1A]">
                  <Play size={14} fill="currentColor" />
                  <span className="text-[13px] font-semibold text-[#666666] group-hover:text-[#1A1A1A]">Test recipe</span>
                </button>
              </div>
            </div>

            {/* Hint / Inspiration */}
            <div className="flex items-center gap-1.5 text-[13px] text-[#808080]">
              <Info size={14} strokeWidth={2} />
              <span>Need inspiration? <a href="#" className="underline decoration-[#D1D1D1] hover:text-[#1A1A1A] hover:decoration-[#1A1A1A] transition-colors underline-offset-[3px] font-medium">Read the guide to writing great recipes.</a></span>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#F0F0F0] flex items-center justify-between bg-white relative z-10">
          <button 
            onClick={handleCloseAttempt}
            className="px-6 py-2.5 rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#1A1A1A] text-[13.5px] font-bold transition-all active:scale-95 shadow-sm"
          >
            Cancel
          </button>
          
          <button 
            onClick={async () => {
              if (!canSave || saving) return;
              setSaving(true);
              try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) throw new Error('Not authenticated');
                const { error } = await supabase.from('recipes').insert({
                  user_id: user.id,
                  name: name.trim(),
                  description: '',
                  prompt: prompt.trim(),
                  icon: '/',
                  category: madeFor === 'single' ? 'writing' : 'productivity',
                  is_system: false,
                });
                if (error) throw error;
                toast.success('Recipe created!');
                setName('');
                setPrompt('');
                setMadeFor('single');
                onSaved?.();
                onClose();
              } catch (err: any) {
                toast.error(err.message || 'Could not save recipe');
              } finally {
                setSaving(false);
              }
            }}
            disabled={!canSave || saving}
            className={`px-6 py-2.5 rounded-full text-[13.5px] font-bold transition-all duration-300 flex items-center gap-2 ${
              canSave && !saving
                ? 'bg-[#1A1A1A] text-white hover:bg-black shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] active:scale-95 cursor-pointer' 
                : 'bg-[#F5F5F5] text-[#A3A3A3] cursor-not-allowed'
            }`}
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>

      </div>

      {/* Secondary Confirmation Dialog Modal */}
      {isConfirmCloseOpen && (
        <div className="absolute inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-[16px] shadow-[0_24px_60px_rgba(0,0,0,0.2)] w-full max-w-[400px] p-6 animate-[popIn_0.2s_ease-out_both] flex flex-col">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600">
                <AlertTriangle size={20} strokeWidth={2.5} />
              </div>
              <div className="pt-1">
                <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-1.5 leading-tight">Are you sure you want to close?</h3>
                <p className="text-[14px] text-[#666666] leading-relaxed">You have unsaved changes. If you close now, your new recipe will be lost.</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-2">
              <button 
                onClick={() => setIsConfirmCloseOpen(false)}
                className="px-5 py-2.5 rounded-[8px] bg-white border border-[#E5E5E5] text-[#1A1A1A] text-[13px] font-bold hover:bg-[#FAFAFA] transition-all active:scale-95 shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleForceClose}
                className="px-5 py-2.5 rounded-[8px] bg-red-600 hover:bg-red-700 text-white text-[13px] font-bold transition-all shadow-sm active:scale-95"
              >
                Close without saving
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #E0E0E0;
            border-radius: 10px;
            border: 2px solid white;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #C2C2C2;
          }
        `}
      </style>
    </div>,
    document.body
  );
};

// --- Mock Data Array ---
const recipesData = [
  { title: 'List recent todos', desc: 'Extracts and displays your outstanding to-dos from recent meeting notes.', bgClass: 'bg-[#E4F4D6]', textClass: 'text-[#3E7A2D]', author: 'Loop', isBrand: true, uses: '81k' },
  { title: 'Show in flight projects', desc: 'Generates a status overview of in-flight initiatives from meeting notes.', bgClass: 'bg-[#FCECDA]', textClass: 'text-[#C96B2E]', author: 'Loop', isBrand: true, uses: '1.1k' },
  { title: 'List outstanding items', desc: 'Extracts all open action items, commitments, and deferred questions from meeting notes into a...', bgClass: 'bg-[#DCE6FA]', textClass: 'text-[#3B66B5]', author: 'Loop', isBrand: true, uses: '613' },
  { title: 'Prep next meeting', desc: 'Generates a pre-call cheat sheet for a meeting based on provided notes.', bgClass: 'bg-[#FCE2F0]', textClass: 'text-[#B04285]', author: 'Loop', isBrand: true, uses: '11k' },
  { title: 'Assess company health', desc: 'Turns meeting notes into an account brief covering customer overview, relationships, current state, futu...', bgClass: 'bg-[#DCE6FA]', textClass: 'text-[#3B66B5]', author: 'Loop', isBrand: true, uses: '154' },
  { title: 'Summarize this folder', desc: 'Summarizes a folder\'s contents, highlighting recurring themes, priorities, and feedback for a quic...', bgClass: 'bg-[#DCE6FA]', textClass: 'text-[#3B66B5]', author: 'Loop', isBrand: true, uses: '3.5k' },
  { title: 'List key decisions', desc: 'Extracts key decisions from recent team notes to brief absent members.', bgClass: 'bg-[#D6F4F0]', textClass: 'text-[#2D7A75]', author: 'Loop', isBrand: true, uses: '284' },
  { title: 'Catch me up', desc: 'Provides a concise, informal, and opinionated summary of key company events from the past wee...', bgClass: 'bg-[#E4F4D6]', textClass: 'text-[#3E7A2D]', author: 'Loop', isBrand: true, uses: '851' },
  { title: 'Blind spots', desc: 'Analyzes meeting notes to identify risks, concerns, blind spots, and attack vectors, providing mitigation...', bgClass: 'bg-[#FCEFCA]', textClass: 'text-[#A07D22]', author: 'Tom (Engineer at Loop)', avatar: 'https://i.pravatar.cc/150?img=11', isBrand: false, uses: '6.8k' },
  { title: 'Help me decide', desc: 'Applies decision-making frameworks to a stated problem and suggests resources for further...', bgClass: 'bg-[#FCECDA]', textClass: 'text-[#C96B2E]', author: 'Nabeel Hyatt', avatar: 'https://i.pravatar.cc/150?img=60', isBrand: false, uses: '3.3k' },
  { title: 'Streamline my calendar', desc: 'Suggests three things to improve your week', bgClass: 'bg-[#DCE6FA]', textClass: 'text-[#3B66B5]', author: 'Peter Yang', avatar: 'https://i.pravatar.cc/150?img=33', isBrand: false, uses: '3.7k' },
  { title: 'Write weekly recap', desc: 'Generates a weekly recap of accomplishments for your team.', bgClass: 'bg-[#FCECDA]', textClass: 'text-[#C96B2E]', author: 'Loop', isBrand: true, uses: '12k' },
];

export default function RecipesDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState('Discover');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userRecipes, setUserRecipes] = useState<{ id: string; name: string; description: string; prompt: string; icon: string; category: string }[]>([]);

  const fetchUserRecipes = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from('recipes')
      .select('id, name, description, prompt, icon, category')
      .eq('user_id', user.id)
      .eq('is_system', false)
      .order('created_at', { ascending: false });
    if (data) setUserRecipes(data);
  };

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    fetchUserRecipes();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black relative flex flex-col pt-5 px-4 md:px-8 pb-12">
      
      {/* --- Top Navigation & Window Controls --- */}
      <div className="w-full flex items-start justify-between z-20 mb-8">
        {/* Left: Back & User Button */}
        <button 
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-transparent text-[#666666] hover:text-[#1A1A1A] hover:bg-white hover:shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#D1D1D1] transition-all duration-300 active:scale-95 outline-none transform ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
        >
          <ChevronLeft size={16} strokeWidth={2.5} className="mr-[-4px]" />
          <User size={15} strokeWidth={2} />
        </button>

        {/* Right: Window Controls */}
        <div 
          className={`pt-1.5 transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
        >
          <WindowControls />
        </div>
      </div>

      {/* --- Main Content Container --- */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col">
        
        {/* Header Area */}
        <div 
          className={`flex items-center justify-between mb-6 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div>
            <h1 className="text-[28px] md:text-[32px] font-serif text-[#1A1A1A] tracking-tight mb-1 leading-none">
              Recipes
            </h1>
            <p className="text-[14px] text-[#737373]">
              Create, share and browse really good prompts
            </p>
          </div>
          
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#1A1A1A] hover:bg-[#000000] text-white px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] active:scale-95 flex items-center gap-1.5"
          >
            Create <Plus size={14} strokeWidth={3} />
          </button>
        </div>

        {/* Banner: What's a recipe? */}
        <div 
          className={`mb-6 overflow-hidden transition-all duration-500 ease-out transform ${isVisible && showBanner ? 'opacity-100 translate-y-0 max-h-[160px]' : 'opacity-0 -translate-y-4 max-h-0'}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="bg-[#F2F5E8] border border-[#E5EAD0] rounded-[16px] p-5 flex justify-between items-stretch shadow-sm relative overflow-hidden group">
            
            {/* Left Content */}
            <div className="flex flex-col relative z-10 w-[60%]">
              <span className="text-[14px] font-bold text-[#1A1A1A] mb-1.5">What's a recipe?</span>
              <span className="text-[13px] text-[#555555] leading-[1.5] mb-4 pr-4">
                Go faster with Recipes in Loop - simple shortcuts that put all your most used prompts at your fingertips.
              </span>
              <div className="flex items-center gap-3">
                <button className="bg-white border border-[#E5EAD0] hover:border-[#C4D92E] text-[#1A1A1A] px-4 py-1.5 rounded-[8px] text-[13px] font-bold transition-all shadow-sm active:scale-95">
                  Learn more
                </button>
                <button 
                  className="text-[#84963C] hover:text-[#1A1A1A] text-[13px] font-semibold transition-colors active:scale-95"
                  onClick={() => setShowBanner(false)}
                >
                  Dismiss
                </button>
              </div>
            </div>

            {/* Right Side Visual (Overlapping Pills) */}
            <div className="absolute right-0 top-0 bottom-0 w-[40%] pointer-events-none">
              {/* Fade gradient mask */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F2F5E8] via-transparent to-transparent z-10"></div>
              
              <div className="absolute right-[-40px] top-[15px] transform rotate-[-8deg] transition-transform duration-700 group-hover:rotate-[-4deg] group-hover:translate-x-2">
                <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-full pl-1.5 pr-4 py-1.5 shadow-sm mb-2 w-[220px]">
                  <SlashIcon bgClass="bg-[#D6F4F0]" textClass="text-[#2D7A75]" />
                  <span className="text-[13px] font-medium text-[#1A1A1A]">Suggest topics</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-full pl-1.5 pr-4 py-1.5 shadow-sm mb-2 w-[220px] translate-x-4">
                  <SlashIcon bgClass="bg-[#E4F4D6]" textClass="text-[#3E7A2D]" />
                  <span className="text-[13px] font-medium text-[#1A1A1A]">Recap my week</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-full pl-1.5 pr-4 py-1.5 shadow-sm w-[220px] translate-x-8">
                  <SlashIcon bgClass="bg-[#FCECDA]" textClass="text-[#C96B2E]" />
                  <span className="text-[13px] font-medium text-[#1A1A1A]">List action items</span>
                </div>
              </div>
            </div>
            
            {/* Top Right Close 'X' */}
            <button 
              className="absolute top-4 right-4 text-[#84963C] hover:text-[#1A1A1A] transition-colors p-1 rounded-md hover:bg-[#E4EAC0]/50 active:scale-95 z-20"
              onClick={() => setShowBanner(false)}
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Filters & Actions Bar */}
        <div 
          className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.3s' }}
        >
          {/* Left Tabs */}
          <div className="flex items-center bg-transparent">
            <button 
              onClick={() => setActiveTab('Discover')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all duration-300 active:scale-95 ${activeTab === 'Discover' ? 'bg-white border border-[#E5E5E5] text-[#1A1A1A] shadow-[0_2px_8px_rgba(0,0,0,0.04)]' : 'text-[#808080] hover:text-[#1A1A1A] hover:bg-[#EAE8DF]/50 border border-transparent'}`}
            >
              <Globe size={14} className={activeTab === 'Discover' ? 'text-[#1A1A1A]' : 'text-[#A3A3A3]'} strokeWidth={2.5} />
              Discover
            </button>
            <button 
              onClick={() => setActiveTab('My recipes')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all duration-300 active:scale-95 ${activeTab === 'My recipes' ? 'bg-white border border-[#E5E5E5] text-[#1A1A1A] shadow-[0_2px_8px_rgba(0,0,0,0.04)]' : 'text-[#808080] hover:text-[#1A1A1A] hover:bg-[#EAE8DF]/50 border border-transparent'}`}
            >
              <CheckCircle2 size={14} className={activeTab === 'My recipes' ? 'text-[#1A1A1A]' : 'text-[#A3A3A3]'} strokeWidth={2.5} />
              My recipes
            </button>
            <button 
              onClick={() => setActiveTab('Workspace')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all duration-300 active:scale-95 ${activeTab === 'Workspace' ? 'bg-white border border-[#E5E5E5] text-[#1A1A1A] shadow-[0_2px_8px_rgba(0,0,0,0.04)]' : 'text-[#808080] hover:text-[#1A1A1A] hover:bg-[#EAE8DF]/50 border border-transparent'}`}
            >
              <Bookmark size={14} className={activeTab === 'Workspace' ? 'text-[#1A1A1A]' : 'text-[#A3A3A3]'} strokeWidth={2.5} />
              Workspace
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex items-center group">
              <Search size={14} className="absolute left-3 text-[#A3A3A3] group-hover:text-[#666666] transition-colors" strokeWidth={2} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white border border-[#E5E5E5] rounded-full py-1.5 pl-8 pr-4 text-[13px] text-[#1A1A1A] placeholder-[#A3A3A3] outline-none hover:border-[#C2C2C2] focus:border-[#A2B64F] focus:shadow-[0_0_0_2px_rgba(162,182,79,0.1)] transition-all w-[180px]"
              />
            </div>
            
            {/* Grid Icon */}
            <button className="text-[#808080] hover:text-[#1A1A1A] transition-colors active:scale-95 p-1 rounded-md hover:bg-[#EAE8DF]">
              <LayoutGrid size={16} strokeWidth={2} />
            </button>

            {/* Scope Dropdown Pill */}
            <button className="flex items-center gap-1.5 bg-[#F0F4E3] border border-[#E4EAC0] hover:bg-[#EAF0D1] text-[#546522] px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all active:scale-95 group">
              Across meetings
              <ChevronDown size={14} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* --- Recipes Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 pb-10">
          {activeTab === 'Discover' && recipesData.map((recipe, index) => (
            <RecipeCard 
              key={index}
              {...recipe}
              delay={`${(index * 0.08) + 0.4}s`}
            />
          ))}
          {activeTab === 'My recipes' && (
            <>
              {/* System recipes */}
              {SYSTEM_RECIPES.map((recipe, index) => (
                <RecipeCard 
                  key={recipe.id}
                  title={recipe.name}
                  desc={recipe.description}
                  bgClass="bg-[#E4F4D6]"
                  textClass="text-[#3E7A2D]"
                  author="Loop"
                  isBrand={true}
                  uses={recipe.icon}
                  delay={`${(index * 0.08) + 0.4}s`}
                />
              ))}
              {/* User-created recipes */}
              {userRecipes.map((recipe, index) => (
                <RecipeCard 
                  key={recipe.id}
                  title={recipe.name}
                  desc={recipe.description || recipe.prompt.slice(0, 80) + '...'}
                  bgClass="bg-[#DCE6FA]"
                  textClass="text-[#3B66B5]"
                  author="You"
                  isBrand={false}
                  avatar=""
                  uses="Custom"
                  delay={`${((SYSTEM_RECIPES.length + index) * 0.08) + 0.4}s`}
                />
              ))}
              {SYSTEM_RECIPES.length === 0 && userRecipes.length === 0 && (
                <div className="col-span-3 flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-[14px] text-[#86868B]">No recipes yet</p>
                  <p className="text-[12px] text-[#C7C7CC] mt-1">Create your first recipe to get started</p>
                </div>
              )}
            </>
          )}
          {activeTab === 'Workspace' && recipesData.filter(r => r.isBrand).map((recipe, index) => (
            <RecipeCard 
              key={index}
              {...recipe}
              delay={`${(index * 0.08) + 0.4}s`}
            />
          ))}
        </div>

      </div>

      {/* Render the Create Recipe Modal */}
      <CreateRecipeModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSaved={fetchUserRecipes}
      />

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
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.95) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}
      </style>
    </div>
  );
}