'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminSystemStatus() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Status</h1>
        <p className="text-gray-600">Monitor overall system health and status</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>System Status Dashboard</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to monitor the overall system health and status.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Real-time status, service health, incident management</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
