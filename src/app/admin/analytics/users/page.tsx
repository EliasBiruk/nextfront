'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminUserAnalytics() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Analytics</h1>
        <p className="text-gray-600">View user behavior and engagement analytics</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>User Analytics Dashboard</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to view detailed user analytics and engagement metrics.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: User growth, engagement metrics, retention data, user segments</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
