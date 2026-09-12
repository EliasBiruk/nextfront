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
        <p className="text-gray-600">View analytics and performance metrics for schools</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>School Performance Analytics</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to view analytics and performance metrics for all partner schools.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Enrollment metrics, revenue analytics, engagement data</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
