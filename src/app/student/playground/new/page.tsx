'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

interface Language {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  language: string;
}

export default function NewProjectPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('blank');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const languages: Language[] = [
    { id: 'html', name: 'HTML/CSS', icon: '🌐', description: 'Web markup and styling' },
    { id: 'css', name: 'CSS', icon: '🎨', description: 'Styling and animations' },
    { id: 'javascript', name: 'JavaScript', icon: '⚡', description: 'Interactive web programming' },
    { id: 'react', name: 'React', icon: '⚛️', description: 'Modern component-based UI' },
    { id: 'python', name: 'Python', icon: '🐍', description: 'General-purpose programming' }
  ];

  const templates: Template[] = [
    { id: 'blank', name: 'Blank Project', description: 'Start from scratch', language: 'all' },
    { id: 'hello-world', name: 'Hello World', description: 'Simple starter template', language: 'all' },
    { id: 'portfolio', name: 'Portfolio Template', description: 'Personal website starter', language: 'html' },
    { id: 'calculator', name: 'Calculator', description: 'Functional calculator app', language: 'javascript' },
    { id: 'todo-app', name: 'Todo App', description: 'Task management app', language: 'react' },
    { id: 'data-script', name: 'Data Script', description: 'Data processing template', language: 'python' }
  ];

  const filteredTemplates = templates.filter(
    t => t.language === 'all' || t.language === selectedLanguage
  );

  const handleCreateProject = () => {
    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }
    // Here you would typically save the project to your backend
    console.log('Creating project:', {
      name: projectName,
      description: projectDescription,
      language: selectedLanguage,
      template: selectedTemplate
    });
    // Redirect to the appropriate playground
    window.location.href = `/student/playground/${selectedLanguage}`;
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Project</h1>
        <p className="text-gray-600">Start a new coding project with your preferred language</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Language Selection */}
          <Card>
            <CardBody>
              <CardTitle>Select Language</CardTitle>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedLanguage === lang.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{lang.icon}</div>
                    <div className="font-semibold text-gray-900">{lang.name}</div>
                    <div className="text-xs text-gray-500">{lang.description}</div>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Template Selection */}
          <Card>
            <CardBody>
              <CardTitle>Choose Template</CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">{template.name}</div>
                    <div className="text-sm text-gray-500">{template.description}</div>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Project Details */}
          <Card>
            <CardBody>
              <CardTitle>Project Details</CardTitle>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="My Awesome Project"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe your project..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          <Card>
            <CardBody>
              <CardTitle>Project Summary</CardTitle>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">
                    {languages.find(l => l.id === selectedLanguage)?.icon}{' '}
                    {languages.find(l => l.id === selectedLanguage)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Template:</span>
                  <span className="font-medium">
                    {filteredTemplates.find(t => t.id === selectedTemplate)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{projectName || 'Not set'}</span>
                </div>
                <hr className="my-3" />
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={handleCreateProject}
                  >
                    Create Project
                  </Button>
                  <Link href="/student/playground/projects">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardTitle>Quick Tips</CardTitle>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Start with a blank project for full control</li>
                <li>• Templates help you get started faster</li>
                <li>• You can change language later</li>
                <li>• All projects are auto-saved</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
