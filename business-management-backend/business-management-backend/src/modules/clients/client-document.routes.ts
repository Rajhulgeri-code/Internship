// Express router for client document-related routes
import { Router } from "express";

// Multer is used to handle file uploads
import multer from "multer";

// Controller functions for client document operations
import {
  uploadClientDocument,
  getClientDocuments,
  getClientDocumentById,
  updateClientDocument,
  deleteClientDocument,
  getProjectDocuments
} from "./client-document.controller";

// Middleware to allow only authenticated clients
import { clientAuthMiddleware } from "../../middlewares/client-auth.middleware";

// Middleware for general authentication (admin / authenticated users)
import { authMiddleware } from "../../middlewares/auth.middleware";

// Initialize Express router
const router = Router();

// ======================================================
// MULTER CONFIGURATION (In-memory file storage)
// ======================================================

// Store uploaded files in memory (buffer) instead of disk
const storage = multer.memoryStorage();

// Multer upload configuration
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Maximum file size: 10MB
  },
  fileFilter: (req, file, cb) => {
    // Allowed MIME types for uploads
    const allowedMimes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "text/plain"
    ];

    // Validate file type
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only PDF, Word, Excel, PowerPoint, images, and text files are allowed."
        )
      );
    }
  }
});

// ======================================================
// ADMIN ROUTES
// ======================================================

// ======================================================
// CLIENT ROUTES (Client authentication required)
// ======================================================

// Apply client-only authentication middleware to all routes below
router.use(clientAuthMiddleware);

// Upload a new document (Client)
router.post(
  "/upload",
  upload.single("file"),
  uploadClientDocument
);

// Get all documents for the logged-in client
router.get(
  "/",
  getClientDocuments
);

// Get documents for a specific project (Client)
router.get(
  "/project/:projectId",
  getProjectDocuments
);

// Get a single document by ID (Client)
router.get(
  "/:id",
  getClientDocumentById
);

// Update document metadata (Client)
router.put(
  "/:id",
  updateClientDocument
);

// Delete a document (Client)
router.delete(
  "/:id",
  deleteClientDocument
);

// Export router
export default router;
