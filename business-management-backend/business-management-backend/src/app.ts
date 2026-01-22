// src/app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import documentRoutes from "./modules/documents/document.routes";
import clientRoutes from "./modules/clients/client.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running 🚀"
  });
});

// Auth routes (admin)
app.use("/api/auth", authRoutes);

// Client routes
app.use("/api/clients", clientRoutes);

// Document routes
app.use("/api/documents", documentRoutes);

// Error handling middleware (must be last)
app.use(errorMiddleware);

export default app;