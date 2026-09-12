'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function InstructorReview() {
  const router = useRouter();

  const reviewCourses = [
    {
      id: 4,
      title: 'Advanced JavaScript Patterns',
      submittedDate: '1 day ago',
      thumbnail: '🟨',
      progress: 95,
      reviewer: 'JoyEdu Review Team'
    },
  ];

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Courses In Review</h1>
        <p className="text-gray-600">Track courses currently under review</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/courses" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          All Courses
        </Link>
        <Link href="/instructor/courses/drafts" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Drafts
        </Link>
        <Link href="/instructor/courses/review" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
          In Review
        </Link>
        <Link href="/instructor/courses/published" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Published
        </Link>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Courses In Review ({reviewCourses.length})</CardTitle>
          
          <div className="space-y-4 mt-4">
            {reviewCourses.map((course) => (
              <div 
                key={course.id}
                className="flex items-center gap-4 p-4 border border-yellow-200 bg-yellow-50 rounded-lg hover:border-yellow-400 transition cursor-pointer"
                onClick={() => router.push(`/instructor/publishing/status?id=${course.id}`)}
              >
                <div className="text-4xl">{course.thumbnail}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      In Review
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Submitted {course.submittedDate} • Being reviewed by {course.reviewer}
                  </div>
                </div>
                <div className="text-right min-w-[150px]">
                  <div className="text-xs text-gray-500 mb-1">Progress</div>
                  <ProgressBar progress={course.progress} color="yellow" />
                </div>
              </div>
            ))}
            
            {reviewCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">👁️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses in review</h3>
                <p className="text-gray-600">Submit a draft course for review</p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}