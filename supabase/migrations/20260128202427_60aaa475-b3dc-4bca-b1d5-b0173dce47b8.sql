-- Add language column to loops table to store detected language
ALTER TABLE public.loops ADD COLUMN language text DEFAULT NULL;

-- Add comment to explain the column
COMMENT ON COLUMN public.loops.language IS 'Detected language of the audio/transcript';