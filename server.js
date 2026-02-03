import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.js";
import contactRouter from "./routes/contact.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve ALL files from 'views' folder
app.use(express.static(path.join(__dirname, "views")));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,           // ← Force save
    saveUninitialized: false,
    store: MongoStore.create({ 
      mongoUrl: 'mongodb+srv://garvsharma24cse_db_user:r1TQnkc7S0wUTEHs@cluster0.8abiyvj.mongodb.net/' ,
      touchAfter: 24 * 3600 // Save only if changed
    }),
    cookie: { 
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,        // Set true in production with HTTPS
      sameSite: 'lax'
    }
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);

// Redirect root
app.get("/", (req, res) => {
  res.redirect(req.session.userId ? "/home.html" : "/login.html");
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));