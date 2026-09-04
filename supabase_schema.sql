-- ==============================================================================
-- NOOR AL DHUHA ATELIER - SUPABASE DATABASE & STORAGE SETUP SCHEMA
-- ==============================================================================
-- Run this SQL in your Supabase Project -> SQL Editor -> New query -> Run.
-- ==============================================================================

-- 1. Enable UUID extension if not enabled
create extension if not exists "uuid-ossp";

-- 2. CREATE PRODUCTS TABLE
create table if not exists public.products (
  id text primary key,
  name text not null,
  subtitle text,
  price numeric not null,
  original_price numeric,
  category text not null,
  badge text,
  target_region text default 'all' check (target_region in ('all', 'india', 'arab')),
  rating numeric default 5.0,
  reviews_count integer default 0,
  reviews jsonb default '[]'::jsonb,
  is_violet_edition boolean default false,
  default_style text default 'Open abaya',
  default_work text default 'Plain/Basic',
  styles jsonb default '["Open abaya", "Closed cut", "Kimono or kaftan", "Butterfly or farasha", "umbrella cut or Flare", "2 piece abaya (with inner)", "Coat abaya"]'::jsonb,
  works jsonb default '["Plain/Basic", "Embroidery Abaya", "Handwork Abaya", "Stonework Abaya", "Threadwork Abaya", "Printed Abaya", "Lace Work Abaya"]'::jsonb,
  subcategory text,
  wholesale_type text,
  wholesale_min_qty integer default 1,
  image text not null,
  gallery jsonb default '[]'::jsonb,
  sizes jsonb default '["Size 52 (52\")", "Size 54 (54\")", "Size 56 (56\")", "Size 58 (58\")", "Size 60 (60\")", "Custom Tailored Fit"]'::jsonb,
  description text,
  fabric_details text,
  styling_advice text,
  care_instructions text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==============================================================================
-- MIGRATION SCRIPT (Run this in Supabase SQL Editor for existing databases)
-- ==============================================================================
-- ALTER TABLE public.products ADD COLUMN IF NOT EXISTS target_region text DEFAULT 'all';
-- ALTER TABLE public.products ADD COLUMN IF NOT EXISTS reviews jsonb DEFAULT '[]'::jsonb;
-- ALTER TABLE public.products ADD COLUMN IF NOT EXISTS subcategory text;
-- ALTER TABLE public.products ADD COLUMN IF NOT EXISTS wholesale_type text;
-- ALTER TABLE public.products ADD COLUMN IF NOT EXISTS wholesale_min_qty integer DEFAULT 1;


-- 3. CREATE ORDERS & TRACKING TABLE
create table if not exists public.orders (
  id text primary key,
  customer_name text not null,
  email text,
  phone text,
  delivery_address text,
  carrier text default 'DHL Express Luxury Courier',
  tracking_number text,
  status text default 'Order Confirmed & Payment Verified',
  items jsonb default '[]'::jsonb,
  total_amount numeric,
  timeline jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. ENABLE ROW LEVEL SECURITY (RLS)
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- 5. RLS POLICIES FOR PRODUCTS
-- Allow public read access to all products
drop policy if exists "Public products are viewable by everyone" on public.products;
create policy "Public products are viewable by everyone"
  on public.products for select
  using (true);

-- Allow authenticated users / admins full write access to products
drop policy if exists "Enable insert for all users or anon" on public.products;
create policy "Enable insert for all users or anon"
  on public.products for insert
  with check (true);

drop policy if exists "Enable update for all users or anon" on public.products;
create policy "Enable update for all users or anon"
  on public.products for update
  using (true);

drop policy if exists "Enable delete for all users or anon" on public.products;
create policy "Enable delete for all users or anon"
  on public.products for delete
  using (true);

-- 6. RLS POLICIES FOR ORDERS
drop policy if exists "Orders are viewable by all" on public.orders;
create policy "Orders are viewable by all"
  on public.orders for select
  using (true);

drop policy if exists "Orders can be created by all" on public.orders;
create policy "Orders can be created by all"
  on public.orders for insert
  with check (true);

drop policy if exists "Orders can be updated by all" on public.orders;
create policy "Orders can be updated by all"
  on public.orders for update
  using (true);

-- 7. CREATE SITE CONTENT (CMS) TABLE
-- Stores all editable page content as JSON key-value pairs
create table if not exists public.site_content (
  key text primary key,
  section text not null,
  label text,
  content jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- Enable RLS on site_content
alter table public.site_content enable row level security;

-- Allow anyone to read site content (public)
drop policy if exists "Site content is viewable by everyone" on public.site_content;
create policy "Site content is viewable by everyone"
  on public.site_content for select
  using (true);

-- Allow inserts (admin PIN authenticated in-app, not via Supabase auth)
drop policy if exists "Enable insert for site_content" on public.site_content;
create policy "Enable insert for site_content"
  on public.site_content for insert
  with check (true);

-- Allow updates
drop policy if exists "Enable update for site_content" on public.site_content;
create policy "Enable update for site_content"
  on public.site_content for update
  using (true);

-- Allow deletes
drop policy if exists "Enable delete for site_content" on public.site_content;
create policy "Enable delete for site_content"
  on public.site_content for delete
  using (true);


-- 8. STORAGE BUCKET CONFIGURATION (product-images)

-- Run this to create the public storage bucket for product photos
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Storage policies to allow public reads and uploads
drop policy if exists "Public Access to product-images" on storage.objects;
create policy "Public Access to product-images"
  on storage.objects for select
  using ( bucket_id = 'product-images' );

drop policy if exists "Allow uploads to product-images" on storage.objects;
create policy "Allow uploads to product-images"
  on storage.objects for insert
  with check ( bucket_id = 'product-images' );

drop policy if exists "Allow updates to product-images" on storage.objects;
create policy "Allow updates to product-images"
  on storage.objects for update
  using ( bucket_id = 'product-images' );

drop policy if exists "Allow deletes to product-images" on storage.objects;
create policy "Allow deletes to product-images"
  on storage.objects for delete
  using ( bucket_id = 'product-images' );

-- ==============================================================================
-- 9. APP SETTINGS TABLE
-- Stores global site feature flags (e.g. admin_enabled on/off).
-- ==============================================================================

create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.app_settings enable row level security;

-- Allow public read (flag is non-sensitive — it only shows/hides the UI button)
drop policy if exists "App settings viewable by everyone" on public.app_settings;
create policy "App settings viewable by everyone"
  on public.app_settings for select
  using (true);

-- Allow inserts (admin PIN authenticated in-app)
drop policy if exists "Enable insert for app_settings" on public.app_settings;
create policy "Enable insert for app_settings"
  on public.app_settings for insert
  with check (true);

-- Allow updates
drop policy if exists "Enable update for app_settings" on public.app_settings;
create policy "Enable update for app_settings"
  on public.app_settings for update
  using (true);

-- Insert default: admin_enabled = true
insert into public.app_settings (key, value)
values ('admin_enabled', '{"enabled": true}')
on conflict (key) do nothing;
