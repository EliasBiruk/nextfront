'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import Link from 'next/link';

export default function SchoolInstructorMessages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'John Smith (Student)',
      subject: 'Question about Physics Assignment',
      preview: 'I\'m having trouble with problem 3 in the homework. Can you help?',
      date: '1 hour ago',
      unread: true,
      type: 'inbox',
      category: 'Students'
    },
    {
      id: 2,
      from: 'Mary Johnson (Parent)',
      subject: 'Concern about grades',
      preview: 'I wanted to discuss my daughter\'s recent performance in Mathematics.',
      date: '3 hours ago',
      unread: true,
      type: 'inbox',
      category: 'Guardians'
    },
    {
      id: 3,
      from: 'Principal Office',
      subject: 'Staff Meeting Tomorrow',
      preview: 'Reminder: Monthly staff meeting is scheduled for tomorrow at 3 PM.',
      date: 'Yesterday',
      unread: false,
      type: 'inbox',
      category: 'School'
    },
    {
      id: 4,
      to: 'Class 10-A',
      subject: 'Physics Test Schedule',
      preview: 'The physics unit test has been rescheduled to next Monday.',
      date: '2 days ago',
      unread: false,
      type: 'sent',
      category: 'Class'
    },
    {
      id: 5,
      from: 'Dr. Chen (Colleague)',
      subject: 'Curriculum Planning',
      preview: 'Let\'s discuss the science curriculum for next semester.',
      date: '3 days ago',
      unread: false,
      type: 'inbox',
      category: 'Colleagues'
    }
  ]);

  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showComposeModal, setShowComposeModal] = useState(false);

  const categories = ['Students', 'Guardians', 'School', 'Class', 'Colleagues'];

  const filteredMessages = messages.filter(msg => {
    const matchesCategory = filterCategory === 'all' || msg.category === filterCategory;
    const matchesType = filterType === 'all' || msg.type === filterType;
    return matchesCategory && matchesType;
  });

  const markAsRead = (id: number) => {
    setMessages(prev => prev.map(m => 
      m.id === id ? { ...m, unread: false } : m
    ));
  };

  const markAllAsRead = () => {
    setMessages(prev => prev.map(m => ({ ...m, unread: false })));
  };

  const deleteMessage = (id: number) => {
    if (confirm('Delete this message?')) {
      setMessages(prev => prev.filter(m => m.id !== id));
    }
  };

  const unreadCount = messages.filter(m => m.unread).length;
  const sentCount = messages.filter(m => m.type === 'sent').length;

  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with students, guardians, and colleagues</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowComposeModal(true)}>+ Compose Message</Button>
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All as Read
          </Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="inbox">Inbox</option>
            <option value="sent">Sent</option>
          </select>
        </div>
      </div>

      {/* Message Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{messages.length}</div>
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
                <div className="text-3xl font-bold mb-1">{unreadCount}</div>
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
                <div className="text-3xl font-bold mb-1">{sentCount}</div>
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
                <div className="text-3xl font-bold mb-1">{categories.length}</div>
                <div className="text-purple-100 text-sm">Categories</div>
              </div>
              <div className="text-4xl opacity-80">📁</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Link href="/instructor/school/messages/students" className="block">
          <Card className="hover:shadow-lg transition cursor-pointer h-full">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <div className="font-semibold">Students</div>
              <div className="text-sm text-gray-600">Message students</div>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/school/messages/guardians" className="block">
          <Card className="hover:shadow-lg transition cursor-pointer h-full">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
              <div className="font-semibold">Guardians</div>
              <div className="text-sm text-gray-600">Contact guardians</div>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/school/messages/school" className="block">
          <Card className="hover:shadow-lg transition cursor-pointer h-full">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">🏫</div>
              <div className="font-semibold">School</div>
              <div className="text-sm text-gray-600">School announcements</div>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/school/messages/class" className="block">
          <Card className="hover:shadow-lg transition cursor-pointer h-full">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">📢</div>
              <div className="font-semibold">Class</div>
              <div className="text-sm text-gray-600">Class announcements</div>
            </CardBody>
          </Card>
        </Link>
      </div>

      {/* Messages List */}
      <Card>
        <CardBody>
          <CardTitle>Messages ({filteredMessages.length})</CardTitle>
          <div className="mt-4 space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border rounded-lg hover:border-blue-500 transition cursor-pointer ${
                  message.unread ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900">
                        {message.type === 'sent' ? `To: ${message.to}` : `From: ${message.from}`}
                      </h3>
                      {message.unread && <Badge variant="info">Unread</Badge>}
                      <Badge variant="default">{message.category}</Badge>
                    </div>
                    <p className="font-medium text-gray-900">{message.subject}</p>
                    <p className="text-sm text-gray-600 mt-1">{message.preview}</p>
                    <div className="text-xs text-gray-500 mt-2">{message.date}</div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {message.unread && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => markAsRead(message.id)}
                      >
                        Mark Read
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteMessage(message.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredMessages.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No messages found matching your filters.
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Compose Message Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <CardBody>
              <CardTitle>Compose Message</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="">Select recipient type...</option>
                    <option value="student">Student</option>
                    <option value="guardian">Guardian</option>
                    <option value="class">Class</option>
                    <option value="all_students">All Students</option>
                    <option value="all_guardians">All Guardians</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter subject..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={6}
                    placeholder="Enter your message..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                  <input
                    type="file"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    multiple
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => {
                  setShowComposeModal(false);
                  alert('Message sent successfully!');
                }}>
                  Send Message
                </Button>
                <Button variant="outline" onClick={() => setShowComposeModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}