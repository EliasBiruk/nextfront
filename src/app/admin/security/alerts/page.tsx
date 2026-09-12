'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminSecurityAlerts() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Security Alerts</h1>
        <p className="text-gray-600">View and manage security alerts</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Security Alert Management</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to view and manage security alerts across the platform.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: View alerts, investigate threats, take action</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
