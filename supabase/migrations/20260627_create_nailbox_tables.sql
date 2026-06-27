-- ===================================================
-- CREATE NAILBOX ITEMS TABLE
-- Run this in your Supabase SQL Editor
-- ===================================================

CREATE TABLE IF NOT EXISTS public.nailbox_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  drive_file_id text NOT NULL, -- Google Drive file ID
  sizes text[] DEFAULT ARRAY['XS', 'S', 'M', 'L', 'Custom']::text[] NOT NULL,
  forms text[] DEFAULT ARRAY['Oval', 'Almond', 'Square', 'Coffin', 'Stiletto']::text[] NOT NULL,
  price numeric DEFAULT 0,
  description text,
  is_custom boolean DEFAULT false NOT NULL,
  is_active boolean DEFAULT true NOT NULL
);

-- Enable RLS
ALTER TABLE public.nailbox_items ENABLE ROW LEVEL SECURITY;

-- Select policy: Allow anyone to read active items
CREATE POLICY "Public Read nailbox_items" ON public.nailbox_items 
  FOR SELECT TO anon USING (is_active = true);

-- CRUD policy: Allow admin/authenticated users to do anything
CREATE POLICY "Admin CRUD nailbox_items" ON public.nailbox_items 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
