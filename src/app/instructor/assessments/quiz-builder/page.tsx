'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function QuizBuilder() {
  const router = useRouter();
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'What is the correct syntax for creating a function in JavaScript?',
      type: 'multiple-choice',
      options: ['function myFunction() {}', 'create myFunction() {}', 'def myFunction() {}', 'func myFunction() {}'],
      correctAnswer: 0,
      points: 10,
      explanation: 'Functions in JavaScript are created using the "function" keyword followed by the function name and parentheses.',
    }
  ]);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 10,
      explanation: '',
    };
    setQuestions([...questions, newQuestion]);
  };

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quiz Builder</h1>
        <p className="text-gray-600">Create and manage quizzes for your courses</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={addQuestion}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Add Question
        </button>
        <Link
          href="/instructor/assessments/bank"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          Question Bank
        </Link>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => (
          <Card key={q.id}>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>Question {index + 1}</CardTitle>
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="short-answer">Short Answer</option>
                  <option value="essay">Essay</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question *
                  </label>
                  <textarea
                    rows={2}
                    value={q.question}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your question..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Points
                    </label>
                    <input
                      type="number"
                      value={q.points}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Limit (seconds)
                    </label>
                    <input
                      type="number"
                      placeholder="Optional"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer Options
                  </label>
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${q.id}`}
                          checked={q.correctAnswer === optIndex}
                          className="w-4 h-4 text-blue-600"
                        />
                        <input
                          type="text"
                          value={option}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={`Option ${optIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Explanation (shown after answer)
                  </label>
                  <textarea
                    rows={2}
                    value={q.explanation}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Explain why this is the correct answer..."
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
          Save Quiz
        </button>
        <Link
          href="/instructor/assessments"
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          Back to Assessments
        </Link>
      </div>
    </DashboardLayout>
  );
}