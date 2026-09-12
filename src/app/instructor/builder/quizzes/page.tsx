'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useState } from 'react';

export default function QuizzesBuilder() {
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'Variables Quiz', questions: 5, passingScore: 80 },
  ]);

  const [newQuiz, setNewQuiz] = useState({ title: '', questions: 5, passingScore: 70 });

  const addQuiz = () => {
    if (newQuiz.title) {
      setQuizzes([...quizzes, { ...newQuiz, id: quizzes.length + 1 }]);
      setNewQuiz({ title: '', questions: 5, passingScore: 70 });
    }
  };

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quizzes</h1>
        <p className="text-gray-600">Create and manage quiz assessments</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={addQuiz}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Add Quiz
        </button>
        <Link
          href="/instructor/builder/curriculum"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          Back to Curriculum
        </Link>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Quiz Assessments</CardTitle>
          <div className="space-y-4 mt-4">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{quiz.title}</h3>
                    <div className="flex gap-4 mt-2 text-xs text-gray-600">
                      <span>Questions: {quiz.questions}</span>
                      <span>Passing Score: {quiz.passingScore}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}