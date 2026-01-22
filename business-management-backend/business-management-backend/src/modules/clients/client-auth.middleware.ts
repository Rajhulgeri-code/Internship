// src/middlewares/client-auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  name?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const clientAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Please login."
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as JwtPayload;

    // Check if user is a client
    if (decoded.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Client access only."
      });
    }

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error: any) {
    console.error('Client auth middleware error:', error);
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again."
      });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again."
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed"
    });
  }
};