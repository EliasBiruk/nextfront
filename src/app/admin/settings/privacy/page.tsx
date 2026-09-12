'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminPrivacyPolicy() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-600">Manage privacy policy settings</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Privacy Policy Management</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to manage the platform privacy policy.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Edit privacy policy, version history, user consent management</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
