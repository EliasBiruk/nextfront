'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useState } from 'react';

export default function OutboxPage() {
  const [filter, setFilter] = useState<'all' | 'sent' | 'delivered' | 'read' | 'failed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sentMessages = [
    {
      id: 1,
      recipient: 'Dr. Sarah Johnson',
      recipientType: 'teacher',
      subject: 'Question about JavaScript Quiz',
      content: 'I had a question about question 7 on the recent quiz. Could you please clarify?',
      date: '2 hours ago',
      status: 'read',
      deliveryStatus: 'delivered',
      readAt: '1 hour ago',
      avatar: '👩‍🏫'
    },
    {
      id: 2,
      recipient: 'React Course Group',
      recipientType: 'discussion',
      subject: 'Re: Best practices for useState',
      content: 'I found that using useEffect with dependency arrays helps manage side effects more effectively.',
      date: 'Yesterday',
      status: 'delivered',
      deliveryStatus: 'delivered',
      avatar: '⚛️'
    },
    {
      id: 3,
      recipient: 'Prof. Michael Chen',
      recipientType: 'teacher',
      subject: 'Thank you for the extension',
      content: 'Thank you so much for granting me the extension on the Python exercise. I really appreciate it.',
      date: '3 days ago',
      status: 'delivered',
      deliveryStatus: 'delivered',
      readAt: '2 days ago',
      avatar: '👨‍🏫'
    },
    {
      id: 4,
      recipient: 'Platform Support',
      recipientType: 'platform',
      subject: 'Technical Issue Report',
      content: 'I am experiencing issues with the video player in the JavaScript course. The videos keep buffering.',
      date: '4 days ago',
      status: 'sent',
      deliveryStatus: 'pending',
      avatar: '🎓'
    },
    {
      id: 5,
      recipient: 'Data Science Group',
      recipientType: 'discussion',
      subject: 'Re: Pandas Data Analysis',
      content: 'Yes! The new copy-on-write behavior in Pandas 2.0 is really helpful for performance.',
      date: '1 week ago',
      status: 'read',
      deliveryStatus: 'delivered',
      readAt: '6 days ago',
      avatar: '📊'
    },
    {
      id: 6,
      recipient: 'Dr. Emily Williams',
      recipientType: 'teacher',
      subject: 'Office Hours Appointment',
      content: 'I would like to schedule an appointment during your office hours on Tuesday.',
      date: '1 week ago',
      status: 'failed',
      deliveryStatus: 'failed',
      errorMessage: 'Recipient inbox full',
      avatar: '👩‍🏫'
    },
    {
      id: 7,
      recipient: 'Study Group',
      recipientType: 'discussion',
      subject: 'Study Session Schedule',
      content: 'Let\'s schedule a study session for the upcoming React exam. How about this Saturday?',
      date: '2 weeks ago',
      status: 'read',
      deliveryStatus: 'delivered',
      readAt: '2 weeks ago',
      avatar: '👥'
    },
  ];

  const filteredMessages = sentMessages.filter(message => {
    const matchesFilter = filter === 'all' || message.status === filter;
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'read': return 'bg-purple-100 text-purple-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDeliveryStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return '✅';
      case 'pending': return '⏳';
      case 'failed': return '❌';
      default: return '📤';
    }
  };

  const getRecipientTypeLabel = (type: string) => {
    switch (type) {
      case 'platform': return 'Platform';
      case 'teacher': return 'Teacher';
      case 'discussion': return 'Discussion';
      default: return type;
    }
  };

  const handleResend = (messageId: number) => {
    console.log('Resending message:', messageId);
    // In a real app, this would trigger a resend
  };

  const handleFollowUp = (messageId: number) => {
    console.log('Following up on message:', messageId);
    // In a real app, this would open a follow-up compose dialog
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Outbox</h1>
        <p className="text-gray-600">View your sent messages, track delivery status, and manage follow-ups.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-2xl font-bold">{sentMessages.length}</div>
            <div className="text-blue-100 text-sm">Total Sent</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-2xl font-bold">{sentMessages.filter(m => m.status === 'delivered' || m.status === 'read').length}</div>
            <div className="text-green-100 text-sm">Delivered</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-2xl font-bold">{sentMessages.filter(m => m.status === 'read').length}</div>
            <div className="text-purple-100 text-sm">Read</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-2xl font-bold">{sentMessages.filter(m => m.status === 'failed').length}</div>
            <div className="text-red-100 text-sm">Failed</div>
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
                placeholder="Search sent messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
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
                onClick={() => setFilter('sent')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'sent' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sent
              </button>
              <button
                onClick={() => setFilter('delivered')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'delivered' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Delivered
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'read' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Read
              </button>
              <button
                onClick={() => setFilter('failed')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'failed' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Failed
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Sent Messages List */}
      <Card>
        <CardBody>
          <CardTitle>Sent Messages ({filteredMessages.length})</CardTitle>
          <div className="space-y-3">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{message.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(message.status)}`}>
                        {message.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getRecipientTypeLabel(message.recipientType)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getDeliveryStatusIcon(message.deliveryStatus)} {message.deliveryStatus.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{message.subject}</h3>
                    <p className="text-sm text-gray-600 mb-1">To: {message.recipient}</p>
                    <p className="text-sm text-gray-500 truncate">{message.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 flex-wrap">
                      <span>🕐 {message.date}</span>
                      {message.readAt && (
                        <span>👁️ Read at {message.readAt}</span>
                      )}
                      {message.errorMessage && (
                        <span className="text-red-600">⚠️ {message.errorMessage}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                      View
                    </button>
                    {message.status === 'failed' && (
                      <button
                        onClick={() => handleResend(message.id)}
                        className="px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                      >
                        Resend
                      </button>
                    )}
                    {(message.status === 'delivered' || message.status === 'read') && (
                      <button
                        onClick={() => handleFollowUp(message.id)}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Follow Up
                      </button>
                    )}
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredMessages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📤</div>
              <p>No sent messages found</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Navigation */}
      <div className="mt-6 flex gap-4">
        <Link
          href="/student/messages/inbox"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          ← Back to Inbox
        </Link>
        <Link
          href="/student/messages/conversations"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          View Conversations →
        </Link>
      </div>
    </DashboardLayout>
  );
}
