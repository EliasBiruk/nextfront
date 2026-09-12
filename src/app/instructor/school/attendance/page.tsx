'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SchoolInstructorAttendance() {
  const router = useRouter();

  const classes = [
    { id: 1, name: 'Grade 10A', subject: 'Mathematics', attendance: 95, lastTaken: 'Today' },
    { id: 2, name: 'Grade 10B', subject: 'Mathematics', attendance: 93, lastTaken: 'Today' },
    { id: 3, name: 'Grade 11A', subject: 'Mathematics', attendance: 92, lastTaken: 'Yesterday' },
    { id: 4, name: 'Grade 11B', subject: 'Mathematics', attendance: 94, lastTaken: 'Yesterday' },
  ];

  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance</h1>
        <p className="text-gray-600">Track and manage student attendance</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/school/attendance/take" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          + Take Attendance
        </Link>
        <Link href="/instructor/school/attendance/today" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Today
        </Link>
        <Link href="/instructor/school/attendance/class" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Class Attendance
        </Link>
        <Link href="/instructor/school/attendance/history" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          History
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">94%</div>
            <div className="text-sm text-gray-600">Overall Attendance</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-green-600 mb-1">3/4</div>
            <div className="text-sm text-gray-600">Taken Today</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-orange-600 mb-1">8</div>
            <div className="text-sm text-gray-600">Absent Today</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">118</div>
            <div className="text-sm text-gray-600">Present Today</div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Class Attendance Overview</CardTitle>
          <div className="space-y-4 mt-4">
            {classes.map((classData) => (
              <div 
                key={classData.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                onClick={() => router.push(`/instructor/school/attendance/class?id=${classData.id}`)}
              >
                <div className="text-3xl">🏫</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{classData.name}</h3>
                  <div className="text-sm text-gray-600">{classData.subject}</div>
                  <div className="text-xs text-gray-500 mt-1">Last taken: {classData.lastTaken}</div>
                </div>
                <div className="text-right min-w-[120px]">
                  <div className="text-xs text-gray-500 mb-1">Attendance</div>
                  <ProgressBar progress={classData.attendance} color="green" />
                  <div className="text-sm font-medium text-gray-900 mt-1">{classData.attendance}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}