'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function InstructorPublished() {
  const router = useRouter();

  const publishedCourses = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      enrollments: 1250,
      rating: 4.9,
      reviews: 342,
      revenue: '$12,500',
      publishedDate: '3 months ago',
      thumbnail: '🟨'
    },
    {
      id: 2,
      title: 'React Development',
      enrollments: 980,
      rating: 4.7,
      reviews: 256,
      revenue: '$9,800',
      publishedDate: '2 months ago',
      thumbnail: '⚛️'
    },
    {
      id: 3,
      title: 'Python for Data Science',
      enrollments: 850,
      rating: 4.8,
      reviews: 198,
      revenue: '$8,500',
      publishedDate: '1 month ago',
      thumbnail: '🐍'
    },
  ];

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Published Courses</h1>
        <p className="text-gray-600">Manage your live courses and track performance</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/courses" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          All Courses
        </Link>
        <Link href="/instructor/courses/drafts" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Drafts
        </Link>
        <Link href="/instructor/courses/review" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          In Review
        </Link>
        <Link href="/instructor/courses/published" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
          Published
        </Link>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Published Courses ({publishedCourses.length})</CardTitle>
          
          <div className="space-y-4 mt-4">
            {publishedCourses.map((course) => (
              <div 
                key={course.id}
                className="flex items-center gap-4 p-4 border border-green-200 bg-green-50 rounded-lg hover:border-green-400 transition cursor-pointer"
                onClick={() => router.push(`/instructor/analytics/courses?id=${course.id}`)}
              >
                <div className="text-4xl">{course.thumbnail}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Published
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <div className="text-gray-500">Enrollments</div>
                      <div className="font-medium text-gray-900">{course.enrollments}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Rating</div>
                      <div className="font-medium text-gray-900">⭐ {course.rating}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Reviews</div>
                      <div className="font-medium text-gray-900">{course.reviews}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Revenue</div>
                      <div className="font-medium text-gray-900">{course.revenue}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Published {course.publishedDate}</div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}