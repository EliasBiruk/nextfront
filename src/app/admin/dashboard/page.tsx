'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { adminService } from '@/services';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const [platformStats, setPlatformStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPlatformStats() {
      if (!currentUser) return;
      try {
        const stats = await adminService().getAdminStats();
        setPlatformStats(stats);
      } catch (error) {
        console.error('Failed to load platform stats:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPlatformStats();
  }, [currentUser]);

  return (
    <DashboardLayout actor="admin" userName={currentUser?.firstName || 'Administrator'}>
      {isLoading ? (
        <Card>
          <CardBody>
            <p className="text-[var(--joyedu-text-secondary)]">Loading dashboard...</p>
          </CardBody>
        </Card>
      ) : (
        <>
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-2">Platform Administration</h1>
            <p className="text-[var(--joyedu-text-secondary)]">JoyEdu Platform Management Console • Full Administrative Access</p>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-[var(--joyedu-primary-500)] to-[var(--joyedu-primary-600)] text-white border-0">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold mb-1">{platformStats?.totalUsers || 0}</div>
                    <div className="text-[var(--joyedu-primary-100)] text-sm">Total Users</div>
                    <div className="text-xs text-[var(--joyedu-primary-200)] mt-1">↑ 12% from last month</div>
                  </div>
                  <div className="text-4xl opacity-80">👥</div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-[var(--joyedu-success-500)] to-[var(--joyedu-success-600)] text-white border-0">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold mb-1">{platformStats?.activeCourses || 0}</div>
                    <div className="text-[var(--joyedu-success-100)] text-sm">Active Courses</div>
                    <div className="text-xs text-[var(--joyedu-success-200)] mt-1">{platformStats?.newCourses || 0} new this month</div>
                  </div>
                  <div className="text-4xl opacity-80">📚</div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-[var(--joyedu-accent-500)] to-[var(--joyedu-accent-600)] text-white border-0">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold mb-1">{platformStats?.partnerSchools || 0}</div>
                    <div className="text-[var(--joyedu-accent-100)] text-sm">Partner Schools</div>
                    <div className="text-xs text-[var(--joyedu-accent-200)] mt-1">{platformStats?.countries || 0} countries</div>
                  </div>
                  <div className="text-4xl opacity-80">🏫</div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-[var(--joyedu-warning-500)] to-[var(--joyedu-warning-600)] text-white border-0">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold mb-1">${(platformStats?.monthlyRevenue || 0).toLocaleString()}</div>
                    <div className="text-[var(--joyedu-warning-100)] text-sm">Monthly Revenue</div>
                    <div className="text-xs text-[var(--joyedu-warning-200)] mt-1">↑ 18% growth</div>
                  </div>
                  <div className="text-4xl opacity-80">💰</div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-[var(--joyedu-error-500)] to-[var(--joyedu-error-600)] text-white border-0">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold mb-1">{platformStats?.pendingApprovals || 0}</div>
                    <div className="text-[var(--joyedu-error-100)] text-sm">Pending Actions</div>
                    <div className="text-xs text-[var(--joyedu-error-200)] mt-1">Requires attention</div>
                  </div>
                  <div className="text-4xl opacity-80">⚠️</div>
                </div>
              </CardBody>
            </Card>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              <CardTitle>Platform Management</CardTitle>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <Link href="/admin/users" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Users</div>
                </Link>
                <Link href="/admin/courses" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                  <div className="text-3xl mb-2">📚</div>
                  <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Courses</div>
                </Link>
                <Link href="/admin/schools" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                  <div className="text-3xl mb-2">🏫</div>
                  <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Schools</div>
                </Link>
                <Link href="/admin/applications" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Applications</div>
                </Link>
                <Link href="/admin/finance" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Finance</div>
                </Link>
                <Link href="/admin/moderation" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                  <div className="text-3xl mb-2">🛡️</div>
                  <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Moderation</div>
                </Link>
                <Link href="/admin/security" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                  <div className="text-3xl mb-2">🔒</div>
                  <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Security</div>
                </Link>
                <Link href="/admin/analytics" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Analytics</div>
                </Link>
                <Link href="/admin/operations" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                  <div className="text-3xl mb-2">⚙️</div>
                  <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Operations</div>
                </Link>
                <Link href="/admin/configuration" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                  <div className="text-3xl mb-2">🔧</div>
                  <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Configuration</div>
                </Link>
                <Link href="/admin/notifications" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                  <div className="text-3xl mb-2">🔔</div>
                  <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Notifications</div>
                </Link>
                <Link href="/admin/settings" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                  <div className="text-3xl mb-2">⚙️</div>
                  <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Settings</div>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* System Health */}
        <Card>
          <CardBody>
            <CardTitle>System Health</CardTitle>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[var(--joyedu-success-subtle)] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[var(--joyedu-success)] rounded-full"></div>
                  <span className="font-medium text-[var(--joyedu-text-primary)]">Server Status</span>
                </div>
                <span className="text-[var(--joyedu-success)] font-medium">Online</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[var(--joyedu-success-subtle)] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[var(--joyedu-success)] rounded-full"></div>
                  <span className="font-medium text-[var(--joyedu-text-primary)]">Database</span>
                </div>
                <span className="text-[var(--joyedu-success)] font-medium">Healthy</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[var(--joyedu-success-subtle)] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[var(--joyedu-success)] rounded-full"></div>
                  <span className="font-medium text-[var(--joyedu-text-primary)]">API Response</span>
                </div>
                <span className="text-[var(--joyedu-success)] font-medium">45ms</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[var(--joyedu-primary-subtle)] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[var(--joyedu-primary)] rounded-full"></div>
                  <span className="font-medium text-[var(--joyedu-text-primary)]">Uptime</span>
                </div>
                <span className="text-[var(--joyedu-primary)] font-medium">99.9%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[var(--joyedu-warning-subtle)] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[var(--joyedu-warning)] rounded-full"></div>
                  <span className="font-medium text-[var(--joyedu-text-primary)]">Storage</span>
                </div>
                <span className="text-[var(--joyedu-warning)] font-medium">78% used</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[var(--joyedu-success-subtle)] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[var(--joyedu-success)] rounded-full"></div>
                  <span className="font-medium text-[var(--joyedu-text-primary)]">CDN</span>
                </div>
                <span className="text-[var(--joyedu-success)] font-medium">Operational</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pending Approvals */}
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-6">
              <CardTitle>Pending Approvals</CardTitle>
              <Link href="/admin/applications" className="text-[var(--joyedu-primary)] hover:underline text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { type: 'Instructor Application', name: 'Dr. Emily Watson', submitted: '2 days ago', priority: 'high' },
                { type: 'School Application', name: 'Tech Institute of California', submitted: '3 days ago', priority: 'medium' },
                { type: 'Course Review', name: 'Advanced Machine Learning', submitted: '1 day ago', priority: 'high' },
                { type: 'Instructor Application', name: 'Prof. Michael Chen', submitted: '5 days ago', priority: 'low' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] transition">
                  <div className="flex items-center gap-4">
                    <span className={`w-2 h-2 rounded-full ${
                      item.priority === 'high' ? 'bg-[var(--joyedu-error)]' :
                      item.priority === 'medium' ? 'bg-[var(--joyedu-warning)]' : 'bg-[var(--joyedu-success)]'
                    }`}></span>
                    <div>
                      <span className="text-xs text-[var(--joyedu-text-muted)] uppercase">{item.type}</span>
                      <h4 className="font-semibold text-[var(--joyedu-text-primary)]">{item.name}</h4>
                      <p className="text-sm text-[var(--joyedu-text-secondary)]">Submitted {item.submitted}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[var(--joyedu-primary)] text-white rounded-lg text-sm hover:bg-[var(--joyedu-primary-hover)] transition">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Recent Platform Activity */}
        <Card>
          <CardBody>
            <CardTitle>Recent Platform Activity</CardTitle>
            <div className="space-y-4">
              {[
                { action: 'New school registered', detail: 'Global Tech Academy from Japan', time: '1 hour ago', icon: '🏫' },
                { action: 'Course flagged for review', detail: 'Python Data Science - Content policy', time: '2 hours ago', icon: '📚' },
                { action: 'Payment processed', detail: '$15,000 in platform subscriptions', time: '3 hours ago', icon: '💰' },
                { action: 'Security alert', detail: 'Unusual login pattern detected', time: '5 hours ago', icon: '🔒' },
                { action: 'System update', detail: 'Platform updated to v2.4.1', time: '1 day ago', icon: '⚙️' },
              ].map((activity) => (
                <div key={activity.action} className="flex items-start gap-4 p-3 bg-[var(--joyedu-bg-secondary)] rounded-lg">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-[var(--joyedu-text-primary)]">{activity.action}</div>
                    <div className="text-sm text-[var(--joyedu-text-secondary)]">{activity.detail}</div>
                  </div>
                  <div className="text-sm text-[var(--joyedu-text-muted)]">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Distribution */}
        <Card>
          <CardBody>
            <CardTitle>User Distribution</CardTitle>
            <div className="space-y-4">
              {[
                { type: 'Students', count: 98500, percentage: 78.8, color: 'var(--joyedu-primary-500)' },
                { type: 'Instructors', count: 15200, percentage: 12.2, color: 'var(--joyedu-success-500)' },
                { type: 'School Users', count: 11300, percentage: 9.0, color: 'var(--joyedu-accent-500)' },
              ].map((user) => (
                <div key={user.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[var(--joyedu-text-primary)]">{user.type}</span>
                    <span className="text-[var(--joyedu-text-secondary)]">{user.count.toLocaleString()} ({user.percentage}%)</span>
                  </div>
                  <div className="w-full bg-[var(--joyedu-border-200)] rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${user.percentage}%`, backgroundColor: user.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Revenue Breakdown */}
        <Card>
          <CardBody>
            <CardTitle>Revenue Breakdown</CardTitle>
            <div className="space-y-4">
              {[
                { type: 'Course Sales', amount: 45000, percentage: 60, color: 'var(--joyedu-primary-500)' },
                { type: 'School Subscriptions', amount: 20000, percentage: 27, color: 'var(--joyedu-success-500)' },
                { type: 'Platform Fees', amount: 10000, percentage: 13, color: 'var(--joyedu-accent-500)' },
              ].map((revenue) => (
                <div key={revenue.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[var(--joyedu-text-primary)]">{revenue.type}</span>
                    <span className="text-[var(--joyedu-text-secondary)]">${revenue.amount.toLocaleString()} ({revenue.percentage}%)</span>
                  </div>
                  <div className="w-full bg-[var(--joyedu-border-200)] rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${revenue.percentage}%`, backgroundColor: revenue.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Content Moderation Queue */}
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-6">
              <CardTitle>Moderation Queue</CardTitle>
              <Link href="/admin/moderation" className="text-[var(--joyedu-primary)] hover:underline text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { type: 'Course Content', title: 'Inappropriate language detected', count: 5, priority: 'high' },
                { type: 'User Reports', title: 'Spam reports', count: 12, priority: 'medium' },
                { type: 'Comments', title: 'Harassment reports', count: 3, priority: 'high' },
                { type: 'Reviews', title: 'Fake review detection', count: 8, priority: 'low' },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between p-3 border border-[var(--joyedu-border-200)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${
                      item.priority === 'high' ? 'bg-[var(--joyedu-error)]' :
                      item.priority === 'medium' ? 'bg-[var(--joyedu-warning)]' : 'bg-[var(--joyedu-success)]'
                    }`}></span>
                    <div>
                      <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">{item.type}</div>
                      <div className="text-xs text-[var(--joyedu-text-secondary)]">{item.title}</div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[var(--joyedu-text-primary)]">{item.count}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Platform Overview */}
      <Card>
        <CardBody>
          <CardTitle>Platform Overview</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center p-4 bg-[var(--joyedu-primary-subtle)] rounded-lg">
              <div className="text-3xl font-bold text-[var(--joyedu-primary)] mb-1">23</div>
              <div className="text-sm text-[var(--joyedu-text-secondary)]">Countries</div>
            </div>
            <div className="text-center p-4 bg-[var(--joyedu-success-subtle)] rounded-lg">
              <div className="text-3xl font-bold text-[var(--joyedu-success)] mb-1">45</div>
              <div className="text-sm text-[var(--joyedu-text-secondary)]">Languages</div>
            </div>
            <div className="text-center p-4 bg-[var(--joyedu-accent-subtle)] rounded-lg">
              <div className="text-3xl font-bold text-[var(--joyedu-accent)] mb-1">99.9%</div>
              <div className="text-sm text-[var(--joyedu-text-secondary)]">Uptime</div>
            </div>
            <div className="text-center p-4 bg-[var(--joyedu-warning-subtle)] rounded-lg">
              <div className="text-3xl font-bold text-[var(--joyedu-warning)] mb-1">24/7</div>
              <div className="text-sm text-[var(--joyedu-text-secondary)]">Support</div>
            </div>
            <div className="text-center p-4 bg-[var(--joyedu-error-subtle)] rounded-lg">
              <div className="text-3xl font-bold text-[var(--joyedu-error)] mb-1">125M</div>
              <div className="text-sm text-[var(--joyedu-text-secondary)]">API Calls/Day</div>
            </div>
          </div>
        </CardBody>
      </Card>
        </>
      )}
    </DashboardLayout>
  );
}