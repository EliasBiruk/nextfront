'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SchoolInstructorClasses() {
  const router = useRouter();

  const classes = [
    {
      id: 1,
      name: 'Grade 10A',
      subject: 'Mathematics',
      students: 32,
      schedule: 'Mon, Wed, Fri 08:00-09:00',
      room: 'Room 201',
      progress: 78,
      avatar: '🏫'
    },
    {
      id: 2,
      name: 'Grade 10B',
      subject: 'Mathematics',
      students: 30,
      schedule: 'Tue, Thu 10:00-11:00',
      room: 'Room 201',
      progress: 65,
      avatar: '🏫'
    },
    {
      id: 3,
      name: 'Grade 11A',
      subject: 'Mathematics',
      students: 28,
      schedule: 'Mon, Wed, Fri 13:00-14:00',
      room: 'Room 201',
      progress: 82,
      avatar: '🏫'
    },
    {
      id: 4,
      name: 'Grade 11B',
      subject: 'Mathematics',
      students: 36,
      schedule: 'Tue, Thu 14:00-15:00',
      room: 'Room 201',
      progress: 71,
      avatar: '🏫'
    },
  ];

  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Classes</h1>
        <p className="text-gray-600">Manage your assigned classes and sections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">4</div>
            <div className="text-sm text-gray-600">Total Classes</div>
          </CardBody>
        </Card>
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
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/school/classes" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
          All Classes
        </Link>
        <Link href="/instructor/school/classes/current" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Current Classes
        </Link>
        <Link href="/instructor/school/classes/archived" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Archived Classes
        </Link>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Current Classes</CardTitle>
          <div className="space-y-4 mt-4">
            {classes.map((classData) => (
              <div 
                key={classData.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                onClick={() => router.push(`/instructor/school/students?class=${classData.id}`)}
              >
                <div className="text-3xl">{classData.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{classData.name}</h3>
                  <div className="text-sm text-gray-600">{classData.subject}</div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-600">
                    <span>👥 {classData.students} Students</span>
                    <span>📅 {classData.schedule}</span>
                    <span>🏠 {classData.room}</span>
                  </div>
                </div>
                <div className="text-right min-w-[120px]">
                  <div className="text-xs text-gray-500 mb-1">Progress</div>
                  <ProgressBar progress={classData.progress} />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}