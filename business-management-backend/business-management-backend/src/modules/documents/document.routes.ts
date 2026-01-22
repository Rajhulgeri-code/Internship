// src/modules/documents/document.routes.ts
import { Router } from "express";
import multer from "multer";
import { uploadDocument, getAllDocuments, deleteDocument } from "./document.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

// Configure multer for file upload
const upload = multer({ 
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  }
});

// Upload document (admin only)
router.post(
  "/upload",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("file"),
  uploadDocument
);

// Get all documents (admin only)
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllDocuments
);

// Delete document (admin only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteDocument
);

export default router;  