'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function InstructorNotifications() {
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'course',
      title: 'Course approved',
      message: 'Your course "React & Next.js Full Stack" has been approved and is now live.',
      date: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      type: 'student',
      title: 'New enrollment',
      message: 'John Smith enrolled in your TypeScript Fundamentals course.',
      date: '5 hours ago',
      unread: true
    },
    {
      id: 3,
      type: 'financial',
      title: 'Payout processed',
      message: 'Your payout of $5,000 has been processed and sent to your bank account.',
      date: '1 day ago',
      unread: false
    },
    {
      id: 4,
      type: 'course',
      title: 'Course review pending',
      message: 'Your course "Advanced JavaScript Patterns" is under review.',
      date: '2 days ago',
      unread: false
    },
    {
      id: 5,
      type: 'student',
      title: 'Student question',
      message: 'Sarah Johnson asked a question in your React course discussions.',
      date: '3 days ago',
      unread: false
    },
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
    ? notifications.filter(n => n.unread)
    : notifications.filter(n => !n.unread);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return '📚';
      case 'student': return '👨‍🎓';
      case 'financial': return '💰';
      default: return '🔔';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      case 'financial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">Stay updated with your course activities and platform updates</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === 'unread' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Unread ({notifications.filter(n => n.unread).length})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === 'read' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Read ({notifications.filter(n => !n.unread).length})
        </button>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Recent Notifications</CardTitle>
          <div className="space-y-4 mt-4">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 border rounded-lg hover:border-blue-500 transition cursor-pointer ${
                  notification.unread ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{getTypeIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                        {notification.type}
                      </span>
                      {notification.unread && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                    </div>
                    <div className={`font-medium mt-2 ${notification.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                    <div className="text-xs text-gray-500 mt-2">{notification.date}</div>
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
