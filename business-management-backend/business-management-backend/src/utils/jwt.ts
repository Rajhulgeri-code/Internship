// src/utils/jwt.ts
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET || "supersecretkey";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET || "supersecretkey";
  return jwt.verify(token, secret) as JwtPayload;
};