'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminPendingSchools() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pending Schools</h1>
        <p className="text-gray-600">Review school partnership applications</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Pending School Applications</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to review and approve school partnership applications.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Review applications, approve/reject, request additional info</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
