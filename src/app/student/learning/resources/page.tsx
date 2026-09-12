'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function ResourcesPage() {
  const resources = [
    // JavaScript Fundamentals
    {
      id: 1,
      course: 'JavaScript Fundamentals',
      items: [
        {
          id: 1,
          title: 'JavaScript Cheat Sheet',
          type: 'PDF',
          size: '2.4 MB',
          description: 'Quick reference guide for JavaScript syntax and methods',
          downloads: 1234,
          icon: '📄'
        },
        {
          id: 2,
          title: 'ES6+ Code Samples',
          type: 'ZIP',
          size: '5.1 MB',
          description: 'Complete code examples for modern JavaScript features',
          downloads: 892,
          icon: '📦'
        },
        {
          id: 3,
          title: 'DOM Manipulation Guide',
          type: 'PDF',
          size: '1.8 MB',
          description: 'Step-by-step guide to working with the DOM',
          downloads: 756,
          icon: '📄'
        },
        {
          id: 4,
          title: 'Async JavaScript Workbook',
          type: 'PDF',
          size: '3.2 MB',
          description: 'Practice exercises for promises, async/await, and callbacks',
          downloads: 645,
          icon: '📄'
        },
      ]
    },
    // React Development
    {
      id: 2,
      course: 'React Development',
      items: [
        {
          id: 5,
          title: 'React Starter Template',
          type: 'ZIP',
          size: '8.7 MB',
          description: 'Production-ready React project template with best practices',
          downloads: 2341,
          icon: '📦'
        },
        {
          id: 6,
          title: 'Hooks Reference Guide',
          type: 'PDF',
          size: '1.5 MB',
          description: 'Complete reference for all React hooks with examples',
          downloads: 1567,
          icon: '📄'
        },
        {
          id: 7,
          title: 'Component Library',
          type: 'ZIP',
          size: '12.3 MB',
          description: 'Reusable React components with TypeScript support',
          downloads: 1123,
          icon: '📦'
        },
        {
          id: 8,
          title: 'State Management Patterns',
          type: 'PDF',
          size: '2.1 MB',
          description: 'Comparison of Redux, Context API, and Zustand',
          downloads: 987,
          icon: '📄'
        },
      ]
    },
    // Python for Data Science
    {
      id: 3,
      course: 'Python for Data Science',
      items: [
        {
          id: 9,
          title: 'Python Data Science Notebook',
          type: 'IPYNB',
          size: '15.6 MB',
          description: 'Jupyter notebooks with data analysis examples',
          downloads: 1876,
          icon: '📓'
        },
        {
          id: 10,
          title: 'Pandas Cheat Sheet',
          type: 'PDF',
          size: '1.2 MB',
          description: 'Quick reference for Pandas operations and functions',
          downloads: 2345,
          icon: '📄'
        },
        {
          id: 11,
          title: 'Sample Datasets',
          type: 'ZIP',
          size: '45.2 MB',
          description: 'CSV and JSON datasets for practice exercises',
          downloads: 1543,
          icon: '📦'
        },
        {
          id: 12,
          title: 'NumPy Reference',
          type: 'PDF',
          size: '2.8 MB',
          description: 'Comprehensive guide to NumPy arrays and operations',
          downloads: 892,
          icon: '📄'
        },
      ]
    },
    // TypeScript Fundamentals
    {
      id: 4,
      course: 'TypeScript Fundamentals',
      items: [
        {
          id: 13,
          title: 'TypeScript Config Guide',
          type: 'PDF',
          size: '0.9 MB',
          description: 'tsconfig.json options and best practices',
          downloads: 654,
          icon: '📄'
        },
        {
          id: 14,
          title: 'Type Definitions Collection',
          type: 'ZIP',
          size: '3.4 MB',
          description: 'Custom type definitions for common libraries',
          downloads: 432,
          icon: '📦'
        },
      ]
    },
  ];

  const getFileIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      'PDF': '📄',
      'ZIP': '📦',
      'IPYNB': '📓',
      'CODE': '💻',
    };
    return icons[type] || '📁';
  };

  const getFileColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'PDF': 'bg-red-100 text-red-700',
      'ZIP': 'bg-yellow-100 text-yellow-700',
      'IPYNB': 'bg-green-100 text-green-700',
      'CODE': 'bg-blue-100 text-blue-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Learning Resources</h1>
        <p className="text-gray-600">Download course materials, code samples, and supplementary resources</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{resources.length}</div>
                <div className="text-blue-100 text-sm">Courses</div>
              </div>
              <div className="text-4xl opacity-80">📚</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {resources.reduce((acc, r) => acc + r.items.length, 0)}
                </div>
                <div className="text-green-100 text-sm">Total Resources</div>
              </div>
              <div className="text-4xl opacity-80">📁</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {resources.reduce((acc, r) => acc + r.items.filter(i => i.type === 'PDF').length, 0)}
                </div>
                <div className="text-purple-100 text-sm">PDFs</div>
              </div>
              <div className="text-4xl opacity-80">📄</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {resources.reduce((acc, r) => acc + r.items.filter(i => i.type === 'ZIP').length, 0)}
                </div>
                <div className="text-orange-100 text-sm">Code Samples</div>
              </div>
              <div className="text-4xl opacity-80">💻</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Resources by Course */}
      {resources.map((course) => (
        <Card key={course.id} className="mb-6">
          <CardBody>
            <CardTitle>{course.course}</CardTitle>
            <div className="space-y-3">
              {course.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className={`px-2 py-1 rounded ${getFileColor(item.type)}`}>{item.type}</span>
                      <span>📦 {item.size}</span>
                      <span>📥 {item.downloads.toLocaleString()} downloads</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                    <span>Download</span>
                    <span>⬇️</span>
                  </button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      ))}

      {/* Quick Tips */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardBody>
          <CardTitle className="text-blue-900">💡 Tips for Using Resources</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📥</span>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Download for Offline Access</h4>
                <p className="text-sm text-blue-700">Save PDFs and code samples to study without internet</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔄</span>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Check for Updates</h4>
                <p className="text-sm text-blue-700">Resources are updated regularly with new content</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📧</span>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Request Custom Resources</h4>
                <p className="text-sm text-blue-700">Contact instructors for additional learning materials</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
