// src/app/services/api.ts

const API_BASE_URL = "http://localhost:5000/api";

// ==============================
// AUTH APIs
// ==============================

// Register User
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Registration failed");
  return data;
};

// Login User
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed");

  if (data.data?.token) {
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
  }

  return data;
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
export const getToken = () => localStorage.getItem("token");

// Check Auth
export const isAuthenticated = () => !!getToken();

// ==============================
// DOCUMENT APIs
// ==============================

// Upload Admin Document
export const uploadDocument = async (formData: FormData, token: string) => {
  const response = await fetch(`${API_BASE_URL}/documents/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Upload failed");
  return data;
};

// Get All Admin Documents
export const getAllDocuments = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/documents`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Fetch failed");
  return data;
};

// Delete Admin Document
export const deleteDocument = async (documentId: string, token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/documents/${documentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Delete failed");
  return data;
};

// ==============================
// CLIENT DOCUMENT APIs (ADMIN)
// ==============================

// Get All Client Documents (Admin view)
export const getAllClientDocuments = async (token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/documents/client-documents`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to fetch client documents");

  return data;
};