'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminFeatureFlags() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Feature Flags</h1>
        <p className="text-gray-600">Manage feature flags and rollouts</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Feature Flag Management</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to manage feature flags and control feature rollouts.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Toggle features, A/B testing, gradual rollouts, feature analytics</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
