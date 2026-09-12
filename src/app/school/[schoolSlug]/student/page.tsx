'use client';

import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { mockSchools, mockStudents, mockSubjects, mockAssignments, mockGrades } from '@/data/mockData';

export default function SchoolStudentDashboard({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const currentPersona = searchParams.get('persona') || 'persona-school-student';

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];
  const student = mockStudents.find(s => s.id === 'student-1') || mockStudents[0];
  const studentGrades = mockGrades.filter(g => g.studentId === student.id);
  const studentAssignments = mockAssignments.filter(a => a.classId === student.classId);

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
        <p className="text-gray-600">Grade {student.grade}{student.section} • {school.name}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600 mb-1">Overall GPA</div>
            <div className="text-3xl font-bold text-gray-900">{student.gpa}</div>
            <div className="text-sm text-green-600 mt-1">Top 10%</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600 mb-1">Attendance</div>
            <div className="text-3xl font-bold text-gray-900">{student.attendanceRate}%</div>
            <div className="text-sm text-green-600 mt-1">Excellent</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600 mb-1">Pending Assignments</div>
            <div className="text-3xl font-bold text-gray-900">{studentAssignments.length}</div>
            <div className="text-sm text-orange-600 mt-1">Due this week</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-sm text-gray-600 mb-1">Achievements</div>
            <div className="text-3xl font-bold text-gray-900">12</div>
            <div className="text-sm text-blue-600 mt-1">Badges earned</div>
          </CardBody>
        </Card>
      </div>

      {/* My Subjects */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>My Subjects</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {mockSubjects.map(subject => {
              const grade = studentGrades.find(g => g.subjectId === subject.id);
              return (
                <div key={subject.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">{subject.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{subject.department}</div>
                  <div className="text-sm text-green-600 mt-2">Grade: {grade?.grade || 'N/A'}</div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <CardTitle>Quick Access</CardTitle>
            <div className="space-y-2 mt-4">
              <Button className="w-full text-left justify-start">📚 View Assignments</Button>
              <Button className="w-full text-left justify-start">📊 View Grades</Button>
              <Button className="w-full text-left justify-start">📅 View Timetable</Button>
              <Button className="w-full text-left justify-start">📖 Access Learning Materials</Button>
              <Button className="w-full text-left justify-start">🎮 JoyEdu Playground</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <div className="space-y-3 mt-4">
              {studentAssignments.map(assignment => (
                <div key={assignment.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">{assignment.title}</div>
                    <div className="text-sm text-gray-600">Due: {assignment.dueDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </SchoolShell>
  );
}
