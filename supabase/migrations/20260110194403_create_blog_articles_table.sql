/*
  # Blog Articles Management System

  1. New Tables
    - `blog_articles`
      - `id` (uuid, primary key) - Unique identifier for each article
      - `title` (text) - Article title
      - `slug` (text, unique) - URL-friendly identifier
      - `excerpt` (text) - Short description/preview
      - `content` (text) - Full article content (HTML)
      - `category` (text) - Article category (e.g., "technology", "business", "heat-pumps")
      - `image_url` (text) - Path to article image
      - `published` (boolean, default false) - Publication status
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      - `author` (text, default 'Dmytro Tsarenko') - Article author

  2. Security
    - Enable RLS on `blog_articles` table
    - Add policy for public read access to published articles
    - Add policy for authenticated users to manage all articles
*/

CREATE TABLE IF NOT EXISTS blog_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  image_url text DEFAULT '',
  published boolean DEFAULT false,
  author text DEFAULT 'Dmytro Tsarenko',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published articles
CREATE POLICY "Anyone can read published articles"
  ON blog_articles
  FOR SELECT
  USING (published = true);

-- Policy: Authenticated users can read all articles
CREATE POLICY "Authenticated users can read all articles"
  ON blog_articles
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert articles
CREATE POLICY "Authenticated users can insert articles"
  ON blog_articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update articles
CREATE POLICY "Authenticated users can update articles"
  ON blog_articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete articles
CREATE POLICY "Authenticated users can delete articles"
  ON blog_articles
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON blog_articles(slug);

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_blog_articles_category ON blog_articles(category);

-- Create index for published articles
CREATE INDEX IF NOT EXISTS idx_blog_articles_published ON blog_articles(published, created_at DESC);