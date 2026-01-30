// src/modules/clients/project.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  clientId: mongoose.Types.ObjectId;
  name: string;
  service: string;
  description: string;
  status: 'Submitted' | 'In Progress' | 'In Review' | 'Completed';
  progress: number;
  submissionDate: Date;
  expectedCompletion: Date;
  timeline: Array<{
    phase: string;
    date: Date;
    status: 'completed' | 'in-progress' | 'pending';
  }>;
  updates: Array<{
    date: Date;
    message: string;
    author: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  service: {
    type: String,
    required: true,
    enum: [
      'Engineering Design',
      'Software Development',
      'Technical Documentation',
      'UI / UX Design',
      'Data & AI Solutions',
      'Staffing',
      'Other'
    ]
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Submitted', 'In Progress', 'In Review', 'Completed'],
    default: 'Submitted'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
  expectedCompletion: {
    type: Date,
    required: true
  },
  timeline: [{
    phase: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'pending'],
      default: 'pending'
    }
  }],
  updates: [{
    date: {
      type: Date,
      default: Date.now
    },
    message: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
ProjectSchema.index({ clientId: 1, createdAt: -1 });

// Update the updatedAt field on save
ProjectSchema.set('timestamps', true);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);