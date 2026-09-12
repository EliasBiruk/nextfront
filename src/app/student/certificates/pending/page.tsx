'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

interface PendingCertificate {
  id: string;
  courseName: string;
  completionDate: string;
  instructor: string;
  status: 'processing' | 'pending_review' | 'awaiting_verification';
  estimatedCompletion: string;
  progress: number;
}

export default function PendingCertificates() {
  const [pendingCertificates] = useState<PendingCertificate[]>([
    {
      id: 'CERT-001',
      courseName: 'Advanced React Development',
      completionDate: '2024-01-15',
      instructor: 'Dr. Sarah Johnson',
      status: 'processing',
      estimatedCompletion: '2024-01-20',
      progress: 75,
    },
    {
      id: 'CERT-002',
      courseName: 'Database Design Principles',
      completionDate: '2024-01-18',
      instructor: 'Prof. Michael Chen',
      status: 'pending_review',
      estimatedCompletion: '2024-01-25',
      progress: 50,
    },
    {
      id: 'CERT-003',
      courseName: 'Cloud Architecture Fundamentals',
      completionDate: '2024-01-20',
      instructor: 'Dr. Emily Williams',
      status: 'awaiting_verification',
      estimatedCompletion: '2024-01-28',
      progress: 25,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'awaiting_verification':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'pending_review':
        return 'Pending Review';
      case 'awaiting_verification':
        return 'Awaiting Verification';
      default:
        return status;
    }
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pending Certificates</h1>
        <p className="text-gray-600">Track the status of your certificates being processed</p>
      </div>

      <div className="space-y-4">
        {pendingCertificates.map((cert) => (
          <Card key={cert.id}>
            <CardBody>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="mb-2">{cert.courseName}</CardTitle>
                  <p className="text-sm text-gray-600">Certificate ID: {cert.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cert.status)}`}>
                  {getStatusLabel(cert.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Completion Date</p>
                  <p className="font-medium text-gray-900">{new Date(cert.completionDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Instructor</p>
                  <p className="font-medium text-gray-900">{cert.instructor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Completion</p>
                  <p className="font-medium text-gray-900">{new Date(cert.estimatedCompletion).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Verification Progress</span>
                  <span className="font-medium text-gray-900">{cert.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${cert.progress}%` }}
                  ></div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}

        {pendingCertificates.length === 0 && (
          <Card>
            <CardBody>
              <CardTitle>No Pending Certificates</CardTitle>
              <p className="text-gray-600">You don't have any certificates currently being processed.</p>
            </CardBody>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
