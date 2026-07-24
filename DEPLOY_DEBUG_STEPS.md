# Debug 400 Bad Request on Signup

## Problem
Getting `400 Bad Request` when calling `/api/auth/signup` on production (Render)

## Changes Made
Added logging to `backend/routes/auth.js` to debug the issue:
- Log request body
- Log missing fields
- Log email validation
- Log database queries
- Log existing user checks

## Steps to Deploy and Debug

### 1. Push Changes to GitHub
```bash
cd backend
git add .
git commit -m "Add debug logging to signup route"
git push origin waqas
```

### 2. Deploy on Render
1. Go to https://dashboard.render.com
2. Click on your backend service (nexic-web)
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Wait for deployment to complete (watch the logs)

### 3. Check Render Logs
1. In Render dashboard, click **"Logs"** tab
2. Try signup from your frontend
3. Watch for console.log messages:
   - "Signup request received"
   - "Missing fields" (if validation fails)
   - "Invalid email format" (if email is bad)
   - "Processing signup for: [email]"
   - "Checking for existing user..."
   - Database errors

### 4. Common Issues and Solutions

#### Issue: Environment Variables Not Set
**Symptoms:** Logs show undefined values or connection errors

**Solution:** Check Render Environment Variables:
1. Go to service → **Environment** tab
2. Verify these are set:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `FRONTEND_URL` (your frontend domain)
   - `PORT=5000`

#### Issue: CORS Error
**Symptoms:** Browser shows "CORS policy" error

**Solution:** 
1. Set `FRONTEND_URL` environment variable on Render
2. Value should be your frontend domain WITHOUT trailing slash
   - Example: `https://nexic-web.netlify.app`
3. Redeploy after adding

#### Issue: Request Body Empty
**Symptoms:** Logs show "Signup request received: { body: {} }"

**Solution:** Express JSON middleware might not be working
- Check `server.js` has `app.use(express.json())`
- This is already in your code, so shouldn't be the issue

#### Issue: Database Connection Failed
**Symptoms:** Logs show Supabase errors

**Solution:**
1. Verify Supabase credentials are correct
2. Check Supabase project is active
3. Check `users` table exists with correct columns:
   - `id` (uuid, primary key)
   - `name` (text)
   - `email` (text, unique)
   - `password` (text)
   - `verification_code` (text)
   - `code_expires_at` (timestamp)
   - `is_verified` (boolean)
   - `role` (text, default 'user')
   - `created_at` (timestamp)

### 5. Test Endpoints

After deployment, test these URLs in browser or Postman:

#### Root Endpoint (should work)
```
GET https://nexic-web.onrender.com/
Response: {"message":"NexicWeb API is running","status":"connected"}
```

#### Websites Endpoint (should work)
```
GET https://nexic-web.onrender.com/api/websites
Response: {"success":true,"data":[...]}
```

#### Signup Endpoint (test with Postman)
```
POST https://nexic-web.onrender.com/api/auth/signup
Headers: Content-Type: application/json
Body:
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}

Expected Response (201):
{
  "message": "Verification code sent to your email",
  "email": "test@example.com"
}
```

### 6. Frontend Configuration

Make sure frontend is using correct URL:

**config.js:**
```javascript
const API_BASE_URL = 'https://nexic-web.onrender.com'; // NO /api here
```

**admin-dashboard.js:**
```javascript
const API_BASE_URL = 'https://nexic-web.onrender.com/api'; // HAS /api here
```

### 7. After Fixing

Once signup works:
1. Remove debug console.log statements
2. Commit: `git commit -m "Remove debug logging"`
3. Push and redeploy

## Quick Command Reference

```bash
# In backend folder
git add .
git commit -m "Your message"
git push origin waqas

# Check git status
git status

# View recent commits
git log --oneline -5

# Switch branches
git checkout main
git checkout waqas
```
