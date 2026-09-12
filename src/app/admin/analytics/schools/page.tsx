'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminSchoolAnalytics() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">School Analytics</h1>
        <p className="text-gray-600">View school performance analytics</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>School Analytics Dashboard</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to view detailed school performance analytics.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: School growth, enrollment metrics, revenue per school, school comparison</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
