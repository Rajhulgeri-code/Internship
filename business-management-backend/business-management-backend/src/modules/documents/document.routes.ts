import { Router } from "express";
import { uploadDocument, getAllDocuments, deleteDocument } from "./document.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import multer from "multer";

const router = Router();

console.log("=== DOCUMENT ROUTES LOADED ===");

// Multer configuration
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Test route (no auth) - can be removed later
router.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.json({ success: true, message: "Routes working!" });
});

// Get all client documents (admin only) - NO AUTH for now (testing)
router.get("/client-documents", async (req, res) => {
  console.log("🔍 CLIENT DOCUMENTS ROUTE HIT");
  
  try {
    // Import ClientDocument model dynamically to avoid circular dependency
    const { ClientDocument } = require("../clients/client-document.model");
    
    console.log("📦 ClientDocument model loaded");
    
    const documents = await ClientDocument.find()
      .populate('clientId', 'name email companyName phoneNumber')
      .populate('projectId', 'name service status')
      .sort({ uploadedAt: -1 });

    console.log(`✅ Found ${documents.length} client documents`);

    res.status(200).json({
      success: true,
      data: documents
    });
  } catch (error: any) {
    console.error('❌ Error fetching client documents:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch client documents"
    });
  }
});

// All routes BELOW this line require admin authentication
router.use(authMiddleware);

// Admin document routes (protected)
router.post("/upload", upload.single('file'), uploadDocument);
router.get("/", getAllDocuments);
router.delete("/:id", deleteDocument);

console.log("=== DOCUMENT ROUTES REGISTERED ===");
console.log("✅ GET /api/documents/test");
console.log("✅ GET /api/documents/client-documents");
console.log("✅ POST /api/documents/upload (auth required)");
console.log("✅ GET /api/documents (auth required)");
console.log("✅ DELETE /api/documents/:id (auth required)");

export default router;