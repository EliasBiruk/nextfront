'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SchoolInstructorDashboard() {
  const router = useRouter();

  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Good morning, Teacher 👋</h1>
        <p className="text-gray-600">Grade 10 • Mathematics • Academic Year 2026/27</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">4</div>
                <div className="text-blue-100 text-sm">Classes</div>
              </div>
              <div className="text-4xl opacity-80">🏫</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">126</div>
                <div className="text-green-100 text-sm">Students</div>
              </div>
              <div className="text-4xl opacity-80">👥</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">94%</div>
                <div className="text-purple-100 text-sm">Attendance</div>
              </div>
              <div className="text-4xl opacity-80">📅</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">82%</div>
                <div className="text-orange-100 text-sm">Avg Grade</div>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Timetable */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              <CardTitle>Today's Timetable</CardTitle>
              <div className="space-y-3 mt-4">
                {[
                  { 
                    time: '08:00',
                    subject: 'Mathematics',
                    class: 'Grade 10A',
                    room: 'Room 201',
                    status: 'completed',
                    icon: '📐'
                  },
                  { 
                    time: '10:00',
                    subject: 'Mathematics',
                    class: 'Grade 10B',
                    room: 'Room 201',
                    status: 'current',
                    icon: '📐'
                  },
                  { 
                    time: '13:00',
                    subject: 'Mathematics',
                    class: 'Grade 11A',
                    room: 'Room 201',
                    status: 'upcoming',
                    icon: '📐'
                  },
                ].map((schedule) => (
                  <div 
                    key={schedule.time}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      schedule.status === 'current' 
                        ? 'border-blue-500 bg-blue-50' 
                        : schedule.status === 'completed'
                        ? 'border-gray-200 bg-gray-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    } transition cursor-pointer`}
                    onClick={() => router.push('/instructor/school/timetable')}
                  >
                    <div className="text-2xl">{schedule.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{schedule.subject}</div>
                      <div className="text-sm text-gray-600">{schedule.class} • {schedule.room}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{schedule.time}</div>
                      <div className={`text-xs ${
                        schedule.status === 'current' 
                          ? 'text-blue-600 font-medium' 
                          : schedule.status === 'completed'
                          ? 'text-gray-500'
                          : 'text-gray-500'
                      }`}>
                        {schedule.status === 'current' ? 'In Progress' : 
                         schedule.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Work Requiring Attention */}
        <div>
          <Card>
            <CardBody>
              <CardTitle>Work Requiring Attention</CardTitle>
              <div className="space-y-3 mt-4">
                {[
                  { 
                    type: 'assignments',
                    title: 'Assignments Awaiting Grading', 
                    count: 24,
                    icon: '📝',
                    link: '/instructor/school/assignments/grading'
                  },
                  { 
                    type: 'quizzes',
                    title: 'Quiz Attempts to Review', 
                    count: 18,
                    icon: '📋',
                    link: '/instructor/school/quizzes/attempts'
                  },
                  { 
                    type: 'attendance',
                    title: 'Attendance Not Submitted', 
                    count: 1,
                    icon: '📅',
                    link: '/instructor/school/attendance/take'
                  },
                  { 
                    type: 'questions',
                    title: 'Student Questions', 
                    count: 6,
                    icon: '❓',
                    link: '/instructor/school/messages/students'
                  },
                ].map((item) => (
                  <Link 
                    key={item.title}
                    href={item.link}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                    </div>
                    <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {item.count}
                    </div>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Student Performance */}
      <Card className="mb-8">
        <CardBody>
          <div className="flex items-center justify-between mb-6">
            <CardTitle>Student Performance</CardTitle>
            <Link href="/instructor/school/analytics/student" className="text-blue-600 hover:underline text-sm font-medium">
              View detailed analytics →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                class: 'Grade 10A',
                students: 32,
                average: 84,
                attendance: 95,
                atRisk: 3,
                icon: '🏫'
              },
              { 
                class: 'Grade 10B',
                students: 30,
                average: 81,
                attendance: 93,
                atRisk: 2,
                icon: '🏫'
              },
              { 
                class: 'Grade 11A',
                students: 28,
                average: 79,
                attendance: 92,
                atRisk: 4,
                icon: '🏫'
              },
              { 
                class: 'Grade 11B',
                students: 36,
                average: 82,
                attendance: 94,
                atRisk: 3,
                icon: '🏫'
              },
            ].map((classData) => (
              <div 
                key={classData.class}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                onClick={() => router.push('/instructor/school/analytics/class')}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{classData.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{classData.class}</h3>
                    <div className="text-xs text-gray-600">{classData.students} students</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Average Grade</span>
                      <span className="font-medium text-gray-900">{classData.average}%</span>
                    </div>
                    <ProgressBar progress={classData.average} color="green" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Attendance</span>
                      <span className="font-medium text-gray-900">{classData.attendance}%</span>
                    </div>
                    <ProgressBar progress={classData.attendance} color="blue" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">At-Risk Students</span>
                    <span className={`text-xs font-medium ${classData.atRisk > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {classData.atRisk}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardBody>
          <CardTitle>Recent Activity</CardTitle>
          <div className="space-y-3 mt-4">
            {[
              { action: 'Submitted grades', detail: 'Grade 10A - Quiz 3', time: '2 hours ago', icon: '📊' },
              { action: 'Took attendance', detail: 'Grade 10B - Mathematics', time: '3 hours ago', icon: '📅' },
              { action: 'Created assignment', detail: 'Grade 11A - Algebra Problems', time: '5 hours ago', icon: '📝' },
              { action: 'Responded to question', detail: 'Student: John - Calculus help', time: '1 day ago', icon: '💬' },
              { action: 'Graded exercise', detail: 'Grade 10B - 28 submissions', time: '2 days ago', icon: '✅' },
            ].map((activity) => (
              <div key={activity.action} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{activity.action}</div>
                  <div className="text-xs text-gray-600">{activity.detail}</div>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}