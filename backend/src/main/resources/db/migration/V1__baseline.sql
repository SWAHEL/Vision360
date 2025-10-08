-- Keep both lines; they’re idempotent and safe on any env
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS taxpayer (
                                        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                        identifiant_fiscal varchar(64) UNIQUE,
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
                                        created_at timestamptz DEFAULT now(),
                                        updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS watchlist (
                                         id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                         name varchar(128) NOT NULL,
                                         type varchar(16) NOT NULL CHECK (type in ('PRIVEE','PUBLIQUE')),
                                         owner_id varchar(64) NOT NULL,
                                         active boolean DEFAULT true,
                                         created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS watchlist_member (
                                                watchlist_id uuid REFERENCES watchlist(id) ON DELETE CASCADE,
                                                taxpayer_id uuid REFERENCES taxpayer(id) ON DELETE CASCADE,
                                                added_by varchar(64) NOT NULL,
                                                added_at timestamptz DEFAULT now(),
                                                reason text,
                                                source varchar(16) NOT NULL CHECK (source in ('MANUAL','RULE')),
                                                PRIMARY KEY (watchlist_id, taxpayer_id)
);

CREATE TABLE IF NOT EXISTS timeline_event (
                                              id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                              taxpayer_id uuid REFERENCES taxpayer(id) ON DELETE CASCADE,
                                              type varchar(64) NOT NULL,
                                              severity varchar(16),
                                              occurred_at timestamptz NOT NULL,
                                              payload jsonb DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_taxpayer_identifiers ON taxpayer(identifiant_fiscal, ice, cin);
CREATE INDEX IF NOT EXISTS idx_timeline_taxpayer_time ON timeline_event(taxpayer_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_timeline_payload_gin ON timeline_event USING gin(payload);
