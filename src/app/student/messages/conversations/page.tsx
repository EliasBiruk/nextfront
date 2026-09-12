'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useState } from 'react';

export default function ConversationsPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const conversations = [
    {
      id: 1,
      participants: [
        { name: 'Dr. Sarah Johnson', avatar: '👩‍🏫' },
        { name: 'You', avatar: '👤' }
      ],
      subject: 'JavaScript Quiz Feedback',
      status: 'active',
      lastActivity: '2 hours ago',
      unreadCount: 2,
      messages: [
        {
          id: 1,
          sender: 'Dr. Sarah Johnson',
          avatar: '👩‍🏫',
          content: 'Great job on your recent quiz! You scored 95%. Here are some detailed comments on your answers.',
          timestamp: '5 hours ago'
        },
        {
          id: 2,
          sender: 'You',
          avatar: '👤',
          content: 'Thank you, Dr. Johnson! I really appreciate the feedback. Could you elaborate on question 7?',
          timestamp: '4 hours ago'
        },
        {
          id: 3,
          sender: 'Dr. Sarah Johnson',
          avatar: '👩‍🏫',
          content: 'Of course! Question 7 was about closure. The key is understanding how functions remember their lexical environment.',
          timestamp: '2 hours ago'
        }
      ]
    },
    {
      id: 2,
      participants: [
        { name: 'React Course Group', avatar: '⚛️' },
        { name: 'You', avatar: '👤' }
      ],
      subject: 'Best practices for useState',
      status: 'active',
      lastActivity: 'Yesterday',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'John Smith',
          avatar: '👨‍💻',
          content: 'What are the best practices for using useState in React?',
          timestamp: '2 days ago'
        },
        {
          id: 2,
          sender: 'You',
          avatar: '👤',
          content: 'I found that using useEffect with dependency arrays helps manage side effects more effectively.',
          timestamp: 'Yesterday'
        }
      ]
    },
    {
      id: 3,
      participants: [
        { name: 'Prof. Michael Chen', avatar: '👨‍🏫' },
        { name: 'You', avatar: '👤' }
      ],
      subject: 'Python Exercise Extension',
      status: 'active',
      lastActivity: '3 days ago',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'Prof. Michael Chen',
          avatar: '👨‍🏫',
          content: 'I have granted you a 2-day extension for the Python exercise. Please submit by September 12th.',
          timestamp: '3 days ago'
        },
        {
          id: 2,
          sender: 'You',
          avatar: '👤',
          content: 'Thank you so much, Professor! I really appreciate the extension.',
          timestamp: '3 days ago'
        }
      ]
    },
    {
      id: 4,
      participants: [
        { name: 'Data Science Group', avatar: '📊' },
        { name: 'You', avatar: '👤' }
      ],
      subject: 'Pandas Data Analysis',
      status: 'archived',
      lastActivity: '1 week ago',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'Emily Davis',
          avatar: '👩‍💻',
          content: 'Has anyone worked with the new Pandas 2.0 features?',
          timestamp: '1 week ago'
        },
        {
          id: 2,
          sender: 'You',
          avatar: '👤',
          content: 'Yes! The new copy-on-write behavior is really helpful for performance.',
          timestamp: '1 week ago'
        }
      ]
    },
  ];

  const activeConversation = selectedConversation 
    ? conversations.find(c => c.id === selectedConversation)
    : null;

  const handleSendReply = () => {
    if (replyText.trim() && activeConversation) {
      // In a real app, this would send the message to the server
      console.log('Sending reply:', replyText);
      setReplyText('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Conversations</h1>
        <p className="text-gray-600">Manage your active conversations and message threads.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-2xl font-bold">{conversations.length}</div>
            <div className="text-blue-100 text-sm">Total Conversations</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-2xl font-bold">{conversations.filter(c => c.status === 'active').length}</div>
            <div className="text-green-100 text-sm">Active</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-2xl font-bold">{conversations.reduce((acc, c) => acc + c.unreadCount, 0)}</div>
            <div className="text-red-100 text-sm">Unread Messages</div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody className="p-4">
            <div className="text-2xl font-bold">{conversations.filter(c => c.status === 'archived').length}</div>
            <div className="text-purple-100 text-sm">Archived</div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card>
            <CardBody>
              <CardTitle>Conversations</CardTitle>
              <div className="space-y-3">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition ${
                      selectedConversation === conversation.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(conversation.status)}`}>
                        {conversation.status.toUpperCase()}
                      </span>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {conversation.participants.slice(0, 2).map((p, idx) => (
                        <div key={idx} className="text-xl">{p.avatar}</div>
                      ))}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{conversation.subject}</h3>
                    <p className="text-xs text-gray-500">
                      {conversation.participants.map(p => p.name).join(', ')}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">🕐 {conversation.lastActivity}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Conversation Detail */}
        <div className="lg:col-span-2">
          {activeConversation ? (
            <Card>
              <CardBody>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle>{activeConversation.subject}</CardTitle>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
                      Mark as Read
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
                      Archive
                    </button>
                    <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
                      Delete
                    </button>
                  </div>
                </div>

                {/* Participants */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                  <span className="text-sm text-gray-600">Participants:</span>
                  {activeConversation.participants.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <span>{p.avatar}</span>
                      <span className="text-sm">{p.name}</span>
                    </div>
                  ))}
                </div>

                {/* Messages */}
                <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === 'You' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="text-2xl">{message.avatar}</div>
                      <div className={`flex-1 ${message.sender === 'You' ? 'text-right' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{message.sender}</span>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                        <div className={`inline-block p-3 rounded-lg ${
                          message.sender === 'You'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Input */}
                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                    />
                    <button
                      onClick={handleSendReply}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody>
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-4">💬</div>
                  <p>Select a conversation to view messages</p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex gap-4">
        <Link
          href="/student/messages/inbox"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          ← Back to Inbox
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
