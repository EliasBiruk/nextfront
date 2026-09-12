import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolInstructors() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Instructors / Teachers</h1>
        <p className="text-gray-600">Manage teaching staff and their academic responsibilities</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Add Instructor</Button>
          <Button variant="outline">Import Instructors</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Departments</option>
            <option>Science</option>
            <option>Mathematics</option>
            <option>English</option>
            <option>Social Studies</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Instructor Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">180</div>
            <p className="text-gray-600 text-sm">Total Instructors</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">165</div>
            <p className="text-gray-600 text-sm">Active</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
            <p className="text-gray-600 text-sm">Departments</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Classes Assigned</p>
          </CardBody>
        </Card>
      </div>

      {/* Instructors List */}
      <Card>
        <CardBody>
          <CardTitle>Instructor Directory</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Dr. Michael Chen',
                employeeId: 'EMP2024001',
                department: 'Science Department',
                subject: 'Physics',
                classes: ['10-A', '11-B', '12-A'],
                email: 'mchen@springfieldacademy.edu',
                phone: '+1 (555) 111-2222',
                status: 'Active',
                hireDate: '2018-09-01'
              },
              {
                name: 'Prof. Sarah Williams',
                employeeId: 'EMP2024002',
                department: 'Mathematics Department',
                subject: 'Calculus',
                classes: ['11-A', '12-B', '12-C'],
                email: 'swilliams@springfieldacademy.edu',
                phone: '+1 (555) 222-3333',
                status: 'Active',
                hireDate: '2015-08-15'
              },
              {
                name: 'Ms. Elizabeth Brown',
                employeeId: 'EMP2024003',
                department: 'English Department',
                subject: 'Literature',
                classes: ['9-A', '9-B', '10-C'],
                email: 'ebrown@springfieldacademy.edu',
                phone: '+1 (555) 333-4444',
                status: 'Active',
                hireDate: '2019-07-01'
              },
              {
                name: 'Mr. Robert Davis',
                employeeId: 'EMP2024004',
                department: 'Social Studies Department',
                subject: 'History',
                classes: ['10-B', '11-A', '11-C'],
                email: 'rdavis@springfieldacademy.edu',
                phone: '+1 (555) 444-5555',
                status: 'On Leave',
                hireDate: '2017-08-20'
              },
              {
                name: 'Dr. James Wilson',
                employeeId: 'EMP2024005',
                department: 'Computer Science Department',
                subject: 'Programming',
                classes: ['10-A', '11-B', '12-A'],
                email: 'jwilson@springfieldacademy.edu',
                phone: '+1 (555) 555-6666',
                status: 'Active',
                hireDate: '2020-06-01'
              },
            ].map((instructor) => (
              <div key={instructor.employeeId} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {instructor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{instructor.name}</h3>
                        <Badge variant={instructor.status === 'Active' ? 'success' : 'warning'}>
                          {instructor.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{instructor.department}</p>
                      <p className="text-sm text-gray-500">Subject: {instructor.subject}</p>
                      <p className="text-xs text-gray-400 mt-1">ID: {instructor.employeeId} • Hired: {instructor.hireDate}</p>
                      <div className="flex gap-2 mt-2">
                        {instructor.classes.map((cls) => (
                          <Badge key={cls} variant="default" size="sm">{cls}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>📧 {instructor.email}</span>
                        <span>📞 {instructor.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Profile</Button>
                    <Button variant="outline" size="sm">Classes</Button>
                    <Button variant="outline" size="sm">Schedule</Button>
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