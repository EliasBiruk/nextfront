'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function InstructorDevices() {
  const devices = [
    { id: 1, device: 'Chrome on Windows', location: 'San Francisco, CA', lastActive: '2 minutes ago', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'San Francisco, CA', lastActive: '1 hour ago', current: false },
    { id: 3, device: 'Firefox on Mac', location: 'San Francisco, CA', lastActive: '2 days ago', current: false },
  ];

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Devices & Sessions</h1>
        <p className="text-gray-600">Manage your active sessions and devices</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Active Sessions ({devices.length})</CardTitle>
          <div className="space-y-4 mt-4">
            {devices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{device.device}</h3>
                    {device.current && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{device.location}</div>
                  <div className="text-xs text-gray-500 mt-1">Last active: {device.lastActive}</div>
                </div>
                {!device.current && (
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm">
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
              Revoke All Other Sessions
            </button>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}