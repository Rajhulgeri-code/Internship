// src/services/projectApi.ts
const API_BASE_URL = "http://localhost:5000/api";

// =======================
// AUTH HEADERS
// =======================
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// =======================
// TYPES
// =======================
export interface Project {
  _id: string;
  clientId: string;
  name: string;
  service: string;
  description: string;
  status: "Submitted" | "In Progress" | "In Review" | "Completed";
  progress: number;
  submissionDate: string;
  expectedCompletion: string;

  projectType?: string;
  priority?: string;
  techStack?: string;
  platform?: string;
  integrations?: string;
  budgetRange?: string;
  engagementModel?: string;
  notes?: string;

  documents?: Array<{
    _id: string;
    fileName: string;
    url: string;
    createdAt: string;
  }>;

  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  service: string;
  description: string;
  expectedCompletion: string;
}

// =======================
// CREATE PROJECT
// =======================
export const createProject = async (data: CreateProjectData) => {
  const response = await fetch(`${API_BASE_URL}/clients/projects`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to create project");
  }

  return result;
};

// =======================
// GET ALL PROJECTS
// =======================
export const getClientProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/clients/projects`, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch projects");
  }

  return result;
};

// =======================
// GET PROJECT BY ID
// =======================
export const getProjectById = async (id: string): Promise<Project> => {
  const response = await fetch(
    `${API_BASE_URL}/clients/projects/${id}`,
    {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch project");
  }

  return result;
};

// =======================
// UPLOAD PROJECT DOCUMENT
// =======================
export const uploadProjectDocument = async (
  projectId: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `http://localhost:5000/api/clients/projects/${projectId}/documents`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // ❌ DO NOT set Content-Type for FormData
      },
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to upload document");
  }

  return result;
};
