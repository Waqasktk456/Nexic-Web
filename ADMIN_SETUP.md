# NexicWeb Admin System - Complete Setup Guide

This guide will help you set up the complete admin system for NexicWeb, including the backend API and React admin dashboard.

## 📋 What's Included

### Backend API
- Complete REST API for website management
- Image upload to Supabase Storage
- Clean MVC architecture (Controllers → Services → Database)
- Gallery images management
- Search and filtering

### Admin Dashboard
- Modern React + Vite + Tailwind application
- Dashboard with statistics
- Complete CRUD operations
- Image upload interface
- Matches NexicWeb design exactly

## 🚀 Quick Start

### Step 1: Setup Supabase

1. **Create Storage Bucket**
   - Go to your Supabase Dashboard → Storage
   - Create a new bucket named: `nexicweb-images`
   - Make it **Public**
   - Click on the bucket → Policies → New Policy
   - Add these policies:
     ```
     SELECT: Enable read access for all users
     INSERT: Enable insert for authenticated users only
     UPDATE: Enable update for authenticated users only
     DELETE: Enable delete for authenticated users only
     ```

2. **Run Database Migration**
   - Go to Supabase Dashboard → SQL Editor
   - Open `backend/migrations/001_create_websites_tables.sql`
   - Copy all the SQL code
   - Paste it in the SQL Editor
   - Click **Run**
   - You should see: "Success. No rows returned"

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Make sure your .env file is configured (already exists)
# PORT=5000
# SUPABASE_URL=your_url
# SUPABASE_KEY=your_key
# EMAIL_USER=your_email
# EMAIL_PASS=your_password

# Run the backend server
npm run dev
```

The backend will start at `http://localhost:5000`

### Step 3: Setup Admin Dashboard

```bash
# Navigate to admin directory (from project root)
cd admin

# Install dependencies
npm install

# Create .env file
echo VITE_API_URL=http://localhost:5000/api > .env

# Run the development server
npm run dev
```

The admin dashboard will open at `http://localhost:3000`

## 🎨 Admin Dashboard Features

### Dashboard Page
- Total Websites count
- Featured Websites count
- Recent Uploads (last 7 days)
- List of 5 most recent websites

### Websites Page
- View all websites in a card grid
- Search by title or description
- Filter by category
- Filter by status (Draft/Published)
- View, Edit, and Delete actions
- Responsive design

### Add/Edit Website Page
- Title (required)
- Description (required)
- Category dropdown (required)
- Price (required)
- Demo URL (optional)
- GitHub URL (optional)
- Featured toggle
- Status (Draft/Published)
- Thumbnail upload (required)
- Gallery images upload (up to 10)
- Delete individual gallery images (edit mode)

## 📁 Project Structure

```
files/
├── backend/                    # Backend API
│   ├── controllers/           # Request handlers
│   ├── services/              # Business logic
│   ├── routes/                # Route definitions
│   ├── middleware/            # Middleware (upload, etc.)
│   ├── migrations/            # Database migrations
│   ├── server.js              # Entry point
│   └── package.json
│
├── admin/                      # Admin Dashboard
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── config.js          # API configuration
│   │   ├── App.jsx            # Main app
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── tailwind.config.js     # NexicWeb design system
│   └── package.json
│
├── index.html                  # Public homepage (unchanged)
├── style.css                   # Public styles (unchanged)
└── app.js                      # Public scripts (unchanged)
```

## 🔌 API Endpoints

```
GET    /api/websites                                 # Get all websites
GET    /api/websites/:id                             # Get single website
POST   /api/websites                                 # Create website
PUT    /api/websites/:id                             # Update website
DELETE /api/websites/:id                             # Delete website
DELETE /api/websites/:websiteId/images/:imageId     # Delete gallery image
```

### Query Parameters

```
GET /api/websites?search=portfolio&category=portfolio&status=published&featured=true
```

## 🎯 Testing the System

### 1. Test Backend Connection

Visit: `http://localhost:5000`

You should see:
```json
{
  "message": "NexicWeb API is running",
  "status": "connected"
}
```

### 2. Test Websites API

Visit: `http://localhost:5000/api/websites`

You should see an array of websites (empty or with sample data).

### 3. Test Admin Dashboard

1. Visit: `http://localhost:3000`
2. You'll see the Dashboard with stats
3. Click "Websites" in sidebar
4. Click "Add Website" button
5. Fill in the form and upload images
6. Click "Create Website"
7. You should see the new website in the list

## 🎨 Design System

The admin dashboard uses **exactly** the same design as NexicWeb:

### Colors
```javascript
bg: '#07070f'          // Background
bg2: '#0d0d1a'         // Secondary background
accent: '#7c5cfc'      // Primary accent (purple)
accent2: '#c084fc'     // Secondary accent
accent3: '#38bdf8'     // Tertiary accent (cyan)
gold: '#f5c842'        // Gold accent
text: '#f0f0f8'        // Primary text
text2: '#9494b8'       // Secondary text
text3: '#5a5a7a'       // Tertiary text
danger: '#f87171'      // Error/danger
success: '#34d399'     // Success
```

### Typography
- **Display**: Syne (headings)
- **Body**: DM Sans (content)

### Border Radius
- **nexic**: 18px (cards, large elements)
- **nexic-sm**: 10px (buttons, inputs)

### Shadows
- **nexic**: Custom purple glow
- **nexic-lg**: Larger purple glow
- **glow**: Accent glow effect

## 🔒 Important Notes

1. **DO NOT** modify the public homepage files:
   - `index.html`
   - `style.css`
   - `app.js`
   - `config.js`

2. **Image Upload**:
   - Max size: 5MB per image
   - Formats: JPEG, PNG, GIF, WebP
   - Max gallery images: 10

3. **Database**:
   - All timestamps use UTC
   - Images cascade delete
   - Automatic updated_at timestamps

4. **Security**:
   - In production, add authentication to admin routes
   - Use environment variables for secrets
   - Enable CORS only for admin domain

## 📦 Production Deployment

### Backend
```bash
cd backend
npm install --production
npm start
```

### Admin Dashboard
```bash
cd admin
npm run build
# Deploy the 'dist' folder to your hosting
```

## 🐛 Troubleshooting

### Backend won't start
- Check `.env` file has correct Supabase credentials
- Ensure port 5000 is not already in use
- Run `npm install` again

### Admin won't connect to backend
- Ensure backend is running on port 5000
- Check `.env` in admin folder has correct API URL
- Check browser console for CORS errors

### Images won't upload
- Verify Supabase Storage bucket exists
- Check bucket is public
- Verify bucket name is `nexicweb-images`
- Check storage policies are set correctly

### Database errors
- Ensure migration SQL was run successfully
- Check tables exist in Supabase Dashboard → Database
- Verify RLS is disabled for development

## 📚 Next Steps

After setup, you can:
1. ✅ Create websites through admin panel
2. ✅ Manage existing websites
3. ✅ Upload and manage images
4. ⬜ Add authentication to admin routes
5. ⬜ Connect public homepage to API (future phase)
6. ⬜ Add more features (categories, tags, etc.)

## 🤝 Support

If you encounter any issues:
1. Check this README carefully
2. Verify all environment variables
3. Check browser and server console logs
4. Ensure Supabase is properly configured

---

**Built with ❤️ for NexicWeb**
