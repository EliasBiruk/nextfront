'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

export default function StudentPlayground() {
  const playgroundSections = [
    { title: 'My Projects', description: 'View and manage your coding projects', icon: '📁', path: '/student/playground/projects' },
    { title: 'New Project', description: 'Create a new coding project', icon: '➕', path: '/student/playground/new' },
    { title: 'HTML Playground', description: 'HTML, CSS, and JavaScript editor', icon: '🌐', path: '/student/playground/html' },
    { title: 'CSS Playground', description: 'CSS styling and animations', icon: '🎨', path: '/student/playground/css' },
    { title: 'JavaScript Playground', description: 'JavaScript code editor', icon: '⚡', path: '/student/playground/javascript' },
    { title: 'React Playground', description: 'React component builder', icon: '⚛️', path: '/student/playground/react' },
    { title: 'Python Playground', description: 'Python code editor', icon: '🐍', path: '/student/playground/python' },
    { title: 'Challenges', description: 'Coding challenges and competitions', icon: '🏆', path: '/student/playground/challenges' },
    { title: 'Saved Projects', description: 'View past versions and history', icon: '💾', path: '/student/playground/saved' },
    { title: 'Shared Projects', description: 'Explore community projects', icon: '🔗', path: '/student/playground/shared' }
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Playground</h1>
        <p className="text-gray-600">Interactive coding environment with multiple language support</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-blue-600">5</div>
            <div className="text-gray-600 text-sm">Active Projects</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-green-600">9</div>
            <div className="text-gray-600 text-sm">Challenges Completed</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-purple-600">350</div>
            <div className="text-gray-600 text-sm">Total Points</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-orange-600">#4</div>
            <div className="text-gray-600 text-sm">Leaderboard Rank</div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Quick Actions</CardTitle>
          <div className="flex gap-3 flex-wrap">
            <Link href="/student/playground/new">
              <Button variant="primary">+ New Project</Button>
            </Link>
            <Link href="/student/playground/projects">
              <Button variant="outline">My Projects</Button>
            </Link>
            <Link href="/student/playground/challenges">
              <Button variant="outline">View Challenges</Button>
            </Link>
            <Link href="/student/playground/shared">
              <Button variant="outline">Explore Shared</Button>
            </Link>
          </div>
        </CardBody>
      </Card>

      {/* Playground Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playgroundSections.map((section) => (
          <Link key={section.path} href={section.path}>
            <Card className="hover:shadow-md transition-all cursor-pointer h-full">
              <CardBody>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{section.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{section.title}</h3>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}