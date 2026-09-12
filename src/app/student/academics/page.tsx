'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';

export default function StudentAcademics() {
  const academicStats = {
    gpa: 3.8,
    credits: 96,
    courses: 12,
    attendance: 95
  };

  const currentCourses = [
    {
      id: 1,
      name: 'Mathematics',
      teacher: 'Prof. Williams',
      grade: 'A',
      progress: 85,
      credits: 4,
      attendance: 98
    },
    {
      id: 2,
      name: 'Science',
      teacher: 'Dr. Johnson',
      grade: 'A-',
      progress: 78,
      credits: 4,
      attendance: 92
    },
    {
      id: 3,
      name: 'English',
      teacher: 'Ms. Brown',
      grade: 'B+',
      progress: 72,
      credits: 3,
      attendance: 95
    },
    {
      id: 4,
      name: 'History',
      teacher: 'Mr. Davis',
      grade: 'A',
      progress: 90,
      credits: 3,
      attendance: 100
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Math Midterm Exam',
      date: 'Sep 15, 2026',
      type: 'Exam',
      course: 'Mathematics'
    },
    {
      id: 2,
      title: 'Science Project Due',
      date: 'Sep 18, 2026',
      type: 'Assignment',
      course: 'Science'
    },
    {
      id: 3,
      title: 'Parent-Teacher Conference',
      date: 'Sep 20, 2026',
      type: 'Meeting',
      course: 'All Courses'
    }
  ];

  return (
    <DashboardLayout actor="student" userName="Student">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Academics</h1>
        <p className="text-gray-600">View your academic performance and records</p>
      </div>

      {/* Academic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{academicStats.gpa}</div>
                <div className="text-blue-100 text-sm">GPA</div>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{academicStats.credits}</div>
                <div className="text-green-100 text-sm">Credits</div>
              </div>
              <div className="text-4xl opacity-80">🎓</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{academicStats.courses}</div>
                <div className="text-purple-100 text-sm">Courses</div>
              </div>
              <div className="text-4xl opacity-80">📚</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{academicStats.attendance}%</div>
                <div className="text-orange-100 text-sm">Attendance</div>
              </div>
              <div className="text-4xl opacity-80">📅</div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Courses */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              <CardTitle>Current Courses</CardTitle>
              <div className="space-y-4">
                {currentCourses.map((course) => (
                  <div key={course.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.name}</h3>
                        <p className="text-sm text-gray-600">{course.teacher}</p>
                      </div>
                      <Badge variant="success">{course.grade}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <ProgressBar progress={course.progress} />
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>🎓 {course.credits} credits</span>
                        <span>📅 {course.attendance}% attendance</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card>
            <CardBody>
              <CardTitle>Upcoming Events</CardTitle>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        {event.type === 'Exam' ? '📝' : event.type === 'Assignment' ? '📋' : '👥'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.course}</p>
                        <p className="text-xs text-gray-500 mt-1">📅 {event.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
