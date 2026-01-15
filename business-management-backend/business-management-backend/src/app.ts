// src/app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running 🚀"
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Error handling middleware (must be last)
app.use(errorMiddleware);

export default app;