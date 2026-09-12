'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';

export default function UpcomingExams() {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const countdowns = {
      'exam1': new Date('2026-12-15T09:00:00').getTime() - new Date().getTime(),
      'exam2': new Date('2026-12-18T14:00:00').getTime() - new Date().getTime(),
      'exam3': new Date('2026-12-20T10:00:00').getTime() - new Date().getTime(),
    };

    const updateCountdowns = () => {
      setTimeLeft(countdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const upcomingExams = [
    {
      id: 'exam1',
      title: 'JavaScript Fundamentals Final Exam',
      course: 'JavaScript Fundamentals',
      date: 'December 15, 2026',
      time: '9:00 AM - 11:00 AM',
      location: 'Room 301, Main Building',
      duration: '2 hours',
      questions: 50,
      passingScore: 70,
      totalMarks: 100,
      preparationMaterials: [
        { name: 'Study Guide', type: 'PDF' },
        { name: 'Practice Quiz', type: 'Interactive' },
        { name: 'Video Tutorials', type: 'Video' },
      ],
      requirements: [
        'Student ID card',
        'Calculator (non-programmable)',
        'Pen and pencil',
      ],
      permittedItems: [
        'Non-programmable calculator',
        'Water bottle (clear)',
        'Note paper (provided)',
      ],
      prohibitedItems: [
        'Smartphones',
        'Smartwatches',
        'Programming calculators',
      ],
    },
    {
      id: 'exam2',
      title: 'Web Development Comprehensive',
      course: 'Web Development Basics',
      date: 'December 18, 2026',
      time: '2:00 PM - 5:00 PM',
      location: 'Computer Lab A, Science Wing',
      duration: '3 hours',
      questions: 75,
      passingScore: 75,
      totalMarks: 100,
      preparationMaterials: [
        { name: 'HTML/CSS Reference', type: 'PDF' },
        { name: 'Code Practice Repository', type: 'Link' },
        { name: 'Mock Exam', type: 'Interactive' },
      ],
      requirements: [
        'Student ID card',
        'Laptop (provided)',
        'USB drive (optional)',
      ],
      permittedItems: [
        'Provided laptop',
        'Notes (printed)',
        'Water bottle',
      ],
      prohibitedItems: [
        'Personal laptops',
        'External storage devices',
        'Internet access',
      ],
    },
    {
      id: 'exam3',
      title: 'Database Systems Assessment',
      course: 'Database Management',
      date: 'December 20, 2026',
      time: '10:00 AM - 12:00 PM',
      location: 'Room 205, Tech Center',
      duration: '2 hours',
      questions: 40,
      passingScore: 65,
      totalMarks: 100,
      preparationMaterials: [
        { name: 'SQL Reference Sheet', type: 'PDF' },
        { name: 'ER Diagram Guide', type: 'PDF' },
        { name: 'Practice Problems', type: 'Interactive' },
      ],
      requirements: [
        'Student ID card',
        'Calculator',
        'Formula sheet (provided)',
      ],
      permittedItems: [
        'Provided formula sheet',
        'Non-programmable calculator',
        'Pencil and eraser',
      ],
      prohibitedItems: [
        'Personal notes',
        'Electronic devices',
        'Unapproved calculators',
      ],
    },
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Exams</h1>
        <p className="text-gray-600">View your scheduled exams and prepare for success</p>
      </div>

      {/* Calendar View Summary */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Exam Schedule Overview</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm font-semibold text-blue-900 mb-1">{exam.date}</div>
                <div className="text-lg font-bold text-blue-700">{exam.title}</div>
                <div className="text-sm text-blue-600">{exam.time}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Upcoming Exams List */}
      <div className="space-y-6">
        {upcomingExams.map((exam) => (
          <Card key={exam.id}>
            <CardBody>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-1">{exam.title}</h3>
                  <p className="text-sm text-gray-600">{exam.course}</p>
                </div>
                <Badge variant="info">Upcoming</Badge>
              </div>

              {/* Countdown Timer */}
              <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-sm font-medium text-yellow-800 mb-1">Time Remaining</div>
                <div className="text-2xl font-bold text-yellow-900">
                  {formatTime(timeLeft[exam.id] || 0)}
                </div>
              </div>

              {/* Exam Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="w-24 text-gray-600">📅 Date:</span>
                    <span className="font-medium">{exam.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-24 text-gray-600">⏰ Time:</span>
                    <span className="font-medium">{exam.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-24 text-gray-600">📍 Location:</span>
                    <span className="font-medium">{exam.location}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="w-24 text-gray-600">⏱️ Duration:</span>
                    <span className="font-medium">{exam.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-24 text-gray-600">❓ Questions:</span>
                    <span className="font-medium">{exam.questions}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-24 text-gray-600">🎯 Pass Score:</span>
                    <span className="font-medium">{exam.passingScore}%</span>
                  </div>
                </div>
              </div>

              {/* Preparation Materials */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">📚 Preparation Materials</h4>
                <div className="flex flex-wrap gap-2">
                  {exam.preparationMaterials.map((material, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <span>{material.name}</span>
                      <Badge variant="default" size="sm">{material.type}</Badge>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-green-700">✅ Required Items</h4>
                  <ul className="text-sm space-y-1">
                    {exam.requirements.map((req, idx) => (
                      <li key={idx} className="text-gray-600">• {req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-blue-700">🔵 Permitted Items</h4>
                  <ul className="text-sm space-y-1">
                    {exam.permittedItems.map((item, idx) => (
                      <li key={idx} className="text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-red-700">🚫 Prohibited Items</h4>
                  <ul className="text-sm space-y-1">
                    {exam.prohibitedItems.map((item, idx) => (
                      <li key={idx} className="text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-gray-600">Total Marks: {exam.totalMarks}</span>
                <Button>View Full Details</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
