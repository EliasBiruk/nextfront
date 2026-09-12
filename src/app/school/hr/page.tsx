import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolHR() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Human Resources</h1>
        <p className="text-gray-600">Manage employees, contracts, leave, payroll, and performance</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Add Employee</Button>
          <Button variant="outline">Post Job Opening</Button>
          <Button variant="outline">Process Payroll</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Departments</option>
            <option>Teaching</option>
            <option>Administration</option>
            <option>Support Staff</option>
            <option>Maintenance</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Employment Types</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Temporary</option>
          </select>
        </div>
      </div>

      {/* HR Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">252</div>
            <p className="text-gray-600 text-sm">Total Employees</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">180</div>
            <p className="text-gray-600 text-sm">Teachers</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">72</div>
            <p className="text-gray-600 text-sm">Staff</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">8</div>
            <p className="text-gray-600 text-sm">On Leave</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">5</div>
            <p className="text-gray-600 text-sm">Open Positions</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="font-semibold">Employees</div>
            <div className="text-sm text-gray-600">Employee management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold">Leave Management</div>
            <div className="text-sm text-gray-600">Leave requests</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="font-semibold">Payroll</div>
            <div className="text-sm text-gray-600">Salary management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🔍</div>
            <div className="font-semibold">Recruitment</div>
            <div className="text-sm text-gray-600">Job openings</div>
          </CardBody>
        </Card>
      </div>

      {/* Employee Directory */}
      <Card>
        <CardBody>
          <CardTitle>Employee Directory</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Dr. Sarah Johnson',
                employeeId: 'EMP2024001',
                department: 'Administration',
                position: 'Principal',
                employmentType: 'Full-time',
                status: 'Active',
                hireDate: '2010-08-01',
                salary: 85000,
                leaveBalance: 15
              },
              {
                name: 'Prof. Michael Chen',
                employeeId: 'EMP2024002',
                department: 'Science Department',
                position: 'Science Teacher',
                employmentType: 'Full-time',
                status: 'Active',
                hireDate: '2018-09-01',
                salary: 65000,
                leaveBalance: 12
              },
              {
                name: 'Ms. Elizabeth Brown',
                employeeId: 'EMP2024003',
                department: 'English Department',
                position: 'English Teacher',
                employmentType: 'Full-time',
                status: 'Active',
                hireDate: '2019-07-01',
                salary: 62000,
                leaveBalance: 10
              },
              {
                name: 'Mr. Robert Davis',
                employeeId: 'EMP2024004',
                department: 'Social Studies Department',
                position: 'History Teacher',
                employmentType: 'Full-time',
                status: 'On Leave',
                hireDate: '2017-08-20',
                salary: 60000,
                leaveBalance: 20
              },
              {
                name: 'Ms. Amanda Taylor',
                employeeId: 'EMP2024005',
                department: 'HR Department',
                position: 'HR Manager',
                employmentType: 'Full-time',
                status: 'Active',
                hireDate: '2020-06-01',
                salary: 70000,
                leaveBalance: 14
              },
              {
                name: 'Mr. Christopher Brown',
                employeeId: 'EMP2024006',
                department: 'Finance Department',
                position: 'Finance Manager',
                employmentType: 'Full-time',
                status: 'Active',
                hireDate: '2019-08-01',
                salary: 72000,
                leaveBalance: 11
              },
            ].map((employee) => (
              <div key={employee.employeeId} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{employee.name}</h3>
                        <Badge variant={employee.status === 'Active' ? 'success' : 'warning'}>
                          {employee.status}
                        </Badge>
                        <Badge variant="default" size="sm">{employee.employmentType}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{employee.position} • {employee.department}</p>
                      <p className="text-xs text-gray-400 mt-1">ID: {employee.employeeId} • Hired: {employee.hireDate}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Salary: <span className="font-semibold">${employee.salary.toLocaleString()}</span></span>
                        <span className="text-gray-600">Leave Balance: <span className="font-semibold">{employee.leaveBalance} days</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Profile</Button>
                    <Button variant="outline" size="sm">Contract</Button>
                    <Button variant="outline" size="sm">Leave</Button>
                    <Button variant="outline" size="sm">Performance</Button>
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