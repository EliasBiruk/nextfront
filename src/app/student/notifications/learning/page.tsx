'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function LearningNotifications() {
  const notifications = [
    {
      id: 1,
      type: 'enrollment',
      title: 'New course enrolled',
      message: 'You have been enrolled in "Advanced React Patterns"',
      course: 'Advanced React Patterns',
      time: '2 hours ago',
      read: false,
      icon: '📚',
      action: 'Start Learning',
      actionLink: '/student/learning'
    },
    {
      id: 2,
      type: 'lesson',
      title: 'Lesson completed',
      message: 'You completed "Arrow Functions" in JavaScript Fundamentals',
      course: 'JavaScript Fundamentals',
      time: '5 hours ago',
      read: false,
      icon: '✅',
      action: 'Next Lesson',
      actionLink: '/student/learning'
    },
    {
      id: 3,
      type: 'progress',
      title: 'Progress milestone',
      message: 'You reached 50% completion in Python for Data Science',
      course: 'Python for Data Science',
      time: '1 day ago',
      read: true,
      icon: '📈',
      action: 'View Progress',
      actionLink: '/student/learning'
    },
    {
      id: 4,
      type: 'recommendation',
      title: 'Course recommendation',
      message: 'Based on your progress, we recommend "TypeScript Fundamentals"',
      course: 'TypeScript Fundamentals',
      time: '2 days ago',
      read: true,
      icon: '💡',
      action: 'View Course',
      actionLink: '/student/courses'
    },
    {
      id: 5,
      type: 'goal',
      title: 'Learning goal reminder',
      message: 'You are 3 lessons away from completing your weekly goal',
      course: 'Weekly Goal',
      time: '3 days ago',
      read: true,
      icon: '🎯',
      action: 'Continue Learning',
      actionLink: '/student/learning'
    },
    {
      id: 6,
      type: 'enrollment',
      title: 'Course completed',
      message: 'Congratulations! You completed "HTML & CSS Fundamentals"',
      course: 'HTML & CSS Fundamentals',
      time: '4 days ago',
      read: true,
      icon: '🎉',
      action: 'View Certificate',
      actionLink: '/student/certificates'
    },
    {
      id: 7,
      type: 'lesson',
      title: 'New lesson available',
      message: 'Chapter 5: Async/Await is now available in JavaScript Fundamentals',
      course: 'JavaScript Fundamentals',
      time: '5 days ago',
      read: true,
      icon: '🆕',
      action: 'Start Lesson',
      actionLink: '/student/learning'
    },
    {
      id: 8,
      type: 'progress',
      title: 'Chapter completed',
      message: 'You completed Chapter 3: State Management in React Development',
      course: 'React Development',
      time: '6 days ago',
      read: true,
      icon: '📖',
      action: 'Next Chapter',
      actionLink: '/student/learning'
    },
    {
      id: 9,
      type: 'recommendation',
      title: 'Lesson recommendation',
      message: 'Review "List Operations" to strengthen your Python skills',
      course: 'Python for Data Science',
      time: '1 week ago',
      read: true,
      icon: '🔄',
      action: 'Review Lesson',
      actionLink: '/student/learning'
    },
    {
      id: 10,
      type: 'goal',
      title: 'Streak milestone',
      message: 'Keep your learning streak alive! You have 12 days in a row',
      course: 'Learning Streak',
      time: '1 week ago',
      read: true,
      icon: '🔥',
      action: 'Continue Streak',
      actionLink: '/student/learning'
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type: string) => {
    const colors = {
      enrollment: 'bg-blue-100 text-blue-700',
      lesson: 'bg-green-100 text-green-700',
      progress: 'bg-purple-100 text-purple-700',
      recommendation: 'bg-yellow-100 text-yellow-700',
      goal: 'bg-orange-100 text-orange-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Learning Notifications</h1>
          <Link href="/student/notifications" className="text-blue-600 hover:underline text-sm">
            View All Notifications →
          </Link>
        </div>
        <p className="text-gray-600">Track your course enrollments, lesson progress, and learning goals</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
            <div className="text-sm text-gray-600">Total Notifications</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
            <div className="text-sm text-gray-600">Unread</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-600">Courses Enrolled</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-green-600">45</div>
            <div className="text-sm text-gray-600">Lessons Completed</div>
          </CardBody>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Learning Notifications ({notifications.length})</CardTitle>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg transition ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                } hover:border-blue-300`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{notification.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                      {!notification.read && (
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">New</span>
                      )}
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getTypeColor(notification.type)}`}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      <span className="text-xs text-blue-600 font-medium">{notification.course}</span>
                      <Link
                        href={notification.actionLink}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {notification.action} →
                      </Link>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition" title="Mark as read">
                      ✓
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition" title="Delete">
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Learning Goals Section */}
      <Card>
        <CardBody>
          <CardTitle>Learning Goals</CardTitle>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-blue-900">Weekly Learning Goal</h4>
                <span className="text-sm text-blue-600">7/10 lessons</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <p className="text-xs text-blue-600 mt-2">3 more lessons to complete your weekly goal</p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-green-900">Monthly Course Goal</h4>
                <span className="text-sm text-green-600">2/3 courses</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
              <p className="text-xs text-green-600 mt-2">1 more course to complete your monthly goal</p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-purple-900">Streak Goal</h4>
                <span className="text-sm text-purple-600">12/14 days</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '86%' }}></div>
              </div>
              <p className="text-xs text-purple-600 mt-2">2 more days to reach your streak goal</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
