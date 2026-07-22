CREATE TABLE IF NOT EXISTS outreach_leads (
  id uuid PRIMARY KEY, business text NOT NULL, owner text, phone text, email text NOT NULL,
  email_quality text, city text, state text, tier text, score numeric, focus text,
  advertises_24x7 boolean NOT NULL DEFAULT false, hook text, email_opener text, reviews integer,
  ready boolean NOT NULL DEFAULT false, source text, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS outreach_leads_email_business_idx ON outreach_leads (email, business);
CREATE TABLE IF NOT EXISTS outreach_demos (
  id uuid PRIMARY KEY, lead_id uuid NOT NULL REFERENCES outreach_leads(id), token_hash text NOT NULL UNIQUE,
  token text NOT NULL UNIQUE, expires_at timestamptz NOT NULL, revoked_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS outreach_batches (id uuid PRIMARY KEY, batch_date date NOT NULL UNIQUE, status text NOT NULL, sent_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS outreach_batch_items (batch_id uuid NOT NULL REFERENCES outreach_batches(id), lead_id uuid NOT NULL REFERENCES outreach_leads(id), position integer NOT NULL, demo_id uuid NOT NULL REFERENCES outreach_demos(id), subject text NOT NULL, text_body text NOT NULL, html_body text NOT NULL, PRIMARY KEY(batch_id, lead_id));
CREATE TABLE IF NOT EXISTS outreach_send_events (id uuid PRIMARY KEY, lead_id uuid NOT NULL REFERENCES outreach_leads(id), demo_id uuid REFERENCES outreach_demos(id), status text NOT NULL, recipient_email text NOT NULL, subject text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS outreach_suppressions (email text PRIMARY KEY, reason text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
