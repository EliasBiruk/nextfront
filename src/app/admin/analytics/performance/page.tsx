'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminPerformanceAnalytics() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Performance Analytics</h1>
        <p className="text-gray-600">View platform performance metrics</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Performance Analytics Dashboard</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to view detailed platform performance metrics.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Load times, error rates, API performance, system health</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
