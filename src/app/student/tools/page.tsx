'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function StudentTools() {
  const tools = [
    {
      name: 'Notes',
      description: 'Create and manage your personal study notes',
      icon: '�',
      category: 'Productivity',
      link: '/student/notes'
    },
    {
      name: 'Bookmarks',
      description: 'Save and organize lessons, courses, and resources',
      icon: '�',
      category: 'Organization',
      link: '/student/tools/bookmarks'
    },
    {
      name: 'Calendar',
      description: 'Track deadlines, exams, and study schedules',
      icon: '📅',
      category: 'Planning',
      link: '/student/tools/calendar'
    },
    {
      name: 'Study Planner',
      description: 'Plan your learning path and set goals',
      icon: '📋',
      category: 'Planning',
      link: '/student/tools/planner'
    },
    {
      name: 'Downloads',
      description: 'Access your downloaded materials and resources',
      icon: '📥',
      category: 'Resources',
      link: '/student/tools/downloads'
    },
  ];

  const comingSoonTools = [
    {
      name: 'Code Editor',
      description: 'Write and run code in multiple languages',
      icon: '�',
      category: 'Development'
    },
    {
      name: 'Quiz Generator',
      description: 'Create practice quizzes from your notes',
      icon: '📝',
      category: 'Study'
    },
    {
      name: 'Flashcard Maker',
      description: 'Create digital flashcards for memorization',
      icon: '🃏',
      category: 'Study'
    },
    {
      name: 'Study Timer',
      description: 'Pomodoro timer for focused study sessions',
      icon: '⏱️',
      category: 'Productivity'
    },
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Learning Tools</h1>
        <p className="text-gray-600">Enhance your learning with helpful utilities</p>
      </div>

      {/* Available Tools */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Available Tools</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.name} href={tool.link}>
                <Card className="hover:shadow-lg transition cursor-pointer h-full">
                  <CardBody>
                    <div className="text-4xl mb-4">{tool.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                    <span className="text-xs text-blue-600 font-medium">{tool.category}</span>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Coming Soon */}
      <Card>
        <CardBody>
          <CardTitle>Coming Soon</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonTools.map((tool) => (
              <Card key={tool.name} className="opacity-60 h-full">
                <CardBody>
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                  <span className="text-xs text-gray-500 font-medium">{tool.category}</span>
                  <div className="mt-3">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Coming Soon</span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}