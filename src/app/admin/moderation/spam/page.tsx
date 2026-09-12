'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminSpamDetection() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Spam Detection</h1>
        <p className="text-gray-600">Manage spam detection and prevention</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Spam Management</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to manage spam detection and prevention across the platform.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: View spam, adjust filters, manage blocked users</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
