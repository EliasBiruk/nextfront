'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useState } from 'react';

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'quizzes' | 'exercises' | 'exams'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'in-progress' | 'completed'>('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const assessments = [
    {
      id: 1,
      title: 'JavaScript Fundamentals Quiz',
      type: 'quiz',
      subject: 'JavaScript',
      status: 'upcoming',
      deadline: '2024-09-08',
      time: '45 min',
      questions: 20,
      icon: '📝',
      progress: 0
    },
    {
      id: 2,
      title: 'React State Management Exercise',
      type: 'exercise',
      subject: 'React',
      status: 'in-progress',
      deadline: '2024-09-10',
      time: '60 min',
      questions: 15,
      icon: '💻',
      progress: 60
    },
    {
      id: 3,
      title: 'Python Data Structures Quiz',
      type: 'quiz',
      subject: 'Python',
      status: 'completed',
      deadline: '2024-09-05',
      time: '30 min',
      questions: 25,
      icon: '📝',
      progress: 100,
      score: 92
    },
    {
      id: 4,
      title: 'Web Development Final Exam',
      type: 'exam',
      subject: 'Web Development',
      status: 'upcoming',
      deadline: '2024-09-15',
      time: '120 min',
      questions: 50,
      icon: '📋',
      progress: 0
    },
    {
      id: 5,
      title: 'CSS Grid Exercise',
      type: 'exercise',
      subject: 'CSS',
      status: 'completed',
      deadline: '2024-09-03',
      time: '45 min',
      questions: 10,
      icon: '💻',
      progress: 100,
      score: 88
    },
    {
      id: 6,
      title: 'TypeScript Quiz',
      type: 'quiz',
      subject: 'TypeScript',
      status: 'in-progress',
      deadline: '2024-09-12',
      time: '40 min',
      questions: 18,
      icon: '📝',
      progress: 35
    },
    {
      id: 7,
      title: 'Database Design Exam',
      type: 'exam',
      subject: 'Database',
      status: 'upcoming',
      deadline: '2024-09-20',
      time: '90 min',
      questions: 40,
      icon: '📋',
      progress: 0
    },
    {
      id: 8,
      title: 'API Integration Exercise',
      type: 'exercise',
      subject: 'JavaScript',
      status: 'completed',
      deadline: '2024-09-01',
      time: '75 min',
      questions: 12,
      icon: '💻',
      progress: 100,
      score: 95
    }
  ];

  const filteredAssessments = assessments.filter(assessment => {
    const tabMatch = activeTab === 'all' || assessment.type === activeTab;
    const statusMatch = statusFilter === 'all' || assessment.status === statusFilter;
    const subjectMatch = subjectFilter === 'all' || assessment.subject === subjectFilter;
    return tabMatch && statusMatch && subjectMatch;
  });

  const subjects = [...new Set(assessments.map(a => a.subject))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-50';
      case 'in-progress': return 'text-orange-600 bg-orange-50';
      case 'completed': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const stats = {
    total: assessments.length,
    completed: assessments.filter(a => a.status === 'completed').length,
    upcoming: assessments.filter(a => a.status === 'upcoming').length,
    inProgress: assessments.filter(a => a.status === 'in-progress').length,
    averageScore: Math.round(
      assessments
        .filter(a => a.status === 'completed' && a.score)
        .reduce((sum, a) => sum + (a.score || 0), 0) / 
      assessments.filter(a => a.status === 'completed').length
    )
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assessments</h1>
        <p className="text-gray-600">View and manage your quizzes, exercises, and exams.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{stats.total}</div>
                <div className="text-blue-100 text-sm">Total Assessments</div>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{stats.completed}</div>
                <div className="text-green-100 text-sm">Completed</div>
              </div>
              <div className="text-4xl opacity-80">✅</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{stats.upcoming}</div>
                <div className="text-orange-100 text-sm">Upcoming</div>
              </div>
              <div className="text-4xl opacity-80">📅</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{stats.averageScore}%</div>
                <div className="text-purple-100 text-sm">Average Score</div>
              </div>
              <div className="text-4xl opacity-80">🎯</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/student/assessments/upcoming" className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
          <div className="text-2xl">📅</div>
          <div>
            <div className="font-semibold text-blue-900">Upcoming</div>
            <div className="text-sm text-blue-600">{stats.upcoming} assessments</div>
          </div>
        </Link>
        <Link href="/student/assessments/in-progress" className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition">
          <div className="text-2xl">⏳</div>
          <div>
            <div className="font-semibold text-orange-900">In Progress</div>
            <div className="text-sm text-orange-600">{stats.inProgress} assessments</div>
          </div>
        </Link>
        <Link href="/student/assessments/completed" className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition">
          <div className="text-2xl">✅</div>
          <div>
            <div className="font-semibold text-green-900">Completed</div>
            <div className="text-sm text-green-600">{stats.completed} assessments</div>
          </div>
        </Link>
      </div>

      {/* Main Assessment List */}
      <Card>
        <CardBody>
          <CardTitle>All Assessments</CardTitle>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { key: 'all', label: 'All' },
              { key: 'quizzes', label: 'Quizzes' },
              { key: 'exercises', label: 'Exercises' },
              { key: 'exams', label: 'Exams' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Assessment Cards */}
          <div className="space-y-4">
            {filteredAssessments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">📭</div>
                <p>No assessments found matching your filters.</p>
              </div>
            ) : (
              filteredAssessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group cursor-pointer"
                >
                  <div className="text-3xl group-hover:scale-110 transition">{assessment.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{assessment.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assessment.status)}`}>
                        {assessment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{assessment.subject}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>⏱️ {assessment.time}</span>
                      <span>📝 {assessment.questions} questions</span>
                      <span>📅 {assessment.deadline}</span>
                    </div>
                  </div>
                  <div className="text-right min-w-[120px]">
                    {assessment.status === 'completed' ? (
                      <div>
                        <div className="text-sm font-medium text-green-600 mb-1">{assessment.score}%</div>
                        <Link
                          href="/student/assessments/results"
                          className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                        >
                          View Results
                        </Link>
                      </div>
                    ) : assessment.status === 'in-progress' ? (
                      <div>
                        <div className="text-sm font-medium text-orange-600 mb-1">{assessment.progress}%</div>
                        <ProgressBar progress={assessment.progress} />
                        <Link
                          href="/student/assessments/in-progress"
                          className="mt-2 inline-block px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition"
                        >
                          Continue
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <Link
                          href="/student/assessments/upcoming"
                          className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                        >
                          Start
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
