'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function SchoolInstructorResources() {
  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Resources</h1>
        <p className="text-gray-600">Manage teaching materials and resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/instructor/school/resources">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">📚</div>
              <CardTitle>Teaching Materials</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Lesson plans and materials</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/school/resources/files">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">📁</div>
              <CardTitle>Files</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Upload and manage files</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
}