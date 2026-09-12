'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';

export default function ExercisesAnalytics() {
  const exerciseStats = [
    { difficulty: 'Easy', completed: 45, total: 48, avgTime: '5 min', successRate: 95 },
    { difficulty: 'Medium', completed: 32, total: 40, avgTime: '12 min', successRate: 82 },
    { difficulty: 'Hard', completed: 15, total: 25, avgTime: '25 min', successRate: 68 },
  ];

  const skillProgress = [
    { skill: 'Problem Solving', progress: 85, exercises: 30 },
    { skill: 'Algorithm Design', progress: 72, exercises: 25 },
    { skill: 'Code Optimization', progress: 68, exercises: 20 },
    { skill: 'Debugging', progress: 78, exercises: 28 },
    { skill: 'Pattern Recognition', progress: 90, exercises: 35 },
  ];

  const recentExercises = [
    { name: 'Array Reverse', difficulty: 'Easy', score: 100, attempts: 1, time: '4 min' },
    { name: 'Binary Search', difficulty: 'Medium', score: 90, attempts: 2, time: '15 min' },
    { name: 'Merge Sort', difficulty: 'Hard', score: 75, attempts: 3, time: '28 min' },
    { name: 'String Palindrome', difficulty: 'Easy', score: 100, attempts: 1, time: '6 min' },
    { name: 'Tree Traversal', difficulty: 'Hard', score: 80, attempts: 2, time: '22 min' },
  ];

  const streakData = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: true },
    { day: 'Sun', completed: false },
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Exercise Performance</h1>
        <p className="text-gray-600">Track your exercise completion and skill development</p>
      </div>

      {/* Overall Exercise Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">92</div>
            <p className="text-gray-600 text-sm">Exercises Completed</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">82%</div>
            <p className="text-gray-600 text-sm">Success Rate</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">1.5</div>
            <p className="text-gray-600 text-sm">Avg. Attempts</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">7</div>
            <p className="text-gray-600 text-sm">Day Streak</p>
          </CardBody>
        </Card>
      </div>

      {/* Completion Rate by Difficulty */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Completion Rate by Difficulty</CardTitle>
          <div className="space-y-4">
            {exerciseStats.map((stat) => (
              <div key={stat.difficulty} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{stat.difficulty}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      stat.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      stat.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {stat.completed}/{stat.total}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">{stat.successRate}%</span>
                    <span className="text-sm text-gray-600 ml-2">success</span>
                  </div>
                </div>
                <ProgressBar progress={(stat.completed / stat.total) * 100} color="blue" />
                <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                  <span>Avg. time: {stat.avgTime}</span>
                  <span>{Math.round((stat.completed / stat.total) * 100)}% complete</span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Skill Development Progress */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Skill Development Progress</CardTitle>
          <div className="space-y-4">
            {skillProgress.map((skill) => (
              <div key={skill.skill}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{skill.skill}</span>
                  <span className="text-gray-600">{skill.exercises} exercises</span>
                </div>
                <ProgressBar progress={skill.progress} color="purple" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Recent Exercises */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Recent Exercises</CardTitle>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Exercise</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Difficulty</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Score</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Attempts</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentExercises.map((exercise, index) => (
                  <tr key={exercise.name} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4 font-medium">{exercise.name}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        exercise.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        exercise.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {exercise.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                        exercise.score >= 90 ? 'bg-green-100 text-green-700' :
                        exercise.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {exercise.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">{exercise.attempts}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{exercise.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Streaks and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <CardTitle>Exercise Streak</CardTitle>
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Current Streak</span>
                <span className="text-2xl font-bold text-orange-600">7 days</span>
              </div>
              <div className="flex gap-2">
                {streakData.map((day) => (
                  <div
                    key={day.day}
                    className={`flex-1 p-3 rounded-lg text-center ${
                      day.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <div className="text-xs font-medium">{day.day}</div>
                    <div className="text-lg mt-1">
                      {day.completed ? '✓' : '○'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-gray-600">
                Best streak: 14 days
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Exercise Achievements</CardTitle>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-semibold">Sharpshooter</p>
                  <p className="text-sm text-gray-600">100% score on 10 easy exercises</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">💪</span>
                <div>
                  <p className="font-semibold">Problem Solver</p>
                  <p className="text-sm text-gray-600">Completed 50 medium exercises</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="font-semibold">On Fire</p>
                  <p className="text-sm text-gray-600">7-day exercise streak</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-semibold">Speed Demon</p>
                  <p className="text-sm text-gray-600">Solved 5 exercises under 5 min</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
