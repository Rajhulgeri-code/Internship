// src/modules/documents/document.controller.ts
import { Response } from "express";
import { AuthRequest } from "../../types";
import cloudinary from "../../config/cloudinary";
import { DocumentModel } from "./document.model";

export const uploadDocument = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const { title, description, category, project } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please provide a document title"
      });
    }

    // Get admin ID from authenticated user
    const adminId = req.user?.userId;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Admin ID not found"
      });
    }

    // Upload file to Cloudinary in admin-specific folder
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `business-documents/admin-${adminId}`, // Separate folder per admin
      resource_type: "auto",
      public_id: `doc_${Date.now()}`,
      overwrite: true,
      invalidate: true
    });

    // Save document metadata to MongoDB with adminId
    const document = await DocumentModel.create({
      title: title,
      description: description,
      category: category,
      fileUrl: result.url,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      uploadedBy: adminId, // Link to this specific admin
      project: project
    });

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: document
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Document upload failed"
    });
  }
};

export const getAllDocuments = async (req: AuthRequest, res: Response) => {
  try {
    const adminId = req.user?.userId;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Admin ID not found"
      });
    }

    // FIXED: Only fetch documents uploaded by THIS admin
    const documents = await DocumentModel.find({ uploadedBy: adminId })
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: documents
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch documents"
    });
  }
};

export const deleteDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = req.user?.userId;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Admin ID not found"
      });
    }

    // FIXED: Only allow deleting own documents
    const document = await DocumentModel.findOne({
      _id: id,
      uploadedBy: adminId // Ensure admin can only delete their own documents
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or you don't have permission to delete it"
      });
    }

    await DocumentModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,    
      message: "Document deleted successfully"
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete document"
    });
  }
};