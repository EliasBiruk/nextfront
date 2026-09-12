'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

export default function AdminAnalytics() {
  const platformStats = {
    totalUsers: 15420,
    activeUsers: 8934,
    totalCourses: 342,
    totalSchools: 156,
    revenue: 284500,
    growth: 23
  };

  const metrics = [
    { name: 'User Engagement', value: '78%', change: '+5%', trend: 'up' },
    { name: 'Course Completion', value: '65%', change: '+8%', trend: 'up' },
    { name: 'School Retention', value: '92%', change: '+2%', trend: 'up' },
    { name: 'Avg Session Time', value: '24m', change: '+3m', trend: 'up' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="admin" userName="Administrator" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Platform Analytics</h1>
              <p className="text-gray-600">View platform-wide performance metrics</p>
            </div>

            {/* Platform Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardBody>
                  <div className="text-2xl font-bold mb-1">{platformStats.totalUsers.toLocaleString()}</div>
                  <div className="text-blue-100 text-sm">Total Users</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardBody>
                  <div className="text-2xl font-bold mb-1">{platformStats.activeUsers.toLocaleString()}</div>
                  <div className="text-green-100 text-sm">Active Users</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardBody>
                  <div className="text-2xl font-bold mb-1">{platformStats.totalCourses}</div>
                  <div className="text-purple-100 text-sm">Courses</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                <CardBody>
                  <div className="text-2xl font-bold mb-1">{platformStats.totalSchools}</div>
                  <div className="text-orange-100 text-sm">Schools</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0">
                <CardBody>
                  <div className="text-2xl font-bold mb-1">${(platformStats.revenue / 1000).toFixed(0)}K</div>
                  <div className="text-teal-100 text-sm">Revenue</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
                <CardBody>
                  <div className="text-2xl font-bold mb-1">+{platformStats.growth}%</div>
                  <div className="text-pink-100 text-sm">Growth</div>
                </CardBody>
              </Card>
            </div>

            {/* Key Metrics */}
            <Card className="mb-8">
              <CardBody>
                <CardTitle>Key Performance Metrics</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                  {metrics.map((metric) => (
                    <div key={metric.name} className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{metric.name}</div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                      <div className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Analytics Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardBody>
                  <CardTitle>User Growth</CardTitle>
                  <div className="mt-4 h-48 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📈</div>
                      <div>User growth chart visualization</div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle>Revenue Trends</CardTitle>
                  <div className="mt-4 h-48 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">💰</div>
                      <div>Revenue trends visualization</div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle>Course Performance</CardTitle>
                  <div className="mt-4 h-48 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📚</div>
                      <div>Course performance metrics</div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle>School Activity</CardTitle>
                  <div className="mt-4 h-48 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🏫</div>
                      <div>School activity overview</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}