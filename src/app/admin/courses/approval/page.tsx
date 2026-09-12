'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminCourseApproval() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Approval</h1>
        <p className="text-gray-600">Approve or reject course publication requests</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Course Approval Workflow</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to approve or reject course publication requests with detailed review.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Detailed review, approval workflow, rejection reasons</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
