'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminHarassmentReports() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Harassment Reports</h1>
        <p className="text-gray-600">Review harassment reports</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Harassment Report Management</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to review and handle harassment reports.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Review reports, take action, support victims</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
