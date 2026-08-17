-- SQL INSERT Queries for Newly Added Websites (w42-w49)
-- Run these in Supabase SQL Editor
-- After running, upload images in Admin Dashboard

-- w42: VOLTERRA LIVING GRID
INSERT INTO websites (title, description, category, demo_url, details_page, featured, thumbnail_url)
VALUES (
  'VOLTERRA LIVING GRID',
  'Volter
  ra Living Grid delivers thoughtfully designed spaces that integrate sustainability, technology, and modern architecture. Our mission is to create environments where innovation meets comfort, helping communities grow and thrive for generations.',
  'FREE',
  'https://volterra-living-grid.netlify.app',
  'w42detail.html',q
  false,
  'https://via.placeholder.com/400x300'  -- Upload image/new/volterra.png in admin dashboard
);

-- w43: SRATUM TEXTILE ENGINEERING PORTFOLIO
INSERT INTO websites (title, description, category, demo_url, details_page, featured, thumbnail_url)
VALUES (
  'SRATUM TEXTILE ENGINEERING PORFOLIO',
  'Passionate about advancing textile manufacturing through innovative engineering, process improvement, and quality-driven solutions. Dedicated to supporting modern production systems that prioritize efficiency, sustainability, and continuous innovation.',
  'FREE',
  'https://stratum-01-textile-engineer-portfolio.netlify.app',
  'w43detail.html',
  false,
  'https://via.placeholder.com/400x300'  -- Upload image/new/stratum.png in admin dashboard
);

-- w44: NULL STATE CODE
INSERT INTO websites (title, description, category, demo_url, details_page, featured, thumbnail_url)
VALUES (
  'NULL STATE CODE',
  'Creating high-performance web applications, scalable software architectures, and user-focused digital experiences with clean code, modern technologies, and innovative problem-solving. Focused on building reliable solutions that help businesses grow, adapt, and succeed in an ever-evolving digital landscape.',
  'FREE',
  'https://null-state-code.netlify.app',
  'w44detail.html',
  false,
  'https://via.placeholder.com/400x300'  -- Upload image/new/nullcode.png in admin dashboard
);

-- w45: NEXUS VOID
INSERT INTO websites (title, description, category, demo_url, details_page, featured, thumbnail_url)
VALUES (
  'NEXUS VOID ',
  'Delivering enterprise-grade technology solutions that combine modern software architecture, cloud infrastructure, intelligent automation, and cybersecurity to help businesses transform operations, unlock innovation, and achieve measurable results.',
  'FREE',
  'https://nexus-void-nex.netlify.app',
  'w45detail.html',
  false,
  'https://via.placeholder.com/400x300'  -- Upload image/new/nexusvoid.png in admin dashboard
);

-- w46: X-ATELIER NOIR
INSERT INTO websites (title, description, category, demo_url, details_page, featured, thumbnail_url)
VALUES (
  'X-ATELIER NOIR',
  'From luxury branding and sophisticated web experiences to creative strategy and digital innovation, XAtelier Noir delivers refined solutions designed to elevate businesses and leave a lasting impression across every customer touchpoint.',
  'FREE',
  'https://xatelier-noir.netlify.app',
  'w46detail.html',
  false,
  'https://via.placeholder.com/400x300'  -- Upload image/new/ATEILERNOIR.png in admin dashboard
);

-- w47: AUREVANT LIVING CANVAS
INSERT INTO websites (title, description, category, demo_url, details_page, featured, thumbnail_url)
VALUES (
  'AUREVANT LIVING CANVAS',
  'Aurevant Living Canvas creates refined living environments that combine elegant design, modern functionality, and sustainable thinking. Every space is thoughtfully crafted to inspire comfort, enrich everyday experiences, and deliver timeless value for modern lifestyles.',
  'FREE',
  'https://aurevant-living-canvas.netlify.app/',
  'w47detail.html',
  false,
  'https://via.placeholder.com/400x300'  -- Upload image/new/aurevent.png in admin dashboard
);

-- w48: Verdant Living Garden
INSERT INTO websites (title, description, category, demo_url, details_page, featured, thumbnail_url)
VALUES (
  '🌿 Verdant Living Garden',
  'Creating Green Spaces That Inspire. 🍃 Beautiful landscapes, smart garden solutions, and eco-friendly designs for every outdoor space.',
  'FREE',
  'https://verdant-living-garden.netlify.app',
  'w48detail.html',
  false,
  'https://via.placeholder.com/400x300'  -- Upload image/new/verdent.png in admin dashboard
);

-- w49: VANTA SAVEPOINT
INSERT INTO websites (title, description, category, demo_url, details_page, featured, thumbnail_url)
VALUES (
  'VANTA SAVEPOINT',
  'Vanta: Last Savepoint is dedicated to crafting immersive gaming experiences that blend creative storytelling, innovative technology, and unforgettable gameplay. Whether developing original titles, interactive entertainment, or digital gaming platforms, we focus on creating worlds that inspire exploration, build communities, and leave players eager for what comes next.',
  'FREE',
  'https://vanta-01-last-savepoint.netlify.app',
  'w49detail.html',
  false,
  'https://via.placeholder.com/400x300'  -- Upload image/new/vanta.png in admin dashboard
);

-- ============================================================
-- STEPS TO COMPLETE SETUP:
-- ============================================================
-- 1. Go to Supabase Dashboard → SQL Editor
-- 2. Copy and paste ALL queries above
-- 3. Click "Run" to insert all 8 websites at once
-- 4. Go to Admin Dashboard (admin-dashboard.html)
-- 5. For each website, click "Edit" and upload the correct image:
--    - w42: Upload image/new/volterra.png
--    - w43: Upload image/new/stratum.png
--    - w44: Upload image/new/nullcode.png
--    - w45: Upload image/new/nexusvoid.png
--    - w46: Upload image/new/ATEILERNOIR.png
--    - w47: Upload image/new/aurevent.png
--    - w48: Upload image/new/verdent.png
--    - w49: Upload image/new/vanta.png
-- 6. Done! Websites will appear on homepage automatically
