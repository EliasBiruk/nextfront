'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  language: string;
  icon: string;
  lastModified: string;
  status: 'active' | 'archived';
  description: string;
}

export default function ProjectsPage() {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Portfolio Website',
      language: 'html',
      icon: '🌐',
      lastModified: '2 hours ago',
      status: 'active',
      description: 'Personal portfolio with HTML and CSS'
    },
    {
      id: '2',
      name: 'Interactive Calculator',
      language: 'javascript',
      icon: '⚡',
      lastModified: '1 day ago',
      status: 'active',
      description: 'JavaScript calculator with advanced features'
    },
    {
      id: '3',
      name: 'Task Manager App',
      language: 'react',
      icon: '⚛️',
      lastModified: '3 days ago',
      status: 'active',
      description: 'React-based task management application'
    },
    {
      id: '4',
      name: 'Data Analysis Script',
      language: 'python',
      icon: '🐍',
      lastModified: '1 week ago',
      status: 'active',
      description: 'Python script for data processing'
    },
    {
      id: '5',
      name: 'CSS Animation Demo',
      language: 'css',
      icon: '🎨',
      lastModified: '2 weeks ago',
      status: 'archived',
      description: 'CSS animations and transitions showcase'
    }
  ]);

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    byLanguage: {
      html: projects.filter(p => p.language === 'html').length,
      javascript: projects.filter(p => p.language === 'javascript').length,
      react: projects.filter(p => p.language === 'react').length,
      python: projects.filter(p => p.language === 'python').length,
      css: projects.filter(p => p.language === 'css').length
    }
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Projects</h1>
        <p className="text-gray-600">Manage and organize your coding projects</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-gray-600 text-sm">Total Projects</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-green-600">{stats.active}</div>
            <div className="text-gray-600 text-sm">Active Projects</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-purple-600">{stats.byLanguage.javascript}</div>
            <div className="text-gray-600 text-sm">JavaScript</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-orange-600">{stats.byLanguage.react}</div>
            <div className="text-gray-600 text-sm">React</div>
          </CardBody>
        </Card>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">All</Button>
          <Button variant="outline" size="sm">Active</Button>
          <Button variant="outline" size="sm">Archived</Button>
        </div>
        <Link href="/student/playground/new">
          <Button variant="primary">+ New Project</Button>
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardBody>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{project.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <span className="text-xs text-gray-500 capitalize">{project.language}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              <div className="text-xs text-gray-500 mb-4">Last modified: {project.lastModified}</div>
              <div className="flex gap-2">
                <Link href={`/student/playground/${project.language}`}>
                  <Button variant="primary" size="sm" className="flex-1">Edit</Button>
                </Link>
                <Button variant="outline" size="sm">Duplicate</Button>
                <Button variant="outline" size="sm">Share</Button>
                <Button variant="danger" size="sm">Delete</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
