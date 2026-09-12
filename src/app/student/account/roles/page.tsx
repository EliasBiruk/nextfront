'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RolesPage() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState('student');

  const roles = [
    {
      id: 'student',
      name: 'Student',
      description: 'Access courses, assessments, and learning resources',
      icon: '🎓',
      features: ['Course enrollment', 'Assessments and quizzes', 'Progress tracking', 'Achievements and certificates'],
      available: true,
    },
    {
      id: 'instructor',
      name: 'Instructor',
      description: 'Create and manage courses, grade assessments',
      icon: '👨‍🏫',
      features: ['Course creation', 'Student management', 'Grading tools', 'Analytics dashboard'],
      available: true,
    },
    {
      id: 'school',
      name: 'School Admin',
      description: 'Manage school-wide settings and student data',
      icon: '🏫',
      features: ['School configuration', 'Student enrollment', 'Teacher management', 'School analytics'],
      available: false,
    },
    {
      id: 'admin',
      name: 'Platform Admin',
      description: 'Full platform access and system management',
      icon: '⚙️',
      features: ['User management', 'System configuration', 'Platform analytics', 'Content moderation'],
      available: false,
    },
  ];

  const switchRole = (roleId: string) => {
    setCurrentRole(roleId);
    // In a real app, this would trigger a role switch
    console.log('Switching to role:', roleId);
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Role Management</h1>
        <p className="text-gray-600">Switch between different roles and manage your permissions</p>
      </div>

      {/* Current Role */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Current Role</CardTitle>
          <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-4xl">🎓</div>
            <div>
              <div className="font-bold text-lg text-blue-900">Student</div>
              <div className="text-sm text-blue-700">You are currently viewing the platform as a student</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Available Roles */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Available Roles</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`p-6 border-2 rounded-lg transition ${
                  currentRole === role.id
                    ? 'border-blue-500 bg-blue-50'
                    : role.available
                    ? 'border-gray-200 hover:border-blue-300'
                    : 'border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{role.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-gray-900">{role.name}</h3>
                      {currentRole === role.id && (
                        <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded">Current</span>
                      )}
                      {!role.available && (
                        <span className="px-2 py-1 text-xs bg-gray-400 text-white rounded">Not Available</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Features:</div>
                  <ul className="space-y-1">
                    {role.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {role.available && currentRole !== role.id && (
                  <button
                    onClick={() => switchRole(role.id)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Switch to {role.name}
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Role Information */}
      <Card>
        <CardBody>
          <CardTitle>Role Information</CardTitle>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Why switch roles?</div>
              <p className="text-sm text-gray-600">
                Different roles provide different features and permissions. For example, as an instructor,
                you can create courses and manage students. As a student, you can enroll in courses and take assessments.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">How to get additional roles?</div>
              <p className="text-sm text-gray-600">
                Contact the platform administrator to request additional role access. Each role may have specific
                requirements and permissions based on your account type and verification status.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="font-medium text-yellow-900 mb-2">Important Note</div>
              <p className="text-sm text-yellow-700">
                Switching roles will change your dashboard view and available features. Your data and progress
                will be preserved across all roles.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}