create extension if not exists "uuid-ossp";

create table if not exists taxpayer (
  id uuid primary key default uuid_generate_v4(),
  identifiant_fiscal varchar(64) unique,
  ice varchar(64),
  cin varchar(64),
  nom varchar(255),
  secteur varchar(128),
  ville varchar(128),
  adresse text,
  telephone varchar(64),
  category varchar(64),
  dri varchar(64),
  dip varchar(64),
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists watchlist (
  id uuid primary key default uuid_generate_v4(),
  name varchar(128) not null,
  type varchar(16) not null check (type in ('PRIVEE','PUBLIQUE')),
  owner_id varchar(64) not null,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists watchlist_member (
  watchlist_id uuid references watchlist(id) on delete cascade,
  taxpayer_id uuid references taxpayer(id) on delete cascade,
  added_by varchar(64) not null,
  added_at timestamptz default now(),
  reason text,
  source varchar(16) not null check (source in ('MANUAL','RULE')),
  primary key (watchlist_id, taxpayer_id)
);

create table if not exists timeline_event (
  id uuid primary key default uuid_generate_v4(),
  taxpayer_id uuid references taxpayer(id) on delete cascade,
  type varchar(64) not null,
  severity varchar(16),
  occurred_at timestamptz not null,
  payload jsonb default '{}'::jsonb
);

create index if not exists idx_taxpayer_identifiers on taxpayer(identifiant_fiscal, ice, cin);
create index if not exists idx_timeline_taxpayer_time on timeline_event(taxpayer_id, occurred_at desc);
create index if not exists idx_timeline_payload_gin on timeline_event using gin(payload);
