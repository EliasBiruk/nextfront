'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BookmarksPage() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState([
    // Lessons
    {
      id: 1,
      type: 'lesson',
      title: 'Arrow Functions',
      course: 'JavaScript Fundamentals',
      chapter: 'Chapter 4 → Functions',
      progress: 78,
      lastAccessed: '2 hours ago',
      icon: '📖'
    },
    {
      id: 2,
      type: 'lesson',
      title: 'State Basics',
      course: 'React Development',
      chapter: 'Chapter 3 → State Management',
      progress: 45,
      lastAccessed: 'Yesterday',
      icon: '📖'
    },
    {
      id: 3,
      type: 'lesson',
      title: 'List Operations',
      course: 'Python for Data Science',
      chapter: 'Chapter 2 → Data Structures',
      progress: 30,
      lastAccessed: '2 days ago',
      icon: '📖'
    },
    // Courses
    {
      id: 4,
      type: 'course',
      title: 'JavaScript Fundamentals',
      description: 'Master the basics of JavaScript programming',
      progress: 67,
      lastAccessed: '2 hours ago',
      icon: '📚'
    },
    {
      id: 5,
      type: 'course',
      title: 'React Development',
      description: 'Build modern web applications with React',
      progress: 45,
      lastAccessed: 'Yesterday',
      icon: '⚛️'
    },
    // Exercises
    {
      id: 6,
      type: 'exercise',
      title: 'Event Listeners Practice',
      course: 'JavaScript Fundamentals',
      description: 'Practice handling DOM events',
      progress: 100,
      lastAccessed: '3 days ago',
      icon: '💻'
    },
    {
      id: 7,
      type: 'exercise',
      title: 'Component State Exercise',
      course: 'React Development',
      description: 'Build interactive components with state',
      progress: 60,
      lastAccessed: 'Yesterday',
      icon: '💻'
    },
    // Quizzes
    {
      id: 8,
      type: 'quiz',
      title: 'JavaScript Quiz',
      course: 'JavaScript Fundamentals',
      score: 95,
      lastAccessed: '5 hours ago',
      icon: '📝'
    },
    {
      id: 9,
      type: 'quiz',
      title: 'React Hooks Quiz',
      course: 'React Development',
      score: 88,
      lastAccessed: '1 day ago',
      icon: '📝'
    },
  ]);

  const removeBookmark = (id: number) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const groupedBookmarks = {
    lessons: bookmarks.filter(b => b.type === 'lesson'),
    courses: bookmarks.filter(b => b.type === 'course'),
    exercises: bookmarks.filter(b => b.type === 'exercise'),
    quizzes: bookmarks.filter(b => b.type === 'quiz'),
  };

  const typeLabels = {
    lesson: 'Lessons',
    course: 'Courses',
    exercise: 'Exercises',
    quiz: 'Quizzes',
  };

  const typeIcons = {
    lesson: '📖',
    course: '📚',
    exercise: '💻',
    quiz: '📝',
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bookmarks</h1>
        <p className="text-gray-600">Quick access to your saved learning content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{bookmarks.length}</div>
                <div className="text-blue-100 text-sm">Total Bookmarks</div>
              </div>
              <div className="text-4xl opacity-80">🔖</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{groupedBookmarks.lessons.length}</div>
                <div className="text-green-100 text-sm">Lessons</div>
              </div>
              <div className="text-4xl opacity-80">📖</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{groupedBookmarks.courses.length}</div>
                <div className="text-purple-100 text-sm">Courses</div>
              </div>
              <div className="text-4xl opacity-80">📚</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{groupedBookmarks.exercises.length + groupedBookmarks.quizzes.length}</div>
                <div className="text-orange-100 text-sm">Exercises & Quizzes</div>
              </div>
              <div className="text-4xl opacity-80">💻</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Bookmarks by Type */}
      {Object.entries(groupedBookmarks).map(([type, items]) => {
        if (items.length === 0) return null;
        
        return (
          <Card key={type} className="mb-6">
            <CardBody>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{typeIcons[type as keyof typeof typeIcons]}</span>
                <CardTitle className="mb-0">{typeLabels[type as keyof typeof typeLabels]}</CardTitle>
                <span className="text-sm text-gray-500">({items.length})</span>
              </div>
              
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
                  >
                    <div className="text-3xl">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{item.title}</h3>
                      {item.course && <p className="text-sm text-gray-600">{item.course}</p>}
                      {item.chapter && <p className="text-xs text-gray-500">{item.chapter}</p>}
                      {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>🕐 {item.lastAccessed}</span>
                        {item.score !== undefined && <span>📊 Score: {item.score}%</span>}
                      </div>
                    </div>
                    <div className="text-right min-w-[100px]">
                      {item.progress !== undefined && (
                        <>
                          <div className="text-sm font-medium text-blue-600 mb-1">{item.progress}%</div>
                          <ProgressBar progress={item.progress} />
                        </>
                      )}
                      <button
                        onClick={() => router.push('/student/learning')}
                        className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                      >
                        Open
                      </button>
                    </div>
                    <button
                      onClick={() => removeBookmark(item.id)}
                      className="ml-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                      title="Remove bookmark"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        );
      })}

      {bookmarks.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookmarks yet</h3>
              <p className="text-gray-600 mb-4">Start bookmarking lessons, courses, and exercises to access them quickly</p>
              <Link
                href="/student/learning/in-progress"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Browse Learning Content
              </Link>
            </div>
          </CardBody>
        </Card>
      )}
    </DashboardLayout>
  );
}
