import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { DodoPayments } from "dodopayments-checkout";
import { 
  ChevronLeft, 
  Home, 
  Check, 
  X, 
  Info, 
  Upload, 
  Ticket,
  MessageSquare,
  PanelLeft,
  User,
  Calendar as CalendarIcon,
  Bell,
  Blocks,
  CreditCard,
  Book,
  LogOut,
  UserX,
  ChevronDown,
  RotateCcw,
  ChevronRight,
  Code,
  Copy,
  ArrowUpRight,
  Sparkles,
  Bot,
  AlertCircle,
  Lightbulb,
  CornerDownLeft,
  Search,
  CheckCircle2
} from 'lucide-react';

// --- Custom Integration Icons ---
const SlackIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z" fill="#E01E5A"/>
    <path d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
    <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52h-2.52z" fill="#36C5F0"/>
    <path d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
    <path d="M18.956 8.835a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.835a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.835z" fill="#2EB67D"/>
    <path d="M17.687 8.835a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.522-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.313z" fill="#2EB67D"/>
    <path d="M15.166 18.958a2.528 2.528 0 0 1 2.522 2.522A2.528 2.528 0 0 1 15.166 24a2.527 2.527 0 0 1-2.521-2.52h2.521v-2.522z" fill="#ECB22E"/>
    <path d="M15.166 17.687a2.528 2.528 0 0 1-2.522-2.521 2.528 2.528 0 0 1 2.522-2.521h6.312A2.528 2.528 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.521h-6.312z" fill="#ECB22E"/>
  </svg>
);

const NotionIcon = () => (
  <div className="w-7 h-7 rounded-[8px] bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
    <span className="font-serif text-[14px] font-bold text-black tracking-tighter">N</span>
  </div>
);

const ZapierIcon = () => (
  <div className="w-7 h-7 rounded-[8px] bg-[#FF4A00] flex items-center justify-center flex-shrink-0">
    <span className="text-white font-bold text-[8px] tracking-tight">_zap</span>
  </div>
);

const AffinityIcon = () => (
  <div className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0 text-[#216BFF]">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
      <path d="M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12Z" />
    </svg>
  </div>
);

const HubspotIcon = () => (
  <div className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0">
    <svg viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2" className="w-6 h-6">
      <circle cx="12" cy="12" r="3" fill="#FF7A59" />
      <circle cx="18" cy="6" r="2" fill="#FF7A59" />
      <circle cx="6" cy="18" r="2" fill="#FF7A59" />
      <path d="M14 10L16.5 7.5" />
      <path d="M10 14L7.5 16.5" />
    </svg>
  </div>
);

const SalesforceIcon = () => (
  <div className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0">
    <svg viewBox="0 0 24 24" fill="#00A1E0" className="w-7 h-7">
      <path d="M17.5 19c2.48 0 4.5-2.02 4.5-4.5 0-2.31-1.74-4.21-4-4.47C17.57 6.64 14.93 4 11.5 4 8.7 4 6.27 5.75 5.37 8.24 2.87 8.52 1 10.63 1 13.25 1 16.01 3.24 18.25 6 18.25h11.5z" />
    </svg>
  </div>
);

const AttioIcon = () => (
  <div className="w-7 h-7 rounded-[8px] bg-white flex items-center justify-center flex-shrink-0">
    <div className="w-5 h-5 bg-black rounded-sm relative overflow-hidden transform -rotate-12">
      <div className="absolute top-1/2 left-0 w-full h-1.5 bg-white -translate-y-1/2"></div>
    </div>
  </div>
);

const PipedriveIcon = () => (
  <div className="w-7 h-7 rounded-[8px] bg-[#00AA55] flex items-center justify-center flex-shrink-0">
    <span className="text-white font-bold text-[14px] font-sans">p</span>
  </div>
);

const GoogleDocsIcon = () => (
  <div className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#4285F4"/>
      <rect x="6" y="5" width="12" height="14" rx="1" fill="white"/>
      <rect x="8" y="8" width="8" height="1.5" fill="#4285F4"/>
      <rect x="8" y="11" width="8" height="1.5" fill="#4285F4"/>
      <rect x="8" y="14" width="5" height="1.5" fill="#4285F4"/>
    </svg>
  </div>
);

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${active ? 'bg-[#EBE9E0] text-[#1A1A1A]' : 'text-gray-600 hover:bg-black/5 hover:text-[#1A1A1A]'}`}
  >
    {React.cloneElement(icon, { className: "w-4 h-4" })}
    {label}
  </button>
);

const ToggleSwitch = ({ active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out flex items-center cursor-pointer border-none outline-none ${active ? 'bg-[#5A6B31]' : 'bg-gray-300'}`}
  >
    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${active ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

// --- Main App Component ---
export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [feedbackType, setFeedbackType] = useState('problem');
  const [isLoading, setIsLoading] = useState(true);

  // Read tab from query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  useEffect(() => {
    try {
      DodoPayments.Initialize({
        mode: "test",
        displayType: "overlay",
        onEvent: (event) => {
          console.log("Checkout event:", event);
        },
      });
    } catch (e) {
      console.error('DodoPayments init error:', e);
    }
  }, []);

  const handleUpgrade = async (planName?: string, overrideProductId?: string) => {
    try {
      setToastMessage('Starting checkout...');
      let productId = overrideProductId;
      if (!productId && planName) {
        if (planName === 'Basic') productId = billingCycle === 'yearly' ? 'pdt_0Ne4ASfuiMtIlD1jjIfhH' : 'pdt_0Ne4ASd09ENvPyjiE0rgm';
        else if (planName === 'Pro') productId = billingCycle === 'yearly' ? 'pdt_0Ne4ASlalRUH5FcYxD1TX' : 'pdt_0Ne4ASj0aTLDvBsmnSNJI';
      }
      
      if (!productId) {
         setToastMessage('Contacting sales...');
         if (toastTimer.current) clearTimeout(toastTimer.current);
         toastTimer.current = setTimeout(() => setToastMessage(null), 3000);
         return;
      }
      
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          productId: productId,
          email: userEmail 
        }
      });

      if (error) throw error;
      
      if (data?.url) {
        DodoPayments.Checkout.open({ checkoutUrl: data.url });
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setToastMessage('Error starting checkout');
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToastMessage(null), 3000);
    }
  };

  // --- Auto-Save Toast System ---
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const triggerSave = () => {
    setToastMessage('Settings saved');
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Profile State
  const [userEmail, setUserEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [linkedinUsername, setLinkedinUsername] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [trialDaysLeft, setTrialDaysLeft] = useState(3);
  const [userPlan, setUserPlan] = useState('trial');
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Calendar State
  const [showNoParticipants, setShowNoParticipants] = useState(true);
  const [calendars, setCalendars] = useState([
    { id: 1, name: 'My Schedule', color: 'bg-[#F4DD77]', active: false },
    { id: 2, name: 'Family', color: 'bg-[#CA88E0]', active: false },
    { id: 3, name: 'Holidays', color: 'bg-[#34A853]', active: false },
  ]);

  // Notifications State
  const [notifyScheduled, setNotifyScheduled] = useState(true);
  const [notifyMarketing, setNotifyMarketing] = useState(true);
  const [shareAddedFolder, setShareAddedFolder] = useState('Activity Feed and Email');
  const [shareNoteAdded, setShareNoteAdded] = useState('Off');
  const [shareNoteShared, setShareNoteShared] = useState('Activity Feed and Email');

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      
      const user = session.user;
      setUserEmail(user.email || '');
      
      if (user.created_at) {
        const createdDate = new Date(user.created_at);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - createdDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        setTrialDaysLeft(Math.max(0, 3 - diffDays));
      }
      
      const meta = user.user_metadata || {};
      setFullName(meta.full_name || '');
      setAvatarUrl(meta.avatar_url || '');
      setJobTitle(meta.job_title || '');
      setLinkedinUsername(meta.linkedin_username || '');
      setCompanyName(meta.company_name || '');
      setCompanyDescription(meta.company_description || '');
      setUserPlan(meta.plan || 'trial');

      setNotifyScheduled(meta.notifyScheduled ?? true);
      setNotifyMarketing(meta.notifyMarketing ?? true);
      setShareAddedFolder(meta.shareAddedFolder || 'Activity Feed and Email');
      setShareNoteAdded(meta.shareNoteAdded || 'Off');
      setShareNoteShared(meta.shareNoteShared || 'Activity Feed and Email');

      setShowNoParticipants(meta.showNoParticipants ?? true);
      if (meta.calendars) {
        setCalendars(meta.calendars);
      } else {
        setCalendars([
          { id: 1, name: user.email || 'My Calendar', color: 'bg-[#D3A1A1]', active: true },
          { id: 2, name: 'My Schedule', color: 'bg-[#F4DD77]', active: false },
          { id: 3, name: 'Family', color: 'bg-[#CA88E0]', active: false },
        ]);
      }
      
      setIsLoading(false);
    };
    fetchUserData();
  }, [navigate]);

  const saveToSupabase = async (updates: any) => {
    try {
      await supabase.auth.updateUser({
        data: updates
      });
      triggerSave();
    } catch (err) {
      console.error('Error saving settings', err);
    }
  };

  const updateProfile = async () => {
    await saveToSupabase({
      full_name: fullName,
      job_title: jobTitle,
      linkedin_username: linkedinUsername,
      company_name: companyName,
      company_description: companyDescription
    });
  };

  const toggleCalendar = async (id: number) => {
    const updated = calendars.map(cal => cal.id === id ? { ...cal, active: !cal.active } : cal);
    setCalendars(updated);
    await saveToSupabase({ calendars: updated });
  };

  const resetSharingNotifications = async () => {
    setShareAddedFolder('Activity Feed and Email');
    setShareNoteAdded('Off');
    setShareNoteShared('Activity Feed and Email');
    await saveToSupabase({
      shareAddedFolder: 'Activity Feed and Email',
      shareNoteAdded: 'Off',
      shareNoteShared: 'Activity Feed and Email'
    });
  };

  const billingFeatures = [
    { name: '130+ languages support', basic: true, pro: true, enterprise: true, highlight: true },
    { name: 'Users included', basic: '1 user', pro: 'Up to 5', enterprise: 'Custom' },
    { name: 'Unlimited meeting notes', basic: true, pro: true, enterprise: true },
    { name: 'Meeting history', info: true, basic: '30 days', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'AI chat', basic: true, pro: true, enterprise: true },
    { name: 'Custom layouts', basic: false, pro: true, enterprise: true },
    { name: 'Integrations', info: true, basic: 'basic-icons', pro: 'all-icons', enterprise: 'all-icons' },
    { name: 'Priority support', basic: false, pro: true, enterprise: true },
    { name: 'API access', basic: false, pro: 'Personal API', enterprise: 'Enterprise API' },
    { name: 'Single sign-on (SSO)', basic: false, pro: false, enterprise: 'Available for teams with 50+ users' },
    { name: 'Admin controls', info: true, basic: false, pro: false, enterprise: true },
  ];

  const renderValue = (value) => {
    if (value === true) return <Check className="w-5 h-5 text-[#5A6B31] mx-auto" strokeWidth={2.5} />;
    if (value === false) return <X className="w-5 h-5 text-gray-300 mx-auto" strokeWidth={2} />;
    if (value === 'basic-icons') return <div className="flex justify-center"><SlackIcon /></div>;
    if (value === 'all-icons') return (
      <div className="flex justify-center gap-1.5 flex-wrap px-2">
        <SlackIcon /> <NotionIcon /> <HubspotIcon /> <ZapierIcon /> <AffinityIcon />
      </div>
    );
    return <span className={`text-sm ${typeof value === 'string' && value.includes('Available') ? 'text-xs text-gray-500 leading-tight block px-4' : 'text-gray-600'}`}>{value}</span>;
  };

  const integrationsList = [
    { name: 'Slack', desc: 'Share meeting summaries to Slack channels', icon: <SlackIcon /> },
    { name: 'Notion', desc: 'Export meeting notes to Notion pages', icon: <NotionIcon /> },
    { name: 'Google Docs', desc: 'Send meeting notes directly to Google Docs', icon: <GoogleDocsIcon /> },
    { name: 'Zapier', desc: 'Connect Loops to thousands of apps', icon: <ZapierIcon /> },
    { name: 'Affinity', desc: 'Sync meeting notes to Affinity', icon: <AffinityIcon /> },
    { name: 'HubSpot', desc: 'Sync meeting notes to HubSpot', icon: <HubspotIcon /> },
    { name: 'Salesforce', desc: 'Sync meeting notes to Salesforce', icon: <SalesforceIcon /> },
    { name: 'Attio', desc: 'Sync meeting notes to Attio', icon: <AttioIcon /> },
    { name: 'Pipedrive', desc: 'Sync meeting notes to Pipedrive', icon: <PipedriveIcon /> },
  ];

  const renderProfile = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-[#1A1A1A] tracking-tight mb-2">Profile</h1>
        <p className="text-gray-500 text-sm">Loops works best knowing a little about you. Info here is visible to other users in your meetings.</p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-sm font-medium text-gray-500 ml-1 mb-3">Account</h2>
          <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm text-[#1A1A1A] font-medium">Email</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{userEmail}</span>
                <img src={avatarUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${fullName || 'User'}&backgroundColor=e5e7eb`} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm text-[#1A1A1A] font-medium">Full name</span>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} onBlur={updateProfile} className="w-full sm:w-[320px] px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all placeholder:text-gray-400" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm text-[#1A1A1A] font-medium">Job title</span>
              <input type="text" placeholder="Investing Partner" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} onBlur={updateProfile} className="w-full sm:w-[320px] px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all placeholder:text-gray-400" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm text-[#1A1A1A] font-medium">LinkedIn username</span>
              <div className="flex items-center w-full sm:w-[320px] bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-gray-300 focus-within:ring-4 focus-within:ring-gray-100 transition-all">
                <span className="px-3 py-2 text-sm text-gray-500 bg-[#FAFAFA] border-r border-gray-200 select-none">linkedin.com/in/</span>
                <input type="text" placeholder="sarahjohnson" value={linkedinUsername} onChange={(e) => setLinkedinUsername(e.target.value)} onBlur={updateProfile} className="w-full px-3 py-2 text-sm text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-medium text-gray-500 ml-1 mb-3">Your company</h2>
          <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm text-[#1A1A1A] font-medium">Company name</span>
              <input type="text" placeholder="Acme Inc." value={companyName} onChange={(e) => setCompanyName(e.target.value)} onBlur={updateProfile} className="w-full sm:w-[320px] px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all placeholder:text-gray-400" />
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-[#1A1A1A] font-medium block">Company description</span>
                <span className="text-sm text-gray-500 block">Loops takes this into account when summarizing your meetings</span>
              </div>
              <textarea value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} onBlur={updateProfile} className="w-full min-h-[120px] p-4 text-sm text-gray-900 bg-white border border-gray-200 rounded-[16px] focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all placeholder:text-gray-400 resize-none"></textarea>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-[#1A1A1A] tracking-tight">Calendar</h1>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-medium text-gray-500 ml-1 mb-3">Display</h2>
          <div className="bg-white border border-gray-200 rounded-[24px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#F5F5F5] rounded-xl flex items-center justify-center flex-shrink-0 text-gray-500">
                <UserX className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <span className="text-[15px] text-[#1A1A1A] font-medium block mb-0.5">Show events with no participants</span>
                <span className="text-[13px] text-gray-500 block">'Coming up' section will include events without participants or a video link</span>
              </div>
            </div>
            <ToggleSwitch active={showNoParticipants} onClick={async () => { 
              const nextVal = !showNoParticipants;
              setShowNoParticipants(nextVal); 
              await saveToSupabase({ showNoParticipants: nextVal });
            }} />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between ml-1 mb-3 pr-2">
            <h2 className="text-sm font-medium text-gray-500">Visible calendars</h2>
            <button onClick={() => { setCalendars(calendars.map(c => ({...c, active: false}))); triggerSave(); }} className="text-sm font-medium text-[#5A6B31] hover:text-[#4d5c29] transition-colors">Reset</button>
          </div>
          <div className="bg-white border border-gray-200 rounded-[24px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-2">
              {calendars.map((calendar) => (
                <div key={calendar.id} className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <span className={`w-3 h-3 rounded-full ${calendar.color}`}></span>
                    <span className="text-[15px] text-[#1A1A1A]">{calendar.name}</span>
                  </div>
                  <ToggleSwitch active={calendar.active} onClick={() => toggleCalendar(calendar.id)} />
                </div>
              ))}
            </div>
            <div className="px-6 py-5 border-t border-gray-100 bg-white">
              <span className="text-[13px] text-gray-500">Don't see the calendar you want? <a href="#" className="underline underline-offset-2 hover:text-gray-800 transition-colors">See how to connect other calendars</a></span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-[#1A1A1A] tracking-tight">Notifications</h1>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-sm font-medium text-gray-500 ml-1 mb-3">Meeting notifications</h2>
          <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[15px] text-[#1A1A1A] font-medium block mb-0.5">Scheduled meetings</span>
                <span className="text-[13px] text-gray-500 block">Show notifications 1 minute before meetings start based on your Calendar</span>
              </div>
              <ToggleSwitch active={notifyScheduled} onClick={async () => { 
                const nextVal = !notifyScheduled;
                setNotifyScheduled(nextVal); 
                await saveToSupabase({ notifyScheduled: nextVal });
              }} />
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between ml-1 mb-3 pr-2">
            <h2 className="text-sm font-medium text-gray-500">Sharing notifications</h2>
            <button onClick={resetSharingNotifications} className="text-[13px] font-medium text-[#5A6B31] hover:text-[#4d5c29] transition-colors flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" /> Reset to default
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[15px] text-[#1A1A1A] font-medium block mb-0.5">Added to folder</span>
                <span className="text-[13px] text-gray-500 block">Get notified when you're added to a new folder.</span>
              </div>
              <div className="relative">
                <select value={shareAddedFolder} onChange={async (e) => { 
                  const nextVal = e.target.value;
                  setShareAddedFolder(nextVal); 
                  await saveToSupabase({ shareAddedFolder: nextVal });
                }} className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-10 text-[14px] text-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-300 transition-all cursor-pointer min-w-[200px]">
                  <option>Activity Feed and Email</option>
                  <option>Activity Feed Only</option>
                  <option>Off</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[15px] text-[#1A1A1A] font-medium block mb-0.5">Note added to folder</span>
                <span className="text-[13px] text-gray-500 block">Get notified when a note is added to a folder you have access to.</span>
              </div>
              <div className="relative flex justify-end">
                <select value={shareNoteAdded} onChange={async (e) => { 
                  const nextVal = e.target.value;
                  setShareNoteAdded(nextVal); 
                  await saveToSupabase({ shareNoteAdded: nextVal });
                }} className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-10 text-[14px] text-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-300 transition-all cursor-pointer min-w-[120px]">
                  <option>Activity Feed and Email</option>
                  <option>Activity Feed Only</option>
                  <option>Off</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[15px] text-[#1A1A1A] font-medium block mb-0.5">Note shared with you</span>
                <span className="text-[13px] text-gray-500 block">Get notified when someone shares a note directly with you.</span>
              </div>
              <div className="relative">
                <select value={shareNoteShared} onChange={async (e) => { 
                  const nextVal = e.target.value;
                  setShareNoteShared(nextVal); 
                  await saveToSupabase({ shareNoteShared: nextVal });
                }} className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-10 text-[14px] text-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-300 transition-all cursor-pointer min-w-[200px]">
                  <option>Activity Feed and Email</option>
                  <option>Activity Feed Only</option>
                  <option>Off</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-medium text-gray-500 ml-1 mb-3">Marketing emails</h2>
          <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[15px] text-[#1A1A1A] font-medium block mb-0.5">Product updates and tips</span>
              <span className="text-[13px] text-gray-500 block">Receive product updates and tips to help you make the most of Loops.</span>
            </div>
            <ToggleSwitch active={notifyMarketing} onClick={async () => { 
              const nextVal = !notifyMarketing;
              setNotifyMarketing(nextVal); 
              await saveToSupabase({ notifyMarketing: nextVal });
            }} />
          </div>
        </section>
      </div>
    </div>
  );

  const renderConnectors = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-[#1A1A1A] tracking-tight mb-2">Connectors</h1>
        <p className="text-gray-500 text-sm">Connect Loops to your favorite tools</p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-sm font-medium text-gray-500 ml-1 mb-3">Integrations</h2>
          <div className="bg-white border border-gray-200 rounded-[24px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
            {integrationsList.map((integration, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between p-4 px-6 hover:bg-gray-50/50 cursor-pointer transition-colors group
                ${idx === 0 ? 'rounded-t-[24px]' : ''} 
                ${idx === integrationsList.length - 1 ? 'rounded-b-[24px]' : ''}`}
              >
                <div className="flex items-center gap-5">
                  {integration.icon}
                  <div>
                    <div className="text-[15px] text-[#1A1A1A] font-medium mb-0.5">{integration.name}</div>
                    <div className="text-[13px] text-gray-500">{integration.desc}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-medium text-gray-500 ml-1 mb-3">API</h2>
          <div className="bg-white border border-gray-200 rounded-[24px] p-4 px-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:bg-gray-50/50 cursor-pointer transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-5">
              <div className="w-7 h-7 rounded-[8px] bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[15px] text-[#1A1A1A] font-medium mb-0.5">API keys</div>
                <div className="text-[13px] text-gray-500">Manage API keys for programmatic access</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
          </div>
        </section>

        <section>
          <h2 className="text-sm font-medium text-gray-500 ml-1 mb-3">MCP</h2>
          <div className="bg-white border border-gray-200 rounded-[24px] p-6 md:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#CDE267] rounded-xl flex items-center justify-center shadow-sm">
                <span className="font-serif font-bold text-xl text-[#2d3a14] tracking-tighter">g</span>
              </div>
              <span className="text-gray-400 text-sm font-medium">+</span>
              <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-3.5 py-2.5 bg-white shadow-sm">
                <Sparkles className="w-4 h-4 text-[#D36B3B]" />
                <Bot className="w-4 h-4 text-gray-700" />
                <Code className="w-4 h-4 text-gray-700" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4">Bring your meeting notes to your AI tools</h3>
              <div className="space-y-3 text-[14px] text-gray-600 leading-relaxed">
                <p className="flex flex-wrap items-center gap-y-2">
                  1. In your AI tool, add Loops MCP using the public URL
                  <span className="inline-flex items-center gap-1.5 bg-[#F3F5E9] text-[#5A6B31] px-2.5 py-1 rounded-md font-medium ml-1 cursor-pointer hover:bg-[#e9ecd6] transition-colors">
                    https://mcp.loops.ai/mcp <Copy className="w-3.5 h-3.5" />
                  </span>
                </p>
                <p>2. Authenticate via the browser OAuth flow.</p>
                <p>3. Chat, search, and work with meeting context anywhere.</p>
              </div>
            </div>
            <div className="pt-2">
              <button className="bg-[#1A1A1A] hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 w-fit">
                Learn more <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-[700px]">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-[#1A1A1A] tracking-tight mb-2">Send feedback</h1>
        <p className="text-gray-500 text-[15px]">Report a bug, ask a question, or suggest a feature.</p>
      </div>

      <div className="bg-[#F5F5F5] p-1 rounded-[14px] inline-flex mb-8">
        <button
          onClick={() => setFeedbackType('problem')}
          className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-[14px] font-medium transition-all ${feedbackType === 'problem' ? 'bg-white text-[#1A1A1A] shadow-[0_1px_3px_rgba(0,0,0,0.05)]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <AlertCircle className="w-4 h-4" /> Problem
        </button>
        <button
          onClick={() => setFeedbackType('feature')}
          className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-[14px] font-medium transition-all ${feedbackType === 'feature' ? 'bg-white text-[#1A1A1A] shadow-[0_1px_3px_rgba(0,0,0,0.05)]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Lightbulb className="w-4 h-4" /> Feature request
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-[15px] font-medium text-[#1A1A1A] mb-1">
            {feedbackType === 'problem' ? 'Report a bug' : 'Suggest a feature'}
          </h3>
          <p className="text-[14px] text-gray-500 mb-3 leading-relaxed">
            {feedbackType === 'problem' 
              ? 'What steps led to this bug, and what happened vs. what you expected? Have you tried anything to fix it?'
              : 'How would this feature help you? What problem does it solve?'}
          </p>
          <textarea 
            className="w-full min-h-[160px] p-4 text-[14px] text-gray-900 bg-[#FAFAFA] border border-gray-200 rounded-[16px] focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all placeholder:text-gray-400 resize-none"
            placeholder={feedbackType === 'problem' 
              ? "Steps: After my notes were generated, I clicked \"All Templates.\"\nExpected: A menu of available templates would open.\nActual: The button did not respond or display any options.\nAttempts to Fix: Restarted Loops and tried again; issue persists."
              : "Describe your feature request..."}
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Upload className="w-4 h-4 text-gray-500" /> Add screenshot or video
          </button>
          <span className="text-[14px] text-gray-400">or paste directly into the text area</span>
        </div>

        <button className="bg-[#1A1A1A] hover:bg-black text-white px-5 py-2.5 rounded-xl text-[14px] font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 w-fit mt-2">
          {feedbackType === 'problem' ? 'Report bug' : 'Submit request'}
          <span className="flex items-center text-gray-400 text-xs ml-1 font-sans tracking-wide">
            Ctrl <CornerDownLeft className="w-3 h-3 ml-0.5" />
          </span>
        </button>

        <hr className="border-t border-gray-200/80 my-8" />

        <div className="space-y-4 text-[14px] text-gray-600 leading-relaxed">
          <p>
            Got a question? Check <span onClick={() => setActiveTab('help')} className="text-[#5A6B31] hover:underline font-medium cursor-pointer">Help Center</span> for frequently asked questions, including common feature requests.
          </p>
          <p>
            If you've still got questions, you can email us at <a href="mailto:hey@loops.so" className="text-[#5A6B31] hover:underline font-medium">hey@loops.so</a>, or join our <a href="#" className="text-[#5A6B31] hover:underline font-medium">Slack community</a>. We read every message, but can't respond to every request.
          </p>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-12">
      <div>
        <h1 className="text-4xl font-serif text-[#1A1A1A] tracking-tight">Billing</h1>
        
        {/* Billing Toggle */}
        <div className="flex mt-6">
          <div className="bg-[#EBE9E0]/50 p-1.5 rounded-full inline-flex items-center relative border border-gray-200/50 shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-[14px] font-medium transition-all ${billingCycle === 'monthly' ? 'bg-white text-[#1A1A1A] shadow-[0_2px_8px_rgba(0,0,0,0.06)]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white text-[#1A1A1A] shadow-[0_2px_8px_rgba(0,0,0,0.06)]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Yearly
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider uppercase transition-colors ${billingCycle === 'yearly' ? 'bg-[#5A6B31] text-white' : 'bg-[#E2E8CE] text-[#5A6B31]'}`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500 ml-1">Active plan</h2>
        <div className="bg-white border border-gray-200 rounded-[24px] p-2 flex flex-col md:flex-row shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-serif text-[#1A1A1A] capitalize">{userPlan === 'trial' ? 'Free Trial' : userPlan + ' Plan'}</h3>
              {userPlan === 'trial' && <span className="bg-[#F0F4E3] text-[#5A6B31] text-xs font-semibold px-2.5 py-1 rounded-full">{trialDaysLeft} days left</span>}
            </div>
            <p className="text-gray-500 text-sm flex items-center gap-1.5">
              Full access to {userPlan === 'trial' ? 'Basic' : 'all features'} <span className="w-1 h-1 rounded-full bg-gray-300"></span> {userPlan === 'pro' ? 'Up to 5 team members' : '1 team member'}
            </p>
          </div>
          <div className="bg-[#FAFAFA] rounded-[18px] p-6 md:p-8 flex-1 border border-gray-100 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h4 className="text-[15px] font-medium text-gray-900 mb-1">Upgrade to Pro</h4>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-serif text-[#1A1A1A]">${billingCycle === 'yearly' ? '39' : '49'}</span>
                  <span className="text-sm text-gray-500">total per month</span>
                </div>
              </div>
              <button onClick={() => handleUpgrade('Pro')} className="bg-[#1A1A1A] hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 group">
                Upgrade
                <Upload className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
            <div className="flex items-center gap-6 pt-4 border-t border-gray-200/60">
              <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 font-medium">
                <Upload className="w-4 h-4" /> Share checkout link
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 font-medium">
                <Ticket className="w-4 h-4" /> Use coupon
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500 ml-1">Workspace summary</h2>
        <div className="bg-white border border-gray-200 rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row gap-8 md:gap-24 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Team member</p>
            <p className="text-4xl font-serif text-[#1A1A1A]">1</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Your meetings</p>
            <p className="text-4xl font-serif text-[#1A1A1A]">14</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Workspace meetings</p>
            <p className="text-4xl font-serif text-[#1A1A1A]">14</p>
          </div>
        </div>
      </section>

      <section className="pt-8">
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[800px] w-full">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-2 mb-8 items-end pl-2">
              <div className="pb-4 font-serif text-lg text-gray-900 font-medium">Compare all plans</div>
              <div className="text-center pb-4 flex flex-col items-center">
                <h3 className="text-xl font-serif text-[#1A1A1A]">Basic</h3>
                <p className="text-sm text-gray-500 mt-1">${billingCycle === 'yearly' ? '15' : '19'}/user/mo</p>
              </div>
              <div className="text-center bg-[#F3F5E9] rounded-t-[20px] pt-6 pb-4 px-2 flex flex-col items-center relative">
                <h3 className="text-xl font-serif text-[#1A1A1A]">Pro</h3>
                <p className="text-sm text-gray-600 mt-1 mb-3">${billingCycle === 'yearly' ? '39' : '49'}/mo total</p>
                <button onClick={() => handleUpgrade('Pro')} className="bg-[#5A6B31] hover:bg-[#4d5c29] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm">
                  Upgrade <Upload className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-center pb-4 flex flex-col items-center">
                <h3 className="text-xl font-serif text-[#1A1A1A]">Enterprise</h3>
                <p className="text-sm text-gray-500 mt-1">Custom</p>
                <button className="mt-3 border border-gray-200 hover:border-gray-300 bg-white text-gray-700 px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm">
                  Upgrade <Upload className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-2 py-3 pl-2 text-sm font-medium text-gray-900">
                <div>Features</div><div></div><div className="bg-[#F3F5E9]"></div><div></div>
              </div>
              {billingFeatures.map((feature, idx) => (
                <div key={idx} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-2 group">
                  <div className="py-4 pl-2 flex items-center gap-1.5 border-b border-gray-100 group-hover:bg-gray-50/50 transition-colors rounded-l-xl">
                    <span className={`text-sm ${feature.highlight ? 'font-medium text-gray-900' : 'text-gray-600'}`}>{feature.name}</span>
                    {feature.info && <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />}
                  </div>
                  <div className="py-4 flex items-center justify-center border-b border-gray-100 group-hover:bg-gray-50/50 transition-colors">{renderValue(feature.basic)}</div>
                  <div className={`py-4 flex items-center justify-center bg-[#F3F5E9] ${idx === billingFeatures.length - 1 ? 'rounded-b-[20px] pb-6' : ''}`}>{renderValue(feature.pro)}</div>
                  <div className="py-4 flex items-center justify-center border-b border-gray-100 group-hover:bg-gray-50/50 transition-colors rounded-r-xl">{renderValue(feature.enterprise)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4">
        <div className="bg-white border border-gray-200 rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
          <div>
            <h3 className="text-2xl font-serif text-[#1A1A1A] mb-2">Contact Sales</h3>
            <p className="text-gray-500 text-sm">Learn more about Enterprise custom solutions</p>
          </div>
          <button className="border border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm">
            Talk to us
          </button>
        </div>
      </section>
    </div>
  );

  const renderHelpCenter = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-[800px]">
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-[#1A1A1A] tracking-tight mb-2">Help Center</h1>
        <p className="text-gray-500 text-[15px]">Find answers, tutorials, and support to get the most out of Loops.</p>
      </div>

      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search for articles..." 
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-300 transition-all text-[15px] placeholder:text-gray-400" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {[
          { title: 'Getting Started', desc: 'Learn the basics and set up your workspace.' },
          { title: 'Meetings & AI', desc: 'How to use AI chat, summaries, and meeting history.' },
          { title: 'Integrations', desc: 'Connect Loops with Slack, Notion, and more tools.' },
          { title: 'Billing & Account', desc: 'Manage your subscription, users, and profile details.' }
        ].map((cat, idx) => (
          <div key={idx} className="p-6 bg-white border border-gray-200 rounded-[24px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group">
            <h3 className="font-medium text-[#1A1A1A] mb-1 group-hover:text-[#5A6B31] transition-colors">{cat.title}</h3>
            <p className="text-[14px] text-gray-500 leading-relaxed">{cat.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#F3F5E9] border border-[#E2E8CE] rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-serif text-[#1A1A1A] mb-1">Can't find what you're looking for?</h3>
          <p className="text-[#5A6B31] text-sm">Our support team is here to help.</p>
        </div>
        <button onClick={() => setActiveTab('feedback')} className="bg-[#5A6B31] hover:bg-[#4d5c29] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm whitespace-nowrap">
          Talk to a human
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#FCFBF8] text-slate-900 font-sans selection:bg-[#E2E8CE] selection:text-slate-900 overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.08); border-radius: 10px; border: 3px solid #FCFBF8; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.15); }
        * { scrollbar-width: thin; scrollbar-color: rgba(0, 0, 0, 0.08) transparent; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
      
      {/* Global Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 flex items-center gap-2.5 bg-[#1A1A1A] text-white px-5 py-3 rounded-full shadow-lg ${toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
        <CheckCircle2 className="w-4 h-4 text-[#CDE267]" />
        <span className="text-[14px] font-medium tracking-wide">{toastMessage}</span>
      </div>

      {/* Sidebar */}
      <aside className="w-[240px] flex-shrink-0 border-r border-gray-200/60 bg-[#FCFBF8] flex flex-col py-4 overflow-y-auto hidden md:flex z-10">
        <div className="px-4 mb-6">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <PanelLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <img src={avatarUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${fullName || 'User'}&backgroundColor=e5e7eb`} alt={fullName || 'User'} className="w-14 h-14 rounded-full mb-3 object-cover border border-gray-200" />
          <h2 className="font-serif text-lg text-[#1A1A1A] mb-0.5">{fullName || userEmail?.split('@')[0] || 'User'}</h2>
          <p className="text-xs text-gray-500">{userEmail}</p>
        </div>

        <nav className="flex-1 px-3 space-y-6">
          <div className="space-y-0.5">
            <NavItem icon={<User />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            <NavItem icon={<CalendarIcon />} label="Calendar" active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} />
            <NavItem icon={<Bell />} label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
            <NavItem icon={<Blocks />} label="Connectors" active={activeTab === 'connectors'} onClick={() => setActiveTab('connectors')} />
          </div>

          <div>
            <div className="px-3 mb-2 text-xs font-medium text-gray-400">Workspace</div>
            <div className="space-y-0.5">
              <NavItem icon={<CreditCard />} label="Billing" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
            </div>
          </div>

          <div>
            <div className="px-3 mb-2 text-xs font-medium text-gray-400">Support</div>
            <div className="space-y-0.5">
              <NavItem icon={<Book />} label="Help Center" active={activeTab === 'help'} onClick={() => setActiveTab('help')} />
              <NavItem icon={<MessageSquare />} label="Send feedback" active={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')} />
            </div>
          </div>
        </nav>

        <div className="px-3 mt-8">
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              navigate('/auth');
            }}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#E56953] hover:bg-red-50 rounded-xl w-full transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto relative">
        <div className="h-12 border-b border-gray-200/60 bg-[#FCFBF8]/80 backdrop-blur-sm sticky top-0 z-50 flex items-center px-4 relative flex-shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/home')} className="px-4 py-1.5 hover:bg-black/5 rounded-full transition-colors text-gray-500 border border-gray-200 flex items-center justify-center">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('/home')} className="px-4 py-1.5 hover:bg-black/5 rounded-full transition-colors text-gray-500 border border-gray-200 flex items-center justify-center">
              <Home className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm font-medium text-gray-600 absolute left-1/2 -translate-x-1/2">Settings</div>
        </div>

        <main className="max-w-[1000px] w-full mx-auto px-6 pt-12 pb-24">
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'calendar' && renderCalendar()}
          {activeTab === 'notifications' && renderNotifications()}
          {activeTab === 'connectors' && renderConnectors()}
          {activeTab === 'feedback' && renderFeedback()}
          {activeTab === 'help' && renderHelpCenter()}
          {activeTab === 'billing' && renderBilling()}
        </main>
      </div>
    </div>
  );
}