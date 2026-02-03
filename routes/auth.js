import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const router = express.Router();

// ---------- Email ----------
const sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({ from: `"Play Nation" <${process.env.SMTP_USER}>`, to, subject, html });
};

// ---------- SIGNUP ----------
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashed });

    res.status(201).json({ msg: "Account created! Redirecting to login..." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ---------- LOGIN ----------
// routes/auth.js
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // SAVE SESSION
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.save(err => { // FORCE SAVE
      if (err) return res.status(500).json({ msg: "Session error" });
      res.json({ msg: "Login successful!" });
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ---------- LOGOUT ----------
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ msg: "Logged out" });
  });
});

// ---------- AUTH STATUS ----------
router.get("/status", (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true, username: req.session.username });
  } else {
    res.json({ loggedIn: false });
  }
});

// ---------- FORGOT PASSWORD ----------
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "No account with that email" });

    const token = crypto.randomBytes(20).toString("hex");
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 3600000;
    await user.save();

    const resetURL = `${req.protocol}://${req.get("host")}/reset-password.html?token=${token}`;
    await sendMail(email, "Play Nation – Password Reset", `Click <a href="${resetURL}">here</a> to reset. Expires in 1 hour.`);

    res.json({ msg: "Reset link sent!" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ---------- RESET PASSWORD ----------
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({ resetToken: token, resetTokenExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ msg: "Password updated!" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;