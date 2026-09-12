'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useState } from 'react';

export default function Qualifications() {
  const [qualifications, setQualifications] = useState([
    { id: 1, degree: 'B.S. Computer Science', institution: 'MIT', year: '2012' },
    { id: 2, degree: 'M.S. Software Engineering', institution: 'Stanford', year: '2014' },
  ]);

  const [newQual, setNewQual] = useState({ degree: '', institution: '', year: '' });

  const addQualification = () => {
    if (newQual.degree && newQual.institution) {
      setQualifications([...qualifications, { ...newQual, id: qualifications.length + 1 }]);
      setNewQual({ degree: '', institution: '', year: '' });
    }
  };

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Qualifications</h1>
        <p className="text-gray-600">Add your educational qualifications and certifications</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardBody>
            <CardTitle>Educational Background</CardTitle>
            
            <div className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree/Certificate
                  </label>
                  <input
                    type="text"
                    value={newQual.degree}
                    onChange={(e) => setNewQual({ ...newQual, degree: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., B.S. Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={newQual.institution}
                    onChange={(e) => setNewQual({ ...newQual, institution: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., MIT"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    value={newQual.year}
                    onChange={(e) => setNewQual({ ...newQual, year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2012"
                  />
                </div>
              </div>

              <button
                onClick={addQualification}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                + Add Qualification
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Qualifications
                </label>
                <div className="space-y-2">
                  {qualifications.map((qual) => (
                    <div key={qual.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-900">{qual.degree}</div>
                      <div className="text-sm text-gray-600">{qual.institution} • {qual.year}</div>
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