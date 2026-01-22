// src/modules/clients/client.controller.ts
import { Request, Response } from "express";
import { Client } from "./client.model";
import { hashPassword, comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";

export const registerClient = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      companyName,
      phoneNumber,
      address,
      industry,
      companySize,
      website,
      taxId,
      registrationNumber
    } = req.body;

    // Validation
    if (!name || !email || !password || !companyName || !phoneNumber || !address) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, email, password, company name, phone number, and address"
      });
    }

    // Validate address fields
    if (!address.street || !address.city || !address.state || !address.zipCode) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete address (street, city, state, zip code)"
      });
    }

    // Check if client already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({
        success: false,
        message: "Client with this email already exists"
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create client
    const client = await Client.create({
      name,
      email,
      password: hashedPassword,
      companyName,
      phoneNumber,
      address,
      industry,
      companySize,
      website,
      taxId,
      registrationNumber,
      role: "client"
    });

    // Generate token
    const token = generateToken({
      userId: client._id.toString(),
      email: client.email,
      role: "client"
    });

    res.status(201).json({
      success: true,
      message: "Client registered successfully",
      data: {
        client: {
          id: client._id,
          name: client.name,
          email: client.email,
          companyName: client.companyName,
          phoneNumber: client.phoneNumber,
          address: client.address,
          industry: client.industry,
          companySize: client.companySize,
          website: client.website,
          role: client.role
        },
        token
      }
    });

  } catch (error: any) {
    console.error('Client registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Client registration failed"
    });
  }
};

export const loginClient = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }

    // Find client
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Check if client is active
    if (!client.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated. Please contact support."
      });
    }

    // Check password
    const isPasswordValid = await comparePassword(password, client.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate token
    const token = generateToken({
      userId: client._id.toString(),
      email: client.email,
      role: "client"
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        client: {
          id: client._id,
          name: client.name,
          email: client.email,
          companyName: client.companyName,
          phoneNumber: client.phoneNumber,
          address: client.address,
          industry: client.industry,
          companySize: client.companySize,
          website: client.website,
          role: client.role
        },
        token
      }
    });

  } catch (error: any) {
    console.error('Client login error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Login failed"
    });
  }
};