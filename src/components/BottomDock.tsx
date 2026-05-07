import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Mic, Square, Loader2 } from 'lucide-react';
import { useRecording } from '@/contexts/RecordingContext';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function RecordingDockTransition() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const recording = useRecording();

  const {
    isRecording,
    isProcessing,
    formattedTime,
    audioLevels,
    startRecording,
    stopRecording,
  } = useVoiceRecording();

  // Sync with RecordingContext
  useEffect(() => {
    recording.setStatus(
      isRecording ? 'recording' :
      isProcessing ? 'processing' : 'idle'
    );
    recording.setRecordingTime(formattedTime);
    recording.setAudioLevels(audioLevels);
  }, [isRecording, isProcessing, formattedTime, audioLevels]);

  const handleStartRecording = async () => {
    try {
      let currentLoopId = id;

      // If we are on /loop/new, create a new loop first
      if (!currentLoopId || currentLoopId === 'new') {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data: loop, error } = await supabase.from('loops').insert({
          user_id: user.id,
          title: 'Quick Meeting',
          status: 'live',
          started_at: new Date().toISOString(),
        }).select('id').single();

        if (error) throw error;
        currentLoopId = loop.id;
        navigate(`/loop/${currentLoopId}`, { replace: true });
      } else {
        await supabase.from('loops').update({ status: 'live' }).eq('id', currentLoopId);
      }

      recording.setLoopId(currentLoopId);
      recording.setLoopTitle('Quick Meeting');
      await startRecording();
    } catch (e: any) {
      toast.error(e.message || 'Could not start recording');
    }
  };

  const handleStopRecording = async () => {
    const { text, durationSeconds } = await stopRecording();
    const currentLoopId = recording.loopId || id;
    
    if (currentLoopId && currentLoopId !== 'new') {
      if (text) {
        await supabase.from('loops').update({
          status: 'processing',
          transcript: text,
          duration_seconds: durationSeconds,
          ended_at: new Date().toISOString(),
        }).eq('id', currentLoopId);

        // Trigger generate-minutes
        supabase.functions.invoke('generate-minutes', {
          body: { loopId: currentLoopId, transcript: text, title: '' }
        });
      } else {
        // If no text, mark as completed but no transcript
        await supabase.from('loops').update({
          status: 'completed',
          duration_seconds: durationSeconds,
          ended_at: new Date().toISOString(),
        }).eq('id', currentLoopId);
      }
    }
  };

  const isActive = isRecording || isProcessing;

  return (
    <div className="fixed bottom-8 z-50 flex items-center gap-3 animate-[fadeUp_0.4s_ease-out_both]" style={{ left: '50%', transform: 'translateX(-50%)' }}>
      
      {/* Waveform Icon (Dock Button) */}
      <div
        className={`w-[56px] h-[56px] rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all duration-300 flex items-center justify-center ${
          isRecording
            ? 'bg-[#FF3B30] border-2 border-[#E5342B]'
            : isProcessing
            ? 'bg-[#1A1A1A] border-2 border-[#333333]'
            : 'bg-white border border-[#E5E5E5]'
        }`}
      >
        {isRecording ? (
          <div className="flex items-center gap-[3.5px] h-[18px]">
            <div className="w-[3px] h-[10px] bg-white rounded-full animate-[eq_1s_ease-in-out_infinite]"></div>
            <div className="w-[3px] h-[18px] bg-white rounded-full animate-[eq_1.2s_ease-in-out_infinite_0.2s]"></div>
            <div className="w-[3px] h-[10px] bg-white rounded-full animate-[eq_0.8s_ease-in-out_infinite_0.4s]"></div>
          </div>
        ) : isProcessing ? (
          <Loader2 className="text-white animate-spin" size={24} />
        ) : (
          <div className="flex items-center gap-[3.5px] h-[18px]">
            <div className="w-[3px] h-[10px] bg-[#666666] rounded-full"></div>
            <div className="w-[3px] h-[18px] bg-[#666666] rounded-full"></div>
            <div className="w-[3px] h-[10px] bg-[#666666] rounded-full"></div>
          </div>
        )}
      </div>

      {/* Start / End Meeting Button */}
      <div className="bg-white rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.08)] border border-[#E5E5E5] flex items-center px-2 py-2">
        {isRecording ? (
          <div className="flex items-center gap-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-[8px] h-[8px] rounded-full bg-[#FF3B30] animate-pulse"></div>
              <span className="text-[13px] font-mono font-bold text-[#FF3B30]">{formattedTime}</span>
            </div>
            <button
              onClick={handleStopRecording}
              className="bg-[#1A1A1A] hover:bg-black text-white px-5 py-2 rounded-full text-[13px] font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Square size={14} strokeWidth={2.5} />
              End Meeting
            </button>
          </div>
        ) : isProcessing ? (
          <div className="flex items-center gap-3 px-4 py-1">
            <span className="text-[13px] font-bold text-[#808080]">Transcribing with Gemini 2.0...</span>
          </div>
        ) : (
          <button
            onClick={handleStartRecording}
            className="bg-[#FF3B30] hover:bg-[#E5342B] text-white px-6 py-2 rounded-full text-[13px] font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Mic size={14} strokeWidth={2.5} />
            Start Meeting
          </button>
        )}
      </div>

      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes eq {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.4); }
          }
        `}
      </style>
    </div>
  );
}