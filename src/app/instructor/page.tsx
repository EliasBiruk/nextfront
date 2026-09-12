'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { coursesService, instructorsService } from '@/services';
import { useAuth } from '@/context/AuthContext';

export default function InstructorDashboard() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [instructorStats, setInstructorStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInstructorData() {
      if (!currentUser) return;
      try {
        const [coursesData, statsData] = await Promise.all([
          coursesService().getCourses({ instructorId: currentUser.id }),
          instructorsService().getInstructorStats(currentUser.id),
        ]);
        setCourses(coursesData.data || []);
        setInstructorStats(statsData);
      } catch (error) {
        console.error('Failed to load instructor data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadInstructorData();
  }, [currentUser]);

  const totalStudents = courses.reduce((sum, c) => sum + (c.enrolledCount || 0), 0);
  const totalRevenue = courses.reduce((sum, c) => sum + (c.revenue || 0), 0);

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-2">Good morning, {currentUser?.firstName || 'Instructor'} 👋</h1>
        <p className="text-[var(--joyedu-text-secondary)]">Welcome back. Here's what's happening with your courses.</p>
      </div>

      {isLoading ? (
        <Card>
          <CardBody>
            <p className="text-[var(--joyedu-text-secondary)]">Loading dashboard...</p>
          </CardBody>
        </Card>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-[var(--joyedu-primary-500)] to-[var(--joyedu-primary-600)] text-white border-0">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold mb-1">{courses.length}</div>
                    <div className="text-[var(--joyedu-primary-100)] text-sm">Courses</div>
                  </div>
                  <div className="text-4xl opacity-80">📚</div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-[var(--joyedu-success-500)] to-[var(--joyedu-success-600)] text-white border-0">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold mb-1">{totalStudents}</div>
                    <div className="text-[var(--joyedu-success-100)] text-sm">Students</div>
                  </div>
                  <div className="text-4xl opacity-80">👥</div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-[var(--joyedu-accent-500)] to-[var(--joyedu-accent-600)] text-white border-0">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold mb-1">${totalRevenue.toLocaleString()}</div>
                    <div className="text-[var(--joyedu-accent-100)] text-sm">Revenue</div>
                  </div>
                  <div className="text-4xl opacity-80">💰</div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-[var(--joyedu-warning-500)] to-[var(--joyedu-warning-600)] text-white border-0">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold mb-1">{instructorStats?.averageRating || 4.8}</div>
                    <div className="text-[var(--joyedu-warning-100)] text-sm">Rating</div>
                  </div>
                  <div className="text-4xl opacity-80">⭐</div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Course Status */}
            <div className="lg:col-span-2">
              <Card>
                <CardBody>
                  <CardTitle>Course Status</CardTitle>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-[var(--joyedu-bg-secondary)] p-4 rounded-lg">
                      <div className="text-2xl font-bold text-[var(--joyedu-text-primary)]">{courses.filter(c => c.status === 'draft').length}</div>
                      <div className="text-sm text-[var(--joyedu-text-secondary)]">Draft</div>
                      <ProgressBar progress={0} color="gray" />
                    </div>
                    <div className="bg-[var(--joyedu-warning-subtle)] p-4 rounded-lg border border-[var(--joyedu-warning-300)]">
                      <div className="text-2xl font-bold text-[var(--joyedu-warning-900)]">{courses.filter(c => c.status === 'review').length}</div>
                      <div className="text-sm text-[var(--joyedu-warning-700)]">In Review</div>
                      <ProgressBar progress={0} color="yellow" />
                    </div>
                    <div className="bg-[var(--joyedu-success-subtle)] p-4 rounded-lg border border-[var(--joyedu-success-300)]">
                      <div className="text-2xl font-bold text-[var(--joyedu-success-900)]">{courses.filter(c => c.status === 'published').length}</div>
                      <div className="text-sm text-[var(--joyedu-success-700)]">Published</div>
                      <ProgressBar progress={0} color="green" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Work Requiring Attention */}
            <div>
              <Card>
                <CardBody>
                  <CardTitle>Work Requiring Attention</CardTitle>
                  <div className="space-y-3 mt-4">
                    {[
                      { 
                        type: 'review',
                        title: 'Course Review', 
                        detail: 'Courses pending review',
                        count: courses.filter(c => c.status === 'review').length,
                        icon: '👁️',
                        link: '/instructor/publishing/status'
                      },
                      { 
                        type: 'questions',
                        title: 'Student Questions', 
                        detail: '24 unanswered questions',
                        count: 24,
                        icon: '❓',
                        link: '/instructor/communication/questions'
                      },
                      { 
                        type: 'submissions',
                        title: 'Exercise Submissions', 
                        detail: 'Awaiting review',
                        count: 18,
                        icon: '📝',
                        link: '/instructor/assessments/attempts'
                      },
                    ].map((item) => (
                      <Link 
                        key={item.title}
                        href={item.link}
                        className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition"
                      >
                        <div className="text-2xl">{item.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-[var(--joyedu-text-primary)]">{item.title}</div>
                          <div className="text-xs text-[var(--joyedu-text-secondary)]">{item.detail}</div>
                        </div>
                        <div className="bg-[var(--joyedu-primary)] text-white text-xs px-2 py-1 rounded-full">
                          {item.count}
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Student Activity */}
          <Card className="mb-8">
            <CardBody>
              <CardTitle>Recent Student Activity</CardTitle>
              <div className="space-y-3 mt-4">
                {[
                  { action: 'Sarah completed Chapter 4', course: 'JavaScript Fundamentals', time: '2 hours ago', icon: '✅' },
                  { action: 'Abebe submitted Exercise 8', course: 'React Development', time: '3 hours ago', icon: '📝' },
                  { action: 'John asked a question', course: 'Python for Data Science', time: '5 hours ago', icon: '❓' },
                  { action: 'Maria completed the course', course: 'JavaScript Fundamentals', time: '1 day ago', icon: '🎓' },
                  { action: 'Michael started a course', course: 'React Development', time: '2 days ago', icon: '🚀' },
                ].map((activity) => (
                  <div key={activity.action} className="flex items-center gap-3 p-3 bg-[var(--joyedu-bg-secondary)] rounded-lg">
                    <div className="text-xl">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">{activity.action}</div>
                      <div className="text-xs text-[var(--joyedu-text-secondary)]">{activity.course}</div>
                    </div>
                    <div className="text-xs text-[var(--joyedu-text-muted)]">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Course Performance */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-6">
                <CardTitle>Course Performance</CardTitle>
                <Link href="/instructor/analytics/courses" className="text-[var(--joyedu-primary)] hover:underline text-sm font-medium">
                  View all analytics →
                </Link>
              </div>
              
              <div className="space-y-4">
                {courses.slice(0, 3).map((course) => (
                  <div 
                    key={course.id}
                    className="flex items-center gap-4 p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition cursor-pointer"
                    onClick={() => router.push('/instructor/analytics/courses')}
                  >
                    <div className="text-3xl">📚</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--joyedu-text-primary)]">{course.title}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-2 text-xs">
                        <div>
                          <div className="text-[var(--joyedu-text-muted)]">Enrollments</div>
                          <div className="font-medium text-[var(--joyedu-text-primary)]">{course.enrolledCount || 0}</div>
                        </div>
                        <div>
                          <div className="text-[var(--joyedu-text-muted)]">Active</div>
                          <div className="font-medium text-[var(--joyedu-text-primary)]">{course.activeStudents || 0}</div>
                        </div>
                        <div>
                          <div className="text-[var(--joyedu-text-muted)]">Completion</div>
                          <div className="font-medium text-[var(--joyedu-text-primary)]">{course.completionRate || 0}%</div>
                        </div>
                        <div>
                          <div className="text-[var(--joyedu-text-muted)]">Rating</div>
                          <div className="font-medium text-[var(--joyedu-text-primary)]">⭐ {course.rating || 4.8}</div>
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
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </DashboardLayout>
  );
}