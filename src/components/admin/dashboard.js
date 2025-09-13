'use client'
import { Card, CardContent, CardHeader, Title } from '../ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const contactsData = [
  { month: 'Jan', contacts: 45 },
  { month: 'Feb', contacts: 52 },
  { month: 'Mar', contacts: 48 },
  { month: 'Apr', contacts: 61 },
  { month: 'May', contacts: 55 },
  { month: 'Jun', contacts: 67 }
]

const statusData = [
  { name: 'New', value: 30, color: '#3B82F6' },
  { name: 'In Progress', value: 45, color: '#F59E0B' },
  { name: 'Completed', value: 25, color: '#10B981' }
]

export const Dashboard = () => (
  <div>
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader>
          <Title>Total Contacts</Title>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600">328</div>
          <div className="text-sm text-gray-500">+12% from last month</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <Title>Active Projects</Title>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-orange-600">45</div>
          <div className="text-sm text-gray-500">+8% from last month</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <Title>Completed</Title>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">156</div>
          <div className="text-sm text-gray-500">+15% from last month</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <Title>Revenue</Title>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-600">₹2.4Cr</div>
          <div className="text-sm text-gray-500">+22% from last month</div>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <Title>Monthly Contacts</Title>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contactsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="contacts" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Title>Contact Status</Title>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
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
  </div>
)