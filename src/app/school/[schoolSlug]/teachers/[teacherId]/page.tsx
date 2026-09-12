'use client';

import { useState, use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { mockSchools, mockClasses, mockStudents, getTeacherById, updateTeacher, getStudentsByClass } from '@/data/mockData';

export default function TeacherProfile({ params }: { params: Promise<{ schoolSlug: string; teacherId: string }> }) {
  const { schoolSlug, teacherId } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';

  const [teacher, setTeacher] = useState(getTeacherById(teacherId));
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!teacher) {
    return (
      <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Teacher Not Found</h3>
              <p className="text-gray-600 mb-4">The teacher you're looking for doesn't exist.</p>
              <Link href={`/school/${schoolSlug}/teachers?persona=${currentPersona}`}>
                <Button>← Back to Teachers</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </SchoolShell>
    );
  }

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];
  const teacherClasses = mockClasses.filter(c => teacher.classes.includes(c.id));
  const teacherStudents = teacherClasses.flatMap(cls => getStudentsByClass(cls.id));

  const handleArchive = async () => {
    if (confirm(`Are you sure you want to archive ${teacher.firstName} ${teacher.lastName}?`)) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        updateTeacher(teacher.id, { status: 'Archived' });
        setTeacher({ ...teacher, status: 'Archived' });
        setSuccessMessage('Teacher archived successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrorMessage('Failed to archive teacher. Please try again.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/school/${schoolSlug}/teachers?persona=${currentPersona}&edit=${teacher.id}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'classes', label: 'Classes' },
    { id: 'students', label: 'Students' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'timetable', label: 'Timetable' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'exams', label: 'Exams' },
    { id: 'gradebook', label: 'Gradebook' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'leave', label: 'Leave' },
    { id: 'payroll', label: 'Payroll' },
    { id: 'documents', label: 'Documents' },
  ];

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Teacher Profile</h1>
          <Link href={`/school/${schoolSlug}/teachers?persona=${currentPersona}`}>
            <Button size="sm">← Back to Teachers</Button>
          </Link>
        </div>
        <p className="text-gray-600">{teacher.firstName} {teacher.lastName} • {school.name}</p>
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

      {/* Teacher Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardBody>
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{teacher.firstName} {teacher.lastName}</h2>
              <p className="text-gray-600">{teacher.position}</p>
              <p className="text-sm text-gray-500">{teacher.employeeId}</p>
              <div className="mt-4 space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium">{teacher.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{teacher.experience} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employment:</span>
                  <span className="font-medium">{teacher.employmentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    teacher.status === 'Active' ? 'bg-green-100 text-green-800' :
                    teacher.status === 'Archived' ? 'bg-gray-100 text-gray-800' :
                    teacher.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {teacher.status}
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
                <div className="font-medium">{teacher.dateOfBirth}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Gender</label>
                <div className="font-medium">{teacher.gender}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <div className="font-medium">{teacher.email}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <div className="font-medium">{teacher.phone}</div>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600">Address</label>
                <div className="font-medium">{teacher.address}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Join Date</label>
                <div className="font-medium">{teacher.joinDate}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Qualification</label>
                <div className="font-medium">{teacher.qualification}</div>
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
                  <div className="text-2xl font-bold text-blue-600">{teacherClasses.length}</div>
                  <div className="text-sm text-gray-600">Assigned Classes</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{teacherStudents.length}</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{teacher.subjects.length}</div>
                  <div className="text-sm text-gray-600">Subjects Taught</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'classes' && (
            <div>
              <CardTitle>Assigned Classes</CardTitle>
              <div className="space-y-3 mt-4">
                {teacherClasses.length > 0 ? (
                  teacherClasses.map(cls => (
                    <div key={cls.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium">Grade {cls.grade}{cls.section}</div>
                      <div className="text-sm text-gray-600">Room {cls.room} • {cls.currentStudents} students</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No classes assigned</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div>
              <CardTitle>My Students</CardTitle>
              <div className="space-y-3 mt-4">
                {teacherStudents.length > 0 ? (
                  teacherStudents.slice(0, 10).map(student => (
                    <div key={student.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                        {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{student.firstName} {student.lastName}</div>
                        <div className="text-sm text-gray-600">Grade {student.grade}{student.section} • GPA: {student.gpa}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No students found</div>
                )}
                {teacherStudents.length > 10 && (
                  <div className="text-center text-gray-500">
                    Showing 10 of {teacherStudents.length} students
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div>
              <CardTitle>Subjects Taught</CardTitle>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {teacher.subjects.map(subject => (
                  <div key={subject} className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">{subject}</div>
                    <div className="text-sm text-gray-600">{teacher.department}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'timetable' && (
            <div>
              <CardTitle>Weekly Timetable</CardTitle>
              <div className="text-center text-gray-500 py-8">Timetable feature coming soon</div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div>
              <CardTitle>Assignments</CardTitle>
              <div className="text-center text-gray-500 py-8">Assignments feature coming soon</div>
            </div>
          )}

          {activeTab === 'exams' && (
            <div>
              <CardTitle>Exams</CardTitle>
              <div className="text-center text-gray-500 py-8">Exams feature coming soon</div>
            </div>
          )}

          {activeTab === 'gradebook' && (
            <div>
              <CardTitle>Gradebook</CardTitle>
              <div className="text-center text-gray-500 py-8">Gradebook feature coming soon</div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <CardTitle>Attendance Records</CardTitle>
              <div className="text-center text-gray-500 py-8">Attendance feature coming soon</div>
            </div>
          )}

          {activeTab === 'leave' && (
            <div>
              <CardTitle>Leave Requests</CardTitle>
              <div className="text-center text-gray-500 py-8">Leave management feature coming soon</div>
            </div>
          )}

          {activeTab === 'payroll' && (
            <div>
              <CardTitle>Payroll Summary</CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$4,500</div>
                  <div className="text-sm text-gray-600">Monthly Salary</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">$54,000</div>
                  <div className="text-sm text-gray-600">Annual Salary</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <CardTitle>Documents</CardTitle>
              <div className="text-center text-gray-500 py-8">Documents feature coming soon</div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardBody>
          <CardTitle>Quick Actions</CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <Button>📊 View Performance</Button>
            <Button>📅 View Attendance</Button>
            <Button>📝 Create Assignment</Button>
            <Button>📧 Send Message</Button>
            <Button>📖 Schedule Class</Button>
            <Button>🎓 View Students</Button>
            <Button>📄 View Documents</Button>
            <Button onClick={handleArchive} disabled={isLoading}>🗑️ Archive Teacher</Button>
          </div>
        </CardBody>
      </Card>
    </SchoolShell>
  );
}
