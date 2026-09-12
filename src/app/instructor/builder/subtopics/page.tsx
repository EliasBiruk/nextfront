'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SubtopicBuilder() {
  const router = useRouter();
  const [lessons, setLessons] = useState([
    { id: 1, title: 'Introduction to Variables', type: 'video' },
    { id: 2, title: 'Declaring Variables', type: 'text' },
  ]);
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'Variables Quiz', questions: 5 },
  ]);
  const [exercises, setExercises] = useState([
    { id: 1, title: 'Variable Practice', difficulty: 'beginner' },
  ]);
  const [summaries, setSummaries] = useState([
    { id: 1, title: 'Chapter Summary' },
  ]);

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Subtopic Content</h1>
        <p className="text-gray-600">Manage lessons, quizzes, exercises, and summaries</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          + Add Lesson
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium">
          + Add Quiz
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium">
          + Add Exercise
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium">
          + Add Summary
        </button>
        <Link
          href="/instructor/builder/curriculum"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          Back to Curriculum
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <CardTitle>Lessons ({lessons.length})</CardTitle>
            <div className="space-y-2 mt-4">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                      <span className="text-xs text-gray-600">{lesson.type}</span>
                    </div>
                    <span className="text-blue-600">→</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Quizzes ({quizzes.length})</CardTitle>
            <div className="space-y-2 mt-4">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                      <span className="text-xs text-gray-600">{quiz.questions} questions</span>
                    </div>
                    <span className="text-blue-600">→</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Exercises ({exercises.length})</CardTitle>
            <div className="space-y-2 mt-4">
              {exercises.map((exercise) => (
                <div key={exercise.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{exercise.title}</h4>
                      <span className="text-xs text-gray-600">{exercise.difficulty}</span>
                    </div>
                    <span className="text-blue-600">→</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Summaries ({summaries.length})</CardTitle>
            <div className="space-y-2 mt-4">
              {summaries.map((summary) => (
                <div key={summary.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{summary.title}</h4>
                    </div>
                    <span className="text-blue-600">→</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}