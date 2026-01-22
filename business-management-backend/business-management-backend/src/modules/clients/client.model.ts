// src/modules/clients/client.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  password: string;
  companyName: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  industry?: string;
  companySize?: string;
  website?: string;
  taxId?: string;
  registrationNumber?: string;
  role: "client";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<IClient>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
      default: "India"
    }
  },
  industry: {
    type: String,
    trim: true
  },
  companySize: {
    type: String,
    enum: ["1-10", "11-50", "51-200", "201-500", "501+"],
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  taxId: {
    type: String,
    trim: true
  },
  registrationNumber: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    default: "client",
    immutable: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
// Add timestamps option
ClientSchema.set('timestamps', true);

export const Client = mongoose.model<IClient>("Client", ClientSchema);