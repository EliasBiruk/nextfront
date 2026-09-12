'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

export default function Downloads() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const materials = [
    {
      id: 1,
      title: 'Python Programming Cheatsheet',
      type: 'pdf',
      category: 'Reference',
      size: '2.4 MB',
      dateAdded: '2024-01-15',
      downloads: 156,
      description: 'Quick reference guide for Python syntax and common functions'
    },
    {
      id: 2,
      title: 'Web Development Starter Kit',
      type: 'zip',
      category: 'Project Templates',
      size: '15.8 MB',
      dateAdded: '2024-01-12',
      downloads: 89,
      description: 'HTML, CSS, and JavaScript templates for web projects'
    },
    {
      id: 3,
      title: 'JavaScript Functions Guide',
      type: 'pdf',
      category: 'Reference',
      size: '1.2 MB',
      dateAdded: '2024-01-10',
      downloads: 234,
      description: 'Comprehensive guide to JavaScript functions and closures'
    },
    {
      id: 4,
      title: 'Data Structures Visualizer',
      type: 'exe',
      category: 'Tools',
      size: '8.5 MB',
      dateAdded: '2024-01-08',
      downloads: 67,
      description: 'Interactive tool for visualizing data structures'
    },
    {
      id: 5,
      title: 'CSS Grid Layout Examples',
      type: 'zip',
      category: 'Code Examples',
      size: '3.2 MB',
      dateAdded: '2024-01-05',
      downloads: 145,
      description: 'Collection of CSS Grid layout examples and templates'
    },
    {
      id: 6,
      title: 'React Component Library',
      type: 'zip',
      category: 'Libraries',
      size: '22.1 MB',
      dateAdded: '2024-01-03',
      downloads: 198,
      description: 'Reusable React components for common UI patterns'
    },
    {
      id: 7,
      title: 'Algorithm Problem Set',
      type: 'pdf',
      category: 'Exercises',
      size: '4.7 MB',
      dateAdded: '2024-01-01',
      downloads: 312,
      description: 'Practice problems for algorithmic thinking'
    },
    {
      id: 8,
      title: 'Database Design Templates',
      type: 'sql',
      category: 'Reference',
      size: '0.8 MB',
      dateAdded: '2023-12-28',
      downloads: 78,
      description: 'SQL templates for common database designs'
    }
  ];

  const downloadHistory = [
    {
      id: 1,
      title: 'Python Programming Cheatsheet',
      type: 'pdf',
      downloadDate: '2024-01-15',
      size: '2.4 MB',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Web Development Starter Kit',
      type: 'zip',
      downloadDate: '2024-01-14',
      size: '15.8 MB',
      status: 'completed'
    },
    {
      id: 3,
      title: 'JavaScript Functions Guide',
      type: 'pdf',
      downloadDate: '2024-01-13',
      size: '1.2 MB',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Data Structures Visualizer',
      type: 'exe',
      downloadDate: '2024-01-12',
      size: '8.5 MB',
      status: 'completed'
    },
    {
      id: 5,
      title: 'CSS Grid Layout Examples',
      type: 'zip',
      downloadDate: '2024-01-11',
      size: '3.2 MB',
      status: 'completed'
    }
  ];

  const storageUsage = {
    used: 245.6,
    total: 500,
    percentage: 49
  };

  const filteredMaterials = materials.filter(material => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'reference') return material.category === 'Reference';
    if (selectedFilter === 'templates') return material.category === 'Project Templates' || material.category === 'Code Examples';
    if (selectedFilter === 'tools') return material.category === 'Tools' || material.category === 'Libraries';
    if (selectedFilter === 'exercises') return material.category === 'Exercises';
    return true;
  });

  const getFileIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      pdf: '📄',
      zip: '📦',
      exe: '⚙️',
      sql: '🗃️'
    };
    return icons[type] || '📁';
  };

  const getFileColor = (type: string) => {
    const colors: { [key: string]: string } = {
      pdf: 'bg-red-100 text-red-800',
      zip: 'bg-yellow-100 text-yellow-800',
      exe: 'bg-blue-100 text-blue-800',
      sql: 'bg-green-100 text-green-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Reference': 'bg-blue-100 text-blue-800',
      'Project Templates': 'bg-green-100 text-green-800',
      'Code Examples': 'bg-purple-100 text-purple-800',
      'Tools': 'bg-orange-100 text-orange-800',
      'Libraries': 'bg-pink-100 text-pink-800',
      'Exercises': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Downloads</h1>
        <p className="text-gray-600">Downloadable materials and your download history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Storage Usage */}
          <Card>
            <CardBody>
              <CardTitle>Storage Usage</CardTitle>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {storageUsage.used} MB of {storageUsage.total} MB used
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {storageUsage.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      storageUsage.percentage > 80 ? 'bg-red-500' :
                      storageUsage.percentage > 60 ? 'bg-yellow-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${storageUsage.percentage}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                  Upgrade Storage
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
                  Manage Files
                </button>
              </div>
            </CardBody>
          </Card>

          {/* Downloadable Materials */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>Downloadable Materials</CardTitle>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedFilter('reference')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      selectedFilter === 'reference' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Reference
                  </button>
                  <button
                    onClick={() => setSelectedFilter('templates')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      selectedFilter === 'templates' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Templates
                  </button>
                  <button
                    onClick={() => setSelectedFilter('tools')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      selectedFilter === 'tools' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Tools
                  </button>
                  <button
                    onClick={() => setSelectedFilter('exercises')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      selectedFilter === 'exercises' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Exercises
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredMaterials.map(material => (
                  <div
                    key={material.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="text-3xl">{getFileIcon(material.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{material.title}</h4>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getFileColor(material.type)}`}>
                          {material.type.toUpperCase()}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(material.category)}`}>
                          {material.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>📦 {material.size}</span>
                        <span>📅 {material.dateAdded}</span>
                        <span>⬇️ {material.downloads} downloads</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Download History */}
          <Card>
            <CardBody>
              <CardTitle>Recent Downloads</CardTitle>
              <div className="space-y-3">
                {downloadHistory.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{getFileIcon(item.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{item.title}</div>
                      <div className="text-xs text-gray-500">
                        {item.downloadDate} • {item.size}
                      </div>
                    </div>
                    <span className="text-xs text-green-600">✓</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
                View All History
              </button>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardBody>
              <CardTitle>Quick Actions</CardTitle>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                  📥 Download All Materials
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
                  🗑️ Clear Download History
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
                  📊 View Storage Analytics
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
                  ⚙️ Download Settings
                </button>
              </div>
            </CardBody>
          </Card>

          {/* File Types */}
          <Card>
            <CardBody>
              <CardTitle>Available File Types</CardTitle>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📄</span>
                  <span className="text-sm">PDF Documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">📦</span>
                  <span className="text-sm">ZIP Archives</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚙️</span>
                  <span className="text-sm">Executable Tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🗃️</span>
                  <span className="text-sm">SQL Files</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
