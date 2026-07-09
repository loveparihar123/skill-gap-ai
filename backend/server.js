import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import roleRoutes from "./Routes/roleRoutes.js";
import analyzeRoutes from "./Routes/analyzeRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import companyRoutes from "./Routes/companyRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connect
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/companyRoutes", companyRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running! 🚀" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} ✅`);
});
