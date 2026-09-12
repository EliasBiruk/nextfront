'use client';

import { useState } from 'react';
import { use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { mockSchools, mockTeachers, mockSubjects, mockStudents, getClassById, updateClass, getStudentsByClass, timetableSlots, attendanceRecords } from '@/data/mockData';

export default function ClassDetail({ params }: { params: Promise<{ schoolSlug: string; classId: string }> }) {
  const { schoolSlug, classId } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';

  const [classData, setClassData] = useState(getClassById(classId));
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!classData) {
    return (
      <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Class Not Found</h3>
              <p className="text-gray-600 mb-4">The class you're looking for doesn't exist.</p>
              <Link href={`/school/${schoolSlug}/classes?persona=${currentPersona}`}>
                <Button>← Back to Classes</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </SchoolShell>
    );
  }

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];
  const classTeacher = mockTeachers.find(t => t.id === classData.classTeacherId);
  const classSubjects = classData.subjectIds.map(id => mockSubjects.find(s => s.id === id)).filter(Boolean);
  const classStudents = getStudentsByClass(classData.id);

  const handleArchive = async () => {
    if (confirm(`Are you sure you want to archive Grade ${classData.grade}${classData.section}?`)) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        updateClass(classData.id, { status: 'Archived' });
        setClassData({ ...classData, status: 'Archived' });
        setSuccessMessage('Class archived successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrorMessage('Failed to archive class. Please try again.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/school/${schoolSlug}/classes?persona=${currentPersona}&edit=${classData.id}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'students', label: 'Students' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'teacher', label: 'Class Teacher' },
    { id: 'timetable', label: 'Timetable' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'exams', label: 'Exams' },
    { id: 'gradebook', label: 'Gradebook' },
  ];

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Class Detail</h1>
          <Link href={`/school/${schoolSlug}/classes?persona=${currentPersona}`}>
            <Button size="sm">← Back to Classes</Button>
          </Link>
        </div>
        <p className="text-gray-600">Grade {classData.grade}{classData.section} • {school.name}</p>
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

      {/* Class Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardBody>
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                🏫
              </div>
              <h2 className="text-xl font-bold text-gray-900">Grade {classData.grade}{classData.section}</h2>
              <p className="text-gray-600">Room {classData.room}</p>
              <div className="mt-4 space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Academic Year:</span>
                  <span className="font-medium">{classData.academicYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">{classData.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Enrolled:</span>
                  <span className="font-medium">{classData.currentStudents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-medium">{classData.capacity - classData.currentStudents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    classData.status === 'Active' ? 'bg-green-100 text-green-800' :
                    classData.status === 'Archived' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {classData.status}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button className="flex-1" onClick={handleEdit} disabled={isLoading}>Edit Class</Button>
                <Button className="flex-1">View Timetable</Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardBody>
            <CardTitle>Class Information</CardTitle>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm text-gray-600">Grade</label>
                <div className="font-medium">{classData.grade}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Section</label>
                <div className="font-medium">{classData.section}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Room Number</label>
                <div className="font-medium">{classData.room}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Academic Year</label>
                <div className="font-medium">{classData.academicYear}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Total Capacity</label>
                <div className="font-medium">{classData.capacity} students</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Current Enrollment</label>
                <div className="font-medium">{classData.currentStudents} students</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Enrollment Rate</label>
                <div className="font-medium">
                  {((classData.currentStudents / classData.capacity) * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Subjects</label>
                <div className="font-medium">{classSubjects.length} subjects</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Tab Navigation */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Tab Content */}
      <Card>
        <CardBody>
          {activeTab === 'overview' && (
            <div>
              <CardTitle>Overview</CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{classStudents.length}</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{classSubjects.length}</div>
                  <div className="text-sm text-gray-600">Subjects</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{classTeacher ? '1' : '0'}</div>
                  <div className="text-sm text-gray-600">Class Teacher</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div>
              <CardTitle>Class Students</CardTitle>
              <div className="space-y-3 mt-4">
                {classStudents.length > 0 ? (
                  classStudents.map(student => (
                    <Link key={student.id} href={`/school/${schoolSlug}/students/${student.id}?persona=${currentPersona}`}>
                      <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                          {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{student.firstName} {student.lastName}</div>
                          <div className="text-sm text-gray-600">Roll: {student.rollNumber} • GPA: {student.gpa}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Attendance: {student.attendanceRate}%
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No students enrolled in this class</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div>
              <CardTitle>Class Subjects</CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {classSubjects.length > 0 ? (
                  classSubjects.map((subject: any) => (
                    <div key={subject.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm text-gray-600">{subject.department}</div>
                      <div className="text-sm text-gray-500 mt-2">{subject.description}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8 col-span-2">No subjects assigned to this class</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'teacher' && (
            <div>
              <CardTitle>Class Teacher</CardTitle>
              {classTeacher ? (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                      {classTeacher.firstName.charAt(0)}{classTeacher.lastName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-lg">{classTeacher.firstName} {classTeacher.lastName}</div>
                      <div className="text-sm text-gray-600">{classTeacher.position} • {classTeacher.department}</div>
                      <div className="text-sm text-gray-500">{classTeacher.email}</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Employee ID</label>
                      <div className="font-medium">{classTeacher.employeeId}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Experience</label>
                      <div className="font-medium">{classTeacher.experience} years</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Qualification</label>
                      <div className="font-medium">{classTeacher.qualification}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Employment Type</label>
                      <div className="font-medium">{classTeacher.employmentType}</div>
                    </div>
                  </div>
                  <Link href={`/school/${schoolSlug}/teachers/${classTeacher.id}?persona=${currentPersona}`}>
                    <Button className="mt-4">View Full Profile</Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">No class teacher assigned</div>
              )}
            </div>
          )}

          {activeTab === 'timetable' && (
            <div>
              <CardTitle>Weekly Timetable</CardTitle>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Period</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Monday</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Tuesday</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Wednesday</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Thursday</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Friday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetableSlots.map((slot: any) => {
                      const mondayEntry = classData.timetable.find((t: any) => t.day === 'Monday' && t.period === slot.period);
                      const tuesdayEntry = classData.timetable.find((t: any) => t.day === 'Tuesday' && t.period === slot.period);
                      const wednesdayEntry = classData.timetable.find((t: any) => t.day === 'Wednesday' && t.period === slot.period);
                      const thursdayEntry = classData.timetable.find((t: any) => t.day === 'Thursday' && t.period === slot.period);
                      const fridayEntry = classData.timetable.find((t: any) => t.day === 'Friday' && t.period === slot.period);

                      const renderEntry = (entry: any) => {
                        if (!entry) return <span className="text-gray-400">-</span>;
                        const subject = mockSubjects.find(s => s.id === entry.subjectId);
                        const teacher = mockTeachers.find(t => t.id === entry.teacherId);
                        return (
                          <div>
                            <div className="font-medium text-sm">{subject?.name || 'Unknown'}</div>
                            <div className="text-xs text-gray-500">{teacher?.firstName} {teacher?.lastName}</div>
                          </div>
                        );
                      };

                      return (
                        <tr key={slot.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-700">Period {slot.period}</td>
                          <td className="py-3 px-4 text-gray-700">{slot.startTime} - {slot.endTime}</td>
                          <td className="py-3 px-4">{renderEntry(mondayEntry)}</td>
                          <td className="py-3 px-4">{renderEntry(tuesdayEntry)}</td>
                          <td className="py-3 px-4">{renderEntry(wednesdayEntry)}</td>
                          <td className="py-3 px-4">{renderEntry(thursdayEntry)}</td>
                          <td className="py-3 px-4">{renderEntry(fridayEntry)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <CardTitle>Attendance Records</CardTitle>
              <div className="space-y-3 mt-4">
                {classStudents.length > 0 ? (
                  classStudents.map(student => {
                    const studentAttendance = attendanceRecords.filter(a => a.studentId === student.id && a.classId === classData.id);
                    const presentCount = studentAttendance.filter(a => a.status === 'Present').length;
                    const attendanceRate = studentAttendance.length > 0 ? (presentCount / studentAttendance.length) * 100 : 0;
                    return (
                      <div key={student.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                          {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{student.firstName} {student.lastName}</div>
                          <div className="text-sm text-gray-600">Roll: {student.rollNumber}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{presentCount}/{studentAttendance.length} present</div>
                          <div className={`text-sm ${attendanceRate >= 90 ? 'text-green-600' : attendanceRate >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {attendanceRate.toFixed(0)}% attendance
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-gray-500 py-8">No students in this class</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div>
              <CardTitle>Class Assignments</CardTitle>
              <div className="text-center text-gray-500 py-8">Assignments feature coming soon</div>
            </div>
          )}

          {activeTab === 'exams' && (
            <div>
              <CardTitle>Class Exams</CardTitle>
              <div className="text-center text-gray-500 py-8">Exams feature coming soon</div>
            </div>
          )}

          {activeTab === 'gradebook' && (
            <div>
              <CardTitle>Class Gradebook</CardTitle>
              <div className="text-center text-gray-500 py-8">Gradebook feature coming soon</div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardBody>
          <CardTitle>Quick Actions</CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <Button>📊 View Attendance</Button>
            <Button>📝 Create Assignment</Button>
            <Button>🎓 Add Student</Button>
            <Button>📅 Schedule Exam</Button>
            <Button>👨‍🏫 Assign Teacher</Button>
            <Button>📖 Add Subject</Button>
            <Button>📄 View Reports</Button>
            <Button onClick={handleArchive} disabled={isLoading}>🗑️ Archive Class</Button>
          </div>
        </CardBody>
      </Card>
    </SchoolShell>
  );
}
