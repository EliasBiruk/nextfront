'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ChaptersBuilder() {
  const router = useRouter();
  const [chapters, setChapters] = useState([
    { id: 1, title: 'Chapter 1: Introduction', topics: 2 },
    { id: 2, title: 'Chapter 2: Fundamentals', topics: 3 },
  ]);

  const [newChapter, setNewChapter] = useState({ title: '' });

  const addChapter = () => {
    if (newChapter.title) {
      setChapters([...chapters, { ...newChapter, id: chapters.length + 1, topics: 0 }]);
      setNewChapter({ title: '' });
    }
  };

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Chapters</h1>
        <p className="text-gray-600">Manage course chapters</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={addChapter}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Add Chapter
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
          <CardTitle>Course Chapters ({chapters.length})</CardTitle>
          <div className="space-y-4 mt-4">
            {chapters.map((chapter) => (
              <div 
                key={chapter.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                onClick={() => router.push(`/instructor/builder/topics?chapter=${chapter.id}`)}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
                  <div className="text-xs text-gray-600 mt-1">{chapter.topics} topics</div>
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
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}