'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function InProgressPage() {
  const router = useRouter();

  const inProgressCourses = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      chapter: 'Chapter 4 → Functions → Arrow Functions',
      lesson: 'Lesson 3: Arrow Functions',
      progress: 78,
      image: '🟨',
      lastActivity: '2 hours ago',
      timeLeft: '2h 30m',
      totalLessons: 24,
      completedLessons: 19
    },
    {
      id: 2,
      title: 'React Development',
      chapter: 'Chapter 3 → State Management → useState',
      lesson: 'Lesson 2: State Basics',
      progress: 45,
      image: '⚛️',
      lastActivity: 'Yesterday',
      timeLeft: '5h 15m',
      totalLessons: 32,
      completedLessons: 14
    },
    {
      id: 3,
      title: 'Python for Data Science',
      chapter: 'Chapter 2 → Data Structures → Lists',
      lesson: 'Lesson 1: List Operations',
      progress: 30,
      image: '🐍',
      lastActivity: '2 days ago',
      timeLeft: '8h 45m',
      totalLessons: 28,
      completedLessons: 8
    },
    {
      id: 4,
      title: 'CSS Mastery',
      chapter: 'Chapter 5 → Flexbox & Grid',
      lesson: 'Lesson 4: Grid Template Areas',
      progress: 62,
      image: '🎨',
      lastActivity: '3 days ago',
      timeLeft: '3h 20m',
      totalLessons: 20,
      completedLessons: 12
    },
    {
      id: 5,
      title: 'Node.js Backend Development',
      chapter: 'Chapter 1 → Introduction to Node.js',
      lesson: 'Lesson 2: Event Loop',
      progress: 15,
      image: '🟢',
      lastActivity: '1 week ago',
      timeLeft: '12h 40m',
      totalLessons: 36,
      completedLessons: 5
    }
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/student" className="hover:text-blue-600">Dashboard</Link>
        <span className="mx-2">/</span>
        <Link href="/student/learning" className="hover:text-blue-600">Learning</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">In Progress</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">In Progress</h1>
        <p className="text-gray-600">Continue your learning journey with {inProgressCourses.length} active courses</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{inProgressCourses.length}</div>
                <div className="text-blue-100 text-sm">Active Courses</div>
              </div>
              <div className="text-4xl opacity-80">📚</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">58</div>
                <div className="text-green-100 text-sm">Lessons Completed</div>
              </div>
              <div className="text-4xl opacity-80">✅</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">32h 30m</div>
                <div className="text-purple-100 text-sm">Time Remaining</div>
              </div>
              <div className="text-4xl opacity-80">⏱️</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Courses List */}
      <Card>
        <CardBody>
          <CardTitle>Current Courses</CardTitle>
          <div className="space-y-4">
            {inProgressCourses.map((course) => (
              <div 
                key={course.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group cursor-pointer"
                onClick={() => router.push(`/student/learning/${course.id}`)}
              >
                <div className="text-3xl group-hover:scale-110 transition">{course.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.chapter}</p>
                  <p className="text-xs text-gray-500 mt-1">{course.lesson}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>📖 {course.completedLessons}/{course.totalLessons} lessons</span>
                    <span>⏱️ {course.timeLeft} remaining</span>
                    <span>🕐 {course.lastActivity}</span>
                  </div>
                </div>
                <div className="text-right min-w-[120px]">
                  <div className="text-sm font-medium text-blue-600 mb-1">{course.progress}%</div>
                  <ProgressBar progress={course.progress} />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/student/learning/player/${course.id}`);
                    }}
                    className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Continue
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
