// src/modules/clients/client-document.controller.ts
import { Request, Response } from "express";
import { ClientDocument } from "./client-document.model";
import { Project } from "./project.model";
import { uploadToCloudinary, deleteFromCloudinary } from "../../config/cloudinary";

// Upload client document
export const uploadClientDocument = async (req: Request, res: Response) => {
  try {
    const { title, description, category, tags, projectId } = req.body;
    const clientId = req.user?.userId;
    const clientName = req.user?.name || "Client";

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Document title is required"
      });
    }

    // If projectId is provided, verify it belongs to the client
    if (projectId) {
      const project = await Project.findOne({
        _id: projectId,
        clientId
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found or access denied"
        });
      }
    }

    // Upload to Cloudinary in client-documents folder
    const folderPath = projectId 
      ? `client-documents/${clientId}/project-${projectId}`
      : `client-documents/${clientId}`;
    
    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      folderPath
    );

    // Create document record
    const document = await ClientDocument.create({
      clientId,
      projectId: projectId || undefined,
      title,
      description,
      fileUrl: uploadResult.secure_url,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      publicId: uploadResult.public_id,
      uploadedBy: clientName,
      category: category || "other",
      tags: tags ? JSON.parse(tags) : []
    });

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: document
    });
  } catch (error: any) {
    console.error('Client document upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload document"
    });
  }
};

// Get all documents for logged-in client (optionally filtered by projectId)
export const getClientDocuments = async (req: Request, res: Response) => {
  try {
    const clientId = req.user?.userId;
    const { projectId } = req.query;

    const filter: any = { clientId };
    
    // If projectId is provided, filter by it
    if (projectId) {
      filter.projectId = projectId;
    }

    const documents = await ClientDocument.find(filter)
      .sort({ uploadedAt: -1 });

    res.status(200).json({
      success: true,
      data: documents
    });
  } catch (error: any) {
    console.error('Get client documents error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch documents"
    });
  }
};

// Get documents for a specific project
export const getProjectDocuments = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const clientId = req.user?.userId;

    // Verify project belongs to client
    const project = await Project.findOne({
      _id: projectId,
      clientId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied"
      });
    }

    const documents = await ClientDocument.find({
      projectId,
      clientId
    }).sort({ uploadedAt: -1 });

    res.status(200).json({
      success: true,
      data: documents
    });
  } catch (error: any) {
    console.error('Get project documents error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch project documents"
    });
  }
};

// Get single document
export const getClientDocumentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clientId = req.user?.userId;

    const document = await ClientDocument.findOne({
      _id: id,
      clientId
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found"
      });
    }

    res.status(200).json({
      success: true,
      data: document
    });
  } catch (error: any) {
    console.error('Get client document error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch document"
    });
  }
};

// Update document
export const updateClientDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, category, tags, projectId } = req.body;
    const clientId = req.user?.userId;

    const document = await ClientDocument.findOne({
      _id: id,
      clientId
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found"
      });
    }

    // If updating projectId, verify it belongs to the client
    if (projectId) {
      const project = await Project.findOne({
        _id: projectId,
        clientId
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found or access denied"
        });
      }
    }

    // Update fields
    if (title) document.title = title;
    if (description !== undefined) document.description = description;
    if (category) document.category = category;
    if (tags) document.tags = JSON.parse(tags);
    if (projectId !== undefined) document.projectId = projectId || undefined;

    await document.save();

    res.status(200).json({
      success: true,
      message: "Document updated successfully",
      data: document
    });
  } catch (error: any) {
    console.error('Update client document error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update document"
    });
  }
};

// Delete document
export const deleteClientDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clientId = req.user?.userId;

    const document = await ClientDocument.findOne({
      _id: id,
      clientId
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found"
      });
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(document.publicId);

    // Delete from database
    await ClientDocument.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Document deleted successfully"
    });
  } catch (error: any) {
    console.error('Delete client document error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete document"
    });
  }
};