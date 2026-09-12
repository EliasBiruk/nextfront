'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function SubmitForReview() {
  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit for Review</h1>
        <p className="text-gray-600">Submit your course for platform review</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Course Submission</CardTitle>
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📤</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to submit?</h3>
            <p className="text-gray-600 mb-4">Your course will be reviewed by the JoyEdu team</p>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
              Submit Course
            </button>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}