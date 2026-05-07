import React, { useState, useEffect, useRef } from 'react';
import CreateFolderModal from './CreateFolderModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { 
  Search, Home, Users, MessageCircle, Lock, 
  Folder, FolderPlus, SquarePen, User, FileText, 
  ChevronsUpDown, PanelLeftClose, UserPlus, 
  ArrowRightLeft, Check, Plus, LayoutGrid, 
  Smartphone, HelpCircle, Settings, Bot
} from 'lucide-react';

// --- Mini Icons for Popover ---
const ZapierMini = () => (
  <svg width="14" height="14" viewBox="0 0 64 64" fill="none" className="shrink-0">
    <rect width="64" height="64" rx="16" fill="#FF4A00"/>
    <path d="M40 24L24 34H36L24 44L40 34H28L40 24Z" fill="white"/>
  </svg>
);

const AttioMini = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M14.5 4L5.5 20H9.5L18.5 4H14.5Z" fill="#1A1A1A"/>
    <path d="M9.5 4L4.5 13H7.5L12.5 4H9.5Z" fill="#1A1A1A"/>
  </svg>
);

const HubspotMini = () => (
  <svg width="14" height="14" viewBox="0 0 64 64" fill="none" className="shrink-0">
    <circle cx="32" cy="32" r="14" stroke="#FF7A59" strokeWidth="6"/>
    <circle cx="18" cy="18" r="6" fill="#FF7A59"/>
    <circle cx="46" cy="18" r="6" fill="#FF7A59"/>
    <circle cx="46" cy="46" r="6" fill="#FF7A59"/>
    <line x1="22" y1="22" x2="28" y2="28" stroke="#FF7A59" strokeWidth="4" strokeLinecap="round"/>
    <line x1="42" y1="22" x2="36" y2="28" stroke="#FF7A59" strokeWidth="4" strokeLinecap="round"/>
    <line x1="42" y1="42" x2="36" y2="36" stroke="#FF7A59" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

// --- Reusable Navigation Item ---
const NavItem = ({ icon: Icon, label, to, delay }: { icon: any; label: string; to: string; delay: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer transition-all duration-300 group animate-[fadeLeft_0.5s_ease-out_both] no-underline ${
        isActive 
          ? 'bg-[#EAE8DF] text-[#1A1A1A] font-medium' 
          : 'text-[#404040] hover:bg-[#EAE8DF]/60'
      }`}
      style={{ animationDelay: delay }}
    >
      <Icon 
        size={18} 
        strokeWidth={isActive ? 2 : 1.5} 
        className={`transition-transform duration-300 ${isActive ? 'text-[#1A1A1A]' : 'text-[#666666] group-hover:text-[#1A1A1A] group-hover:scale-110'}`} 
      />
      <span className="text-[14px]">{label}</span>
    </Link>
  );
};

// --- Reusable Space Item ---
const SpaceItem = ({ icon: Icon, imageSrc, label, isFaded, isAction, delay }) => {
  return (
    <div 
      className={`flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-300 group animate-[fadeLeft_0.5s_ease-out_both] hover:bg-[#EAE8DF]/50 ${
        isAction ? 'text-[#737373]' : 'text-[#404040]'
      }`}
      style={{ animationDelay: delay }}
    >
      {/* Icon Container (Lock, Image, or Folder) */}
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={label} 
          className="w-6 h-6 rounded-md object-cover border border-[#E5E5E5] shadow-sm transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
        />
      ) : Icon === Lock ? (
        <div className="w-6 h-6 rounded-md bg-[#E5E3D8] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105">
          <Icon size={14} strokeWidth={2.5} className="text-[#555555]" />
        </div>
      ) : (
        <div className={`w-6 h-6 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 ${isFaded ? 'opacity-50' : ''}`}>
          <Icon size={16} strokeWidth={2} className="text-[#666666]" />
        </div>
      )}
      
      <span className={`text-[14px] ${isAction ? 'font-medium' : ''}`}>{label}</span>
    </div>
  );
};

// --- Bottom Utility Icon ---
const UtilityIcon = ({ icon: Icon }) => (
  <button className="w-7 h-7 rounded-md flex items-center justify-center text-[#808080] hover:text-[#1A1A1A] hover:bg-[#EAE8DF] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer">
    <Icon size={16} strokeWidth={1.5} />
  </button>
);

// --- Profile Menu Action Item ---
const MenuAction = ({ icon: Icon, label, shortcut, onClick }: { icon: any; label: string; shortcut?: string[]; onClick?: () => void }) => (
  <div onClick={onClick} className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#F5F5F5] cursor-pointer transition-colors group">
    <div className="flex items-center gap-2.5">
      <Icon size={16} className="text-[#808080] group-hover:text-[#1A1A1A] transition-colors stroke-[2]" />
      <span className="text-[13px] font-medium text-[#404040] group-hover:text-[#1A1A1A] transition-colors">{label}</span>
    </div>
    {shortcut && (
      <div className="flex gap-1 opacity-70">
        {shortcut.map(s => (
          <kbd key={s} className="bg-[#F5F5F5] border border-[#E5E5E5] rounded-[4px] px-1.5 py-[1px] text-[10px] text-[#666666] font-sans shadow-sm tracking-wide">
            {s}
          </kbd>
        ))}
      </div>
    )}
  </div>
);

// --- Main Sidebar Component ---
export default function AppSidebar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isUpgradeHovered, setIsUpgradeHovered] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [folders, setFolders] = useState<{ id: string; name: string; color: string | null }[]>([]);
  const [userName, setUserName] = useState('User');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [trialDaysLeft, setTrialDaysLeft] = useState(3);
  const [userPlan, setUserPlan] = useState<string>('trial');
  
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const fetchFolders = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from('folders')
      .select('id, name, color')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });
    if (data) setFolders(data);
  };

  // Trigger entrance animations + fetch data on mount
  useEffect(() => {
    setIsVisible(true);
    fetchFolders();

    // Fetch user profile
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'User');
        setUserAvatar(user.user_metadata?.avatar_url || null);
        setUserEmail(user.email || '');
        
        const plan = user.user_metadata?.plan || 'trial';
        setUserPlan(plan);
        
        // Calculate trial days
        if (user.created_at) {
          const createdDate = new Date(user.created_at);
          const now = new Date();
          const diffTime = now.getTime() - createdDate.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          setTrialDaysLeft(Math.max(0, 3 - diffDays));
        }
      }
    });
  }, []);

  // Handle clicking outside the profile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
    <aside className="w-[260px] h-full bg-[#F5F4EF] border-r border-[#E5E5E5] flex flex-col p-4 shrink-0 relative z-20 font-sans selection:bg-[#BAC66E] selection:text-black">
        
        {/* Top Toggle Icon */}
        <div className="mb-4">
          <button className="text-[#808080] hover:text-[#1A1A1A] transition-colors p-1 rounded-md hover:bg-[#EAE8DF] cursor-pointer">
            <PanelLeftClose size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Search Bar */}
        <div 
          className={`flex items-center justify-between px-3 py-2 mb-4 rounded-full border bg-white/50 cursor-text transition-all duration-300 group ${
            isSearchFocused 
              ? 'border-[#C2C2C2] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] scale-[1.02]' 
              : 'border-[#E2E0D8] hover:border-[#C2C2C2] hover:bg-white'
          }`}
          onClick={() => setIsSearchFocused(true)}
          onMouseLeave={() => setIsSearchFocused(false)}
        >
          <div className="flex items-center gap-2">
            <Search size={15} className={`${isSearchFocused ? 'text-[#1A1A1A]' : 'text-[#808080]'} transition-colors`} />
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent border-none outline-none text-[14px] text-[#1A1A1A] placeholder-[#808080] w-[100px]"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
          <span className="text-[11px] font-medium text-[#A3A3A3] group-hover:text-[#808080] transition-colors">
            Ctrl+K
          </span>
        </div>

        {/* Main Navigation */}
        <div className="flex flex-col gap-0.5 mb-6">
          <NavItem icon={Home} label="Home" to="/home" delay="0.1s" />
          <NavItem icon={Users} label="Shared with me" to="/shared-with-me" delay="0.15s" />
          <NavItem icon={MessageCircle} label="Chat" to="/chatt" delay="0.2s" />
        </div>

        {/* Spaces Section */}
        <div className="flex flex-col flex-1 overflow-y-auto custom-scroll min-h-0">
          <h3 className="text-[12px] font-semibold text-[#808080] px-3 mb-2 animate-[fadeLeft_0.5s_ease-out_both] shrink-0" style={{ animationDelay: '0.25s' }}>
            Spaces
          </h3>
          
          <div className="flex flex-col gap-1 pb-4">
            <Link 
              to="/my-notes"
              className={`flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-300 group animate-[fadeLeft_0.5s_ease-out_both] no-underline ${
                location.pathname === '/my-notes' 
                  ? 'bg-[#EAE8DF] text-[#1A1A1A]' 
                  : 'text-[#404040] hover:bg-[#EAE8DF]/50'
              }`}
              style={{ animationDelay: '0.3s' }}
            >
              <div className="w-6 h-6 rounded-md bg-[#E5E3D8] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 shrink-0">
                <Lock size={14} strokeWidth={2.5} className="text-[#555555]" />
              </div>
              <span className="text-[14px]">My notes</span>
            </Link>
            
            {/* Dynamic Folders from Supabase */}
            {folders.map((folder, i) => (
              <Link 
                key={folder.id}
                to={`/folder/${folder.id}`}
                className={`flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-300 group animate-[fadeLeft_0.5s_ease-out_both] no-underline ${
                  location.pathname === `/folder/${folder.id}` 
                    ? 'bg-[#EAE8DF] text-[#1A1A1A]' 
                    : 'text-[#404040] hover:bg-[#EAE8DF]/50'
                }`}
                style={{ animationDelay: `${0.35 + i * 0.05}s` }}
              >
                <div className="w-6 h-6 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shrink-0">
                  <Folder size={16} strokeWidth={2} style={folder.color ? { color: folder.color } : undefined} className={folder.color ? '' : 'text-[#666666]'} />
                </div>
                <span className="text-[14px] truncate">{folder.name}</span>
              </Link>
            ))}
            
            <div onClick={() => setIsFolderModalOpen(true)}>
              <SpaceItem icon={FolderPlus} label="Add folder" isAction={true} delay={`${0.35 + folders.length * 0.05 + 0.05}s`} />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto pt-4 flex flex-col gap-3 animate-[fadeUp_0.8s_ease-out_both]" style={{ animationDelay: '0.5s' }}>
          
          {/* Utilities Toolbar */}
          <div className="flex items-center gap-1 px-1">
            {/* Recipe Icon with Tooltip */}
            <div className="relative group/recipe">
              <Link 
                to="/recipe"
                className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer no-underline ${
                  location.pathname === '/recipe' 
                    ? 'text-[#1A1A1A] bg-[#EAE8DF]' 
                    : 'text-[#808080] hover:text-[#1A1A1A] hover:bg-[#EAE8DF]'
                }`}
              >
                <SquarePen size={16} strokeWidth={1.5} />
              </Link>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-[#1A1A1A] text-white text-[11px] font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover/recipe:opacity-100 transition-opacity duration-200 shadow-lg">
                Recipe
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#1A1A1A]"></div>
              </div>
            </div>
            
            {/* People Icon with Tooltip */}
            <div className="relative group/people">
              <Link 
                to="/people"
                className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer no-underline ${
                  location.pathname === '/people' 
                    ? 'text-[#1A1A1A] bg-[#EAE8DF]' 
                    : 'text-[#808080] hover:text-[#1A1A1A] hover:bg-[#EAE8DF]'
                }`}
              >
                <User size={16} strokeWidth={1.5} />
              </Link>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-[#1A1A1A] text-white text-[11px] font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover/people:opacity-100 transition-opacity duration-200 shadow-lg">
                People
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#1A1A1A]"></div>
              </div>
            </div>
            
            <UtilityIcon icon={FileText} />
          </div>

          {/* Business Trial Upgrade Card with Popover */}
          <div 
            className="relative group/upgrade"
            onMouseEnter={() => setIsUpgradeHovered(true)}
            onMouseLeave={() => setIsUpgradeHovered(false)}
          >
            <div className="bg-white/40 border border-[#E2E0D8] rounded-2xl p-3 flex items-center justify-between group-hover/upgrade:bg-white group-hover/upgrade:shadow-[0_4px_15px_rgba(0,0,0,0.03)] group-hover/upgrade:border-[#D1D1D1] transition-all duration-300 cursor-pointer">
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#1A1A1A] leading-tight capitalize">{userPlan === 'trial' ? 'Business Trial' : userPlan + ' Plan'}</span>
                {userPlan === 'trial' && <span className="text-[11px] font-medium text-[#5B799B] mt-0.5">{trialDaysLeft} Days Left</span>}
              </div>
              <button onClick={() => navigate('/settings?tab=billing')} className="bg-[#242424] group-hover/upgrade:bg-[#000000] text-white text-[12px] font-bold px-3.5 py-1.5 rounded-full transition-all duration-300 transform group-hover/upgrade:scale-105 active:scale-95 shadow-sm">
                {userPlan === 'trial' ? 'Upgrade' : 'Manage'}
              </button>
            </div>

            {/* Pixel-Perfect Upgrade Popover */}
            {isUpgradeHovered && (
              <div className="absolute left-[calc(100%+12px)] bottom-0 w-[310px] bg-white rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#E5E5E5] flex flex-col z-50 animate-[popSide_0.2s_ease-out_both] origin-bottom-left cursor-default pointer-events-auto">
                
                {/* Top Beige Banner */}
                <div className="bg-[#F5F4EF] px-5 py-6 rounded-t-[15px] border-b border-[#EAE8DF] text-center">
                  <h3 className="text-[19px] font-serif text-[#1A1A1A] leading-[1.3] tracking-tight">
                    You are on a free trial of<br/>
                    <span className="font-semibold">Loop Business.</span>
                  </h3>
                </div>

                {/* Features List */}
                <div className="p-5 flex flex-col gap-5">
                  
                    <div className="flex gap-3 items-start">
                      <div className="w-[18px] h-[18px] rounded-full bg-[#F0F4E3] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} strokeWidth={3} className="text-[#84963C]" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[13px] font-bold text-[#1A1A1A] leading-tight">Unlimited meeting notes and history</p>
                        <p className="text-[12px] text-[#737373] leading-tight">Take unlimited notes, access all context</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-[18px] h-[18px] rounded-full bg-[#F0F4E3] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} strokeWidth={3} className="text-[#84963C]" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[13px] font-bold text-[#1A1A1A] leading-tight">Advanced AI thinking models</p>
                        <p className="text-[12px] text-[#737373] leading-tight">Best models for the smartest chat responses</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-[18px] h-[18px] rounded-full bg-[#F0F4E3] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} strokeWidth={3} className="text-[#84963C]" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[13px] font-bold text-[#1A1A1A] leading-tight flex items-center gap-1.5">
                          Integrations
                          <span className="flex items-center gap-1">
                            <ZapierMini />
                            <AttioMini />
                            <HubspotMini />
                          </span>
                        </p>
                        <p className="text-[12px] text-[#737373] leading-tight">Connect with Zapier, Attio, HubSpot and more</p>
                      </div>
                    </div>

                    <button onClick={() => navigate('/settings?tab=billing')} className="w-full mt-1 bg-[#1A1A1A] hover:bg-black active:scale-[0.98] text-white font-bold text-[13px] py-2.5 rounded-[8px] transition-all duration-200">
                      View plans
                    </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-[1px] bg-[#E2E0D8] w-full my-1"></div>

          {/* User Profile Container (with Relative for Dropdown positioning) */}
          <div className="relative" ref={profileRef}>
            <div 
              className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-colors group ${isProfileMenuOpen ? 'bg-[#EAE8DF]' : 'hover:bg-[#EAE8DF]/60'}`}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="flex items-center gap-3">
                {userAvatar ? (
                  <img 
                    src={userAvatar} 
                    alt={userName} 
                    className="w-6 h-6 rounded-md object-cover border border-[#E5E5E5]"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-md bg-[#E5E3D8] flex items-center justify-center">
                    <User size={14} className="text-[#555555]" />
                  </div>
                )}
                <span className="text-[14px] font-semibold text-[#1A1A1A]">{userName}</span>
              </div>
              <ChevronsUpDown size={14} className="text-[#808080] group-hover:text-[#1A1A1A] transition-colors" />
            </div>

            {/* --- PIXEL-PERFECT DROPDOWN MENU --- */}
            {isProfileMenuOpen && (
              <div className="absolute bottom-[calc(100%+8px)] left-0 w-[240px] bg-white border border-[#E5E5E5] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-1.5 z-50 animate-[popOver_0.2s_ease-out_both] origin-bottom-left">
                
                {/* Header: User Info */}
                <div className="flex items-center gap-3 p-2 mb-2">
                  {userAvatar ? (
                    <img 
                      src={userAvatar} 
                      alt={userName} 
                      className="w-[34px] h-[34px] rounded-[8px] object-cover border border-[#E5E5E5] shadow-sm"
                    />
                  ) : (
                    <div className="w-[34px] h-[34px] rounded-[8px] bg-[#E5E3D8] flex items-center justify-center border border-[#E5E5E5] shadow-sm">
                      <User size={16} className="text-[#555555]" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#1A1A1A] leading-tight">{userName}</span>
                    <span className="text-[12px] font-medium text-[#808080]">1 member</span>
                  </div>
                </div>

                {/* Invite Teammates Button */}
                <div className="px-1 mb-2">
                  <button className="w-full flex items-center justify-center gap-2 bg-[#F5F5F5] hover:bg-[#EAEAEA] active:scale-[0.98] text-[#1A1A1A] py-1.5 rounded-[8px] text-[13px] font-semibold transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-transparent hover:border-[#E5E5E5]">
                    <UserPlus size={16} strokeWidth={2.5} /> Invite teammates
                  </button>
                </div>

                {/* Faint Divider */}
                <div className="h-[1px] bg-[#F0F0F0] w-[calc(100%-16px)] mx-auto my-1.5"></div>

                {/* Email Account Switcher */}
                <div className="flex items-center justify-between px-2 py-2 group cursor-pointer hover:bg-[#F5F5F5] rounded-lg transition-colors">
                  <span className="text-[12px] font-semibold text-[#808080] truncate group-hover:text-[#1A1A1A] transition-colors">{userEmail}</span>
                  <ArrowRightLeft size={14} className="text-[#808080] shrink-0 group-hover:text-[#1A1A1A] transition-colors" />
                </div>

                {/* Current Workspace Selection */}
                <div className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#F5F5F5] cursor-pointer transition-colors group mt-0.5">
                  <div className="flex items-center gap-2.5">
                    {userAvatar ? (
                      <img 
                        src={userAvatar} 
                        alt={userName} 
                        className="w-5 h-5 rounded-[4px] object-cover border border-[#E5E5E5] shadow-sm group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-[4px] bg-[#E5E3D8] flex items-center justify-center">
                        <User size={10} className="text-[#555555]" />
                      </div>
                    )}
                    <span className="text-[13px] font-medium text-[#1A1A1A]">{userName}</span>
                  </div>
                  <Check size={14} strokeWidth={2.5} className="text-[#1A1A1A]" />
                </div>

                {/* Add Workspace */}
                <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[#F5F5F5] cursor-pointer transition-colors group mb-1">
                  <div className="w-5 flex justify-center">
                    <Plus size={16} className="text-[#808080] group-hover:text-[#1A1A1A] transition-colors" />
                  </div>
                  <span className="text-[13px] font-medium text-[#404040] group-hover:text-[#1A1A1A] transition-colors">Add workspace</span>
                </div>

                {/* Full Divider */}
                <div className="h-[1px] bg-[#E5E5E5] w-[calc(100%-16px)] mx-auto my-1.5"></div>

                {/* Bottom Action List */}
                <div className="flex flex-col gap-0.5 mt-1.5">
                  <MenuAction icon={LayoutGrid} label="Manage templates" />
                  <MenuAction icon={Smartphone} label="Get Loop for iPhone" />
                  <MenuAction icon={HelpCircle} label="Help Center" />
                  <MenuAction icon={Settings} label="Settings" shortcut={['Ctrl', ',']} onClick={() => navigate('/settings')} />
                </div>

              </div>
            )}
          </div>

        </div>

      {/* Embedded Animations */}
      <style>
        {`
          @keyframes fadeLeft {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes popSide {
            from { opacity: 0; transform: scale(0.95) translateX(-10px); }
            to { opacity: 1; transform: scale(1) translateX(0); }
          }
          @keyframes popOver {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}
      </style>
    </aside>

    {/* Create Folder Modal */}
    <CreateFolderModal 
      isOpen={isFolderModalOpen} 
      onClose={() => setIsFolderModalOpen(false)}
      onFolderCreated={fetchFolders}
    />
    </>
  );
}