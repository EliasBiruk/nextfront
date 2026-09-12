'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    platformName: 'JoyEdu',
    supportEmail: 'support@joyedu.com',
    supportPhone: '+1 (555) 123-4567',
    maintenanceMode: false,
    registrationOpen: true,
    maxUploadSize: '50',
    sessionTimeout: '30',
    passwordMinLength: '8',
    twoFactorAuth: true,
    emailVerification: true
  });

  const [activeTab, setActiveTab] = useState('general');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' }
  ];

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    setShowSaveModal(false);
    alert('Settings saved successfully!');
  };

  return (
    <DashboardLayout actor="admin" userName="Admin">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure platform-wide settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <Card>
          <CardBody>
            <CardTitle>General Settings</CardTitle>
            <div className="mt-4 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                <input
                  type="text"
                  value={settings.platformName}
                  onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                <input
                  type="tel"
                  value={settings.supportPhone}
                  onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="maintenance"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="maintenance" className="text-sm text-gray-700">
                  Maintenance Mode (disables platform for users)
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="registration"
                  checked={settings.registrationOpen}
                  onChange={(e) => setSettings({ ...settings, registrationOpen: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="registration" className="text-sm text-gray-700">
                  Open Registration (allow new user signups)
                </label>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <Card>
          <CardBody>
            <CardTitle>Security Settings</CardTitle>
            <div className="mt-4 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Upload Size (MB)</label>
                <input
                  type="number"
                  value={settings.maxUploadSize}
                  onChange={(e) => setSettings({ ...settings, maxUploadSize: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
                <input
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => setSettings({ ...settings, passwordMinLength: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="2fa"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="2fa" className="text-sm text-gray-700">
                  Require Two-Factor Authentication for Admins
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="emailVerify"
                  checked={settings.emailVerification}
                  onChange={(e) => setSettings({ ...settings, emailVerification: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="emailVerify" className="text-sm text-gray-700">
                  Require Email Verification for New Accounts
                </label>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Notifications Settings */}
      {activeTab === 'notifications' && (
        <Card>
          <CardBody>
            <CardTitle>Notification Settings</CardTitle>
            <div className="mt-4 space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Email Notifications</h4>
                <div className="space-y-2">
                  {['New User Registration', 'Course Submissions', 'Support Tickets', 'Security Alerts'].map(item => (
                    <label key={item} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Push Notifications</h4>
                <div className="space-y-2">
                  {['New User Registration', 'Course Submissions', 'Support Tickets', 'Security Alerts'].map(item => (
                    <label key={item} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notification Email</label>
                <input
                  type="email"
                  defaultValue="notifications@joyedu.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Integrations Settings */}
      {activeTab === 'integrations' && (
        <Card>
          <CardBody>
            <CardTitle>Integrations</CardTitle>
            <div className="mt-4 space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Payment Gateway</h4>
                    <p className="text-sm text-gray-600">Stripe integration for payments</p>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Email Service</h4>
                    <p className="text-sm text-gray-600">SendGrid for transactional emails</p>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Cloud Storage</h4>
                    <p className="text-sm text-gray-600">AWS S3 for file storage</p>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Analytics</h4>
                    <p className="text-sm text-gray-600">Google Analytics integration</p>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Appearance Settings */}
      {activeTab === 'appearance' && (
        <Card>
          <CardBody>
            <CardTitle>Appearance Settings</CardTitle>
            <div className="mt-4 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <div className="flex gap-2">
                  <input type="color" defaultValue="#3B82F6" className="w-12 h-10 rounded cursor-pointer" />
                  <input
                    type="text"
                    defaultValue="#3B82F6"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/logo.png"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Favicon URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/favicon.ico"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom CSS</label>
                <textarea
                  rows={6}
                  placeholder="Enter custom CSS..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>

      {/* Save Confirmation Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Save Settings</CardTitle>
              <p className="mt-4 text-gray-600">
                Are you sure you want to save these settings? Some changes may affect platform functionality.
              </p>
              <div className="flex gap-4 mt-6">
                <Button onClick={confirmSave}>Confirm Save</Button>
                <Button variant="outline" onClick={() => setShowSaveModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
