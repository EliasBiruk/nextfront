'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';

export default function ExamAttempts() {
  const examAttempts = [
    {
      examId: 1,
      title: 'Python Basics Assessment',
      course: 'Python for Data Science',
      attempts: [
        {
          attemptNumber: 1,
          date: 'November 20, 2026',
          timeTaken: '45 minutes',
          score: 85,
          status: 'passed',
          grade: 'A',
          timeRemaining: '15 minutes',
          questionsAnswered: 18,
          totalQuestions: 20,
        },
      ],
      maxAttempts: 3,
      remainingAttempts: 2,
      canRetake: true,
    },
    {
      examId: 2,
      title: 'HTML/CSS Fundamentals',
      course: 'Web Development Basics',
      attempts: [
        {
          attemptNumber: 1,
          date: 'November 15, 2026',
          timeTaken: '52 minutes',
          score: 92,
          status: 'passed',
          grade: 'A+',
          timeRemaining: '8 minutes',
          questionsAnswered: 24,
          totalQuestions: 25,
        },
      ],
      maxAttempts: 2,
      remainingAttempts: 1,
      canRetake: true,
    },
    {
      examId: 3,
      title: 'React Components Quiz',
      course: 'React Development',
      attempts: [
        {
          attemptNumber: 1,
          date: 'November 10, 2026',
          timeTaken: '1 hour 15 minutes',
          score: 58,
          status: 'failed',
          grade: 'F',
          timeRemaining: '0 minutes',
          questionsAnswered: 29,
          totalQuestions: 30,
        },
        {
          attemptNumber: 2,
          date: 'November 12, 2026',
          timeTaken: '1 hour 5 minutes',
          score: 65,
          status: 'failed',
          grade: 'D',
          timeRemaining: '10 minutes',
          questionsAnswered: 30,
          totalQuestions: 30,
        },
      ],
      maxAttempts: 3,
      remainingAttempts: 1,
      canRetake: true,
    },
    {
      examId: 4,
      title: 'Data Structures Final',
      course: 'Computer Science Fundamentals',
      attempts: [
        {
          attemptNumber: 1,
          date: 'October 25, 2026',
          timeTaken: '2 hours',
          score: 78,
          status: 'passed',
          grade: 'B+',
          timeRemaining: '0 minutes',
          questionsAnswered: 39,
          totalQuestions: 40,
        },
        {
          attemptNumber: 2,
          date: 'October 28, 2026',
          timeTaken: '1 hour 50 minutes',
          score: 88,
          status: 'passed',
          grade: 'A',
          timeRemaining: '10 minutes',
          questionsAnswered: 40,
          totalQuestions: 40,
        },
      ],
      maxAttempts: 2,
      remainingAttempts: 0,
      canRetake: false,
    },
    {
      examId: 5,
      title: 'Algorithms Comprehensive',
      course: 'Computer Science Fundamentals',
      attempts: [
        {
          attemptNumber: 1,
          date: 'October 15, 2026',
          timeTaken: '2 hours 30 minutes',
          score: 72,
          status: 'passed',
          grade: 'B',
          timeRemaining: '0 minutes',
          questionsAnswered: 35,
          totalQuestions: 35,
        },
      ],
      maxAttempts: 3,
      remainingAttempts: 2,
      canRetake: true,
    },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    if (grade.startsWith('D')) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Exam Attempts</h1>
        <p className="text-gray-600">View your exam attempt history and retake options</p>
      </div>

      {/* Summary Statistics */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Attempt Summary</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{examAttempts.length}</div>
              <div className="text-sm text-blue-600">Total Exams</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {examAttempts.filter(e => e.attempts.some(a => a.status === 'passed')).length}
              </div>
              <div className="text-sm text-green-600">Passed</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">
                {examAttempts.filter(e => e.attempts.some(a => a.status === 'failed')).length}
              </div>
              <div className="text-sm text-yellow-600">Failed</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">
                {examAttempts.reduce((sum, e) => sum + e.remainingAttempts, 0)}
              </div>
              <div className="text-sm text-purple-600">Retakes Available</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Exam Attempts List */}
      <div className="space-y-6">
        {examAttempts.map((exam) => (
          <Card key={exam.examId}>
            <CardBody>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-1">{exam.title}</h3>
                  <p className="text-sm text-gray-600">{exam.course}</p>
                </div>
                <div className="text-right">
                  <Badge variant={exam.canRetake ? 'success' : 'warning'}>
                    {exam.canRetake ? `${exam.remainingAttempts} Retake(s) Available` : 'No Retakes'}
                  </Badge>
                </div>
              </div>

              {/* Attempts History */}
              <div className="space-y-3 mb-4">
                {exam.attempts.map((attempt) => (
                  <div
                    key={attempt.attemptNumber}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-gray-900">
                          Attempt {attempt.attemptNumber}
                        </div>
                        <div className="text-sm text-gray-600">{attempt.date}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={attempt.status === 'passed' ? 'success' : 'danger'}>
                          {attempt.status === 'passed' ? 'Passed' : 'Failed'}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <div className="text-gray-600">Score</div>
                        <div className="font-semibold text-lg">{attempt.score}%</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Grade</div>
                        <div className={`font-semibold text-lg ${getGradeColor(attempt.grade)}`}>
                          {attempt.grade}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Time Taken</div>
                        <div className="font-semibold">{attempt.timeTaken}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Questions</div>
                        <div className="font-semibold">
                          {attempt.questionsAnswered}/{attempt.totalQuestions}
                        </div>
                      </div>
                    </div>

                    <ProgressBar
                      progress={attempt.score}
                      color={attempt.status === 'passed' ? 'green' : 'red'}
                      showLabel
                      label="Score"
                    />
                  </div>
                ))}
              </div>

              {/* Exam Requirements */}
              <div className="p-3 bg-blue-50 rounded-lg mb-4">
                <div className="text-sm text-blue-800">
                  <span className="font-semibold">Exam Details:</span> Max {exam.maxAttempts} attempts •
                  Passing score: 70% • Duration: varies by exam
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-600">
                  {exam.attempts.length} attempt(s) completed
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  {exam.canRetake && (
                    <Button size="sm">Retake Exam</Button>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
