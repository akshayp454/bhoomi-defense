-- ==============================================================================
-- BHOOMI (Border Hazard Observation & Onset Monitoring Infrastructure)
-- Supabase Production Database Schema & Row-Level Security
-- Prepared for iDEX Open Challenge (Ministry of Defence / DIO)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. GRANT EVALUATOR & DEFENSE INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.grant_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  organization TEXT NOT NULL,       -- e.g. "iDEX / DIO", "Indian Army", "DRDO", "Defence Investor"
  designation TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  inquiry_type TEXT NOT NULL,       -- 'grant_evaluation', 'technical_briefing', 'field_trial_partnership', 'procurement'
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'reviewed', 'briefing_scheduled'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for queries
CREATE INDEX IF NOT EXISTS idx_grant_inquiries_created_at ON public.grant_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_grant_inquiries_type ON public.grant_inquiries (inquiry_type);

-- Row Level Security
ALTER TABLE public.grant_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public / evaluators to submit inquiries
CREATE POLICY "Allow public insert to grant_inquiries"
  ON public.grant_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Disallow public select (protect contact information)
CREATE POLICY "Disallow public select on grant_inquiries"
  ON public.grant_inquiries
  FOR SELECT
  TO anon
  USING (false);

-- 3. TECHNICAL WHITEPAPER & PROPOSAL ACCESS REQUESTS
CREATE TABLE IF NOT EXISTS public.whitepaper_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  organization TEXT NOT NULL,
  document_requested TEXT NOT NULL DEFAULT 'BHOOMI_v2.0_Detailed_Proposal',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.whitepaper_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to whitepaper_requests"
  ON public.whitepaper_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. SIMULATED SENSOR MESH TELEMETRY LOGS (FOR LIVE DEMO TO EVALUATORS)
CREATE TABLE IF NOT EXISTS public.telemetry_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id TEXT NOT NULL,
  sector TEXT NOT NULL,
  event_type TEXT NOT NULL,         -- 'sub_surface_digging', 'footstep_infiltration', 'heavy_vehicle', 'wildlife'
  confidence_score NUMERIC(5, 2) NOT NULL, -- e.g. 96.40
  seismic_freq_hz NUMERIC(6, 2) NOT NULL,
  acoustic_spl_db NUMERIC(5, 2) NOT NULL,
  status TEXT NOT NULL,             -- 'ALERT_DISPATCHED', 'CROSS_VERIFIED', 'FILTERED'
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS & allow public reading of telemetry logs for live dashboard view
ALTER TABLE public.telemetry_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on telemetry_logs"
  ON public.telemetry_logs
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5. SAMPLE SEED DATA FOR EVALUATOR DEMO
INSERT INTO public.telemetry_logs (node_id, sector, event_type, confidence_score, seismic_freq_hz, acoustic_spl_db, status)
VALUES
  ('NODE-084', 'Sector Charlie (LoC North)', 'sub_surface_digging', 97.4, 24.5, 38.2, 'ALERT_DISPATCHED'),
  ('NODE-085', 'Sector Charlie (LoC North)', 'sub_surface_digging', 94.1, 26.0, 35.8, 'CROSS_VERIFIED'),
  ('NODE-112', 'Sector Alpha (Dense Canopy)', 'footstep_infiltration', 91.8, 14.2, 42.1, 'ALERT_DISPATCHED'),
  ('NODE-019', 'Sector Delta (Riverine)', 'wildlife', 18.2, 8.5, 68.4, 'FILTERED'),
  ('NODE-042', 'Sector Bravo (Forward Base)', 'heavy_vehicle', 95.6, 52.0, 84.1, 'CROSS_VERIFIED')
ON CONFLICT DO NOTHING;
