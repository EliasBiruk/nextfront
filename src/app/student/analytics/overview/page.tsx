'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { analyticsService, enrollmentsService } from '@/services';
import { useAuth } from '@/context/AuthContext';

export default function OverviewAnalytics() {
  const { currentUser } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      if (!currentUser) return;
      try {
        const [analyticsData, enrollmentsData] = await Promise.all([
          analyticsService.getStudentAnalytics(currentUser.id),
          enrollmentsService.getEnrollments({
            userId: currentUser.id,
            pagination: { page: 1, pageSize: 50 },
          }),
        ]);
        setAnalytics(analyticsData);
        setEnrollments(enrollmentsData.data);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAnalytics();
  }, [currentUser]);

  const completedCourses = enrollments.filter(e => e.progress === 100).length;
  const totalLearningTime = analytics?.totalTimeSpent || 0;
  const avgScore = analytics?.averageQuizScore || 0;

  return (
    <DashboardLayout actor="student" userName={currentUser?.firstName || 'Student'}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Learning Overview</h1>
        <p className="text-gray-600">Track your overall learning progress and performance</p>
      </div>

      {isLoading ? (
        <Card>
          <CardBody>
            <p className="text-gray-600">Loading analytics...</p>
          </CardBody>
        </Card>
      ) : (
        <>
          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardBody className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{completedCourses}</div>
                <p className="text-gray-600 text-sm">Courses Completed</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{Math.round(totalLearningTime / 60)}h</div>
                <p className="text-gray-600 text-sm">Total Learning Time</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">{avgScore}%</div>
                <p className="text-gray-600 text-sm">Average Score</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">12</div>
                <p className="text-gray-600 text-sm">Days Streak</p>
              </CardBody>
            </Card>
          </div>

          {/* Learning Trends */}
          <Card className="mb-6">
            <CardBody>
              <CardTitle>Learning Trends (Last 30 Days)</CardTitle>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Weekly Activity</span>
                  <span className="text-green-600 text-sm">↑ 15% from last month</span>
                </div>
                {/* Simple bar chart visualization */}
                <div className="flex items-end gap-2 h-32">
                  {[
                    { day: 'Mon', hours: 3 },
                    { day: 'Tue', hours: 4 },
                    { day: 'Wed', hours: 5 },
                    { day: 'Thu', hours: 3 },
                    { day: 'Fri', hours: 6 },
                    { day: 'Sat', hours: 7 },
                    { day: 'Sun', hours: 4 },
                  ].map((item) => (
                    <div key={item.day} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition"
                        style={{ height: `${(item.hours / 7) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-2">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardBody>
                <CardTitle>Performance Metrics</CardTitle>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Quiz Success Rate</span>
                      <span className="text-gray-600">{avgScore}%</span>
                    </div>
                    <ProgressBar progress={avgScore} color="green" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Exercise Completion</span>
                      <span className="text-gray-600">88%</span>
                    </div>
                    <ProgressBar progress={88} color="blue" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Course Progress</span>
                      <span className="text-gray-600">{Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length) || 0}%</span>
                    </div>
                    <ProgressBar progress={Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length) || 0} color="purple" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <CardTitle>Recent Achievements</CardTitle>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="font-semibold">Quiz Master</p>
                      <p className="text-sm text-gray-600">Scored 100% on 5 consecutive quizzes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <p className="font-semibold">Speed Learner</p>
                      <p className="text-sm text-gray-600">Completed 3 courses in one week</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-semibold">Perfect Streak</p>
                      <p className="text-sm text-gray-600">45 days of continuous learning</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Quick Access to Detailed Analytics */}
          <Card>
            <CardBody>
              <CardTitle>Detailed Analytics</CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/student/analytics/courses">
                  <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition cursor-pointer">
                    <div className="text-3xl mb-2">📚</div>
                    <h4 className="font-semibold mb-1">Course Analytics</h4>
                    <p className="text-sm text-gray-600">View detailed course progress</p>
                  </div>
                </Link>
                <Link href="/student/analytics/quizzes">
                  <div className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition cursor-pointer">
                    <div className="text-3xl mb-2">📝</div>
                    <h4 className="font-semibold mb-1">Quiz Performance</h4>
                    <p className="text-sm text-gray-600">Analyze quiz results</p>
                  </div>
                </Link>
                <Link href="/student/analytics/skills">
                  <div className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition cursor-pointer">
                    <div className="text-3xl mb-2">🎯</div>
                    <h4 className="font-semibold mb-1">Skills Progress</h4>
                    <p className="text-sm text-gray-600">Track skill development</p>
                  </div>
                </Link>
                <Link href="/student/analytics/performance">
                  <div className="p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition cursor-pointer">
                    <div className="text-3xl mb-2">📈</div>
                    <h4 className="font-semibold mb-1">Performance</h4>
                    <p className="text-sm text-gray-600">Overall performance metrics</p>
                  </div>
                </Link>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </DashboardLayout>
  );
}
