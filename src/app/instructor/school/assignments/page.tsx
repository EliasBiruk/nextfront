'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SchoolInstructorAssignments() {
  const router = useRouter();

  const assignments = [
    {
      id: 1,
      title: 'Algebra Problem Set',
      class: 'Grade 10A',
      dueDate: '2024-09-10',
      submissions: 28,
      graded: 24,
      status: 'active',
      icon: '📝'
    },
    {
      id: 2,
      title: 'Geometry Quiz Review',
      class: 'Grade 10B',
      dueDate: '2024-09-12',
      submissions: 25,
      graded: 20,
      status: 'active',
      icon: '📝'
    },
    {
      id: 3,
      title: 'Calculus Introduction',
      class: 'Grade 11A',
      dueDate: '2024-09-08',
      submissions: 26,
      graded: 26,
      status: 'completed',
      icon: '📝'
    },
  ];

  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assignments</h1>
        <p className="text-gray-600">Create and manage class assignments</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/school/assignments/create" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          + Create Assignment
        </Link>
        <Link href="/instructor/school/assignments" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
          All
        </Link>
        <Link href="/instructor/school/assignments/drafts" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Drafts
        </Link>
        <Link href="/instructor/school/assignments/published" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Published
        </Link>
        <Link href="/instructor/school/assignments/grading" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Grading
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">24</div>
            <div className="text-sm text-gray-600">Awaiting Grading</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-green-600 mb-1">70</div>
            <div className="text-sm text-gray-600">Total Submissions</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Active Assignments</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">85%</div>
            <div className="text-sm text-gray-600">Avg Completion</div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Recent Assignments</CardTitle>
          <div className="space-y-4 mt-4">
            {assignments.map((assignment) => (
              <div 
                key={assignment.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                onClick={() => router.push(`/instructor/school/assignments/grading?id=${assignment.id}`)}
              >
                <div className="text-3xl">{assignment.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      assignment.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">{assignment.class}</div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-600">
                    <span>📅 Due: {assignment.dueDate}</span>
                    <span>📥 {assignment.submissions} Submissions</span>
                    <span>✅ {assignment.graded} Graded</span>
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