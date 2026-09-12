'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminMaintenance() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Maintenance</h1>
        <p className="text-gray-600">Schedule and manage system maintenance</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Maintenance Management</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to schedule and manage system maintenance windows.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Schedule maintenance, maintenance history, notify users</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
