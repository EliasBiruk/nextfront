'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function InProgressAssessmentsPage() {
  const [timeRemaining, setTimeRemaining] = useState<{ [key: number]: number }>({});

  const inProgressAssessments = [
    {
      id: 1,
      title: 'React State Management Exercise',
      type: 'exercise',
      subject: 'React',
      startedAt: new Date('2024-09-06T09:30:00'),
      timeLimit: 60, // minutes
      totalQuestions: 15,
      answeredQuestions: 9,
      icon: '💻',
      currentQuestion: 10,
      lastQuestion: 'How do you use the useEffect hook with dependencies?'
    },
    {
      id: 2,
      title: 'TypeScript Quiz',
      type: 'quiz',
      subject: 'TypeScript',
      startedAt: new Date('2024-09-06T10:15:00'),
      timeLimit: 40, // minutes
      totalQuestions: 18,
      answeredQuestions: 6,
      icon: '📝',
      currentQuestion: 7,
      lastQuestion: 'What is the difference between interface and type?'
    },
    {
      id: 3,
      title: 'CSS Layout Challenge',
      type: 'exercise',
      subject: 'CSS',
      startedAt: new Date('2024-09-06T11:00:00'),
      timeLimit: 45, // minutes
      totalQuestions: 10,
      answeredQuestions: 3,
      icon: '💻',
      currentQuestion: 4,
      lastQuestion: 'Create a responsive grid layout using CSS Grid'
    }
  ];

  useEffect(() => {
    const updateTimeRemaining = () => {
      const newTimeRemaining: { [key: number]: number } = {};
      const now = new Date().getTime();

      inProgressAssessments.forEach(assessment => {
        const started = assessment.startedAt.getTime();
        const elapsed = (now - started) / (1000 * 60); // in minutes
        const remaining = Math.max(0, assessment.timeLimit - elapsed);
        newTimeRemaining[assessment.id] = remaining;
      });

      setTimeRemaining(newTimeRemaining);
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [inProgressAssessments]);

  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = (minutes: number) => {
    if (minutes <= 5) return 'text-red-600 bg-red-50 border-red-200';
    if (minutes <= 15) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getProgress = (answered: number, total: number) => {
    return Math.round((answered / total) * 100);
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">In Progress</h1>
        <p className="text-gray-600">Continue your active assessments before time runs out.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{inProgressAssessments.length}</div>
                <div className="text-orange-100 text-sm">Active Assessments</div>
              </div>
              <div className="text-4xl opacity-80">⏳</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {inProgressAssessments.reduce((sum, a) => sum + a.answeredQuestions, 0)}
                </div>
                <div className="text-blue-100 text-sm">Questions Answered</div>
              </div>
              <div className="text-4xl opacity-80">📝</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {Math.round(
                    inProgressAssessments.reduce((sum, a) => sum + getProgress(a.answeredQuestions, a.totalQuestions), 0) / 
                    inProgressAssessments.length
                  )}%
                </div>
                <div className="text-purple-100 text-sm">Average Progress</div>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* In Progress Assessments */}
      <div className="space-y-6">
        {inProgressAssessments.map((assessment) => {
          const remaining = timeRemaining[assessment.id] || 0;
          const progress = getProgress(assessment.answeredQuestions, assessment.totalQuestions);
          const timeColor = getTimeColor(remaining);

          return (
            <Card key={assessment.id} className="border-l-4 border-l-orange-500">
              <CardBody>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{assessment.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{assessment.title}</h3>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 text-orange-700">
                        {assessment.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{assessment.subject}</p>

                    {/* Time Remaining */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${timeColor} mb-4`}>
                      <span className="text-lg">⏰</span>
                      <span className="font-mono font-bold text-xl">{formatTime(remaining)}</span>
                      <span className="text-sm">remaining</span>
                    </div>

                    {/* Progress Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Questions Progress</span>
                          <span className="text-sm text-gray-600">
                            {assessment.answeredQuestions}/{assessment.totalQuestions}
                          </span>
                        </div>
                        <ProgressBar progress={progress} color="orange" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Current Question</span>
                          <span className="text-sm text-gray-600">
                            {assessment.currentQuestion}/{assessment.totalQuestions}
                          </span>
                        </div>
                        <ProgressBar progress={Math.round((assessment.currentQuestion / assessment.totalQuestions) * 100)} color="blue" />
                      </div>
                    </div>

                    {/* Last Question */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="text-sm text-gray-500 mb-1">Last Question:</div>
                      <div className="text-gray-900 font-medium">{assessment.lastQuestion}</div>
                    </div>

                    {/* Question Navigation */}
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Question Navigator</div>
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: assessment.totalQuestions }, (_, i) => i + 1).map((qNum) => {
                          const isAnswered = qNum <= assessment.answeredQuestions;
                          const isCurrent = qNum === assessment.currentQuestion;
                          return (
                            <button
                              key={qNum}
                              className={`w-8 h-8 rounded-lg font-medium text-sm transition ${
                                isCurrent
                                  ? 'bg-blue-600 text-white'
                                  : isAnswered
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {qNum}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link
                        href={`/student/learning`}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                      >
                        Continue Assessment
                      </Link>
                      <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
                        Save & Exit
                      </button>
                      <button className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-medium">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Tips Section */}
      <Card className="mt-8">
        <CardBody>
          <CardTitle>Tips for Completing Assessments</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl">⏱️</div>
              <div>
                <div className="font-medium text-blue-900">Manage Your Time</div>
                <div className="text-sm text-blue-700">Keep an eye on the timer and pace yourself accordingly.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <div className="text-2xl">📖</div>
              <div>
                <div className="font-medium text-green-900">Read Carefully</div>
                <div className="text-sm text-green-700">Take time to understand each question before answering.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl">💾</div>
              <div>
                <div className="font-medium text-purple-900">Save Progress</div>
                <div className="text-sm text-purple-700">Use Save & Exit if you need to take a break.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl">✅</div>
              <div>
                <div className="font-medium text-orange-900">Review Before Submit</div>
                <div className="text-sm text-orange-700">Double-check your answers before final submission.</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
