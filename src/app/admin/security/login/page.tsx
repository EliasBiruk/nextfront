'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginActivity() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Login Activity</h1>
        <p className="text-gray-600">Monitor login activity across the platform</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Login Activity Monitoring</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to monitor login activity and detect suspicious behavior.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: View login history, detect anomalies, block IPs</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
