'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useState } from 'react';

export default function InboxPage() {
  const [filter, setFilter] = useState<'all' | 'platform' | 'teachers' | 'discussions'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const messages = [
    {
      id: 1,
      sender: 'Platform Admin',
      senderType: 'platform',
      subject: 'Welcome to the new learning platform!',
      preview: 'We are excited to announce the launch of our new learning platform with enhanced features...',
      date: '2 hours ago',
      read: false,
      priority: 'high',
      avatar: '🎓'
    },
    {
      id: 2,
      sender: 'Dr. Sarah Johnson',
      senderType: 'teachers',
      subject: 'JavaScript Quiz Feedback',
      preview: 'Great job on your recent quiz! You scored 95%. Here are some detailed comments on your answers...',
      date: '5 hours ago',
      read: false,
      priority: 'normal',
      avatar: '👩‍🏫'
    },
    {
      id: 3,
      sender: 'React Course Discussion',
      senderType: 'discussions',
      subject: 'Re: Best practices for useState',
      preview: 'I found that using useEffect with dependency arrays helps manage side effects more effectively...',
      date: 'Yesterday',
      read: true,
      priority: 'normal',
      avatar: '💬'
    },
    {
      id: 4,
      sender: 'Platform Admin',
      senderType: 'platform',
      subject: 'System Maintenance Notice',
      preview: 'We will be performing scheduled maintenance on September 10th from 2 AM to 4 AM EST...',
      date: '2 days ago',
      read: true,
      priority: 'high',
      avatar: '🎓'
    },
    {
      id: 5,
      sender: 'Prof. Michael Chen',
      senderType: 'teachers',
      subject: 'Python Exercise Extension',
      preview: 'I have granted you a 2-day extension for the Python exercise. Please submit by September 12th...',
      date: '3 days ago',
      read: true,
      priority: 'normal',
      avatar: '👨‍🏫'
    },
    {
      id: 6,
      sender: 'Data Science Discussion',
      senderType: 'discussions',
      subject: 'New resource: Pandas Cheat Sheet',
      preview: 'Check out this comprehensive Pandas cheat sheet that covers all the essential operations...',
      date: '4 days ago',
      read: true,
      priority: 'low',
      avatar: '💬'
    },
    {
      id: 7,
      sender: 'Platform Admin',
      senderType: 'platform',
      subject: 'New Course Available: TypeScript',
      preview: 'We have just launched a new TypeScript Fundamentals course. Enroll now to enhance your skills...',
      date: '5 days ago',
      read: true,
      priority: 'normal',
      avatar: '🎓'
    },
    {
      id: 8,
      sender: 'Dr. Emily Williams',
      senderType: 'teachers',
      subject: 'Office Hours Reminder',
      preview: 'Just a reminder that my office hours are every Tuesday and Thursday from 3 PM to 5 PM...',
      date: '1 week ago',
      read: true,
      priority: 'low',
      avatar: '👩‍🏫'
    },
  ];

  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === 'all' || message.senderType === filter;
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'normal': return 'bg-blue-100 text-blue-700';
      case 'low': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSenderTypeLabel = (type: string) => {
    switch (type) {
      case 'platform': return 'Platform';
      case 'teachers': return 'Teacher';
      case 'discussions': return 'Discussion';
      default: return type;
    }
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Inbox</h1>
        <p className="text-gray-600">Manage your received messages from platform, teachers, and course discussions.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-2xl font-bold">{messages.length}</div>
            <div className="text-blue-100 text-sm">Total Messages</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-2xl font-bold">{unreadCount}</div>
            <div className="text-red-100 text-sm">Unread</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-2xl font-bold">{messages.filter(m => m.priority === 'high').length}</div>
            <div className="text-orange-100 text-sm">High Priority</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-2xl font-bold">{messages.filter(m => m.senderType === 'teachers').length}</div>
            <div className="text-green-100 text-sm">From Teachers</div>
          </CardBody>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('platform')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'platform' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Platform
              </button>
              <button
                onClick={() => setFilter('teachers')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'teachers' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Teachers
              </button>
              <button
                onClick={() => setFilter('discussions')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'discussions' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Discussions
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Messages List */}
      <Card>
        <CardBody>
          <CardTitle>Messages ({filteredMessages.length})</CardTitle>
          <div className="space-y-3">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer ${
                  !message.read ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{message.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(message.priority)}`}>
                        {message.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getSenderTypeLabel(message.senderType)}
                      </span>
                      {!message.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    <h3 className={`font-semibold ${!message.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {message.subject}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{message.sender}</p>
                    <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>🕐 {message.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                      View
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredMessages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📭</div>
              <p>No messages found</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Navigation */}
      <div className="mt-6 flex gap-4">
        <Link
          href="/student/messages/conversations"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          View Conversations →
        </Link>
        <Link
          href="/student/messages/outbox"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          View Outbox →
        </Link>
      </div>
    </DashboardLayout>
  );
}
