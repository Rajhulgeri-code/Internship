import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Users, FolderKanban, CheckCircle, UserCheck, FileText, TrendingUp, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dashboardImage from "../../../assets/2f631e0f286f8190ea8857ff48566ecc6e95802b.png";
// import certImage from "../../../assets/0cfaadbac5d43518539d801836524d5a92bdb7da.png";
import axios from 'axios';

interface DashboardStats {
  kpi: {
    totalClients: number;
    activeProjects: number;
    completedProjects: number;
    totalTeamMembers: number;
    recentClients: number;
    totalDocuments: number;
    clientGrowthPercent: number;
  };
  charts: {
    revenueData: Array<{ month: string; revenue: number }>;
    projectStatusDistribution: Array<{ name: string; value: number; color: string }>;
    taskCompletionData: Array<{ week: string; completed: number; total: number }>;
  };
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get('http://localhost:5000/api/admin/dashboard/stats', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err: any) {
      console.error('Error fetching dashboard stats:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchDashboardStats}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Welcome Section with Dashboard Image */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={dashboardImage} 
              alt="InnoInfinite Solutions Dashboard" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent flex items-center px-8">
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">Welcome to InnoInfinite Solutions</h1>
                <p className="text-blue-100">Enterprise Admin Dashboard - Engineering, IT & Technical Services</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900">{stats.kpi.totalClients}</p>
                <p className={`text-xs mt-1 ${stats.kpi.clientGrowthPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.kpi.clientGrowthPercent >= 0 ? '↑' : '↓'} {Math.abs(stats.kpi.clientGrowthPercent)}% from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Projects</p>
                <p className="text-3xl font-bold text-gray-900">{stats.kpi.activeProjects}</p>
                <p className="text-xs text-blue-600 mt-1">In Progress</p>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <FolderKanban className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Completed Projects</p>
                <p className="text-3xl font-bold text-gray-900">{stats.kpi.completedProjects}</p>
                <p className="text-xs text-green-600 mt-1">Successfully delivered</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Team Members</p>
                <p className="text-3xl font-bold text-gray-900">{stats.kpi.totalTeamMembers}</p>
                <p className="text-xs text-purple-600 mt-1">Total Documents: {stats.kpi.totalDocuments}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
            Revenue Overview (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.charts.revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.charts.revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No revenue data available yet
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FolderKanban className="mr-2 h-5 w-5 text-blue-600" />
            Project Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.charts.projectStatusDistribution.some(item => item.value > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.charts.projectStatusDistribution.filter(item => item.value > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.charts.projectStatusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No projects data available yet
            </div>
          )}
        </CardContent>
      </Card>

      {/* Task Completion Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-indigo-600" />
            Task Completion Analytics (Last 4 Weeks)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.charts.taskCompletionData.some(item => item.total > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.charts.taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                <Bar dataKey="total" fill="#f59e0b" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No task completion data available yet
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company Certifications & Achievements */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
            Certifications & Industry Recognition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="w-full rounded-lg shadow-md bg-gray-200 h-64 flex items-center justify-center">
                <p className="text-gray-500">Certification Image</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Industry-Leading Excellence</h3>
                <p className="text-gray-600 mt-2">
                  InnoInfinite Solutions is proud to maintain the highest industry certifications and standards in Engineering, IT, and Technical Services.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Industry Best Practices Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Quality Management Excellence</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Continuous Innovation & Development</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}