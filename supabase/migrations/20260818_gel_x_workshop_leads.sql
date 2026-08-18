-- Gel X Workshop lead CRM (additive; stores only information needed for follow-up)
create table if not exists public.gel_x_workshop_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  full_name text not null check (char_length(full_name) between 2 and 120),
  contact text not null check (char_length(contact) between 6 and 80),
  experience text not null default 'Chưa xác định',
  area text,
  note text,
  source text not null default 'gel-x-workshop',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text not null default 'new' check (status in ('new','contacted','consulted','registered','not_fit')),
  admin_note text,
  consent_at timestamptz not null
);

alter table public.gel_x_workshop_leads enable row level security;
create policy "Public can submit Gel X leads" on public.gel_x_workshop_leads for insert to anon, authenticated with check (true);
create policy "Admins can view Gel X leads" on public.gel_x_workshop_leads for select to authenticated using (true);
create policy "Admins can update Gel X leads" on public.gel_x_workshop_leads for update to authenticated using (true) with check (true);
