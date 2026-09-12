'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function InstructorQuestions() {
  const { currentUser } = useAuth();

  const questions = [
    {
      id: 1,
      student: 'John Smith',
      course: 'React & Next.js Full Stack',
      question: 'How do I handle async data fetching in useEffect?',
      status: 'unanswered',
      date: '1 hour ago'
    },
    {
      id: 2,
      student: 'Sarah Johnson',
      course: 'TypeScript Fundamentals',
      question: 'What is the difference between interface and type?',
      status: 'answered',
      date: '3 hours ago'
    },
    {
      id: 3,
      student: 'Michael Chen',
      course: 'Advanced JavaScript Patterns',
      question: 'Can you explain the concept of memoization?',
      status: 'unanswered',
      date: '5 hours ago'
    },
  ];

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Questions</h1>
        <p className="text-gray-600">Answer questions from your students</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Pending Questions</CardTitle>
          <div className="space-y-4 mt-4">
            {questions.map((question) => (
              <div 
                key={question.id}
                className={`p-4 border rounded-lg ${question.status === 'unanswered' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{question.student}</span>
                      <span className="text-sm text-gray-600">• {question.course}</span>
                    </div>
                    <div className="font-medium text-gray-900 mt-2">{question.question}</div>
                    <div className="text-xs text-gray-500 mt-2">{question.date}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    question.status === 'unanswered' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {question.status === 'unanswered' ? 'Needs Answer' : 'Answered'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
