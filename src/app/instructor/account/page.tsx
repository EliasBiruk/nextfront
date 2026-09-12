'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function InstructorAccount() {
  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your instructor account settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/instructor/account/settings">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">⚙️</div>
              <CardTitle>Settings</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Configure your account settings</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/account/security">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">🔒</div>
              <CardTitle>Security</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Manage password and security</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/account/preferences">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">🎨</div>
              <CardTitle>Preferences</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Set your preferences</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/account/privacy">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">🔐</div>
              <CardTitle>Privacy</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Manage privacy settings</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/account/devices">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">📱</div>
              <CardTitle>Devices / Sessions</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Manage active sessions</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/account/switch">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">🔄</div>
              <CardTitle>Switch Role</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Switch between student and instructor roles</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
}