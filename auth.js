import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

const router = express.Router();

// ---------------- CONFIG ----------------
const JWT_SECRET = process.env.JWT_SECRET || "webvault_secret_change_this";
const JWT_EXPIRES = "7d";

// ---------------- TOKEN ----------------
const signToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

// ---------------- OTP ----------------
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ---------------- MAILER ----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ---------------- SIGNUP ----------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    await User.create({
      name,
      email,
      password,
      verificationCode: otp,
      verificationExpires: otpExpires,
      verified: false,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Verification Code",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    });

    res.status(201).json({
      message: "Verification code sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------- VERIFY EMAIL (OTP) ----------------
router.post("/verify", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .json({ message: "Email and code are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.verified) {
      return res
        .status(400)
        .json({ message: "Email already verified." });
    }

    if (user.verificationExpires < Date.now()) {
      return res.status(400).json({
        message: "Verification code expired. Please resend OTP.",
      });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({
        message: "Invalid verification code.",
      });
    }

    user.verified = true;
    user.verificationCode = null;
    user.verificationExpires = null;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ message: "Invalid email or password." });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "Please verify your email first.",
      });
    }

    const token = signToken(user._id);

    res.json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// ---------------- ME ----------------
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
});

export default router;