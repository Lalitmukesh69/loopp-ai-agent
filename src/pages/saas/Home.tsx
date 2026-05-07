import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Video, 
  ChevronLeft, ChevronRight, SlidersHorizontal,
  Calendar, MapPin, Users, ExternalLink, RefreshCw,
  FileText, Mic, Clock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  start: string | null;
  end: string | null;
  isAllDay: boolean;
  location: string | null;
  meetLink: string | null;
  attendees: { email: string; name: string; self: boolean; responseStatus: string }[];
  status: string;
  colorId: string | null;
}

interface DayGroup {
  date: string;
  dayNumber: string;
  month: string;
  dayName: string;
  isCurrent: boolean;
  events: CalendarEvent[];
}

interface RecentLoop {
  id: string;
  title: string;
  status: string;
  started_at: string;
  duration_seconds: number | null;
  summary: string | null;
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

const MeetIcon = () => (
  <div className="w-[22px] h-[22px] rounded-[4px] border border-[#E5E5E5] bg-white flex items-center justify-center text-gray-700 shrink-0 shadow-sm relative">
    <Video size={12} strokeWidth={2} />
    <div className="absolute top-[3px] right-[3px] w-1 h-1 bg-red-500 rounded-full"></div>
  </div>
);

const CalendarIcon = () => (
  <div className="w-[22px] h-[22px] rounded-[4px] border border-[#E5E5E5] bg-white flex items-center justify-center text-gray-700 shrink-0 shadow-sm">
    <Calendar size={12} strokeWidth={2} />
  </div>
);

// --- Window Controls ---
const WindowControls = ({ onQuickMeeting }: { onQuickMeeting: () => void }) => (
  <div className="absolute top-0 right-0 w-full flex justify-end items-center p-4 z-50 pointer-events-none">
    <div className="pointer-events-auto flex items-center gap-6">
      <button 
        onClick={onQuickMeeting}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E5E5] text-[#404040] text-[13px] font-medium hover:bg-white hover:shadow-sm transition-all active:scale-95 cursor-pointer">
        <Plus size={14} strokeWidth={2.5} /> Quick meeting
      </button>
    </div>
  </div>
);

// --- Event Item Component ---
const EventItem = ({ event, isFirst }: { event: CalendarEvent; isFirst: boolean }) => {
  const formatTime = (dateStr: string | null) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const timeRange = event.isAllDay 
    ? 'All day' 
    : `${formatTime(event.start)} - ${formatTime(event.end)}`;

  const hasMeetLink = !!event.meetLink;
  const attendeeCount = event.attendees.filter(a => !a.self).length;

  return (
    <div className="flex items-start group cursor-pointer w-full hover:bg-[#F9F9F6] p-2 -ml-2 rounded-lg transition-colors">
      
      {/* Vertical Status Line */}
      <div className="w-[2px] h-full min-h-[36px] mr-4 shrink-0 rounded-full flex flex-col pt-1.5">
        <div className={`w-[2px] h-[18px] rounded-full transition-colors ${isFirst ? 'bg-[#E55986]' : 'bg-[#D4D4D4] group-hover:bg-[#A3A3A3]'}`}></div>
      </div>

      <div className="flex flex-col gap-0.5 mt-0.5 flex-1 transition-transform duration-300 group-hover:translate-x-1">
        <div className="flex items-center gap-2">
          {hasMeetLink ? <MeetIcon /> : <CalendarIcon />}
          <span className="text-[14px] font-medium text-[#1A1A1A] truncate">{event.title}</span>
        </div>
        <span className="text-[12px] text-[#808080] ml-[1px]">{timeRange}</span>
        
        {/* Extra info row */}
        <div className="flex items-center gap-3 mt-0.5">
          {attendeeCount > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-[#A3A3A3]">
              <Users size={10} strokeWidth={2} />
              {attendeeCount} {attendeeCount === 1 ? 'guest' : 'guests'}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1 text-[11px] text-[#A3A3A3] truncate max-w-[160px]">
              <MapPin size={10} strokeWidth={2} />
              {event.location}
            </span>
          )}
          {hasMeetLink && (
            <a 
              href={event.meetLink!} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[11px] text-[#4B8BBE] hover:text-[#1D6FA5] transition-colors"
            >
              <ExternalLink size={10} strokeWidth={2} />
              Join
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Recent Meeting Item ---
const RecentMeetingItem = ({ loop, onClick }: { loop: RecentLoop; onClick: () => void }) => {
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0 min';
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const statusColor = loop.status === 'completed' ? 'bg-emerald-500' : loop.status === 'live' ? 'bg-red-500' : 'bg-amber-500';

  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-[#F5F4EF]/80 cursor-pointer transition-all duration-200 group"
    >
      <div className="w-[38px] h-[38px] rounded-[10px] border border-[#E5E5E5] bg-white shadow-sm flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#D1D1D1]">
        <Mic size={16} className="text-[#666666]" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[14.5px] font-semibold text-[#1A1A1A] truncate">{loop.title}</span>
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusColor}`}></div>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#808080] mt-0.5">
          <span className="flex items-center gap-1"><Clock size={10} strokeWidth={2} />{formatDuration(loop.duration_seconds)}</span>
          <span>·</span>
          <span>{formatTime(loop.started_at)}</span>
        </div>
      </div>
      <ChevronRight size={14} className="text-[#D4D4D4] group-hover:text-[#808080] transition-colors shrink-0" strokeWidth={2} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function groupEventsByDay(events: CalendarEvent[]): DayGroup[] {
  const dayMap = new Map<string, CalendarEvent[]>();
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  for (const event of events) {
    const eventDate = event.start ? new Date(event.start) : new Date();
    const dateKey = eventDate.toISOString().split('T')[0];
    if (!dayMap.has(dateKey)) {
      dayMap.set(dateKey, []);
    }
    dayMap.get(dateKey)!.push(event);
  }

  const groups: DayGroup[] = [];
  const sortedDates = Array.from(dayMap.keys()).sort();

  for (const dateKey of sortedDates) {
    const d = new Date(dateKey + 'T00:00:00');
    groups.push({
      date: dateKey,
      dayNumber: d.getDate().toString(),
      month: d.toLocaleDateString('en-US', { month: 'long' }),
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      isCurrent: dateKey === todayStr,
      events: dayMap.get(dateKey)!,
    });
  }

  return groups;
}

/* -------------------------------------------------------------------------- */
/* MAIN PAGE COMPONENT                                                        */
/* -------------------------------------------------------------------------- */

export default function ComingUpSchedule() {
  const [viewIndex, setViewIndex] = useState(0);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsReauth, setNeedsReauth] = useState(false);
  const [recentLoops, setRecentLoops] = useState<RecentLoop[]>([]);
  const [loopsLoading, setLoopsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCalendarEvents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      if (!session.provider_token) {
        setNeedsReauth(true);
        setError('Please re-authenticate to access your Google Calendar');
        setLoading(false);
        return;
      }

      // Fetch directly from Google Calendar API
      const now = new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      const url = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');
      url.searchParams.append('timeMin', now.toISOString());
      url.searchParams.append('timeMax', nextWeek.toISOString());
      url.searchParams.append('maxResults', '50');
      url.searchParams.append('singleEvents', 'true');
      url.searchParams.append('orderBy', 'startTime');

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${session.provider_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setNeedsReauth(true);
          setError('Please re-authenticate to access your Google Calendar');
          setLoading(false);
          return;
        }
        throw new Error(`Google API returned ${res.status}`);
      }

      const data = await res.json();
      
      const events: CalendarEvent[] = (data.items || []).map((item: any) => {
        let meetLink = null;
        if (item.hangoutLink) {
          meetLink = item.hangoutLink;
        } else if (item.conferenceData?.entryPoints) {
          const videoEntryPoint = item.conferenceData.entryPoints.find((ep: any) => ep.entryPointType === 'video');
          if (videoEntryPoint) meetLink = videoEntryPoint.uri;
        } else if (item.location && item.location.includes('meet.google.com')) {
          const match = item.location.match(/(https:\/\/meet\.google\.com\/[a-z0-9-]+)/);
          if (match) meetLink = match[1];
        }

        return {
          id: item.id,
          title: item.summary || 'Untitled Event',
          description: item.description || null,
          start: item.start?.dateTime || item.start?.date || null,
          end: item.end?.dateTime || item.end?.date || null,
          isAllDay: !!item.start?.date,
          location: item.location || null,
          meetLink,
          attendees: (item.attendees || []).map((a: any) => ({
            email: a.email,
            name: a.displayName || a.email,
            self: a.self || false,
            responseStatus: a.responseStatus
          })),
          status: item.status || 'confirmed',
          colorId: item.colorId || null,
        };
      });

      setCalendarEvents(events);
    } catch (err) {
      console.error('Calendar fetch error:', err);
      setError('Failed to load calendar events');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentLoops = async () => {
    setLoopsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error: loopsError } = await supabase
        .from('loops')
        .select('id, title, status, started_at, duration_seconds, summary')
        .eq('user_id', session.user.id)
        .order('started_at', { ascending: false })
        .limit(8);

      if (data && !loopsError) {
        setRecentLoops(data as RecentLoop[]);
      }
    } catch (err) {
      console.error('Failed to fetch recent loops:', err);
    } finally {
      setLoopsLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarEvents();
    fetchRecentLoops();
  }, []);

  const dayGroups = groupEventsByDay(calendarEvents);
  
  // Paginate: show 2 days per page
  const DAYS_PER_PAGE = 2;
  const totalPages = Math.max(1, Math.ceil(dayGroups.length / DAYS_PER_PAGE));
  const currentPageGroups = dayGroups.slice(viewIndex * DAYS_PER_PAGE, (viewIndex + 1) * DAYS_PER_PAGE);

  const handleNext = () => {
    if (viewIndex < totalPages - 1) setViewIndex(viewIndex + 1);
  };

  const handlePrev = () => {
    if (viewIndex > 0) setViewIndex(viewIndex - 1);
  };

  const handleReauth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/home`,
        scopes: 'https://www.googleapis.com/auth/calendar.readonly',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });
    if (error) console.error('Reauth error:', error);
  };

  return (
    <div className="h-full bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black relative flex flex-col items-center pt-24 pb-12 overflow-y-auto">
      
      <WindowControls onQuickMeeting={() => navigate('/loop/new')} />

      {/* Main Content Area */}
      <div className="w-full max-w-[700px] flex flex-col relative z-10">
        
        {/* Title & Interactive Controls */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-3">
            <h1 className="text-[26px] font-serif text-[#1A1A1A]">
              Coming up
            </h1>
            {/* Google Calendar badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E5E5E5] rounded-full text-[11px] font-medium text-[#808080] shadow-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google Calendar
            </div>
          </div>
          
          {/* Interactive Header Icons */}
          <div className="flex items-center">
            {/* Refresh button */}
            <button
              onClick={fetchCalendarEvents}
              disabled={loading}
              className={`p-1 rounded-md text-[#808080] hover:text-[#1A1A1A] hover:bg-gray-100 transition-all duration-200 cursor-pointer active:scale-95 mr-2 ${loading ? 'animate-spin' : ''}`}
            >
              <RefreshCw size={14} strokeWidth={2} />
            </button>

            <div className="flex items-center gap-1.5 mr-3">
              <button 
                onClick={handlePrev} 
                disabled={viewIndex === 0}
                className={`p-1 rounded-md transition-all duration-200 ${
                  viewIndex === 0 
                    ? 'text-[#CFCFCF] cursor-default' 
                    : 'text-[#808080] hover:text-[#1A1A1A] hover:bg-gray-100 cursor-pointer active:scale-95'
                }`}
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>
              <button 
                onClick={handleNext} 
                disabled={viewIndex >= totalPages - 1}
                className={`p-1 rounded-md transition-all duration-200 ${
                  viewIndex >= totalPages - 1 
                    ? 'text-[#CFCFCF] cursor-default' 
                    : 'text-[#808080] hover:text-[#1A1A1A] hover:bg-gray-100 cursor-pointer active:scale-95'
                }`}
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </div>
            
            <button className="p-1 rounded-md text-[#808080] hover:text-[#1A1A1A] hover:bg-gray-100 transition-all duration-200 cursor-pointer active:scale-95">
              <SlidersHorizontal size={14} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Schedule Card */}
        <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-8 overflow-hidden h-[450px] flex flex-col">
          
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#E5E5E5] border-t-[#1A1A1A]"></div>
              <p className="text-[13px] text-[#808080] font-medium">Loading your calendar...</p>
            </div>
          ) : error ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
              <Calendar className="w-12 h-12 text-[#D4D4D4]" strokeWidth={1} />
              <div>
                <p className="text-[15px] font-medium text-[#1A1A1A] mb-1">{error}</p>
                {needsReauth ? (
                  <button 
                    onClick={handleReauth}
                    className="mt-3 px-5 py-2 bg-[#4B5921] text-white text-[13px] font-bold rounded-full hover:bg-[#3D491A] transition-all active:scale-95 shadow-sm"
                  >
                    Reconnect Google Calendar
                  </button>
                ) : (
                  <button 
                    onClick={fetchCalendarEvents}
                    className="mt-3 px-5 py-2 bg-[#F5F5F5] text-[#1A1A1A] text-[13px] font-bold rounded-full hover:bg-[#EBEBEB] border border-[#E5E5E5] transition-all active:scale-95"
                  >
                    Try again
                  </button>
                )}
              </div>
            </div>
          ) : currentPageGroups.length > 0 ? (
            <div key={viewIndex} className="flex flex-col gap-10 animate-[fadeSwitch_0.4s_ease-out_both] overflow-y-auto custom-scrollbar pr-2 md:pr-4 flex-1">
              
              {currentPageGroups.map((dayGroup, idx) => (
                <React.Fragment key={dayGroup.date}>
                  <div className="flex items-start gap-6 md:gap-10">
                    {/* Date Column */}
                    <div className="flex items-start gap-3 w-[80px] shrink-0 pt-1">
                      <span className="text-[32px] font-serif text-[#1A1A1A] leading-none">{dayGroup.dayNumber}</span>
                      <div className="flex flex-col text-[11px] font-medium text-[#808080] leading-tight mt-0.5">
                        <div className="flex items-center gap-1">
                          {dayGroup.month} 
                          {dayGroup.isCurrent && <div className="w-1.5 h-1.5 bg-[#E55986] rounded-full"></div>}
                        </div>
                        <span>{dayGroup.dayName}</span>
                      </div>
                    </div>

                    {/* Events Column */}
                    <div className="flex flex-col gap-3 flex-1">
                      {dayGroup.events.map((event, eIdx) => (
                        <EventItem 
                          key={event.id}
                          event={event}
                          isFirst={idx === 0 && eIdx === 0}
                        />
                      ))}
                    </div>
                  </div>

                  {idx < currentPageGroups.length - 1 && (
                    <div className="h-[1px] w-full bg-gray-50"></div>
                  )}
                </React.Fragment>
              ))}
              
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
              <Calendar className="w-16 h-16 text-[#E5E5E5]" strokeWidth={1} />
              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A]">You're all clear!</p>
                <p className="text-[13px] text-[#808080] mt-1">No upcoming events in the next 7 days</p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* --- Recent Meetings Section --- */}
      <div className="w-full max-w-[700px] mt-12 px-2">
        {loopsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#E5E5E5] border-t-[#1A1A1A]"></div>
          </div>
        ) : recentLoops.length > 0 ? (
          <div className="p-2 md:p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13px] font-bold text-[#808080] tracking-wide">Recent Meetings</h3>
              <button 
                onClick={() => navigate('/meetings')}
                className="text-[12px] font-semibold text-[#808080] hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
              >
                See all <ChevronRight size={12} strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex flex-col">
              {recentLoops.map(loop => (
                <RecentMeetingItem 
                  key={loop.id} 
                  loop={loop} 
                  onClick={() => navigate(`/loop/${loop.id}`)} 
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="w-16 h-16 text-[#E5E5E5] mb-4" strokeWidth={1} />
            <h3 className="text-[17px] font-serif text-[#1A1A1A] mb-1">
              Take your first note
            </h3>
            <p className="text-[14px] text-[#808080] mb-6">
              Your meeting notes will appear here
            </p>
            <button 
              onClick={() => navigate('/loop/new')}
              className="bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#1A1A1A] border border-[#E5E5E5] px-6 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer">
              Quick Meeting
            </button>
          </div>
        )}
      </div>

      {/* Global CSS Animations */}
      <style>
        {`
          @keyframes fadeSwitch {
            from { 
              opacity: 0; 
              transform: translateY(8px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #E2E0D8;
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #C2C2C2;
          }
        `}
      </style>
    </div>
  );
}
