'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccountOverview() {
  const router = useRouter();

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Profile Summary */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Overview</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Profile Card */}
      <Card className="mb-8">
        <CardBody>
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              K
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">Kapi</h2>
              <p className="text-gray-600">kapi@example.com</p>
              <p className="text-sm text-gray-500 mt-1">Student • Level 18 • 4,820 XP</p>
            </div>
            <Link 
              href="/student/account/profile"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </Link>
          </div>
        </CardBody>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="text-3xl font-bold mb-1">8</div>
            <div className="text-blue-100 text-sm">Courses Completed</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="text-3xl font-bold mb-1">4,820</div>
            <div className="text-green-100 text-sm">Total XP</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="text-3xl font-bold mb-1">12 days</div>
            <div className="text-orange-100 text-sm">Current Streak</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="text-3xl font-bold mb-1">6 months</div>
            <div className="text-purple-100 text-sm">Member Since</div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/student/account/profile" className="block">
          <Card className="hover:border-blue-500 transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">👤</div>
              <h3 className="font-semibold text-gray-900">Profile</h3>
              <p className="text-sm text-gray-600">Personal information</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/student/account/settings" className="block">
          <Card className="hover:border-blue-500 transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">⚙️</div>
              <h3 className="font-semibold text-gray-900">Settings</h3>
              <p className="text-sm text-gray-600">General preferences</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/student/account/security" className="block">
          <Card className="hover:border-blue-500 transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-900">Security</h3>
              <p className="text-sm text-gray-600">Password & 2FA</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/student/account/preferences" className="block">
          <Card className="hover:border-blue-500 transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold text-gray-900">Preferences</h3>
              <p className="text-sm text-gray-600">Learning settings</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/student/account/privacy" className="block">
          <Card className="hover:border-blue-500 transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">🔐</div>
              <h3 className="font-semibold text-gray-900">Privacy</h3>
              <p className="text-sm text-gray-600">Data & visibility</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/student/account/devices" className="block">
          <Card className="hover:border-blue-500 transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold text-gray-900">Devices</h3>
              <p className="text-sm text-gray-600">Sessions & logins</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/student/account/roles" className="block">
          <Card className="hover:border-blue-500 transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold text-gray-900">Roles</h3>
              <p className="text-sm text-gray-600">Switch roles</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/student/account/language" className="block">
          <Card className="hover:border-blue-500 transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">🌐</div>
              <h3 className="font-semibold text-gray-900">Language</h3>
              <p className="text-sm text-gray-600">App language</p>
            </CardBody>
          </Card>
        </Link>
      </div>

      {/* Account Status */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Account Status</CardTitle>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Subscription</div>
                <div className="text-sm text-gray-600">Premium Plan</div>
              </div>
              <div className="text-green-600 font-medium">Active</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Email Verified</div>
                <div className="text-sm text-gray-600">kapi@example.com</div>
              </div>
              <div className="text-green-600 font-medium">Verified</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Two-Factor Auth</div>
                <div className="text-sm text-gray-600">Account protection</div>
              </div>
              <div className="text-orange-600 font-medium">Not Enabled</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardBody>
          <CardTitle>Recent Account Activity</CardTitle>
          <div className="space-y-3">
            {[
              { action: 'Profile updated', detail: 'Changed bio and interests', time: '2 hours ago', icon: '👤' },
              { action: 'Settings changed', detail: 'Updated notification preferences', time: '1 day ago', icon: '⚙️' },
              { action: 'Password changed', detail: 'Security update', time: '3 days ago', icon: '🔒' },
              { action: 'Device added', detail: 'New login from Chrome on Windows', time: '1 week ago', icon: '📱' },
            ].map((activity) => (
              <div key={activity.action} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{activity.action}</div>
                  <div className="text-xs text-gray-600">{activity.detail}</div>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}