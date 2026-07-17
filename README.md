<<<<<<< HEAD
# ⬡ WebVault — Premium Website Marketplace

A full-stack, production-ready website marketplace with glassmorphism UI, cart system, live search, auto-pagination, membership plans, and JWT auth.

---

## 🗂 Project Structure

```
webvault/
├── index.html          ← Main frontend page
├── style.css           ← All styles (glassmorphism, animations)
├── app.js              ← Frontend logic (data array, cart, search, pagination)
│
└── backend/
    ├── server.js       ← Express server entry point
    ├── .env.example    ← Copy to .env and fill in values
    ├── package.json
    ├── models/
    │   ├── User.js     ← MongoDB user schema + bcrypt
    │   └── Website.js  ← MongoDB website schema
    └── routes/
        ├── auth.js     ← POST /api/auth/signup, /login, GET /me
        └── websites.js ← GET/POST/PUT/DELETE /api/websites
```

---

## ⚡ Quick Start (Frontend Only)

Just open `index.html` in a browser — no server needed for the frontend. The website data lives in `app.js`.

---

## 👉 How to Add a New Website

Open `app.js` and add a new object to the `WEBSITES` array:

```js
{
  id: "w16",                              // unique ID
  title: "Your Website Name",
  image: "https://your-image-url.jpg",   // 👉 CHANGE IMAGE HERE
  description: "Short description here.",
  link: "https://yourwebsite.com",       // 👉 ADD WEBSITE LINK HERE
  category: "ecommerce",                 // ecommerce | saas | portfolio | blog | landing | agency
  price: "৳3,500"
}
```

That's it. The card auto-generates. Pagination updates automatically.

---

## 🛠 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in MONGO_URI and JWT_SECRET in .env
npm run dev
```

**Required environment variables (`.env`):**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/webvault
JWT_SECRET=your_secret_key_here
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register new user |
| POST | /api/auth/login | Login, returns JWT |
| GET | /api/auth/me | Get current user (requires Bearer token) |
| GET | /api/websites | List websites (search, filter, paginate) |
| GET | /api/websites/:id | Single website |
| POST | /api/websites | Add website (requires auth) |
| PUT | /api/websites/:id | Update website (requires auth) |
| DELETE | /api/websites/:id | Soft delete website (requires auth) |

### Query Parameters for GET /api/websites:
- `?page=1` — page number
- `?limit=9` — items per page
- `?category=ecommerce` — filter by category
- `?search=store` — full-text search

---

## 💳 Cart + Checkout

- Cart stored in `localStorage` — persists across sessions
- Checkout sends a WhatsApp message to `01783199814`
- Message format: `I want to buy: [Website Name → Link]`

To change the WhatsApp number, update in `app.js`:
```js
const WHATSAPP_NUMBER = "01783199814"; // 👉 CHANGE HERE
```

---

## 🔑 Auth Integration

The frontend auth modal is ready for backend connection. In `app.js`, find the form submit handlers and replace the mock `setTimeout` with a real `fetch` call:

```js
// Example login integration
const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const data = await res.json();
if (res.ok) {
  localStorage.setItem('webvault_token', data.token);
  showToast('Logged in!');
}
```

---

## 🎨 Tech Stack

- **Frontend:** HTML5, Advanced CSS3, Vanilla JS (ES6+)
- **Fonts:** Syne (display), DM Sans (body)
- **Icons:** Font Awesome 6
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcryptjs

---

## ✦ Made with precision in Bangladesh
=======
# Nexic-Web
>>>>>>> 8ef8ceef3906b875bf4a666854282ccdf6c1b715
