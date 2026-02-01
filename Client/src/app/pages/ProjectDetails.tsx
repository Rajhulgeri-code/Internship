import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileText, Upload } from "lucide-react";
import {
  getProjectById,
  uploadProjectDocument,
  Project,
} from "../../services/projectApi";

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    if (!projectId) return;

    try {
      const data = await getProjectById(projectId);
      setProject(data);
    } catch (error) {
      console.error("Failed to fetch project:", error);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length || !projectId) return;

    try {
      await uploadProjectDocument(projectId, e.target.files[0]);
      fetchProject(); // refresh after upload
    } catch (error) {
      console.error("Document upload failed:", error);
    }
  };

  /* =====================
     SAFE RENDER STATES
     ===================== */

  if (loading) {
    return (
      <div className="p-8 text-gray-600">
        Loading project details…
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8 text-red-600">
        Project not found or access denied.
      </div>
    );
  }

  /* =====================
     MAIN UI
     ===================== */

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-gray-600">{project.service}</p>
        </div>
        <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700">
          {project.status}
        </span>
      </div>

      {/* OVERVIEW */}
      <Section title="Project Overview">
        <Info label="Progress" value={`${project.progress || 0}%`} />
        <Info label="Expected Completion" value={project.expectedCompletion} />
        <Info label="Priority" value={project.priority} />
        <Info label="Project Type" value={project.projectType} />
      </Section>

      {/* TECH */}
      <Section title="Technical Requirements">
        <Info label="Tech Stack" value={project.techStack} />
        <Info label="Platform" value={project.platform} />
        <Info label="Integrations" value={project.integrations} />
      </Section>

      {/* COMMERCIAL */}
      <Section title="Commercial Details">
        <Info label="Budget" value={project.budgetRange} />
        <Info label="Engagement Model" value={project.engagementModel} />
      </Section>

      {/* DESCRIPTION */}
      <Section title="Project Description">
        <p className="text-gray-700 col-span-2">
          {project.description}
        </p>
      </Section>

      {/* NOTES */}
      <Section title="Additional Notes">
        <p className="text-gray-700 col-span-2">
          {project.notes || "—"}
        </p>
      </Section>

      {/* DOCUMENTS */}
      <Section title="Documents">
        <div className="col-span-2">

          <div className="flex justify-end mb-4">
            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Upload size={16} />
              Upload
              <input type="file" hidden onChange={handleUpload} />
            </label>
          </div>

          {project.documents && project.documents.length > 0 ? (
            <ul className="space-y-3">
              {project.documents.map((doc) => (
                <li
                  key={doc._id}
                  className="flex justify-between items-center border p-4 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText />
                    <div>
                      <p className="font-medium">{doc.fileName}</p>
                      <p className="text-sm text-gray-500">
                        Uploaded on{" "}
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-6">
              No documents uploaded
            </p>
          )}
        </div>
      </Section>
    </div>
  );
}

/* =====================
   REUSABLE COMPONENTS
   ===================== */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "—"}</p>
    </div>
  );
}
