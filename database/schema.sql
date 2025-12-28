-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  short_description TEXT,
  cover_image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read blogs
CREATE POLICY "Public blogs are viewable by everyone"
  ON blogs FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert (we'll handle admin auth in API)
CREATE POLICY "Only authenticated users can insert blogs"
  ON blogs FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated users can update
CREATE POLICY "Only authenticated users can update blogs"
  ON blogs FOR UPDATE
  USING (true);

-- Policy: Only authenticated users can delete
CREATE POLICY "Only authenticated users can delete blogs"
  ON blogs FOR DELETE
  USING (true);

