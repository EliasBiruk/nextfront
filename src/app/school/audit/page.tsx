import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolAudit() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Audit</h1>
        <p className="text-gray-600">Monitor activity logs, login history, data changes, financial audit, security events, and compliance</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Generate Audit Report</Button>
          <Button variant="outline">Export Logs</Button>
          <Button variant="outline">Security Alert</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Categories</option>
            <option>Activity Logs</option>
            <option>Login History</option>
            <option>Data Changes</option>
            <option>Financial Audit</option>
            <option>Security Events</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Severity</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            <option>Info</option>
          </select>
        </div>
      </div>

      {/* Audit Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">15,450</div>
            <p className="text-gray-600 text-sm">Total Events</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">890</div>
            <p className="text-gray-600 text-sm">Login Events</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">2,450</div>
            <p className="text-gray-600 text-sm">Data Changes</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Security Alerts</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">12</div>
            <p className="text-gray-600 text-sm">High Severity</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold">Activity Logs</div>
            <div className="text-sm text-gray-600">System activity</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🔐</div>
            <div className="font-semibold">Login History</div>
            <div className="text-sm text-gray-600">Access tracking</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="font-semibold">Financial Audit</div>
            <div className="text-sm text-gray-600">Financial tracking</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="font-semibold">Security Events</div>
            <div className="text-sm text-gray-600">Security monitoring</div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Audit Events */}
      <Card>
        <CardBody>
          <CardTitle>Recent Audit Events</CardTitle>
          <div className="space-y-4">
            {[
              {
                type: 'Security Event',
                category: 'Security',
                user: 'admin@springfield.edu',
                action: 'Failed login attempt - Multiple failed attempts',
                timestamp: '2024-08-25 14:32:15',
                severity: 'High',
                ip: '192.168.1.100',
                status: 'Alert'
              },
              {
                type: 'Data Change',
                category: 'Data Changes',
                user: 'principal@springfield.edu',
                action: 'Updated student grade - STU2024001',
                timestamp: '2024-08-25 14:28:42',
                severity: 'Medium',
                ip: '192.168.1.15',
                status: 'Recorded'
              },
              {
                type: 'Login Event',
                category: 'Login History',
                user: 'teacher@springfield.edu',
                action: 'Successful login - Teacher portal',
                timestamp: '2024-08-25 14:25:10',
                severity: 'Low',
                ip: '192.168.1.45',
                status: 'Success'
              },
              {
                type: 'Financial Audit',
                category: 'Financial Audit',
                user: 'finance@springfield.edu',
                action: 'Payment processed - Fee payment $5,000',
                timestamp: '2024-08-25 14:22:33',
                severity: 'Medium',
                ip: '192.168.1.30',
                status: 'Recorded'
              },
              {
                type: 'Activity Log',
                category: 'Activity Logs',
                user: 'admin@springfield.edu',
                action: 'Settings modified - Updated attendance threshold',
                timestamp: '2024-08-25 14:18:55',
                severity: 'Low',
                ip: '192.168.1.10',
                status: 'Recorded'
              },
            ].map((event) => (
              <div key={event.timestamp} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {event.type === 'Security Event' ? '🛡️' : 
                       event.type === 'Data Change' ? '📝' : 
                       event.type === 'Login Event' ? '🔐' : 
                       event.type === 'Financial Audit' ? '💰' : '📋'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{event.type}</h3>
                        <Badge variant="default" size="sm">{event.category}</Badge>
                        <Badge variant={
                          event.severity === 'High' ? 'danger' : 
                          event.severity === 'Medium' ? 'warning' : 'info'
                        }>
                          {event.severity}
                        </Badge>
                        <Badge variant={
                          event.status === 'Alert' ? 'danger' : 
                          event.status === 'Success' ? 'success' : 'default'
                        }>
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{event.action}</p>
                      <p className="text-xs text-gray-400 mt-1">User: {event.user} • IP: {event.ip}</p>
                      <p className="text-xs text-gray-400">Timestamp: {event.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Investigate</Button>
                    <Button variant="outline" size="sm">Export</Button>
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