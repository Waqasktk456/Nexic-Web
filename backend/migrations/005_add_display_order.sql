-- Migration: Add display_order column to control website display sequence
-- This allows you to control which website appears in which position on homepage

-- Add display_order column
ALTER TABLE websites 
ADD COLUMN display_order INTEGER DEFAULT 999;

-- Add comment
COMMENT ON COLUMN websites.display_order IS 'Controls display order on homepage. Lower number = appears first. Default 999 = end of list';

-- Create index for faster sorting
CREATE INDEX idx_websites_display_order ON websites(display_order);

-- Update existing websites with display order based on current app.js order
-- Page 1 (Positions 1-9)
UPDATE websites SET display_order = 1 WHERE title = 'AETHER.';                    -- w18
UPDATE websites SET display_order = 2 WHERE title = 'ADVANCE VERSION NEXIC.';      -- w28
UPDATE websites SET display_order = 3 WHERE title = 'TITTAN-X.';                   -- w30
UPDATE websites SET display_order = 4 WHERE title = 'nexos.';                      -- w31
UPDATE websites SET display_order = 5 WHERE title = 'RAVEN';                       -- w32
UPDATE websites SET display_order = 6 WHERE title = 'GRAPHIC DESIGNER';            -- w12
UPDATE websites SET display_order = 7 WHERE title = 'VECTRAL';                     -- w34
UPDATE websites SET display_order = 8 WHERE title = 'CELLO';                       -- w3
UPDATE websites SET display_order = 9 WHERE title = 'Architectural Nature';        -- w4

-- Page 2 (Positions 10-18)
UPDATE websites SET display_order = 10 WHERE title = 'SKYFORGE';                   -- w5
UPDATE websites SET display_order = 11 WHERE title = 'CYBERELITE';                 -- w6
UPDATE websites SET display_order = 12 WHERE title = 'MAX CAR';                    -- w7
UPDATE websites SET display_order = 13 WHERE title = 'MONOLITH';                   -- w35
UPDATE websites SET display_order = 14 WHERE title = 'ATILER NOVA';                -- w40
UPDATE websites SET display_order = 15 WHERE title = 'Lumière';                    -- w8
UPDATE websites SET display_order = 16 WHERE title = 'Visual Architecture';        -- w9
UPDATE websites SET display_order = 17 WHERE title = 'Educational site';           -- w10
UPDATE websites SET display_order = 18 WHERE title = 'NEX US SAAS';                -- w11

-- Page 3 (Positions 19-27)
UPDATE websites SET display_order = 19 WHERE title = 'ASTRA.';                     -- w27
UPDATE websites SET display_order = 20 WHERE title = 'Aurix OS';                   -- w38
UPDATE websites SET display_order = 21 WHERE title = 'DESIGNER';                   -- w13
UPDATE websites SET display_order = 22 WHERE title = 'meridian';                   -- w36
UPDATE websites SET display_order = 23 WHERE title = 'FASHION DESIGNER';           -- w14
UPDATE websites SET display_order = 24 WHERE title = 'PORTFOLIO';                  -- w15
UPDATE websites SET display_order = 25 WHERE title = 'K. VANCE.';                  -- w16
UPDATE websites SET display_order = 26 WHERE title = 'Agency';                     -- w17
UPDATE websites SET display_order = 27 WHERE title = 'NIKE STORE';                 -- w22

-- Page 4 (Positions 28-36)
UPDATE websites SET display_order = 28 WHERE title = 'farera.';                    -- w19
UPDATE websites SET display_order = 29 WHERE title = 'Aura SAAS';                  -- w20
UPDATE websites SET display_order = 30 WHERE title = 'cyberneti. SAAS';            -- w21
UPDATE websites SET display_order = 31 WHERE title = 'sass';                       -- w23
UPDATE websites SET display_order = 32 WHERE title = 'NEXIC.SAAS';                 -- w24
UPDATE websites SET display_order = 33 WHERE title = 'FRAME MOTION';               -- w39
UPDATE websites SET display_order = 34 WHERE title = 'NEXUS 2.0';                  -- w25
UPDATE websites SET display_order = 35 WHERE title = 'DANCING NEXORA';             -- w37
UPDATE websites SET display_order = 36 WHERE title = 'DIGITAL SAAS';               -- w26

-- Page 5 (Positions 37-45)
UPDATE websites SET display_order = 37 WHERE title = 'Kael Ashford';               -- w33
UPDATE websites SET display_order = 38 WHERE title = 'OBSIDIAN ORBIT';             -- w41
UPDATE websites SET display_order = 39 WHERE title = 'VOLTERRA LIVING GRID';       -- w42
UPDATE websites SET display_order = 40 WHERE title = 'SRATUM TEXTILE ENGINEERING PORFOLIO'; -- w43
UPDATE websites SET display_order = 41 WHERE title = 'NULL STATE CODE';            -- w44
UPDATE websites SET display_order = 42 WHERE title = 'NEXUS VOID';                 -- w45
UPDATE websites SET display_order = 43 WHERE title = 'Ride Light';                 -- w2
UPDATE websites SET display_order = 44 WHERE title = 'X-ATELIER NOIR';             -- w46
UPDATE websites SET display_order = 45 WHERE title = 'AUREVANT LIVING CANVAS';     -- w47

-- Page 6 (Positions 46+)
UPDATE websites SET display_order = 46 WHERE title = '🌿 Verdant Living Garden';   -- w48
UPDATE websites SET display_order = 47 WHERE title = 'VANTA SAVEPOINT';            -- w49

-- Verify the changes
SELECT id, title, display_order, category 
FROM websites 
ORDER BY display_order ASC
LIMIT 20;
