// src/app.ts
import adminDashboardRoutes from './modules/auth/dashboard.routes';
import clientDashboardRoutes from './modules/clients/client-dashboard.routes';
import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import documentRoutes from "./modules/documents/document.routes";
import clientRoutes from "./modules/clients/client.routes";
import clientDocumentRoutes from "./modules/clients/client-document.routes";
import projectRoutes from "./modules/clients/project.routes";
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

// Client document routes (protected)
app.use("/api/clients/documents", clientDocumentRoutes);

// Client project routes (protected)
app.use("/api/clients/projects", projectRoutes);

// Document routes (admin)
app.use("/api/documents", documentRoutes);

// Error handling middleware (must be last)
app.use(errorMiddleware);

export default app;

// Dashboard routes
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/clients/dashboard', clientDashboardRoutes);