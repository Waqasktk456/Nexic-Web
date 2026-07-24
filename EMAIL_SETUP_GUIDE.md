# Fix Email Timeout Issue on Render

## The Problem
Your signup emails are timing out with error:
```
Email error: Error: Connection timeout
code: 'ETIMEDOUT'
```

This means Render can't connect to Gmail to send verification emails.

## Solution: Set Up Gmail App Password

### Step 1: Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/security
2. Scroll to "2-Step Verification"
3. Turn it ON (this is required for app passwords)

### Step 2: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Click "Select app" → Choose "Mail"
3. Click "Select device" → Choose "Other" → Type "Render Backend"
4. Click "Generate"
5. You'll see a 16-character password like: `abcd efgh ijkl mnop`
6. **Copy this password** (remove spaces): `abcdefghijklmnop`

### Step 3: Update Render Environment Variables
1. Go to https://dashboard.render.com
2. Click on your backend service
3. Go to **"Environment"** tab
4. Update these variables:

```
EMAIL_USER=your_actual_gmail@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

(Use the 16-character app password, NOT your regular Gmail password!)

### Step 4: Redeploy
1. Click "Manual Deploy" → "Deploy latest commit"
2. Wait for deployment to complete
3. Try signup again - emails should work now!

## Alternative: Use a Different Email Provider

If Gmail still doesn't work, you can use **SendGrid** (free for 100 emails/day):

### SendGrid Setup:
1. Sign up at https://sendgrid.com
2. Create API Key
3. Update `backend/routes/auth.js`:

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

4. On Render, set: `SENDGRID_API_KEY=your_api_key`

## Test After Setup

After updating environment variables and redeploying, test signup:
1. Use a NEW email address
2. Check Render logs for: `✓ OTP email sent successfully`
3. Check your email inbox for the verification code

If you see "✓ OTP email sent successfully" in logs but no email arrives, check spam folder!

## Current Status

✅ Code updated with better error handling and timeouts
✅ Pushed to GitHub
⏳ Waiting for: Gmail App Password setup on Render
⏳ Waiting for: Redeploy on Render

After you complete Steps 1-4 above, signup will work perfectly!
