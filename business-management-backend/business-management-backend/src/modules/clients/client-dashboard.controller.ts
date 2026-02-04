import { Request, Response } from 'express';
import { Project } from './project.model';
import { ClientDocument } from './client-document.model';

// Extended Request type with user property
interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

// Get Client Dashboard Statistics
export const getClientDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const clientId = req.user?.userId;

    // Total Projects for this client
    const totalProjects = await Project.countDocuments({ clientId });

    // Active Projects (In Progress)
    const activeProjects = await Project.countDocuments({ 
      clientId,
      status: 'In Progress' 
    });

    // Completed Projects
    const completedProjects = await Project.countDocuments({ 
      clientId,
      status: 'Completed' 
    });

    // In Review Projects
    const inReviewProjects = await Project.countDocuments({ 
      clientId,
      status: 'In Review' 
    });

    // Submitted Projects
    const submittedProjects = await Project.countDocuments({ 
      clientId,
      status: 'Submitted' 
    });

    // Total Documents
    const totalDocuments = await ClientDocument.countDocuments({ clientId });

    // Recent Projects (last 3)
    const recentProjects = await Project.find({ clientId })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('name service status submissionDate');

    res.json({
      success: true,
      data: {
        kpi: {
          totalProjects,
          activeProjects,
          completedProjects,
          inReviewProjects,
          submittedProjects,
          totalDocuments
        },
        recentProjects
      }
    });
  } catch (error) {
    console.error('Error fetching client dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
};