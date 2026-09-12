'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminPaymentGateways() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Gateways</h1>
        <p className="text-gray-600">Configure payment gateway settings</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Payment Gateway Configuration</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to configure payment gateway settings.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Configure gateways, manage API keys, test payments, view transaction logs</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
