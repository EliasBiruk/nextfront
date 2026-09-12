'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { coursesService } from '@/services';
import { useAuth } from '@/context/AuthContext';

export default function InstructorCourses() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      if (!currentUser) return;
      try {
        const response = await coursesService().getCourses({ instructorId: currentUser.id, pagination: { page: 1, pageSize: 50 } });
        setCourses(response.data || []);
      } catch (error) {
        console.error('Failed to load courses:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourses();
  }, [currentUser]);

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-[var(--joyedu-success-bg)] text-[var(--joyedu-success-text)] border border-[var(--joyedu-success-200)]',
      in_review: 'bg-[var(--joyedu-warning-bg)] text-[var(--joyedu-warning-text)] border border-[var(--joyedu-warning-200)]',
      draft: 'bg-[var(--joyedu-bg-tertiary)] text-[var(--joyedu-text-secondary)] border border-[var(--joyedu-border-200)]',
      rejected: 'bg-[var(--joyedu-error-bg)] text-[var(--joyedu-error-text)] border border-[var(--joyedu-error-200)]',
      approved: 'bg-[var(--joyedu-info-bg)] text-[var(--joyedu-info-text)] border border-[var(--joyedu-info-200)]',
      archived: 'bg-[var(--joyedu-bg-tertiary)] text-[var(--joyedu-text-muted)] border border-[var(--joyedu-border-200)]'
    };
    const labels = {
      published: 'Published',
      in_review: 'In Review',
      draft: 'Draft',
      rejected: 'Rejected',
      approved: 'Approved',
      archived: 'Archived'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-2">My Courses</h1>
        <p className="text-[var(--joyedu-text-secondary)]">Manage and track all your courses</p>
      </div>

      {isLoading ? (
        <Card>
          <CardBody>
            <p className="text-[var(--joyedu-text-secondary)]">Loading courses...</p>
          </CardBody>
        </Card>
      ) : (
        <>
          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardBody>
                <div className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-1">{courses.length}</div>
                <div className="text-sm text-[var(--joyedu-text-secondary)]">Total Courses</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-2xl font-bold text-[var(--joyedu-success)] mb-1">{courses.filter(c => c.status === 'published').length}</div>
                <div className="text-sm text-[var(--joyedu-text-secondary)]">Published</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-2xl font-bold text-[var(--joyedu-warning)] mb-1">{courses.filter(c => c.status === 'review').length}</div>
                <div className="text-sm text-[var(--joyedu-text-secondary)]">In Review</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-2xl font-bold text-[var(--joyedu-text-secondary)] mb-1">{courses.reduce((sum, c) => sum + (c.enrolledCount || 0), 0)}</div>
                <div className="text-sm text-[var(--joyedu-text-secondary)]">Total Students</div>
              </CardBody>
            </Card>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            <Link href="/instructor/courses" className="px-4 py-2 bg-[var(--joyedu-primary)] text-white rounded-lg font-medium">
              All Courses
            </Link>
            <Link href="/instructor/courses/drafts" className="px-4 py-2 bg-[var(--joyedu-bg-tertiary)] text-[var(--joyedu-text-secondary)] rounded-lg hover:bg-[var(--joyedu-bg-secondary)] transition">
              Drafts
            </Link>
            <Link href="/instructor/courses/review" className="px-4 py-2 bg-[var(--joyedu-bg-tertiary)] text-[var(--joyedu-text-secondary)] rounded-lg hover:bg-[var(--joyedu-bg-secondary)] transition">
              In Review
            </Link>
            <Link href="/instructor/courses/published" className="px-4 py-2 bg-[var(--joyedu-bg-tertiary)] text-[var(--joyedu-text-secondary)] rounded-lg hover:bg-[var(--joyedu-bg-secondary)] transition">
              Published
            </Link>
          </div>

          {/* Courses List */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-6">
                <CardTitle>All Courses</CardTitle>
                <Link 
                  href="/instructor/builder/create"
                  className="px-4 py-2 bg-[var(--joyedu-primary)] text-white rounded-lg hover:bg-[var(--joyedu-primary-hover)] transition font-medium shadow-[var(--joyedu-shadow-sm)]"
                >
                  + Create Course
                </Link>
              </div>
              
              {courses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-[var(--joyedu-text-primary)] mb-2">No courses yet</h3>
                  <p className="text-[var(--joyedu-text-secondary)] mb-4">Create your first course to get started</p>
                  <Link 
                    href="/instructor/builder/create"
                    className="inline-block px-4 py-2 bg-[var(--joyedu-primary)] text-white rounded-lg hover:bg-[var(--joyedu-primary-hover)] transition shadow-[var(--joyedu-shadow-sm)]"
                  >
                    Create Course
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div 
                      key={course.id}
                      className="flex items-center gap-4 p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition cursor-pointer"
                      onClick={() => router.push(`/instructor/builder/info?id=${course.id}`)}
                    >
                      <div className="text-4xl">📚</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-[var(--joyedu-text-primary)]">{course.title}</h3>
                          {getStatusBadge(course.status)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div>
                            <div className="text-[var(--joyedu-text-muted)]">Enrollments</div>
                            <div className="font-medium text-[var(--joyedu-text-primary)]">{course.enrolledCount || 0}</div>
                          </div>
                          <div>
                            <div className="text-[var(--joyedu-text-muted)]">Rating</div>
                            <div className="font-medium text-[var(--joyedu-text-primary)]">⭐ {course.rating || 0}</div>
                          </div>
                          <div>
                            <div className="text-[var(--joyedu-text-muted)]">Reviews</div>
                            <div className="font-medium text-[var(--joyedu-text-primary)]">{course.reviewCount || 0}</div>
                          </div>
                          <div>
                            <div className="text-[var(--joyedu-text-muted)]">Revenue</div>
                            <div className="font-medium text-[var(--joyedu-text-primary)]">${(course.revenue || 0).toLocaleString()}</div>
                          </div>
                        </div>
                        {course.rejectionReason && (
                          <div className="mt-2 text-xs text-[var(--joyedu-error)]">
                            ⚠️ {course.rejectionReason}
                          </div>
                        )}
                      </div>
                      <div className="text-right min-w-[150px]">
                        <div className="text-xs text-[var(--joyedu-text-muted)] mb-1">Progress</div>
                        <ProgressBar progress={course.completionRate || 0} />
                        <div className="text-xs text-[var(--joyedu-text-muted)] mt-2">{new Date(course.updatedAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </>
      )}
    </DashboardLayout>
  );
}