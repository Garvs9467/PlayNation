// routes/contact.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// ---------- SEND CONTACT MESSAGE (NO EMAIL) ----------
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation (same as before)
  if (!name || !email || !message) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  if (message.length < 10) {
    return res.status(400).json({ msg: "Message must be at least 10 characters" });
  }

  try {
    // Only save to database
    await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    // Success response
    res.json({ 
      msg: "Thank you! Your message has been received. We'll get back to you soon." 
    });

  } catch (err) {
    console.error("Contact form DB error:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });

    // Better error handling
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ msg: "Invalid data", errors });
    }

    res.status(500).json({ msg: "Something went wrong. Please try again later." });
  }
});

export default router;