'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SchoolInstructorGradebook() {
  const router = useRouter();

  const classes = [
    { id: 1, name: 'Grade 10A', subject: 'Mathematics', students: 32, avgGrade: 84 },
    { id: 2, name: 'Grade 10B', subject: 'Mathematics', students: 30, avgGrade: 81 },
    { id: 3, name: 'Grade 11A', subject: 'Mathematics', students: 28, avgGrade: 79 },
    { id: 4, name: 'Grade 11B', subject: 'Mathematics', students: 36, avgGrade: 82 },
  ];

  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Gradebook</h1>
        <p className="text-gray-600">View and manage student grades and assessments</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/school/gradebook" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
          Overview
        </Link>
        <Link href="/instructor/school/gradebook/classes" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Classes
        </Link>
        <Link href="/instructor/school/gradebook/subjects" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Subjects
        </Link>
        <Link href="/instructor/school/gradebook/reports" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Reports
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">82%</div>
            <div className="text-sm text-gray-600">Overall Average</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">126</div>
            <div className="text-sm text-gray-600">Students Graded</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">48</div>
            <div className="text-sm text-gray-600">Assessments</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-green-600 mb-1">94%</div>
            <div className="text-sm text-gray-600">Grading Complete</div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Class Performance</CardTitle>
          <div className="space-y-4 mt-4">
            {classes.map((classData) => (
              <div 
                key={classData.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                onClick={() => router.push(`/instructor/school/gradebook/classes?id=${classData.id}`)}
              >
                <div className="text-3xl">🏫</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{classData.name}</h3>
                  <div className="text-sm text-gray-600">{classData.subject}</div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-600">
                    <span>👥 {classData.students} Students</span>
                    <span>📊 Avg: {classData.avgGrade}%</span>
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