// src/app/services/api.ts

const API_BASE_URL = "http://localhost:5000/api";

// Register User
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Login User
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Store token in localStorage
    if (data.data?.token) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get Current User
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Get Token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};