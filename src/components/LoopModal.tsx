import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Mic, 
  UploadCloud, 
  Sparkles, 
  ChevronDown, 
  Check, 
  RefreshCw,
  ArrowRight,
  Square,
  FileAudio
} from 'lucide-react';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

/* -------------------------------------------------------------------------- */
/* Design Tokens & Styles                                                     */
/* -------------------------------------------------------------------------- */
export const LoopModalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
    
    :root {
      --apple-grey: #F2F2F7;
      --apple-blue: #0071E3;
      --ink-black: #1D1D1F;
    }

    .serif-italic { font-family: 'Raleway', sans-serif; font-style: italic; }

    .dynamic-island {
      background: #000000;
      color: #FFFFFF;
      box-shadow: none;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .mic-breathing {
      animation: breathe 3s ease-in-out infinite;
    }

    @keyframes breathe {
      0%, 100% { transform: scale(1); opacity: 0.2; filter: blur(20px); }
      50% { transform: scale(1.5); opacity: 0.4; filter: blur(30px); }
    }
  `}</style>
);

/* -------------------------------------------------------------------------- */
/* Sub-Component: Waveform                                                    */
/* -------------------------------------------------------------------------- */

const VoiceWaveform = ({ levels }: { levels?: number[] }) => {
  // Use provided levels or fallback to animated placeholder
  const displayLevels = levels && levels.some(l => l > 0) 
    ? levels.slice(0, 16) 
    : null;

  if (displayLevels) {
    return (
      <div className="flex items-center gap-[2px] h-6 px-2">
        {displayLevels.map((level, i) => (
          <motion.div
            key={i}
            animate={{ height: Math.max(4, level * 24) }}
            transition={{ duration: 0.05 }}
            className="w-[3px] bg-white/60 rounded-full"
          />
        ))}
      </div>
    );
  }

  // Fallback animated waveform
  return (
    <div className="flex items-center gap-1 h-6 px-2">
      {[0.4, 0.9, 0.5, 0.8, 0.3, 0.7, 0.5].map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: [h * 10, h * 24, h * 10] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
          className="w-1 bg-white/40 rounded-full"
        />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Sub-Component: Recording Waveform (for modal)                              */
/* -------------------------------------------------------------------------- */

const RecordingWaveform = ({ levels }: { levels: number[] }) => (
  <div className="flex items-center justify-center gap-[2px] h-12 w-full max-w-xs">
    {levels.slice(0, 32).map((level, i) => (
      <motion.div
        key={i}
        animate={{ height: Math.max(4, level * 48) }}
        transition={{ duration: 0.05 }}
        className="w-[4px] bg-red-400 rounded-full"
      />
    ))}
  </div>
);

/* -------------------------------------------------------------------------- */
/* Component: Dynamic Island Recorder (30% Bigger + Integrated States)        */
/* -------------------------------------------------------------------------- */

export const DynamicIsland = ({ status, onStop, onOpen, recordingTime, audioLevels, loopId, loopTitle }: { 
  status: string; 
  onStop: () => void | Promise<void>; 
  onOpen?: () => void;
  recordingTime?: string;
  audioLevels?: number[];
  loopId?: string;
  loopTitle?: string;
}) => {
  const navigate = useNavigate();
  const isRecording = status === 'recording';
  const isProcessing = status === 'processing';
  const isCompleted = status === 'completed';

  return (
    <AnimatePresence>
      {(isRecording || isProcessing || isCompleted) && (
        <motion.div
          layout
          initial={{ y: -120, x: '-50%', scale: 0.8, opacity: 0 }}
          animate={{ y: 24, x: '-50%', scale: 1, opacity: 1 }}
          exit={{ y: -120, x: '-50%', scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-0 left-1/2 z-[60] dynamic-island h-16 rounded-full flex items-center justify-center px-8 min-w-[420px]"
        >
          <AnimatePresence mode="wait">
            {isRecording && (
              <motion.div 
                key="recording" 
                initial={{ opacity: 0, filter: 'blur(10px)' }} 
                animate={{ opacity: 1, filter: 'blur(0px)' }} 
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm font-bold font-mono tracking-[0.15em] w-14">{recordingTime || '00:00'}</span>
                </div>
                
                <VoiceWaveform levels={audioLevels} />

                <div className="flex items-center gap-6">
                  <div className="h-6 w-[1px] bg-white/20" />
                  <button 
                    onClick={onStop}
                    className="bg-red-500 text-white h-9 px-6 rounded-full text-[11px] font-black uppercase hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/20"
                  >
                    Stop
                  </button>
                </div>
              </motion.div>
            )}

            {isProcessing && (
              <motion.div 
                key="processing" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-4 w-full"
              >
                <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-tight">Processing Intelligence...</span>
                  <span className="text-[10px] font-bold uppercase opacity-30 tracking-[0.2em]">Analyzing Voice Data</span>
                </div>
              </motion.div>
            )}

            {isCompleted && (
              <motion.div 
                key="completed" 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-white truncate">{loopTitle || 'New Recording'}</span>
                    <span className="text-[10px] font-bold uppercase opacity-40 tracking-wider">Doc Ready</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="h-6 w-[1px] bg-white/20" />
                  <button 
                    onClick={() => {
                      if (loopId) {
                        navigate(`/loop/${loopId}`);
                      }
                      if (onOpen) onOpen();
                    }}
                    className="bg-white text-black h-9 px-6 rounded-full text-[12px] font-black flex items-center gap-2 hover:bg-gray-100 transition-all active:scale-95 whitespace-nowrap"
                  >
                    Open Loop
                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* -------------------------------------------------------------------------- */
/* Component: New Meeting Modal                                               */
/* -------------------------------------------------------------------------- */

export const NewMeetingModal = ({
  isOpen,
  onClose,
  onStartRecording,
  onStopRecording,
  onProcessingError,
  onLoopCompleted,
  onRecordingStateChange,
  registerStopRecording,
}: {
  isOpen: boolean;
  onClose: () => void;
  onStartRecording: () => void;
  onStopRecording?: () => void;
  onProcessingError?: () => void;
  onLoopCompleted?: (loop: { id: string; title: string }) => void;
  onRecordingStateChange?: (recordingTime: string, audioLevels: number[]) => void;
  registerStopRecording?: (fn: null | (() => Promise<void>)) => void;
}) => {
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState("");
  const [sessionType, setSessionType] = useState("General");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isRecording, isProcessing, formattedTime, audioLevels, startRecording, stopRecording } = useVoiceRecording({
    onTranscriptionComplete: async (text, durationSeconds) => {
      // Create a new loop with the transcription
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: "Please sign in", variant: "destructive" });
        onProcessingError?.();
        return;
      }

      const loopTitle = sessionName || 'Voice Recording';

      const { data: loop, error } = await supabase
        .from('loops')
        .insert({
          title: loopTitle,
          user_id: user.id,
          transcript: text,
          status: 'completed',
          description: `${sessionType} session`,
          duration_seconds: durationSeconds,
          ended_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        toast({ title: "Failed to save", description: error.message, variant: "destructive" });
        onProcessingError?.();
        return;
      }

      toast({ title: "Recording saved!", description: "Your voice has been transcribed." });
      
      // Notify parent about completed loop
      if (loop && onLoopCompleted) {
        onLoopCompleted({ id: loop.id, title: loopTitle });
      }
    },
    onError: (error) => {
      console.error('Recording error:', error);
      onProcessingError?.();
    }
  });

  // Notify parent of recording state changes
  useEffect(() => {
    if (isRecording && onRecordingStateChange) {
      onRecordingStateChange(formattedTime, audioLevels);
    }
  }, [isRecording, formattedTime, audioLevels, onRecordingStateChange]);

  // Allow the global (DynamicIsland) stop button to stop the active recording
  useEffect(() => {
    registerStopRecording?.(
      isRecording
        ? async () => {
            onStopRecording?.();
            const result = await stopRecording();
            if (!result.text) onProcessingError?.();
          }
        : null
    );

    return () => registerStopRecording?.(null);
  }, [isRecording, stopRecording, registerStopRecording, onStopRecording, onProcessingError]);

  const handleRecordClick = async () => {
    if (isRecording) {
      onStopRecording?.();
      const result = await stopRecording();
      if (!result.text) onProcessingError?.();
    } else {
      await startRecording();
      onStartRecording();
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    
    // Validate file type
    const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/mp4', 'audio/m4a', 'audio/wav', 'audio/webm', 'audio/x-m4a'];
    if (!validTypes.some(type => file.type.includes(type.split('/')[1]))) {
      toast({
        title: "Invalid file type",
        description: "Please upload an MP3, M4A, or WAV file.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadedFile(file);
    onClose(); // Close modal
    onStartRecording(); // Show processing state in DynamicIsland

    try {
      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: "Please sign in", variant: "destructive" });
        onProcessingError?.();
        setIsUploading(false);
        return;
      }

      // Send file to transcription
      const formData = new FormData();
      formData.append('audio', file, file.name);

      onStopRecording?.(); // Trigger processing state

      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: formData,
      });

      if (error || data?.error) {
        throw new Error(error?.message || data?.error || 'Transcription failed');
      }

      if (!data?.transcription) {
        throw new Error('No transcription received');
      }

      // Create loop with transcription
      const loopTitle = sessionName || file.name.replace(/\.[^/.]+$/, '') || 'Audio Upload';
      
      const { data: loop, error: loopError } = await supabase
        .from('loops')
        .insert({
          title: loopTitle,
          user_id: user.id,
          transcript: data.transcription,
          status: 'completed',
          description: `${sessionType} - Uploaded audio`,
          ended_at: new Date().toISOString()
        })
        .select()
        .single();

      if (loopError) throw loopError;

      toast({ title: "Audio transcribed!", description: "Your file has been processed successfully." });
      
      if (loop && onLoopCompleted) {
        onLoopCompleted({ id: loop.id, title: loopTitle });
      }
    } catch (error: any) {
      console.error('File upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Could not process the audio file.",
        variant: "destructive"
      });
      onProcessingError?.();
    } finally {
      setIsUploading(false);
      setUploadedFile(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-lg bg-white rounded-[44px] shadow-2xl overflow-hidden border border-white/50"
          >
            <div className="p-8 pb-6 flex justify-between items-start">
              <div>
                <h1 className="text-4xl serif-italic text-[#1D1D1F]">Start a new Loop.</h1>
                <p className="text-slate-400 font-medium mt-2 text-base">The AI is ready to listen.</p>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-8 mb-8 flex gap-4">
               <div className="flex-1 relative group">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                  <input 
                    type="text" 
                    placeholder="New Session..." 
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-indigo-200 rounded-2xl outline-none text-sm font-medium transition-all"
                  />
               </div>
               <div className="relative">
                  <button className="h-full px-4 bg-gray-50 border border-transparent rounded-full flex items-center gap-2 text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                    {sessionType} <ChevronDown className="w-4 h-4" />
                  </button>
               </div>
            </div>

            <motion.div 
              whileHover={{ scale: (isProcessing || isUploading) ? 1 : 1.01 }}
              whileTap={{ scale: (isProcessing || isUploading) ? 1 : 0.98 }}
              onClick={(isProcessing || isUploading) ? undefined : handleRecordClick}
              className={`relative mx-8 mb-6 h-56 ${isRecording ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-200' : 'bg-gradient-to-br from-[#F5F5F7] to-[#E0E7FF] border-indigo-100'} border rounded-[32px] flex flex-col items-center justify-center cursor-pointer group overflow-hidden ${(isProcessing || isUploading) ? 'pointer-events-none opacity-70' : ''}`}
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className={`w-28 h-28 ${isRecording ? 'bg-red-500' : 'bg-red-500'} rounded-full mic-breathing`} />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                {(isProcessing || isUploading) ? (
                  <>
                    <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center shadow-2xl">
                      <RefreshCw className="text-white w-8 h-8 animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold mt-6 text-indigo-950">
                      {isUploading ? 'Uploading...' : 'Processing...'}
                    </h3>
                    <p className="text-sm font-medium text-indigo-400 mt-1">Transcribing with Gemini AI</p>
                  </>
                ) : isRecording ? (
                  <>
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/40">
                      <Square className="text-white w-6 h-6" />
                    </div>
                    <RecordingWaveform levels={audioLevels} />
                    <h3 className="text-xl font-bold mt-4 text-red-600">{formattedTime}</h3>
                    <p className="text-sm font-medium text-red-400 mt-1">Tap to stop recording</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/20 group-hover:scale-110 transition-transform duration-700">
                      <Mic className="text-white w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mt-6 text-indigo-950">Start Recording</h3>
                    <p className="text-sm font-medium text-indigo-400 mt-1">Auto-detect language active.</p>
                  </>
                )}
              </div>
            </motion.div>

            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="audio/mpeg,audio/mp3,audio/mp4,audio/m4a,audio/wav,audio/webm,.mp3,.m4a,.wav,.webm"
              className="hidden"
            />
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="mx-8 mb-8 h-24 border-2 border-dashed border-gray-200 rounded-[24px] flex items-center justify-center gap-3 group hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer"
            >
              <UploadCloud className="w-6 h-6 text-gray-300 group-hover:text-indigo-500 transition-colors" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-500 group-hover:text-indigo-900 transition-colors">Or drop an audio file here</span>
                <span className="text-[10px] font-medium text-gray-400">MP3, M4A, WAV supported</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
