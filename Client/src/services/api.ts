// src/services/api.ts
const API_BASE_URL = "http://localhost:5000/api";

interface RegisterClientData {
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
}

// Register Client
export const registerClient = async (userData: RegisterClientData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/register`, {
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

    if (data.data?.token) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.client));
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Login Client
export const loginClient = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/login`, {
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

    if (data.data?.token) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.client));
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Logout
export const logoutClient = () => {
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