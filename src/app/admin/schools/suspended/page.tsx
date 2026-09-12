'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminSuspendedSchools() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Suspended Schools</h1>
        <p className="text-gray-600">View and manage suspended schools</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Suspended School Management</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to view suspended schools and manage their reinstatement.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: View suspension reasons, reinstate schools, manage appeals</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
