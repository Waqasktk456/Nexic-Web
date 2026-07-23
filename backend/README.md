# NexicWeb Backend API

Backend API for NexicWeb website marketplace with authentication and website management.

## Features

- ✅ User authentication with email verification
- ✅ Website CRUD operations
- ✅ Image upload to Supabase Storage
- ✅ Gallery images management
- ✅ Advanced filtering and search
- ✅ Clean MVC architecture

## Tech Stack

- Node.js
- Express.js
- Supabase (PostgreSQL + Storage)
- Multer (file uploads)
- Nodemailer (email)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file in the backend directory:

```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key

# Email Configuration
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Setup Supabase

#### A. Create Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Create a new bucket named `nexicweb-images`
3. Make it **public**
4. Set policies:
   - Allow public read access
   - Allow authenticated insert/update/delete

#### B. Run Database Migration

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the content from `migrations/001_create_websites_tables.sql`
3. Click "Run"

This will create:
- `websites` table
- `website_images` table
- Indexes for performance
- Triggers for auto-updating timestamps
- Sample data (optional)

### 4. Run Development Server

```bash
npm run dev
```

The API will run at `http://localhost:5000`

### 5. Test the API

Visit `http://localhost:5000` - you should see:

```json
{
  "message": "NexicWeb API is running",
  "status": "connected"
}
```

## Project Structure

```
backend/
├── controllers/
│   └── websitesController.js  # Request handlers
├── services/
│   └── websitesService.js     # Business logic
├── routes/
│   ├── auth.js                # Auth routes
│   └── websites.js            # Website routes
├── middleware/
│   └── upload.js              # Multer configuration
├── migrations/
│   └── 001_create_websites_tables.sql
├── server.js                  # Entry point
└── package.json
```

## API Endpoints

### Websites

```
GET    /api/websites              Get all websites
GET    /api/websites/:id          Get single website
POST   /api/websites              Create website
PUT    /api/websites/:id          Update website
DELETE /api/websites/:id          Delete website
DELETE /api/websites/:websiteId/images/:imageId  Delete gallery image
```

### Query Parameters

**GET /api/websites** supports:
- `search` - Search in title and description
- `category` - Filter by category
- `status` - Filter by status (draft/published)
- `featured` - Filter featured (true/false)

Example:
```
GET /api/websites?category=portfolio&status=published&featured=true
```

### Request Body (POST/PUT)

```javascript
{
  "title": "Modern Portfolio",
  "description": "A sleek portfolio template",
  "category": "portfolio",
  "price": 29.99,
  "demo_url": "https://demo.com",
  "github_url": "https://github.com/user/repo",
  "featured": true,
  "status": "published"
}
```

With files:
- `thumbnail` - Single file (required for POST)
- `gallery` - Multiple files (optional, max 10)

## Database Schema

### websites

| Column         | Type      | Description                    |
|----------------|-----------|--------------------------------|
| id             | UUID      | Primary key                    |
| title          | VARCHAR   | Website title                  |
| description    | TEXT      | Website description            |
| category       | VARCHAR   | Category (portfolio, etc.)     |
| price          | DECIMAL   | Price in USD                   |
| demo_url       | VARCHAR   | Demo URL (optional)            |
| github_url     | VARCHAR   | GitHub URL (optional)          |
| thumbnail_url  | VARCHAR   | Thumbnail image URL            |
| featured       | BOOLEAN   | Is featured                    |
| status         | VARCHAR   | draft or published             |
| created_at     | TIMESTAMP | Creation timestamp             |
| updated_at     | TIMESTAMP | Last update timestamp          |

### website_images

| Column         | Type      | Description                    |
|----------------|-----------|--------------------------------|
| id             | UUID      | Primary key                    |
| website_id     | UUID      | Foreign key to websites        |
| image_url      | VARCHAR   | Image URL                      |
| display_order  | INTEGER   | Display order                  |
| created_at     | TIMESTAMP | Creation timestamp             |

## Error Handling

All endpoints return consistent error responses:

```javascript
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (development only)"
}
```

## File Upload

- **Max file size**: 5MB per file
- **Allowed types**: JPEG, JPG, PNG, GIF, WebP
- **Storage**: Supabase Storage
- **Folders**:
  - `websites/thumbnails/` - Thumbnail images
  - `websites/gallery/` - Gallery images

## Notes

- Images are automatically deleted from storage when a website is deleted
- Cascade delete is enabled for website_images
- All timestamps use UTC timezone
- Gallery images are sorted by display_order
