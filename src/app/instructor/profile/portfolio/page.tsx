'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useState } from 'react';

export default function Portfolio() {
  const [projects, setProjects] = useState([
    { id: 1, title: 'E-Commerce Platform', description: 'Full-stack React application', url: 'https://example.com' },
    { id: 2, title: 'Task Management App', description: 'Productivity tool built with Next.js', url: 'https://example.com' },
  ]);

  const [newProject, setNewProject] = useState({ title: '', description: '', url: '' });

  const addProject = () => {
    if (newProject.title && newProject.description) {
      setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
      setNewProject({ title: '', description: '', url: '' });
    }
  };

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio</h1>
        <p className="text-gray-600">Showcase your projects and work</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardBody>
            <CardTitle>Portfolio Projects</CardTitle>
            
            <div className="space-y-6 mt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., E-Commerce Platform"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the project"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project URL
                  </label>
                  <input
                    type="url"
                    value={newProject.url}
                    onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourproject.com"
                  />
                </div>
                <button
                  onClick={addProject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  + Add Project
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Projects
                </label>
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div key={project.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-900">{project.title}</div>
                      <div className="text-sm text-gray-600">{project.description}</div>
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                          {project.url}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  Save Changes
                </button>
                <Link
                  href="/instructor/profile"
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  Back
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}