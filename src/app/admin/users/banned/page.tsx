'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminBannedUsers() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Banned Users</h1>
        <p className="text-gray-600">View and manage banned user accounts</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Banned User Management</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to view banned users, review ban reasons, and unban accounts if necessary.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Ban history, unban requests, permanent bans</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
