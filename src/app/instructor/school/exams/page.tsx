'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function SchoolInstructorExams() {
  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Exams</h1>
        <p className="text-gray-600">Manage school examinations</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/school/exams/create" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          + Create Exam
        </Link>
        <Link href="/instructor/school/exams/schedule" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Schedule
        </Link>
        <Link href="/instructor/school/exams/attempts" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Attempts
        </Link>
        <Link href="/instructor/school/exams/grading" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Grading
        </Link>
      </div>

      <Card>
        <CardBody>
          <CardTitle>School Exams</CardTitle>
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No exams scheduled</h3>
            <p className="text-gray-600 mb-4">Create or schedule exams for your classes</p>
            <Link 
              href="/instructor/school/exams/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Create Exam
            </Link>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}