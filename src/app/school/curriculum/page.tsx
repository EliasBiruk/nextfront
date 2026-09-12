import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolCurriculum() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Curriculum</h1>
        <p className="text-gray-600">Manage curriculum programs, subjects, units, and learning outcomes</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Create Program</Button>
          <Button variant="outline">Add Subject</Button>
          <Button variant="outline">Curriculum Mapping</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Programs</option>
            <option>STEM Program</option>
            <option>Arts Program</option>
            <option>Business Program</option>
            <option>General Program</option>
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

      {/* Curriculum Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">8</div>
            <p className="text-gray-600 text-sm">Programs</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">42</div>
            <p className="text-gray-600 text-sm">Subjects</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">156</div>
            <p className="text-gray-600 text-sm">Units</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">580</div>
            <p className="text-gray-600 text-sm">Lessons</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">92%</div>
            <p className="text-gray-600 text-sm">Coverage</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-semibold">Programs</div>
            <div className="text-sm text-gray-600">Curriculum programs</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📖</div>
            <div className="font-semibold">Subjects</div>
            <div className="text-sm text-gray-600">Subject management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="font-semibold">Units & Lessons</div>
            <div className="text-sm text-gray-600">Content structure</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-semibold">Learning Outcomes</div>
            <div className="text-sm text-gray-600">Outcome tracking</div>
          </CardBody>
        </Card>
      </div>

      {/* Curriculum Programs */}
      <Card>
        <CardBody>
          <CardTitle>Curriculum Programs</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'STEM Program',
                description: 'Science, Technology, Engineering, and Mathematics focus',
                gradeLevel: '9-12',
                subjects: 12,
                units: 45,
                status: 'Active',
                coordinator: 'Dr. Chen'
              },
              {
                name: 'Arts Program',
                description: 'Visual Arts, Music, Drama, and Creative Writing',
                gradeLevel: '9-12',
                subjects: 8,
                units: 32,
                status: 'Active',
                coordinator: 'Ms. Brown'
              },
              {
                name: 'Business Program',
                description: 'Economics, Business Studies, and Entrepreneurship',
                gradeLevel: '11-12',
                subjects: 6,
                units: 24,
                status: 'Active',
                coordinator: 'Mr. Davis'
              },
              {
                name: 'General Program',
                description: 'Comprehensive education across all subjects',
                gradeLevel: '9-12',
                subjects: 16,
                units: 55,
                status: 'Active',
                coordinator: 'Prof. Williams'
              },
            ].map((program) => (
              <div key={program.name} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      📚
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{program.name}</h3>
                        <Badge variant="success">{program.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{program.description}</p>
                      <p className="text-xs text-gray-400 mt-1">Grade Level: {program.gradeLevel} • Coordinator: {program.coordinator}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Subjects: <span className="font-semibold">{program.subjects}</span></span>
                        <span className="text-gray-600">Units: <span className="font-semibold">{program.units}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Map</Button>
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