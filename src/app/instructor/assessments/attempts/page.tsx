'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function AssessmentAttempts() {
  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Attempts</h1>
        <p className="text-gray-600">Review and grade student quiz and exercise attempts</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Recent Attempts</CardTitle>
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No attempts to review</h3>
            <p className="text-gray-600">Student attempts will appear here</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}