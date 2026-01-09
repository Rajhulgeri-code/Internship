import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Users, FolderKanban, CheckCircle, UserCheck, FileText, TrendingUp, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dashboardImage from 'figma:asset/2f631e0f286f8190ea8857ff48566ecc6e95802b.png';
import certImage from 'figma:asset/0cfaadbac5d43518539d801836524d5a92bdb7da.png';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

const projectData = [
  { name: 'Completed', value: 12, color: '#10b981' },
  { name: 'Ongoing', value: 8, color: '#3b82f6' },
  { name: 'Pending', value: 3, color: '#f59e0b' },
];

const taskCompletionData = [
  { week: 'Week 1', completed: 23, total: 30 },
  { week: 'Week 2', completed: 28, total: 35 },
  { week: 'Week 3', completed: 31, total: 38 },
  { week: 'Week 4', completed: 34, total: 40 },
];

export default function Dashboard() {
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
                <p className="text-3xl font-bold text-gray-900">42</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
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
                <p className="text-3xl font-bold text-gray-900">23</p>
                <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
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
                <p className="text-sm text-gray-500 mb-1">Completed Tasks</p>
                <p className="text-3xl font-bold text-gray-900">156</p>
                <p className="text-xs text-green-600 mt-1">↑ 24% from last month</p>
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
                <p className="text-3xl font-bold text-gray-900">18</p>
                <p className="text-xs text-blue-600 mt-1">2 new this month</p>
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
            Revenue Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Project Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
            Project Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {projectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Task Completion Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-indigo-600" />
            Task Completion Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
              <Bar dataKey="total" fill="#f59e0b" name="Total" />
            </BarChart>
          </ResponsiveContainer>
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
              <img 
                src={certImage} 
                alt="InnoInfinite Solutions Certifications" 
                className="w-full rounded-lg shadow-md"
              />
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