import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface TranscriptSegment {
  index: number;
  text: string;
  timestamp_ms: number;
}

interface UseStreamingTranscriptionReturn {
  segments: TranscriptSegment[];
  isRecording: boolean;
  isProcessing: boolean;
  currentTime: string;
  audioLevels: number[];
  loopId: string | null;
  startRecording: (loopId?: string) => Promise<string | null>;
  stopRecording: () => Promise<void>;
}

export function useStreamingTranscription(): UseStreamingTranscriptionReturn {
  const [segments, setSegments] = useState<TranscriptSegment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(32).fill(0));
  const [loopId, setLoopId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const chunkIndexRef = useRef(0);
  const startTimeRef = useRef(0);
  const allChunksRef = useRef<Blob[]>([]);

  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Audio level visualization
  const updateAudioLevels = useCallback(() => {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);
    const levels = Array.from(data.slice(0, 32)).map(v => v / 255);
    setAudioLevels(levels);
    animFrameRef.current = requestAnimationFrame(updateAudioLevels);
  }, []);

  // Transcribe a single chunk
  const transcribeChunk = async (blob: Blob, index: number, currentLoopId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;

      const formData = new FormData();
      formData.append('audio', blob, 'chunk.webm');

      const { data: fnData, error: fnError } = await supabase.functions.invoke('transcribe-audio', {
        body: formData,
      });

      if (fnError) {
        console.warn('Transcription chunk error:', fnError);
        return;
      }

      const text = fnData?.transcription?.trim();
      if (!text) return;

      const segment: TranscriptSegment = {
        index,
        text,
        timestamp_ms: Date.now() - startTimeRef.current,
      };

      setSegments(prev => [...prev, segment]);

      // Save to Supabase
      await supabase.from('transcripts').insert({
        loop_id: currentLoopId,
        user_id: session.user.id,
        chunk_text: text,
        chunk_index: index,
        timestamp_ms: segment.timestamp_ms,
      });
    } catch (e) {
      console.warn('Chunk transcription failed:', e);
    }
  };

  const startRecording = useCallback(async (existingLoopId?: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Set up audio analysis for visualizer
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;
      updateAudioLevels();

      // Create or use existing loop
      let currentLoopId = existingLoopId || null;

      if (!currentLoopId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data: loop, error } = await supabase.from('loops').insert({
          user_id: user.id,
          title: 'Untitled Meeting',
          status: 'live',
          started_at: new Date().toISOString(),
        }).select('id').single();

        if (error) throw error;
        currentLoopId = loop.id;
      } else {
        await supabase.from('loops').update({ status: 'live' }).eq('id', currentLoopId);
      }

      setLoopId(currentLoopId);
      setSegments([]);
      chunkIndexRef.current = 0;
      startTimeRef.current = Date.now();
      allChunksRef.current = [];

      // Start MediaRecorder with timeslice for chunked recording
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          allChunksRef.current.push(e.data);
          const idx = chunkIndexRef.current++;
          transcribeChunk(e.data, idx, currentLoopId!);
        }
      };

      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
      };

      // Record in 5-second chunks for progressive transcription
      recorder.start(5000);
      setIsRecording(true);

      // Timer
      let seconds = 0;
      timerRef.current = setInterval(() => {
        seconds++;
        setCurrentTime(formatTime(seconds));
      }, 1000);

      return currentLoopId;
    } catch (e: any) {
      toast.error(e.message || 'Could not start recording');
      return null;
    }
  }, [updateAudioLevels]);

  const stopRecording = useCallback(async () => {
    setIsRecording(false);
    setIsProcessing(true);

    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Stop audio visualization
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    // IMMEDIATELY stop microphone — release it before any async work
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }

    // Stop recorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    // Brief wait for final audio chunks to finish processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const currentLoopId = loopId;
    const fullTranscript = segments.map(s => s.text).join(' ');

    if (currentLoopId) {
      // Save transcript and set status to processing
      const elapsedSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      await supabase.from('loops').update({
        status: 'processing',
        transcript: fullTranscript,
        duration_seconds: elapsedSeconds,
        ended_at: new Date().toISOString(),
      }).eq('id', currentLoopId);
    }

    // Done processing from user's perspective — let them navigate
    setIsProcessing(false);

    // Fire-and-forget: AI generation happens in background
    // Edge function will set status to 'completed' when done
    if (currentLoopId && fullTranscript.trim()) {
      supabase.functions.invoke('generate-minutes', {
        body: { loopId: currentLoopId, transcript: fullTranscript, title: '' },
      }).then(({ data, error }) => {
        if (error) {
          console.error('Auto-generate failed:', error);
        } else if (data?.minutes) {
          console.log('AI summary auto-generated successfully');
          toast.success('AI summary & notes ready!');
        }
      }).catch(err => {
        console.error('Auto-generate error:', err);
      });
    }
  }, [loopId, segments]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, []);

  return {
    segments,
    isRecording,
    isProcessing,
    currentTime,
    audioLevels,
    loopId,
    startRecording,
    stopRecording,
  };
}
