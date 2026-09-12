import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolCourses() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Courses</h1>
        <p className="text-gray-600">Manage school courses, JoyEdu courses, and course enrollments</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Create Course</Button>
          <Button variant="outline">Assign Course</Button>
          <Button variant="outline">Import from JoyEdu</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Types</option>
            <option>School Courses</option>
            <option>JoyEdu Courses</option>
            <option>Assigned Courses</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">68</div>
            <p className="text-gray-600 text-sm">Total Courses</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">42</div>
            <p className="text-gray-600 text-sm">School Courses</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">26</div>
            <p className="text-gray-600 text-sm">JoyEdu Courses</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">1,850</div>
            <p className="text-gray-600 text-sm">Enrollments</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">56</div>
            <p className="text-gray-600 text-sm">Active</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🏫</div>
            <div className="font-semibold">School Courses</div>
            <div className="text-sm text-gray-600">Internal courses</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🎓</div>
            <div className="font-semibold">JoyEdu Courses</div>
            <div className="text-sm text-gray-600">Platform courses</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold">Course Catalog</div>
            <div className="text-sm text-gray-600">Browse courses</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="font-semibold">Enrollments</div>
            <div className="text-sm text-gray-600">Student enrollments</div>
          </CardBody>
        </Card>
      </div>

      {/* Course List */}
      <Card>
        <CardBody>
          <CardTitle>Course Catalog</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Advanced Mathematics',
                code: 'MATH-301',
                type: 'School Course',
                instructor: 'Prof. Williams',
                gradeLevel: '11-12',
                enrollments: 45,
                status: 'Active',
                duration: '16 weeks',
                credits: 4
              },
              {
                name: 'Physics Fundamentals',
                code: 'PHYS-201',
                type: 'School Course',
                instructor: 'Dr. Chen',
                gradeLevel: '10-11',
                enrollments: 38,
                status: 'Active',
                duration: '12 weeks',
                credits: 3
              },
              {
                name: 'Introduction to Computer Science',
                code: 'CS-101',
                type: 'JoyEdu Course',
                instructor: 'Dr. Wilson',
                gradeLevel: '9-12',
                enrollments: 120,
                status: 'Active',
                duration: '8 weeks',
                credits: 2
              },
              {
                name: 'English Literature',
                code: 'ENG-202',
                type: 'School Course',
                instructor: 'Ms. Brown',
                gradeLevel: '10-11',
                enrollments: 52,
                status: 'Active',
                duration: '14 weeks',
                credits: 3
              },
              {
                name: 'World History',
                code: 'HIST-301',
                type: 'JoyEdu Course',
                instructor: 'Mr. Davis',
                gradeLevel: '11-12',
                enrollments: 85,
                status: 'Active',
                duration: '10 weeks',
                credits: 3
              },
            ].map((course) => (
              <div key={course.code} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      📚
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{course.name}</h3>
                        <Badge variant={course.type === 'School Course' ? 'info' : 'success'}>
                          {course.type}
                        </Badge>
                        <Badge variant="success">{course.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Code: {course.code} • {course.gradeLevel}</p>
                      <p className="text-xs text-gray-400 mt-1">Instructor: {course.instructor} • Duration: {course.duration}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Enrollments: <span className="font-semibold">{course.enrollments}</span></span>
                        <span className="text-gray-600">Credits: <span className="font-semibold">{course.credits}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Enrollments</Button>
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