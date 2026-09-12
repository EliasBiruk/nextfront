'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminNotificationHistory() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notification History</h1>
        <p className="text-gray-600">View notification history</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Notification History</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to view notification history.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: View sent notifications, filter by type, delivery status</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
