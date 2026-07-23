-- =============================================
-- NexicWeb Database Schema - Websites Management
-- =============================================

-- Create websites table
CREATE TABLE IF NOT EXISTS websites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  demo_url VARCHAR(500),
  github_url VARCHAR(500),
  thumbnail_url VARCHAR(500) NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create website_images table for gallery images
CREATE TABLE IF NOT EXISTS website_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_websites_category ON websites(category);
CREATE INDEX IF NOT EXISTS idx_websites_status ON websites(status);
CREATE INDEX IF NOT EXISTS idx_websites_featured ON websites(featured);
CREATE INDEX IF NOT EXISTS idx_websites_created_at ON websites(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_website_images_website_id ON website_images(website_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for websites table
DROP TRIGGER IF EXISTS update_websites_updated_at ON websites;
CREATE TRIGGER update_websites_updated_at
  BEFORE UPDATE ON websites
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional for testing)
INSERT INTO websites (title, description, category, price, demo_url, github_url, thumbnail_url, featured, status)
VALUES 
  ('Modern Portfolio', 'A sleek and modern portfolio template with animations', 'portfolio', 29.99, 'https://demo.nexicweb.com/portfolio', 'https://github.com/nexicweb/portfolio', 'https://via.placeholder.com/400x300', true, 'published'),
  ('E-Commerce Pro', 'Full-featured e-commerce template with cart and checkout', 'ecommerce', 49.99, 'https://demo.nexicweb.com/ecommerce', 'https://github.com/nexicweb/ecommerce', 'https://via.placeholder.com/400x300', true, 'published'),
  ('SaaS Landing', 'Perfect landing page for SaaS products', 'landing', 19.99, 'https://demo.nexicweb.com/saas', 'https://github.com/nexicweb/saas', 'https://via.placeholder.com/400x300', false, 'published')
ON CONFLICT DO NOTHING;
