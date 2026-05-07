import React, { useState, useEffect, useRef } from 'react';
import { 
  SquarePen, ChevronDown, Paperclip, ArrowUp, 
  LayoutGrid, ExternalLink, Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SlashCommandMenu from '@/components/SlashCommandMenu';
import { Recipe } from '@/hooks/useRecipes';

// --- Reusable Recipe Pill Component ---
const RecipePill = ({ text, onClick }: { text: string; onClick?: () => void }) => (
  <button onClick={onClick} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5E5E5] hover:bg-[#F5F5F5] hover:border-[#D1D1D1] transition-all duration-200 active:scale-95 group cursor-pointer bg-white shadow-sm">
    <div className="w-[18px] h-[18px] rounded-[4px] border border-[#E5E5E5] flex items-center justify-center bg-white shrink-0 group-hover:border-[#C2C2C2] transition-colors">
      <span className="text-[11px] font-bold text-[#A3A3A3] italic group-hover:text-[#666666] leading-none mb-[1px]">/</span>
    </div>
    <span className="text-[13.5px] font-medium text-[#404040] group-hover:text-[#1A1A1A] transition-colors tracking-tight whitespace-nowrap">
      {text}
    </span>
  </button>
);

interface Message {
  role: 'user' | 'assistant';
  text: string;
  isNotesContext?: boolean;
}

const AT_COMMANDS = [
  { id: 'notes', name: 'notes', icon: '📝', description: 'Reference or save to meeting notes' },
  { id: 'transcript', name: 'transcript', icon: '🎙️', description: 'Reference the meeting transcript' }
];

export default function VerticalChatPanel({ title, transcript, onSaveToNotes }: { title?: string, transcript?: string, onSaveToNotes?: (content: string) => void }) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const isSlashMenuOpen = inputValue.startsWith('/') && (!selectedRecipe || !inputValue.startsWith(`/${selectedRecipe.name}`));
  const slashQuery = isSlashMenuOpen ? inputValue.slice(1) : '';

  const atMatch = inputValue.match(/@([a-zA-Z]*)$/);
  const isAtMenuOpen = !!atMatch;
  const atQuery = atMatch ? atMatch[1] : '';
  const filteredAtCommands = AT_COMMANDS.filter(c => c.name.toLowerCase().includes(atQuery.toLowerCase()));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    let textToProcess = textOverride || inputValue;
    
    // Expand recipe name to prompt if selected
    if (!textOverride && selectedRecipe && textToProcess.startsWith(`/${selectedRecipe.name}`)) {
      const extraText = textToProcess.slice(`/${selectedRecipe.name}`.length).trim();
      textToProcess = selectedRecipe.prompt + (extraText ? '\n\n' + extraText : '');
    }

    if (!textToProcess.trim() || isLoading) return;

    const newMsg: Message = { role: 'user', text: textToProcess.trim() };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('meeting-chat', {
        body: { 
          messages: updatedMessages.map(m => ({ role: m.role, text: m.text })), 
          title, 
          transcript 
        }
      });

      if (error) throw error;
      
      if (data?.message) {
        const isNotesRelated = textToProcess.toLowerCase().includes('@notes');
        setMessages(prev => [...prev, { role: 'assistant', text: data.message, isNotesContext: isNotesRelated }]);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      toast.error(err.message || 'Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSlashMenuOpen) {
      handleSend();
    }
  };

  return (
    <div 
      className="w-full max-w-[320px] lg:max-w-[380px] h-full bg-white border-l border-[#E5E5E5] shadow-[-4px_0_24px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden z-30 shrink-0"
    >
      {/* --- Header --- */}
      <div className="flex items-center justify-between px-5 py-4 shrink-0 z-10 border-b border-transparent">
        {/* Left: New Chat Dropdown */}
        <button className="flex items-center gap-1.5 cursor-pointer group outline-none">
          <span className="text-[15px] font-bold text-[#1A1A1A]">Chat</span>
        </button>
        
        {/* Right: Controls */}
        <div className="flex items-center gap-2">
           <button 
             onClick={() => setMessages([])}
             className="flex items-center gap-1.5 border border-[#E5E5E5] rounded-full px-3 py-1.5 text-[13px] font-medium text-[#666666] hover:text-[#1A1A1A] hover:bg-[#FAFAFA] hover:border-[#D1D1D1] transition-all active:scale-95 outline-none bg-white shadow-sm">
             <SquarePen size={14} strokeWidth={2} /> New
           </button>
           <button className="text-[#808080] hover:text-[#1A1A1A] transition-colors active:scale-95 outline-none p-1.5 hover:bg-[#F5F5F5] rounded-md">
             <ExternalLink size={16} strokeWidth={2} />
           </button>
        </div>
      </div>

      {/* --- Main Chat Area --- */}
      <div className="flex-1 w-full bg-white relative overflow-y-auto px-5 py-4 flex flex-col gap-4">
         {messages.length === 0 ? (
           <div className="flex-1 flex flex-col justify-end pb-4 text-center">
             <p className="text-[#808080] text-[13px]">Ask anything about the meeting...</p>
           </div>
         ) : (
           messages.map((msg, idx) => (
             <div key={idx} className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end' : 'self-start'}`}>
               <div className={`px-4 py-2.5 rounded-2xl text-[14.5px] leading-relaxed whitespace-pre-wrap ${
                 msg.role === 'user' 
                   ? 'bg-[#F2F2F2] text-[#1A1A1A] rounded-tr-[4px]' 
                   : 'bg-white border border-[#E5E5E5] text-[#333333] shadow-sm rounded-tl-[4px] prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0 prose-td:border prose-td:border-[#E5E5E5] prose-td:p-2 prose-th:border prose-th:border-[#E5E5E5] prose-th:p-2 prose-th:bg-[#F5F5F5] prose-table:w-full prose-table:border-collapse prose-table:my-3'
               }`}>
                 {msg.role === 'assistant' ? (
                   <>
                     <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                     {msg.isNotesContext && onSaveToNotes && (
                       <div className="mt-3 pt-3 border-t border-[#E5E5E5] flex justify-end">
                         <button 
                           onClick={() => { onSaveToNotes(msg.text); toast.success('Added to notes'); }}
                           className="flex items-center gap-1.5 px-3 py-1.5 bg-[#546522] text-white text-[12.5px] font-medium rounded-md hover:bg-[#43521b] transition-colors shadow-sm"
                         >
                           Add to Notes
                         </button>
                       </div>
                     )}
                   </>
                 ) : (
                   msg.text
                 )}
               </div>
               <span className={`text-[11px] font-medium text-[#A3A3A3] mt-1.5 px-1 ${msg.role === 'user' ? 'self-end' : 'self-start'}`}>
                 {msg.role === 'user' ? 'You' : 'Loop AI'}
               </span>
             </div>
           ))
         )}
         {isLoading && (
           <div className="flex flex-col max-w-[85%] self-start animate-pulse">
             <div className="px-4 py-3 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm rounded-tl-[4px] flex items-center gap-2">
               <Loader2 size={16} className="animate-spin text-[#808080]" />
               <span className="text-[13.5px] text-[#808080]">Thinking...</span>
             </div>
           </div>
         )}
         <div ref={messagesEndRef} />
      </div>

      {/* --- Bottom Controls Area --- */}
      <div className="px-5 pb-6 pt-2 flex flex-col gap-4 bg-white shrink-0 relative z-10">
         
         {/* Recipe Pills Wrapper */}
         {messages.length === 0 && (
           <div className="flex flex-wrap gap-2">
             <RecipePill text="Make notes longer" onClick={() => handleSend("Make notes longer")} />
             <RecipePill text="Write follow up email" onClick={() => handleSend("Write follow up email")} />
             <RecipePill text="List my todos" onClick={() => handleSend("List my todos")} />
             <RecipePill text="Write tldr" onClick={() => handleSend("Write tldr")} />
             <RecipePill text="Blind spots" onClick={() => handleSend("Identify blind spots in this meeting")} />
             
             {/* All Recipes Button (Distinct Style) */}
             <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E5E5E5] hover:bg-[#FAFAFA] hover:border-[#D1D1D1] transition-all duration-200 active:scale-95 bg-white shadow-sm outline-none">
               <LayoutGrid size={14} strokeWidth={2} className="text-[#1A1A1A]" />
               <span className="text-[13.5px] font-bold text-[#1A1A1A]">All recipes</span>
             </button>
           </div>
         )}

         {/* Input Bar */}
         <div 
           className={`w-full rounded-2xl bg-white flex flex-col justify-between pt-2 pb-1.5 px-1.5 transition-all duration-300 border ${
             isInputFocused 
              ? 'border-[#C2C2C2] shadow-[0_4px_20px_rgba(0,0,0,0.06)]' 
              : 'border-[#E5E5E5] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:border-[#D1D1D1]'
           }`}
           onClick={() => setIsInputFocused(true)}
           onMouseLeave={() => setIsInputFocused(false)}
         >
           
           {/* Top Input Area */}
           <div className="flex items-center gap-[2px] px-3 pb-2 pt-1 relative">
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
             {isAtMenuOpen && filteredAtCommands.length > 0 && (
               <div className="absolute bottom-full mb-2 origin-bottom-left left-0 w-[280px] bg-white border border-[#E5E5E5] rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2 z-50 animate-[popIn_0.2s_ease-out_both] flex flex-col gap-1">
                 <div className="px-2 pt-1 pb-2 text-[11px] font-bold text-[#A3A3A3] uppercase tracking-wider">Context tags</div>
                 {filteredAtCommands.map((cmd) => (
                   <button
                     key={cmd.id}
                     className="flex flex-col text-left px-3 py-2.5 rounded-[10px] transition-colors hover:bg-[#FAFAFA]"
                     onClick={() => {
                       const newValue = inputValue.replace(/@([a-zA-Z]*)$/, `@${cmd.name} `);
                       setInputValue(newValue);
                       inputRef.current?.focus();
                     }}
                   >
                     <div className="flex items-center gap-2 mb-1">
                       <span className="text-[14px] leading-none">{cmd.icon}</span>
                       <span className="text-[13.5px] font-bold text-[#1A1A1A]">{cmd.name}</span>
                     </div>
                     <span className="text-[12px] leading-snug line-clamp-2 text-[#808080]">
                       {cmd.description}
                     </span>
                   </button>
                 ))}
               </div>
             )}
             <input
               ref={inputRef}
               className="w-full bg-transparent border-none outline-none text-[#1A1A1A] placeholder-[#A3A3A3] text-[15px] ml-1.5"
               placeholder="Chat or type a command..."
               value={inputValue}
               onChange={(e) => {
                 const val = e.target.value;
                 setInputValue(val);
                 if (selectedRecipe && !val.startsWith(`/${selectedRecipe.name}`)) {
                   setSelectedRecipe(null);
                 }
               }}
               onFocus={() => setIsInputFocused(true)}
               onBlur={() => setIsInputFocused(false)}
               onKeyDown={handleKeyDown}
               disabled={isLoading}
             />
           </div>
           
           {/* Bottom Controls */}
           <div className="flex items-center justify-end w-full pr-1">
             <div className="flex items-center gap-1">
               
               {/* Solid Olive Green Submit Button */}
               <button 
                 onClick={() => handleSend()}
                 disabled={!inputValue.trim() || isLoading}
                 className="w-[32px] h-[32px] rounded-full bg-[#546522] flex items-center justify-center text-white hover:bg-[#43521b] transition-colors active:scale-95 shadow-sm outline-none disabled:opacity-50"
               >
                  <ArrowUp size={16} strokeWidth={2.5} />
               </button>
             </div>
           </div>

         </div>
      </div>

      {/* Global Embedded Animations */}
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
        `}
      </style>
    </div>
  );
}