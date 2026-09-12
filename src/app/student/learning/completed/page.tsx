'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CompletedPage() {
  const router = useRouter();

  const completedCourses = [
    {
      id: 1,
      title: 'HTML & CSS Fundamentals',
      completionDate: 'August 15, 2026',
      certificateEarned: true,
      certificateId: 'CERT-2026-HTML-001',
      finalScore: 95,
      totalLessons: 20,
      image: '🌐',
      rating: 5,
      review: 'Excellent course! Very well structured.'
    },
    {
      id: 2,
      title: 'Git & Version Control',
      completionDate: 'July 28, 2026',
      certificateEarned: true,
      certificateId: 'CERT-2026-GIT-002',
      finalScore: 88,
      totalLessons: 15,
      image: '🔀',
      rating: 4,
      review: 'Good introduction to Git workflows.'
    },
    {
      id: 3,
      title: 'Responsive Web Design',
      completionDate: 'June 10, 2026',
      certificateEarned: true,
      certificateId: 'CERT-2026-RWD-003',
      finalScore: 92,
      totalLessons: 18,
      image: '📱',
      rating: 5,
      review: 'Learned a lot about mobile-first design.'
    },
    {
      id: 4,
      title: 'JavaScript ES6+ Features',
      completionDate: 'May 22, 2026',
      certificateEarned: true,
      certificateId: 'CERT-2026-JS6-004',
      finalScore: 90,
      totalLessons: 22,
      image: '🟨',
      rating: 4,
      review: 'Great coverage of modern JavaScript.'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
    ));
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/student" className="hover:text-blue-600">Dashboard</Link>
        <span className="mx-2">/</span>
        <Link href="/student/learning" className="hover:text-blue-600">Learning</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Completed</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Completed Courses</h1>
        <p className="text-gray-600">You have completed {completedCourses.length} courses and earned {completedCourses.filter(c => c.certificateEarned).length} certificates</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{completedCourses.length}</div>
                <div className="text-green-100 text-sm">Courses Completed</div>
              </div>
              <div className="text-4xl opacity-80">🎓</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{completedCourses.filter(c => c.certificateEarned).length}</div>
                <div className="text-blue-100 text-sm">Certificates</div>
              </div>
              <div className="text-4xl opacity-80">📜</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {Math.round(completedCourses.reduce((acc, c) => acc + c.finalScore, 0) / completedCourses.length)}%
                </div>
                <div className="text-purple-100 text-sm">Avg Score</div>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {completedCourses.reduce((acc, c) => acc + c.totalLessons, 0)}
                </div>
                <div className="text-yellow-100 text-sm">Lessons Done</div>
              </div>
              <div className="text-4xl opacity-80">📚</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Completed Courses List */}
      <Card>
        <CardBody>
          <CardTitle>Completed Courses</CardTitle>
          <div className="space-y-4">
            {completedCourses.map((course) => (
              <div 
                key={course.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{course.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      {course.certificateEarned && (
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          📜 Certificate
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Completed on {course.completionDate}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span>📖 {course.totalLessons} lessons</span>
                      <span>📊 Final Score: {course.finalScore}%</span>
                      <span className="flex items-center gap-1">
                        {renderStars(course.rating)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 italic mb-3">"{course.review}"</div>
                    <div className="flex gap-2">
                      {course.certificateEarned && (
                        <button 
                          onClick={() => router.push(`/student/certificates`)}
                          className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                        >
                          View Certificate
                        </button>
                      )}
                      <button 
                        onClick={() => router.push(`/guest/courses/${course.id}`)}
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                      >
                        View Course
                      </button>
                      <button 
                        onClick={() => router.push(`/student/learning/player/${course.id}`)}
                        className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition"
                      >
                        Revisit
                      </button>
                    </div>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <ProgressBar progress={100} color="green" />
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
