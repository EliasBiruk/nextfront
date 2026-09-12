import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolAdministrators() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Administrators</h1>
        <p className="text-gray-600">Manage school administrators and their permissions</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Add Administrator</Button>
          <Button variant="outline">Import Administrators</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Roles</option>
            <option>Principal</option>
            <option>Vice Principal</option>
            <option>Department Head</option>
            <option>Coordinator</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Administrator Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">8</div>
            <p className="text-gray-600 text-sm">Total Administrators</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">7</div>
            <p className="text-gray-600 text-sm">Active</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">5</div>
            <p className="text-gray-600 text-sm">Departments</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">3</div>
            <p className="text-gray-600 text-sm">Management Levels</p>
          </CardBody>
        </Card>
      </div>

      {/* Administrators List */}
      <Card>
        <CardBody>
          <CardTitle>Administrator Directory</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Dr. Sarah Johnson',
                employeeId: 'ADM2024001',
                role: 'Principal',
                department: 'Administration',
                responsibilities: ['Overall School Management', 'Strategic Planning', 'Staff Supervision'],
                email: 'principal@springfieldacademy.edu',
                phone: '+1 (555) 100-0000',
                status: 'Active',
                hireDate: '2010-08-01',
                accessLevel: 'Full'
              },
              {
                name: 'Mr. Michael Thompson',
                employeeId: 'ADM2024002',
                role: 'Vice Principal',
                department: 'Academic Affairs',
                responsibilities: ['Academic Programs', 'Curriculum Development', 'Teacher Evaluation'],
                email: 'vprincipal@springfieldacademy.edu',
                phone: '+1 (555) 100-0001',
                status: 'Active',
                hireDate: '2015-07-15',
                accessLevel: 'High'
              },
              {
                name: 'Ms. Patricia Martinez',
                employeeId: 'ADM2024003',
                role: 'Vice Principal',
                department: 'Student Affairs',
                responsibilities: ['Student Welfare', 'Discipline', 'Attendance'],
                email: 'studentaffairs@springfieldacademy.edu',
                phone: '+1 (555) 100-0002',
                status: 'Active',
                hireDate: '2018-06-01',
                accessLevel: 'High'
              },
              {
                name: 'Dr. James Wilson',
                employeeId: 'ADM2024004',
                role: 'Department Head',
                department: 'Science Department',
                responsibilities: ['Science Curriculum', 'Science Teachers', 'Lab Management'],
                email: 'jwilson@springfieldacademy.edu',
                phone: '+1 (555) 100-0003',
                status: 'Active',
                hireDate: '2017-08-20',
                accessLevel: 'Medium'
              },
              {
                name: 'Mrs. Emily Chen',
                employeeId: 'ADM2024005',
                role: 'Academic Coordinator',
                department: 'Academic Affairs',
                responsibilities: ['Class Scheduling', 'Exam Coordination', 'Grade Management'],
                email: 'echen@springfieldacademy.edu',
                phone: '+1 (555) 100-0004',
                status: 'Active',
                hireDate: '2019-07-01',
                accessLevel: 'Medium'
              },
              {
                name: 'Mr. Robert Davis',
                employeeId: 'ADM2024006',
                role: 'Department Head',
                department: 'Mathematics Department',
                responsibilities: ['Math Curriculum', 'Math Teachers', 'Assessment'],
                email: 'rdavis@springfieldacademy.edu',
                phone: '+1 (555) 100-0005',
                status: 'On Leave',
                hireDate: '2016-08-15',
                accessLevel: 'Medium'
              },
              {
                name: 'Ms. Amanda Taylor',
                employeeId: 'ADM2024007',
                role: 'HR Manager',
                department: 'Human Resources',
                responsibilities: ['Staff Recruitment', 'Employee Relations', 'Payroll'],
                email: 'hr@springfieldacademy.edu',
                phone: '+1 (555) 100-0006',
                status: 'Active',
                hireDate: '2020-06-01',
                accessLevel: 'High'
              },
              {
                name: 'Mr. Christopher Brown',
                employeeId: 'ADM2024008',
                role: 'Finance Manager',
                department: 'Finance',
                responsibilities: ['Budget Management', 'Fee Collection', 'Financial Reporting'],
                email: 'finance@springfieldacademy.edu',
                phone: '+1 (555) 100-0007',
                status: 'Active',
                hireDate: '2019-08-01',
                accessLevel: 'High'
              },
            ].map((admin) => (
              <div key={admin.employeeId} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {admin.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{admin.name}</h3>
                        <Badge variant={
                          admin.accessLevel === 'Full' ? 'danger' : 
                          admin.accessLevel === 'High' ? 'warning' : 'info'
                        }>
                          {admin.accessLevel} Access
                        </Badge>
                        <Badge variant={admin.status === 'Active' ? 'success' : 'warning'}>
                          {admin.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{admin.role} • {admin.department}</p>
                      <p className="text-xs text-gray-400 mt-1">ID: {admin.employeeId} • Hired: {admin.hireDate}</p>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Responsibilities:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {admin.responsibilities.map((resp) => (
                            <Badge key={resp} variant="default" size="sm">{resp}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>📧 {admin.email}</span>
                        <span>📞 {admin.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Profile</Button>
                    <Button variant="outline" size="sm">Permissions</Button>
                    <Button variant="outline" size="sm">Activity</Button>
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