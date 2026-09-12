'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminTermsOfService() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-600">Manage terms of service settings</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Terms of Service Management</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to manage the platform terms of service.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Edit terms, version history, user acceptance tracking</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
