'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function InstructorDiscussions() {
  const { currentUser } = useAuth();

  const discussions = [
    {
      id: 1,
      course: 'React & Next.js Full Stack',
      topic: 'Understanding useEffect dependency array',
      author: 'John Smith',
      replies: 12,
      lastActivity: '30 minutes ago'
    },
    {
      id: 2,
      course: 'TypeScript Fundamentals',
      topic: 'Generic types explanation needed',
      author: 'Sarah Johnson',
      replies: 8,
      lastActivity: '2 hours ago'
    },
    {
      id: 3,
      course: 'Advanced JavaScript Patterns',
      topic: 'Closure scope chain question',
      author: 'Michael Chen',
      replies: 5,
      lastActivity: '1 day ago'
    },
  ];

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Discussions</h1>
        <p className="text-gray-600">Student discussions and Q&A across your courses</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Active Discussions</CardTitle>
          <div className="space-y-4 mt-4">
            {discussions.map((discussion) => (
              <div 
                key={discussion.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-blue-600 font-medium">{discussion.course}</div>
                    <div className="font-medium text-gray-900 mt-1">{discussion.topic}</div>
                    <div className="text-sm text-gray-600 mt-1">Started by {discussion.author}</div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm text-gray-600">{discussion.replies} replies</div>
                    <div className="text-xs text-gray-500">{discussion.lastActivity}</div>
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
