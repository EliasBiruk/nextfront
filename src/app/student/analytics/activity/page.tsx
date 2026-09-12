'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';

export default function ActivityAnalytics() {
  const activityTimeline = [
    { date: 'Today', time: '10:30 AM', activity: 'Completed Quiz', details: 'React Hooks - Score: 92%', type: 'quiz' },
    { date: 'Today', time: '9:15 AM', activity: 'Started Lesson', details: 'JavaScript Async/Await', type: 'lesson' },
    { date: 'Yesterday', time: '3:45 PM', activity: 'Completed Exercise', details: 'Array Manipulation - 100%', type: 'exercise' },
    { date: 'Yesterday', time: '11:20 AM', activity: 'Submitted Assignment', details: 'React Project Milestone 2', type: 'assignment' },
    { date: '2 days ago', time: '2:00 PM', activity: 'Completed Course', details: 'HTML/CSS Fundamentals', type: 'course' },
    { date: '3 days ago', time: '4:30 PM', activity: 'Achievement Unlocked', details: 'Quiz Master Badge', type: 'achievement' },
    { date: '4 days ago', time: '10:00 AM', activity: 'Started Course', details: 'Node.js Backend Development', type: 'course' },
    { date: '5 days ago', time: '1:15 PM', activity: 'Completed Exam', details: 'Python Basics - 91%', type: 'exam' },
  ];

  const engagementMetrics = [
    { metric: 'Login Frequency', value: 'Daily', trend: 'Consistent', score: 95 },
    { metric: 'Session Duration', value: '2.5h avg', trend: 'Increasing', score: 82 },
    { metric: 'Activity Score', value: 'High', trend: 'Stable', score: 88 },
    { metric: 'Consistency', value: '45 days', trend: 'Excellent', score: 92 },
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 4.5, sessions: 3, activities: 12 },
    { day: 'Tue', hours: 5.2, sessions: 4, activities: 15 },
    { day: 'Wed', hours: 4.8, sessions: 3, activities: 14 },
    { day: 'Thu', hours: 5.5, sessions: 4, activities: 16 },
    { day: 'Fri', hours: 6.0, sessions: 5, activities: 18 },
    { day: 'Sat', hours: 7.2, sessions: 6, activities: 22 },
    { day: 'Sun', hours: 4.0, sessions: 2, activities: 10 },
  ];

  const activityTypes = [
    { type: 'Lessons', count: 45, percentage: 35, color: 'blue' },
    { type: 'Quizzes', count: 58, percentage: 45, color: 'green' },
    { type: 'Exercises', count: 92, percentage: 72, color: 'purple' },
    { type: 'Exams', count: 4, percentage: 8, color: 'orange' },
    { type: 'Projects', count: 8, percentage: 15, color: 'red' },
  ];

  const activityIcons: Record<string, string> = {
    quiz: '📝',
    lesson: '📚',
    exercise: '💻',
    assignment: '📋',
    course: '🎓',
    achievement: '🏆',
    exam: '🎯',
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Activity History</h1>
        <p className="text-gray-600">View your learning timeline and engagement metrics</p>
      </div>

      {/* Overall Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Day Streak</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">207</div>
            <p className="text-gray-600 text-sm">Total Activities</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">2.5h</div>
            <p className="text-gray-600 text-sm">Avg. Session</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">95%</div>
            <p className="text-gray-600 text-sm">Consistency</p>
          </CardBody>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Activity Timeline</CardTitle>
          <div className="space-y-4">
            {activityTimeline.map((item, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                    {activityIcons[item.type]}
                  </div>
                  {index < activityTimeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{item.activity}</span>
                    <span className="text-sm text-gray-500">{item.date} at {item.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Engagement Metrics */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Engagement Metrics</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {engagementMetrics.map((metric) => (
              <div key={metric.metric} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">{metric.metric}</h4>
                <div className="text-2xl font-bold text-blue-600 mb-1">{metric.value}</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{metric.trend}</span>
                  <span className="text-green-600 font-semibold">{metric.score}%</span>
                </div>
                <ProgressBar progress={metric.score} color="green" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Weekly Activity Pattern */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Weekly Activity Pattern</CardTitle>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Day</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Hours</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Sessions</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Activities</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Intensity</th>
                </tr>
              </thead>
              <tbody>
                {weeklyActivity.map((day, index) => (
                  <tr key={day.day} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4 font-medium">{day.day}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{day.hours}h</td>
                    <td className="py-3 px-4 text-center text-gray-600">{day.sessions}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{day.activities}</td>
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

      {/* Activity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardBody>
            <CardTitle>Activity by Type</CardTitle>
            <div className="space-y-4">
              {activityTypes.map((type) => (
                <div key={type.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{type.type}</span>
                    <span className="text-gray-600">{type.count} activities</span>
                  </div>
                  <ProgressBar progress={type.percentage} color={type.color as any} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Activity Patterns & Insights</CardTitle>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📈</span>
                  <span className="font-semibold text-green-700">Peak Productivity</span>
                </div>
                <p className="text-sm text-gray-600">
                  Most active on Saturdays (7.2h, 22 activities)
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⏰</span>
                  <span className="font-semibold text-blue-700">Optimal Time</span>
                </div>
                <p className="text-sm text-gray-600">
                  Morning sessions (9 AM - 12 PM) show highest engagement
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎯</span>
                  <span className="font-semibold text-purple-700">Consistency</span>
                </div>
                <p className="text-sm text-gray-600">
                  45-day streak - excellent learning consistency
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💡</span>
                  <span className="font-semibold text-orange-700">Recommendation</span>
                </div>
                <p className="text-sm text-gray-600">
                  Consider adding more Sunday activities for balanced schedule
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Streaks and Consistency */}
      <Card>
        <CardBody>
          <CardTitle>Streaks & Consistency</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">45</div>
              <p className="text-gray-700 font-semibold">Current Streak</p>
              <p className="text-sm text-gray-600 mt-1">Days of continuous learning</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">14</div>
              <p className="text-gray-700 font-semibold">Best Streak</p>
              <p className="text-sm text-gray-600 mt-1">Longest streak achieved</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <p className="text-gray-700 font-semibold">Consistency Score</p>
              <p className="text-sm text-gray-600 mt-1">Based on activity patterns</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
