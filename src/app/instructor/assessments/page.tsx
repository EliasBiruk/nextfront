'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function InstructorAssessments() {
  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assessments</h1>
        <p className="text-gray-600">Create and manage quizzes, exercises, and assessments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/instructor/assessments/quiz-builder">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-4xl mb-4">📋</div>
              <CardTitle>Quiz Builder</CardTitle>
              <p className="text-gray-600 mt-2">Create interactive quizzes with multiple question types</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/assessments/exercise-builder">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-4xl mb-4">💻</div>
              <CardTitle>Exercise Builder</CardTitle>
              <p className="text-gray-600 mt-2">Create hands-on coding exercises and projects</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/assessments/bank">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-4xl mb-4">📚</div>
              <CardTitle>Question Bank</CardTitle>
              <p className="text-gray-600 mt-2">Manage and reuse your question library</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/assessments/attempts">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-4xl mb-4">📝</div>
              <CardTitle>Student Attempts</CardTitle>
              <p className="text-gray-600 mt-2">Review and grade student submissions</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
}