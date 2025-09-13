'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, Title } from '../ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, CheckCircle, Clock, RefreshCw } from 'lucide-react'

export const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    quoted: 0,
    completed: 0
  })
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/contacts')
      const data = await res.json()
      if (data.success) {
        const inquiriesData = data.data
        setInquiries(inquiriesData)
        
        // Calculate stats
        const newStats = {
          total: inquiriesData.length,
          new: inquiriesData.filter(i => i.status === 'new').length,
          contacted: inquiriesData.filter(i => i.status === 'contacted').length,
          quoted: inquiriesData.filter(i => i.status === 'quoted').length,
          completed: inquiriesData.filter(i => i.status === 'completed').length
        }
        setStats(newStats)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Generate monthly data from inquiries
  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentYear = new Date().getFullYear()
    
    return months.map(month => {
      const monthIndex = months.indexOf(month)
      const count = inquiries.filter(inquiry => {
        const inquiryDate = new Date(inquiry.createdAt)
        return inquiryDate.getFullYear() === currentYear && inquiryDate.getMonth() === monthIndex
      }).length
      return { month, inquiries: count }
    })
  }

  const statusData = [
    { name: 'New', value: stats.new, color: '#3B82F6' },
    { name: 'Contacted', value: stats.contacted, color: '#F59E0B' },
    { name: 'Quoted', value: stats.quoted, color: '#F97316' },
    { name: 'Completed', value: stats.completed, color: '#10B981' }
  ]

  const recentInquiries = inquiries.slice(0, 5)

  if (loading) {
    return <div className="p-4">Loading dashboard...</div>
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your inquiries.</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Title>Total Inquiries</Title>
              <Users className="text-blue-600" size={24} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-500">All time inquiries</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Title>New Inquiries</Title>
              <Clock className="text-orange-600" size={24} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats.new}</div>
            <div className="text-sm text-gray-500">Awaiting response</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Title>In Progress</Title>
              <TrendingUp className="text-yellow-600" size={24} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats.contacted + stats.quoted}</div>
            <div className="text-sm text-gray-500">Active conversations</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Title>Completed</Title>
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-500">Successfully closed</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <Title>Monthly Inquiries</Title>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getMonthlyData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="inquiries" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Title>Inquiry Status Distribution</Title>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData.filter(item => item.value > 0)}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Inquiries */}
      <Card>
        <CardHeader>
          <Title>Recent Inquiries</Title>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInquiries.length > 0 ? (
              recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{inquiry.name}</div>
                    <div className="text-sm text-gray-600">{inquiry.email}</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      inquiry.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                      inquiry.status === 'quoted' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {inquiry.status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No inquiries yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}