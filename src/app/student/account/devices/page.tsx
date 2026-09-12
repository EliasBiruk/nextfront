'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useState } from 'react';

export default function DevicesPage() {
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'San Francisco, CA', lastActive: '2 hours ago', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'San Francisco, CA', lastActive: 'Yesterday', current: false },
    { id: 3, device: 'Firefox on Mac', location: 'San Francisco, CA', lastActive: '3 days ago', current: false },
    { id: 4, device: 'Chrome on Windows', location: 'Los Angeles, CA', lastActive: '1 week ago', current: false },
  ]);

  const revokeSession = (id: number) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const revokeAll = () => {
    setSessions(sessions.filter(s => s.current));
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Devices & Sessions</h1>
        <p className="text-gray-600">Manage your active sessions and login history</p>
      </div>

      {/* Active Sessions */}
      <Card className="mb-8">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <CardTitle>Active Sessions</CardTitle>
            <button 
              onClick={revokeAll}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              Revoke All Other Sessions
            </button>
          </div>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl">{session.device.includes('iPhone') ? '📱' : '💻'}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{session.device}</div>
                  <div className="text-sm text-gray-600">{session.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{session.lastActive}</div>
                  {session.current && (
                    <div className="text-xs font-medium text-green-600">Current Session</div>
                  )}
                </div>
                {!session.current && (
                  <button 
                    onClick={() => revokeSession(session.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition"
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Login History */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Login History</CardTitle>
          <div className="space-y-3">
            {[
              { device: 'Chrome on Windows', location: 'San Francisco, CA', date: 'Jan 15, 2025', time: '10:30 AM', status: 'success' },
              { device: 'Safari on iPhone', location: 'San Francisco, CA', date: 'Jan 14, 2025', time: '8:15 PM', status: 'success' },
              { device: 'Firefox on Mac', location: 'San Francisco, CA', date: 'Jan 12, 2025', time: '2:45 PM', status: 'success' },
              { device: 'Chrome on Windows', location: 'Los Angeles, CA', date: 'Jan 8, 2025', time: '11:20 AM', status: 'success' },
              { device: 'Unknown Device', location: 'Unknown', date: 'Jan 5, 2025', time: '3:00 AM', status: 'failed' },
            ].map((login) => (
              <div key={login.date + login.time} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-xl">
                  {login.status === 'success' ? '✅' : '❌'}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{login.device}</div>
                  <div className="text-xs text-gray-600">{login.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{login.date}</div>
                  <div className="text-xs text-gray-500">{login.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Security Recommendations */}
      <Card>
        <CardBody>
          <CardTitle>Security Recommendations</CardTitle>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-xl">✓</span>
              <div>
                <div className="font-medium text-green-900">No Suspicious Activity</div>
                <div className="text-sm text-green-700">We haven't detected any unusual login attempts.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <span className="text-xl">⚠️</span>
              <div>
                <div className="font-medium text-yellow-900">Enable Two-Factor Authentication</div>
                <div className="text-sm text-yellow-700">Add an extra layer of security to protect your account.</div>
                <button className="mt-2 px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">
                  Enable 2FA
                </button>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-xl">ℹ️</span>
              <div>
                <div className="font-medium text-blue-900">Regular Session Cleanup</div>
                <div className="text-sm text-blue-700">Review and revoke old sessions periodically for better security.</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}