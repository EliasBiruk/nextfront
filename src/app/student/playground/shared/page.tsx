'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

interface SharedProject {
  id: string;
  name: string;
  language: string;
  icon: string;
  author: string;
  authorAvatar: string;
  description: string;
  likes: number;
  forks: number;
  sharedDate: string;
  permission: 'view' | 'edit' | 'fork';
  expiration: string;
}

export default function SharedPage() {
  const [selectedProject, setSelectedProject] = useState<SharedProject | null>(null);
  const [filter, setFilter] = useState<'all' | 'teachers' | 'students'>('all');

  const sharedProjects: SharedProject[] = [
    {
      id: '1',
      name: 'E-Commerce Template',
      language: 'react',
      icon: '⚛️',
      author: 'Instructor Smith',
      authorAvatar: '👨‍🏫',
      description: 'Complete e-commerce template with cart, checkout, and product pages',
      likes: 45,
      forks: 12,
      sharedDate: '2024-01-20',
      permission: 'fork',
      expiration: 'No expiration'
    },
    {
      id: '2',
      name: 'Data Visualization Dashboard',
      language: 'javascript',
      icon: '⚡',
      author: 'Instructor Johnson',
      authorAvatar: '👩‍🏫',
      description: 'Interactive dashboard with charts and data filtering',
      likes: 38,
      forks: 8,
      sharedDate: '2024-01-18',
      permission: 'fork',
      expiration: 'No expiration'
    },
    {
      id: '3',
      name: 'Portfolio Starter',
      language: 'html',
      icon: '🌐',
      author: 'Alex Chen',
      authorAvatar: '👨‍💻',
      description: 'Clean portfolio template with responsive design',
      likes: 28,
      forks: 15,
      sharedDate: '2024-01-15',
      permission: 'view',
      expiration: '2024-03-15'
    },
    {
      id: '4',
      name: 'Animation Library',
      language: 'css',
      icon: '🎨',
      author: 'Sarah Kim',
      authorAvatar: '👩‍💻',
      description: 'Collection of reusable CSS animations',
      likes: 52,
      forks: 23,
      sharedDate: '2024-01-12',
      permission: 'fork',
      expiration: 'No expiration'
    },
    {
      id: '5',
      name: 'Machine Learning Script',
      language: 'python',
      icon: '🐍',
      author: 'Instructor Davis',
      authorAvatar: '👨‍🏫',
      description: 'Basic ML script for classification tasks',
      likes: 33,
      forks: 7,
      sharedDate: '2024-01-10',
      permission: 'edit',
      expiration: '2024-02-10'
    },
    {
      id: '6',
      name: 'Game Engine',
      language: 'javascript',
      icon: '⚡',
      author: 'Mike Johnson',
      authorAvatar: '👨‍💻',
      description: 'Simple 2D game engine with physics',
      likes: 67,
      forks: 19,
      sharedDate: '2024-01-08',
      permission: 'fork',
      expiration: 'No expiration'
    },
    {
      id: '7',
      name: 'Todo App Pro',
      language: 'react',
      icon: '⚛️',
      author: 'Emma Wilson',
      authorAvatar: '👩‍💻',
      description: 'Advanced todo app with drag and drop',
      likes: 41,
      forks: 14,
      sharedDate: '2024-01-05',
      permission: 'view',
      expiration: '2024-02-05'
    },
    {
      id: '8',
      name: 'API Integration Demo',
      language: 'javascript',
      icon: '⚡',
      author: 'Instructor Smith',
      authorAvatar: '👨‍🏫',
      description: 'Demo of API integration patterns',
      likes: 29,
      forks: 11,
      sharedDate: '2024-01-03',
      permission: 'fork',
      expiration: 'No expiration'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? sharedProjects 
    : sharedProjects.filter(p => {
        if (filter === 'teachers') return p.author.includes('Instructor');
        if (filter === 'students') return !p.author.includes('Instructor');
        return true;
      });

  const handleImport = (project: SharedProject) => {
    if (confirm(`Import "${project.name}" to your projects?`)) {
      alert(`Imported "${project.name}" successfully!`);
      // In production, this would import the project
    }
  };

  const handleLike = (project: SharedProject) => {
    alert(`Liked "${project.name}"!`);
    // In production, this would increment the like count
  };

  const handleFork = (project: SharedProject) => {
    if (confirm(`Fork "${project.name}" to your projects?`)) {
      alert(`Forked "${project.name}" successfully!`);
      // In production, this would fork the project
    }
  };

  const permissionColors = {
    view: 'bg-gray-100 text-gray-700',
    edit: 'bg-green-100 text-green-700',
    fork: 'bg-blue-100 text-blue-700'
  };

  const permissionLabels = {
    view: 'View Only',
    edit: 'Can Edit',
    fork: 'Can Fork'
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Shared Projects</h1>
        <p className="text-gray-600">Discover and import projects shared by other students and teachers</p>
      </div>

      {/* Filter Bar */}
      <Card className="mb-6">
        <CardBody className="py-3">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'teachers' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('teachers')}
            >
              Teachers
            </Button>
            <Button
              variant={filter === 'students' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('students')}
            >
              Students
            </Button>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className={`cursor-pointer transition-all ${
                  selectedProject?.id === project.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <CardBody>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{project.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        <span className="text-xs text-gray-500 capitalize">{project.language}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${permissionColors[project.permission]}`}>
                      {permissionLabels[project.permission]}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{project.authorAvatar}</span>
                    <span className="text-sm text-gray-700">{project.author}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex gap-3">
                      <span>❤️ {project.likes}</span>
                      <span>🍴 {project.forks}</span>
                    </div>
                    <span>Shared: {project.sharedDate}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => { e.stopPropagation(); handleImport(project); }}
                    >
                      Import
                    </Button>
                    {project.permission === 'fork' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); handleFork(project); }}
                      >
                        Fork
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); handleLike(project); }}
                    >
                      ❤️
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Selected Project Details */}
          {selectedProject && (
            <Card>
              <CardBody>
                <CardTitle>Project Details</CardTitle>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{selectedProject.icon}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedProject.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{selectedProject.language}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{selectedProject.authorAvatar}</span>
                    <div>
                      <p className="text-sm font-medium">{selectedProject.author}</p>
                      <p className="text-xs text-gray-500">Author</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Permission:</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${permissionColors[selectedProject.permission]}`}>
                      {permissionLabels[selectedProject.permission]}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expiration:</span>
                    <span className="text-sm">{selectedProject.expiration}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shared:</span>
                    <span className="text-sm">{selectedProject.sharedDate}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Likes:</span>
                    <span className="text-sm">❤️ {selectedProject.likes}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Forks:</span>
                    <span className="text-sm">🍴 {selectedProject.forks}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{selectedProject.description}</p>
                
                <Link href={`/student/playground/${selectedProject.language}`}>
                  <Button variant="primary" className="w-full mb-2">View in Playground</Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleImport(selectedProject)}
                >
                  Import to My Projects
                </Button>
              </CardBody>
            </Card>
          )}

          {/* Share Your Project */}
          <Card>
            <CardBody>
              <CardTitle>Share Your Project</CardTitle>
              <p className="text-sm text-gray-600 mb-4">Share your projects with the community</p>
              <Link href="/student/playground/projects">
                <Button variant="primary" className="w-full">Go to My Projects</Button>
              </Link>
            </CardBody>
          </Card>

          {/* Stats */}
          <Card>
            <CardBody>
              <CardTitle>Community Stats</CardTitle>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Shared:</span>
                  <span className="font-semibold">{sharedProjects.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Likes:</span>
                  <span className="font-semibold">
                    {sharedProjects.reduce((acc, p) => acc + p.likes, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Forks:</span>
                  <span className="font-semibold">
                    {sharedProjects.reduce((acc, p) => acc + p.forks, 0)}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
