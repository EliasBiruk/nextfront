'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function AssessmentsNotifications() {
  const notifications = [
    {
      id: 1,
      type: 'quiz',
      title: 'Quiz available',
      message: 'JavaScript Quiz: Chapter 4 is now available',
      course: 'JavaScript Fundamentals',
      deadline: 'Tomorrow, 11:59 PM',
      time: '2 hours ago',
      read: false,
      icon: '📝',
      action: 'Take Quiz',
      actionLink: '/student/quizzes'
    },
    {
      id: 2,
      type: 'exercise',
      title: 'Exercise assigned',
      message: 'New exercise: Event Listeners Practice',
      course: 'JavaScript Fundamentals',
      deadline: 'Sep 9, 2026',
      time: '5 hours ago',
      read: false,
      icon: '💻',
      action: 'Start Exercise',
      actionLink: '/student/exercises'
    },
    {
      id: 3,
      type: 'exam',
      title: 'Exam scheduled',
      message: 'Final Examination for React Development on Sep 15, 2026',
      course: 'React Development',
      deadline: 'Sep 15, 2026, 2:00 PM',
      time: '1 day ago',
      read: true,
      icon: '📋',
      action: 'View Details',
      actionLink: '/student/exams'
    },
    {
      id: 4,
      type: 'deadline',
      title: 'Deadline reminder',
      message: 'Python Quiz is due in 2 days',
      course: 'Python for Data Science',
      deadline: 'Sep 8, 2026, 11:59 PM',
      time: '2 days ago',
      read: true,
      icon: '⏰',
      action: 'Take Quiz',
      actionLink: '/student/quizzes'
    },
    {
      id: 5,
      type: 'result',
      title: 'Quiz results available',
      message: 'Your React Quiz score: 92/100',
      course: 'React Development',
      deadline: null,
      time: '3 days ago',
      read: true,
      icon: '📊',
      action: 'View Results',
      actionLink: '/student/quizzes'
    },
    {
      id: 6,
      type: 'exercise',
      title: 'Exercise graded',
      message: 'Your Python exercise received a score of 95/100',
      course: 'Python for Data Science',
      deadline: null,
      time: '4 days ago',
      read: true,
      icon: '✅',
      action: 'View Feedback',
      actionLink: '/student/exercises'
    },
    {
      id: 7,
      type: 'quiz',
      title: 'Quiz deadline passed',
      message: 'HTML Quiz deadline has passed',
      course: 'HTML & CSS Fundamentals',
      deadline: 'Passed',
      time: '5 days ago',
      read: true,
      icon: '⚠️',
      action: 'Contact Support',
      actionLink: '/student/messages'
    },
    {
      id: 8,
      type: 'suggestion',
      title: 'Performance improvement',
      message: 'Focus on async/await concepts to improve your JavaScript scores',
      course: 'JavaScript Fundamentals',
      deadline: null,
      time: '6 days ago',
      read: true,
      icon: '💡',
      action: 'Review Lesson',
      actionLink: '/student/learning'
    },
    {
      id: 9,
      type: 'exam',
      title: 'Exam results available',
      message: 'Your midterm exam score: 88/100',
      course: 'React Development',
      deadline: null,
      time: '1 week ago',
      read: true,
      icon: '🎓',
      action: 'View Results',
      actionLink: '/student/exams'
    },
    {
      id: 10,
      type: 'deadline',
      title: 'Upcoming deadline alert',
      message: '3 assessments due this week',
      course: 'Multiple Courses',
      deadline: 'This week',
      time: '1 week ago',
      read: true,
      icon: '🔔',
      action: 'View Schedule',
      actionLink: '/student/assessments'
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type: string) => {
    const colors = {
      quiz: 'bg-blue-100 text-blue-700',
      exercise: 'bg-green-100 text-green-700',
      exam: 'bg-purple-100 text-purple-700',
      deadline: 'bg-red-100 text-red-700',
      result: 'bg-yellow-100 text-yellow-700',
      suggestion: 'bg-orange-100 text-orange-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getUrgencyLevel = (deadline: string | null) => {
    if (!deadline) return 'none';
    if (deadline === 'Passed') return 'passed';
    if (deadline.includes('Tomorrow')) return 'high';
    if (deadline.includes('days')) return 'medium';
    return 'low';
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Assessment Notifications</h1>
          <Link href="/student/notifications" className="text-blue-600 hover:underline text-sm">
            View All Notifications →
          </Link>
        </div>
        <p className="text-gray-600">Stay on top of quizzes, exercises, exams, and deadlines</p>
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
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-sm text-gray-600">Pending Deadlines</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-green-600">87%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </CardBody>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Assessment Notifications ({notifications.length})</CardTitle>
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
                      {notification.deadline && (
                        <span className={`text-xs font-medium ${
                          getUrgencyLevel(notification.deadline) === 'high' ? 'text-red-600' :
                          getUrgencyLevel(notification.deadline) === 'medium' ? 'text-orange-600' :
                          getUrgencyLevel(notification.deadline) === 'passed' ? 'text-gray-400' :
                          'text-gray-600'
                        }`}>
                          Due: {notification.deadline}
                        </span>
                      )}
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

      {/* Performance Suggestions */}
      <Card>
        <CardBody>
          <CardTitle>Performance Improvement Suggestions</CardTitle>
          <div className="space-y-3">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-1">Focus on Async/Await</h4>
                  <p className="text-sm text-yellow-700">Your quiz scores in JavaScript async concepts could improve. Review Chapter 5 lessons.</p>
                  <Link href="/student/learning" className="text-xs text-yellow-600 hover:underline mt-2 inline-block">
                    Review Now →
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Practice More Exercises</h4>
                  <p className="text-sm text-blue-700">Completing more hands-on exercises will improve your practical skills and exam performance.</p>
                  <Link href="/student/exercises" className="text-xs text-blue-600 hover:underline mt-2 inline-block">
                    View Exercises →
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Excellent Progress in React</h4>
                  <p className="text-sm text-green-700">Your React assessment scores are consistently above 90%. Keep up the great work!</p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
