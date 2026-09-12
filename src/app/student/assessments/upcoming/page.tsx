'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function UpcomingAssessmentsPage() {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({});

  const upcomingAssessments = [
    {
      id: 1,
      title: 'JavaScript Fundamentals Quiz',
      type: 'quiz',
      subject: 'JavaScript',
      deadline: new Date('2024-09-08T10:00:00'),
      time: '45 min',
      questions: 20,
      icon: '📝',
      preparation: [
        { title: 'Variables & Data Types', link: '#', completed: true },
        { title: 'Functions & Scope', link: '#', completed: true },
        { title: 'Arrays & Objects', link: '#', completed: false },
        { title: 'DOM Manipulation', link: '#', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Web Development Final Exam',
      type: 'exam',
      subject: 'Web Development',
      deadline: new Date('2024-09-15T14:00:00'),
      time: '120 min',
      questions: 50,
      icon: '📋',
      preparation: [
        { title: 'HTML5 Semantics', link: '#', completed: true },
        { title: 'CSS Flexbox & Grid', link: '#', completed: true },
        { title: 'JavaScript ES6+', link: '#', completed: true },
        { title: 'React Basics', link: '#', completed: false },
        { title: 'API Integration', link: '#', completed: false }
      ]
    },
    {
      id: 3,
      title: 'TypeScript Quiz',
      type: 'quiz',
      subject: 'TypeScript',
      deadline: new Date('2024-09-12T09:00:00'),
      time: '40 min',
      questions: 18,
      icon: '📝',
      preparation: [
        { title: 'Type Basics', link: '#', completed: true },
        { title: 'Interfaces & Types', link: '#', completed: false },
        { title: 'Generics', link: '#', completed: false }
      ]
    },
    {
      id: 4,
      title: 'Database Design Exam',
      type: 'exam',
      subject: 'Database',
      deadline: new Date('2024-09-20T11:00:00'),
      time: '90 min',
      questions: 40,
      icon: '📋',
      preparation: [
        { title: 'ER Diagrams', link: '#', completed: true },
        { title: 'Normalization', link: '#', completed: false },
        { title: 'SQL Queries', link: '#', completed: false },
        { title: 'Indexing', link: '#', completed: false }
      ]
    }
  ];

  useEffect(() => {
    const updateCountdowns = () => {
      const newTimeLeft: { [key: number]: string } = {};
      upcomingAssessments.forEach(assessment => {
        const now = new Date().getTime();
        const deadline = assessment.deadline.getTime();
        const distance = deadline - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          
          if (days > 0) {
            newTimeLeft[assessment.id] = `${days}d ${hours}h ${minutes}m`;
          } else if (hours > 0) {
            newTimeLeft[assessment.id] = `${hours}h ${minutes}m`;
          } else {
            newTimeLeft[assessment.id] = `${minutes}m`;
          }
        } else {
          newTimeLeft[assessment.id] = 'Started';
        }
      });
      setTimeLeft(newTimeLeft);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);

    return () => clearInterval(interval);
  }, [upcomingAssessments]);

  const getUrgencyColor = (days: number) => {
    if (days <= 1) return 'text-red-600 bg-red-50 border-red-200';
    if (days <= 3) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  const getDaysUntil = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calendarDates = [
    { date: 'Sep 8', day: 'Sun', hasAssessment: true, assessmentTitle: 'JS Quiz' },
    { date: 'Sep 9', day: 'Mon', hasAssessment: false },
    { date: 'Sep 10', day: 'Tue', hasAssessment: false },
    { date: 'Sep 11', day: 'Wed', hasAssessment: false },
    { date: 'Sep 12', day: 'Thu', hasAssessment: true, assessmentTitle: 'TypeScript Quiz' },
    { date: 'Sep 13', day: 'Fri', hasAssessment: false },
    { date: 'Sep 14', day: 'Sat', hasAssessment: false },
    { date: 'Sep 15', day: 'Sun', hasAssessment: true, assessmentTitle: 'Web Dev Exam' },
    { date: 'Sep 16', day: 'Mon', hasAssessment: false },
    { date: 'Sep 17', day: 'Tue', hasAssessment: false },
    { date: 'Sep 18', day: 'Wed', hasAssessment: false },
    { date: 'Sep 19', day: 'Thu', hasAssessment: false },
    { date: 'Sep 20', day: 'Fri', hasAssessment: true, assessmentTitle: 'DB Exam' },
    { date: 'Sep 21', day: 'Sat', hasAssessment: false },
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Assessments</h1>
        <p className="text-gray-600">Stay on top of your upcoming quizzes, exercises, and exams.</p>
      </div>

      {/* Calendar View */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Assessment Schedule</CardTitle>
          <div className="grid grid-cols-7 gap-2">
            {calendarDates.map((date) => (
              <div
                key={date.date}
                className={`p-3 rounded-lg border text-center ${
                  date.hasAssessment
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">{date.day}</div>
                <div className="font-semibold text-gray-900">{date.date}</div>
                {date.hasAssessment && (
                  <div className="mt-2 text-xs text-blue-600 font-medium truncate">
                    {date.assessmentTitle}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Upcoming Assessments */}
      <div className="space-y-6">
        {upcomingAssessments.map((assessment) => {
          const daysUntil = getDaysUntil(assessment.deadline);
          const urgencyColor = getUrgencyColor(daysUntil);
          
          return (
            <Card key={assessment.id}>
              <CardBody>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{assessment.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{assessment.title}</h3>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full border ${urgencyColor}`}>
                        {assessment.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{assessment.subject}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span>⏱️</span> {assessment.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>📝</span> {assessment.questions} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <span>📅</span> {assessment.deadline.toLocaleDateString()}
                      </span>
                    </div>

                    {/* Countdown Timer */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${urgencyColor} mb-4`}>
                      <span className="text-lg">⏰</span>
                      <span className="font-semibold">{timeLeft[assessment.id] || 'Loading...'}</span>
                      <span className="text-sm">remaining</span>
                    </div>

                    {/* Preparation Materials */}
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Preparation Materials</h4>
                      <div className="space-y-2">
                        {assessment.preparation.map((item, index) => (
                          <Link
                            key={index}
                            href={item.link}
                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              item.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                              {item.completed ? '✓' : index + 1}
                            </div>
                            <span className={`flex-1 ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                              {item.title}
                            </span>
                            <span className="text-blue-600">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                      <Link
                        href={`/student/learning`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                      >
                        Start Preparation
                      </Link>
                      <Link
                        href={`/student/assessments`}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Study Tips */}
      <Card className="mt-8">
        <CardBody>
          <CardTitle>Study Tips</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl">📚</div>
              <div>
                <div className="font-medium text-blue-900">Review Past Quizzes</div>
                <div className="text-sm text-blue-700">Check your completed assessments to identify areas for improvement.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <div className="text-2xl">⏰</div>
              <div>
                <div className="font-medium text-green-900">Time Management</div>
                <div className="text-sm text-green-700">Practice with timed sessions to improve your pacing.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl">🎯</div>
              <div>
                <div className="font-medium text-purple-900">Focus on Weak Areas</div>
                <div className="text-sm text-purple-700">Spend extra time on topics where you scored lower previously.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-medium text-orange-900">Take Breaks</div>
                <div className="text-sm text-orange-700">Use the Pomodoro technique: 25 minutes focus, 5 minutes break.</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
