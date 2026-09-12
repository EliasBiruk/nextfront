'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function QuestionBank() {
  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Question Bank</h1>
        <p className="text-gray-600">Manage and reuse your question library</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>My Questions</CardTitle>
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
            <p className="text-gray-600 mb-4">Start building your question bank</p>
            <Link 
              href="/instructor/assessments/quiz-builder"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Add Question
            </Link>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}