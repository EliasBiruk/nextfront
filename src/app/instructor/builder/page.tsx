'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function CourseBuilder() {
  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Builder</h1>
        <p className="text-gray-600">Create and structure your course content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/instructor/builder/create">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">➕</div>
              <CardTitle>Create Course</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Start building a new course</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/builder/info">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">ℹ️</div>
              <CardTitle>Course Information</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Edit course details and settings</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/builder/curriculum">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">📋</div>
              <CardTitle>Curriculum</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Build course structure and content</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/builder/pricing">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">💰</div>
              <CardTitle>Pricing</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Set course pricing and revenue</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/builder/settings">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">⚙️</div>
              <CardTitle>Course Settings</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Configure course options</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/builder/preview">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">👁️</div>
              <CardTitle>Preview</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Preview course as a student</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
}