'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useState } from 'react';

export default function InstructorPrivacy() {
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showLocation: true,
  });

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Settings</h1>
        <p className="text-gray-600">Control your privacy and visibility settings</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardBody>
            <CardTitle>Privacy Controls</CardTitle>
            
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Public Profile</div>
                  <div className="text-sm text-gray-600">Make your profile visible to other users</div>
                </div>
                <input
                  type="checkbox"
                  checked={privacy.profileVisible}
                  onChange={(e) => setPrivacy({ ...privacy, profileVisible: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Show Email</div>
                  <div className="text-sm text-gray-600">Display email address on your profile</div>
                </div>
                <input
                  type="checkbox"
                  checked={privacy.showEmail}
                  onChange={(e) => setPrivacy({ ...privacy, showEmail: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Show Location</div>
                  <div className="text-sm text-gray-600">Display your location on your profile</div>
                </div>
                <input
                  type="checkbox"
                  checked={privacy.showLocation}
                  onChange={(e) => setPrivacy({ ...privacy, showLocation: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  Save Privacy Settings
                </button>
                <Link
                  href="/instructor/account"
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