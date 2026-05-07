import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle2, 
  Users, 
  Clock, 
  RefreshCw,
  Sparkles,
  Copy,
  Check,
  ListChecks,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface MeetingMinutesProps {
  transcript: string | null;
  loopId: string;
  title: string;
  duration?: number;
  createdAt?: string;
}

interface MinutesData {
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  decisions: string[];
  attendees: string[];
  language?: string;
}

export const MeetingMinutes = ({ transcript, loopId, title, duration, createdAt, savedMinutes }: MeetingMinutesProps & { savedMinutes?: string | null }) => {
  const [minutes, setMinutes] = useState<MinutesData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasLoadedSaved, setHasLoadedSaved] = useState(false);

  // Load saved minutes from database on mount
  useEffect(() => {
    if (savedMinutes && !hasLoadedSaved) {
      try {
        const parsed = JSON.parse(savedMinutes);
        if (parsed && parsed.summary) {
          setMinutes(parsed);
          setHasLoadedSaved(true);
        }
      } catch (e) {
        // Not valid JSON, ignore
      }
    }
  }, [savedMinutes, hasLoadedSaved]);

  const generateMinutes = async () => {
    if (!transcript) return;
    
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-minutes', {
        body: { transcript, title, loopId }
      });

      if (error) throw error;

      if (data?.minutes) {
        setMinutes(data.minutes);
        toast({ title: "Meeting minutes generated!" });
      }
    } catch (error: any) {
      console.error('Error generating minutes:', error);
      toast({
        title: "Generation failed",
        description: error.message || "Could not generate meeting minutes",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!minutes) return;
    
    const text = `
Minutes of Meeting (MoM)

Meeting Title: ${title}
Date: ${createdAt ? new Date(createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A'}
Duration: ${duration ? `${Math.floor(duration / 60)} minutes` : 'N/A'}

Summary
${minutes.summary}

Key Discussion Points
${minutes.keyPoints.map(p => `• ${p}`).join('\n')}

Decisions Taken
${minutes.decisions.map(d => `✓ ${d}`).join('\n')}

Action Items
${minutes.actionItems.map(a => `☐ ${a}`).join('\n')}

Meeting Adjourned.
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied to clipboard!" });
  };

  // Auto-generate if we have a transcript but no minutes and no saved minutes
  useEffect(() => {
    if (transcript && !minutes && !isGenerating && !savedMinutes && hasLoadedSaved === false) {
      // Only auto-generate if there are no saved minutes
      const timer = setTimeout(() => {
        generateMinutes();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [transcript, savedMinutes]);

  if (!transcript) {
    return null;
  }

  if (isGenerating) {
    return (
      <section className="mt-8 p-8 bg-slate-50/50 rounded-2xl border border-slate-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-12 h-12 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-indigo-500 animate-spin" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-1 font-sans">Generating Minutes of Meeting...</h3>
          <p className="text-xs text-slate-400 font-sans">AI is analyzing your transcript</p>
        </motion.div>
      </section>
    );
  }

  if (!minutes) {
    return (
      <section className="mt-8 p-8 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl border border-indigo-100/50">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-indigo-500" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-1 font-sans">Generate Minutes of Meeting</h3>
          <p className="text-xs text-slate-400 mb-4 font-sans">AI will create structured meeting minutes from your transcript</p>
          <button
            onClick={generateMinutes}
            className="px-5 py-2 bg-indigo-500 text-white rounded-full text-xs font-semibold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20 font-sans"
          >
            Generate Now
          </button>
        </motion.div>
      </section>
    );
  }

  const formattedDate = createdAt 
    ? new Date(createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'N/A';
  
  const formattedDuration = duration ? `${Math.floor(duration / 60)} minutes` : 'N/A';

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 space-y-6"
    >
      {/* MoM Header */}
      <div className="border-b-2 border-indigo-500 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-black font-sans tracking-tight">Minutes of Meeting (MoM)</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={generateMinutes}
              className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
              title="Regenerate"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Meeting Title:</span>
            <span className="text-slate-800">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-slate-600">Date:</span>
            <span className="text-slate-800">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-slate-600">Duration:</span>
            <span className="text-slate-800">{formattedDuration}</span>
          </div>
          {minutes.attendees.length > 0 && (
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-slate-400" />
              <span className="font-semibold text-slate-600">Attendees:</span>
              <span className="text-slate-800">{minutes.attendees.join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-bold text-black font-sans uppercase tracking-wider">Summary</h3>
        </div>
        <p className="text-slate-700 leading-relaxed pl-6">{minutes.summary}</p>
      </div>

      {/* Key Discussion Points */}
      {minutes.keyPoints.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-green-500" />
            <h3 className="text-sm font-bold text-black font-sans uppercase tracking-wider">Key Discussion Points</h3>
          </div>
          <ul className="space-y-2 pl-6">
            {minutes.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="text-green-500 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Decisions Taken */}
      {minutes.decisions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-bold text-black font-sans uppercase tracking-wider">Decisions Taken</h3>
          </div>
          <ul className="space-y-2 pl-6">
            {minutes.decisions.map((decision, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                <span>{decision}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Items */}
      {minutes.actionItems.length > 0 && (
        <div className="space-y-3 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
          <div className="flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-black font-sans uppercase tracking-wider">Action Items</h3>
          </div>
          <ul className="space-y-2 pl-6">
            {minutes.actionItems.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <div className="w-4 h-4 rounded border-2 border-indigo-400 mt-0.5 shrink-0" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-400 font-sans font-medium">Meeting Adjourned.</p>
      </div>
    </motion.section>
  );
};
