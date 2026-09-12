'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';

export default function TimeAnalytics() {
  const activityBreakdown = [
    { name: 'Lessons', hours: 72, percentage: 46, color: 'blue' },
    { name: 'Quizzes', hours: 28, percentage: 18, color: 'green' },
    { name: 'Exercises', hours: 36, percentage: 23, color: 'purple' },
    { name: 'Projects', hours: 20, percentage: 13, color: 'orange' },
  ];

  const weeklyData = [
    { week: 'Week 1', hours: 28 },
    { week: 'Week 2', hours: 32 },
    { week: 'Week 3', hours: 35 },
    { week: 'Week 4', hours: 38 },
  ];

  const dailyPattern = [
    { day: 'Monday', hours: 4.5, peak: '9 AM - 11 AM' },
    { day: 'Tuesday', hours: 5.2, peak: '10 AM - 12 PM' },
    { day: 'Wednesday', hours: 4.8, peak: '2 PM - 4 PM' },
    { day: 'Thursday', hours: 5.5, peak: '9 AM - 11 AM' },
    { day: 'Friday', hours: 6.0, peak: '10 AM - 12 PM' },
    { day: 'Saturday', hours: 7.2, peak: '10 AM - 2 PM' },
    { day: 'Sunday', hours: 4.0, peak: '3 PM - 5 PM' },
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Time Analysis</h1>
        <p className="text-gray-600">Track how you spend your learning time</p>
      </div>

      {/* Overall Time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">156h</div>
            <p className="text-gray-600 text-sm">Total Time This Month</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">5.2h</div>
            <p className="text-gray-600 text-sm">Daily Average</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">38h</div>
            <p className="text-gray-600 text-sm">This Week</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">92%</div>
            <p className="text-gray-600 text-sm">Goal Achievement</p>
          </CardBody>
        </Card>
      </div>

      {/* Time Breakdown by Activity */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Time Breakdown by Activity</CardTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {activityBreakdown.map((activity) => (
                <div key={activity.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{activity.name}</span>
                    <span className="text-gray-600">{activity.hours}h ({activity.percentage}%)</span>
                  </div>
                  <ProgressBar progress={activity.percentage} color={activity.color as any} />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              {/* Simple pie chart visualization */}
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full" style={{
                  background: `conic-gradient(
                    #2563eb 0% 46%,
                    #16a34a 46% 64%,
                    #9333ea 64% 87%,
                    #ea580c 87% 100%
                  )`
                }}></div>
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">156h</div>
                    <div className="text-xs text-gray-600">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Weekly Trends */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Weekly Time Trends (Last 4 Weeks)</CardTitle>
          <div className="space-y-4">
            <div className="flex items-end gap-4 h-40">
              {weeklyData.map((week) => (
                <div key={week.week} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition"
                    style={{ height: `${(week.hours / 40) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">{week.week}</span>
                  <span className="text-sm font-semibold text-gray-700">{week.hours}h</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Trend: ↑ 35% from first week</span>
              <span className="text-green-600 font-semibold">Improving</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Daily Productivity Patterns */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Daily Productivity Patterns</CardTitle>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Day</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Hours</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Peak Time</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Sessions</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Productivity</th>
                </tr>
              </thead>
              <tbody>
                {dailyPattern.map((day, index) => (
                  <tr key={day.day} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4 font-medium">{day.day}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{day.hours}h</td>
                    <td className="py-3 px-4 text-center text-gray-600">{day.peak}</td>
                    <td className="py-3 px-4 text-center text-gray-600">
                      {Math.floor(day.hours / 1.5)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        day.hours >= 6 ? 'bg-green-100 text-green-700' :
                        day.hours >= 4 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {day.hours >= 6 ? 'High' : day.hours >= 4 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Time Goals and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <CardTitle>Time Goals</CardTitle>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Daily Goal (5h)</span>
                  <span className="text-gray-600">5.2h avg</span>
                </div>
                <ProgressBar progress={104} color="green" showLabel label="Daily" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Weekly Goal (35h)</span>
                  <span className="text-gray-600">38h this week</span>
                </div>
                <ProgressBar progress={109} color="blue" showLabel label="Weekly" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Monthly Goal (150h)</span>
                  <span className="text-gray-600">156h this month</span>
                </div>
                <ProgressBar progress={104} color="purple" showLabel label="Monthly" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Time Achievements</CardTitle>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="font-semibold">Time Champion</p>
                  <p className="text-sm text-gray-600">Exceeded weekly goal for 4 weeks</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">🌅</span>
                <div>
                  <p className="font-semibold">Early Bird</p>
                  <p className="text-sm text-gray-600">Consistent morning learning sessions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">📈</span>
                <div>
                  <p className="font-semibold">Steady Progress</p>
                  <p className="text-sm text-gray-600">Increased learning time by 35%</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-semibold">Goal Crusher</p>
                  <p className="text-sm text-gray-600">Met all time goals this month</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
