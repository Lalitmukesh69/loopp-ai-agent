import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, Home, AudioLines,
  MoreHorizontal, Calendar, Users, FolderPlus, 
  Clock, Sparkles, Save, Loader2, RefreshCw,
  CheckCircle2, ListChecks, MessageSquare, Copy, Check,
  Trash2, ThumbsUp, ThumbsDown, Share
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import InteractiveRecordingDock from '../../components/BottomDock';
import VerticalChatPanel from '../../components/VerticalChatPanel';
import { useRecording } from '@/contexts/RecordingContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { marked } from 'marked';
import TurndownService from 'turndown';

const turndownService = new TurndownService({ headingStyle: 'atx' });

const MetaTag = ({ icon: Icon, text, onClick, delay }: { icon: any; text: string; onClick?: () => void; delay: string }) => (
  <button onClick={onClick}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-transparent text-[13px] font-medium text-[#666666] hover:text-[#1A1A1A] hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#D1D1D1] transition-all duration-300 active:scale-95 outline-none cursor-pointer">
    <Icon size={14} strokeWidth={2} className="text-[#808080]" />
    {text}
  </button>
);

const TabButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button onClick={onClick}
    className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${active ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#666666] hover:bg-[#EAE8DF] hover:text-[#1A1A1A]'}`}>
    {label}
  </button>
);

interface LoopData {
  id: string; title: string; status: string; transcript: string | null;
  summary: string | null; started_at: string; ended_at: string | null;
  duration_seconds: number | null; folder_id: string | null;
}

interface FolderOption { id: string; name: string; }

interface MinutesData {
  summary: string; keyPoints: string[]; actionItems: string[];
  decisions: string[]; attendees: string[]; rewrittenNotes?: string;
}

export default function LoopPreviewScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recording = useRecording();
  const [activeTab, setActiveTab] = useState<'notes' | 'transcript' | 'ai'>('notes');
  const [noteContent, setNoteContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [loop, setLoop] = useState<LoopData | null>(null);
  const [title, setTitle] = useState('New note');
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState<FolderOption[]>([]);
  const [showFolderPicker, setShowFolderPicker] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [transcriptSegments, setTranscriptSegments] = useState<{ chunk_text: string; timestamp_ms: number }[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [minutes, setMinutes] = useState<MinutesData | null>(null);
  const [rewrittenNotes, setRewrittenNotes] = useState<string>('');
  const [showRewritten, setShowRewritten] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const editorRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && document.activeElement !== editorRef.current) {
      editorRef.current.innerHTML = marked.parse(noteContent || '') as string;
    }
  }, [noteContent]);

  // Fetch loop data from backend
  useEffect(() => {
    if (!id) { setLoading(false); return; }

    const fetchLoop = async () => {
      const { data } = await supabase.from('loops').select('*').eq('id', id).maybeSingle();
      if (data) {
        setLoop(data);
        // Only update title from DB if user hasn't modified it locally
        if (!title || title === 'New note' || title === 'Untitled Meeting' || title === 'Quick Meeting') {
          setTitle(data.title || 'Untitled Meeting');
        }
        setSelectedFolderId(data.folder_id);
        // Parse saved minutes from summary field
        if (data.summary) {
          try {
            const parsed = JSON.parse(data.summary);
            if (parsed?.summary) {
              setMinutes(parsed);
              if (parsed.rewrittenNotes) setRewrittenNotes(parsed.rewrittenNotes);
              setActiveTab('ai'); // Auto-show AI summary if it exists
            }
          } catch { /* not JSON, use as plain summary */ }
        }
        // If AI is still generating, show the AI tab with spinner
        if (data.status === 'processing' || data.status === 'live') {
          setActiveTab('ai');
        }
      }

      // Fetch transcript segments
      const { data: segments } = await supabase.from('transcripts')
        .select('chunk_text, timestamp_ms').eq('loop_id', id)
        .order('chunk_index', { ascending: true });
      if (segments) setTranscriptSegments(segments);

      // Fetch notes
      const { data: notes } = await supabase.from('notes')
        .select('content, rewritten_content').eq('loop_id', id)
        .order('created_at', { ascending: true });
      if (notes && notes.length > 0) {
        setNoteContent(notes.map(n => n.content).filter(Boolean).join('\n\n'));
        const rw = notes.find(n => n.rewritten_content);
        if (rw?.rewritten_content) setRewrittenNotes(rw.rewritten_content);
      }
      setLoading(false);
      
      return data;
    };
    fetchLoop();
  }, [id]);

  // Auto-refresh: poll for updates while loop is processing (AI generating)
  useEffect(() => {
    if (!id) return;
    const isProcessing = loop?.status === 'processing' || loop?.status === 'live';
    if (!isProcessing) return;

    const pollInterval = setInterval(async () => {
      const { data } = await supabase.from('loops').select('*').eq('id', id).maybeSingle();
      if (data) {
        setLoop(data);
        // Update title if AI auto-named it
        setTitle(data.title || 'Untitled Meeting');
        
        if (data.summary) {
          try {
            const parsed = JSON.parse(data.summary);
            if (parsed?.summary) {
              setMinutes(parsed);
              if (parsed.rewrittenNotes) setRewrittenNotes(parsed.rewrittenNotes);
              setActiveTab('ai'); // Auto-switch to AI tab
            }
          } catch { /* ignore */ }
        }

        // Also refresh notes
        const { data: notes } = await supabase.from('notes')
          .select('content, rewritten_content').eq('loop_id', id)
          .order('created_at', { ascending: true });
        if (notes && notes.length > 0) {
          const rw = notes.find(n => n.rewritten_content);
          if (rw?.rewritten_content) {
            setRewrittenNotes(rw.rewritten_content);
            setShowRewritten(true);
          }
        }

        // Stop polling once completed
        if (data.status === 'completed') {
          clearInterval(pollInterval);
          toast.success('AI summary & notes ready!');
        }
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [id, loop?.status]);

  // Fetch folders
  useEffect(() => {
    const fetchFolders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('folders').select('id, name')
        .eq('user_id', user.id).order('created_at', { ascending: true });
      if (data) setFolders(data);
    };
    fetchFolders();
  }, []);

  const handleTitleBlur = useCallback(async () => {
    if (!id || !title.trim()) return;
    await supabase.from('loops').update({ title: title.trim() }).eq('id', id);
  }, [id, title]);

  const handleNoteBlur = useCallback(async () => {
    if (!id || !noteContent.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: existing } = await supabase.from('notes').select('id').eq('loop_id', id).maybeSingle();
    if (existing) {
      await supabase.from('notes').update({ content: noteContent }).eq('id', existing.id);
    } else {
      await supabase.from('notes').insert({ loop_id: id, user_id: user.id, content: noteContent });
    }
  }, [id, noteContent]);

  const handleSaveToNotes = useCallback(async (content: string) => {
    setNoteContent(prev => {
      const newContent = prev ? `${prev}\n\n${content}` : content;
      
      const saveToDb = async () => {
        if (!id) return;
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data: existing } = await supabase.from('notes').select('id').eq('loop_id', id).maybeSingle();
        if (existing) {
          await supabase.from('notes').update({ content: newContent }).eq('id', existing.id);
        } else {
          await supabase.from('notes').insert({ loop_id: id, user_id: user.id, content: newContent });
        }
      };
      
      saveToDb();
      return newContent;
    });
  }, [id]);

  // Save & Generate: saves notes, triggers AI summary + note rewrite
  const handleSaveAndGenerate = async () => {
    if (!id) return;
    setIsSaving(true);
    try {
      // Save notes first
      await handleNoteBlur();
      await handleTitleBlur();

      // Call generate-minutes with notes + transcript
      const fullTranscript = loop?.transcript || transcriptSegments.map(s => s.chunk_text).join(' ');
      const { data, error } = await supabase.functions.invoke('generate-minutes', {
        body: { loopId: id, transcript: fullTranscript, title, notes: noteContent },
      });

      if (error) throw error;
      if (data?.minutes) {
        setMinutes(data.minutes);
        if (data.minutes.rewrittenNotes) {
          setRewrittenNotes(data.minutes.rewrittenNotes);
          setShowRewritten(true);
        }
        // Refresh loop data
        const { data: updated } = await supabase.from('loops').select('*').eq('id', id).maybeSingle();
        if (updated) setLoop(updated);
        toast.success('Meeting saved & AI summary generated!');
        setActiveTab('ai');
      }
    } catch (err: any) {
      console.error('Save error:', err);
      toast.error(err.message || 'Failed to generate summary');
    } finally {
      setIsSaving(false);
    }
  };

  const assignFolder = async (folderId: string) => {
    if (!id) return;
    await supabase.from('loops').update({ folder_id: folderId }).eq('id', id);
    setSelectedFolderId(folderId);
    setShowFolderPicker(false);
    toast.success('Added to folder');
  };

  const formatTimestamp = (ms: number) => {
    const mins = Math.floor(ms / 60000).toString().padStart(2, '0');
    const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const copyMinutes = () => {
    if (!minutes) return;
    const text = `Minutes of Meeting\n\nTitle: ${title}\nSummary: ${minutes.summary}\n\nKey Points:\n${minutes.keyPoints.map(p => `• ${p}`).join('\n')}\n\nAction Items:\n${minutes.actionItems.map(a => `☐ ${a}`).join('\n')}\n\nDecisions:\n${minutes.decisions.map(d => `✓ ${d}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied to clipboard');
  };

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      // Delete related data first
      await supabase.from('notes').delete().eq('loop_id', id);
      await supabase.from('transcripts').delete().eq('loop_id', id);
      await supabase.from('loops').delete().eq('id', id);
      toast.success('Meeting deleted');
      navigate('/home');
    } catch (err: any) {
      console.error('Delete error:', err);
      toast.error('Failed to delete meeting');
    } finally {
      setIsDeleting(false);
      setShowMoreMenu(false);
    }
  };

  // Close more menu on outside click
  useEffect(() => {
    if (!showMoreMenu) return;
    const handleClickOutside = () => setShowMoreMenu(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMoreMenu]);

  const selectedFolderName = folders.find(f => f.id === selectedFolderId)?.name;
  const isRecordingActive = recording.status === 'recording';

  return (
    <div className="h-screen bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black flex flex-row overflow-hidden relative">
      <div className="flex-1 flex flex-col pt-5 px-4 md:px-8 pb-48 relative overflow-y-auto custom-scroll">
        
        {/* Top Nav */}
        <div className="w-full flex items-start justify-between z-20 mb-8">
          <button onClick={() => navigate('/home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-transparent text-[#666666] hover:text-[#1A1A1A] hover:bg-white hover:shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#D1D1D1] transition-colors duration-300 active:scale-95 outline-none cursor-pointer">
            <ChevronLeft size={16} strokeWidth={2.5} className="mr-[-4px]" />
            <Home size={15} strokeWidth={2} />
          </button>

          <div className="flex items-center gap-2 pt-1.5">
            {/* Save Button */}
            <button onClick={handleSaveAndGenerate} disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1A1A1A] text-white text-[13px] font-bold hover:bg-black transition-all active:scale-95 shadow-sm disabled:opacity-50 cursor-pointer">
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} strokeWidth={2} />}
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setShowMoreMenu(!showMoreMenu); }}
                className="hover:text-black transition-colors cursor-pointer active:scale-95 text-[#808080]">
                <MoreHorizontal size={16} strokeWidth={2} />
              </button>
              {showMoreMenu && (
                <div className="absolute right-0 top-full mt-2 w-[200px] bg-white rounded-xl border border-[#E5E5E5] shadow-lg py-1 z-50 animate-[fadeUp_0.15s_ease-out_both]">
                  <button onClick={handleDelete} disabled={isDeleting}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50">
                    {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    {isDeleting ? 'Deleting...' : 'Delete meeting'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-[760px] mx-auto flex flex-col flex-1 pt-8 md:pt-12">
          {/* Title */}
          <div className="mb-6">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={handleTitleBlur}
              className="w-full bg-transparent border-none outline-none text-[28px] md:text-[32px] font-serif text-[#1A1A1A] tracking-tight placeholder-[#A3A3A3]"
              placeholder="Note title" />
            {isRecordingActive && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[12px] font-bold text-red-500 tracking-wider uppercase">Recording — {recording.recordingTime}</span>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-2 mb-6 flex-wrap relative">
            <MetaTag icon={Calendar} text={loop?.started_at ? new Date(loop.started_at).toLocaleDateString() : 'Today'} delay="0.2s" />
            <MetaTag icon={Users} text="Me" delay="0.3s" />
            <div className="relative">
              <MetaTag icon={FolderPlus} text={selectedFolderName || 'Add to folder'} onClick={() => setShowFolderPicker(!showFolderPicker)} delay="0.4s" />
              {showFolderPicker && (
                <div className="absolute top-full mt-2 left-0 w-[200px] bg-white rounded-xl border border-[#E5E5E5] shadow-lg py-1 z-50">
                  {folders.length === 0 ? (
                    <p className="text-[13px] text-[#86868B] px-3 py-2">No folders yet</p>
                  ) : folders.map(f => (
                    <button key={f.id} onClick={() => assignFolder(f.id)}
                      className={`w-full text-left px-3 py-2 text-[13px] hover:bg-[#F5F5F7] transition-colors ${f.id === selectedFolderId ? 'font-bold text-[#1A1A1A]' : 'text-[#404040]'}`}>
                      📁 {f.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {loop?.duration_seconds ? <MetaTag icon={Clock} text={`${Math.floor(loop.duration_seconds / 60)} min`} delay="0.5s" /> : null}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-6 p-1 bg-[#EDEDEB] rounded-full w-fit">
            <TabButton label={showRewritten ? "Pro Notes" : "Notes"} active={activeTab === 'notes'} onClick={() => setActiveTab('notes')} />
            <TabButton label="Transcript" active={activeTab === 'transcript'} onClick={() => setActiveTab('transcript')} />
            <TabButton label="AI Summary" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} />
          </div>

          {/* Tab Content */}
          <div className="flex-1 flex flex-col relative">
            
            {/* NOTES TAB */}
            {activeTab === 'notes' && (
              <div className="flex-1 flex flex-col">
                {showRewritten && rewrittenNotes ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-[#FFD60A]" />
                        <span className="text-[12px] font-bold text-[#808080] uppercase tracking-wider">AI-Enhanced Notes</span>
                      </div>
                      <button onClick={() => setShowRewritten(false)} className="text-[12px] text-[#4B8BBE] hover:underline cursor-pointer">
                        View raw notes
                      </button>
                    </div>
                    <div className="prose prose-sm max-w-none text-[15px] leading-[1.8] text-[#333333] whitespace-pre-wrap prose-td:border prose-td:border-[#E5E5E5] prose-td:p-2 prose-th:border prose-th:border-[#E5E5E5] prose-th:p-2 prose-th:bg-[#F5F5F5] prose-table:w-full prose-table:border-collapse prose-table:my-3">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{rewrittenNotes}</ReactMarkdown>
                    </div>
                    {/* Toolbar for AI-Enhanced Notes */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#E5E5E5]">
                      <button onClick={() => toast.success('Thanks for your feedback!')} className="p-2 text-[#808080] hover:bg-[#F5F5F5] hover:text-[#1A1A1A] rounded-full transition-colors"><ThumbsUp size={16} /></button>
                      <button onClick={() => toast.success('Thanks for your feedback! We will improve.')} className="p-2 text-[#808080] hover:bg-[#F5F5F5] hover:text-[#1A1A1A] rounded-full transition-colors"><ThumbsDown size={16} /></button>
                      <div className="flex-1"></div>
                      <button onClick={() => { navigator.clipboard.writeText(rewrittenNotes); toast.success('Copied notes!'); }} className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#404040] border border-[#E5E5E5] rounded-full hover:bg-[#F5F5F5] transition-colors"><Copy size={14} /> Copy</button>
                      <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied to clipboard!'); }} className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#404040] border border-[#E5E5E5] rounded-full hover:bg-[#F5F5F5] transition-colors"><Share size={14} /> Share</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 w-full">
                    {rewrittenNotes && (
                      <button onClick={() => setShowRewritten(true)} className="self-end text-[12px] text-[#4B8BBE] hover:underline cursor-pointer mb-2">
                        View AI-enhanced notes ✨
                      </button>
                    )}
                    
                    <div 
                      ref={editorRef}
                      contentEditable={true}
                      onInput={(e) => {
                        const html = e.currentTarget.innerHTML;
                        const markdown = turndownService.turndown(html);
                        setNoteContent(markdown);
                      }}
                      onBlur={handleNoteBlur}
                      className="w-full min-h-[300px] outline-none cursor-text prose prose-sm max-w-none text-[15.5px] leading-[1.8] text-[#333333] whitespace-pre-wrap prose-td:border prose-td:border-[#E5E5E5] prose-td:p-2 prose-th:border prose-th:border-[#E5E5E5] prose-th:p-2 prose-th:bg-[#F5F5F5] prose-table:w-full prose-table:border-collapse prose-table:my-3 empty:before:content-['Write_your_notes_here..._They_will_be_professionally_rewritten_when_you_save.'] empty:before:text-[#A3A3A3]"
                    />

                    {/* Toolbar for Raw Notes */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#E5E5E5]">
                      <button onClick={() => toast.success('Thanks for your feedback!')} className="p-2 text-[#808080] hover:bg-[#F5F5F5] hover:text-[#1A1A1A] rounded-full transition-colors"><ThumbsUp size={16} /></button>
                      <button onClick={() => toast.success('Thanks for your feedback! We will improve.')} className="p-2 text-[#808080] hover:bg-[#F5F5F5] hover:text-[#1A1A1A] rounded-full transition-colors"><ThumbsDown size={16} /></button>
                      <div className="flex-1"></div>
                      <button onClick={() => { navigator.clipboard.writeText(noteContent); toast.success('Copied notes!'); }} className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#404040] border border-[#E5E5E5] rounded-full hover:bg-[#F5F5F5] transition-colors"><Copy size={14} /> Copy</button>
                      <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied to clipboard!'); }} className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#404040] border border-[#E5E5E5] rounded-full hover:bg-[#F5F5F5] transition-colors"><Share size={14} /> Share</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TRANSCRIPT TAB */}
            {activeTab === 'transcript' && (
              <div className="space-y-4">
                {transcriptSegments.length === 0 && !loop?.transcript ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    {recording.status === 'recording' ? (
                      <>
                        <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-2">
                          <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />
                        </div>
                        <p className="text-[14px] font-semibold text-[#1A1A1A]">Recording in progress...</p>
                        <p className="text-[12px] text-[#86868B]">The full transcript will appear here once you end the meeting.</p>
                      </>
                    ) : recording.status === 'processing' || loop?.status === 'processing' ? (
                      <>
                        <div className="w-12 h-12 rounded-full bg-[#F5F7EF] border border-[#EBEFE0] flex items-center justify-center mb-2">
                          <Loader2 size={20} className="text-[#4B5921] animate-spin" />
                        </div>
                        <p className="text-[14px] font-semibold text-[#1A1A1A]">Transcribing audio...</p>
                        <p className="text-[12px] text-[#86868B]">Gemini 2.0 Flash is generating your exact transcript.</p>
                      </>
                    ) : (
                      <>
                        <AudioLines size={32} className="text-[#C7C7CC]" />
                        <p className="text-[14px] text-[#86868B]">No transcript yet</p>
                        <p className="text-[12px] text-[#C7C7CC]">Start a Quick Meeting to generate a transcript</p>
                      </>
                    )}
                  </div>
                ) : transcriptSegments.length > 0 ? (
                  transcriptSegments.map((seg, i) => (
                    <div key={i} className="flex gap-4 group">
                      <span className="text-[11px] font-mono text-[#A3A3A3] pt-1 shrink-0 w-12">
                        {formatTimestamp(seg.timestamp_ms || 0)}
                      </span>
                      <p className="text-[15px] text-[#333333] leading-[1.8]">{seg.chunk_text}</p>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-4 group">
                    <p className="text-[15px] text-[#333333] leading-[1.8] whitespace-pre-wrap">{loop?.transcript}</p>
                  </div>
                )}
              </div>
            )}

            {/* AI SUMMARY TAB */}
            {activeTab === 'ai' && (
              <div className="space-y-6">
                {minutes ? (
                  <>
                    {/* Header */}
                    <div className="border-b-2 border-[#4B5921] pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">Minutes of Meeting</h2>
                        <div className="flex items-center gap-2">
                          <button onClick={handleSaveAndGenerate} disabled={isSaving} className="p-1.5 hover:bg-[#F5F5F5] rounded-full transition-colors" title="Regenerate">
                            <RefreshCw className={`w-3.5 h-3.5 text-[#808080] ${isSaving ? 'animate-spin' : ''}`} />
                          </button>
                          <button onClick={copyMinutes} className="p-1.5 hover:bg-[#F5F5F5] rounded-full transition-colors" title="Copy">
                            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-[#808080]" />}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2"><span className="font-semibold text-[#666]">Title:</span><span className="text-[#1A1A1A]">{title}</span></div>
                        <div className="flex items-center gap-2"><Calendar className="w-3 h-3 text-[#808080]" /><span className="text-[#1A1A1A]">{loop?.started_at ? new Date(loop.started_at).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A'}</span></div>
                        {loop?.duration_seconds ? <div className="flex items-center gap-2"><Clock className="w-3 h-3 text-[#808080]" /><span className="text-[#1A1A1A]">{Math.floor(loop.duration_seconds / 60)} minutes</span></div> : null}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#FFD60A]" /><h3 className="text-sm font-bold text-black uppercase tracking-wider">Summary</h3></div>
                      <p className="text-[#404040] leading-relaxed pl-6">{minutes.summary}</p>
                    </div>

                    {/* Key Points */}
                    {minutes.keyPoints.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-green-500" /><h3 className="text-sm font-bold text-black uppercase tracking-wider">Key Points</h3></div>
                        <ul className="space-y-2 pl-6">
                          {minutes.keyPoints.map((p, i) => <li key={i} className="flex items-start gap-2 text-[#404040]"><span className="text-green-500 mt-1">•</span><span>{p}</span></li>)}
                        </ul>
                      </div>
                    )}

                    {/* Decisions */}
                    {minutes.decisions.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /><h3 className="text-sm font-bold text-black uppercase tracking-wider">Decisions</h3></div>
                        <ul className="space-y-2 pl-6">
                          {minutes.decisions.map((d, i) => <li key={i} className="flex items-start gap-2 text-[#404040]"><Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /><span>{d}</span></li>)}
                        </ul>
                      </div>
                    )}

                    {/* Action Items */}
                    {minutes.actionItems.length > 0 && (
                      <div className="space-y-3 p-4 bg-[#F5F7EF] rounded-xl border border-[#E5E5E5]">
                        <div className="flex items-center gap-2"><ListChecks className="w-4 h-4 text-[#4B5921]" /><h3 className="text-sm font-bold text-black uppercase tracking-wider">Action Items</h3></div>
                        <ul className="space-y-2 pl-6">
                          {minutes.actionItems.map((a, i) => <li key={i} className="flex items-start gap-2 text-[#404040]"><div className="w-4 h-4 rounded border-2 border-[#4B5921] mt-0.5 shrink-0" /><span>{a}</span></li>)}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    {loop?.status === 'processing' || loop?.status === 'live' ? (
                      <>
                        <div className="w-12 h-12 rounded-full bg-[#F5F7EF] border border-[#EBEFE0] flex items-center justify-center">
                          <Loader2 size={20} className="text-[#4B5921] animate-spin" />
                        </div>
                        <p className="text-[14px] font-semibold text-[#1A1A1A]">AI is generating your summary...</p>
                        <p className="text-[12px] text-[#86868B] animate-pulse">Analyzing transcript, creating notes & naming your meeting</p>
                      </>
                    ) : (
                      <>
                        <Sparkles size={32} className="text-[#C7C7CC]" />
                        <p className="text-[14px] text-[#86868B]">No AI summary yet</p>
                        <p className="text-[12px] text-[#C7C7CC]">Click "Save" to generate an AI summary</p>
                        {(transcriptSegments.length > 0 || noteContent.trim()) && (
                          <button onClick={handleSaveAndGenerate} disabled={isSaving}
                            className="mt-2 px-5 py-2 bg-[#4B5921] text-white rounded-full text-[13px] font-bold hover:bg-[#3D491A] transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50">
                            {isSaving ? 'Generating...' : 'Generate Now'}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <InteractiveRecordingDock />
      <VerticalChatPanel 
        title={title} 
        transcript={loop?.transcript || transcriptSegments.map(s => s.chunk_text).join(' ')} 
        onSaveToNotes={handleSaveToNotes}
      />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}