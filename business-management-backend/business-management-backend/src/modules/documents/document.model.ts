// src/modules/documents/document.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IDocument extends Document {
  title: string;
  description?: string;
  category?: string;
  project?: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  clientId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const DocumentSchema = new Schema<IDocument>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  project: {
    type: String,
    trim: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const DocumentModel = mongoose.model<IDocument>("Document", DocumentSchema);