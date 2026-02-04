import { Request, Response } from 'express';
import { User } from '../users/user.model';
import { Client } from '../clients/client.model';
import { Project } from '../clients/project.model';
import { DocumentModel } from '../documents/document.model';
import { ClientDocument } from '../clients/client-document.model';

// Extended Request type with user property
interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

// Get Admin Dashboard Statistics
export const getAdminDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const adminId = req.user?.userId;

    // Total Clients
    const totalClients = await Client.countDocuments();

    // Total Projects
    const totalProjects = await Project.countDocuments();

    // Active Projects (In Progress)
    const activeProjects = await Project.countDocuments({ 
      status: 'In Progress' 
    });

    // Completed Projects
    const completedProjects = await Project.countDocuments({ 
      status: 'Completed' 
    });

    // Submitted Projects
    const submittedProjects = await Project.countDocuments({ 
      status: 'Submitted' 
    });

    // In Review Projects
    const inReviewProjects = await Project.countDocuments({ 
      status: 'In Review' 
    });

    // Total Documents (Admin + Client)
    const totalAdminDocuments = await DocumentModel.countDocuments({ 
      uploadedBy: adminId 
    });
    const totalClientDocuments = await ClientDocument.countDocuments();
    const totalDocuments = totalAdminDocuments + totalClientDocuments;

    // Total Team Members (Admins)
    const totalTeamMembers = await User.countDocuments({ role: 'admin' });

    // Recent Clients (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentClients = await Client.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Calculate percentage change for recent clients
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const previousMonthClients = await Client.countDocuments({
      createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    });
    const clientGrowthPercent = previousMonthClients > 0 
      ? Math.round(((recentClients - previousMonthClients) / previousMonthClients) * 100)
      : 0;

    // Project Status Distribution
    const projectStatusDistribution = [
      { name: 'Completed', value: completedProjects, color: '#10b981' },
      { name: 'In Progress', value: activeProjects, color: '#3b82f6' },
      { name: 'Submitted', value: submittedProjects, color: '#f59e0b' },
      { name: 'In Review', value: inReviewProjects, color: '#8b5cf6' },
    ];

    // Recent Projects (last 6 months grouped by month)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const projectsByMonth = await Project.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Format revenue data (mock calculation based on projects)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueData = projectsByMonth.map(item => ({
      month: monthNames[item._id.month - 1],
      revenue: item.count * 5000 // Mock: $5000 per project
    }));

    // Ensure we have at least 6 months of data (fill with zeros if needed)
    const currentDate = new Date();
    if (revenueData.length < 6) {
      const monthsToAdd = 6 - revenueData.length;
      for (let i = 0; i < monthsToAdd; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - (5 - i), 1);
        revenueData.unshift({
          month: monthNames[date.getMonth()],
          revenue: 0
        });
      }
    }

    // Task Completion Data (based on project updates)
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const taskCompletionData = [
      { 
        week: 'Week 1', 
        completed: await Project.countDocuments({ 
          status: 'Completed',
          updatedAt: { 
            $gte: new Date(fourWeeksAgo.getTime()),
            $lt: new Date(fourWeeksAgo.getTime() + 7 * 24 * 60 * 60 * 1000)
          }
        }), 
        total: await Project.countDocuments({
          updatedAt: { 
            $gte: new Date(fourWeeksAgo.getTime()),
            $lt: new Date(fourWeeksAgo.getTime() + 7 * 24 * 60 * 60 * 1000)
          }
        })
      },
      { 
        week: 'Week 2', 
        completed: await Project.countDocuments({ 
          status: 'Completed',
          updatedAt: { 
            $gte: new Date(fourWeeksAgo.getTime() + 7 * 24 * 60 * 60 * 1000),
            $lt: new Date(fourWeeksAgo.getTime() + 14 * 24 * 60 * 60 * 1000)
          }
        }), 
        total: await Project.countDocuments({
          updatedAt: { 
            $gte: new Date(fourWeeksAgo.getTime() + 7 * 24 * 60 * 60 * 1000),
            $lt: new Date(fourWeeksAgo.getTime() + 14 * 24 * 60 * 60 * 1000)
          }
        })
      },
      { 
        week: 'Week 3', 
        completed: await Project.countDocuments({ 
          status: 'Completed',
          updatedAt: { 
            $gte: new Date(fourWeeksAgo.getTime() + 14 * 24 * 60 * 60 * 1000),
            $lt: new Date(fourWeeksAgo.getTime() + 21 * 24 * 60 * 60 * 1000)
          }
        }), 
        total: await Project.countDocuments({
          updatedAt: { 
            $gte: new Date(fourWeeksAgo.getTime() + 14 * 24 * 60 * 60 * 1000),
            $lt: new Date(fourWeeksAgo.getTime() + 21 * 24 * 60 * 60 * 1000)
          }
        })
      },
      { 
        week: 'Week 4', 
        completed: await Project.countDocuments({ 
          status: 'Completed',
          updatedAt: { 
            $gte: new Date(fourWeeksAgo.getTime() + 21 * 24 * 60 * 60 * 1000),
            $lt: new Date()
          }
        }), 
        total: await Project.countDocuments({
          updatedAt: { 
            $gte: new Date(fourWeeksAgo.getTime() + 21 * 24 * 60 * 60 * 1000),
            $lt: new Date()
          }
        })
      },
    ];

    res.json({
      success: true,
      data: {
        kpi: {
          totalClients,
          activeProjects,
          completedProjects,
          totalTeamMembers,
          recentClients,
          totalDocuments,
          clientGrowthPercent
        },
        charts: {
          revenueData,
          projectStatusDistribution,
          taskCompletionData
        }
      }
    });
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
};