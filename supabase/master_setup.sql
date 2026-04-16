-- ==========================================
-- MASTER SETUP FOR NEW NAIL SALON CLIENTS
-- Copy and run this once in Supabase SQL Editor
-- ==========================================

-- 1. Create Tables
create table public.images (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  category text not null,
  storage_path text not null,
  public_url text not null,
  batch text
);

create table public.counters (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value integer default 0 not null
);

create table public.youtube_videos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  youtube_url text not null,
  youtube_id text not null,
  category text not null,
  thumbnail_url text
);

create table public.course_info (
  id text primary key, -- 'pricing', 'rules', 'benefits'
  content jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Open RLS Policies for Admin (Authenticated users)
alter table public.images enable row level security;
alter table public.counters enable row level security;
alter table public.youtube_videos enable row level security;
alter table public.course_info enable row level security;

-- Policies for Tables
CREATE POLICY "Admin CRUD images" ON public.images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin CRUD counters" ON public.counters FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin CRUD youtube" ON public.youtube_videos FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin CRUD course_info" ON public.course_info FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Allow Public READ for everything
CREATE POLICY "Public Read images" ON public.images FOR SELECT TO anon USING (true);
CREATE POLICY "Public Read youtube" ON public.youtube_videos FOR SELECT TO anon USING (true);
CREATE POLICY "Public Read course_info" ON public.course_info FOR SELECT TO anon USING (true);

-- 3. Setup Storage Policies (After creating 'nail-images' bucket)
-- Note: Make sure to create 'nail-images' bucket and set to Public first.
CREATE POLICY "Admin full access nail-images" ON storage.objects 
FOR ALL TO authenticated USING (bucket_id = 'nail-images') WITH CHECK (bucket_id = 'nail-images');

CREATE POLICY "Public read nail-images" ON storage.objects 
FOR SELECT TO anon USING (bucket_id = 'nail-images');
