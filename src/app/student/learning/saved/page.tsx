'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SavedPage() {
  const router = useRouter();

  const savedCourses = [
    {
      id: 1,
      title: 'TypeScript Fundamentals',
      description: 'Master TypeScript from basics to advanced concepts',
      instructor: 'Sarah Johnson',
      duration: '8h 30m',
      lessons: 24,
      level: 'Intermediate',
      rating: 4.8,
      students: 1250,
      price: 49.99,
      image: '📘',
      category: 'Programming'
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      description: 'Learn advanced React patterns and best practices',
      instructor: 'Michael Chen',
      duration: '12h 15m',
      lessons: 36,
      level: 'Advanced',
      rating: 4.9,
      students: 890,
      price: 79.99,
      image: '⚛️',
      category: 'Web Development'
    },
    {
      id: 3,
      title: 'Machine Learning with Python',
      description: 'Build ML models using Python and scikit-learn',
      instructor: 'Dr. Emily Rodriguez',
      duration: '15h 45m',
      lessons: 42,
      level: 'Intermediate',
      rating: 4.7,
      students: 2100,
      price: 89.99,
      image: '🤖',
      category: 'Data Science'
    },
    {
      id: 4,
      title: 'Docker & Kubernetes Essentials',
      description: 'Container orchestration and deployment strategies',
      instructor: 'James Wilson',
      duration: '10h 20m',
      lessons: 28,
      level: 'Advanced',
      rating: 4.6,
      students: 670,
      price: 69.99,
      image: '🐳',
      category: 'DevOps'
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      description: 'Create beautiful and user-friendly interfaces',
      instructor: 'Lisa Anderson',
      duration: '6h 50m',
      lessons: 18,
      level: 'Beginner',
      rating: 4.8,
      students: 3400,
      price: 39.99,
      image: '🎨',
      category: 'Design'
    },
    {
      id: 6,
      title: 'GraphQL API Development',
      description: 'Build efficient and flexible APIs with GraphQL',
      instructor: 'David Kim',
      duration: '9h 10m',
      lessons: 26,
      level: 'Intermediate',
      rating: 4.7,
      students: 980,
      price: 59.99,
      image: '🔗',
      category: 'Backend'
    }
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <>
        {Array.from({ length: fullStars }, (_, i) => (
          <span key={i} className="text-yellow-500">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-500">★</span>}
        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }, (_, i) => (
          <span key={i} className="text-gray-300">★</span>
        ))}
      </>
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-blue-100 text-blue-700';
      case 'Advanced': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/student" className="hover:text-blue-600">Dashboard</Link>
        <span className="mx-2">/</span>
        <Link href="/student/learning" className="hover:text-blue-600">Learning</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Saved</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Saved Courses</h1>
        <p className="text-gray-600">Your wishlist contains {savedCourses.length} courses</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{savedCourses.length}</div>
                <div className="text-pink-100 text-sm">Saved Courses</div>
              </div>
              <div className="text-4xl opacity-80">❤️</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  ${savedCourses.reduce((acc, c) => acc + c.price, 0).toFixed(0)}
                </div>
                <div className="text-indigo-100 text-sm">Total Value</div>
              </div>
              <div className="text-4xl opacity-80">💰</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {Math.round(savedCourses.reduce((acc, c) => acc + c.rating, 0) / savedCourses.length * 10) / 10}
                </div>
                <div className="text-teal-100 text-sm">Avg Rating</div>
              </div>
              <div className="text-4xl opacity-80">⭐</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Saved Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition group">
            <CardBody>
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl group-hover:scale-110 transition">{course.image}</div>
                <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
              <div className="text-xs text-gray-500 mb-3">
                <p>👨‍🏫 {course.instructor}</p>
                <p className="mt-1">📁 {course.category}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span>⏱️ {course.duration}</span>
                <span>📖 {course.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1 text-sm">
                  {renderStars(course.rating)}
                </span>
                <span className="text-sm text-gray-600">({course.rating})</span>
                <span className="text-xs text-gray-500">• {course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-900">${course.price}</div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => router.push(`/guest/courses/${course.id}`)}
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    View Course
                  </button>
                  <button 
                    onClick={() => router.push(`/guest/courses/${course.id}`)}
                    className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition"
                  >
                    Details
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
