# Cipher — SaaS Authentication System

A production-ready authentication template: a Node.js/Express/MongoDB backend
with bcrypt password hashing and JWT sessions, paired with a premium,
fully-animated single-file frontend already wired up to it.

```
auth-system/
├── frontend/
│   └── index.html          ← Premium UI, fully connected to the API
│
└── backend/
    ├── server.js            ← Express app entry point
    ├── config/
    │   └── db.js             ← MongoDB connection
    ├── models/
    │   └── User.js           ← User schema + password hashing
    ├── routes/
    │   └── auth.js           ← /register, /login, /me
    ├── middleware/
    │   └── authMiddleware.js ← JWT verification (protect)
    ├── .env.example
    ├── .gitignore
    └── package.json
```

---

## 1. Prerequisites

- **Node.js 18+** (LTS recommended) — [nodejs.org](https://nodejs.org)
- **MongoDB** — either:
  - A local MongoDB instance, **or**
  - A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (recommended for quick setup)

---

## 2. Backend setup

```bash
cd backend
npm install
```

### 2.1 Configure environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

Open `.env` and set:

| Variable         | Description                                                              |
|------------------|---------------------------------------------------------------------------|
| `PORT`           | Port the API runs on (default `5000`)                                    |
| `MONGO_URI`      | Your MongoDB connection string (see section 3)                           |
| `JWT_SECRET`     | A long, random secret used to sign tokens — **never share this**         |
| `JWT_EXPIRES_IN` | Token lifetime (default `1d` = 24 hours, per spec)                       |
| `CLIENT_URL`     | The origin of your frontend, for CORS (e.g. `http://localhost:5500`)     |

Generate a strong `JWT_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2.2 Run the server

```bash
# development (auto-restarts on file changes)
npm run dev

# production
npm start
```

You should see:

```
✅ MongoDB connected: <host>/<db-name>
🚀 Server running on http://localhost:5000
```

### 2.3 Health check

```bash
curl http://localhost:5000/api/health
```

---

## 3. MongoDB connection instructions

### Option A — MongoDB Atlas (no local install required)

1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a free **M0 Shared Cluster**.
3. Under **Database Access**, create a database user with a username/password.
4. Under **Network Access**, add your current IP (or `0.0.0.0/0` for quick testing — restrict this in production).
5. Click **Connect → Drivers**, copy the connection string. It looks like:

   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/cipher_auth?retryWrites=true&w=majority
   ```

6. Paste it into `MONGO_URI` in your `.env`, replacing `<username>` and `<password>` with your real credentials.

### Option B — Local MongoDB

1. Install MongoDB Community Edition for your OS.
2. Start the service (`mongod`).
3. Use:

   ```
   MONGO_URI=mongodb://127.0.0.1:27017/cipher_auth
   ```

The `cipher_auth` database and `users` collection are created automatically the first time a user registers — no manual setup needed.

---

## 4. Frontend setup

`frontend/index.html` is a self-contained file — no build step, no dependencies.

### 4.1 Point it at your backend

Near the top of the `<script>` tag in `index.html`:

```js
const API_BASE_URL = 'http://localhost:5000/api/auth';
```

Change this to your deployed backend URL when you go live (e.g.
`https://api.yourdomain.com/api/auth`).

### 4.2 Run it

Any static file server works. For example:

```bash
cd frontend
npx serve .
# or
python3 -m http.server 5500
```

Then open the printed URL (e.g. `http://localhost:5500`).

> ⚠️ If you serve the frontend from a different origin/port than the
> `CLIENT_URL` in your backend `.env`, update `CLIENT_URL` to match — CORS
> will block the requests otherwise. You can also set `CLIENT_URL=*` for
> local testing.

---

## 5. How the auth flow works

### Register — `POST /api/auth/register`
```json
// Request body
{ "name": "Jane Doe", "email": "jane@company.com", "password": "supersecret123" }

// 201 response
{
  "success": true,
  "message": "Account created successfully",
  "token": "<jwt>",
  "user": { "id": "...", "name": "Jane Doe", "email": "jane@company.com", "createdAt": "..." }
}
```

### Login — `POST /api/auth/login`
```json
// Request body
{ "email": "jane@company.com", "password": "supersecret123" }

// 200 response — same shape as register
```

If the email doesn't exist or the password is wrong, the API returns `401`
with a `field` of `"email"` or `"password"` so the frontend can highlight the
correct input and trigger the shake animation.

### Protected route — `GET /api/auth/me`
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <jwt>"
```

Returns the current user's profile. The frontend uses this on page load to
check whether a stored token is still valid, and on the dashboard's
**"Verify session"** button.

### Logout

Logout is purely client-side — it removes the token from `localStorage`.
JWTs are stateless, so there's nothing to invalidate server-side unless you
add a token blacklist/refresh-token system later.

---

## 6. Building on top of this template

- **Add new protected routes:** import `{ protect }` from
  `middleware/authMiddleware.js` and add it as middleware — `req.user` will
  contain the authenticated user document.
- **Add fields to the user model:** extend `models/User.js`. Remember the
  `toJSON` transform already strips `password` from every response.
- **Forgot password / email verification:** the frontend already has a
  "Forgot password?" link wired to a placeholder — connect it to a new
  `/api/auth/forgot-password` route + email provider when ready.
- **Rebrand:** every color, font, and spacing value in `index.html` is a CSS
  variable in `:root` at the top of the `<style>` block — change the palette
  there to restyle the entire UI without touching layout code.

---

## 7. Production checklist

- [ ] Set a strong, unique `JWT_SECRET` (64+ random bytes).
- [ ] Set `NODE_ENV=production`.
- [ ] Use HTTPS for both frontend and backend.
- [ ] Restrict `CLIENT_URL` to your real frontend domain (avoid `*` in prod).
- [ ] Restrict MongoDB Atlas network access to known IPs.
- [ ] Never commit `.env` (already covered by `.gitignore`).
- [ ] Consider adding refresh tokens if you need session revocation.
