-- Run once in Supabase → SQL Editor → New query → Run.

create table public.admins (
  user_id uuid primary key references auth.users on delete cascade,
  name text not null
);

create function public.is_admin() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

create table public.content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users default auth.uid()
);

create table public.enquiries (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  source text not null default 'website' check (source in ('website', 'whatsapp', 'call', 'walk-in', 'instagram', 'other')),
  name text check (char_length(name) <= 120),
  phone text check (char_length(phone) <= 30),
  service text check (char_length(service) <= 80),
  occasion text check (char_length(occasion) <= 80),
  event_date date,
  place text check (char_length(place) <= 120),
  people text check (char_length(people) <= 10),
  mode text check (char_length(mode) <= 60),
  message text check (char_length(message) <= 2000),
  status text not null default 'new' check (status in ('new', 'contacted', 'booked', 'completed', 'lost')),
  amount numeric(10, 2) check (amount >= 0),
  notes text,
  handled_by uuid references auth.users,
  updated_at timestamptz
);
create index on public.enquiries (created_at desc);

create table public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  type text not null check (type in ('whatsapp', 'whatsapp-look', 'whatsapp-form', 'call')),
  path text check (char_length(path) <= 200)
);
create index on public.events (created_at desc);

alter table public.admins enable row level security;
alter table public.content enable row level security;
alter table public.enquiries enable row level security;
alter table public.events enable row level security;

create policy "admins read admins" on public.admins for select to authenticated using (public.is_admin());

create policy "anyone reads content" on public.content for select to anon, authenticated using (true);
create policy "admins write content" on public.content for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "website adds enquiries" on public.enquiries for insert to anon
  with check (source = 'website' and status = 'new' and amount is null and notes is null and handled_by is null and phone is null);
create policy "admins manage enquiries" on public.enquiries for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "website adds events" on public.events for insert to anon with check (true);
create policy "admins read events" on public.events for select to authenticated using (public.is_admin());

insert into storage.buckets (id, name, public) values ('media', 'media', true);

create policy "admins upload media" on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
create policy "admins update media" on storage.objects for update to authenticated using (bucket_id = 'media' and public.is_admin());
create policy "admins delete media" on storage.objects for delete to authenticated using (bucket_id = 'media' and public.is_admin());
