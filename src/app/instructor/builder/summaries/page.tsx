'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useState } from 'react';

export default function SummariesBuilder() {
  const [summaries, setSummaries] = useState([
    { id: 1, title: 'Chapter Summary', content: 'This chapter covered the fundamentals of variables...' },
  ]);

  const [newSummary, setNewSummary] = useState({ title: '', content: '' });

  const addSummary = () => {
    if (newSummary.title && newSummary.content) {
      setSummaries([...summaries, { ...newSummary, id: summaries.length + 1 }]);
      setNewSummary({ title: '', content: '' });
    }
  };

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Summaries</h1>
        <p className="text-gray-600">Create and manage lesson summaries</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={addSummary}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Add Summary
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
          <CardTitle>Lesson Summaries</CardTitle>
          <div className="space-y-4 mt-4">
            {summaries.map((summary) => (
              <div key={summary.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{summary.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{summary.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm">
                      Edit
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