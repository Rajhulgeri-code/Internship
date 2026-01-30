// src/services/documentApi.ts
const API_BASE_URL = "http://localhost:5000/api";

// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export interface ClientDocument {
  _id: string;
  clientId: string;
  projectId?: string; // Optional project link
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  publicId: string;
  uploadedBy: string;
  uploadedAt: string;
  category?: string;
  tags?: string[];
}

export interface UploadDocumentData {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  file: File;
  projectId?: string; // Optional project ID to link document
}

// Upload document
export const uploadClientDocument = async (data: UploadDocumentData) => {
  try {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.category) formData.append("category", data.category);
    if (data.tags) formData.append("tags", JSON.stringify(data.tags));
    if (data.projectId) formData.append("projectId", data.projectId);

    const response = await fetch(`${API_BASE_URL}/clients/documents/upload`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to upload document");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Get all client documents (optionally filtered by projectId)
export const getClientDocuments = async (projectId?: string) => {
  try {
    const url = projectId 
      ? `${API_BASE_URL}/clients/documents?projectId=${projectId}`
      : `${API_BASE_URL}/clients/documents`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch documents");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Get documents for a specific project
export const getProjectDocuments = async (projectId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/documents/project/${projectId}`, {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch project documents");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Get single document
export const getClientDocumentById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/documents/${id}`, {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch document");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Update document
export const updateClientDocument = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    category?: string;
    tags?: string[];
    projectId?: string;
  }
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/documents/${id}`, {
      method: "PUT",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update document");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};

// Delete document
export const deleteClientDocument = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/documents/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete document");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
};