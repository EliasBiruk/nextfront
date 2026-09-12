'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminSystemLogs() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Logs</h1>
        <p className="text-gray-600">View and search system logs</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>System Log Viewer</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to view and search system logs.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Log search, filter by level, export logs, log retention</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
