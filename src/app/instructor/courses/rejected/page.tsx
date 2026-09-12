'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function InstructorRejected() {
  const router = useRouter();

  const rejectedCourses = [
    {
      id: 7,
      title: 'CSS Grid & Flexbox',
      rejectionReason: 'Content needs more practical examples and real-world use cases',
      rejectedDate: '1 week ago',
      thumbnail: '🎨',
      progress: 85
    },
  ];

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Rejected Courses</h1>
        <p className="text-gray-600">Review feedback and resubmit courses</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/courses" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          All Courses
        </Link>
        <Link href="/instructor/courses/rejected" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
          Rejected
        </Link>
        <Link href="/instructor/courses/published" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Published
        </Link>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Rejected Courses ({rejectedCourses.length})</CardTitle>
          
          <div className="space-y-4 mt-4">
            {rejectedCourses.map((course) => (
              <div 
                key={course.id}
                className="flex items-center gap-4 p-4 border border-red-200 bg-red-50 rounded-lg hover:border-red-400 transition cursor-pointer"
                onClick={() => router.push(`/instructor/publishing/feedback?id=${course.id}`)}
              >
                <div className="text-4xl">{course.thumbnail}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Rejected
                    </span>
                  </div>
                  <div className="text-sm text-red-700 mb-2">
                    <strong>Reason:</strong> {course.rejectionReason}
                  </div>
                  <div className="text-xs text-gray-600">Rejected {course.rejectedDate}</div>
                </div>
                <div className="text-right min-w-[150px]">
                  <div className="text-xs text-gray-500 mb-1">Progress</div>
                  <ProgressBar progress={course.progress} color="red" />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/instructor/builder/info?id=${course.id}`);
                    }}
                    className="mt-2 w-full px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                  >
                    Edit & Resubmit
                  </button>
                </div>
              </div>
            ))}
            
            {rejectedCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No rejected courses</h3>
                <p className="text-gray-600">Great! All your courses have been approved</p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}