'use client';

import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { mockSchools, mockTeachers, mockClasses, mockStudents, mockAssignments } from '@/data/mockData';

export default function TeacherDashboard({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const currentPersona = searchParams.get('persona') || 'persona-teacher';

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];
  const teacher = mockTeachers.find(t => t.id === 'teacher-1') || mockTeachers[0];
  const myClasses = mockClasses.filter(c => teacher.classes.includes(c.id));
  const myStudents = mockStudents.filter(s => myClasses.some(c => c.id === s.classId));
  const myAssignments = mockAssignments.filter(a => a.teacherId === teacher.id);

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600">Welcome back, {teacher.firstName} {teacher.lastName} • {school.name}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600 mb-1">My Classes</div>
            <div className="text-3xl font-bold text-gray-900">{myClasses.length}</div>
            <div className="text-sm text-gray-600 mt-1">Grade 10-12</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600 mb-1">My Students</div>
            <div className="text-3xl font-bold text-gray-900">{myStudents.length}</div>
            <div className="text-sm text-blue-600 mt-1">Across all classes</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600 mb-1">Pending Grading</div>
            <div className="text-3xl font-bold text-gray-900">{myAssignments.length * 28}</div>
            <div className="text-sm text-orange-600 mt-1">Assignments</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600 mb-1">Class Attendance</div>
            <div className="text-3xl font-bold text-gray-900">92.5%</div>
            <div className="text-sm text-green-600 mt-1">This week</div>
          </CardBody>
        </Card>
      </div>

      {/* My Classes */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>My Classes</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {myClasses.map(cls => (
              <Link key={cls.id} href={`/school/${schoolSlug}/teachers/${teacher.id}?persona=${currentPersona}`}>
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition cursor-pointer">
                  <div className="font-semibold text-gray-900">Grade {cls.grade}{cls.section} {teacher.subjects[0]}</div>
                  <div className="text-sm text-gray-600 mt-1">{cls.currentStudents} students • Room {cls.room}</div>
                  <div className="text-sm text-blue-600 mt-2">Next: 8:00 AM Today</div>
                </div>
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <CardTitle>Quick Actions</CardTitle>
            <div className="space-y-2 mt-4">
              <Link href={`/school/${schoolSlug}/teachers/${teacher.id}?persona=${currentPersona}`}>
                <Button className="w-full text-left justify-start">👤 View My Profile</Button>
              </Link>
              <Button className="w-full text-left justify-start">📝 Take Attendance</Button>
              <Button className="w-full text-left justify-start">📚 Create Assignment</Button>
              <Button className="w-full text-left justify-start">📊 Enter Grades</Button>
              <Button className="w-full text-left justify-start">📧 Send Announcement</Button>
              <Button className="w-full text-left justify-start">📖 View Curriculum</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Pending Tasks</CardTitle>
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium">Grade 10A Quiz Results</div>
                  <div className="text-sm text-gray-600">Due: Today</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium">Grade 11B Homework Grading</div>
                  <div className="text-sm text-gray-600">Due: Tomorrow</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium">Update Lesson Plans</div>
                  <div className="text-sm text-gray-600">Due: Friday</div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </SchoolShell>
  );
}
