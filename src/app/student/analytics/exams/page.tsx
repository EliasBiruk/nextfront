'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';

export default function ExamsAnalytics() {
  const examResults = [
    { name: 'JavaScript Fundamentals', score: 88, classAvg: 75, date: 'Jan 15, 2024', rank: 'Top 15%' },
    { name: 'React Development', score: 82, classAvg: 70, date: 'Feb 20, 2024', rank: 'Top 20%' },
    { name: 'Python Basics', score: 91, classAvg: 78, date: 'Mar 10, 2024', rank: 'Top 10%' },
    { name: 'Web Development', score: 92, classAvg: 80, date: 'Apr 5, 2024', rank: 'Top 12%' },
  ];

  const examTrend = [
    { exam: 'JS Fundamentals', score: 88, avg: 75 },
    { exam: 'React Dev', score: 82, avg: 70 },
    { exam: 'Python Basics', score: 91, avg: 78 },
    { exam: 'Web Dev', score: 92, avg: 80 },
  ];

  const preparationMetrics = [
    { exam: 'JavaScript Fundamentals', studyTime: 12, practiceQuizzes: 8, exercises: 15 },
    { exam: 'React Development', studyTime: 15, practiceQuizzes: 10, exercises: 20 },
    { exam: 'Python Basics', studyTime: 10, practiceQuizzes: 6, exercises: 12 },
    { exam: 'Web Development', studyTime: 14, practiceQuizzes: 9, exercises: 18 },
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Exam Performance</h1>
        <p className="text-gray-600">Analyze your exam results and compare with class performance</p>
      </div>

      {/* Overall Exam Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">88%</div>
            <p className="text-gray-600 text-sm">Average Score</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">76%</div>
            <p className="text-gray-600 text-sm">Class Average</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">+12%</div>
            <p className="text-gray-600 text-sm">Above Average</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">4</div>
            <p className="text-gray-600 text-sm">Exams Completed</p>
          </CardBody>
        </Card>
      </div>

      {/* Exam Results with Class Comparison */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Exam Results & Class Comparison</CardTitle>
          <div className="space-y-6">
            {examResults.map((exam) => (
              <div key={exam.name} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{exam.name}</h4>
                    <p className="text-sm text-gray-600">{exam.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{exam.score}%</div>
                    <p className="text-sm text-gray-600">{exam.rank}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Your Score</span>
                      <span className="text-sm text-gray-600">{exam.score}%</span>
                    </div>
                    <ProgressBar progress={exam.score} color="blue" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Class Average</span>
                      <span className="text-sm text-gray-600">{exam.classAvg}%</span>
                    </div>
                    <ProgressBar progress={exam.classAvg} color="gray" />
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-green-600 font-semibold">
                    +{exam.score - exam.classAvg}% above class average
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Exam Performance Trend */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Exam Performance Trend</CardTitle>
          <div className="space-y-4">
            <div className="flex items-end gap-4 h-40">
              {examTrend.map((exam, index) => (
                <div key={exam.exam} className="flex-1 flex flex-col items-center">
                  <div className="flex gap-1 w-full justify-center">
                    <div 
                      className="w-6 bg-blue-500 rounded-t hover:bg-blue-600 transition"
                      style={{ height: `${exam.score}%` }}
                      title={`Your score: ${exam.score}%`}
                    ></div>
                    <div 
                      className="w-6 bg-gray-300 rounded-t hover:bg-gray-400 transition"
                      style={{ height: `${exam.avg}%` }}
                      title={`Class avg: ${exam.avg}%`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2 text-center">
                    Exam {index + 1}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-600">Your Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span className="text-gray-600">Class Average</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Exam Preparation Effectiveness */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Exam Preparation Effectiveness</CardTitle>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Exam</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Study Time</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Practice Quizzes</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Exercises</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Score</th>
                </tr>
              </thead>
              <tbody>
                {preparationMetrics.map((prep, index) => (
                  <tr key={examResults[index].name} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4 font-medium">{examResults[index].name}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{prep.studyTime}h</td>
                    <td className="py-3 px-4 text-center text-gray-600">{prep.practiceQuizzes}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{prep.exercises}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                        examResults[index].score >= 90 ? 'bg-green-100 text-green-700' :
                        examResults[index].score >= 80 ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {examResults[index].score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <CardTitle>Performance Insights</CardTitle>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📈</span>
                  <span className="font-semibold text-green-700">Strong Performance</span>
                </div>
                <p className="text-sm text-gray-600">
                  You consistently score above class average by 12% on average
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎯</span>
                  <span className="font-semibold text-blue-700">Preparation Correlation</span>
                </div>
                <p className="text-sm text-gray-600">
                  Higher study time correlates with better exam scores
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⏰</span>
                  <span className="font-semibold text-purple-700">Optimal Study Time</span>
                </div>
                <p className="text-sm text-gray-600">
                  12-15 hours of study time yields best results
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Recommendations</CardTitle>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-xl">💡</span>
                <div>
                  <p className="font-semibold mb-1">Increase Practice Quizzes</p>
                  <p className="text-sm text-gray-600">
                    Aim for 10+ practice quizzes before each exam
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <span className="text-xl">✅</span>
                <div>
                  <p className="font-semibold mb-1">Maintain Study Schedule</p>
                  <p className="text-sm text-gray-600">
                    Your current 12-15 hour study pattern is effective
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-xl">📚</span>
                <div>
                  <p className="font-semibold mb-1">Focus on Weak Areas</p>
                  <p className="text-sm text-gray-600">
                    Review topics where you scored below 85%
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <span className="text-xl">🎓</span>
                <div>
                  <p className="font-semibold mb-1">Class Comparison</p>
                  <p className="text-sm text-gray-600">
                    You're in the top 15% - keep up the great work!
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
