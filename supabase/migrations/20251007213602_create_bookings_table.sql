/*
  # Create bookings table for call scheduling

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key) - Unique identifier for each booking
      - `name` (text) - Full name of the person booking
      - `email` (text) - Email address for contact
      - `company` (text, nullable) - Company name
      - `phone` (text, nullable) - Phone number
      - `project_type` (text, nullable) - Type of project (2D animation, motion graphics, etc.)
      - `budget` (text, nullable) - Project budget range
      - `message` (text) - Additional details about the project
      - `selected_date` (text, nullable) - Preferred call date
      - `selected_time` (text, nullable) - Preferred call time
      - `call_type` (text, nullable) - Type of call (video, phone, chat)
      - `status` (text) - Booking status (pending, confirmed, cancelled)
      - `created_at` (timestamptz) - Timestamp of booking creation
      
  2. Security
    - Enable RLS on `bookings` table
    - Add policy for anyone to insert bookings (public form submission)
    - Add policy for authenticated users to view all bookings (admin access)
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  project_type text,
  budget text,
  message text NOT NULL,
  selected_date text,
  selected_time text,
  call_type text DEFAULT 'video',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit bookings"
  ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);