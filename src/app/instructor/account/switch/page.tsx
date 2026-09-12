'use client';

import { useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function InstructorSwitchRole() {
  const router = useRouter();
  const { currentUser, currentRole, switchRole } = useAuth();

  const handleSwitchToStudent = () => {
    switchRole('student');
    router.push('/student');
  };

  const handleSwitchToInstructor = () => {
    switchRole('instructor');
    router.push('/instructor');
  };

  const hasStudentRole = currentUser?.roles.includes('student');
  const hasInstructorRole = currentUser?.roles.includes('instructor');

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Switch Role</h1>
        <p className="text-gray-600">Switch between your available roles</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardBody>
            <CardTitle>Available Roles</CardTitle>
            
            <div className="space-y-4 mt-6">
              {hasInstructorRole && (
                <div className={`p-4 border rounded-lg ${currentRole === 'instructor' ? 'border-blue-200 bg-blue-50' : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1" onClick={currentRole !== 'instructor' ? handleSwitchToInstructor : undefined}>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">Instructor</h3>
                        {currentRole === 'instructor' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Manage courses, students, and content</div>
                    </div>
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                </div>
              )}

              {hasStudentRole && (
                <div className={`p-4 border rounded-lg ${currentRole === 'student' ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-green-500 hover:bg-green-50 transition cursor-pointer'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1" onClick={currentRole !== 'student' ? handleSwitchToStudent : undefined}>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">Student</h3>
                        {currentRole === 'student' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Take courses, learn, and practice</div>
                    </div>
                    <span className="text-2xl">👨‍🎓</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Switching roles will change your dashboard and available features. Your data will be preserved.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}