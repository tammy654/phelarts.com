/*
# Create projects table

1. New Tables
- `projects`
- `id` (uuid, primary key)
- `source_type` (text: 'booking' | 'inquiry')
- `source_id` (uuid, references bookings or inquiries, nullable)
- `full_name`, `email`, `company`, `phone`, `project_type`, `call_type`,
  `preferred_date`, `preferred_time`, `project_details` (copied from source)
- `status` (text: 'ongoing' | 'completed' | 'canceled', default 'ongoing')
- `created_at`, `updated_at` (timestamptz)

2. Security
- RLS enabled. Admin dashboard uses anon key (email-only gate, no real auth),
  so anon can SELECT / INSERT / UPDATE / DELETE. Open model like other tables.
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL CHECK (source_type IN ('booking', 'inquiry')),
  source_id uuid,
  full_name text,
  email text,
  company text,
  phone text,
  project_type text,
  call_type text,
  preferred_date text,
  preferred_time text,
  project_details text,
  status text NOT NULL DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed', 'canceled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anon can read projects" ON projects;
CREATE POLICY "Anon can read projects" ON projects FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Anon can insert projects" ON projects;
CREATE POLICY "Anon can insert projects" ON projects FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Anon can update projects" ON projects;
CREATE POLICY "Anon can update projects" ON projects FOR UPDATE TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anon can delete projects" ON projects;
CREATE POLICY "Anon can delete projects" ON projects FOR DELETE TO anon USING (true);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO anon;
