-- =============================================
-- Add details_page column to websites table
-- =============================================

-- Add details_page column
ALTER TABLE websites 
ADD COLUMN IF NOT EXISTS details_page VARCHAR(255);

-- Add comment
COMMENT ON COLUMN websites.details_page IS 'Path to the detail page HTML file (e.g., w18detail.html)';
