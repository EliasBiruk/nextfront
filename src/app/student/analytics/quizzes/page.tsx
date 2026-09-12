'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';

export default function QuizzesAnalytics() {
  const quizPerformance = [
    { topic: 'JavaScript Basics', avgScore: 95, total: 12, completed: 12, trend: 'up' },
    { topic: 'React Components', avgScore: 88, total: 15, completed: 14, trend: 'up' },
    { topic: 'Python Fundamentals', avgScore: 91, total: 10, completed: 9, trend: 'stable' },
    { topic: 'HTML/CSS', avgScore: 98, total: 8, completed: 8, trend: 'up' },
    { topic: 'Data Structures', avgScore: 76, total: 12, completed: 8, trend: 'down' },
    { topic: 'APIs & REST', avgScore: 82, total: 10, completed: 7, trend: 'up' },
  ];

  const recentQuizzes = [
    { name: 'React Hooks Quiz', score: 92, date: 'Today', time: '12 min', attempts: 1 },
    { name: 'JavaScript Async Quiz', score: 88, date: 'Yesterday', time: '15 min', attempts: 2 },
    { name: 'Python Lists Quiz', score: 95, date: '2 days ago', time: '10 min', attempts: 1 },
    { name: 'CSS Grid Quiz', score: 100, date: '3 days ago', time: '8 min', attempts: 1 },
    { name: 'Node.js Quiz', score: 78, date: '4 days ago', time: '18 min', attempts: 3 },
  ];

  const monthlyTrend = [
    { month: 'Jan', avg: 82 },
    { month: 'Feb', avg: 85 },
    { month: 'Mar', avg: 88 },
    { month: 'Apr', avg: 87 },
    { month: 'May', avg: 90 },
    { month: 'Jun', avg: 92 },
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quiz Performance</h1>
        <p className="text-gray-600">Analyze your quiz results and track improvement</p>
      </div>

      {/* Overall Quiz Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">92%</div>
            <p className="text-gray-600 text-sm">Average Score</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">58</div>
            <p className="text-gray-600 text-sm">Quizzes Completed</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">5</div>
            <p className="text-gray-600 text-sm">Perfect Scores</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">+10%</div>
            <p className="text-gray-600 text-sm">Improvement</p>
          </CardBody>
        </Card>
      </div>

      {/* Quiz Scores Trend */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Quiz Score Trend (Last 6 Months)</CardTitle>
          <div className="space-y-4">
            <div className="flex items-end gap-4 h-40">
              {monthlyTrend.map((month) => (
                <div key={month.month} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition"
                    style={{ height: `${(month.avg / 100) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">{month.month}</span>
                  <span className="text-sm font-semibold text-gray-700">{month.avg}%</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Overall Trend: ↑ 10% improvement</span>
              <span className="text-green-600 font-semibold">Positive</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Quiz Performance by Topic */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Quiz Performance by Topic</CardTitle>
          <div className="space-y-4">
            {quizPerformance.map((quiz) => (
              <div key={quiz.topic} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{quiz.topic}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      quiz.trend === 'up' ? 'bg-green-100 text-green-700' :
                      quiz.trend === 'down' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {quiz.trend === 'up' ? '↑ Improving' : quiz.trend === 'down' ? '↓ Declining' : '→ Stable'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">{quiz.avgScore}%</span>
                    <span className="text-sm text-gray-600 ml-2">({quiz.completed}/{quiz.total})</span>
                  </div>
                </div>
                <ProgressBar progress={quiz.avgScore} color="blue" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Recent Quiz Results */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Recent Quiz Results</CardTitle>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Quiz</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Score</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Time</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Attempts</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentQuizzes.map((quiz, index) => (
                  <tr key={quiz.name} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4 font-medium">{quiz.name}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                        quiz.score >= 90 ? 'bg-green-100 text-green-700' :
                        quiz.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {quiz.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">{quiz.time}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{quiz.attempts}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{quiz.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Completion Rate and Improvement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <CardTitle>Quiz Completion Rate</CardTitle>
            <div className="space-y-4">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">87%</div>
                <p className="text-gray-600">Overall completion rate</p>
              </div>
              <div className="space-y-3">
                {quizPerformance.map((quiz) => (
                  <div key={quiz.topic}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{quiz.topic}</span>
                      <span className="text-sm text-gray-600">{quiz.completed}/{quiz.total}</span>
                    </div>
                    <ProgressBar progress={(quiz.completed / quiz.total) * 100} color="green" />
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Improvement Tracking</CardTitle>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">JavaScript Basics</span>
                  <span className="text-green-600 font-semibold">+15%</span>
                </div>
                <p className="text-sm text-gray-600">Improved from 80% to 95%</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">React Components</span>
                  <span className="text-green-600 font-semibold">+12%</span>
                </div>
                <p className="text-sm text-gray-600">Improved from 76% to 88%</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Data Structures</span>
                  <span className="text-yellow-600 font-semibold">-5%</span>
                </div>
                <p className="text-sm text-gray-600">Needs more practice</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">HTML/CSS</span>
                  <span className="text-green-600 font-semibold">+8%</span>
                </div>
                <p className="text-sm text-gray-600">Consistently improving</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
