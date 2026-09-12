'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function InstructorInbox() {
  const { currentUser } = useAuth();

  const messages = [
    {
      id: 1,
      from: 'John Smith',
      subject: 'Question about React course',
      preview: 'I was wondering if you could explain the concept of hooks in more detail...',
      date: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      from: 'Sarah Johnson',
      subject: 'Feedback on TypeScript module',
      preview: 'Great content! I especially liked the section on type inference...',
      date: '5 hours ago',
      unread: true
    },
    {
      id: 3,
      from: 'Michael Chen',
      subject: 'Request for additional resources',
      preview: 'Is there any supplementary material available for the advanced patterns section?',
      date: '1 day ago',
      unread: false
    },
  ];

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Inbox</h1>
        <p className="text-gray-600">View and respond to messages from students</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Messages</CardTitle>
          <div className="space-y-4 mt-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition ${message.unread ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`font-medium ${message.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                        {message.from}
                      </span>
                      {message.unread && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                    </div>
                    <div className="font-medium text-gray-900 mt-1">{message.subject}</div>
                    <div className="text-sm text-gray-600 mt-1">{message.preview}</div>
                  </div>
                  <div className="text-sm text-gray-500 ml-4">{message.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
