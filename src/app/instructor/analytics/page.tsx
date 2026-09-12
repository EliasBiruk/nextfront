'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';

export default function InstructorAnalytics() {
  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Overview</h1>
        <p className="text-gray-600">Track your course performance and student engagement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">3,080</div>
            <div className="text-sm text-gray-600">Total Enrollments</div>
            <div className="text-xs text-green-600 mt-1">+12% this month</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">78%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
            <div className="text-xs text-green-600 mt-1">+5% this month</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
            <div className="text-xs text-green-600 mt-1">+0.2 this month</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">$30,800</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
            <div className="text-xs text-green-600 mt-1">+18% this month</div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardBody>
            <CardTitle>Course Performance</CardTitle>
            <div className="space-y-4 mt-4">
              {[
                { name: 'JavaScript Fundamentals', students: 1250, completion: 78, rating: 4.9 },
                { name: 'React Development', students: 980, completion: 65, rating: 4.7 },
                { name: 'Python for Data Science', students: 850, completion: 72, rating: 4.8 },
              ].map((course) => (
                <div key={course.name} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{course.name}</h4>
                    <span className="text-sm text-gray-600">{course.students} students</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Completion</span>
                        <span className="font-medium">{course.completion}%</span>
                      </div>
                      <ProgressBar progress={course.completion} />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-medium">⭐ {course.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Student Engagement</CardTitle>
            <div className="space-y-4 mt-4">
              {[
                { metric: 'Daily Active Students', value: '892', change: '+8%' },
                { metric: 'Average Watch Time', value: '45 min', change: '+12%' },
                { metric: 'Quiz Completion Rate', value: '87%', change: '+5%' },
                { metric: 'Exercise Submission Rate', value: '76%', change: '+3%' },
              ].map((item) => (
                <div key={item.metric} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">{item.metric}</div>
                    <div className="text-lg font-bold text-gray-900">{item.value}</div>
                  </div>
                  <div className="text-green-600 text-sm font-medium">{item.change}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/instructor/analytics/courses">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">📚</div>
              <CardTitle>Course Analytics</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Detailed course performance metrics</p>
            </CardBody>
          </Card>
        </Link>
        <Link href="/instructor/analytics/students">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">👥</div>
              <CardTitle>Student Analytics</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Student learning patterns and progress</p>
            </CardBody>
          </Card>
        </Link>
        <Link href="/instructor/analytics/revenue">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">💰</div>
              <CardTitle>Revenue Analytics</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Sales and earnings breakdown</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
}