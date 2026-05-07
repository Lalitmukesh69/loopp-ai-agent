import React, { useRef, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AppSidebar from './AppSidebar';
import { LoopModalStyles, DynamicIsland, NewMeetingModal } from './LoopModal';
import TrialEndedModal from './TrialEndedModal';

const LayoutStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
    
    :root {
      --apple-grey: #F2F2F7;
      --apple-bg-secondary: #F5F5F7;
      --apple-text-primary: #1D1D1F;
      --apple-text-secondary: #86868B;
      --apple-blue: #0071E3;
      --apple-green: #34C759;
      --apple-red: #FF3B30;
      --apple-yellow: #FFCC00;
    }

    body {
      background-color: var(--apple-grey);
      color: var(--apple-text-primary);
      font-family: 'Raleway', sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow: hidden;
    }

    /* CUSTOM SCROLLBAR */
    .custom-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
    .custom-scroll::-webkit-scrollbar-track { background: transparent; }
    .custom-scroll::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      border: 1px solid transparent;
      background-clip: content-box;
    }

    .serif-italic { font-family: 'Raleway', sans-serif; font-style: italic; }
    .font-mono { font-family: 'Raleway', sans-serif; }
    
    .sidebar-blur { background: rgba(242, 242, 247, 0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
    .canvas-shadow { box-shadow: -10px 0 30px rgba(0, 0, 0, 0.04); }
    .bento-card-shadow { box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08); }

    /* Home Styles */
    .glass-card { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.5); }
    .mesh-gradient { background: radial-gradient(at top left, #F2F2F7, transparent), radial-gradient(at bottom right, #E5E5EA, transparent); }

    /* Meetings Styles */
    .glass-panel { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(0, 0, 0, 0.05); }

    /* Tasks Styles */
    .checkbox-apple { appearance: none; width: 20px; height: 20px; border: 1.5px solid #D1D1D6; border-radius: 6px; transition: all 0.2s; position: relative; }
    .checkbox-apple:checked { background-color: var(--apple-blue); border-color: var(--apple-blue); }
    .checkbox-apple:checked::after { content: ''; position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%) rotate(45deg); width: 5px; height: 9px; border-right: 2px solid white; border-bottom: 2px solid white; }

    /* Templates Styles */
    .template-card-hover { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
    .template-card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08); }

    /* Archive Styles */
    .ghost-row { opacity: 0.6; transition: all 0.2s ease; }
    .ghost-row:hover { opacity: 1; background: #F5F5F7; }

    /* Settings Styles */
    .glass-pill {
      background: rgba(29, 29, 31, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .input-ceramic {
      background: white;
      border: 1px solid #D2D2D7;
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 14px;
      outline: none;
      transition: all 0.2s;
      width: 100%;
    }
    .input-ceramic:focus {
      border-color: var(--apple-blue);
      box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
    }

    input[type="range"] { -webkit-appearance: none; width: 100%; background: transparent; }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; height: 20px; width: 20px; border-radius: 50%;
      background: #ffffff; border: 1px solid #D2D2D7; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer; margin-top: -8px;
    }
    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%; height: 4px; background: #E5E5E7; border-radius: 2px;
    }
  `}</style>
);

export default function AppLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, recording, processing, completed
  const [completedLoop, setCompletedLoop] = useState<{ id: string; title: string } | null>(null);
  const [recordingTime, setRecordingTime] = useState('00:00');
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(32).fill(0));
  const [isTrialExpired, setIsTrialExpired] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const plan = user.user_metadata?.plan || 'trial';
        if (plan === 'trial' && user.created_at) {
          const createdDate = new Date(user.created_at);
          const now = new Date();
          const diffTime = now.getTime() - createdDate.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays >= 3) {
            setIsTrialExpired(true);
          }
        }
      }
    });
  }, []);

  const stopRecordingRef = useRef<null | (() => Promise<void>)>(null);
  const startRecordingFlow = () => {
    setIsModalOpen(false);
    setTimeout(() => setStatus('recording'), 200);
  };

  const stopRecordingFlow = async () => {
    setStatus('processing');

    if (!stopRecordingRef.current) {
      // Shouldn't happen, but avoids getting stuck in "processing".
      setStatus('idle');
      return;
    }

    await stopRecordingRef.current();
  };

  const handleLoopCompleted = (loop: { id: string; title: string }) => {
    setCompletedLoop(loop);
    setStatus('completed');
  };

  const handleOpenLoop = () => {
    setStatus('idle');
    setCompletedLoop(null);
  };

  const handleRecordingStateChange = (time: string, levels: number[]) => {
    setRecordingTime(time);
    setAudioLevels(levels);
  };

  const registerStopRecording = (fn: null | (() => Promise<void>)) => {
    stopRecordingRef.current = fn;
  };

  const location = useLocation();
  const isSettings = location.pathname === '/settings';

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F2F2F7] relative">
      <LayoutStyles />
      <LoopModalStyles />
      
      {isTrialExpired && <TrialEndedModal />}
      
      <DynamicIsland 
        status={status} 
        onStop={stopRecordingFlow} 
        onOpen={handleOpenLoop}
        loopId={completedLoop?.id}
        loopTitle={completedLoop?.title}
        recordingTime={recordingTime}
        audioLevels={audioLevels}
      />

      <NewMeetingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onStartRecording={startRecordingFlow}
        onStopRecording={() => setStatus('processing')}
        onProcessingError={() => setStatus('idle')}
        onLoopCompleted={handleLoopCompleted}
        onRecordingStateChange={handleRecordingStateChange}
        registerStopRecording={registerStopRecording}
      />

      {isSettings ? (
        <main className="h-screen w-screen overflow-hidden relative z-10">
          <Outlet context={{ onNewLoopClick: () => { setStatus('idle'); setIsModalOpen(true); } }} />
        </main>
      ) : (
        <div className="flex w-[125%] origin-top-left scale-[0.8]" style={{ height: '125vh' }}>
          <AppSidebar />
          <main className="flex-1 bg-white rounded-tl-[40px] canvas-shadow overflow-hidden relative z-10" style={{ height: '125vh' }}>
            <Outlet context={{ onNewLoopClick: () => { setStatus('idle'); setIsModalOpen(true); } }} />
          </main>
        </div>
      )}
    </div>
  );
}
