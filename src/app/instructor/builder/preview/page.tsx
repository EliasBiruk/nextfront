'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function CoursePreview() {
  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Preview</h1>
        <p className="text-gray-600">See how your course will appear to students</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>JavaScript Fundamentals</CardTitle>
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Course Overview</h3>
              <p className="text-sm text-gray-600">Learn JavaScript from scratch and build modern web applications</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Curriculum</h3>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2 text-sm">
                  <span>📑</span>
                  <span>Chapter 1: Introduction</span>
                </div>
                <div className="flex items-center gap-2 text-sm pl-4">
                  <span>📝</span>
                  <span>Getting Started</span>
                </div>
                <div className="flex items-center gap-2 text-sm pl-4">
                  <span>📝</span>
                  <span>Setting Up Environment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>📑</span>
                  <span>Chapter 2: Fundamentals</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href="/instructor/builder/settings"
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Back to Settings
              </Link>
              <Link
                href="/instructor/publishing/submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Submit for Review
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}