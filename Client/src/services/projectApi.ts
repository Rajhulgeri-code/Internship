// src/services/projectApi.ts
const API_BASE_URL = "http://localhost:5000/api";

// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export interface Project {
  _id: string;
  clientId: string;
  name: string;
  service: string;
  description: string;
  status: 'Submitted' | 'In Progress' | 'In Review' | 'Completed';
  progress: number;
  submissionDate: string;
  expectedCompletion: string;
  timeline: Array<{
    phase: string;
    date: string;
    status: 'completed' | 'in-progress' | 'pending';
  }>;
  updates: Array<{
    date: string;
    message: string;
    author: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  service: string;
  description: string;
  expectedCompletion: string;
  timeline?: Array<{
    phase: string;
    date: string;
    status: 'completed' | 'in-progress' | 'pending';
  }>;
}

// Create new project
export const createProject = async (data: CreateProjectData) => {
  try {
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
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Get all client projects
export const getClientProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/projects`, {
      method: "GET",
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
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Get single project by ID
export const getProjectById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/projects/${id}`, {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch project");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Update project
export const updateProject = async (
  id: string,
  data: {
    name?: string;
    service?: string;
    description?: string;
    status?: string;
    progress?: number;
    expectedCompletion?: string;
    timeline?: Array<{
      phase: string;
      date: string;
      status: 'completed' | 'in-progress' | 'pending';
    }>;
  }
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/projects/${id}`, {
      method: "PUT",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update project");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Add update/message to project
export const addProjectUpdate = async (id: string, message: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/projects/${id}/updates`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to add update");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Delete project
export const deleteProject = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/projects/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete project");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};