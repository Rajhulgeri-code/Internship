// src/config/cloudinary.ts
console.log('🔵 Loading Cloudinary Config...');

import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Ensure dotenv is loaded
dotenv.config();

console.log('Environment variables:', {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Cloudinary configured successfully!');

export default cloudinary;