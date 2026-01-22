// src/modules/clients/client-document.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IClientDocument extends Document {
  clientId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  publicId: string; // Cloudinary public ID
  uploadedBy: string; // Client name
  uploadedAt: Date;
  category?: string;
  tags?: string[];
}

const ClientDocumentSchema = new Schema<IClientDocument>({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ["contract", "invoice", "report", "proposal", "other"],
    default: "other"
  },
  tags: [{
    type: String,
    trim: true
  }]
});

// Index for faster queries
ClientDocumentSchema.index({ clientId: 1, uploadedAt: -1 });

export const ClientDocument = mongoose.model<IClientDocument>("ClientDocument", ClientDocumentSchema);