// models/Contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000,
  },
  status: {
    type: String,
    enum: ["new", "read", "replied"],
    default: "new",
  },
  repliedAt: Date,
}, { timestamps: true });

// Index for admin dashboard (optional)
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });

export default mongoose.model("Contact", contactSchema);