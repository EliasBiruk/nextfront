'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function InstructorArchived() {
  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Archived Courses</h1>
        <p className="text-gray-600">Manage your archived courses</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/courses" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          All Courses
        </Link>
        <Link href="/instructor/courses/archived" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
          Archived
        </Link>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Archived Courses</CardTitle>
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No archived courses</h3>
            <p className="text-gray-600">Archived courses will appear here</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}