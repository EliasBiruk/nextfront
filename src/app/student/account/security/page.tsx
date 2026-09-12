'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useState } from 'react';

export default function SecurityPage() {
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: 30,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = () => {
    console.log('Password change requested');
  };

  const handleEnable2FA = () => {
    setSecurity({...security, twoFactorEnabled: !security.twoFactorEnabled});
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Security</h1>
        <p className="text-gray-600">Manage your account security and login settings</p>
      </div>

      {/* Password Change */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Change Password</CardTitle>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button 
              onClick={handlePasswordChange}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Change Password
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Two-Factor Authentication</div>
              <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
            </div>
            <button 
              onClick={handleEnable2FA}
              className={`px-4 py-2 rounded-lg transition ${
                security.twoFactorEnabled 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>
          {!security.twoFactorEnabled && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🔐</span>
                <span className="font-medium text-blue-900">Enable 2FA to protect your account</span>
              </div>
              <p className="text-sm text-blue-700">We'll send you a code via SMS or authenticator app when you log in.</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Login Alerts */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Login Alerts</CardTitle>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Login Notifications</div>
              <div className="text-sm text-gray-600">Get notified of new login attempts</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={security.loginAlerts} onChange={(e) => setSecurity({...security, loginAlerts: e.target.checked})} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </CardBody>
      </Card>

      {/* Session Timeout */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Session Timeout</CardTitle>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Auto-logout after (minutes)</label>
            <select
              value={security.sessionTimeout}
              onChange={(e) => setSecurity({...security, sessionTimeout: parseInt(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="0">Never</option>
            </select>
          </div>
        </CardBody>
      </Card>

      {/* Login History */}
      <Card>
        <CardBody>
          <CardTitle>Recent Login History</CardTitle>
          <div className="space-y-3">
            {[
              { device: 'Chrome on Windows', location: 'San Francisco, CA', time: '2 hours ago', status: 'current' },
              { device: 'Safari on iPhone', location: 'San Francisco, CA', time: 'Yesterday', status: 'success' },
              { device: 'Firefox on Mac', location: 'San Francisco, CA', time: '3 days ago', status: 'success' },
              { device: 'Chrome on Windows', location: 'Los Angeles, CA', time: '1 week ago', status: 'success' },
            ].map((login) => (
              <div key={login.time} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-xl">💻</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{login.device}</div>
                  <div className="text-xs text-gray-600">{login.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{login.time}</div>
                  <div className={`text-xs font-medium ${
                    login.status === 'current' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {login.status === 'current' ? 'Current Session' : 'Logged Out'}
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