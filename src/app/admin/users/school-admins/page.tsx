'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminSchoolAdmins() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">School Admins</h1>
        <p className="text-gray-600">Manage all school administrator accounts</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>School Administrator Management</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to view, manage, and moderate all school administrator accounts.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Search, filter, school association, permissions management</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
