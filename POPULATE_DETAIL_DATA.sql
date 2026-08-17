-- ============================================================
-- POPULATE DETAIL PAGE DATA FOR ALL EXISTING WEBSITES
-- ============================================================
-- Run this AFTER running 006_add_detail_page_fields.sql migration
-- This sets reasonable defaults for all existing websites
-- You can then customize individual websites from admin dashboard
-- ============================================================

-- Update all websites with default detail page values
UPDATE websites
SET 
  live_preview_url = demo_url,  -- Use existing demo_url as live preview
  category_tag = UPPER(category),  -- Use category as tag (e.g., "SAAS", "BLOG")
  subtitle = 'Professional ' || category || ' template for modern web applications',
  feature_tags = CASE 
    WHEN category = 'SaaS' THEN '["Fast Performance", "SEO Optimized", "Responsive Design", "Modern UI"]'::jsonb
    WHEN category = 'Blog' THEN '["Blog Ready", "SEO Optimized", "Responsive Design", "Clean Code"]'::jsonb
    WHEN category = 'Landing Page' THEN '["High Converting", "Mobile First", "Fast Loading", "Modern Design"]'::jsonb
    WHEN category = 'Portfolio' THEN '["Showcase Ready", "Responsive Design", "Modern UI", "Fast Performance"]'::jsonb
    WHEN category = 'E-commerce' THEN '["Shop Ready", "Payment Integration", "Responsive Design", "SEO Optimized"]'::jsonb
    WHEN category = 'Agency' THEN '["Business Ready", "Professional Design", "Responsive Layout", "SEO Optimized"]'::jsonb
    ELSE '["Modern Design", "Responsive Layout", "SEO Optimized", "Fast Performance"]'::jsonb
  END,
  long_description = 'This comprehensive ' || category || ' template is designed for modern web applications. Built with the latest technologies and best practices, it provides a solid foundation for your next project. Features include responsive design, SEO optimization, clean code structure, and extensive customization options. Perfect for businesses, startups, and developers looking to launch quickly without compromising on quality.',
  rating = 4.8,
  license = 'Extended License',
  updates = 'Lifetime Updates',
  feature_pills = '["HTML5", "CSS3", "JavaScript", "Responsive", "SEO Ready", "Fast Loading"]'::jsonb,
  packages = jsonb_build_object(
    'starter', jsonb_build_object(
      'price', price,
      'features', jsonb_build_array(
        'Complete source code',
        'Documentation included',
        'Responsive design',
        'Basic support (30 days)',
        'Single project license',
        'Regular updates'
      )
    ),
    'professional', jsonb_build_object(
      'price', ROUND((price * 1.5)::numeric, 2),
      'features', jsonb_build_array(
        'Everything in Starter',
        'Extended documentation',
        'Priority support (90 days)',
        'Multiple project license',
        'Custom components',
        'Advanced features',
        'Lifetime updates'
      )
    ),
    'agency', jsonb_build_object(
      'price', ROUND((price * 2.5)::numeric, 2),
      'features', jsonb_build_array(
        'Everything in Professional',
        'White-label license',
        'Unlimited projects',
        'Dedicated support (1 year)',
        'Custom development',
        'Source code access',
        'Priority updates',
        'Commercial use rights'
      )
    )
  ),
  resource_cards = jsonb_build_array(
    jsonb_build_object(
      'title', 'Documentation',
      'description', 'Complete setup guide and API reference',
      'link', github_url,
      'icon', 'fa-book'
    ),
    jsonb_build_object(
      'title', 'Live Demo',
      'description', 'View the template in action',
      'link', demo_url,
      'icon', 'fa-external-link-alt'
    ),
    jsonb_build_object(
      'title', 'Source Code',
      'description', 'Access the complete source code',
      'link', github_url,
      'icon', 'fa-code'
    ),
    jsonb_build_object(
      'title', 'Support',
      'description', 'Get help from our support team',
      'link', 'https://nexicweb.netlify.app/#contact',
      'icon', 'fa-life-ring'
    )
  ),
  preview_image_url = thumbnail_url  -- Use thumbnail as preview for now
WHERE 
  live_preview_url IS NULL  -- Only update if not already set
  AND category IS NOT NULL;

-- ============================================================
-- VERIFICATION QUERY
-- ============================================================
-- Run this to check that data was populated correctly
-- SELECT 
--   id, 
--   title, 
--   category_tag,
--   rating,
--   jsonb_array_length(feature_tags) as feature_count,
--   jsonb_array_length(feature_pills) as pill_count,
--   packages->'starter'->>'price' as starter_price,
--   packages->'professional'->>'price' as pro_price,
--   packages->'agency'->>'price' as agency_price
-- FROM websites 
-- WHERE live_preview_url IS NOT NULL
-- ORDER BY display_order ASC, created_at DESC;

