'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { enrollmentsService } from '@/services';
import { useAuth } from '@/context/AuthContext';

export default function StudentCourses() {
  const { currentUser } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEnrollments() {
      if (!currentUser) return;
      try {
        const response = await enrollmentsService().getEnrollments({
          userId: currentUser.id,
          pagination: { page: 1, pageSize: 20 },
        });
        setEnrollments(response.data);
      } catch (error) {
        console.error('Failed to load enrollments:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadEnrollments();
  }, [currentUser]);

  return (
    <DashboardLayout actor="student" userName={currentUser?.firstName || 'Student'}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-2">My Courses</h1>
        <p className="text-[var(--joyedu-text-secondary)]">Manage your enrolled courses and track progress</p>
      </div>

      {isLoading ? (
        <Card>
          <CardBody>
            <p className="text-[var(--joyedu-text-secondary)]">Loading courses...</p>
          </CardBody>
        </Card>
      ) : enrollments.length === 0 ? (
        <Card>
          <CardBody>
            <CardTitle>Enrolled Courses</CardTitle>
            <p className="text-[var(--joyedu-text-secondary)] mb-4">You haven't enrolled in any courses yet.</p>
            <Link 
              href="/guest/courses" 
              className="inline-block px-4 py-2 bg-[var(--joyedu-primary)] text-white rounded-lg hover:bg-[var(--joyedu-primary-hover)] transition"
            >
              Browse Courses
            </Link>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {enrollments.map((enrollment) => (
            <Card key={enrollment.id} className="hover:shadow-lg transition">
              <CardBody>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📚</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-[var(--joyedu-text-primary)]">{enrollment.courseTitle}</h3>
                    <p className="text-sm text-[var(--joyedu-text-secondary)] mb-2">Instructor: {enrollment.instructor}</p>
                    <div className="mb-2"><ProgressBar progress={enrollment.progress} /></div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--joyedu-text-muted)]">
                        Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </span>
                      <Link 
                        href={`/student/learning/player/${enrollment.courseId}`}
                        className="text-[var(--joyedu-primary)] hover:underline text-sm font-medium"
                      >
                        Continue Learning →
                      </Link>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[var(--joyedu-primary)]">{enrollment.progress}%</div>
                    <div className="text-xs text-[var(--joyedu-text-muted)]">Complete</div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}