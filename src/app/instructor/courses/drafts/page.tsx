'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function InstructorDrafts() {
  const router = useRouter();

  const draftCourses = [
    {
      id: 5,
      title: 'TypeScript Masterclass',
      progress: 60,
      lastUpdated: '5 hours ago',
      thumbnail: '📘',
      chapters: 8,
      lessons: 24
    },
    {
      id: 6,
      title: 'Node.js Backend Development',
      progress: 40,
      lastUpdated: '2 days ago',
      thumbnail: '💚',
      chapters: 5,
      lessons: 15
    },
  ];

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Draft Courses</h1>
        <p className="text-gray-600">Continue working on your unpublished courses</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/courses" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          All Courses
        </Link>
        <Link href="/instructor/courses/drafts" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
          Drafts
        </Link>
        <Link href="/instructor/courses/review" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          In Review
        </Link>
        <Link href="/instructor/courses/published" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Published
        </Link>
      </div>

      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-6">
            <CardTitle>Draft Courses ({draftCourses.length})</CardTitle>
            <Link 
              href="/instructor/builder/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              + Create New Course
            </Link>
          </div>
          
          <div className="space-y-4">
            {draftCourses.map((course) => (
              <div 
                key={course.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                onClick={() => router.push(`/instructor/builder/info?id=${course.id}`)}
              >
                <div className="text-4xl">{course.thumbnail}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-gray-500">Chapters</div>
                      <div className="font-medium text-gray-900">{course.chapters}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Lessons</div>
                      <div className="font-medium text-gray-900">{course.lessons}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right min-w-[150px]">
                  <div className="text-xs text-gray-500 mb-1">Progress</div>
                  <ProgressBar progress={course.progress} />
                  <div className="text-xs text-gray-500 mt-2">{course.lastUpdated}</div>
                </div>
              </div>
            ))}
            
            {draftCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No draft courses</h3>
                <p className="text-gray-600 mb-4">Start creating your first course</p>
                <Link 
                  href="/instructor/builder/create"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Create Course
                </Link>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}