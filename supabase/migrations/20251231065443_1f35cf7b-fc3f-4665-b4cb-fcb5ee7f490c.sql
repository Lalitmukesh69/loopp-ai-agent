-- Create enum for loop status
CREATE TYPE public.loop_status AS ENUM ('live', 'processing', 'completed', 'failed');

-- Create enum for task priority
CREATE TYPE public.task_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create enum for task status
CREATE TYPE public.task_status AS ENUM ('pending', 'in_progress', 'completed');

-- Create loops table (live meetings)
CREATE TABLE public.loops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status loop_status NOT NULL DEFAULT 'live',
  duration_seconds INTEGER DEFAULT 0,
  transcript TEXT,
  summary TEXT,
  action_items JSONB,
  audio_url TEXT,
  participants TEXT[],
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tasks table (extracted from loops)
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  loop_id UUID REFERENCES public.loops(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority task_priority NOT NULL DEFAULT 'medium',
  status task_status NOT NULL DEFAULT 'pending',
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on loops
ALTER TABLE public.loops ENABLE ROW LEVEL SECURITY;

-- Enable RLS on tasks
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- RLS policies for loops
CREATE POLICY "Users can view their own loops"
ON public.loops FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own loops"
ON public.loops FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own loops"
ON public.loops FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own loops"
ON public.loops FOR DELETE
USING (auth.uid() = user_id);

-- RLS policies for tasks
CREATE POLICY "Users can view their own tasks"
ON public.tasks FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tasks"
ON public.tasks FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
ON public.tasks FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
ON public.tasks FOR DELETE
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_loops_user_id ON public.loops(user_id);
CREATE INDEX idx_loops_status ON public.loops(status);
CREATE INDEX idx_loops_started_at ON public.loops(started_at DESC);
CREATE INDEX idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX idx_tasks_loop_id ON public.tasks(loop_id);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_priority ON public.tasks(priority);

-- Triggers for updated_at
CREATE TRIGGER update_loops_updated_at
BEFORE UPDATE ON public.loops
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON public.tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();