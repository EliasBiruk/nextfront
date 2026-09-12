'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';

export default function CompletedAssessmentsPage() {
  const completedAssessments = [
    {
      id: 1,
      title: 'Python Data Structures Quiz',
      type: 'quiz',
      subject: 'Python',
      completedDate: '2024-09-05',
      timeTaken: '28 min',
      questions: 25,
      score: 92,
      grade: 'A',
      icon: '📝',
      canRetake: true,
      nextRetakeDate: '2024-09-12'
    },
    {
      id: 2,
      title: 'CSS Grid Exercise',
      type: 'exercise',
      subject: 'CSS',
      completedDate: '2024-09-03',
      timeTaken: '42 min',
      questions: 10,
      score: 88,
      grade: 'A-',
      icon: '💻',
      canRetake: true,
      nextRetakeDate: '2024-09-10'
    },
    {
      id: 3,
      title: 'API Integration Exercise',
      type: 'exercise',
      subject: 'JavaScript',
      completedDate: '2024-09-01',
      timeTaken: '68 min',
      questions: 12,
      score: 95,
      grade: 'A+',
      icon: '💻',
      canRetake: false
    },
    {
      id: 4,
      title: 'HTML Basics Quiz',
      type: 'quiz',
      subject: 'HTML',
      completedDate: '2024-08-28',
      timeTaken: '22 min',
      questions: 20,
      score: 85,
      grade: 'B+',
      icon: '📝',
      canRetake: true,
      nextRetakeDate: '2024-09-04'
    },
    {
      id: 5,
      title: 'JavaScript Loops Exercise',
      type: 'exercise',
      subject: 'JavaScript',
      completedDate: '2024-08-25',
      timeTaken: '35 min',
      questions: 8,
      score: 78,
      grade: 'B',
      icon: '💻',
      canRetake: true,
      nextRetakeDate: '2024-09-01'
    },
    {
      id: 6,
      title: 'React Components Quiz',
      type: 'quiz',
      subject: 'React',
      completedDate: '2024-08-20',
      timeTaken: '38 min',
      questions: 22,
      score: 90,
      grade: 'A-',
      icon: '📝',
      canRetake: false
    }
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50 border-green-200';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'green';
    if (score >= 80) return 'blue';
    if (score >= 70) return 'yellow';
    return 'red';
  };

  const stats = {
    total: completedAssessments.length,
    averageScore: Math.round(
      completedAssessments.reduce((sum, a) => sum + a.score, 0) / completedAssessments.length
    ),
    averageTime: '38 min',
    gradeDistribution: {
      A: completedAssessments.filter(a => a.grade.startsWith('A')).length,
      B: completedAssessments.filter(a => a.grade.startsWith('B')).length,
      C: completedAssessments.filter(a => a.grade.startsWith('C')).length
    }
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Completed Assessments</h1>
        <p className="text-gray-600">Review your past assessments, scores, and performance.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{stats.total}</div>
                <div className="text-green-100 text-sm">Completed</div>
              </div>
              <div className="text-4xl opacity-80">✅</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{stats.averageScore}%</div>
                <div className="text-blue-100 text-sm">Average Score</div>
              </div>
              <div className="text-4xl opacity-80">🎯</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{stats.averageTime}</div>
                <div className="text-purple-100 text-sm">Avg. Time</div>
              </div>
              <div className="text-4xl opacity-80">⏱️</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{stats.gradeDistribution.A}</div>
                <div className="text-orange-100 text-sm">A Grades</div>
              </div>
              <div className="text-4xl opacity-80">🏆</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Grade Distribution */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Grade Distribution</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">A Grades</span>
                <span className="text-sm text-gray-600">{stats.gradeDistribution.A} assessments</span>
              </div>
              <ProgressBar 
                progress={(stats.gradeDistribution.A / stats.total) * 100} 
                color="green" 
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">B Grades</span>
                <span className="text-sm text-gray-600">{stats.gradeDistribution.B} assessments</span>
              </div>
              <ProgressBar 
                progress={(stats.gradeDistribution.B / stats.total) * 100} 
                color="blue" 
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">C Grades</span>
                <span className="text-sm text-gray-600">{stats.gradeDistribution.C} assessments</span>
              </div>
              <ProgressBar 
                progress={(stats.gradeDistribution.C / stats.total) * 100} 
                color="yellow" 
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Completed Assessments List */}
      <Card>
        <CardBody>
          <CardTitle>Assessment History</CardTitle>
          <div className="space-y-4">
            {completedAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
              >
                <div className="text-3xl group-hover:scale-110 transition">{assessment.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{assessment.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getGradeColor(assessment.grade)}`}>
                      {assessment.grade}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{assessment.subject}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>📅 {assessment.completedDate}</span>
                    <span>⏱️ {assessment.timeTaken}</span>
                    <span>📝 {assessment.questions} questions</span>
                  </div>
                </div>
                <div className="text-right min-w-[140px]">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{assessment.score}%</div>
                  <ProgressBar progress={assessment.score} color={getScoreColor(assessment.score)} />
                  <div className="flex gap-2 mt-3">
                    <Link
                      href="/student/assessments/results"
                      className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                    >
                      Review
                    </Link>
                    {assessment.canRetake && (
                      <button className="inline-block px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50 transition">
                        Retake
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Performance Insights */}
      <Card className="mt-8">
        <CardBody>
          <CardTitle>Performance Insights</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎯</span>
                <span className="font-semibold text-green-900">Strongest Subject</span>
              </div>
              <div className="text-lg font-medium text-green-800">JavaScript</div>
              <div className="text-sm text-green-600">Average: 91.5% across 3 assessments</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📈</span>
                <span className="font-semibold text-blue-900">Most Improved</span>
              </div>
              <div className="text-lg font-medium text-blue-800">Python</div>
              <div className="text-sm text-blue-600">+15% improvement from last assessment</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⚡</span>
                <span className="font-semibold text-orange-900">Fastest Completion</span>
              </div>
              <div className="text-lg font-medium text-orange-800">HTML Basics Quiz</div>
              <div className="text-sm text-orange-600">Completed in 22 minutes (85% score)</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔥</span>
                <span className="font-semibold text-purple-900">Current Streak</span>
              </div>
              <div className="text-lg font-medium text-purple-800">5 Assessments</div>
              <div className="text-sm text-purple-600">All completed above 85%</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
