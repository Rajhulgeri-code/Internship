// src/modules/clients/project.routes.ts
import { Router } from "express";
import {
  createProject,
  getClientProjects,
  getProjectById,
  updateProject,
  addProjectUpdate,
  deleteProject
} from "./project.controller";
import { clientAuthMiddleware } from "../../middlewares/client-auth.middleware";

const router = Router();

// All routes require client authentication
router.use(clientAuthMiddleware);

// Create new project
router.post("/", createProject);

// Get all projects for logged-in client
router.get("/", getClientProjects);

// Get single project by ID
router.get("/:id", getProjectById);

// Update project
router.put("/:id", updateProject);

// Add update/message to project
router.post("/:id/updates", addProjectUpdate);

// Delete project
router.delete("/:id", deleteProject);

export default router;