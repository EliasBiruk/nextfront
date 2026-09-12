import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolDepartments() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Departments</h1>
        <p className="text-gray-600">Manage school departments and organizational structure</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Add Department</Button>
          <Button variant="outline">Import Departments</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">📊</Button>
          <Button variant="outline" size="sm">📋</Button>
        </div>
      </div>

      {/* Department Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">12</div>
            <p className="text-gray-600 text-sm">Total Departments</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">180</div>
            <p className="text-gray-600 text-sm">Total Teachers</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Total Classes</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">8</div>
            <p className="text-gray-600 text-sm">Department Heads</p>
          </CardBody>
        </Card>
      </div>

      {/* Departments List */}
      <Card>
        <CardBody>
          <CardTitle>Department Directory</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Science Department',
                head: 'Dr. Michael Chen',
                teachers: 24,
                classes: 8,
                subjects: ['Physics', 'Chemistry', 'Biology'],
                status: 'Active'
              },
              {
                name: 'Mathematics Department',
                head: 'Prof. Sarah Williams',
                teachers: 18,
                classes: 10,
                subjects: ['Algebra', 'Geometry', 'Calculus'],
                status: 'Active'
              },
              {
                name: 'English Department',
                head: 'Ms. Elizabeth Brown',
                teachers: 20,
                classes: 12,
                subjects: ['Literature', 'Writing', 'Grammar'],
                status: 'Active'
              },
              {
                name: 'Social Studies Department',
                head: 'Mr. Robert Davis',
                teachers: 15,
                classes: 8,
                subjects: ['History', 'Geography', 'Civics'],
                status: 'Active'
              },
              {
                name: 'Computer Science Department',
                head: 'Dr. James Wilson',
                teachers: 12,
                classes: 6,
                subjects: ['Programming', 'Web Development', 'Database'],
                status: 'Active'
              },
              {
                name: 'Arts Department',
                head: 'Ms. Amanda Taylor',
                teachers: 16,
                classes: 10,
                subjects: ['Visual Arts', 'Music', 'Drama'],
                status: 'Active'
              },
              {
                name: 'Physical Education Department',
                head: 'Coach John Martinez',
                teachers: 14,
                classes: 12,
                subjects: ['Sports', 'Health', 'Fitness'],
                status: 'Active'
              },
              {
                name: 'Languages Department',
                head: 'Dr. Maria Garcia',
                teachers: 18,
                classes: 8,
                subjects: ['Spanish', 'French', 'German'],
                status: 'Active'
              },
            ].map((dept) => (
              <div key={dept.name} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {dept.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold">{dept.name}</h3>
                      <p className="text-sm text-gray-600">Head: {dept.head}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>{dept.teachers} teachers</span>
                        <span>{dept.classes} classes</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {dept.subjects.map((subject) => (
                          <Badge key={subject} variant="default" size="sm">{subject}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={dept.status === 'Active' ? 'success' : 'warning'}>
                      {dept.status}
                    </Badge>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
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