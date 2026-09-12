'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useState } from 'react';

export default function ResourcesBuilder() {
  const [resources, setResources] = useState([
    { id: 1, title: 'Course Slides', type: 'pdf', size: '2.5 MB' },
    { id: 2, title: 'Code Examples', type: 'zip', size: '1.2 MB' },
  ]);

  const [newResource, setNewResource] = useState({ title: '', type: 'pdf' });

  const addResource = () => {
    if (newResource.title) {
      setResources([...resources, { ...newResource, id: resources.length + 1, size: '0 MB' }]);
      setNewResource({ title: '', type: 'pdf' });
    }
  };

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Resources</h1>
        <p className="text-gray-600">Upload and manage course resources</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={addResource}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Add Resource
        </button>
        <Link
          href="/instructor/builder/curriculum"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          Back to Curriculum
        </Link>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Course Resources</CardTitle>
          <div className="space-y-4 mt-4">
            {resources.map((resource) => (
              <div key={resource.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                    <div className="flex gap-4 mt-2 text-xs text-gray-600">
                      <span>Type: {resource.type}</span>
                      <span>Size: {resource.size}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm">
                      Download
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm">
                      Delete
                    </button>
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