import React, { useState, useEffect } from 'react';
import { Folder, X, Lock, ChevronDown, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFolderCreated?: () => void;
}

export default function CreateFolderModal({ isOpen, onClose, onFolderCreated }: CreateFolderModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  
  const [isTitleFocused, setIsTitleFocused] = useState(true); 
  const [isDescFocused, setIsDescFocused] = useState(false);

  // Trigger entrance animations when opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow the DOM to render before animating
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDescription('');
      setIsTitleFocused(true);
      setIsDescFocused(false);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200); // Wait for exit animation
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans selection:bg-[#BAC66E] selection:text-black">
      
      {/* Dark Blur Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      ></div>
      
      {/* --- Modal Content --- */}
      <div 
        className={`relative w-full max-w-[420px] bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-bottom ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'
        }`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-2.5">
            <Folder size={18} className="text-[#404040] fill-current opacity-80" strokeWidth={1} />
            <span className="text-[15px] font-bold text-[#1A1A1A] tracking-tight">Create private folder</span>
          </div>
          <button 
            onClick={handleClose}
            className="w-[26px] h-[26px] rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] flex items-center justify-center text-[#808080] hover:text-[#1A1A1A] transition-colors active:scale-95 cursor-pointer"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-6">
          
          {/* Title & Icon Field */}
          <div>
            <label className="text-[12.5px] font-semibold text-[#1A1A1A] mb-1.5 block">
              Title and icon
            </label>
            <div 
              className={`flex items-center p-1 rounded-[10px] transition-all duration-200 bg-white ${
                isTitleFocused 
                  ? 'border-2 border-[#84963C] shadow-[0_0_0_2px_rgba(132,150,60,0.05)]' 
                  : 'border border-[#E5E5E5] hover:border-[#C2C2C2] p-[5px]'
              }`}
            >
              <div className="w-[30px] h-[30px] rounded-[6px] bg-[#F0F0F0] flex items-center justify-center shrink-0 mr-2.5 cursor-pointer hover:bg-[#EAEAEA] transition-colors">
                <Folder size={15} className="text-[#666666] fill-current opacity-70" strokeWidth={1} />
              </div>
              <input 
                type="text" 
                placeholder="Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => setIsTitleFocused(true)}
                onBlur={() => setIsTitleFocused(false)}
                className="flex-1 outline-none text-[14px] text-[#1A1A1A] placeholder-[#A3A3A3] bg-transparent min-w-0"
                autoFocus
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label className="text-[12.5px] font-semibold text-[#1A1A1A] mb-1.5 block">
              Description
            </label>
            <textarea 
              placeholder="Describe the purpose of this folder" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setIsDescFocused(true)}
              onBlur={() => setIsDescFocused(false)}
              className={`w-full rounded-[10px] p-3 outline-none text-[14px] text-[#1A1A1A] placeholder-[#A3A3A3] resize-none h-[85px] transition-all duration-200 bg-white ${
                isDescFocused
                  ? 'border-2 border-[#84963C] shadow-[0_0_0_2px_rgba(132,150,60,0.05)] p-[11px]'
                  : 'border border-[#E5E5E5] hover:border-[#C2C2C2]'
              }`}
            />
          </div>

          {/* Location/Privacy Dropdown Selector */}
          <div className="flex items-center justify-between cursor-pointer group mt-2 hover:bg-[#F9F9F6] -mx-2 p-2 rounded-xl transition-colors active:scale-[0.99]">
            <div className="flex items-center gap-3.5">
              {/* Lock Icon Box */}
              <div className="w-10 h-10 rounded-[10px] bg-[#F2F1ED] flex items-center justify-center shrink-0">
                <Lock size={16} className="text-[#666666]" strokeWidth={2.5} />
              </div>
              
              {/* Text Block */}
              <div className="flex flex-col pt-0.5">
                <span className="text-[14.5px] font-bold text-[#1A1A1A] leading-tight mb-0.5">
                  My notes
                </span>
                <span className="text-[12.5px] text-[#808080] leading-tight">
                  <strong className="font-bold text-[#1A1A1A]">Private</strong> Only people added to the folder can view.
                </span>
              </div>
            </div>
            <ChevronDown size={16} className="text-[#A3A3A3] group-hover:text-[#1A1A1A] transition-colors mr-1" strokeWidth={2.5} />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-5 py-4 border-t border-[#F0F0F0] flex items-center justify-between bg-white rounded-b-[16px]">
          <button 
            onClick={handleClose}
            className="px-5 py-2 rounded-[8px] border border-[#E5E5E5] text-[#1A1A1A] text-[13px] font-bold hover:bg-[#FAFAFA] hover:border-[#D1D1D1] transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            Cancel
          </button>
          
          {/* Dynamic Create Button: Disabled if title is empty */}
          <button 
            onClick={async () => {
              if (!title.trim() || saving) return;
              setSaving(true);
              try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) throw new Error('Not authenticated');
                
                const { error } = await supabase.from('folders').insert({
                  user_id: user.id,
                  name: title.trim(),
                  description: description.trim() || null,
                });
                
                if (error) throw error;
                toast.success('Folder created');
                onFolderCreated?.();
                handleClose();
              } catch (err: any) {
                toast.error(err.message || 'Could not create folder');
              } finally {
                setSaving(false);
              }
            }}
            disabled={!title.trim() || saving}
            className={`px-5 py-2 rounded-[8px] text-[13px] font-bold transition-all flex items-center gap-2 ${
              title.trim().length > 0 && !saving
                ? 'bg-[#1A1A1A] text-white hover:bg-black shadow-md active:scale-95 cursor-pointer' 
                : 'bg-[#F5F5F5] text-[#A3A3A3] cursor-not-allowed border border-transparent'
            }`}
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? 'Creating...' : 'Create'}
          </button>
        </div>

      </div>

    </div>
  );
}
