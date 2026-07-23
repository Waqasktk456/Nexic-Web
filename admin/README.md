# NexicWeb Admin Dashboard

Modern admin dashboard for managing NexicWeb website templates.

## Features

- ✅ Dashboard with statistics
- ✅ Complete CRUD operations for websites
- ✅ Image upload (thumbnail + gallery)
- ✅ Search and filter functionality
- ✅ Responsive design
- ✅ Matches NexicWeb branding exactly

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Lucide Icons

## Setup Instructions

### 1. Install Dependencies

```bash
cd admin
npm install
```

### 2. Configure Environment

Create a `.env` file in the admin directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server

```bash
npm run dev
```

The admin dashboard will open at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
admin/
├── src/
│   ├── components/
│   │   └── Layout.jsx         # Main layout with sidebar
│   ├── pages/
│   │   ├── Dashboard.jsx      # Dashboard with stats
│   │   ├── WebsitesList.jsx   # List all websites
│   │   └── WebsiteForm.jsx    # Add/Edit website
│   ├── config.js              # API configuration
│   ├── App.jsx                # App router
│   └── main.jsx               # Entry point
├── index.html
├── package.json
├── tailwind.config.js         # NexicWeb design tokens
└── vite.config.js
```

## API Endpoints Used

- `GET /api/websites` - Get all websites
- `GET /api/websites/:id` - Get single website
- `POST /api/websites` - Create website
- `PUT /api/websites/:id` - Update website
- `DELETE /api/websites/:id` - Delete website
- `DELETE /api/websites/:websiteId/images/:imageId` - Delete gallery image

## Design System

The admin dashboard uses the exact same design system as NexicWeb:

- **Colors**: Same palette (bg, accent, text colors)
- **Typography**: DM Sans + Syne fonts
- **Border Radius**: 18px (nexic), 10px (nexic-sm)
- **Shadows**: Custom NexicWeb shadows
- **Components**: Matching button, input, card styles

## Notes

- Maximum file size: 5MB per image
- Maximum gallery images: 10 per website
- Supported formats: JPEG, PNG, GIF, WebP
