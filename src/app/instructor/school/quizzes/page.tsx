'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function SchoolInstructorQuizzes() {
  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quizzes</h1>
        <p className="text-gray-600">Create and manage class quizzes</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/school/quizzes/create" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          + Create Quiz
        </Link>
        <Link href="/instructor/school/quizzes/bank" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Question Bank
        </Link>
        <Link href="/instructor/school/quizzes/attempts" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Attempts
        </Link>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Quiz Management</CardTitle>
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes yet</h3>
            <p className="text-gray-600 mb-4">Create your first quiz to get started</p>
            <Link 
              href="/instructor/school/quizzes/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Create Quiz
            </Link>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}