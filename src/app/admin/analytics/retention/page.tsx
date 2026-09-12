'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminRetentionAnalytics() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Retention Analytics</h1>
        <p className="text-gray-600">View user retention metrics</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Retention Analytics Dashboard</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to view detailed user retention metrics.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Retention rates, churn analysis, cohort analysis, retention strategies</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
