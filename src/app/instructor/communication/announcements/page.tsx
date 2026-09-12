'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { useAuth } from '@/context/AuthContext';

export default function InstructorAnnouncements() {
  const { currentUser } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });

  const announcements = [
    {
      id: 1,
      title: 'Course Update: New Module Added',
      content: 'We have added a new module on advanced React patterns covering custom hooks and context API.',
      date: '2 days ago',
      course: 'React & Next.js Full Stack'
    },
    {
      id: 2,
      title: 'Live Q&A Session Schedule',
      content: 'Join us for a live Q&A session this Friday at 3 PM EST to discuss any questions about the course.',
      date: '5 days ago',
      course: 'TypeScript Fundamentals'
    },
  ];

  const handleCreate = () => {
    setIsCreating(false);
    setNewAnnouncement({ title: '', content: '' });
  };

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Announcements</h1>
        <p className="text-gray-600">Create and manage course announcements for your students</p>
      </div>

      <Card className="mb-6">
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Create Announcement</CardTitle>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)}>New Announcement</Button>
            )}
          </div>
          
          {isCreating ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Announcement title"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Announcement content"
                rows={4}
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <Button onClick={handleCreate}>Publish</Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
              </div>
            </div>
          ) : null}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle>Recent Announcements</CardTitle>
          <div className="space-y-4 mt-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{announcement.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{announcement.content}</div>
                    <div className="text-xs text-gray-500 mt-2">
                      {announcement.course} • {announcement.date}
                    </div>
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
