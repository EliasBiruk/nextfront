'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

interface SavedProject {
  id: string;
  name: string;
  language: string;
  icon: string;
  versions: Version[];
  totalSize: string;
  fileCount: number;
  lastSaved: string;
}

interface Version {
  id: string;
  version: string;
  date: string;
  description: string;
  size: string;
}

export default function SavedPage() {
  const [selectedProject, setSelectedProject] = useState<SavedProject | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);

  const savedProjects: SavedProject[] = [
    {
      id: '1',
      name: 'Portfolio Website',
      language: 'html',
      icon: '🌐',
      versions: [
        { id: 'v1', version: 'v1.0', date: '2024-01-15', description: 'Initial version', size: '45 KB' },
        { id: 'v2', version: 'v1.1', date: '2024-01-20', description: 'Added responsive design', size: '52 KB' },
        { id: 'v3', version: 'v1.2', date: '2024-01-25', description: 'Fixed navigation', size: '54 KB' },
        { id: 'v4', version: 'v2.0', date: '2024-02-01', description: 'Complete redesign', size: '78 KB' }
      ],
      totalSize: '78 KB',
      fileCount: 5,
      lastSaved: '2 hours ago'
    },
    {
      id: '2',
      name: 'Interactive Calculator',
      language: 'javascript',
      icon: '⚡',
      versions: [
        { id: 'v1', version: 'v1.0', date: '2024-01-10', description: 'Basic calculator', size: '12 KB' },
        { id: 'v2', version: 'v1.1', date: '2024-01-15', description: 'Added scientific functions', size: '18 KB' },
        { id: 'v3', version: 'v2.0', date: '2024-01-22', description: 'History feature', size: '24 KB' }
      ],
      totalSize: '24 KB',
      fileCount: 3,
      lastSaved: '1 day ago'
    },
    {
      id: '3',
      name: 'Task Manager App',
      language: 'react',
      icon: '⚛️',
      versions: [
        { id: 'v1', version: 'v1.0', date: '2024-01-05', description: 'MVP', size: '35 KB' },
        { id: 'v2', version: 'v1.1', date: '2024-01-12', description: 'Added categories', size: '42 KB' },
        { id: 'v3', version: 'v1.2', date: '2024-01-18', description: 'Dark mode', size: '48 KB' },
        { id: 'v4', version: 'v2.0', date: '2024-01-28', description: 'Local storage', size: '52 KB' },
        { id: 'v5', version: 'v2.1', date: '2024-02-05', description: 'Drag and drop', size: '58 KB' }
      ],
      totalSize: '58 KB',
      fileCount: 8,
      lastSaved: '3 days ago'
    },
    {
      id: '4',
      name: 'Data Analysis Script',
      language: 'python',
      icon: '🐍',
      versions: [
        { id: 'v1', version: 'v1.0', date: '2024-01-08', description: 'Initial script', size: '8 KB' },
        { id: 'v2', version: 'v1.1', date: '2024-01-14', description: 'Added visualization', size: '15 KB' }
      ],
      totalSize: '15 KB',
      fileCount: 2,
      lastSaved: '1 week ago'
    },
    {
      id: '5',
      name: 'CSS Animation Demo',
      language: 'css',
      icon: '🎨',
      versions: [
        { id: 'v1', version: 'v1.0', date: '2024-01-02', description: 'Basic animations', size: '6 KB' },
        { id: 'v2', version: 'v1.1', date: '2024-01-09', description: 'Complex transitions', size: '12 KB' },
        { id: 'v3', version: 'v2.0', date: '2024-01-16', description: 'Interactive demos', size: '20 KB' }
      ],
      totalSize: '20 KB',
      fileCount: 4,
      lastSaved: '2 weeks ago'
    }
  ];

  const handleRestore = (version: Version) => {
    if (confirm(`Restore to ${version.version}? This will replace your current version.`)) {
      alert(`Restored to ${version.version}`);
      // In production, this would restore the version
    }
  };

  const handleDownload = (project: SavedProject) => {
    alert(`Downloading ${project.name}...`);
    // In production, this would download the project
  };

  const handleDelete = (project: SavedProject) => {
    if (confirm(`Delete ${project.name}? This action cannot be undone.`)) {
      alert(`Deleted ${project.name}`);
      // In production, this would delete the project
    }
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Saved Projects</h1>
        <p className="text-gray-600">View and restore past versions of your projects</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-blue-600">{savedProjects.length}</div>
            <div className="text-gray-600 text-sm">Total Projects</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-green-600">
              {savedProjects.reduce((acc, p) => acc + p.versions.length, 0)}
            </div>
            <div className="text-gray-600 text-sm">Total Versions</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-purple-600">
              {savedProjects.reduce((acc, p) => acc + p.fileCount, 0)}
            </div>
            <div className="text-gray-600 text-sm">Total Files</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-3xl font-bold text-orange-600">
              {savedProjects.reduce((acc, p) => acc + parseInt(p.totalSize), 0)} KB
            </div>
            <div className="text-gray-600 text-sm">Total Storage</div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="lg:col-span-2 space-y-4">
          {savedProjects.map((project) => (
            <Card
              key={project.id}
              className={`cursor-pointer transition-all ${
                selectedProject?.id === project.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedProject(project)}
            >
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{project.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="capitalize">{project.language}</span>
                        <span>{project.fileCount} files</span>
                        <span>{project.totalSize}</span>
                        <span>Last saved: {project.lastSaved}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleDownload(project); }}>
                      Download
                    </Button>
                    <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(project); }}>
                      Delete
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Version History */}
        <div className="space-y-4">
          {selectedProject ? (
            <Card>
              <CardBody>
                <CardTitle>Version History</CardTitle>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{selectedProject.icon}</span>
                  <div>
                    <h3 className="font-semibold">{selectedProject.name}</h3>
                    <p className="text-sm text-gray-500">{selectedProject.versions.length} versions</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedProject.versions.map((version) => (
                    <div
                      key={version.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedVersion?.id === version.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedVersion(version)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold text-sm">{version.version}</span>
                          <span className="text-xs text-gray-500 ml-2">{version.date}</span>
                        </div>
                        <span className="text-xs text-gray-500">{version.size}</span>
                      </div>
                      <p className="text-sm text-gray-600">{version.description}</p>
                      {selectedVersion?.id === version.id && (
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleRestore(version)}
                          >
                            Restore
                          </Button>
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody>
                <CardTitle>Version History</CardTitle>
                <p className="text-gray-600 text-sm">Select a project to view its version history</p>
              </CardBody>
            </Card>
          )}

          {/* Tips */}
          <Card>
            <CardBody>
              <CardTitle>Tips</CardTitle>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Projects are auto-saved every 5 minutes</li>
                <li>• You can manually save at any time</li>
                <li>• Versions are kept for 30 days</li>
                <li>• Download projects to keep local copies</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
