'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function InstructorPublishing() {
  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Publishing</h1>
        <p className="text-gray-600">Manage course submission and publishing workflow</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/instructor/publishing/submit">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">📤</div>
              <CardTitle>Submit for Review</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Submit courses for platform review</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/publishing/status">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">👁️</div>
              <CardTitle>Review Status</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Track review progress</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
}