import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ChevronLeft, ChevronDown, X, FileText, Paperclip,
  ArrowUp, SquarePen, Loader2, Sparkles
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import SlashCommandMenu from '@/components/SlashCommandMenu';
import { Recipe } from '@/hooks/useRecipes';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachments?: { id: string; title: string }[];
  thinking?: string;
  timestamp: Date;
}

interface MeetingChip { id: string; title: string; }

const LoopSwirlLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
    <path d="M12 12c0-1.5-1-2-2-2s-2 .5-2 2 1 3 3 3 4-1 4-4-2-5-5-5-6 2-6 6 3 8 8 8 9-4 9-10" />
  </svg>
);

export default function ChatPreview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [attachedMeetings, setAttachedMeetings] = useState<MeetingChip[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initRef = useRef(false);

  // Use refs to avoid stale closures
  const convIdRef = useRef<string | null>(null);
  const userIdRef = useRef<string | null>(null);
  const thinkingRef = useRef(false);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const isSlashMenuOpen = inputValue.startsWith('/') && (!selectedRecipe || !inputValue.startsWith(`/${selectedRecipe.name}`));
  const slashQuery = isSlashMenuOpen ? inputValue.slice(1) : '';

  const recipe = searchParams.get('recipe');
  const query = searchParams.get('q');
  const meetingIds = searchParams.get('meetings');
  const convParam = searchParams.get('conv');

  useEffect(() => { setTimeout(() => setIsVisible(true), 80); }, []);
  useEffect(() => { 
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // Initialize
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/auth'); return; }
      userIdRef.current = session.user.id;

      // Resume existing conversation
      if (convParam) {
        convIdRef.current = convParam;
        const { data: msgs } = await supabase.from('chat_messages').select('*').eq('conversation_id', convParam).order('created_at', { ascending: true });
        if (msgs) setMessages(msgs.map((m: any) => ({ id: m.id, role: m.role, content: m.content, attachments: m.attachments?.length ? m.attachments : undefined, thinking: m.thinking || undefined, timestamp: new Date(m.created_at) })));
        return;
      }

      // Load meetings from URL params
      let loadedMeetings: MeetingChip[] = [];
      if (meetingIds) {
        const ids = meetingIds.split(',').filter(Boolean);
        if (ids.length > 0) {
          const { data } = await supabase.from('loops').select('id, title').in('id', ids);
          if (data) { loadedMeetings = data.map(d => ({ id: d.id, title: d.title })); setAttachedMeetings(loadedMeetings); }
        }
      }

      const promptText = recipe ? decodeURIComponent(recipe.replace(/\+/g, ' ')) : query ? decodeURIComponent(query) : null;
      if (!promptText) return;

      // Create conversation
      const title = promptText.length > 50 ? promptText.slice(0, 50) + '...' : promptText;
      const { data: conv } = await supabase.from('chat_conversations').insert({ user_id: session.user.id, title }).select('id').single();
      if (!conv) return;
      convIdRef.current = conv.id;

      if (loadedMeetings.length > 0) {
        await supabase.from('chat_meeting_refs').insert(loadedMeetings.map(m => ({ conversation_id: conv.id, loop_id: m.id })));
      }

      await supabase.from('chat_messages').insert({ conversation_id: conv.id, user_id: session.user.id, role: 'user', content: promptText, attachments: loadedMeetings.length > 0 ? loadedMeetings : [] });
      const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: promptText, attachments: loadedMeetings.length > 0 ? loadedMeetings : undefined, timestamp: new Date() };
      setMessages([userMsg]);

      // Clear attached meetings after sending initial message
      setAttachedMeetings([]);

      await callAI(promptText, conv.id, session.user.id, loadedMeetings.map(m => m.id));
    };
    init();
  }, []);

  const callAI = async (prompt: string, convId: string, uid: string, loopIds?: string[]) => {
    setIsThinking(true);
    thinkingRef.current = true;
    try {
      let meetingData: any[] = [];
      if (loopIds && loopIds.length > 0) {
        const { data } = await supabase.from('loops').select('id, title, summary, transcript, started_at, duration_seconds, status').in('id', loopIds);
        if (data) meetingData = data;
      } else {
        const { data } = await supabase.from('loops').select('id, title, summary, transcript, started_at, duration_seconds, status').eq('user_id', uid).order('started_at', { ascending: false }).limit(10);
        if (data) meetingData = data;
      }

      let notesContent = '';
      let transcriptContent = '';
      const mIds = meetingData.map(m => m.id);
      if (mIds.length > 0) {
        const [notesRes, transcriptsRes] = await Promise.all([
          supabase.from('notes').select('content, rewritten_content, loop_id').in('loop_id', mIds),
          supabase.from('transcripts').select('chunk_text, chunk_index, loop_id').in('loop_id', mIds).order('chunk_index', { ascending: true })
        ]);
        if (notesRes.data) notesContent = notesRes.data.map(n => n.rewritten_content || n.content).filter(Boolean).join('\n\n');
        if (transcriptsRes.data) transcriptContent = transcriptsRes.data.map(t => t.chunk_text).join(' ');
      }

      let combinedTranscript = '';
      for (const m of meetingData) {
        const date = new Date(m.started_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        combinedTranscript += `\n--- Meeting: ${m.title} (${date}) ---\n`;
        if (m.transcript) combinedTranscript += `Transcript: ${m.transcript}\n`;
        if (m.summary) { let s = m.summary; try { s = JSON.parse(m.summary)?.summary || s; } catch {} combinedTranscript += `Summary: ${s}\n`; }
      }
      if (notesContent) combinedTranscript += `\n--- Notes ---\n${notesContent}\n`;
      if (transcriptContent) combinedTranscript += `\n--- Transcripts ---\n${transcriptContent}\n`;

      const meetingTitle = meetingData.length === 1 ? meetingData[0].title : `${meetingData.length} meetings`;

      const { data: fnData, error: fnError } = await supabase.functions.invoke('meeting-chat', {
        body: { messages: [{ role: 'user', text: prompt }], transcript: combinedTranscript || 'No meeting data available.', title: meetingTitle }
      });

      let responseText: string;
      if (fnError || !fnData?.message) {
        console.error('Edge fn error:', fnError);
        if (meetingData.length > 0) {
          const list = meetingData.map(m => {
            const d = new Date(m.started_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            let s = ''; if (m.summary) { try { s = JSON.parse(m.summary)?.summary || m.summary; } catch { s = m.summary; } }
            return `• **${m.title}** (${d})${s ? '\n  ' + s.slice(0, 300) : ''}`;
          }).join('\n\n');
          responseText = `Here's what I found:\n\n${list}\n\nLet me know if you'd like more details.`;
        } else {
          responseText = `I couldn't find meeting data to process. Try recording meetings first!`;
        }
      } else {
        responseText = fnData.message;
      }

      setIsThinking(false);
      thinkingRef.current = false;
      const aMsg: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', content: responseText, thinking: 'Thought for 1s', timestamp: new Date() };
      setMessages(prev => [...prev, aMsg]);
      await supabase.from('chat_messages').insert({ conversation_id: convId, user_id: uid, role: 'assistant', content: responseText, thinking: 'Thought for 1s' });
    } catch (err) {
      console.error('callAI error:', err);
      setIsThinking(false);
      thinkingRef.current = false;
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: 'Sorry, something went wrong. Please try again.', timestamp: new Date() }]);
    }
  };

  const handleSend = useCallback(async (initialQuery?: string) => {
    if (thinkingRef.current) return;
    let text = typeof initialQuery === 'string' ? initialQuery.trim() : inputValue.trim();
    
    // Expand recipe name to prompt if selected
    if (!initialQuery && selectedRecipe && text.startsWith(`/${selectedRecipe.name}`)) {
      const extraText = text.slice(`/${selectedRecipe.name}`.length).trim();
      text = selectedRecipe.prompt + (extraText ? '\n\n' + extraText : '');
    }

    if (!text) return;

    // Get userId
    let uid = userIdRef.current;
    if (!uid) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      uid = session.user.id;
      userIdRef.current = uid;
    }

    let convId = convIdRef.current;

    // Create conversation if needed
    if (!convId) {
      const title = text.length > 50 ? text.slice(0, 50) + '...' : text;
      const { data: conv } = await supabase.from('chat_conversations').insert({ user_id: uid, title }).select('id').single();
      if (!conv) return;
      convId = conv.id;
      convIdRef.current = convId;
    }

    // Capture current attached meetings before clearing
    const currentAttached = [...attachedMeetings];

    // Show user message immediately
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: text, attachments: currentAttached.length > 0 ? currentAttached : undefined, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setAttachedMeetings([]);

    // Save to DB
    await supabase.from('chat_messages').insert({ conversation_id: convId, user_id: uid, role: 'user', content: text, attachments: currentAttached.length > 0 ? currentAttached : [] });

    // Save meeting refs
    for (const m of currentAttached) {
      await supabase.from('chat_meeting_refs').upsert({ conversation_id: convId, loop_id: m.id }, { onConflict: 'conversation_id,loop_id' }).catch(() => {});
    }

    await supabase.from('chat_conversations').update({ updated_at: new Date().toISOString() }).eq('id', convId);
    await callAI(text, convId, uid, currentAttached.length > 0 ? currentAttached.map(m => m.id) : undefined);
  }, [inputValue, attachedMeetings]);

  const handleNewChat = () => {
    setMessages([]); setInputValue(''); setAttachedMeetings([]);
    convIdRef.current = null;
    initRef.current = false;
    navigate('/chat-preview', { replace: true });
  };

  return (
    <div className="h-full w-full bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black flex flex-col overflow-hidden">

      {/* Top Bar */}
      <div className={`flex items-center justify-between px-5 py-3 shrink-0 z-20 border-b border-[#EDECE8] bg-[#F9F8F4] transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[#808080] hover:text-[#1A1A1A] transition-colors active:scale-95">
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer group">
            <LoopSwirlLogo className="w-5 h-5 text-[#4B5921]" />
            <span className="text-[14px] font-bold text-[#1A1A1A]">History</span>
            <ChevronDown size={14} className="text-[#808080] group-hover:text-[#1A1A1A] transition-colors" strokeWidth={2.5} />
          </div>
        </div>
        <button onClick={handleNewChat} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#E5E5E5] bg-white text-[13px] font-semibold text-[#1A1A1A] hover:bg-[#FAFAFA] hover:border-[#D1D1D1] transition-all active:scale-95 shadow-sm">
          <SquarePen size={14} strokeWidth={2} /> New chat
        </button>
      </div>

      {/* Messages */}
      <div ref={messageListRef} className="flex-1 overflow-y-auto custom-scroll px-4 pt-6 pb-8 min-h-0">
        <div className="max-w-[680px] mx-auto flex flex-col gap-5">

          {/* Quick action pills */}
          {messages.length > 0 && messages[0].role === 'user' && (
            <div className="flex justify-end gap-2 animate-[fadeUp_0.4s_ease-out_both]">
              <button onClick={() => navigate('/my-notes')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-white text-[13px] font-semibold text-[#404040] hover:bg-[#FAFAFA] hover:border-[#D1D1D1] transition-all active:scale-95 shadow-sm">
                🔒 My notes
              </button>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeUp_0.4s_ease-out_both]`} style={{ animationDelay: `${i * 0.05}s` }}>
              {msg.role === 'user' ? (
                <div className="flex flex-col items-end gap-1.5 max-w-[85%]">
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 justify-end mb-1">
                      {msg.attachments.map(a => (
                        <div key={a.id} className="flex items-center gap-1.5 bg-white border border-[#E5E5E5] rounded-lg px-2.5 py-1.5 shadow-sm">
                          <FileText size={12} className="text-[#808080]" strokeWidth={2} />
                          <span className="text-[12px] font-medium text-[#404040]">{a.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-[#F0EDE5] rounded-[18px] rounded-br-[6px] px-4 py-2.5">
                    <p className="text-[15px] text-[#1A1A1A] leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 max-w-[90%]">
                  <div className="w-7 h-7 rounded-full bg-[#F0F4E3] border border-[#E4EAC0] flex items-center justify-center shrink-0 mt-1">
                    <LoopSwirlLogo className="w-4 h-4 text-[#4B5921]" />
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    {msg.thinking && (
                      <button className="text-[12px] text-[#808080] font-medium flex items-center gap-1 hover:text-[#1A1A1A] transition-colors">
                        {msg.thinking} <ChevronDown size={12} strokeWidth={2.5} />
                      </button>
                    )}
                    <div className="text-[15px] text-[#333333] leading-relaxed whitespace-pre-wrap prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0 prose-td:border prose-td:border-[#E5E5E5] prose-td:p-2 prose-th:border prose-th:border-[#E5E5E5] prose-th:p-2 prose-th:bg-[#F5F5F5] prose-table:w-full prose-table:border-collapse prose-table:my-3">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3 animate-[fadeUp_0.3s_ease-out_both]">
              <div className="w-7 h-7 rounded-full bg-[#F0F4E3] border border-[#E4EAC0] flex items-center justify-center shrink-0 mt-1">
                <LoopSwirlLogo className="w-4 h-4 text-[#4B5921]" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[13px] text-[#808080]">
                  <Loader2 size={14} className="animate-spin text-[#4B5921]" />
                  <span className="animate-pulse">Thinking...</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#C2C2C2] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[#C2C2C2] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[#C2C2C2] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {messages.length > 1 && (
            <div className="bg-white border border-[#E5E5E5] rounded-[14px] px-4 py-3 flex items-center justify-between shadow-sm animate-[fadeUp_0.4s_ease-out_both]">
              <span className="text-[14px] text-[#404040] font-medium">Unlock chat with full history</span>
              <button className="flex items-center gap-1.5 text-[13px] font-semibold text-[#546522] hover:text-[#3e4c18] transition-colors">
                View plans <span className="text-[#A2B64F]">⊕</span>
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom Input — pinned at bottom */}
      <div className="px-4 pb-0 pt-2 shrink-0 sticky bottom-0 z-10 bg-[#F9F8F4] border-t border-[#EDECE8]">
        <div className="max-w-[680px] mx-auto">

          {attachedMeetings.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {attachedMeetings.map(m => (
                <div key={m.id} className="flex items-center gap-1.5 bg-white border border-[#E5E5E5] rounded-lg px-2.5 py-1.5 shadow-sm animate-[popIn_0.2s_ease-out_both]">
                  <FileText size={12} className="text-[#808080]" strokeWidth={2} />
                  <span className="text-[12px] font-medium text-[#404040] max-w-[140px] truncate">{m.title}</span>
                  <button onClick={() => setAttachedMeetings(prev => prev.filter(x => x.id !== m.id))} className="text-[#C2C2C2] hover:text-[#1A1A1A] transition-colors">
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className={`rounded-[20px] border bg-white flex flex-col transition-all duration-300 ${isDragOver ? 'border-[#A2B64F] shadow-[0_4px_20px_rgba(162,182,79,0.15)] bg-[#FCFDF7]' : 'border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:border-[#D1D1D1]'}`}
            onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={e => { e.preventDefault(); setIsDragOver(false); try { const data = JSON.parse(e.dataTransfer.getData('application/json')); if (data?.id && data?.title) setAttachedMeetings(prev => prev.some(m => m.id === data.id) ? prev : [...prev, data]); } catch {} }}>

            {isDragOver && (
              <div className="flex items-center justify-center py-3 text-[13px] text-[#7A8B37] font-medium animate-pulse border-b border-[#E4EAC0]">
                <Sparkles size={14} strokeWidth={2} className="mr-1.5" /> Drop meeting to add as context
              </div>
            )}

            <div className="flex items-center gap-2 px-4 py-3 relative">
              {isSlashMenuOpen && (
                <SlashCommandMenu
                  query={slashQuery}
                  position="top"
                  onClose={() => setInputValue('')}
                  onSelect={(recipe) => {
                    setSelectedRecipe(recipe);
                    setInputValue(`/${recipe.name} `);
                    inputRef.current?.focus();
                  }}
                />
              )}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => {
                  const val = e.target.value;
                  setInputValue(val);
                  if (selectedRecipe && !val.startsWith(`/${selectedRecipe.name}`)) {
                    setSelectedRecipe(null);
                  }
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey && !isSlashMenuOpen) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSend();
                  }
                }}
                placeholder={attachedMeetings.length > 0 ? `Ask about ${attachedMeetings.length} meeting${attachedMeetings.length > 1 ? 's' : ''}...` : 'Ask anything...'}
                className="flex-1 bg-transparent outline-none text-[15px] text-[#1A1A1A] placeholder-[#A3A3A3]"
                autoComplete="off"
              />
            </div>

            <div className="flex items-center justify-between px-3 pb-2.5">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 text-[12.5px] font-medium text-[#808080] hover:text-[#1A1A1A] cursor-pointer transition-colors px-2 py-1.5 rounded-md hover:bg-[#F5F5F5]">
                  Auto <ChevronDown size={13} strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="text-[#A3A3A3] hover:text-[#1A1A1A] transition-colors p-1.5 rounded-full hover:bg-[#F5F5F5]">
                  <Paperclip size={16} strokeWidth={2} />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isThinking}
                  className={`w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all active:scale-95 ${inputValue.trim() && !isThinking ? 'bg-[#546522] text-white hover:bg-[#43521b] shadow-sm' : 'bg-[#F0F0F0] text-[#C2C2C2] cursor-not-allowed'}`}>
                  <ArrowUp size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }
        @keyframes popIn { 0% { opacity:0; transform:scale(0.95); } 100% { opacity:1; transform:scale(1); } }
      `}</style>
    </div>
  );
}
