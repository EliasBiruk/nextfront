'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const router = useRouter();

  const learningHistory = [
    {
      date: 'September 6, 2026',
      events: [
        {
          type: 'lesson',
          title: 'Completed Lesson: Arrow Functions',
          course: 'JavaScript Fundamentals',
          time: '2:30 PM',
          icon: '✅',
          color: 'green'
        },
        {
          type: 'quiz',
          title: 'Passed Quiz: Functions Assessment',
          course: 'JavaScript Fundamentals',
          score: 95,
          time: '3:15 PM',
          icon: '📝',
          color: 'blue'
        }
      ]
    },
    {
      date: 'September 5, 2026',
      events: [
        {
          type: 'lesson',
          title: 'Completed Lesson: State Basics',
          course: 'React Development',
          time: '10:00 AM',
          icon: '✅',
          color: 'green'
        },
        {
          type: 'achievement',
          title: 'Earned Achievement: 7 Day Streak',
          description: 'Keep up the great work!',
          time: '8:00 AM',
          icon: '🏆',
          color: 'yellow'
        },
        {
          type: 'exercise',
          title: 'Submitted Exercise: Event Listeners',
          course: 'JavaScript Fundamentals',
          time: '4:45 PM',
          icon: '💻',
          color: 'purple'
        }
      ]
    },
    {
      date: 'September 4, 2026',
      events: [
        {
          type: 'course',
          title: 'Started Course: React Development',
          description: 'Chapter 1: Introduction to React',
          time: '9:00 AM',
          icon: '📚',
          color: 'blue'
        },
        {
          type: 'lesson',
          title: 'Completed Lesson: List Operations',
          course: 'Python for Data Science',
          time: '2:30 PM',
          icon: '✅',
          color: 'green'
        }
      ]
    },
    {
      date: 'September 3, 2026',
      events: [
        {
          type: 'quiz',
          title: 'Passed Quiz: Python Basics',
          course: 'Python for Data Science',
          score: 88,
          time: '11:30 AM',
          icon: '📝',
          color: 'blue'
        },
        {
          type: 'achievement',
          title: 'Earned Achievement: First Quiz Perfect Score',
          description: '100% on HTML Fundamentals Quiz',
          time: '1:00 PM',
          icon: '🏆',
          color: 'yellow'
        }
      ]
    },
    {
      date: 'September 2, 2026',
      events: [
        {
          type: 'lesson',
          title: 'Completed Lesson: CSS Grid Template Areas',
          course: 'CSS Mastery',
          time: '3:00 PM',
          icon: '✅',
          color: 'green'
        },
        {
          type: 'certificate',
          title: 'Earned Certificate: HTML & CSS Fundamentals',
          certificateId: 'CERT-2026-HTML-001',
          time: '5:00 PM',
          icon: '📜',
          color: 'green'
        }
      ]
    },
    {
      date: 'September 1, 2026',
      events: [
        {
          type: 'course',
          title: 'Started Course: Python for Data Science',
          description: 'Chapter 1: Python Basics',
          time: '10:00 AM',
          icon: '📚',
          color: 'blue'
        },
        {
          type: 'achievement',
          title: 'Earned Achievement: 5 Day Streak',
          description: 'Consistency is key!',
          time: '8:00 AM',
          icon: '🏆',
          color: 'yellow'
        }
      ]
    },
    {
      date: 'August 31, 2026',
      events: [
        {
          type: 'lesson',
          title: 'Completed Lesson: Flexbox Basics',
          course: 'CSS Mastery',
          time: '4:00 PM',
          icon: '✅',
          color: 'green'
        },
        {
          type: 'exercise',
          title: 'Submitted Exercise: Flexbox Layout',
          course: 'CSS Mastery',
          time: '4:30 PM',
          icon: '💻',
          color: 'purple'
        }
      ]
    }
  ];

  const getEventColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-100 border-green-300 text-green-700';
      case 'blue': return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'yellow': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'purple': return 'bg-purple-100 border-purple-300 text-purple-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '✅';
      case 'quiz': return '📝';
      case 'exercise': return '💻';
      case 'course': return '📚';
      case 'achievement': return '🏆';
      case 'certificate': return '📜';
      default: return '📌';
    }
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/student" className="hover:text-blue-600">Dashboard</Link>
        <span className="mx-2">/</span>
        <Link href="/student/learning" className="hover:text-blue-600">Learning</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">History</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Learning History</h1>
        <p className="text-gray-600">Track your learning journey and achievements over time</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">67</div>
                <div className="text-green-100 text-sm">Lessons Completed</div>
              </div>
              <div className="text-4xl opacity-80">✅</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">23</div>
                <div className="text-blue-100 text-sm">Quizzes Passed</div>
              </div>
              <div className="text-4xl opacity-80">📝</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">15</div>
                <div className="text-purple-100 text-sm">Exercises Done</div>
              </div>
              <div className="text-4xl opacity-80">💻</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">8</div>
                <div className="text-yellow-100 text-sm">Achievements</div>
              </div>
              <div className="text-4xl opacity-80">🏆</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardBody>
          <CardTitle>Activity Timeline</CardTitle>
          <div className="space-y-8">
            {learningHistory.map((day, dayIndex) => (
              <div key={day.date} className="relative">
                {/* Date Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900">{day.date}</h3>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Events */}
                <div className="ml-6 space-y-3">
                  {day.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`relative p-4 rounded-lg border ${getEventColor(event.color)} hover:shadow-md transition cursor-pointer`}
                      onClick={() => {
                        if (event.type === 'certificate') {
                          router.push(`/student/certificates/${event.certificateId}`);
                        } else if (event.course) {
                          router.push(`/student/learning/${event.course.replace(/\s+/g, '-').toLowerCase()}`);
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{event.icon}</div>
                        <div className="flex-1">
                          <div className="font-semibold">{event.title}</div>
                          {event.course && (
                            <div className="text-sm opacity-80 mt-1">{event.course}</div>
                          )}
                          {event.description && (
                            <div className="text-sm opacity-80 mt-1">{event.description}</div>
                          )}
                          {event.score !== undefined && (
                            <div className="text-sm mt-1">
                              Score: <span className="font-bold">{event.score}%</span>
                            </div>
                          )}
                          {event.certificateId && (
                            <div className="text-sm mt-1">
                              Certificate ID: <span className="font-mono">{event.certificateId}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-sm opacity-70 whitespace-nowrap">{event.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Connector Line */}
                {dayIndex < learningHistory.length - 1 && (
                  <div className="absolute left-1.5 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
