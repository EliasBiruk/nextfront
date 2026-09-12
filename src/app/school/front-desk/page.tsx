import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolFrontDesk() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Front Desk</h1>
        <p className="text-gray-600">Manage visitors, visitor log, appointments, check-in/check-out, and deliveries</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Check In Visitor</Button>
          <Button variant="outline">Schedule Appointment</Button>
          <Button variant="outline">Log Delivery</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Types</option>
            <option>Visitors</option>
            <option>Appointments</option>
            <option>Deliveries</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Checked In</option>
            <option>Checked Out</option>
            <option>Scheduled</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Front Desk Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">156</div>
            <p className="text-gray-600 text-sm">Visitors Today</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">23</div>
            <p className="text-gray-600 text-sm">Currently Checked In</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Appointments</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">12</div>
            <p className="text-gray-600 text-sm">Deliveries</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">8</div>
            <p className="text-gray-600 text-sm">Pending Check-ins</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👤</div>
            <div className="font-semibold">Visitors</div>
            <div className="text-sm text-gray-600">Visitor management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold">Visitor Log</div>
            <div className="text-sm text-gray-600">Visitor history</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="font-semibold">Appointments</div>
            <div className="text-sm text-gray-600">Appointment scheduling</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📦</div>
            <div className="font-semibold">Deliveries</div>
            <div className="text-sm text-gray-600">Package management</div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Front Desk Activity */}
      <Card>
        <CardBody>
          <CardTitle>Recent Front Desk Activity</CardTitle>
          <div className="space-y-4">
            {[
              {
                type: 'Visitor Check-in',
                name: 'John Parent',
                purpose: 'Parent Meeting with Principal',
                checkInTime: '2024-08-25 09:30 AM',
                status: 'Checked In',
                host: 'Principal Office',
                badgeNumber: 'VIS-2024-0825-001'
              },
              {
                type: 'Appointment',
                name: 'Dr. Smith - Board Member',
                purpose: 'Monthly Board Meeting',
                checkInTime: '2024-08-25 10:00 AM',
                status: 'Scheduled',
                host: 'Conference Room A',
                badgeNumber: 'N/A'
              },
              {
                type: 'Delivery',
                name: 'Office Supplies Delivery',
                purpose: 'Supply Drop-off',
                checkInTime: '2024-08-25 08:45 AM',
                status: 'Completed',
                host: 'Administration',
                badgeNumber: 'DEL-2024-0825-001'
              },
              {
                type: 'Visitor Check-out',
                name: 'Sarah Johnson - Educational Consultant',
                purpose: 'Curriculum Review',
                checkInTime: '2024-08-25 11:30 AM',
                status: 'Checked Out',
                host: 'Academic Affairs',
                badgeNumber: 'VIS-2024-0825-002'
              },
              {
                type: 'Visitor Check-in',
                name: 'Mike Contractor',
                purpose: 'Building Maintenance',
                checkInTime: '2024-08-25 12:15 PM',
                status: 'Checked In',
                host: 'Facilities Manager',
                badgeNumber: 'VIS-2024-0825-003'
              },
            ].map((activity) => (
              <div key={activity.badgeNumber} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {activity.type === 'Visitor Check-in' ? '👤' : 
                       activity.type === 'Visitor Check-out' ? '🚪' : 
                       activity.type === 'Appointment' ? '📅' : 
                       activity.type === 'Delivery' ? '📦' : '📋'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{activity.type}</h3>
                        <Badge variant={
                          activity.status === 'Checked In' ? 'success' : 
                          activity.status === 'Checked Out' ? 'info' : 
                          activity.status === 'Completed' ? 'success' : 'warning'
                        }>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{activity.name} • {activity.purpose}</p>
                      <p className="text-xs text-gray-400 mt-1">Host: {activity.host} • Badge: {activity.badgeNumber}</p>
                      <p className="text-xs text-gray-400">Time: {activity.checkInTime}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Update</Button>
                    <Button variant="outline" size="sm">Check Out</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}