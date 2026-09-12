import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolEnrollment() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Enrollment</h1>
        <p className="text-gray-600">Manage student enrollment and academic progression</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Enroll Student</Button>
          <Button variant="outline">Bulk Enrollment</Button>
          <Button variant="outline">Import Enrollment</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Academic Year 2024-2025</option>
            <option>Academic Year 2023-2024</option>
            <option>Academic Year 2022-2023</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Grades</option>
            <option>9th Grade</option>
            <option>10th Grade</option>
            <option>11th Grade</option>
            <option>12th Grade</option>
          </select>
        </div>
      </div>

      {/* Enrollment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">2,450</div>
            <p className="text-gray-600 text-sm">Active Enrollment</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">150</div>
            <p className="text-gray-600 text-sm">New Enrollments</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">23</div>
            <p className="text-gray-600 text-sm">Transfers In</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">15</div>
            <p className="text-gray-600 text-sm">Transfers Out</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">8</div>
            <p className="text-gray-600 text-sm">Withdrawals</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">➕</div>
            <div className="font-semibold">Enroll Student</div>
            <div className="text-sm text-gray-600">New enrollment</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold">Active Enrollment</div>
            <div className="text-sm text-gray-600">Current students</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📜</div>
            <div className="font-semibold">Enrollment History</div>
            <div className="text-sm text-gray-600">Past records</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🎓</div>
            <div className="font-semibold">Graduation</div>
            <div className="text-sm text-gray-600">Graduating class</div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Enrollments */}
      <Card>
        <CardBody>
          <CardTitle>Recent Enrollments</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Alice Johnson',
                studentId: 'STU2024050',
                grade: '9th Grade',
                class: 'Class 9-A',
                section: 'Section A',
                enrollmentDate: '2024-08-25',
                academicYear: '2024-2025',
                status: 'Active',
                enrollmentType: 'New Admission'
              },
              {
                name: 'Bob Smith',
                studentId: 'STU2024051',
                grade: '10th Grade',
                class: 'Class 10-B',
                section: 'Section B',
                enrollmentDate: '2024-08-24',
                academicYear: '2024-2025',
                status: 'Active',
                enrollmentType: 'Transfer In'
              },
              {
                name: 'Carol Williams',
                studentId: 'STU2024052',
                grade: '11th Grade',
                class: 'Class 11-A',
                section: 'Section A',
                enrollmentDate: '2024-08-23',
                academicYear: '2024-2025',
                status: 'Active',
                enrollmentType: 'Promotion'
              },
              {
                name: 'David Brown',
                studentId: 'STU2024053',
                grade: '12th Grade',
                class: 'Class 12-A',
                section: 'Section A',
                enrollmentDate: '2024-08-22',
                academicYear: '2024-2025',
                status: 'Active',
                enrollmentType: 'Promotion'
              },
              {
                name: 'Emma Davis',
                studentId: 'STU2024054',
                grade: '9th Grade',
                class: 'Class 9-C',
                section: 'Section C',
                enrollmentDate: '2024-08-21',
                academicYear: '2024-2025',
                status: 'Pending',
                enrollmentType: 'New Admission'
              },
            ].map((enrollment) => (
              <div key={enrollment.studentId} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {enrollment.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{enrollment.name}</h3>
                        <Badge variant={enrollment.status === 'Active' ? 'success' : 'warning'}>
                          {enrollment.status}
                        </Badge>
                        <Badge variant="default" size="sm">{enrollment.enrollmentType}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{enrollment.grade} • {enrollment.class} • {enrollment.section}</p>
                      <p className="text-xs text-gray-400 mt-1">ID: {enrollment.studentId} • Enrolled: {enrollment.enrollmentDate}</p>
                      <p className="text-xs text-gray-400">Academic Year: {enrollment.academicYear}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button variant="outline" size="sm">Edit Enrollment</Button>
                    <Button variant="outline" size="sm">Documents</Button>
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