/*
  # Create contacts and newsletter tables

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key) - Unique identifier for each contact submission
      - `name` (text) - Full name of the person contacting
      - `email` (text) - Email address for contact
      - `company` (text, nullable) - Company name
      - `subject` (text, nullable) - Subject of the inquiry
      - `project_type` (text, nullable) - Type of project
      - `budget` (text, nullable) - Project budget range
      - `message` (text) - Message content
      - `status` (text) - Contact status (pending, responded, closed)
      - `created_at` (timestamptz) - Timestamp of contact creation
    
    - `newsletter`
      - `id` (uuid, primary key) - Unique identifier for each subscription
      - `email` (text, unique) - Email address of subscriber
      - `status` (text) - Subscription status (subscribed, unsubscribed)
      - `created_at` (timestamptz) - Timestamp of subscription
      
  2. Security
    - Enable RLS on both tables
    - Add policy for anyone to insert contacts (public form submission)
    - Add policy for anyone to insert newsletter subscriptions
    - Add policy for authenticated users to view all records (admin access)
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  subject text,
  project_type text,
  budget text,
  message text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  status text DEFAULT 'subscribed',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contacts"
  ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view newsletter subscribers"
  ON newsletter
  FOR SELECT
  TO authenticated
  USING (true);