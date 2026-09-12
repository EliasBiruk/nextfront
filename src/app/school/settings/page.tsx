import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolSettings() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure school settings, permissions, and system preferences</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>Save All Changes</Button>
          <Button variant="outline">Reset to Defaults</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Categories</option>
            <option>School Settings</option>
            <option>Academic Settings</option>
            <option>Attendance Settings</option>
            <option>Grading Settings</option>
            <option>Examination Settings</option>
            <option>Finance Settings</option>
            <option>Notification Settings</option>
            <option>Role & Permissions</option>
            <option>Integrations</option>
            <option>Data Management</option>
            <option>Security</option>
          </select>
        </div>
      </div>

      {/* Settings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">
                🏫
              </div>
              <div>
                <h3 className="font-semibold">School Settings</h3>
                <p className="text-sm text-gray-600">Basic school configuration</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-2xl">
                📚
              </div>
              <div>
                <h3 className="font-semibold">Academic Settings</h3>
                <p className="text-sm text-gray-600">Academic year and curriculum</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-2xl">
                📅
              </div>
              <div>
                <h3 className="font-semibold">Attendance Settings</h3>
                <p className="text-sm text-gray-600">Attendance policies and rules</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center text-2xl">
                📊
              </div>
              <div>
                <h3 className="font-semibold">Grading Settings</h3>
                <p className="text-sm text-gray-600">Grade scales and policies</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center text-2xl">
                📝
              </div>
              <div>
                <h3 className="font-semibold">Examination Settings</h3>
                <p className="text-sm text-gray-600">Exam rules and schedules</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center text-2xl">
                💰
              </div>
              <div>
                <h3 className="font-semibold">Finance Settings</h3>
                <p className="text-sm text-gray-600">Fee structures and billing</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center text-2xl">
                🔔
              </div>
              <div>
                <h3 className="font-semibold">Notification Settings</h3>
                <p className="text-sm text-gray-600">Alerts and notifications</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h3 className="font-semibold">Role & Permissions</h3>
                <p className="text-sm text-gray-600">User roles and access control</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center text-2xl">
                🔗
              </div>
              <div>
                <h3 className="font-semibold">Integrations</h3>
                <p className="text-sm text-gray-600">Third-party services</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center text-2xl">
                💾
              </div>
              <div>
                <h3 className="font-semibold">Data Management</h3>
                <p className="text-sm text-gray-600">Import, export, and backup</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                🔒
              </div>
              <div>
                <h3 className="font-semibold">Security</h3>
                <p className="text-sm text-gray-600">Security and privacy</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Changes */}
      <Card>
        <CardBody>
          <CardTitle>Recent Settings Changes</CardTitle>
          <div className="space-y-4">
            {[
              {
                category: 'Academic Settings',
                change: 'Updated academic year 2024-2025 dates',
                user: 'Principal Office',
                date: '2024-08-25',
                status: 'Active'
              },
              {
                category: 'Grading Settings',
                change: 'Modified GPA calculation method',
                user: 'Academic Coordinator',
                date: '2024-08-24',
                status: 'Active'
              },
              {
                category: 'Role & Permissions',
                change: 'Added new role: Department Head',
                user: 'HR Manager',
                date: '2024-08-23',
                status: 'Active'
              },
              {
                category: 'Notification Settings',
                change: 'Changed email notification frequency',
                user: 'System Admin',
                date: '2024-08-22',
                status: 'Active'
              },
              {
                category: 'Security',
                change: 'Updated password policy requirements',
                user: 'IT Administrator',
                date: '2024-08-21',
                status: 'Active'
              },
            ].map((change) => (
              <div key={change.change} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      ⚙️
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{change.category}</h3>
                        <Badge variant="success">{change.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{change.change}</p>
                      <p className="text-xs text-gray-400 mt-1">Changed by: {change.user} • Date: {change.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Revert</Button>
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