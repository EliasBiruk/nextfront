'use client';

import { useState } from 'react';
import { use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { mockSchools, mockClasses, mockGuardians, mockGrades, mockAttendance, mockFees, mockTeachers, mockSubjects, getStudentById, updateStudent } from '@/data/mockData';

export default function StudentProfile({ params }: { params: Promise<{ schoolSlug: string; studentId: string }> }) {
  const { schoolSlug, studentId } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';

  const [student, setStudent] = useState(getStudentById(studentId));
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!student) {
    return (
      <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Not Found</h3>
              <p className="text-gray-600 mb-4">The student you're looking for doesn't exist.</p>
              <Link href={`/school/${schoolSlug}/students?persona=${currentPersona}`}>
                <Button>← Back to Students</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </SchoolShell>
    );
  }

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];
  const studentClass = mockClasses.find(c => c.id === student.classId);
  const guardian = mockGuardians.find(g => g.id === student.guardianId);
  const studentGrades = mockGrades.filter(g => g.studentId === student.id);
  const studentAttendance = mockAttendance.filter(a => a.studentId === student.id);
  const studentFees = mockFees.filter(f => f.studentId === student.id);
  const classTeacher = studentClass ? mockTeachers.find(t => t.id === studentClass.classTeacherId) : null;
  const classSubjects = studentClass ? studentClass.subjectIds.map((id: string) => mockSubjects.find(s => s.id === id)).filter(Boolean) : [];

  const handleArchive = async () => {
    if (confirm(`Are you sure you want to archive ${student.firstName} ${student.lastName}?`)) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        updateStudent(student.id, { status: 'Archived' });
        setStudent({ ...student, status: 'Archived' });
        setSuccessMessage('Student archived successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrorMessage('Failed to archive student. Please try again.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    // Navigate to the list page with edit mode
    router.push(`/school/${schoolSlug}/students?persona=${currentPersona}&edit=${student.id}`);
  };

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
          <Link href={`/school/${schoolSlug}/students?persona=${currentPersona}`}>
            <Button size="sm">← Back to Students</Button>
          </Link>
        </div>
        <p className="text-gray-600">{student.firstName} {student.lastName} • {school.name}</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Student Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardBody>
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{student.firstName} {student.lastName}</h2>
              <p className="text-gray-600">Roll Number: {student.rollNumber}</p>
              <div className="mt-4 space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-medium">{student.grade}{student.section}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GPA:</span>
                  <span className="font-medium">{student.gpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Attendance:</span>
                  <span className="font-medium">{student.attendanceRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.status === 'Active' ? 'bg-green-100 text-green-800' :
                    student.status === 'Archived' ? 'bg-gray-100 text-gray-800' :
                    student.status === 'Graduated' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {student.status}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button className="flex-1" onClick={handleEdit} disabled={isLoading}>Edit Profile</Button>
                <Button className="flex-1">View Documents</Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardBody>
            <CardTitle>Personal Information</CardTitle>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm text-gray-600">Date of Birth</label>
                <div className="font-medium">{student.dateOfBirth}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Gender</label>
                <div className="font-medium">{student.gender}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <div className="font-medium">{student.email}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <div className="font-medium">{student.phone}</div>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600">Address</label>
                <div className="font-medium">{student.address}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Enrollment Date</label>
                <div className="font-medium">{student.enrollmentDate}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Class</label>
                <div className="font-medium">Grade {studentClass?.grade}{studentClass?.section} • Room {studentClass?.room}</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Class Information */}
      {studentClass && (
        <Card className="mb-8">
          <CardBody>
            <CardTitle>Class Information</CardTitle>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm text-gray-600">Class</label>
                <div className="font-medium">Grade {studentClass.grade}{studentClass.section}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Room</label>
                <div className="font-medium">{studentClass.room}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Academic Year</label>
                <div className="font-medium">{studentClass.academicYear}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Class Teacher</label>
                <div className="font-medium">
                  {classTeacher ? `${classTeacher.firstName} ${classTeacher.lastName}` : 'Not assigned'}
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600">Subjects</label>
                <div className="font-medium">
                  {classSubjects.length > 0 ? classSubjects.map((s: any) => s.name).join(', ') : 'No subjects'}
                </div>
              </div>
            </div>
            {classTeacher && (
              <Link href={`/school/${schoolSlug}/teachers/${classTeacher.id}?persona=${currentPersona}`}>
                <Button className="mt-4">View Class Teacher Profile</Button>
              </Link>
            )}
          </CardBody>
        </Card>
      )}
      {guardian ? (
        <Card className="mb-8">
          <CardBody>
            <CardTitle>Guardian Information</CardTitle>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <div className="font-medium">{guardian.firstName} {guardian.lastName}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Relationship</label>
                <div className="font-medium">{guardian.relationship}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <div className="font-medium">{guardian.email}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <div className="font-medium">{guardian.phone}</div>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600">Address</label>
                <div className="font-medium">{guardian.address}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Occupation</label>
                <div className="font-medium">{guardian.occupation}</div>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardBody>
            <CardTitle>Guardian Information</CardTitle>
            <div className="text-center text-gray-500 py-8">No guardian information available</div>
          </CardBody>
        </Card>
      )}

      {/* Academic Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardBody>
            <CardTitle>Academic Performance</CardTitle>
            <div className="space-y-3 mt-4">
              {studentGrades.length > 0 ? (
                studentGrades.map(grade => (
                  <div key={grade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Assignment</div>
                      <div className="text-sm text-gray-600">Score: {grade.score}/{grade.totalPoints}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{grade.grade}</div>
                      <div className="text-sm text-gray-600">{grade.percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">No grades recorded yet</div>
              )}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle>Fee Status</CardTitle>
            <div className="space-y-3 mt-4">
              {studentFees.length > 0 ? (
                studentFees.map(fee => (
                  <div key={fee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Academic Year {fee.academicYear}</div>
                      <div className="text-sm text-gray-600">Total: ${fee.totalAmount.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${
                        fee.status === 'Paid' ? 'text-green-600' : fee.status === 'Partial' ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        ${fee.balance.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">{fee.status}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">No fee records found</div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardBody>
          <CardTitle>Quick Actions</CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <Button>📊 View Grades</Button>
            <Button>📅 View Attendance</Button>
            <Button>📝 View Assignments</Button>
            <Button>💰 View Fees</Button>
            <Button>📧 Contact Guardian</Button>
            <Button>📖 View Timetable</Button>
            <Button>📄 View Documents</Button>
            <Button onClick={handleArchive} disabled={isLoading}>🗑️ Archive Student</Button>
          </div>
        </CardBody>
      </Card>
    </SchoolShell>
  );
}
