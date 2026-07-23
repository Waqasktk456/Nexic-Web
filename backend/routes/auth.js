const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP Email
const sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: `"NexicWeb" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - NexicWeb',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7c5cfc;">Welcome to NexicWeb!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for signing up! Please verify your email address using the code below:</p>
        <div style="background: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #7c5cfc; letter-spacing: 5px; margin: 0;">${otp}</h1>
        </div>
        <p>This code will expire in <strong>10 minutes</strong>.</p>
        <p>If you didn't create an account, please ignore this email.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">© 2026 NexicWeb. All rights reserved.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// ===================== SIGNUP =====================
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request received:', { body: req.body });
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      console.log('Missing fields:', { name: !!name, email: !!email, password: !!password });
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 6) {
      console.log('Password too short:', password.length);
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const emailLower = email.toLowerCase();
    console.log('Processing signup for:', emailLower);

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Check if user already exists
    console.log('Checking for existing user...');
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('email, is_verified')
      .eq('email', emailLower)
      .maybeSingle(); // Use maybeSingle instead of single

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return res.status(500).json({ message: 'Database error. Please try again.' });
    }

    console.log('Existing user check result:', existingUser);

    // If user exists and is verified, reject signup
    if (existingUser && existingUser.is_verified) {
      return res.status(400).json({ message: 'Email already registered. Please login.' });
    }

    // If user exists but not verified, update with new OTP
    if (existingUser && !existingUser.is_verified) {
      const { error: updateError } = await supabase
        .from('users')
        .update({
          name,
          password,
          verification_code: otp,
          code_expires_at: expiresAt.toISOString()
        })
        .eq('email', emailLower);

      if (updateError) {
        console.error('Update error:', updateError);
        return res.status(500).json({ message: 'Failed to update account. Please try again.' });
      }

      // Send OTP email
      try {
        await sendOTPEmail(emailLower, otp, name);
      } catch (emailError) {
        console.error('Email error:', emailError);
        return res.status(500).json({ message: 'Failed to send verification email. Please try again.' });
      }

      return res.status(201).json({
        message: 'Verification code sent to your email',
        email: emailLower
      });
    }

    // User doesn't exist, create new user
    const { error: insertError } = await supabase
      .from('users')
      .insert([{
        name,
        email: emailLower,
        password,
        verification_code: otp,
        code_expires_at: expiresAt.toISOString(),
        is_verified: false
      }]);

    if (insertError) {
      console.error('Insert error:', insertError);
      
      // Handle duplicate email error (race condition)
      if (insertError.code === '23505') {
        return res.status(400).json({ message: 'Email already registered. Please login or try again.' });
      }
      
      return res.status(500).json({ message: 'Failed to create account. Please try again.' });
    }

    // Send OTP email
    try {
      await sendOTPEmail(emailLower, otp, name);
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Delete the user since email failed
      await supabase.from('users').delete().eq('email', emailLower);
      return res.status(500).json({ message: 'Failed to send verification email. Please try again.' });
    }

    res.status(201).json({
      message: 'Verification code sent to your email',
      email: emailLower
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Unable to create account. Please try again later.' });
  }
});

// ===================== VERIFY OTP =====================
router.post('/verify', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email and code are required' });
    }

    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'Account not found. Please sign up first.' });
    }

    if (user.is_verified) {
      return res.status(400).json({ message: 'Email already verified. Please login.' });
    }

    // Check if code expired
    const now = new Date();
    const expiresAt = new Date(user.code_expires_at);

    if (now > expiresAt) {
      return res.status(400).json({ message: 'Verification code expired. Please click "Resend" to get a new code.' });
    }

    // Verify code
    if (user.verification_code !== code) {
      return res.status(400).json({ message: 'Invalid verification code. Please check and try again.' });
    }

    // Update user as verified
    const { error: updateError } = await supabase
      .from('users')
      .update({
        is_verified: true,
        verification_code: null,
        code_expires_at: null
      })
      .eq('email', email.toLowerCase());

    if (updateError) {
      console.error('Update error:', updateError);
      return res.status(500).json({ message: 'Verification failed. Please try again.' });
    }

    res.json({
      message: 'Email verified successfully! You can now login.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Unable to verify email. Please try again later.' });
  }
});

// ===================== RESEND OTP =====================
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'Account not found. Please sign up first.' });
    }

    if (user.is_verified) {
      return res.status(400).json({ message: 'Email already verified. Please login.' });
    }

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Update user with new OTP
    const { error: updateError } = await supabase
      .from('users')
      .update({
        verification_code: otp,
        code_expires_at: expiresAt.toISOString()
      })
      .eq('email', email.toLowerCase());

    if (updateError) {
      console.error('Update error:', updateError);
      return res.status(500).json({ message: 'Failed to generate new code. Please try again.' });
    }

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, user.name);
    } catch (emailError) {
      console.error('Email error:', emailError);
      return res.status(500).json({ message: 'Failed to send email. Please check your email address.' });
    }

    res.json({ message: 'New verification code sent to your email' });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: 'Unable to resend code. Please try again later.' });
  }
});

// ===================== LOGIN =====================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if verified
    if (!user.is_verified) {
      return res.status(403).json({ message: 'Please verify your email first. Check your inbox for verification code.' });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Unable to login. Please try again later.' });
  }
});

module.exports = router;
