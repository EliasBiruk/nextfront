'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function AchievementsNotifications() {
  const notifications = [
    {
      id: 1,
      type: 'badge',
      title: 'Badge earned!',
      message: 'You earned the "Quick Learner" badge for completing 5 lessons in one day',
      badge: 'Quick Learner',
      badgeIcon: '⚡',
      time: '2 hours ago',
      read: false,
      icon: '🏆',
      action: 'View Badge',
      actionLink: '/student/achievements'
    },
    {
      id: 2,
      type: 'xp',
      title: 'XP gained',
      message: 'You earned 150 XP for completing the JavaScript Quiz',
      xp: 150,
      time: '5 hours ago',
      read: false,
      icon: '⭐',
      action: 'View XP',
      actionLink: '/student/achievements'
    },
    {
      id: 3,
      type: 'level',
      title: 'Level up!',
      message: 'Congratulations! You reached Level 18',
      level: 18,
      time: '1 day ago',
      read: true,
      icon: '🎉',
      action: 'View Profile',
      actionLink: '/student/account'
    },
    {
      id: 4,
      type: 'streak',
      title: 'Streak achievement',
      message: 'You maintained a 12-day learning streak',
      streak: 12,
      time: '2 days ago',
      read: true,
      icon: '🔥',
      action: 'Keep Going',
      actionLink: '/student/learning'
    },
    {
      id: 5,
      type: 'reward',
      title: 'Reward unlocked',
      message: 'You unlocked a premium course discount',
      reward: '20% Course Discount',
      time: '3 days ago',
      read: true,
      icon: '🎁',
      action: 'Use Reward',
      actionLink: '/student/courses'
    },
    {
      id: 6,
      type: 'badge',
      title: 'Badge earned!',
      message: 'You earned the "Quiz Master" badge for scoring 95%+ on 3 quizzes',
      badge: 'Quiz Master',
      badgeIcon: '📝',
      time: '4 days ago',
      read: true,
      icon: '🏆',
      action: 'View Badge',
      actionLink: '/student/achievements'
    },
    {
      id: 7,
      type: 'xp',
      title: 'XP milestone',
      message: 'You reached 4,000 total XP',
      xp: 4000,
      time: '5 days ago',
      read: true,
      icon: '⭐',
      action: 'View Progress',
      actionLink: '/student/achievements'
    },
    {
      id: 8,
      type: 'streak',
      title: 'Personal best streak',
      message: 'You beat your personal best with a 12-day streak',
      streak: 12,
      time: '6 days ago',
      read: true,
      icon: '🏅',
      action: 'View Stats',
      actionLink: '/student/analytics'
    },
    {
      id: 9,
      type: 'reward',
      title: 'New reward available',
      message: 'Earn 500 more XP to unlock a new badge',
      reward: 'New Badge',
      time: '1 week ago',
      read: true,
      icon: '🎁',
      action: 'View Rewards',
      actionLink: '/student/achievements'
    },
    {
      id: 10,
      type: 'badge',
      title: 'Badge earned!',
      message: 'You earned the "Consistent Learner" badge for 7-day streak',
      badge: 'Consistent Learner',
      badgeIcon: '📚',
      time: '1 week ago',
      read: true,
      icon: '🏆',
      action: 'View Badge',
      actionLink: '/student/achievements'
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type: string) => {
    const colors = {
      badge: 'bg-yellow-100 text-yellow-700',
      xp: 'bg-purple-100 text-purple-700',
      level: 'bg-blue-100 text-blue-700',
      streak: 'bg-orange-100 text-orange-700',
      reward: 'bg-green-100 text-green-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Achievement Notifications</h1>
          <Link href="/student/notifications" className="text-blue-600 hover:underline text-sm">
            View All Notifications →
          </Link>
        </div>
        <p className="text-gray-600">Celebrate your badges, XP, levels, streaks, and rewards</p>
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
            <div className="text-2xl font-bold text-purple-600">4,820</div>
            <div className="text-sm text-gray-600">Total XP</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-yellow-600">24</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </CardBody>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Achievement Notifications ({notifications.length})</CardTitle>
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
                      {notification.badge && (
                        <span className="text-xs text-yellow-600 font-medium">
                          {notification.badgeIcon} {notification.badge}
                        </span>
                      )}
                      {notification.xp && (
                        <span className="text-xs text-purple-600 font-medium">
                          +{notification.xp} XP
                        </span>
                      )}
                      {notification.level && (
                        <span className="text-xs text-blue-600 font-medium">
                          Level {notification.level}
                        </span>
                      )}
                      {notification.streak && (
                        <span className="text-xs text-orange-600 font-medium">
                          {notification.streak} Day Streak
                        </span>
                      )}
                      {notification.reward && (
                        <span className="text-xs text-green-600 font-medium">
                          {notification.reward}
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

      {/* Recent Achievements */}
      <Card>
        <CardBody>
          <CardTitle>Recent Achievements</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200 text-center">
              <div className="text-4xl mb-2">⚡</div>
              <div className="font-semibold text-yellow-900">Quick Learner</div>
              <div className="text-xs text-yellow-600 mt-1">Earned today</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 text-center">
              <div className="text-4xl mb-2">📝</div>
              <div className="font-semibold text-purple-900">Quiz Master</div>
              <div className="text-xs text-purple-600 mt-1">Earned 4 days ago</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200 text-center">
              <div className="text-4xl mb-2">🔥</div>
              <div className="font-semibold text-orange-900">12-Day Streak</div>
              <div className="text-xs text-orange-600 mt-1">Current streak</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <div className="font-semibold text-blue-900">Level 18</div>
              <div className="text-xs text-blue-600 mt-1">Reached 6 days ago</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
