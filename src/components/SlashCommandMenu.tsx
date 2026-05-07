import React, { useEffect, useRef, useState } from 'react';
import { useRecipes, Recipe } from '@/hooks/useRecipes';

interface SlashCommandMenuProps {
  query: string;
  onSelect: (recipe: Recipe) => void;
  onClose: () => void;
  position?: 'top' | 'bottom';
}

export default function SlashCommandMenu({ query, onSelect, onClose, position = 'top' }: SlashCommandMenuProps) {
  const { recipes, loading } = useRecipes();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Filter recipes by query
  const filteredRecipes = recipes.filter(r => 
    r.name.toLowerCase().includes(query.toLowerCase()) || 
    r.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation globally while this menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredRecipes.length === 0) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredRecipes.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredRecipes.length) % filteredRecipes.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        onSelect(filteredRecipes[selectedIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [filteredRecipes, selectedIndex, onSelect, onClose]);

  // Handle clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (loading && recipes.length === 0) {
    return null;
  }

  if (filteredRecipes.length === 0) {
    return (
      <div ref={menuRef} className={`absolute ${position === 'top' ? 'bottom-full mb-2 origin-bottom-left' : 'top-full mt-2 origin-top-left'} left-0 w-[320px] bg-white border border-[#E5E5E5] rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2 z-50 animate-[popIn_0.2s_ease-out_both]`}>
        <div className="p-3 text-center text-[#808080] text-[13px]">No recipes found matching "{query}"</div>
      </div>
    );
  }

  return (
    <div ref={menuRef} className={`absolute ${position === 'top' ? 'bottom-full mb-2 origin-bottom-left' : 'top-full mt-2 origin-top-left'} left-0 w-[320px] max-h-[300px] overflow-y-auto custom-scroll bg-white border border-[#E5E5E5] rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2 z-50 animate-[popIn_0.2s_ease-out_both] flex flex-col gap-1`}>
      <div className="px-2 pt-1 pb-2 text-[11px] font-bold text-[#A3A3A3] uppercase tracking-wider">Recipes</div>
      {filteredRecipes.map((recipe, idx) => (
        <button
          key={recipe.id}
          className={`flex flex-col text-left px-3 py-2.5 rounded-[10px] transition-colors ${idx === selectedIndex ? 'bg-[#F0F4E3]' : 'hover:bg-[#FAFAFA]'}`}
          onClick={() => onSelect(recipe)}
          onMouseEnter={() => setSelectedIndex(idx)}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[14px] leading-none">{recipe.icon}</span>
            <span className={`text-[13.5px] font-bold ${idx === selectedIndex ? 'text-[#4B5921]' : 'text-[#1A1A1A]'}`}>{recipe.name}</span>
            {recipe.is_system === false && (
              <span className="text-[10px] font-semibold bg-[#EAE8DF] text-[#666666] px-1.5 py-0.5 rounded-full ml-auto shrink-0">Custom</span>
            )}
          </div>
          <span className={`text-[12px] leading-snug line-clamp-2 ${idx === selectedIndex ? 'text-[#546522]' : 'text-[#808080]'}`}>
            {recipe.description || 'No description'}
          </span>
        </button>
      ))}
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
