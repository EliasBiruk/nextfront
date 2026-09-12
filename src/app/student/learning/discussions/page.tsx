'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useState } from 'react';

export default function DiscussionsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recordings' | 'forums'>('upcoming');

  const upcomingSessions = [
    {
      id: 1,
      title: 'JavaScript Q&A Session',
      course: 'JavaScript Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      date: 'Today',
      time: '3:00 PM - 4:00 PM',
      duration: '1 hour',
      participants: 45,
      status: 'live',
      icon: '🔴'
    },
    {
      id: 2,
      title: 'React Hooks Deep Dive',
      course: 'React Development',
      instructor: 'Prof. Michael Chen',
      date: 'Tomorrow',
      time: '10:00 AM - 11:30 AM',
      duration: '1.5 hours',
      participants: 67,
      status: 'scheduled',
      icon: '📅'
    },
    {
      id: 3,
      title: 'Python Data Visualization Workshop',
      course: 'Python for Data Science',
      instructor: 'Dr. Emily Davis',
      date: 'Sep 10',
      time: '2:00 PM - 3:30 PM',
      duration: '1.5 hours',
      participants: 52,
      status: 'scheduled',
      icon: '📅'
    },
    {
      id: 4,
      title: 'TypeScript Best Practices',
      course: 'TypeScript Fundamentals',
      instructor: 'Prof. Alex Thompson',
      date: 'Sep 12',
      time: '11:00 AM - 12:00 PM',
      duration: '1 hour',
      participants: 38,
      status: 'scheduled',
      icon: '📅'
    },
  ];

  const recordedSessions = [
    {
      id: 1,
      title: 'Introduction to React',
      course: 'React Development',
      instructor: 'Prof. Michael Chen',
      date: 'Sep 1, 2026',
      duration: '1 hour 45 min',
      views: 1234,
      thumbnail: '⚛️',
      status: 'available'
    },
    {
      id: 2,
      title: 'JavaScript Async Patterns',
      course: 'JavaScript Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      date: 'Aug 28, 2026',
      duration: '1 hour 30 min',
      views: 987,
      thumbnail: '🟨',
      status: 'available'
    },
    {
      id: 3,
      title: 'Pandas Data Analysis',
      course: 'Python for Data Science',
      instructor: 'Dr. Emily Davis',
      date: 'Aug 25, 2026',
      duration: '2 hours',
      views: 756,
      thumbnail: '🐍',
      status: 'available'
    },
    {
      id: 4,
      title: 'TypeScript Generics Explained',
      course: 'TypeScript Fundamentals',
      instructor: 'Prof. Alex Thompson',
      date: 'Aug 22, 2026',
      duration: '1 hour 15 min',
      views: 543,
      thumbnail: '📘',
      status: 'available'
    },
  ];

  const discussionForums = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      course: 'JavaScript Fundamentals',
      topics: 156,
      posts: 892,
      lastActivity: '5 minutes ago',
      lastPost: 'Help with async/await',
      icon: '🟨',
      status: 'active'
    },
    {
      id: 2,
      title: 'React Development',
      course: 'React Development',
      topics: 234,
      posts: 1456,
      lastActivity: '12 minutes ago',
      lastPost: 'Best practices for state management',
      icon: '⚛️',
      status: 'active'
    },
    {
      id: 3,
      title: 'Python for Data Science',
      course: 'Python for Data Science',
      topics: 189,
      posts: 1023,
      lastActivity: '1 hour ago',
      lastPost: 'Pandas dataframe optimization',
      icon: '🐍',
      status: 'active'
    },
    {
      id: 4,
      title: 'TypeScript Fundamentals',
      course: 'TypeScript Fundamentals',
      topics: 98,
      posts: 456,
      lastActivity: '2 hours ago',
      lastPost: 'Generic type constraints',
      icon: '📘',
      status: 'active'
    },
  ];

  const recentDiscussions = [
    {
      id: 1,
      title: 'How to handle nested async functions?',
      forum: 'JavaScript Fundamentals',
      author: 'Student123',
      replies: 12,
      views: 234,
      lastActivity: '5 minutes ago',
      icon: '💬'
    },
    {
      id: 2,
      title: 'useEffect dependency array best practices',
      forum: 'React Development',
      author: 'DevLearner',
      replies: 18,
      views: 456,
      lastActivity: '12 minutes ago',
      icon: '💬'
    },
    {
      id: 3,
      title: 'Optimizing large dataset processing',
      forum: 'Python for Data Science',
      author: 'DataEnthusiast',
      replies: 8,
      views: 189,
      lastActivity: '1 hour ago',
      icon: '💬'
    },
    {
      id: 4,
      title: 'Type inference with generic types',
      forum: 'TypeScript Fundamentals',
      author: 'TypeScriptFan',
      replies: 6,
      views: 123,
      lastActivity: '2 hours ago',
      icon: '💬'
    },
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Live Classes & Discussions</h1>
        <p className="text-gray-600">Join live sessions, watch recordings, and participate in discussions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{upcomingSessions.filter(s => s.status === 'live').length}</div>
                <div className="text-red-100 text-sm">Live Now</div>
              </div>
              <div className="text-4xl opacity-80">🔴</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{upcomingSessions.length}</div>
                <div className="text-blue-100 text-sm">Upcoming Sessions</div>
              </div>
              <div className="text-4xl opacity-80">📅</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{recordedSessions.length}</div>
                <div className="text-purple-100 text-sm">Recordings</div>
              </div>
              <div className="text-4xl opacity-80">🎬</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{discussionForums.reduce((acc, f) => acc + f.posts, 0)}</div>
                <div className="text-green-100 text-sm">Forum Posts</div>
              </div>
              <div className="text-4xl opacity-80">💬</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'upcoming'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Upcoming Sessions
        </button>
        <button
          onClick={() => setActiveTab('recordings')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'recordings'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Recordings
        </button>
        <button
          onClick={() => setActiveTab('forums')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'forums'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Discussion Forums
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <Card key={session.id} className={session.status === 'live' ? 'border-red-500 border-2' : ''}>
              <CardBody>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{session.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{session.title}</h3>
                      {session.status === 'live' && (
                        <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full animate-pulse">
                          LIVE
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{session.course}</p>
                    <p className="text-sm text-gray-500">Instructor: {session.instructor}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>📅 {session.date}</span>
                      <span>⏰ {session.time}</span>
                      <span>⏱️ {session.duration}</span>
                      <span>👥 {session.participants} participants</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {session.status === 'live' ? (
                      <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center gap-2">
                        <span>Join Now</span>
                        <span>🔴</span>
                      </button>
                    ) : (
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                        Set Reminder
                      </button>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'recordings' && (
        <div className="space-y-4">
          {recordedSessions.map((session) => (
            <Card key={session.id}>
              <CardBody>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{session.thumbnail}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{session.title}</h3>
                    <p className="text-sm text-gray-600">{session.course}</p>
                    <p className="text-sm text-gray-500">Instructor: {session.instructor}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>📅 {session.date}</span>
                      <span>⏱️ {session.duration}</span>
                      <span>👁️ {session.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center gap-2">
                      <span>Watch Replay</span>
                      <span>▶️</span>
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'forums' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Forum List */}
          <div className="lg:col-span-2 space-y-4">
            {discussionForums.map((forum) => (
              <Card key={forum.id}>
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{forum.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">{forum.title}</h3>
                      <p className="text-sm text-gray-600">{forum.course}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>📋 {forum.topics} topics</span>
                        <span>💬 {forum.posts} posts</span>
                        <span>🕐 {forum.lastActivity}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Last post: {forum.lastPost}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      View Forum
                    </button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Recent Discussions */}
          <div>
            <Card>
              <CardBody>
                <CardTitle>Recent Discussions</CardTitle>
                <div className="space-y-3">
                  {recentDiscussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xl">{discussion.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm mb-1">{discussion.title}</h4>
                          <p className="text-xs text-gray-600">{discussion.forum}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                            <span>👤 {discussion.author}</span>
                            <span>💬 {discussion.replies} replies</span>
                            <span>👁️ {discussion.views} views</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">🕐 {discussion.lastActivity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                  View All Discussions
                </button>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
