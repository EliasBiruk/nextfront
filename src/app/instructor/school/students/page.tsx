'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SchoolInstructorStudents() {
  const router = useRouter();

  const students = [
    {
      id: 1,
      name: 'Sarah Johnson',
      class: 'Grade 10A',
      attendance: 95,
      average: 88,
      atRisk: false,
      avatar: '👩'
    },
    {
      id: 2,
      name: 'Abebe Tesfaye',
      class: 'Grade 10A',
      attendance: 78,
      average: 72,
      atRisk: true,
      avatar: '👨'
    },
    {
      id: 3,
      name: 'John Smith',
      class: 'Grade 10B',
      attendance: 92,
      average: 85,
      atRisk: false,
      avatar: '👨'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      class: 'Grade 11A',
      attendance: 98,
      average: 92,
      atRisk: false,
      avatar: '👩'
    },
  ];

  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Students</h1>
        <p className="text-gray-600">View and manage your assigned students</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/school/students" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
          All Students
        </Link>
        <Link href="/instructor/school/students/at-risk" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          At Risk
        </Link>
        <Link href="/instructor/school/students/progress" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Progress
        </Link>
        <Link href="/instructor/school/students/performance" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Performance
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">126</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-green-600 mb-1">94%</div>
            <div className="text-sm text-gray-600">Avg Attendance</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">82%</div>
            <div className="text-sm text-gray-600">Avg Grade</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-red-600 mb-1">12</div>
            <div className="text-sm text-gray-600">At Risk</div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Student List</CardTitle>
          <div className="space-y-4 mt-4">
            {students.map((student) => (
              <div 
                key={student.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                onClick={() => router.push(`/instructor/school/students/profiles?id=${student.id}`)}
              >
                <div className="text-3xl">{student.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{student.name}</h3>
                    {student.atRisk && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        At Risk
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{student.class}</div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-600">
                    <span>📅 Attendance: {student.attendance}%</span>
                    <span>📊 Average: {student.average}%</span>
                  </div>
                </div>
                <div className="text-blue-600">→</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}