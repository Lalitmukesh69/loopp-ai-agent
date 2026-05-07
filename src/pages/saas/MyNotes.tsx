import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Home, Minus, Square, X, 
  Lock, Folder, ChevronDown, Paperclip, Mic, 
  LayoutGrid, FileText, Clock, Plus, FolderPlus, MoreHorizontal, FolderInput
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import SlashCommandMenu from '@/components/SlashCommandMenu';
import { Recipe } from '@/hooks/useRecipes';

interface NoteItem {
  id: string;
  title: string;
  status: string;
  started_at: string;
  duration_seconds: number | null;
  summary: string | null;
  folder_id: string | null;
}

interface FolderItem {
  id: string;
  name: string;
  color: string | null;
}

const FOLDER_COLORS = ['#4B8BBE','#E55986','#A2B64F','#C96B2E','#7A8B37','#3B66B5','#808080','#9B59B6'];

const InlineSlashIcon = () => (
  <div className="w-[18px] h-[18px] rounded-[4px] border border-[#E5E5E5] flex items-center justify-center bg-white shadow-sm shrink-0">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#A3A3A3]"><line x1="18" y1="6" x2="6" y2="18"/></svg>
  </div>
);

const InlineRecipe = ({ text, onClick }: { text: string; onClick?: () => void }) => (
  <button onClick={onClick} className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-[#F5F5F5] transition-colors active:scale-95 group">
    <InlineSlashIcon />
    <span className="text-[13px] font-medium text-[#737373] group-hover:text-[#1A1A1A] transition-colors tracking-tight">{text}</span>
  </button>
);

const getTimeLabel = (dateStr: string) => new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

const getDateGroup = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() - new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
};

export default function MyNotesDashboard() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState(FOLDER_COLORS[0]);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [moveMenuId, setMoveMenuId] = useState<string | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [droppedMeetings, setDroppedMeetings] = useState<{id: string; title: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  const moveRef = useRef<HTMLDivElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const isSlashMenuOpen = chatInput.startsWith('/') && (!selectedRecipe || !chatInput.startsWith(`/${selectedRecipe.name}`));
  const slashQuery = isSlashMenuOpen ? chatInput.slice(1) : '';

  useEffect(() => { setTimeout(() => setIsVisible(true), 100); }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (moveRef.current && !moveRef.current.contains(e.target as Node)) setMoveMenuId(null); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/auth'); return; }

      const [loopsRes, foldersRes] = await Promise.all([
        supabase.from('loops').select('id, title, status, started_at, duration_seconds, summary, folder_id').eq('user_id', session.user.id).order('started_at', { ascending: false }).limit(20),
        supabase.from('folders').select('id, name, color').eq('user_id', session.user.id).order('created_at', { ascending: false }),
      ]);

      if (loopsRes.data) setNotes(loopsRes.data as NoteItem[]);
      if (foldersRes.data) setFolders(foldersRes.data as FolderItem[]);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [navigate]);

  const createFolder = async () => {
    if (!newFolderName.trim() || creatingFolder) return;
    setCreatingFolder(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { error } = await supabase.from('folders').insert({ name: newFolderName.trim(), color: newFolderColor, user_id: session.user.id });
      if (!error) {
        setNewFolderName('');
        setShowNewFolder(false);
        fetchData();
      } else { console.error('Create folder error:', error); }
    } catch (err) { console.error(err); }
    finally { setCreatingFolder(false); }
  };

  const moveToFolder = async (loopId: string, folderId: string | null) => {
    setMovingId(loopId);
    try {
      const { error } = await supabase.from('loops').update({ folder_id: folderId }).eq('id', loopId);
      if (!error) { setNotes(prev => prev.map(n => n.id === loopId ? { ...n, folder_id: folderId } : n)); }
    } catch (err) { console.error(err); }
    finally { setMovingId(null); setMoveMenuId(null); }
  };

  useEffect(() => { if (showNewFolder && folderInputRef.current) folderInputRef.current.focus(); }, [showNewFolder]);

  const grouped = notes.reduce((a, n) => { const g = getDateGroup(n.started_at); (a[g] = a[g] || []).push(n); return a; }, {} as Record<string, NoteItem[]>);
  const getFolderName = (id: string | null) => folders.find(f => f.id === id)?.name || null;

  const handleChatSubmit = () => {
    let text = chatInput.trim();
    if (selectedRecipe && text.startsWith(`/${selectedRecipe.name}`)) {
      const extraText = text.slice(`/${selectedRecipe.name}`.length).trim();
      text = selectedRecipe.prompt + (extraText ? '\n\n' + extraText : '');
    }
    if (text) {
      const meetingIds = droppedMeetings.map(m => m.id).join(',');
      navigate(`/chat-preview?q=${encodeURIComponent(text)}&meetings=${meetingIds}`);
    }
  };

  return (
    <div className="h-full bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black relative flex flex-col items-center overflow-y-auto pt-24 pb-12">
      <div className="absolute top-0 w-full px-5 pt-5 flex items-start justify-between z-20">
        <button onClick={() => navigate('/home')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-transparent text-[#666666] hover:text-[#1A1A1A] hover:bg-white hover:shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#D1D1D1] transition-all duration-300 active:scale-95 outline-none transform ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <ChevronLeft size={16} strokeWidth={2.5} className="mr-[-2px]" /><Home size={15} strokeWidth={2} />
        </button>
        <div className={`flex items-center gap-5 text-[#808080] pt-1.5 transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><Minus size={16} strokeWidth={1.5} /></button>
          <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><Square size={13} strokeWidth={1.5} /></button>
          <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><X size={18} strokeWidth={1.5} /></button>
        </div>
      </div>

      <div className="w-full max-w-[680px] flex flex-col z-10 px-4">
        {/* Header */}
        <div className={`flex flex-col items-center text-center mb-8 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
          <div className="w-[34px] h-[34px] rounded-xl bg-[#EAE8DF] flex items-center justify-center mb-4 shadow-sm border border-[#E0DED5]"><Lock size={15} className="text-[#555555]" strokeWidth={2} /></div>
          <h1 className="text-[32px] md:text-[36px] font-serif text-[#1A1A1A] tracking-tight mb-2">My notes</h1>
          <div className="flex items-center justify-center text-[12px] font-medium text-[#808080] gap-1.5">
            <Lock size={10} strokeWidth={2.5} /><span>Your private notes and folders</span><span className="mx-0.5">·</span>
            <Folder size={11} strokeWidth={2} /><span>{folders.length} {folders.length === 1 ? 'folder' : 'folders'}</span>
            <span className="mx-0.5">·</span><FileText size={11} strokeWidth={2} /><span>{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
          </div>
        </div>

        {/* Banner */}
        <div className={`mb-8 overflow-hidden transition-all duration-500 ease-out transform ${isVisible && showBanner ? 'opacity-100 translate-y-0 max-h-[100px]' : 'opacity-0 -translate-y-4 max-h-0'}`} style={{ transitionDelay: '0.2s' }}>
          <div className="bg-[#F0F6FF] border border-[#DCE4F0] rounded-[12px] p-4 flex justify-between items-start shadow-sm">
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#1A1A1A] mb-0.5">Your private space</span>
              <span className="text-[13px] text-[#556A85]">Your notes live here by default. Nothing gets shared until you choose to share it.</span>
            </div>
            <button className="text-[#85A0C2] hover:text-[#1A1A1A] transition-colors p-0.5 rounded-md hover:bg-[#E0EBF8] active:scale-95" onClick={() => setShowBanner(false)}><X size={15} strokeWidth={2.5} /></button>
          </div>
        </div>

        {/* Chat Dock */}
        <div className={`relative z-20 bg-white rounded-[24px] p-3 flex flex-col gap-3 transition-all duration-500 ease-out transform mb-4 border ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isDragOver ? 'border-[#A2B64F] shadow-[0_8px_30px_rgba(162,182,79,0.15)] bg-[#FCFDF7]' : isInputFocused ? 'border-[#C2C2C2] shadow-[0_8px_30px_rgba(0,0,0,0.08)]' : 'border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.05)] hover:border-[#D1D1D1]'}`} style={{ transitionDelay: '0.3s' }} onClick={() => setIsInputFocused(true)} onMouseLeave={() => setIsInputFocused(false)} onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; setIsDragOver(true); }} onDragLeave={() => setIsDragOver(false)} onDrop={(e) => { e.preventDefault(); setIsDragOver(false); try { const data = JSON.parse(e.dataTransfer.getData('application/json')); if (data?.id && data?.title) { setDroppedMeetings(prev => prev.some(m => m.id === data.id) ? prev : [...prev, data]); } } catch {} }}>
          <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E5E5] rounded-full w-max shadow-sm cursor-pointer hover:bg-[#FAFAFA] transition-colors group">
            <Lock size={12} className="text-[#808080] group-hover:text-[#1A1A1A] transition-colors" strokeWidth={2.5} /><span className="text-[12.5px] font-semibold text-[#1A1A1A]">My notes</span><ChevronDown size={14} className="text-[#808080] group-hover:text-[#1A1A1A] transition-colors" strokeWidth={2.5} />
          </div>
          {/* Dropped meeting chips */}
          {droppedMeetings.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-2">
              {droppedMeetings.map(m => (
                <div key={m.id} className="flex items-center gap-1.5 bg-[#F0F4E3] border border-[#E4EAC0] rounded-full px-2.5 py-1 animate-[popIn_0.25s_ease-out_both]">
                  <FileText size={11} className="text-[#546522]" strokeWidth={2} />
                  <span className="text-[12px] font-medium text-[#546522] max-w-[120px] truncate">{m.title}</span>
                  <button onClick={(e) => { e.stopPropagation(); setDroppedMeetings(prev => prev.filter(x => x.id !== m.id)); }} className="text-[#8A9B55] hover:text-[#1A1A1A] transition-colors"><X size={12} strokeWidth={2.5} /></button>
                </div>
              ))}
            </div>
          )}
          {isDragOver && (
            <div className="flex items-center justify-center py-2 text-[13px] text-[#7A8B37] font-medium animate-pulse">
              <Plus size={14} strokeWidth={2.5} className="mr-1" /> Drop meeting here to add context
            </div>
          )}
          <div className="flex items-center justify-between px-2 pb-1 relative">
            {isSlashMenuOpen && (
              <SlashCommandMenu
                query={slashQuery}
                position="bottom"
                onClose={() => setChatInput('')}
                onSelect={(recipe) => {
                  setSelectedRecipe(recipe);
                  setChatInput(`/${recipe.name} `);
                }}
              />
            )}
            <div className="flex-1 flex items-center"><input type="text" value={chatInput} onChange={e => { const val = e.target.value; setChatInput(val); if (selectedRecipe && !val.startsWith(`/${selectedRecipe.name}`)) setSelectedRecipe(null); }} onKeyDown={e => { if (e.key === 'Enter' && !isSlashMenuOpen) { e.preventDefault(); handleChatSubmit(); } }} placeholder={droppedMeetings.length > 0 ? `Ask about ${droppedMeetings.length} meeting${droppedMeetings.length > 1 ? 's' : ''}...` : 'Ask anything'} className={`w-full bg-transparent outline-none text-[15px] placeholder-[#808080] transition-colors ${isInputFocused ? 'text-[#1A1A1A]' : 'text-[#404040]'}`} onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} /></div>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1 text-[12.5px] font-medium text-[#666666] hover:text-[#1A1A1A] cursor-pointer transition-colors px-2 py-1 rounded-md hover:bg-[#F5F5F5]">Sonnet 4.6 <ChevronDown size={14} strokeWidth={2.5} /></div>
              <button className="text-[#808080] hover:text-[#1A1A1A] transition-colors p-1.5 rounded-full hover:bg-[#F5F5F5]"><Paperclip size={16} strokeWidth={2} /></button>
              <button onClick={() => { if (!isSlashMenuOpen) handleChatSubmit(); }} className="w-8 h-8 rounded-full bg-[#546522] flex items-center justify-center text-white hover:bg-[#43521b] transition-colors active:scale-95 ml-0.5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg></button>
            </div>
          </div>
        </div>

        {/* Inline Recipes */}
        <div className={`flex items-center justify-between mb-8 px-1 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.4s' }}>
          <div className="flex items-center gap-1 flex-wrap">
            <InlineRecipe text="Write weekly recap" onClick={() => navigate('/chat-preview?recipe=Write+weekly+recap')} />
            <InlineRecipe text="Coach me Matt" onClick={() => navigate('/chat-preview?recipe=Coach+me+Matt')} />
            <InlineRecipe text="List recent todos" onClick={() => navigate('/chat-preview?recipe=List+recent+todos')} />
          </div>
          <button onClick={() => navigate('/recipe')} className="flex items-center gap-1.5 text-[13px] font-medium text-[#808080] hover:text-[#1A1A1A] transition-colors group shrink-0 ml-4"><LayoutGrid size={14} strokeWidth={2} className="group-hover:text-[#1A1A1A] transition-colors" /> All recipes</button>
        </div>

        <div className={`w-full h-[1px] bg-[#E5E5E5] mb-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.5s' }}></div>

        {/* Folders Section */}
        <div className={`mb-6 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.55s' }}>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-[12px] font-bold text-[#808080]">Folders</h3>
            <button onClick={() => setShowNewFolder(true)} className="flex items-center gap-1 text-[12px] font-semibold text-[#808080] hover:text-[#1A1A1A] transition-colors cursor-pointer"><FolderPlus size={13} strokeWidth={2} /> New folder</button>
          </div>

          {/* New Folder Form */}
          {showNewFolder && (
            <div className="bg-white border border-[#E5E5E5] rounded-[14px] p-4 mb-3 shadow-sm animate-[popIn_0.2s_ease-out_both]">
              <input ref={folderInputRef} type="text" value={newFolderName} onChange={e => setNewFolderName(e.target.value)} onKeyDown={e => e.key === 'Enter' && createFolder()} placeholder="Folder name" className="w-full bg-transparent outline-none text-[14px] font-medium text-[#1A1A1A] placeholder-[#C2C2C2] mb-3" />
              <div className="flex items-center gap-2 mb-3">
                {FOLDER_COLORS.map(c => (<button key={c} onClick={() => setNewFolderColor(c)} className={`w-5 h-5 rounded-full transition-all ${newFolderColor === c ? 'ring-2 ring-offset-2 ring-[#1A1A1A] scale-110' : 'hover:scale-110'}`} style={{ backgroundColor: c }} />))}
              </div>
              <div className="flex items-center gap-2 justify-end">
                <button onClick={() => { setShowNewFolder(false); setNewFolderName(''); }} className="px-3 py-1.5 text-[12px] font-semibold text-[#808080] hover:text-[#1A1A1A] transition-colors rounded-lg hover:bg-[#F5F5F5]">Cancel</button>
                <button onClick={createFolder} disabled={!newFolderName.trim() || creatingFolder} className="px-4 py-1.5 text-[12px] font-bold text-white bg-[#1A1A1A] rounded-lg hover:bg-[#333] transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">{creatingFolder ? 'Creating...' : 'Create'}</button>
              </div>
            </div>
          )}

          {/* Folder List */}
          {folders.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {folders.map(f => (
                <button key={f.id} onClick={() => navigate(`/folder/${f.id}`)} className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E5E5E5] rounded-[10px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95 group">
                  <div className="w-4 h-4 rounded-[4px] shrink-0" style={{ backgroundColor: f.color || '#808080' }}></div>
                  <span className="text-[13px] font-medium text-[#1A1A1A]">{f.name}</span>
                  <span className="text-[11px] text-[#A3A3A3] font-medium">{notes.filter(n => n.folder_id === f.id).length}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={`w-full h-[1px] bg-[#E5E5E5] mb-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Notes Section */}
        <div className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.6s' }}>
          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-6 w-6 border-2 border-[#E5E5E5] border-t-[#1A1A1A]"></div></div>
          ) : notes.length > 0 ? (
            <div className="flex flex-col gap-6">
              {Object.keys(grouped).map(group => (
                <div key={group}>
                  <h3 className="text-[12px] font-bold text-[#808080] mb-3 px-1">{group}</h3>
                  <div className="flex flex-col gap-0.5">
                    {grouped[group].map(note => (
                      <div key={note.id} draggable className="flex items-center justify-between p-2.5 -mx-2.5 hover:bg-[#F5F4EF]/80 rounded-xl cursor-grab group transition-colors active:cursor-grabbing" onDragStart={(e) => { e.dataTransfer.setData('application/json', JSON.stringify({ id: note.id, title: note.title })); e.dataTransfer.effectAllowed = 'copy'; (e.currentTarget as HTMLElement).style.opacity = '0.5'; (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }} onDragEnd={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}>
                        {/* Left side — clickable */}
                        <div className="flex items-center gap-3.5 flex-1 min-w-0" onClick={() => navigate(`/loop/${note.id}`)}>
                          <div className="w-[36px] h-[36px] rounded-[10px] border border-[#E5E5E5] bg-white flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-[#D1D1D1] shrink-0"><FileText size={16} className="text-[#666666]" strokeWidth={2} /></div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[14.5px] font-semibold text-[#1A1A1A] leading-tight mb-0.5 truncate">{note.title}</span>
                            <div className="flex items-center gap-2 text-[12.5px] text-[#808080] leading-tight group-hover:text-[#666666]">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${note.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : note.status === 'live' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'}`}>{note.status}</span>
                              {note.duration_seconds != null && note.duration_seconds > 0 && (<span className="flex items-center gap-0.5"><Clock size={10} strokeWidth={2} />{Math.floor(note.duration_seconds / 60)} min</span>)}
                              {note.folder_id && (<span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-[#F0F0F0] rounded font-medium"><Folder size={9} strokeWidth={2} />{getFolderName(note.folder_id)}</span>)}
                            </div>
                          </div>
                        </div>

                        {/* Right side — actions */}
                        <div className="flex items-center gap-2 text-[#A3A3A3] pr-1 shrink-0 relative" ref={moveMenuId === note.id ? moveRef : undefined}>
                          <button onClick={e => { e.stopPropagation(); setMoveMenuId(moveMenuId === note.id ? null : note.id); }} className="p-1 rounded-md hover:bg-[#F0F0F0] text-[#C2C2C2] hover:text-[#808080] transition-all opacity-0 group-hover:opacity-100" title="Move to folder"><FolderInput size={14} strokeWidth={2} /></button>
                          <Lock size={12} strokeWidth={2.5} className="group-hover:text-[#808080] transition-colors" />
                          <span className="text-[12.5px] font-medium group-hover:text-[#808080] transition-colors">{getTimeLabel(note.started_at)}</span>

                          {/* Move to folder dropdown */}
                          {moveMenuId === note.id && (
                            <div className="absolute right-0 top-8 bg-white border border-[#E5E5E5] rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-2 w-[200px] z-50 animate-[popIn_0.2s_ease-out_both]" onClick={e => e.stopPropagation()}>
                              <div className="text-[11px] font-bold text-[#A3A3A3] px-2 py-1">Move to folder</div>
                              {note.folder_id && (
                                <button onClick={() => moveToFolder(note.id, null)} disabled={movingId === note.id} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#F5F5F5] text-left transition-colors">
                                  <X size={14} className="text-[#808080]" strokeWidth={2} /><span className="text-[13px] font-medium text-[#808080]">Remove from folder</span>
                                </button>
                              )}
                              {folders.length > 0 ? folders.map(f => (
                                <button key={f.id} onClick={() => moveToFolder(note.id, f.id)} disabled={movingId === note.id || note.folder_id === f.id} className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#F5F5F5] text-left transition-colors ${note.folder_id === f.id ? 'opacity-50' : ''}`}>
                                  <div className="w-3.5 h-3.5 rounded-[3px] shrink-0" style={{ backgroundColor: f.color || '#808080' }}></div>
                                  <span className="text-[13px] font-medium text-[#1A1A1A]">{f.name}</span>
                                  {note.folder_id === f.id && <span className="text-[10px] text-[#A3A3A3] ml-auto">Current</span>}
                                </button>
                              )) : (<div className="px-2 py-3 text-[12px] text-[#A3A3A3] text-center">No folders yet</div>)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FileText className="w-16 h-16 text-[#E5E5E5] mb-4" strokeWidth={1} />
              <h3 className="text-[17px] font-serif text-[#1A1A1A] mb-1">No notes yet</h3>
              <p className="text-[14px] text-[#808080] mb-6">Start a meeting to create your first note</p>
              <button onClick={() => navigate('/loop/new')} className="bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#1A1A1A] border border-[#E5E5E5] px-6 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer">Quick Meeting</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.95) translateY(-5px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}