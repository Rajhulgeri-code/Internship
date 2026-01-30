// src/modules/clients/client-document.routes.ts
import { Router } from "express";
import multer from "multer";
import {
  uploadClientDocument,
  getClientDocuments,
  getClientDocumentById,
  updateClientDocument,
  deleteClientDocument,
  getProjectDocuments
} from "./client-document.controller";
import { clientAuthMiddleware } from "../../middlewares/client-auth.middleware";

const router = Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow all document types
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'text/plain'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, Word, Excel, PowerPoint, images, and text files are allowed.'));
    }
  }
});

// All routes require client authentication
router.use(clientAuthMiddleware);

// Upload document (can be linked to project via projectId in body)
router.post("/upload", upload.single("file"), uploadClientDocument);

// Get all documents for logged-in client (can filter by projectId via query param)
router.get("/", getClientDocuments);

// Get documents for a specific project
router.get("/project/:projectId", getProjectDocuments);

// Get single document
router.get("/:id", getClientDocumentById);

// Update document metadata
router.put("/:id", updateClientDocument);

// Delete document
router.delete("/:id", deleteClientDocument);

export default router;