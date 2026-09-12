'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { schoolsService } from '@/services';
import { useAuth } from '@/context/AuthContext';

export default function SchoolDashboard() {
  const { currentUser, currentSchoolContext } = useAuth();
  const [schoolStats, setSchoolStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSchoolStats() {
      if (!currentUser) return;
      try {
        const stats = await schoolsService().getSchoolStats(currentUser.id);
        setSchoolStats(stats);
      } catch (error) {
        console.error('Failed to load school stats:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSchoolStats();
  }, [currentUser]);

  const schoolName = currentSchoolContext?.schoolName || currentUser?.firstName || 'School';
  const schoolRole = currentSchoolContext?.role || 'school_admin';

  // School Owner Dashboard
  if (schoolRole === 'school_admin') {
    return (
      <DashboardLayout actor="school" userName={schoolName} schoolRole="school_admin">
        {isLoading ? (
          <Card>
            <CardBody>
              <p className="text-[var(--joyedu-text-secondary)]">Loading dashboard...</p>
            </CardBody>
          </Card>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-2">{schoolName} Dashboard</h1>
              <p className="text-[var(--joyedu-text-secondary)]">School Owner • Full Administrative Access</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-[var(--joyedu-primary-500)] to-[var(--joyedu-primary-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">{schoolStats?.totalStudents || 0}</div>
                      <div className="text-[var(--joyedu-primary-100)] text-sm">Total Students</div>
                      <div className="text-xs text-[var(--joyedu-primary-200)] mt-1">↑ 5% from last year</div>
                    </div>
                    <div className="text-4xl opacity-80">👥</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-success-500)] to-[var(--joyedu-success-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">{schoolStats?.totalTeachers || 0}</div>
                      <div className="text-[var(--joyedu-success-100)] text-sm">Teachers</div>
                      <div className="text-xs text-[var(--joyedu-success-200)] mt-1">{schoolStats?.departments || 0} departments</div>
                    </div>
                    <div className="text-4xl opacity-80">👨‍🏫</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-accent-500)] to-[var(--joyedu-accent-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">{schoolStats?.attendanceRate || 92}%</div>
                      <div className="text-[var(--joyedu-accent-100)] text-sm">Attendance Rate</div>
                      <div className="text-xs text-[var(--joyedu-accent-200)] mt-1">This month</div>
                    </div>
                    <div className="text-4xl opacity-80">📊</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-warning-500)] to-[var(--joyedu-warning-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">${(schoolStats?.feeCollection || 0).toLocaleString()}</div>
                      <div className="text-[var(--joyedu-warning-100)] text-sm">Fee Collection</div>
                      <div className="text-xs text-[var(--joyedu-warning-200)] mt-1">This semester</div>
                    </div>
                    <div className="text-4xl opacity-80">💰</div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardBody>
                    <CardTitle>Quick Actions</CardTitle>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Link href="/school/students" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                        <div className="text-3xl mb-2">👥</div>
                        <div className="font-medium text-sm">Students</div>
                      </Link>
                      <Link href="/school/academics" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                        <div className="text-3xl mb-2">📚</div>
                        <div className="font-medium text-sm">Academics</div>
                      </Link>
                      <Link href="/school/attendance" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                        <div className="text-3xl mb-2">📅</div>
                        <div className="font-medium text-sm">Attendance</div>
                      </Link>
                      <Link href="/school/finance" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                        <div className="text-3xl mb-2">💰</div>
                        <div className="font-medium text-sm">Finance</div>
                      </Link>
                      <Link href="/school/staff" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                        <div className="text-3xl mb-2">👨‍🏫</div>
                        <div className="font-medium text-sm">Staff</div>
                      </Link>
                      <Link href="/school/timetable" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                        <div className="text-3xl mb-2">🕐</div>
                        <div className="font-medium text-sm">Timetable</div>
                      </Link>
                      <Link href="/school/examinations" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                        <div className="text-3xl mb-2">📋</div>
                        <div className="font-medium text-sm">Exams</div>
                      </Link>
                      <Link href="/school/reports" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition text-center">
                        <div className="text-3xl mb-2">📊</div>
                        <div className="font-medium text-sm">Reports</div>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <Card>
                <CardBody>
                  <CardTitle>Today's Schedule</CardTitle>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--joyedu-primary-subtle)] border-l-4 border-[var(--joyedu-primary-500)] rounded">
                      <div className="font-medium text-sm">8:00 AM - 9:00 AM</div>
                      <div className="text-[var(--joyedu-text-secondary)] text-sm">Staff Meeting</div>
                    </div>
                    <div className="p-3 bg-[var(--joyedu-success-bg)] border-l-4 border-[var(--joyedu-success-500)] rounded">
                      <div className="font-medium text-sm">10:00 AM - 12:00 PM</div>
                      <div className="text-[var(--joyedu-text-secondary)] text-sm">Class 10-A Math Exam</div>
                    </div>
                    <div className="p-3 bg-[var(--joyedu-accent-subtle)] border-l-4 border-[var(--joyedu-accent-500)] rounded">
                      <div className="font-medium text-sm">2:00 PM - 4:00 PM</div>
                      <div className="text-[var(--joyedu-text-secondary)] text-sm">Parent Meeting</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardBody>
                  <CardTitle>Recent Activity</CardTitle>
                  <div className="space-y-4">
                    {[
                      { action: 'New enrollment', detail: '15 new students enrolled for Fall 2026', time: 'Today', icon: '👤' },
                      { action: 'Attendance report', detail: 'Daily attendance rate: 94%', time: 'Today', icon: '📊' },
                      { action: 'Fee payment', detail: '$45,000 collected in tuition fees', time: 'Yesterday', icon: '💰' },
                      { action: 'Staff meeting', detail: 'Monthly faculty meeting scheduled', time: '2 days ago', icon: '📅' },
                    ].map((activity) => (
                      <div key={activity.action} className="flex items-start gap-4 p-3 bg-[var(--joyedu-bg-tertiary)] rounded-lg">
                        <div className="text-2xl">{activity.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-[var(--joyedu-text-secondary)]">{activity.detail}</div>
                        </div>
                        <div className="text-sm text-[var(--joyedu-text-muted)]">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle>Upcoming Events</CardTitle>
                  <div className="space-y-4">
                    {[
                      { title: 'Parent-Teacher Conference', date: 'Sep 15, 2026', time: '9:00 AM - 4:00 PM', type: 'meeting' },
                      { title: 'Fall Semester Begins', date: 'Sep 20, 2026', time: '8:00 AM', type: 'academic' },
                      { title: 'Staff Development Day', date: 'Sep 25, 2026', time: '9:00 AM - 3:00 PM', type: 'training' },
                      { title: 'Mid-Term Exams', date: 'Oct 15, 2026', time: 'All day', type: 'exam' },
                    ].map((event) => (
                      <div key={event.title} className="flex items-center gap-4 p-3 border border-[var(--joyedu-border-200)] rounded-lg">
                        <div className="text-center min-w-[60px]">
                          <div className="text-lg font-bold text-[var(--joyedu-primary)]">{event.date.split(' ')[1].split(',')[0]}</div>
                          <div className="text-xs text-[var(--joyedu-text-secondary)]">{event.date.split(' ')[0]}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-[var(--joyedu-text-secondary)]">{event.time}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          event.type === 'meeting' ? 'bg-[var(--joyedu-info-bg)] text-[var(--joyedu-info-text)]' :
                          event.type === 'academic' ? 'bg-[var(--joyedu-success-bg)] text-[var(--joyedu-success-text)]' :
                          event.type === 'training' ? 'bg-[var(--joyedu-accent-subtle)] text-[var(--joyedu-accent-700)]' : 'bg-[var(--joyedu-warning-bg)] text-[var(--joyedu-warning-text)]'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </>
        )}
      </DashboardLayout>
    );
  }

  // Teacher Dashboard
  if (schoolRole === 'teacher') {
    return (
      <DashboardLayout actor="school" userName={currentUser?.firstName || 'Teacher'} schoolRole="teacher">
        {isLoading ? (
          <Card>
            <CardBody>
              <p className="text-[var(--joyedu-text-secondary)]">Loading dashboard...</p>
            </CardBody>
          </Card>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-2">Teacher Dashboard</h1>
              <p className="text-[var(--joyedu-text-secondary)]">Classroom Teacher • {schoolName}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-[var(--joyedu-success-500)] to-[var(--joyedu-success-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">5</div>
                      <div className="text-[var(--joyedu-success-100)] text-sm">Assigned Classes</div>
                      <div className="text-xs text-[var(--joyedu-success-200)] mt-1">150 students total</div>
                    </div>
                    <div className="text-4xl opacity-80">📚</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-primary-500)] to-[var(--joyedu-primary-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">95%</div>
                      <div className="text-[var(--joyedu-primary-100)] text-sm">Class Attendance</div>
                      <div className="text-xs text-[var(--joyedu-primary-200)] mt-1">This week</div>
                    </div>
                    <div className="text-4xl opacity-80">📊</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-accent-500)] to-[var(--joyedu-accent-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">12</div>
                      <div className="text-[var(--joyedu-accent-100)] text-sm">Assignments</div>
                      <div className="text-xs text-[var(--joyedu-accent-200)] mt-1">8 pending grading</div>
                    </div>
                    <div className="text-4xl opacity-80">📝</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-warning-500)] to-[var(--joyedu-warning-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">3</div>
                      <div className="text-[var(--joyedu-warning-100)] text-sm">Upcoming Exams</div>
                      <div className="text-xs text-[var(--joyedu-warning-200)] mt-1">This month</div>
                    </div>
                    <div className="text-4xl opacity-80">📋</div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardBody>
                    <CardTitle>My Classes</CardTitle>
                    <div className="space-y-3">
                      {[
                        { name: 'Class 10-A', subject: 'Mathematics', students: 30, time: '8:00 AM - 9:00 AM' },
                        { name: 'Class 10-B', subject: 'Mathematics', students: 28, time: '9:30 AM - 10:30 AM' },
                        { name: 'Class 11-A', subject: 'Advanced Math', students: 25, time: '11:00 AM - 12:00 PM' },
                        { name: 'Class 12-A', subject: 'Calculus', students: 32, time: '2:00 PM - 3:00 PM' },
                        { name: 'Class 12-B', subject: 'Calculus', students: 35, time: '3:30 PM - 4:30 PM' },
                      ].map((cls) => (
                        <Link key={cls.name} href="/school/classes" className="flex items-center justify-between p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                          <div>
                            <div className="font-semibold">{cls.name}</div>
                            <div className="text-sm text-[var(--joyedu-text-secondary)]">{cls.subject}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-[var(--joyedu-text-secondary)]">{cls.students} students</div>
                            <div className="text-xs text-[var(--joyedu-text-muted)]">{cls.time}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>

              <Card>
                <CardBody>
                  <CardTitle>Quick Actions</CardTitle>
                  <div className="space-y-3">
                    <Link href="/school/attendance" className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                      <div className="text-2xl">📅</div>
                      <div className="font-medium">Take Attendance</div>
                    </Link>
                    <Link href="/school/assignments" className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                      <div className="text-2xl">📝</div>
                      <div className="font-medium">Create Assignment</div>
                    </Link>
                    <Link href="/school/gradebook" className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                      <div className="text-2xl">📊</div>
                      <div className="font-medium">Update Grades</div>
                    </Link>
                    <Link href="/school/timetable" className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                      <div className="text-2xl">🕐</div>
                      <div className="font-medium">View Timetable</div>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </div>

            <Card>
              <CardBody>
                <CardTitle>Pending Tasks</CardTitle>
                <div className="space-y-3">
                  {[
                    { task: 'Grade Class 10-A Quiz', due: 'Today', priority: 'high' },
                    { task: 'Submit attendance report', due: 'Tomorrow', priority: 'medium' },
                    { task: 'Prepare lesson plan for Class 11-A', due: 'Sep 15', priority: 'medium' },
                    { task: 'Review student assignments', due: 'Sep 18', priority: 'low' },
                  ].map((item) => (
                    <div key={item.task} className="flex items-center justify-between p-3 border border-[var(--joyedu-border-200)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${
                          item.priority === 'high' ? 'bg-[var(--joyedu-error)]' :
                          item.priority === 'medium' ? 'bg-[var(--joyedu-warning)]' : 'bg-[var(--joyedu-success)]'
                        }`}></span>
                        <div>
                          <div className="font-medium">{item.task}</div>
                          <div className="text-sm text-[var(--joyedu-text-secondary)]">Due: {item.due}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </>
        )}
      </DashboardLayout>
    );
  }

  // School Student Dashboard
  if (schoolRole === 'student') {
    return (
      <DashboardLayout actor="school" userName={currentUser?.firstName || 'Student'} schoolRole="student">
        {isLoading ? (
          <Card>
            <CardBody>
              <p className="text-[var(--joyedu-text-secondary)]">Loading dashboard...</p>
            </CardBody>
          </Card>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-2">Student Dashboard</h1>
              <p className="text-[var(--joyedu-text-secondary)]">School Student • {schoolName} • JoyEdu Integration</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-[var(--joyedu-primary-500)] to-[var(--joyedu-primary-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">92%</div>
                      <div className="text-[var(--joyedu-primary-100)] text-sm">Overall GPA</div>
                      <div className="text-xs text-[var(--joyedu-primary-200)] mt-1">A- grade</div>
                    </div>
                    <div className="text-4xl opacity-80">📊</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-success-500)] to-[var(--joyedu-success-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">95%</div>
                      <div className="text-[var(--joyedu-success-100)] text-sm">Attendance</div>
                      <div className="text-xs text-[var(--joyedu-success-200)] mt-1">This semester</div>
                    </div>
                    <div className="text-4xl opacity-80">📅</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-accent-500)] to-[var(--joyedu-accent-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">6</div>
                      <div className="text-[var(--joyedu-accent-100)] text-sm">Enrolled Courses</div>
                      <div className="text-xs text-[var(--joyedu-accent-200)] mt-1">2 on JoyEdu</div>
                    </div>
                    <div className="text-4xl opacity-80">📚</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-warning-500)] to-[var(--joyedu-warning-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">3</div>
                      <div className="text-[var(--joyedu-warning-100)] text-sm">Pending Tasks</div>
                      <div className="text-xs text-[var(--joyedu-warning-200)] mt-1">1 due today</div>
                    </div>
                    <div className="text-4xl opacity-80">📝</div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardBody>
                  <CardTitle>My Classes</CardTitle>
                  <div className="space-y-3">
                    {[
                      { name: 'Mathematics', teacher: 'Mr. Johnson', grade: 'A', progress: 85 },
                      { name: 'Physics', teacher: 'Dr. Smith', grade: 'A-', progress: 78 },
                      { name: 'Chemistry', teacher: 'Mrs. Davis', grade: 'B+', progress: 72 },
                      { name: 'English', teacher: 'Mr. Wilson', grade: 'A', progress: 90 },
                    ].map((cls) => (
                      <div key={cls.name} className="p-4 border border-[var(--joyedu-border-200)] rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold">{cls.name}</div>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--joyedu-primary-subtle)] text-[var(--joyedu-primary-700)]">{cls.grade}</span>
                        </div>
                        <div className="text-sm text-[var(--joyedu-text-secondary)] mb-2">Teacher: {cls.teacher}</div>
                        <ProgressBar value={cls.progress} />
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle>Quick Actions</CardTitle>
                  <div className="space-y-3">
                    <Link href="/school/assignments" className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                      <div className="text-2xl">📝</div>
                      <div className="font-medium">View Assignments</div>
                    </Link>
                    <Link href="/school/grades" className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                      <div className="text-2xl">📊</div>
                      <div className="font-medium">Check Grades</div>
                    </Link>
                    <Link href="/school/timetable" className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                      <div className="text-2xl">🕐</div>
                      <div className="font-medium">View Timetable</div>
                    </Link>
                    <Link href="/student/learning" className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                      <div className="text-2xl">🎓</div>
                      <div className="font-medium">JoyEdu Courses</div>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </div>

            <Card>
              <CardBody>
                <CardTitle>Today's Schedule</CardTitle>
                <div className="space-y-3">
                  {[
                    { time: '8:00 AM - 9:00 AM', subject: 'Mathematics', room: 'Room 101' },
                    { time: '9:30 AM - 10:30 AM', subject: 'Physics', room: 'Lab 201' },
                    { time: '11:00 AM - 12:00 PM', subject: 'Chemistry', room: 'Lab 202' },
                    { time: '2:00 PM - 3:00 PM', subject: 'English', room: 'Room 105' },
                  ].map((schedule) => (
                    <div key={schedule.time} className="flex items-center gap-4 p-3 border border-[var(--joyedu-border-200)] rounded-lg">
                      <div className="text-sm font-medium text-[var(--joyedu-primary)] min-w-[140px]">{schedule.time}</div>
                      <div className="flex-1">
                        <div className="font-medium">{schedule.subject}</div>
                        <div className="text-sm text-[var(--joyedu-text-secondary)]">{schedule.room}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </>
        )}
      </DashboardLayout>
    );
  }

  // Guardian Dashboard
  if (schoolRole === 'guardian') {
    return (
      <DashboardLayout actor="school" userName={currentUser?.firstName || 'Guardian'} schoolRole="guardian">
        {isLoading ? (
          <Card>
            <CardBody>
              <p className="text-[var(--joyedu-text-secondary)]">Loading dashboard...</p>
            </CardBody>
          </Card>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-2">Guardian Dashboard</h1>
              <p className="text-[var(--joyedu-text-secondary)]">Parent/Guardian • {schoolName}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-[var(--joyedu-primary-500)] to-[var(--joyedu-primary-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">2</div>
                      <div className="text-[var(--joyedu-primary-100)] text-sm">Children</div>
                      <div className="text-xs text-[var(--joyedu-primary-200)] mt-1">Enrolled at {schoolName}</div>
                    </div>
                    <div className="text-4xl opacity-80">👨‍👩‍👧‍👦</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-success-500)] to-[var(--joyedu-success-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">94%</div>
                      <div className="text-[var(--joyedu-success-100)] text-sm">Avg Attendance</div>
                      <div className="text-xs text-[var(--joyedu-success-200)] mt-1">Both children</div>
                    </div>
                    <div className="text-4xl opacity-80">📅</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-accent-500)] to-[var(--joyedu-accent-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">A-</div>
                      <div className="text-[var(--joyedu-accent-100)] text-sm">Avg Grade</div>
                      <div className="text-xs text-[var(--joyedu-accent-200)] mt-1">Both children</div>
                    </div>
                    <div className="text-4xl opacity-80">📊</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-warning-500)] to-[var(--joyedu-warning-600)] text-white border-0">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold mb-1">$0</div>
                      <div className="text-[var(--joyedu-warning-100)] text-sm">Pending Fees</div>
                      <div className="text-xs text-[var(--joyedu-warning-200)] mt-1">All paid</div>
                    </div>
                    <div className="text-4xl opacity-80">💰</div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardBody>
                  <CardTitle>My Children</CardTitle>
                  <div className="space-y-4">
                    {[
                      { name: 'Emma Thompson', grade: '10th', class: 'Class 10-A', attendance: '96%', gpa: '3.8' },
                      { name: 'Jake Thompson', grade: '8th', class: 'Class 8-B', attendance: '92%', gpa: '3.5' },
                    ].map((child) => (
                      <Link key={child.name} href="/school/guardian" className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-semibold text-lg">{child.name}</div>
                            <div className="text-sm text-[var(--joyedu-text-secondary)]">{child.grade} • {child.class}</div>
                          </div>
                          <div className="text-3xl">👤</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-[var(--joyedu-text-secondary)]">Attendance</div>
                            <div className="font-medium text-[var(--joyedu-success)]">{child.attendance}</div>
                          </div>
                          <div>
                            <div className="text-[var(--joyedu-text-secondary)]">GPA</div>
                            <div className="font-medium">{child.gpa}</div>
                          </div>
                          <div>
                            <div className="text-[var(--joyedu-text-secondary)]">Status</div>
                            <div className="font-medium text-[var(--joyedu-success)]">Good</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle>Quick Actions</CardTitle>
                  <div className="space-y-3">
                    <Link href="/school/attendance" className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                      <div className="text-2xl">📅</div>
                      <div className="font-medium">View Attendance</div>
                    </Link>
                    <Link href="/school/grades" className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                      <div className="text-2xl">📊</div>
                      <div className="font-medium">Check Grades</div>
                    </Link>
                    <Link href="/school/finance" className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                      <div className="text-2xl">💰</div>
                      <div className="font-medium">Pay Fees</div>
                    </Link>
                    <Link href="/school/communication" className="flex items-center gap-3 p-3 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] hover:bg-[var(--joyedu-primary-subtle)] transition">
                      <div className="text-2xl">💬</div>
                      <div className="font-medium">Messages</div>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </div>

            <Card>
              <CardBody>
                <CardTitle>Recent Notifications</CardTitle>
                <div className="space-y-3">
                  {[
                    { message: 'Emma scored 95% on Math quiz', time: 'Today', type: 'academic' },
                    { message: 'Parent-teacher conference scheduled', time: 'Yesterday', type: 'meeting' },
                    { message: 'Jake submitted science project', time: '2 days ago', type: 'assignment' },
                    { message: 'Fee payment receipt available', time: '3 days ago', type: 'finance' },
                  ].map((notification) => (
                    <div key={notification.message} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                      <span className={`w-2 h-2 rounded-full ${
                        notification.type === 'academic' ? 'bg-blue-500' :
                        notification.type === 'meeting' ? 'bg-purple-500' :
                        notification.type === 'assignment' ? 'bg-green-500' : 'bg-orange-500'
                      }`}></span>
                      <div className="flex-1">
                        <div className="font-medium">{notification.message}</div>
                        <div className="text-sm text-gray-600">{notification.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </>
        )}
      </DashboardLayout>
    );
  }

  // Default fallback
  return (
    <DashboardLayout actor="school" userName={schoolName}>
      <Card>
        <CardBody>
          <p className="text-gray-600">Role not recognized. Please contact administrator.</p>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}