'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { enrollmentsService, progressService } from '@/services';
import { useAuth } from '@/context/AuthContext';

export default function StudentDashboard() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStudentData() {
      if (!currentUser) return;
      try {
        const response = await enrollmentsService().getEnrollments({
          userId: currentUser.id,
          pagination: { page: 1, pageSize: 10 },
        });
        setEnrollments(response.data);
      } catch (error) {
        console.error('Failed to load enrollments:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStudentData();
  }, [currentUser]);

  const totalCourses = enrollments.length;
  const avgProgress = totalCourses > 0 
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / totalCourses)
    : 0;

  return (
    <DashboardLayout actor="student" userName={currentUser?.firstName || 'Student'}>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-2">
          Good morning, {currentUser?.firstName || 'Student'} 👋
        </h1>
        <p className="text-[var(--joyedu-text-secondary)]">Continue your learning journey.</p>
        <Link 
          href="/student/learning"
          className="inline-block mt-4 px-6 py-3 bg-[var(--joyedu-primary)] text-white rounded-lg hover:bg-[var(--joyedu-primary-hover)] transition font-medium shadow-[var(--joyedu-shadow-sm)]"
        >
          Continue Learning
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-[var(--joyedu-primary-500)] to-[var(--joyedu-primary-600)] text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{totalCourses}</div>
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
                <div className="text-3xl font-bold mb-1">{avgProgress}%</div>
                <div className="text-[var(--joyedu-success-100)] text-sm">Progress</div>
              </div>
              <div className="text-4xl opacity-80">📈</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-[var(--joyedu-accent-500)] to-[var(--joyedu-accent-600)] text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">4,820</div>
                <div className="text-[var(--joyedu-accent-100)] text-sm">XP</div>
              </div>
              <div className="text-4xl opacity-80">⭐</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-[var(--joyedu-warning-500)] to-[var(--joyedu-warning-600)] text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">12 days</div>
                <div className="text-[var(--joyedu-warning-100)] text-sm">Streak</div>
              </div>
              <div className="text-4xl opacity-80">🔥</div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              <CardTitle>Continue Learning</CardTitle>
              {isLoading ? (
                <div className="text-center py-8 text-[var(--joyedu-text-muted)]">Loading courses...</div>
              ) : enrollments.length === 0 ? (
                <div className="text-center py-8 text-[var(--joyedu-text-muted)]">
                  No courses enrolled yet. <Link href="/guest/courses" className="text-[var(--joyedu-primary)] hover:underline">Browse courses</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollments.slice(0, 3).map((enrollment) => (
                    <Link key={enrollment.id} href={`/student/learning/player/${enrollment.courseId}`} className="block">
                      <div className="flex items-center gap-4 p-4 bg-[var(--joyedu-bg-tertiary)] rounded-lg hover:bg-[var(--joyedu-bg-secondary)] transition">
                        <div className="text-4xl">📚</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--joyedu-text-primary)]">{enrollment.courseTitle}</h3>
                          <p className="text-sm text-[var(--joyedu-text-secondary)]">Last activity: {enrollment.lastAccessedAt || 'Recently'}</p>
                          <div className="mt-2"><ProgressBar progress={enrollment.progress} /></div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[var(--joyedu-primary)]">{enrollment.progress}%</div>
                          <div className="text-xs text-[var(--joyedu-text-muted)]">Complete</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Upcoming Work */}
        <div>
          <Card>
            <CardBody>
              <CardTitle>Upcoming Work</CardTitle>
              <div className="space-y-3">
                {[
                  { 
                    type: 'quiz',
                    title: 'JavaScript Quiz', 
                    course: 'JavaScript Fundamentals',
                    deadline: 'Tomorrow',
                    status: 'pending',
                    icon: '📝'
                  },
                  { 
                    type: 'exercise',
                    title: 'Python Exercise', 
                    course: 'Python for Data Science',
                    deadline: 'Sep 9',
                    status: 'pending',
                    icon: '💻'
                  },
                  { 
                    type: 'exam',
                    title: 'Final Examination', 
                    course: 'React Development',
                    deadline: 'Sep 15',
                    status: 'pending',
                    icon: '📋'
                  },
                ].map((item) => (
                  <Link 
                    key={item.title}
                    href={`/student/${item.type}s`}
                    className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-[var(--joyedu-text-primary)]">{item.title}</div>
                      <div className="text-xs text-[var(--joyedu-text-secondary)]">{item.course}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[var(--joyedu-text-muted)]">{item.deadline}</div>
                      <div className="text-xs text-[var(--joyedu-warning)]">{item.status}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recommended Learning */}
        <Card>
          <CardBody>
            <CardTitle>Recommended Learning</CardTitle>
            <div className="space-y-3">
              {[
                { 
                  type: 'course',
                  title: 'TypeScript Fundamentals', 
                  reason: 'Based on your JavaScript progress',
                  icon: '📘',
                  link: '/student/courses'
                },
                { 
                  type: 'lesson',
                  title: 'Advanced React Patterns', 
                  reason: 'Continue your React journey',
                  icon: '⚛️',
                  link: '/student/learning'
                },
                { 
                  type: 'challenge',
                  title: 'JavaScript Challenge: DOM Mastery', 
                  reason: 'Test your skills',
                  icon: '🎯',
                  link: '/student/playground'
                },
                { 
                  type: 'skill',
                  title: 'CSS Grid & Flexbox', 
                  reason: 'Popular in web development',
                  icon: '🎨',
                  link: '/student/courses'
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
                    <div className="text-xs text-[var(--joyedu-text-secondary)]">{item.reason}</div>
                  </div>
                  <div className="text-[var(--joyedu-primary)]">→</div>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardBody>
            <CardTitle>Recent Activity</CardTitle>
            <div className="space-y-3">
              {[
                { action: 'Completed lesson', detail: 'Variables', time: '2 hours ago', icon: '✅' },
                { action: 'Passed quiz', detail: 'JavaScript Quiz - 95%', time: '5 hours ago', icon: '📝' },
                { action: 'Earned achievement', detail: '7 Day Streak', time: '1 day ago', icon: '🏆' },
                { action: 'Started course', detail: 'React Fundamentals', time: '2 days ago', icon: '📚' },
                { action: 'Submitted exercise', detail: 'Event Listeners Practice', time: '3 days ago', icon: '💻' },
              ].map((activity) => (
                <div key={activity.action} className="flex items-center gap-3 p-3 bg-[var(--joyedu-bg-tertiary)] rounded-lg">
                  <div className="text-xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{activity.action}</div>
                    <div className="text-xs text-[var(--joyedu-text-secondary)]">{activity.detail}</div>
                  </div>
                  <div className="text-xs text-[var(--joyedu-text-muted)]">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Progress</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-[var(--joyedu-text-secondary)] mb-2">Total Learning Time</div>
              <div className="text-2xl font-bold text-[var(--joyedu-text-primary)]">127 hours</div>
              <div className="text-xs text-[var(--joyedu-success)]">+12h this week</div>
            </div>
            <div>
              <div className="text-sm text-[var(--joyedu-text-secondary)] mb-2">Weekly Activity</div>
              <div className="text-2xl font-bold text-[var(--joyedu-text-primary)]">18.5 hours</div>
              <div className="text-xs text-[var(--joyedu-success)]">+3h from last week</div>
            </div>
            <div>
              <div className="text-sm text-[var(--joyedu-text-secondary)] mb-2">Course Completion</div>
              <div className="text-2xl font-bold text-[var(--joyedu-text-primary)]">{enrollments.filter(e => e.progress === 100).length}/{totalCourses}</div>
              <ProgressBar progress={avgProgress} color="green" />
            </div>
            <div>
              <div className="text-sm text-[var(--joyedu-text-secondary)] mb-2">Quiz Average Score</div>
              <div className="text-2xl font-bold text-[var(--joyedu-text-primary)]">87%</div>
              <ProgressBar progress={87} color="green" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Achievements Section */}
      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-6">
            <CardTitle>Achievements</CardTitle>
            <Link href="/student/achievements" className="text-[var(--joyedu-primary)] hover:underline text-sm font-medium">
              View all achievements →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Level & XP */}
            <div className="bg-gradient-to-br from-[var(--joyedu-accent-50)] to-[var(--joyedu-accent-100)] p-4 rounded-lg border border-[var(--joyedu-accent-200)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[var(--joyedu-accent-700)] font-medium">Level 18</span>
                <span className="text-2xl">⭐</span>
              </div>
              <div className="text-2xl font-bold text-[var(--joyedu-accent-900)] mb-2">4,820 XP</div>
              <ProgressBar progress={78} color="purple" />
              <div className="text-xs text-[var(--joyedu-accent-600)] mt-1">780 XP to Level 19</div>
            </div>

            {/* Streak */}
            <div className="bg-gradient-to-br from-[var(--joyedu-warning-50)] to-[var(--joyedu-warning-100)] p-4 rounded-lg border border-[var(--joyedu-warning-200)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[var(--joyedu-warning-700)] font-medium">Current Streak</span>
                <span className="text-2xl">🔥</span>
              </div>
              <div className="text-2xl font-bold text-[var(--joyedu-warning-900)] mb-2">12 Days</div>
              <div className="text-xs text-[var(--joyedu-warning-600)]">Personal best: 21 days</div>
            </div>

            {/* Badges */}
            <div className="bg-gradient-to-br from-[var(--joyedu-primary-50)] to-[var(--joyedu-primary-100)] p-4 rounded-lg border border-[var(--joyedu-primary-200)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[var(--joyedu-primary-700)] font-medium">Badges Earned</span>
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-2xl font-bold text-[var(--joyedu-primary-900)] mb-2">24</div>
              <div className="flex gap-1 mt-2">
                <span className="text-xl">🎯</span>
                <span className="text-xl">🚀</span>
                <span className="text-xl">💡</span>
                <span className="text-xl">⚡</span>
                <span className="text-xl">+20</span>
              </div>
            </div>

            {/* Total Achievements */}
            <div className="bg-gradient-to-br from-[var(--joyedu-success-50)] to-[var(--joyedu-success-100)] p-4 rounded-lg border border-[var(--joyedu-success-200)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[var(--joyedu-success-700)] font-medium">Achievements</span>
                <span className="text-2xl">🎖️</span>
              </div>
              <div className="text-2xl font-bold text-[var(--joyedu-success-900)] mb-2">86</div>
              <ProgressBar progress={68} color="green" />
              <div className="text-xs text-[var(--joyedu-success-600)] mt-1">40 achievements remaining</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}