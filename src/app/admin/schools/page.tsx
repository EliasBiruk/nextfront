'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';

export default function AdminSchools() {
  const schoolStats = {
    totalSchools: 156,
    activeSchools: 142,
    pendingApplications: 8,
    inactiveSchools: 6
  };

  const schools = [
    {
      id: 1,
      name: 'Springfield Academy',
      location: 'Springfield, IL',
      students: 2450,
      plan: 'Premium',
      status: 'Active',
      joined: 'Jan 2025',
      revenue: 59900
    },
    {
      id: 2,
      name: 'Lincoln High School',
      location: 'Lincoln, NE',
      students: 1890,
      plan: 'Standard',
      status: 'Active',
      joined: 'Mar 2025',
      revenue: 29900
    },
    {
      id: 3,
      name: 'Washington International',
      location: 'Washington, DC',
      students: 3200,
      plan: 'Enterprise',
      status: 'Active',
      joined: 'Feb 2025',
      revenue: 89900
    },
    {
      id: 4,
      name: 'Jefferson Elementary',
      location: 'Jefferson City, MO',
      students: 890,
      plan: 'Basic',
      status: 'Pending',
      joined: 'Sep 2026',
      revenue: 0
    },
    {
      id: 5,
      name: 'Roosevelt Middle School',
      location: 'Roosevelt, NY',
      students: 1250,
      plan: 'Standard',
      status: 'Active',
      joined: 'Apr 2025',
      revenue: 29900
    }
  ];

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-700';
      case 'Premium': return 'bg-blue-100 text-blue-700';
      case 'Standard': return 'bg-green-100 text-green-700';
      case 'Basic': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Pending': return 'warning';
      case 'Inactive': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="admin" userName="Administrator" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">School Management</h1>
              <p className="text-gray-600">Manage partner schools and institutions</p>
            </div>

            {/* School Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardBody>
                  <div className="text-3xl font-bold mb-1">{schoolStats.totalSchools}</div>
                  <div className="text-blue-100 text-sm">Total Schools</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardBody>
                  <div className="text-3xl font-bold mb-1">{schoolStats.activeSchools}</div>
                  <div className="text-green-100 text-sm">Active</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                <CardBody>
                  <div className="text-3xl font-bold mb-1">{schoolStats.pendingApplications}</div>
                  <div className="text-orange-100 text-sm">Pending</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
                <CardBody>
                  <div className="text-3xl font-bold mb-1">{schoolStats.inactiveSchools}</div>
                  <div className="text-red-100 text-sm">Inactive</div>
                </CardBody>
              </Card>
            </div>

            {/* School Directory */}
            <Card>
              <CardBody>
                <CardTitle>School Directory</CardTitle>
                <div className="mt-4 space-y-4">
                  {schools.map((school) => (
                    <div key={school.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{school.name}</h3>
                            <Badge variant={getStatusColor(school.status)}>
                              {school.status}
                            </Badge>
                            <span className={`px-2 py-1 text-xs rounded-full ${getPlanColor(school.plan)}`}>
                              {school.plan}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{school.location}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                            <span>👥 {school.students.toLocaleString()} students</span>
                            <span>📅 Joined {school.joined}</span>
                            <span>💰 ${school.revenue.toLocaleString()} revenue</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition mb-2">
                            View Details
                          </button>
                          <br />
                          <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition">
                            Manage
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}