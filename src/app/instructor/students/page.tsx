'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';

export default function InstructorStudents() {
  const students = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      enrolledCourses: 3,
      completedCourses: 1,
      progress: 67,
      lastActive: '2 hours ago',
      avatar: '👩'
    },
    {
      id: 2,
      name: 'Abebe Tesfaye',
      email: 'abebe@example.com',
      enrolledCourses: 2,
      completedCourses: 0,
      progress: 45,
      lastActive: '1 day ago',
      avatar: '👨'
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'john@example.com',
      enrolledCourses: 4,
      completedCourses: 2,
      progress: 89,
      lastActive: '3 hours ago',
      avatar: '👨'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      email: 'maria@example.com',
      enrolledCourses: 1,
      completedCourses: 1,
      progress: 100,
      lastActive: '5 hours ago',
      avatar: '👩'
    },
  ];

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-2">My Students</h1>
        <p className="text-[var(--joyedu-text-secondary)]">View and manage your enrolled students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-1">4,820</div>
            <div className="text-sm text-[var(--joyedu-text-secondary)]">Total Students</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-[var(--joyedu-success)] mb-1">3,250</div>
            <div className="text-sm text-[var(--joyedu-text-secondary)]">Active</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-[var(--joyedu-primary)] mb-1">1,570</div>
            <div className="text-sm text-[var(--joyedu-text-secondary)]">Completed</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-[var(--joyedu-warning)] mb-1">156</div>
            <div className="text-sm text-[var(--joyedu-text-secondary)]">At Risk</div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-6">
            <CardTitle>Recent Students</CardTitle>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search students..."
                className="px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {students.map((student) => (
              <div 
                key={student.id}
                className="flex items-center gap-4 p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition cursor-pointer"
              >
                <div className="text-3xl">{student.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--joyedu-text-primary)]">{student.name}</h3>
                  <div className="text-sm text-[var(--joyedu-text-secondary)]">{student.email}</div>
                  <div className="flex gap-4 mt-2 text-xs">
                    <span>📚 {student.enrolledCourses} Enrolled</span>
                    <span>✅ {student.completedCourses} Completed</span>
                    <span>🕐 {student.lastActive}</span>
                  </div>
                </div>
                <div className="text-right min-w-[120px]">
                  <div className="text-xs text-[var(--joyedu-text-muted)] mb-1">Progress</div>
                  <ProgressBar progress={student.progress} />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}