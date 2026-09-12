'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getEnrollmentsByUser, getCourses } from '@/data/mockData';

export default function SchoolStudentDashboard() {
  const router = useRouter();
  const { currentUser } = useAuth();
  
  // Get JoyEdu enrollments for this student
  const joyEduEnrollments = currentUser ? getEnrollmentsByUser(currentUser.id) : [];
  const allCourses = getCourses();
  const enrolledCourses = joyEduEnrollments.map(enrollment => ({
    ...enrollment,
    course: allCourses.find(c => c.id === enrollment.courseId),
  })).filter(e => e.course);

  return (
    <DashboardLayout actor="student" userName="Kapi" studentType="school">
      {/* Welcome Section with School Context */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Good morning, Kapi</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <span className="font-medium">Grade 10 • Section A</span>
          <span>•</span>
          <span>Springfield Academy</span>
          <span>•</span>
          <span>Academic Year 2026/27</span>
        </div>
        <p className="text-gray-600">Continue your learning journey across school curriculum and JoyEdu courses.</p>
      </div>

      {/* School Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">94%</div>
                <div className="text-blue-100 text-sm">Attendance</div>
              </div>
              <div className="text-4xl opacity-80">📅</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">87%</div>
                <div className="text-green-100 text-sm">Average</div>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">8</div>
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
                <div className="text-3xl font-bold mb-1">12 days</div>
                <div className="text-orange-100 text-sm">Streak</div>
              </div>
              <div className="text-4xl opacity-80">🔥</div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Timetable */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-6">
                <CardTitle>Today's Timetable</CardTitle>
                <Link href="/student/timetable" className="text-blue-600 hover:underline text-sm font-medium">
                  Full timetable →
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { 
                    time: '8:00 - 9:00',
                    subject: 'Mathematics',
                    teacher: 'Mr. Johnson',
                    room: 'Room 101',
                    status: 'completed',
                    icon: '📐'
                  },
                  { 
                    time: '9:15 - 10:15',
                    subject: 'English',
                    teacher: 'Ms. Williams',
                    room: 'Room 205',
                    status: 'completed',
                    icon: '📖'
                  },
                  { 
                    time: '10:30 - 11:30',
                    subject: 'Science',
                    teacher: 'Dr. Brown',
                    room: 'Lab 3',
                    status: 'current',
                    icon: '🔬'
                  },
                  { 
                    time: '11:45 - 12:45',
                    subject: 'Computer Science',
                    teacher: 'Mr. Davis',
                    room: 'Computer Lab',
                    status: 'upcoming',
                    icon: '💻'
                  },
                  { 
                    time: '1:30 - 2:30',
                    subject: 'History',
                    teacher: 'Mrs. Miller',
                    room: 'Room 302',
                    status: 'upcoming',
                    icon: '🏛️'
                  },
                ].map((period) => (
                  <div 
                    key={period.time}
                    className={`flex items-center gap-4 p-4 border rounded-lg ${
                      period.status === 'current' 
                        ? 'border-blue-500 bg-blue-50' 
                        : period.status === 'completed'
                        ? 'border-gray-200 bg-gray-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="text-2xl">{period.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{period.subject}</div>
                      <div className="text-sm text-gray-600">{period.teacher} • {period.room}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{period.time}</div>
                      <div className={`text-xs ${
                        period.status === 'current' 
                          ? 'text-blue-600 font-medium' 
                          : period.status === 'completed'
                          ? 'text-gray-500'
                          : 'text-gray-500'
                      }`}>
                        {period.status === 'current' ? 'In Progress' : 
                         period.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* JoyEdu Learning Integration */}
        <div className="lg:col-span-1">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>JoyEdu Courses</CardTitle>
                <Link href="/student/learning" className="text-blue-600 hover:underline text-sm font-medium">
                  View all →
                </Link>
              </div>
              
              {enrolledCourses.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <div className="text-4xl mb-2">📚</div>
                  <p className="text-sm">No JoyEdu courses yet</p>
                  <Link href="/guest/courses" className="inline-block mt-2 text-blue-600 hover:underline text-sm">
                    Browse courses
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {enrolledCourses.slice(0, 3).map((enrollment) => (
                    <Link
                      key={enrollment.id}
                      href={`/student/learning/player/${enrollment.courseId}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{enrollment.course?.thumbnail}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">
                            {enrollment.course?.title}
                          </p>
                          <div className="mt-2">
                            <ProgressBar progress={enrollment.progress} />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{enrollment.progress}% complete</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Assignments Due */}
        <div>
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-6">
                <CardTitle>Assignments Due</CardTitle>
                <Link href="/student/assignments" className="text-blue-600 hover:underline text-sm font-medium">
                  View all →
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { 
                    title: 'Math Problem Set', 
                    subject: 'Mathematics',
                    deadline: 'Tomorrow',
                    status: 'pending',
                    icon: '📐'
                  },
                  { 
                    title: 'English Essay', 
                    subject: 'English',
                    deadline: 'Sep 10',
                    status: 'pending',
                    icon: '📖'
                  },
                  { 
                    title: 'Science Lab Report', 
                    subject: 'Science',
                    deadline: 'Sep 12',
                    status: 'in_progress',
                    icon: '🔬'
                  },
                  { 
                    title: 'History Project', 
                    subject: 'History',
                    deadline: 'Sep 15',
                    status: 'pending',
                    icon: '🏛️'
                  },
                ].map((assignment) => (
                  <Link 
                    key={assignment.title}
                    href="/student/assignments"
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <div className="text-2xl">{assignment.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{assignment.title}</div>
                      <div className="text-xs text-gray-600">{assignment.subject}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{assignment.deadline}</div>
                      <div className={`text-xs ${
                        assignment.status === 'in_progress' ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {assignment.status === 'in_progress' ? 'In Progress' : 'Due Soon'}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Exams */}
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-6">
              <CardTitle>Upcoming Exams</CardTitle>
              <Link href="/student/exams" className="text-blue-600 hover:underline text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { 
                  subject: 'Mathematics',
                  topic: 'Algebra & Functions',
                  date: 'Sep 20',
                  time: '9:00 AM',
                  duration: '2 hours',
                  icon: '📐'
                },
                { 
                  subject: 'Science',
                  topic: 'Physics: Forces',
                  date: 'Sep 25',
                  time: '10:30 AM',
                  duration: '1.5 hours',
                  icon: '🔬'
                },
                { 
                  subject: 'English',
                  topic: 'Literature Analysis',
                  date: 'Oct 2',
                  time: '8:00 AM',
                  duration: '2 hours',
                  icon: '📖'
                },
              ].map((exam) => (
                <Link 
                  key={exam.subject}
                  href="/student/exams"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="text-2xl">{exam.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{exam.subject}</div>
                    <div className="text-xs text-gray-600">{exam.topic}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{exam.date} • {exam.time}</div>
                    <div className="text-xs text-gray-500">{exam.duration}</div>
                  </div>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-6">
              <CardTitle>Recent Grades</CardTitle>
              <Link href="/student/grades" className="text-blue-600 hover:underline text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { 
                  subject: 'Mathematics',
                  assessment: 'Chapter 5 Quiz',
                  grade: '92%',
                  date: 'Sep 5',
                  icon: '📐',
                  color: 'green'
                },
                { 
                  subject: 'English',
                  assessment: 'Essay: Modern Literature',
                  grade: '88%',
                  date: 'Sep 3',
                  icon: '📖',
                  color: 'green'
                },
                { 
                  subject: 'Science',
                  assessment: 'Lab Report: Chemical Reactions',
                  grade: '95%',
                  date: 'Aug 30',
                  icon: '🔬',
                  color: 'green'
                },
                { 
                  subject: 'Computer Science',
                  assessment: 'Programming Project',
                  grade: '85%',
                  date: 'Aug 28',
                  icon: '💻',
                  color: 'green'
                },
              ].map((grade) => (
                <div key={grade.subject} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{grade.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{grade.subject}</div>
                    <div className="text-xs text-gray-600">{grade.assessment}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">{grade.grade}</div>
                    <div className="text-xs text-gray-500">{grade.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* School Announcements & Teacher Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* School Announcements */}
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-6">
              <CardTitle>School Announcements</CardTitle>
              <Link href="/student/school/announcements" className="text-blue-600 hover:underline text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { 
                  title: 'Parent-Teacher Conference',
                  date: 'Sep 15-16',
                  priority: 'high',
                  content: 'Sign up for parent-teacher conferences for the fall semester.',
                  icon: '📢'
                },
                { 
                  title: 'School Sports Day',
                  date: 'Sep 22',
                  priority: 'medium',
                  content: 'Annual sports day event. All students encouraged to participate.',
                  icon: '🏃'
                },
                { 
                  title: 'Library Book Fair',
                  date: 'Sep 25-27',
                  priority: 'low',
                  content: 'Annual book fair in the school library. Great selection available.',
                  icon: '📚'
                },
              ].map((announcement) => (
                <div 
                  key={announcement.title}
                  className={`p-3 border-l-4 rounded-r-lg ${
                    announcement.priority === 'high' 
                      ? 'border-red-500 bg-red-50' 
                      : announcement.priority === 'medium'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-xl">{announcement.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{announcement.title}</div>
                      <div className="text-xs text-gray-600 mb-1">{announcement.date}</div>
                      <div className="text-sm text-gray-700">{announcement.content}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Teacher Messages */}
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-6">
              <CardTitle>Teacher Messages</CardTitle>
              <Link href="/student/messages" className="text-blue-600 hover:underline text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { 
                  teacher: 'Mr. Johnson',
                  subject: 'Mathematics',
                  message: 'Great progress on the algebra assignments. Keep up the good work!',
                  time: '2 hours ago',
                  icon: '👨‍🏫'
                },
                { 
                  teacher: 'Ms. Williams',
                  subject: 'English',
                  message: 'Please remember to submit your essay draft by Friday for review.',
                  time: 'Yesterday',
                  icon: '👩‍🏫'
                },
                { 
                  teacher: 'Dr. Brown',
                  subject: 'Science',
                  message: 'Lab report guidelines have been posted. Check the portal for details.',
                  time: '2 days ago',
                  icon: '👨‍🔬'
                },
              ].map((message) => (
                <Link 
                  key={message.teacher}
                  href="/student/messages"
                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="text-xl">{message.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{message.teacher}</div>
                    <div className="text-xs text-gray-600 mb-1">{message.subject} • {message.time}</div>
                    <div className="text-sm text-gray-700">{message.message}</div>
                  </div>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Continue Learning (JoyEdu Integration) */}
      <Card className="mb-8">
        <CardBody>
          <div className="flex items-center justify-between mb-6">
            <CardTitle>Continue Learning (JoyEdu)</CardTitle>
            <Link href="/student/learning" className="text-blue-600 hover:underline text-sm font-medium">
              View all courses →
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { 
                title: 'JavaScript Fundamentals', 
                chapter: 'Chapter 4 → Functions → Arrow Functions',
                progress: 78,
                image: '🟨',
                lastActivity: '2 hours ago',
                timeLeft: '2h 30m'
              },
              { 
                title: 'React Development', 
                chapter: 'Chapter 3 → State Management → useState',
                progress: 45,
                image: '⚛️',
                lastActivity: 'Yesterday',
                timeLeft: '5h 15m'
              },
            ].map((course) => (
              <div 
                key={course.title}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group cursor-pointer"
                onClick={() => router.push('/student/learning')}
              >
                <div className="text-3xl group-hover:scale-110 transition">{course.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.chapter}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>⏱️ {course.timeLeft} remaining</span>
                    <span>🕐 {course.lastActivity}</span>
                  </div>
                </div>
                <div className="text-right min-w-[100px]">
                  <div className="text-sm font-medium text-blue-600 mb-1">{course.progress}%</div>
                  <ProgressBar progress={course.progress} />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push('/student/learning');
                    }}
                    className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Achievements (Shared Gaming System) */}
      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-6">
            <CardTitle>Achievements</CardTitle>
            <Link href="/student/achievements" className="text-blue-600 hover:underline text-sm font-medium">
              View all achievements →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Level & XP */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-purple-700 font-medium">Level 18</span>
                <span className="text-2xl">⭐</span>
              </div>
              <div className="text-2xl font-bold text-purple-900 mb-2">4,820 XP</div>
              <ProgressBar progress={78} color="purple" />
              <div className="text-xs text-purple-600 mt-1">780 XP to Level 19</div>
            </div>

            {/* Streak */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-orange-700 font-medium">Current Streak</span>
                <span className="text-2xl">🔥</span>
              </div>
              <div className="text-2xl font-bold text-orange-900 mb-2">12 Days</div>
              <div className="text-xs text-orange-600">Personal best: 21 days</div>
            </div>

            {/* Badges */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-yellow-700 font-medium">Badges Earned</span>
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-2xl font-bold text-yellow-900 mb-2">24</div>
              <div className="flex gap-1 mt-2">
                <span className="text-xl">🎯</span>
                <span className="text-xl">🚀</span>
                <span className="text-xl">💡</span>
                <span className="text-xl">⚡</span>
                <span className="text-xl">+20</span>
              </div>
            </div>

            {/* Total Achievements */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-green-700 font-medium">Achievements</span>
                <span className="text-2xl">🎖️</span>
              </div>
              <div className="text-2xl font-bold text-green-900 mb-2">86</div>
              <ProgressBar progress={68} color="green" />
              <div className="text-xs text-green-600 mt-1">40 achievements remaining</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}