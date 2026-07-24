# 🎯 Website Display Order Control

This guide explains how to control which website appears in which position on the homepage.

---

## 📊 How It Works

Websites now have a `display_order` column that controls their position:
- **Lower number = Appears first**
- **Higher number = Appears later**
- Default value: `999` (appears at end)

### Grid Layout
- **3 columns per row** (desktop)
- **9 websites per page**
- Pagination shows 9 websites at a time

---

## 🚀 Setup Steps

### Step 1: Run Migration
```sql
-- Go to Supabase Dashboard → SQL Editor
-- Run the migration file: 005_add_display_order.sql
```

This will:
1. Add `display_order` column to websites table
2. Set display order for all existing websites based on current app.js order
3. Create index for faster sorting

### Step 2: Deploy Backend Changes
The backend service is already updated to order by `display_order`.

Push your changes:
```bash
git add backend/services/websitesService.js backend/migrations/005_add_display_order.sql
git commit -m "Add display_order control for websites"
git push origin waqas
```

Render will auto-deploy and websites will appear in the new order!

---

## 📋 Current Display Order (After Migration)

### Page 1 (Positions 1-9)
| Position | Column | Website | ID |
|---|---|---|---|
| 1 | Col 1, Row 1 | AETHER. | w18 |
| 2 | Col 2, Row 1 | ADVANCE VERSION NEXIC. | w28 |
| 3 | Col 3, Row 1 | TITTAN-X. | w30 |
| 4 | Col 1, Row 2 | nexos. | w31 |
| 5 | Col 2, Row 2 | RAVEN | w32 |
| 6 | Col 3, Row 2 | GRAPHIC DESIGNER | w12 |
| 7 | Col 1, Row 3 | VECTRAL | w34 |
| 8 | Col 2, Row 3 | CELLO | w3 |
| 9 | Col 3, Row 3 | Architectural Nature | w4 |

### Page 2 (Positions 10-18)
| Position | Website | ID |
|---|---|---|
| 10 | SKYFORGE | w5 |
| 11 | CYBERELITE | w6 |
| 12 | MAX CAR | w7 |
| 13 | MONOLITH | w35 |
| 14 | ATILER NOVA | w40 |
| 15 | Lumière | w8 |
| 16 | Visual Architecture | w9 |
| 17 | Educational site | w10 |
| 18 | NEX US SAAS | w11 |

### Page 3 (Positions 19-27)
| Position | Website | ID |
|---|---|---|
| 19 | ASTRA. | w27 |
| 20 | Aurix OS | w38 |
| 21 | DESIGNER | w13 |
| 22 | meridian | w36 |
| 23 | FASHION DESIGNER | w14 |
| 24 | PORTFOLIO | w15 |
| 25 | K. VANCE. | w16 |
| 26 | Agency | w17 |
| 27 | NIKE STORE | w22 |

### Page 4 (Positions 28-36)
| Position | Website | ID |
|---|---|---|
| 28 | farera. | w19 |
| 29 | Aura SAAS | w20 |
| 30 | cyberneti. SAAS | w21 |
| 31 | sass | w23 |
| 32 | NEXIC.SAAS | w24 |
| 33 | FRAME MOTION | w39 |
| 34 | NEXUS 2.0 | w25 |
| 35 | DANCING NEXORA | w37 |
| 36 | DIGITAL SAAS | w26 |

### Page 5 (Positions 37-45)
| Position | Website | ID |
|---|---|---|
| 37 | Kael Ashford | w33 |
| 38 | OBSIDIAN ORBIT | w41 |
| 39 | VOLTERRA LIVING GRID | w42 |
| 40 | SRATUM TEXTILE ENGINEERING | w43 |
| 41 | NULL STATE CODE | w44 |
| 42 | NEXUS VOID | w45 |
| 43 | Ride Light | w2 |
| 44 | X-ATELIER NOIR | w46 |
| 45 | AUREVANT LIVING CANVAS | w47 |

### Page 6 (Positions 46-47)
| Position | Website | ID |
|---|---|---|
| 46 | 🌿 Verdant Living Garden | w48 |
| 47 | VANTA SAVEPOINT | w49 |

---

## 🔧 How to Change Display Order

### Option 1: In Supabase Dashboard (Easiest)
1. Go to Supabase Dashboard → Table Editor
2. Select `websites` table
3. Find the website you want to move
4. Edit the `display_order` value:
   - Want it first? Set to `1`
   - Want it on page 1, position 5? Set to `5`
   - Want it at the end? Set to `999`
5. Save changes
6. Refresh homepage - order updated automatically!

### Option 2: SQL Query
```sql
-- Move "VANTA SAVEPOINT" to position 1 (first on homepage)
UPDATE websites 
SET display_order = 1 
WHERE title = 'VANTA SAVEPOINT';

-- Move "AETHER." to position 10 (first on page 2)
UPDATE websites 
SET display_order = 10 
WHERE title = 'AETHER.';

-- Swap two websites (w18 and w28)
-- Save old value first, then swap
UPDATE websites SET display_order = 2 WHERE title = 'AETHER.';        -- w18 moves to position 2
UPDATE websites SET display_order = 1 WHERE title = 'ADVANCE VERSION NEXIC.';  -- w28 moves to position 1
```

### Option 3: Bulk Reorder
```sql
-- Reorder multiple websites at once
UPDATE websites SET display_order = 
  CASE title
    WHEN 'VANTA SAVEPOINT' THEN 1
    WHEN 'NULL STATE CODE' THEN 2
    WHEN 'NEXUS VOID' THEN 3
    WHEN 'AETHER.' THEN 4
    ELSE display_order  -- Keep others unchanged
  END;
```

---

## 💡 Tips & Best Practices

### 1. **Leave Gaps Between Numbers**
Instead of: 1, 2, 3, 4, 5...
Use: 10, 20, 30, 40, 50...

This makes it easier to insert websites later without renumbering everything.

### 2. **Group by Category**
You can use ranges for categories:
- Agency websites: 1-100
- Portfolio websites: 101-200
- Free templates: 201-300
- Landing pages: 301-400

### 3. **Featured Websites First**
Keep featured/premium websites at lower numbers (1-20) so they appear first.

### 4. **Test After Changes**
Always refresh the homepage after changing display_order to verify the new arrangement.

---

## 🎨 Visual Example

```
Page 1 Grid (9 websites):
┌─────────────┬─────────────┬─────────────┐
│ Position 1  │ Position 2  │ Position 3  │
│ (order=1)   │ (order=2)   │ (order=3)   │
├─────────────┼─────────────┼─────────────┤
│ Position 4  │ Position 5  │ Position 6  │
│ (order=4)   │ (order=5)   │ (order=6)   │
├─────────────┼─────────────┼─────────────┤
│ Position 7  │ Position 8  │ Position 9  │
│ (order=7)   │ (order=8)   │ (order=9)   │
└─────────────┴─────────────┴─────────────┘

Page 2 Grid (next 9 websites):
┌─────────────┬─────────────┬─────────────┐
│ Position 10 │ Position 11 │ Position 12 │
│ (order=10)  │ (order=11)  │ (order=12)  │
└─────────────┴─────────────┴─────────────┘
... and so on
```

---

## ❓ FAQ

**Q: What if two websites have the same display_order?**
A: They will be sorted by `created_at` (newer first). But it's best to use unique numbers.

**Q: Can I use negative numbers?**
A: Yes! Use negative numbers (-10, -5, -1) to force a website to appear before position 1.

**Q: Do I need to update app.js?**
A: No! Once the migration runs, display order is controlled entirely from the database. The app.js WEBSITES_BACKUP array is only used as fallback.

**Q: How do I reset to default order?**
A: Run this query:
```sql
UPDATE websites SET display_order = id;
```
This sets display_order equal to the website's ID, giving a natural order.

---

## 🎯 Quick Actions

### Move a website to first position:
```sql
UPDATE websites SET display_order = 0 WHERE title = 'YOUR_WEBSITE_TITLE';
```

### Move a website to last position:
```sql
UPDATE websites SET display_order = 9999 WHERE title = 'YOUR_WEBSITE_TITLE';
```

### See current order:
```sql
SELECT id, title, display_order, category 
FROM websites 
ORDER BY display_order ASC;
```
