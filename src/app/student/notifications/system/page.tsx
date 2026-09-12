'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function SystemNotifications() {
  const notifications = [
    {
      id: 1,
      type: 'maintenance',
      title: 'Scheduled maintenance',
      message: 'System maintenance scheduled for September 10, 2026 from 2:00 AM to 4:00 AM',
      date: 'Sep 10, 2026',
      time: '2 hours ago',
      read: false,
      icon: '🔧',
      action: 'Learn More',
      actionLink: '#'
    },
    {
      id: 2,
      type: 'feature',
      title: 'New feature available',
      message: 'Check out our new AI-powered learning recommendations',
      feature: 'AI Recommendations',
      time: '1 day ago',
      read: false,
      icon: '🚀',
      action: 'Try Now',
      actionLink: '/student/learning'
    },
    {
      id: 3,
      type: 'update',
      title: 'Platform update',
      message: 'We have updated our learning dashboard with improved navigation',
      version: 'v2.5.0',
      time: '3 days ago',
      read: true,
      icon: '📱',
      action: 'View Changes',
      actionLink: '#'
    },
    {
      id: 4,
      type: 'security',
      title: 'Security alert',
      message: 'Please update your password for enhanced security',
      priority: 'High',
      time: '5 days ago',
      read: true,
      icon: '🔒',
      action: 'Update Password',
      actionLink: '/student/account'
    },
    {
      id: 5,
      type: 'policy',
      title: 'Policy update',
      message: 'Our privacy policy has been updated. Please review the changes',
      policy: 'Privacy Policy',
      time: '1 week ago',
      read: true,
      icon: '📜',
      action: 'Review Policy',
      actionLink: '#'
    },
    {
      id: 6,
      type: 'downtime',
      title: 'Service interruption',
      message: 'Brief service interruption occurred on September 1, 2026',
      duration: '15 minutes',
      time: '1 week ago',
      read: true,
      icon: '⚠️',
      action: 'View Report',
      actionLink: '#'
    },
    {
      id: 7,
      type: 'announcement',
      title: 'Important announcement',
      message: 'New courses will be added to the platform next month',
      count: '12 new courses',
      time: '2 weeks ago',
      read: true,
      icon: '📢',
      action: 'View Catalog',
      actionLink: '/student/courses'
    },
    {
      id: 8,
      type: 'feature',
      title: 'Feature improvement',
      message: 'Video player has been improved with better playback controls',
      feature: 'Video Player',
      time: '2 weeks ago',
      read: true,
      icon: '🎬',
      action: 'Try It',
      actionLink: '/student/learning'
    },
    {
      id: 9,
      type: 'update',
      title: 'Mobile app update',
      message: 'New version of the mobile app is now available',
      version: 'v3.0.0',
      time: '3 weeks ago',
      read: true,
      icon: '📲',
      action: 'Download',
      actionLink: '#'
    },
    {
      id: 10,
      type: 'maintenance',
      title: 'Maintenance completed',
      message: 'Scheduled maintenance has been completed successfully',
      date: 'Aug 25, 2026',
      time: '3 weeks ago',
      read: true,
      icon: '✅',
      action: 'View Details',
      actionLink: '#'
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type: string) => {
    const colors = {
      maintenance: 'bg-blue-100 text-blue-700',
      feature: 'bg-green-100 text-green-700',
      update: 'bg-purple-100 text-purple-700',
      security: 'bg-red-100 text-red-700',
      policy: 'bg-yellow-100 text-yellow-700',
      downtime: 'bg-orange-100 text-orange-700',
      announcement: 'bg-indigo-100 text-indigo-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    const colors = {
      High: 'bg-red-600 text-white',
      Medium: 'bg-yellow-600 text-white',
      Low: 'bg-green-600 text-white',
    };
    return (
      <span className={`px-2 py-0.5 text-xs rounded-full ${colors[priority as keyof typeof colors]}`}>
        {priority} Priority
      </span>
    );
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">System Notifications</h1>
          <Link href="/student/notifications" className="text-blue-600 hover:underline text-sm">
            View All Notifications →
          </Link>
        </div>
        <p className="text-gray-600">Stay informed about platform updates, maintenance, and announcements</p>
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
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <div className="text-sm text-gray-600">System Uptime</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-blue-600">v2.5.0</div>
            <div className="text-sm text-gray-600">Current Version</div>
          </CardBody>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>System Notifications ({notifications.length})</CardTitle>
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
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                      {!notification.read && (
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">New</span>
                      )}
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getTypeColor(notification.type)}`}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                      {notification.priority && getPriorityBadge(notification.priority)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      {notification.date && (
                        <span className="text-xs text-blue-600 font-medium">
                          {notification.date}
                        </span>
                      )}
                      {notification.feature && (
                        <span className="text-xs text-green-600 font-medium">
                          {notification.feature}
                        </span>
                      )}
                      {notification.version && (
                        <span className="text-xs text-purple-600 font-medium">
                          {notification.version}
                        </span>
                      )}
                      {notification.policy && (
                        <span className="text-xs text-yellow-600 font-medium">
                          {notification.policy}
                        </span>
                      )}
                      {notification.duration && (
                        <span className="text-xs text-orange-600 font-medium">
                          {notification.duration}
                        </span>
                      )}
                      {notification.count && (
                        <span className="text-xs text-indigo-600 font-medium">
                          {notification.count}
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

      {/* System Status */}
      <Card>
        <CardBody>
          <CardTitle>System Status</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-700 font-medium">Platform Status</span>
                <span className="text-2xl">🟢</span>
              </div>
              <div className="text-2xl font-bold text-green-900 mb-1">Operational</div>
              <div className="text-xs text-green-600">All systems running normally</div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-700 font-medium">Next Maintenance</span>
                <span className="text-2xl">🔧</span>
              </div>
              <div className="text-2xl font-bold text-blue-900 mb-1">Sep 10, 2026</div>
              <div className="text-xs text-blue-600">2:00 AM - 4:00 AM UTC</div>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-purple-700 font-medium">Latest Update</span>
                <span className="text-2xl">📱</span>
              </div>
              <div className="text-2xl font-bold text-purple-900 mb-1">v2.5.0</div>
              <div className="text-xs text-purple-600">Released 3 days ago</div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-yellow-700 font-medium">Security Status</span>
                <span className="text-2xl">🔒</span>
              </div>
              <div className="text-2xl font-bold text-yellow-900 mb-1">Secure</div>
              <div className="text-xs text-yellow-600">All security checks passed</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
