'use client';

import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { mockSchools, mockStudents, mockTeachers, mockAnnouncements } from '@/data/mockData';

export default function SchoolAdminDashboard({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];
  const schoolStudents = mockStudents.filter(s => s.schoolId === school.id);
  const schoolTeachers = mockTeachers.filter(t => t.schoolId === school.id);
  const schoolAnnouncements = mockAnnouncements.filter(a => a.schoolId === school.id);

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">School Administration Dashboard</h1>
        <p className="text-gray-600">Complete control center for {school.name}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600 mb-1">Total Students</div>
            <div className="text-3xl font-bold text-gray-900">{school.currentEnrollment.toLocaleString()}</div>
            <div className="text-sm text-green-600 mt-1">+5.2% from last year</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600 mb-1">Total Teachers</div>
            <div className="text-3xl font-bold text-gray-900">{schoolTeachers.length}</div>
            <div className="text-sm text-blue-600 mt-1">12 new this term</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600 mb-1">Staff Members</div>
            <div className="text-3xl font-bold text-gray-900">89</div>
            <div className="text-sm text-gray-600 mt-1">Full-time</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600 mb-1">Attendance Rate</div>
            <div className="text-3xl font-bold text-gray-900">94.2%</div>
            <div className="text-sm text-green-600 mt-1">Above target</div>
          </CardBody>
        </Card>
      </div>

      {/* Main Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardBody>
            <CardTitle>Academics</CardTitle>
            <div className="space-y-2 mt-4">
              <Button className="w-full text-left justify-start">Academic Years</Button>
              <Button className="w-full text-left justify-start">Classes & Sections</Button>
              <Button className="w-full text-left justify-start">Subjects</Button>
              <Button className="w-full text-left justify-start">Curriculum</Button>
              <Button className="w-full text-left justify-start">Timetable</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>People</CardTitle>
            <div className="space-y-2 mt-4">
              <Link href={`/school/${schoolSlug}/students?persona=${currentPersona}`} className="block">
                <Button className="w-full text-left justify-start">Students ({schoolStudents.length})</Button>
              </Link>
              <Link href={`/school/${schoolSlug}/teachers?persona=${currentPersona}`} className="block">
                <Button className="w-full text-left justify-start">Teachers ({schoolTeachers.length})</Button>
              </Link>
              <Button className="w-full text-left justify-start">Staff (89)</Button>
              <Button className="w-full text-left justify-start">Guardians</Button>
              <Button className="w-full text-left justify-start">Administrators</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Academics</CardTitle>
            <div className="space-y-2 mt-4">
              <Link href={`/school/${schoolSlug}/classes?persona=${currentPersona}`} className="block">
                <Button className="w-full text-left justify-start">Classes</Button>
              </Link>
              <Button className="w-full text-left justify-start">Subjects</Button>
              <Button className="w-full text-left justify-start">Curriculum</Button>
              <Button className="w-full text-left justify-start">Timetable</Button>
              <Button className="w-full text-left justify-start">Academic Calendar</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Operations</CardTitle>
            <div className="space-y-2 mt-4">
              <Button className="w-full text-left justify-start">Finance</Button>
              <Button className="w-full text-left justify-start">HR</Button>
              <Button className="w-full text-left justify-start">Library</Button>
              <Button className="w-full text-left justify-start">Transport</Button>
              <Button className="w-full text-left justify-start">Inventory</Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardBody>
          <CardTitle>Recent Activity</CardTitle>
          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">📚</div>
              <div className="flex-1">
                <div className="font-medium">New enrollment: 45 students enrolled</div>
                <div className="text-sm text-gray-600">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">💰</div>
              <div className="flex-1">
                <div className="font-medium">Fee collection: $125,000 received</div>
                <div className="text-sm text-gray-600">5 hours ago</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">📝</div>
              <div className="flex-1">
                <div className="font-medium">Exam results published: Grade 10 Mathematics</div>
                <div className="text-sm text-gray-600">Yesterday</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Announcements */}
      <Card className="mt-8">
        <CardBody>
          <CardTitle>School Announcements</CardTitle>
          <div className="space-y-4 mt-4">
            {schoolAnnouncements.map(announcement => (
              <div key={announcement.id} className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium">{announcement.title}</div>
                <div className="text-sm text-gray-600 mt-1">{announcement.content}</div>
                <div className="text-xs text-gray-500 mt-2">
                  Target: {announcement.targetAudience} • {announcement.createdAt}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </SchoolShell>
  );
}
