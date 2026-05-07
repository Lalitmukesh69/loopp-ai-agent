import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UseVoiceRecordingOptions {
  onTranscriptionComplete?: (text: string, durationSeconds: number) => void;
  onError?: (error: string) => void;
}

export const useVoiceRecording = (options?: UseVoiceRecordingOptions) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(32).fill(0));
  const [finalDuration, setFinalDuration] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const displayStreamRef = useRef<MediaStream | null>(null);
  const recordingTimeRef = useRef(0);

  const updateAudioLevels = useCallback(() => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    // Sample 32 frequency bands for visualization
    const bands = 32;
    const bandSize = Math.floor(dataArray.length / bands);
    const levels: number[] = [];

    for (let i = 0; i < bands; i++) {
      let sum = 0;
      for (let j = 0; j < bandSize; j++) {
        sum += dataArray[i * bandSize + j];
      }
      // Normalize to 0-1 range
      levels.push((sum / bandSize) / 255);
    }

    setAudioLevels(levels);
    animationFrameRef.current = requestAnimationFrame(updateAudioLevels);
  }, []);

  const startRecording = useCallback(async () => {
    try {
      // 1. Get microphone stream
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = micStream;
      
      // 2. Get display media (tab) stream
      let displayStream: MediaStream | null = null;
      try {
        displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true, // Video is required by most browsers to show the picker
          audio: true
        });
        displayStreamRef.current = displayStream;
      } catch (err) {
        console.warn('Could not get display media. Falling back to mic only.', err);
      }

      // 3. Set up AudioContext to mix both streams
      audioContextRef.current = new AudioContext();
      const destination = audioContextRef.current.createMediaStreamDestination();

      // Connect microphone to destination
      const micSource = audioContextRef.current.createMediaStreamSource(micStream);
      micSource.connect(destination);

      // Connect tab audio to destination (if selected)
      if (displayStream && displayStream.getAudioTracks().length > 0) {
        const displaySource = audioContextRef.current.createMediaStreamSource(displayStream);
        displaySource.connect(destination);
      }

      // Set up audio analysis on the combined stream
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.7;
      const combinedSource = audioContextRef.current.createMediaStreamSource(destination.stream);
      combinedSource.connect(analyserRef.current);
      
      // Start level monitoring
      updateAudioLevels();
      
      // Use webm format which is widely supported
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
        ? 'audio/webm;codecs=opus' 
        : 'audio/webm';
      
      const mediaRecorder = new MediaRecorder(destination.stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingTime(0);
      recordingTimeRef.current = 0;

      // Start timer
      timerRef.current = setInterval(() => {
        recordingTimeRef.current += 1;
        setRecordingTime(recordingTimeRef.current);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record audio.",
        variant: "destructive",
      });
      options?.onError?.('Microphone access denied');
    }
  }, [options, updateAudioLevels]);

  const stopMicrophone = useCallback(() => {
    // Stop audio analysis
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setAudioLevels(new Array(32).fill(0));

    // Stop all media tracks immediately
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (displayStreamRef.current) {
      displayStreamRef.current.getTracks().forEach(track => track.stop());
      displayStreamRef.current = null;
    }

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopRecording = useCallback(async (): Promise<{ text: string | null; durationSeconds: number }> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current) {
        stopMicrophone();
        resolve({ text: null, durationSeconds: 0 });
        return;
      }

      const mediaRecorder = mediaRecorderRef.current;
      const durationSeconds = recordingTimeRef.current;
      setFinalDuration(durationSeconds);
      
      mediaRecorder.onstop = async () => {
        // Stop microphone immediately when recording stops
        stopMicrophone();
        
        setIsRecording(false);
        setIsProcessing(true);

        try {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
          
          console.log('Audio blob size:', audioBlob.size, 'bytes');
          console.log('Audio chunks count:', chunksRef.current.length);
          console.log('Recording duration:', durationSeconds, 'seconds');
          
          // Check minimum recording duration and audio size
          if (durationSeconds < 1 || audioBlob.size < 1000) {
            setIsProcessing(false);
            const message = 'Recording too short. Please speak for at least 1 second.';
            console.warn(message);
            toast({
              title: "Recording too short",
              description: message,
              variant: "destructive",
            });
            options?.onError?.(message);
            resolve({ text: null, durationSeconds });
            return;
          }
          
          // Create FormData with audio file
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');
          
          console.log('Sending audio for transcription via FormData...');

          try {
            const timeoutMs = 60_000;

            // Use supabase.functions.invoke which handles auth automatically
            const invokePromise = supabase.functions.invoke('transcribe-audio', {
              body: formData,
            });

            const result = await Promise.race([
              invokePromise,
              new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('Transcription timed out')), timeoutMs)
              ),
            ]);

            const { data, error: invokeError } = result as { data: any; error: any };

            setIsProcessing(false);

            if (invokeError || data?.error) {
              const errorMsg = invokeError?.message || data?.error || 'Transcription failed';
              console.error('Transcription error:', errorMsg);
              toast({
                title: "Transcription failed",
                description: errorMsg,
                variant: "destructive",
              });
              options?.onError?.(errorMsg);
              resolve({ text: null, durationSeconds });
              return;
            }

            // Log full response for debugging
            console.log('Full transcription response:', JSON.stringify(data));

            if (data?.transcription && data.transcription.trim().length > 0) {
              console.log('Transcription successful:', data.transcription);
              options?.onTranscriptionComplete?.(data.transcription, durationSeconds);
              resolve({ text: data.transcription, durationSeconds });
            } else {
              console.warn('No speech detected in response:', data);
              toast({
                title: "No speech detected",
                description: "Please try speaking more clearly.",
                variant: "destructive",
              });
              options?.onError?.('No speech detected');
              resolve({ text: null, durationSeconds });
            }
          } catch (e: any) {
            setIsProcessing(false);
            const message = e?.message || 'Transcription failed';
            console.error('Transcription invoke failed:', message);
            toast({
              title: "Transcription failed",
              description: message,
              variant: "destructive",
            });
            options?.onError?.(message);
            resolve({ text: null, durationSeconds });
          }
          
        } catch (error) {
          console.error('Error processing audio:', error);
          setIsProcessing(false);
          toast({
            title: "Processing failed",
            description: "Failed to process the audio recording.",
            variant: "destructive",
          });
          options?.onError?.('Processing failed');
          resolve({ text: null, durationSeconds });
        }
      };

      mediaRecorder.stop();
    });
  }, [options, stopMicrophone]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    isRecording,
    isProcessing,
    recordingTime,
    audioLevels,
    formattedTime: formatTime(recordingTime),
    finalDuration,
    startRecording,
    stopRecording,
  };
};
