'use client';

import { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { mockSchools, mockClasses, getStudents, createStudent, updateStudent, archiveStudent } from '@/data/mockData';
import CreateStudentForm from '@/components/students/CreateStudentForm';
import EditStudentForm from '@/components/students/EditStudentForm';

export default function StudentsList({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];
  const [students, setStudents] = useState(getStudents().filter(s => s.schoolId === school.id));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [deletingStudent, setDeletingStudent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGrade, selectedStatus, sortBy]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
    const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
    } else if (sortBy === 'grade') {
      return a.grade.localeCompare(b.grade);
    } else if (sortBy === 'gpa') {
      return b.gpa - a.gpa;
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const grades = ['All', ...Array.from(new Set(students.map(s => s.grade)))];
  const statuses = ['All', 'Active', 'Inactive', 'Graduated', 'Withdrawn', 'Archived'];

  const handleCreateStudent = async (studentData: any) => {
    setIsLoading(true);
    try {
      const newStudent = createStudent(studentData);
      setStudents([...students, newStudent]);
      setShowCreateForm(false);
      setSuccessMessage('Student created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to create student. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setIsLoading(false);
  };

  const handleEditStudent = async (studentData: any) => {
    setIsLoading(true);
    try {
      const updatedStudent = updateStudent(studentData.id, studentData);
      if (updatedStudent) {
        setStudents(students.map(s => s.id === studentData.id ? updatedStudent : s));
        setEditingStudent(null);
        setSuccessMessage('Student updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      setErrorMessage('Failed to update student. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setIsLoading(false);
  };

  const handleDeleteStudent = async (studentId: string) => {
    setIsLoading(true);
    try {
      archiveStudent(studentId);
      setStudents(students.map(s => s.id === studentId ? { ...s, status: 'Archived' } : s));
      setDeletingStudent(null);
      setSuccessMessage('Student archived successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to archive student. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setIsLoading(false);
  };

  if (showCreateForm) {
    return (
      <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
        <div className="mb-8">
          <Link href={`/school/${schoolSlug}/students?persona=${currentPersona}`}>
            <Button size="sm">← Back to Students</Button>
          </Link>
        </div>
        <CreateStudentForm
          schoolId={school.id}
          onSave={handleCreateStudent}
          onCancel={() => setShowCreateForm(false)}
        />
      </SchoolShell>
    );
  }

  if (editingStudent) {
    return (
      <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
        <div className="mb-8">
          <Link href={`/school/${schoolSlug}/students?persona=${currentPersona}`}>
            <Button size="sm">← Back to Students</Button>
          </Link>
        </div>
        <EditStudentForm
          student={editingStudent}
          onSave={handleEditStudent}
          onCancel={() => setEditingStudent(null)}
        />
      </SchoolShell>
    );
  }

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Students</h1>
        <p className="text-gray-600">Manage all students at {school.name}</p>
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

      {/* Actions Bar */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center flex-wrap">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="grade">Sort by Grade</option>
                <option value="gpa">Sort by GPA</option>
              </select>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>+ Add Student</Button>
          </div>
        </CardBody>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="mb-6">
          <CardBody>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading students...</p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && filteredStudents.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👨‍🎓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedGrade !== 'All' || selectedStatus !== 'All'
                  ? 'Try adjusting your filters or search terms.'
                  : 'Get started by adding your first student.'}
              </p>
              {!searchTerm && selectedGrade === 'All' && selectedStatus === 'All' && (
                <Button onClick={() => setShowCreateForm(true)}>+ Add First Student</Button>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Students Table */}
      {!isLoading && filteredStudents.length > 0 && (
        <Card>
          <CardBody>
            <CardTitle>Student List ({filteredStudents.length})</CardTitle>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Student</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Roll Number</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Grade</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Section</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">GPA</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Attendance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map(student => {
                    const studentClass = mockClasses.find(c => c.id === student.classId);
                    return (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                              {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{student.firstName} {student.lastName}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{student.rollNumber}</td>
                        <td className="py-3 px-4 text-gray-700">{student.grade}</td>
                        <td className="py-3 px-4 text-gray-700">{student.section}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.status === 'Active' ? 'bg-green-100 text-green-800' :
                            student.status === 'Archived' ? 'bg-gray-100 text-gray-800' :
                            student.status === 'Graduated' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{student.gpa}</td>
                        <td className="py-3 px-4 text-gray-700">{student.attendanceRate}%</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Link href={`/school/${schoolSlug}/students/${student.id}?persona=${currentPersona}`}>
                              <Button size="sm">View</Button>
                            </Link>
                            <Button size="sm" onClick={() => setEditingStudent(student)}>Edit</Button>
                            <Button size="sm" onClick={() => setDeletingStudent(student)}>Archive</Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="px-3 py-1 text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Delete Confirmation Modal */}
      {deletingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Archive Student</CardTitle>
              <p className="text-gray-600 mt-4">
                Are you sure you want to archive <strong>{deletingStudent.firstName} {deletingStudent.lastName}</strong>?
                This action can be undone by restoring the student.
              </p>
              <div className="flex gap-4 justify-end mt-6">
                <Button onClick={() => setDeletingStudent(null)}>Cancel</Button>
                <Button onClick={() => handleDeleteStudent(deletingStudent.id)}>Archive</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </SchoolShell>
  );
}
