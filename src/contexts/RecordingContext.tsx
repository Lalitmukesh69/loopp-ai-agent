import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface RecordingState {
  status: 'idle' | 'recording' | 'processing' | 'completed';
  loopId: string | null;
  loopTitle: string | null;
  recordingTime: string;
  audioLevels: number[];
}

interface RecordingContextType extends RecordingState {
  setStatus: (status: RecordingState['status']) => void;
  setLoopId: (id: string | null) => void;
  setLoopTitle: (title: string | null) => void;
  setRecordingTime: (time: string) => void;
  setAudioLevels: (levels: number[]) => void;
  registerStopRecording: (fn: (() => Promise<void>) | null) => void;
  stopRecording: () => Promise<void>;
  reset: () => void;
}

const defaultState: RecordingState = {
  status: 'idle',
  loopId: null,
  loopTitle: null,
  recordingTime: '00:00',
  audioLevels: new Array(32).fill(0),
};

const RecordingContext = createContext<RecordingContextType | null>(null);

export function RecordingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RecordingState>(defaultState);
  const stopRecordingRef = useRef<(() => Promise<void>) | null>(null);

  const setStatus = useCallback((status: RecordingState['status']) => {
    setState(prev => ({ ...prev, status }));
  }, []);

  const setLoopId = useCallback((loopId: string | null) => {
    setState(prev => ({ ...prev, loopId }));
  }, []);

  const setLoopTitle = useCallback((loopTitle: string | null) => {
    setState(prev => ({ ...prev, loopTitle }));
  }, []);

  const setRecordingTime = useCallback((recordingTime: string) => {
    setState(prev => ({ ...prev, recordingTime }));
  }, []);

  const setAudioLevels = useCallback((audioLevels: number[]) => {
    setState(prev => ({ ...prev, audioLevels }));
  }, []);

  const registerStopRecording = useCallback((fn: (() => Promise<void>) | null) => {
    stopRecordingRef.current = fn;
  }, []);

  const stopRecording = useCallback(async () => {
    if (stopRecordingRef.current) {
      await stopRecordingRef.current();
    }
  }, []);

  const reset = useCallback(() => {
    setState(defaultState);
    stopRecordingRef.current = null;
  }, []);

  return (
    <RecordingContext.Provider
      value={{
        ...state,
        setStatus,
        setLoopId,
        setLoopTitle,
        setRecordingTime,
        setAudioLevels,
        registerStopRecording,
        stopRecording,
        reset,
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
}

export function useRecording() {
  const context = useContext(RecordingContext);
  if (!context) {
    throw new Error('useRecording must be used within a RecordingProvider');
  }
  return context;
}
