'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import Link from 'next/link';

export default function StudentMessages() {
  const messageStats = {
    total: 24,
    unread: 8,
    sent: 45,
    discussions: 12
  };

  const recentMessages = [
    {
      id: 1,
      from: 'Dr. Sarah Johnson',
      subject: 'Course Progress Update',
      preview: 'Great progress on your recent assignments. Keep up the good work!',
      date: '2 hours ago',
      unread: true,
      type: 'inbox'
    },
    {
      id: 2,
      from: 'JoyEdu Support',
      subject: 'Certificate Available',
      preview: 'Your certificate for JavaScript Fundamentals is now available for download.',
      date: 'Yesterday',
      unread: true,
      type: 'inbox'
    },
    {
      id: 3,
      from: 'Prof. Williams',
      subject: 'Math Assignment Reminder',
      preview: 'Reminder: Problem Set 5 is due this Friday. Please submit on time.',
      date: '2 days ago',
      unread: false,
      type: 'inbox'
    },
    {
      id: 4,
      to: 'Dr. Sarah Johnson',
      subject: 'Question about Chapter 4',
      preview: 'I had a question about the arrow functions section...',
      date: '3 days ago',
      unread: false,
      type: 'sent'
    }
  ];

  return (
    <DashboardLayout actor="student" userName="Student">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Manage your communications and discussions</p>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{messageStats.total}</div>
                <div className="text-blue-100 text-sm">Total Messages</div>
              </div>
              <div className="text-4xl opacity-80">📬</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{messageStats.unread}</div>
                <div className="text-orange-100 text-sm">Unread</div>
              </div>
              <div className="text-4xl opacity-80">🔔</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{messageStats.sent}</div>
                <div className="text-green-100 text-sm">Sent</div>
              </div>
              <div className="text-4xl opacity-80">📤</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{messageStats.discussions}</div>
                <div className="text-purple-100 text-sm">Discussions</div>
              </div>
              <div className="text-4xl opacity-80">💭</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Link href="/student/messages/inbox" className="block">
          <Card className="hover:shadow-lg transition cursor-pointer h-full">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">📥</div>
              <div className="font-semibold">Inbox</div>
              <div className="text-sm text-gray-600">View received messages</div>
            </CardBody>
          </Card>
        </Link>

        <Link href="/student/messages/outbox" className="block">
          <Card className="hover:shadow-lg transition cursor-pointer h-full">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">📤</div>
              <div className="font-semibold">Sent</div>
              <div className="text-sm text-gray-600">View sent messages</div>
            </CardBody>
          </Card>
        </Link>

        <Link href="/student/messages/discussions" className="block">
          <Card className="hover:shadow-lg transition cursor-pointer h-full">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">💭</div>
              <div className="font-semibold">Discussions</div>
              <div className="text-sm text-gray-600">Course discussions</div>
            </CardBody>
          </Card>
        </Link>

        <Link href="/student/messages/conversations" className="block">
          <Card className="hover:shadow-lg transition cursor-pointer h-full">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <div className="font-semibold">Conversations</div>
              <div className="text-sm text-gray-600">Direct messages</div>
            </CardBody>
          </Card>
        </Link>
      </div>

      {/* Recent Messages */}
      <Card>
        <CardBody>
          <CardTitle>Recent Messages</CardTitle>
          <div className="mt-4 space-y-4">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border rounded-lg hover:border-blue-500 transition cursor-pointer ${
                  message.unread ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {message.type === 'sent' ? `To: ${message.to}` : `From: ${message.from}`}
                      </h3>
                      {message.unread && <Badge variant="info">Unread</Badge>}
                    </div>
                    <p className="font-medium text-gray-900">{message.subject}</p>
                    <p className="text-sm text-gray-600 mt-1">{message.preview}</p>
                    <div className="text-xs text-gray-500 mt-2">{message.date}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={message.type === 'sent' ? 'success' : 'default'}>
                      {message.type}
                    </Badge>
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
