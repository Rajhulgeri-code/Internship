// src/modules/clients/client.routes.ts
import { Router } from "express";
import { registerClient, loginClient } from "./client.controller";

const router = Router();

// Client registration
router.post("/register", registerClient);

// Client login
router.post("/login", loginClient);

export default router;