'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function AdminCourseAnalytics() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Analytics</h1>
        <p className="text-gray-600">View course performance analytics</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Course Analytics Dashboard</CardTitle>
          <p className="text-gray-600 mt-4">This page allows administrators to view detailed course performance analytics.</p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Features coming soon: Enrollment trends, completion rates, revenue per course, popular courses</p>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
