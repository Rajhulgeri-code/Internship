// src/modules/auth/auth.service.ts
import { User } from "../users/user.model";
import { hashPassword, comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: "admin" | "client"
) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};

export const loginUser = async (email: string, password: string) => {
  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not Registered");
  }

  // Check password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Incorrect password. Please try again");
  }

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};