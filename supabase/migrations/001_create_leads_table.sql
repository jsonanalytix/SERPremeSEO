-- ============================================================================
-- Migration: Create Leads Table
-- Created: 2026-02-03
-- Description: Creates the leads table for the CRM with full attribution tracking
-- ============================================================================

-- Create the leads table
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  
  -- Form Fields
  name text not null,
  practice_name text not null,
  email text not null,
  phone text not null,
  website text,
  project_type text,
  
  -- Lead Management
  status text default 'new' not null check (status in ('new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost')),
  notes text,
  conversion_value decimal(10,2),
  converted_at timestamptz,
  
  -- Attribution (UTM Parameters)
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  
  -- Click IDs (for offline conversions)
  gclid text,              -- Google Ads
  fbclid text,             -- Facebook/Meta
  msclkid text,            -- Microsoft Ads
  ttclid text,             -- TikTok
  li_fat_id text,          -- LinkedIn
  
  -- Session Context
  landing_page text,
  referrer text,
  user_agent text,
  ip_address text,
  
  -- Google Ads Conversion Sync
  gads_conversion_sent boolean default false,
  gads_conversion_sent_at timestamptz
);

-- Create indexes for common queries
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_gclid_idx on public.leads (gclid) where gclid is not null;
create index if not exists leads_utm_source_idx on public.leads (utm_source) where utm_source is not null;

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
drop trigger if exists on_leads_updated on public.leads;
create trigger on_leads_updated
  before update on public.leads
  for each row
  execute function public.handle_updated_at();

-- Enable Row Level Security
alter table public.leads enable row level security;

-- Create RLS policies
-- Policy: Service role can do everything (for API routes using service role key)
create policy "Service role has full access"
  on public.leads
  for all
  using (true)
  with check (true);

-- Policy: Authenticated users can read all leads (for admin dashboard)
create policy "Authenticated users can read leads"
  on public.leads
  for select
  to authenticated
  using (true);

-- Policy: Authenticated users can update leads (for admin dashboard)
create policy "Authenticated users can update leads"
  on public.leads
  for update
  to authenticated
  using (true)
  with check (true);

-- Policy: Anon users can insert leads (for form submissions)
create policy "Anon users can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- Add helpful comments
comment on table public.leads is 'Stores all lead submissions from the website with full attribution tracking';
comment on column public.leads.gclid is 'Google Click ID for offline conversion tracking';
comment on column public.leads.gads_conversion_sent is 'Whether this lead has been synced to Google Ads as an offline conversion';
comment on column public.leads.status is 'Lead status: new, contacted, qualified, proposal_sent, won, lost';
