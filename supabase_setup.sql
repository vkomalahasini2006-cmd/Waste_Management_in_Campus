-- Campus Clean Supabase Setup Script
-- Run this script in the SQL Editor of your Supabase project

-- 1. Create the `waste_reports` table
CREATE TABLE IF NOT EXISTS waste_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT,
  department TEXT,
  location TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Configure Row Level Security (RLS)
-- Enable RLS for security
ALTER TABLE waste_reports ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (since this is a public form for the campus)
CREATE POLICY "Enable insert for all users" ON waste_reports 
  FOR INSERT WITH CHECK (true);

-- Allow anyone to select (to view in the dashboard)
CREATE POLICY "Enable read access for all users" ON waste_reports 
  FOR SELECT USING (true);


-- 3. Storage bucket setup for image uploads
-- Insert the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('waste-images', 'waste-images', true)
ON CONFLICT (id) DO NOTHING;

-- Configure storage policies
-- Allow anyone to upload images to the 'waste-images' bucket
CREATE POLICY "Public Upload Access" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'waste-images');

-- Allow anyone to view images
CREATE POLICY "Public Read Access" ON storage.objects 
  FOR SELECT USING (bucket_id = 'waste-images');

-- 4. Authentication (Instructions)
-- The application now natively supports Supabase Auth for the Dashboard.
-- When running the app, go to the Admin Login page and click "Register" to create your admin account with your real Email/Gmail.
-- Note: If you don't receive a confirmation email, you can go to your Supabase Project Settings -> Authentication -> Providers -> Email and disable "Confirm email" for faster local testing.
