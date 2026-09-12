'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';

export default function CoursesAnalytics() {
  const courses = [
    {
      name: 'JavaScript Fundamentals',
      progress: 95,
      timeSpent: 24,
      quizAvg: 92,
      examScore: 88,
      engagement: 94,
      lessons: 20,
      completed: 19,
    },
    {
      name: 'React Development',
      progress: 78,
      timeSpent: 32,
      quizAvg: 85,
      examScore: 82,
      engagement: 89,
      lessons: 25,
      completed: 19,
    },
    {
      name: 'Python for Data Science',
      progress: 62,
      timeSpent: 18,
      quizAvg: 88,
      examScore: null,
      engagement: 76,
      lessons: 30,
      completed: 18,
    },
    {
      name: 'Web Development Basics',
      progress: 100,
      timeSpent: 28,
      quizAvg: 95,
      examScore: 92,
      engagement: 98,
      lessons: 15,
      completed: 15,
    },
    {
      name: 'Node.js Backend',
      progress: 45,
      timeSpent: 12,
      quizAvg: 80,
      examScore: null,
      engagement: 68,
      lessons: 20,
      completed: 9,
    },
    {
      name: 'Database Design',
      progress: 30,
      timeSpent: 8,
      quizAvg: 75,
      examScore: null,
      engagement: 55,
      lessons: 18,
      completed: 5,
    },
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Analytics</h1>
        <p className="text-gray-600">Track your progress across all enrolled courses</p>
      </div>

      {/* Overall Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">6</div>
            <p className="text-gray-600 text-sm">Active Courses</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">68%</div>
            <p className="text-gray-600 text-sm">Avg. Completion</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">122h</div>
            <p className="text-gray-600 text-sm">Total Time Spent</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">86%</div>
            <p className="text-gray-600 text-sm">Avg. Quiz Score</p>
          </CardBody>
        </Card>
      </div>

      {/* Course Progress Details */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Course Progress & Completion</CardTitle>
          <div className="space-y-6">
            {courses.map((course) => (
              <div key={course.name} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{course.name}</h4>
                    <p className="text-sm text-gray-600">
                      {course.completed} of {course.lessons} lessons completed
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{course.progress}%</div>
                    <p className="text-sm text-gray-600">{course.timeSpent}h spent</p>
                  </div>
                </div>
                <ProgressBar progress={course.progress} color="blue" showLabel label="Progress" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Course Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardBody>
            <CardTitle>Quiz Performance by Course</CardTitle>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{course.name}</span>
                    <span className="text-gray-600 text-sm">{course.quizAvg}% avg</span>
                  </div>
                  <ProgressBar progress={course.quizAvg} color="green" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Exam Scores</CardTitle>
            <div className="space-y-4">
              {courses
                .filter((c) => c.examScore !== null)
                .map((course) => (
                  <div key={course.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{course.name}</span>
                      <span className="text-gray-600 text-sm">{course.examScore}%</span>
                    </div>
                    <ProgressBar progress={course.examScore!} color="purple" />
                  </div>
                ))}
              {courses.filter((c) => c.examScore === null).length > 0 && (
                <p className="text-sm text-gray-500 italic mt-4">
                  {courses.filter((c) => c.examScore === null).length} courses not yet completed
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Engagement Metrics */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Course Engagement Metrics</CardTitle>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Course</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Engagement</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Time/Day</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Sessions</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course.name} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4 font-medium">{course.name}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.engagement >= 90 ? 'bg-green-100 text-green-700' :
                        course.engagement >= 70 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {course.engagement}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">
                      {(course.timeSpent / 30).toFixed(1)}h
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">
                      {Math.floor(course.timeSpent / 2)}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">
                      {index === 0 ? 'Today' : index === 1 ? 'Yesterday' : `${index + 1} days ago`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Time Spent Breakdown */}
      <Card>
        <CardBody>
          <CardTitle>Time Spent per Course</CardTitle>
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{course.name}</span>
                  <span className="text-gray-600">{course.timeSpent} hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                    style={{ width: `${(course.timeSpent / 32) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
