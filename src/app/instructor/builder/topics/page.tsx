'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TopicBuilder() {
  const router = useRouter();
  const [subtopics, setSubtopics] = useState([
    { id: 1, title: 'Introduction', lessons: 2, quizzes: 1, exercises: 1, summaries: 1 },
    { id: 2, title: 'Advanced Concepts', lessons: 3, quizzes: 2, exercises: 2, summaries: 1 },
  ]);

  const addSubtopic = () => {
    const newSubtopic = {
      id: subtopics.length + 1,
      title: 'New Subtopic',
      lessons: 0,
      quizzes: 0,
      exercises: 0,
      summaries: 0
    };
    setSubtopics([...subtopics, newSubtopic]);
  };

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Topic Content</h1>
        <p className="text-gray-600">Manage subtopics within this topic</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={addSubtopic}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Add Subtopic
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
          <CardTitle>Subtopics ({subtopics.length})</CardTitle>
          <div className="space-y-4 mt-4">
            {subtopics.map((subtopic) => (
              <div 
                key={subtopic.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                onClick={() => router.push(`/instructor/builder/subtopics?topic=${subtopic.id}`)}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{subtopic.title}</h3>
                  <div className="flex gap-4 mt-2 text-xs text-gray-600">
                    <span>📚 {subtopic.lessons} Lessons</span>
                    <span>📋 {subtopic.quizzes} Quizzes</span>
                    <span>💻 {subtopic.exercises} Exercises</span>
                    <span>📝 {subtopic.summaries} Summaries</span>
                  </div>
                </div>
                <div className="text-blue-600">→</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}