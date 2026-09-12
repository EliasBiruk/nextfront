'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function AllNotifications() {
  const [filterType, setFilterType] = useState('all');
  const [filterRead, setFilterRead] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'learning',
      title: 'New lesson available',
      message: 'JavaScript Fundamentals - Chapter 5: Async/Await is now available',
      time: '2 hours ago',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      icon: '📚',
      action: 'View Lesson',
      actionLink: '/student/learning'
    },
    {
      id: 2,
      type: 'assessment',
      title: 'Quiz deadline reminder',
      message: 'React Quiz is due tomorrow at 11:59 PM',
      time: '5 hours ago',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false,
      icon: '📝',
      action: 'Take Quiz',
      actionLink: '/student/quizzes'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Achievement unlocked!',
      message: 'You earned the "Quick Learner" badge for completing 5 lessons in one day',
      time: '1 day ago',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      icon: '🏆',
      action: 'View Badge',
      actionLink: '/student/achievements'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment successful',
      message: 'Your subscription has been renewed successfully',
      time: '2 days ago',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      icon: '💳',
      action: 'View Invoice',
      actionLink: '/student/payments'
    },
    {
      id: 5,
      type: 'system',
      title: 'System maintenance',
      message: 'Scheduled maintenance on September 10, 2026 from 2:00 AM to 4:00 AM',
      time: '3 days ago',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true,
      icon: '🔧',
      action: 'Learn More',
      actionLink: '#'
    },
    {
      id: 6,
      type: 'learning',
      title: 'Course completed',
      message: 'Congratulations! You completed HTML & CSS Fundamentals',
      time: '4 days ago',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      read: true,
      icon: '🎉',
      action: 'View Certificate',
      actionLink: '/student/certificates'
    },
    {
      id: 7,
      type: 'assessment',
      title: 'Exercise graded',
      message: 'Your Python exercise received a score of 95/100',
      time: '5 days ago',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      read: true,
      icon: '✅',
      action: 'View Results',
      actionLink: '/student/exercises'
    },
    {
      id: 8,
      type: 'achievement',
      title: 'Level up!',
      message: 'You reached Level 18! Keep up the great work',
      time: '6 days ago',
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      read: true,
      icon: '⭐',
      action: 'View Profile',
      actionLink: '/student/account'
    },
    {
      id: 9,
      type: 'payment',
      title: 'Invoice due',
      message: 'Invoice #INV-2026-003 is due on September 15, 2026',
      time: '1 week ago',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      read: false,
      icon: '📄',
      action: 'Pay Now',
      actionLink: '/student/payments'
    },
    {
      id: 10,
      type: 'system',
      title: 'New feature available',
      message: 'Check out our new AI-powered learning recommendations',
      time: '1 week ago',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      read: true,
      icon: '🚀',
      action: 'Try Now',
      actionLink: '/student/learning'
    },
  ];

  const filteredNotifications = notifications.filter(notif => {
    if (filterType !== 'all' && notif.type !== filterType) return false;
    if (filterRead === 'read' && !notif.read) return false;
    if (filterRead === 'unread' && notif.read) return false;
    if (filterDate === 'today') {
      const today = new Date();
      return notif.date.toDateString() === today.toDateString();
    }
    if (filterDate === 'week') {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return notif.date >= weekAgo;
    }
    if (filterDate === 'month') {
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return notif.date >= monthAgo;
    }
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const totalCount = notifications.length;

  const typeColors = {
    learning: 'bg-blue-100 text-blue-700',
    assessment: 'bg-orange-100 text-orange-700',
    achievement: 'bg-purple-100 text-purple-700',
    payment: 'bg-green-100 text-green-700',
    system: 'bg-gray-100 text-gray-700',
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">All Notifications</h1>
        <p className="text-gray-600">Manage all your notifications in one place</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-gray-900">{totalCount}</div>
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
            <div className="text-2xl font-bold text-green-600">{totalCount - unreadCount}</div>
            <div className="text-sm text-gray-600">Read</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-600">This Week</div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="learning">Learning</option>
                <option value="assessment">Assessments</option>
                <option value="achievement">Achievements</option>
                <option value="payment">Payments</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Read Status</label>
              <select
                value={filterRead}
                onChange={(e) => setFilterRead(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div className="flex items-end gap-2 ml-auto">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Mark All as Read
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Delete All
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardBody>
          <CardTitle>Notifications ({filteredNotifications.length})</CardTitle>
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
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
                      <span className={`px-2 py-0.5 text-xs rounded-full ${typeColors[notification.type]}`}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">{notification.time}</span>
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

      {/* Quick Links */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <Link href="/student/notifications/learning" className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition text-center">
          <div className="text-2xl mb-2">📚</div>
          <div className="font-medium text-blue-900">Learning</div>
        </Link>
        <Link href="/student/notifications/assessments" className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition text-center">
          <div className="text-2xl mb-2">📝</div>
          <div className="font-medium text-orange-900">Assessments</div>
        </Link>
        <Link href="/student/notifications/achievements" className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition text-center">
          <div className="text-2xl mb-2">🏆</div>
          <div className="font-medium text-purple-900">Achievements</div>
        </Link>
        <Link href="/student/notifications/payments" className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition text-center">
          <div className="text-2xl mb-2">💳</div>
          <div className="font-medium text-green-900">Payments</div>
        </Link>
        <Link href="/student/notifications/system" className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition text-center">
          <div className="text-2xl mb-2">🔧</div>
          <div className="font-medium text-gray-900">System</div>
        </Link>
      </div>
    </DashboardLayout>
  );
}
