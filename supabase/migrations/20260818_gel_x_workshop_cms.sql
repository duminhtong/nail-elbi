-- Gel X Workshop CMS (additive migration; does not modify existing content)
create table if not exists public.gel_x_workshop_content (
  id text primary key default 'default',
  hero_eyebrow text not null default 'Workshop / Gel X',
  hero_title text not null default 'GEL X',
  hero_subtitle text not null default '1 NGÀY',
  hero_claim text not null default 'HỌC LÀ ỨNG DỤNG ĐƯỢC SALON',
  hero_lead text not null default 'Một ngày tập trung vào nền tảng, độ chính xác và những kỹ thuật có thể mang thẳng vào nhịp làm việc thực tế tại salon.',
  usp_title text not null default 'ÚP KHÔNG MÀI GỜ',
  usp_subtitle text not null default 'KHÔNG BÙ CỨNG MÓNG',
  duration text not null default '1 NGÀY',
  objective text not null default 'ỨNG DỤNG THỰC CHIẾN SALON',
  instructor text not null default 'Kim Ngân Lê',
  registration_label text not null default 'Đăng ký tư vấn',
  registration_url text not null default 'https://zalo.me/0901292729',
  curriculum jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.gel_x_workshop_gallery (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  name text not null,
  title text not null,
  storage_path text not null,
  public_url text not null,
  sort_order integer not null default 0
);

alter table public.gel_x_workshop_content enable row level security;
alter table public.gel_x_workshop_gallery enable row level security;

create policy "Public read Gel X workshop content" on public.gel_x_workshop_content for select to anon, authenticated using (true);
create policy "Admin manage Gel X workshop content" on public.gel_x_workshop_content for all to authenticated using (true) with check (true);
create policy "Public read Gel X workshop gallery" on public.gel_x_workshop_gallery for select to anon, authenticated using (true);
create policy "Admin manage Gel X workshop gallery" on public.gel_x_workshop_gallery for all to authenticated using (true) with check (true);

insert into public.gel_x_workshop_content (id, curriculum)
values ('default', '[{"title":"GEL X","items":["Phân tích móng","Kỹ thuật đo form móng chuẩn","Kỹ thuật Úp Móng","Kỹ thuật hạ móng úp"]},{"title":"FORM","items":["Phân tích Form","Thực hành 5 form thực chiến salon"]},{"title":"MÔN HỖ TRỢ","items":["Úp không mài Gờ - Không bù cứng móng"]},{"title":"DA SALON","items":["Trải builder gel ứng dụng salon"]}]'::jsonb)
on conflict (id) do nothing;
