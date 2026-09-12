'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function SchoolInstructorAnalytics() {
  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">View class and student performance analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/instructor/school/analytics/class">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">🏫</div>
              <CardTitle>Class Performance</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Track class-wide metrics</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/school/analytics/student">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">👤</div>
              <CardTitle>Student Performance</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Individual student analytics</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
}