'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminLegalSettings() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Legal & Compliance</h1>
        <p className="text-gray-600">Manage legal documents and compliance</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Legal & Compliance Settings</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to manage legal documents and compliance settings.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Terms of service, privacy policy, GDPR compliance, legal disclaimers</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
