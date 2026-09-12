'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function SchoolInstructorAccount() {
  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your instructor account and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/instructor/school/account/profile">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">👤</div>
              <CardTitle>Profile</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Update your profile information</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/school/account/settings">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">⚙️</div>
              <CardTitle>Settings</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Configure your account settings</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/school/account/security">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">🔒</div>
              <CardTitle>Security</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Manage password and security</p>
            </CardBody>
          </Card>
        </Link>

        <Link href="/instructor/school/account/switch">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">🔄</div>
              <CardTitle>Switch Role / Context</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Switch between instructor and student roles</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
}