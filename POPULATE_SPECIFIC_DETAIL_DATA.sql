-- ============================================================
-- POPULATE SPECIFIC DETAIL PAGE DATA FOR ALL WEBSITES
-- ============================================================
-- Run this AFTER running the basic POPULATE_DETAIL_DATA.sql
-- This provides more specific customizations per website type
-- ============================================================

-- ============================================================
-- OPTION 1: QUICK DEFAULT POPULATION (RECOMMENDED FIRST)
-- ============================================================
-- This gives all websites good default values based on their category
-- You can run this first, then customize specific websites later from admin dashboard

UPDATE websites
SET 
  live_preview_url = demo_url,
  category_tag = CASE 
    WHEN category = 'FREE' THEN 'FREE TEMPLATE'
    WHEN category = 'SaaS' THEN 'SAAS PRODUCT'
    WHEN category = 'Blog' THEN 'BLOG TEMPLATE'
    WHEN category = 'Landing Page' THEN 'LANDING PAGE'
    WHEN category = 'Portfolio' THEN 'PORTFOLIO'
    WHEN category = 'E-commerce' THEN 'E-COMMERCE'
    WHEN category = 'Agency' THEN 'AGENCY'
    ELSE UPPER(category)
  END,
  subtitle = description,  -- Use existing description as subtitle
  feature_tags = CASE 
    WHEN category = 'FREE' THEN '["Free Template", "Full Source Code", "No Attribution", "Commercial Use"]'::jsonb
    WHEN category = 'SaaS' THEN '["SaaS Ready", "Dashboard UI", "API Integration", "User Management"]'::jsonb
    WHEN category = 'Blog' THEN '["Blog System", "CMS Ready", "SEO Optimized", "Comment System"]'::jsonb
    WHEN category = 'Landing Page' THEN '["High Converting", "Lead Capture", "Mobile First", "Fast Loading"]'::jsonb
    WHEN category = 'Portfolio' THEN '["Gallery Ready", "Project Showcase", "Contact Form", "Responsive"]'::jsonb
    WHEN category = 'E-commerce' THEN '["Shop System", "Cart Ready", "Payment Integration", "Product Management"]'::jsonb
    WHEN category = 'Agency' THEN '["Service Showcase", "Team Section", "Portfolio Grid", "Contact Forms"]'::jsonb
    ELSE '["Modern Design", "Responsive", "Fast Loading", "SEO Ready"]'::jsonb
  END,
  long_description = CASE
    WHEN category = 'FREE' THEN 
      'This premium free template is designed for creative professionals, developers, and businesses looking to establish a strong online presence. Built with modern web technologies and best practices, it includes everything you need to launch quickly: responsive layouts, smooth animations, optimized performance, and clean code structure. Perfect for portfolios, landing pages, and personal projects. No attribution required, full commercial use allowed.'
    WHEN category = 'SaaS' THEN
      'A complete SaaS application template featuring user authentication, dashboard interfaces, subscription management, and API integration. Built for scalability and performance, this template provides a solid foundation for launching your software-as-a-service product. Includes user management, billing integration, admin panels, and comprehensive documentation.'
    WHEN category = 'Blog' THEN
      'Modern blog template with CMS integration, category management, tag systems, and SEO optimization. Perfect for content creators, publishers, and businesses. Features responsive design, fast loading times, social sharing, comment systems, and newsletter integration. Built with clean code and easy customization in mind.'
    WHEN category = 'Landing Page' THEN
      'High-converting landing page template designed to capture leads and drive conversions. Features hero sections, benefit highlights, testimonials, pricing tables, and strategic call-to-action placement. Optimized for speed, mobile devices, and search engines. Perfect for product launches, services, and marketing campaigns.'
    WHEN category = 'Portfolio' THEN
      'Stunning portfolio template to showcase your work and attract clients. Features project galleries, filterable categories, case study layouts, and contact forms. Perfect for designers, photographers, developers, and creative professionals. Responsive design ensures your work looks great on all devices.'
    WHEN category = 'E-commerce' THEN
      'Complete e-commerce solution with product catalogs, shopping cart, checkout process, and payment integration. Built for online stores, digital products, and retail businesses. Includes product management, order tracking, customer accounts, and inventory systems. Optimized for conversions and user experience.'
    WHEN category = 'Agency' THEN
      'Professional agency template showcasing services, portfolio, team members, and client testimonials. Perfect for creative agencies, consulting firms, and service businesses. Features service pages, case studies, team bios, and multi-step contact forms. Built to convert visitors into clients.'
    ELSE
      'Professional web template built with modern technologies and best practices. Features responsive design, fast performance, SEO optimization, and clean code structure. Perfect for businesses, startups, and developers looking to launch quickly without compromising quality.'
  END,
  rating = CASE 
    WHEN featured = true THEN 5.0
    WHEN category = 'FREE' THEN 4.7
    ELSE 4.8
  END,
  license = CASE 
    WHEN category = 'FREE' THEN 'MIT License (Free)'
    ELSE 'Extended Commercial License'
  END,
  updates = CASE 
    WHEN category = 'FREE' THEN 'Regular Updates'
    ELSE 'Lifetime Updates'
  END,
  feature_pills = CASE
    WHEN category = 'FREE' THEN '["HTML5", "CSS3", "JavaScript", "Responsive", "Free License", "No Attribution"]'::jsonb
    WHEN title ILIKE '%react%' THEN '["React", "TypeScript", "Tailwind CSS", "Responsive", "SEO Ready", "Fast Loading"]'::jsonb
    WHEN title ILIKE '%next%' THEN '["Next.js", "React", "TypeScript", "SEO Ready", "Server-Side Rendering", "Responsive"]'::jsonb
    WHEN title ILIKE '%vue%' THEN '["Vue.js", "TypeScript", "Tailwind CSS", "Responsive", "SEO Ready", "Fast Loading"]'::jsonb
    ELSE '["HTML5", "CSS3", "JavaScript", "Responsive", "SEO Ready", "Fast Loading"]'::jsonb
  END,
  packages = jsonb_build_object(
    'starter', jsonb_build_object(
      'price', CASE WHEN category = 'FREE' THEN 0 ELSE price END,
      'features', CASE WHEN category = 'FREE' THEN
        jsonb_build_array(
          '✓ Full source code access',
          '✓ Free lifetime updates',
          '✓ No attribution required',
          '✓ Commercial use allowed',
          '✓ Responsive design',
          '✓ Basic documentation',
          '✓ Community support'
        )
      ELSE
        jsonb_build_array(
          '✓ Complete source code',
          '✓ Documentation included',
          '✓ Responsive design',
          '✓ Email support (30 days)',
          '✓ Single project license',
          '✓ Regular updates',
          '✓ 6 months of updates'
        )
      END
    ),
    'professional', jsonb_build_object(
      'price', CASE WHEN category = 'FREE' THEN NULL ELSE ROUND((price * 1.5)::numeric, 2) END,
      'features', CASE WHEN category = 'FREE' THEN NULL ELSE
        jsonb_build_array(
          '✓ Everything in Starter',
          '✓ Extended documentation',
          '✓ Priority email support (90 days)',
          '✓ Up to 5 projects',
          '✓ Custom components library',
          '✓ Advanced features unlocked',
          '✓ Lifetime updates included',
          '✓ Early access to new features'
        )
      END
    ),
    'agency', jsonb_build_object(
      'price', CASE WHEN category = 'FREE' THEN NULL ELSE ROUND((price * 2.5)::numeric, 2) END,
      'features', CASE WHEN category = 'FREE' THEN NULL ELSE
        jsonb_build_array(
          '✓ Everything in Professional',
          '✓ White-label license',
          '✓ Unlimited projects',
          '✓ Dedicated support (1 year)',
          '✓ Custom development included',
          '✓ Full source code rights',
          '✓ Priority feature requests',
          '✓ Resell rights included',
          '✓ Team training session'
        )
      END
    )
  ),
  resource_cards = jsonb_build_array(
    jsonb_build_object(
      'title', 'Documentation',
      'description', 'Complete setup guide, component documentation, and API reference',
      'link', COALESCE(github_url, demo_url, '#'),
      'icon', 'fa-book'
    ),
    jsonb_build_object(
      'title', 'Live Demo',
      'description', 'Experience the template in action with interactive preview',
      'link', COALESCE(demo_url, '#'),
      'icon', 'fa-external-link-alt'
    ),
    jsonb_build_object(
      'title', 'Source Code',
      'description', 'Access the complete, well-documented source code',
      'link', COALESCE(github_url, demo_url, '#'),
      'icon', 'fa-code'
    ),
    jsonb_build_object(
      'title', 'Support',
      'description', 'Get help from our dedicated support team',
      'link', 'https://nexicweb.netlify.app/#contact',
      'icon', 'fa-life-ring'
    )
  ),
  preview_image_url = thumbnail_url
WHERE 
  live_preview_url IS NULL
  AND title IS NOT NULL;

-- ============================================================
-- OPTION 2: CUSTOMIZE SPECIFIC HIGH-PROFILE WEBSITES
-- ============================================================
-- Run this to add specific customizations for featured websites
-- Adjust the WHERE clause to match specific website IDs or titles

-- Example: Customize a specific SaaS template
UPDATE websites
SET 
  category_tag = 'PREMIUM SAAS',
  subtitle = 'Complete SaaS application with authentication, billing, and admin dashboard',
  feature_tags = '["Authentication System", "Stripe Integration", "Admin Dashboard", "User Management", "API Ready", "Team Collaboration"]'::jsonb,
  rating = 5.0,
  feature_pills = '["React", "Next.js", "TypeScript", "Stripe", "Supabase", "Tailwind CSS", "Prisma", "shadcn/ui"]'::jsonb
WHERE 
  title ILIKE '%saas%'
  AND category = 'SaaS'
  LIMIT 1;

-- Example: Customize a specific Blog template
UPDATE websites
SET 
  category_tag = 'BLOG PLATFORM',
  subtitle = 'Modern blog template with CMS, SEO optimization, and social features',
  feature_tags = '["MDX Support", "SEO Optimized", "Dark Mode", "RSS Feed", "Syntax Highlighting", "Reading Time"]'::jsonb,
  rating = 4.9,
  feature_pills = '["Next.js", "MDX", "Tailwind CSS", "Contentful", "SEO Ready", "Analytics"]'::jsonb
WHERE 
  title ILIKE '%blog%'
  AND category = 'Blog'
  LIMIT 1;

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Check all websites have detail data
SELECT 
  id,
  title,
  category,
  category_tag,
  rating,
  license,
  jsonb_array_length(feature_tags) as feature_count,
  jsonb_array_length(feature_pills) as pill_count,
  packages->'starter'->>'price' as starter_price,
  CASE 
    WHEN packages->'professional' IS NOT NULL THEN packages->'professional'->>'price'
    ELSE 'N/A'
  END as pro_price,
  CASE 
    WHEN packages->'agency' IS NOT NULL THEN packages->'agency'->>'price'
    ELSE 'N/A'
  END as agency_price
FROM websites 
WHERE live_preview_url IS NOT NULL
ORDER BY display_order ASC, created_at DESC;

-- Check FREE category websites specifically
SELECT 
  id,
  title,
  category_tag,
  license,
  packages->'starter'->>'price' as price,
  jsonb_array_length(packages->'starter'->'features') as feature_count
FROM websites 
WHERE category = 'FREE'
ORDER BY display_order ASC;

-- Count websites by category with detail data
SELECT 
  category,
  COUNT(*) as total,
  COUNT(CASE WHEN live_preview_url IS NOT NULL THEN 1 END) as with_details,
  AVG(rating) as avg_rating
FROM websites 
GROUP BY category
ORDER BY total DESC;

-- ============================================================
-- NOTES
-- ============================================================
-- 1. This SQL populates ALL websites with detail page data
-- 2. FREE websites get special pricing (0 for starter, NULL for pro/agency)
-- 3. All websites get category-appropriate feature tags and descriptions
-- 4. Packages are auto-calculated (1.5x and 2.5x for pro/agency)
-- 5. You can customize any website later from admin dashboard
-- 6. Run verification queries to check results
-- ============================================================
