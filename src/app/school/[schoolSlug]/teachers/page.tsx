'use client';

import { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { mockSchools, mockClasses, getTeachers, createTeacher, updateTeacher, archiveTeacher } from '@/data/mockData';
import CreateTeacherForm from '@/components/teachers/CreateTeacherForm';
import EditTeacherForm from '@/components/teachers/EditTeacherForm';

export default function TeachersList({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];
  const [teachers, setTeachers] = useState(getTeachers().filter(t => t.schoolId === school.id));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const [deletingTeacher, setDeletingTeacher] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedSubject, selectedStatus, selectedEmploymentType, sortBy]);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || teacher.department === selectedDepartment;
    const matchesSubject = selectedSubject === 'All' || teacher.subjects.includes(selectedSubject);
    const matchesStatus = selectedStatus === 'All' || teacher.status === selectedStatus;
    const matchesEmploymentType = selectedEmploymentType === 'All' || teacher.employmentType === selectedEmploymentType;
    return matchesSearch && matchesDepartment && matchesSubject && matchesStatus && matchesEmploymentType;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
    } else if (sortBy === 'department') {
      return a.department.localeCompare(b.department);
    } else if (sortBy === 'experience') {
      return b.experience - a.experience;
    }
    return 0;
  });

  const departments = ['All', ...Array.from(new Set(teachers.map(t => t.department)))];
  const subjects = ['All', ...Array.from(new Set(teachers.flatMap(t => t.subjects)))];
  const statuses = ['All', 'Active', 'Inactive', 'On Leave', 'Archived'];
  const employmentTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Substitute'];

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateTeacher = async (teacherData: any) => {
    setIsLoading(true);
    try {
      const newTeacher = createTeacher(teacherData);
      setTeachers([...teachers, newTeacher]);
      setShowCreateForm(false);
      setSuccessMessage('Teacher created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to create teacher. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setIsLoading(false);
  };

  const handleEditTeacher = async (teacherData: any) => {
    setIsLoading(true);
    try {
      const updatedTeacher = updateTeacher(teacherData.id, teacherData);
      if (updatedTeacher) {
        setTeachers(teachers.map(t => t.id === teacherData.id ? updatedTeacher : t));
        setEditingTeacher(null);
        setSuccessMessage('Teacher updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      setErrorMessage('Failed to update teacher. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setIsLoading(false);
  };

  const handleDeleteTeacher = async (teacherId: string) => {
    setIsLoading(true);
    try {
      archiveTeacher(teacherId);
      setTeachers(teachers.map(t => t.id === teacherId ? { ...t, status: 'Archived' } : t));
      setDeletingTeacher(null);
      setSuccessMessage('Teacher archived successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to archive teacher. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setIsLoading(false);
  };

  if (showCreateForm) {
    return (
      <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
        <div className="mb-8">
          <Link href={`/school/${schoolSlug}/teachers?persona=${currentPersona}`}>
            <Button size="sm">← Back to Teachers</Button>
          </Link>
        </div>
        <CreateTeacherForm
          schoolId={school.id}
          onSave={handleCreateTeacher}
          onCancel={() => setShowCreateForm(false)}
        />
      </SchoolShell>
    );
  }

  if (editingTeacher) {
    return (
      <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
        <div className="mb-8">
          <Link href={`/school/${schoolSlug}/teachers?persona=${currentPersona}`}>
            <Button size="sm">← Back to Teachers</Button>
          </Link>
        </div>
        <EditTeacherForm
          teacher={editingTeacher}
          onSave={handleEditTeacher}
          onCancel={() => setEditingTeacher(null)}
        />
      </SchoolShell>
    );
  }

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Teachers</h1>
        <p className="text-gray-600">Manage all teachers at {school.name}</p>
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
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
                ))}
              </select>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject === 'All' ? 'All Subjects' : subject}</option>
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
                value={selectedEmploymentType}
                onChange={(e) => setSelectedEmploymentType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {employmentTypes.map(type => (
                  <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="department">Sort by Department</option>
                <option value="experience">Sort by Experience</option>
              </select>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>+ Add Teacher</Button>
          </div>
        </CardBody>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="mb-6">
          <CardBody>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading teachers...</p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && filteredTeachers.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No teachers found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedDepartment !== 'All' || selectedSubject !== 'All' || selectedStatus !== 'All' || selectedEmploymentType !== 'All'
                  ? 'Try adjusting your filters or search terms.'
                  : 'Get started by adding your first teacher.'}
              </p>
              {!searchTerm && selectedDepartment === 'All' && selectedSubject === 'All' && selectedStatus === 'All' && selectedEmploymentType === 'All' && (
                <Button onClick={() => setShowCreateForm(true)}>+ Add First Teacher</Button>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Teachers Table */}
      {!isLoading && filteredTeachers.length > 0 && (
        <Card>
          <CardBody>
            <CardTitle>Teacher List ({filteredTeachers.length})</CardTitle>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Teacher</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Employee ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Subjects</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Classes</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Position</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Employment</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTeachers.map(teacher => (
                    <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium">
                            {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{teacher.firstName} {teacher.lastName}</div>
                            <div className="text-sm text-gray-500">{teacher.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{teacher.employeeId}</td>
                      <td className="py-3 px-4 text-gray-700">{teacher.department}</td>
                      <td className="py-3 px-4 text-gray-700">{teacher.subjects.join(', ')}</td>
                      <td className="py-3 px-4 text-gray-700">
                        {teacher.classes.map(clsId => {
                          const cls = mockClasses.find(c => c.id === clsId);
                          return cls ? `Grade ${cls.grade}${cls.section}` : '';
                        }).filter(Boolean).join(', ')}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{teacher.position}</td>
                      <td className="py-3 px-4 text-gray-700">{teacher.employmentType}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          teacher.status === 'Active' ? 'bg-green-100 text-green-800' :
                          teacher.status === 'Archived' ? 'bg-gray-100 text-gray-800' :
                          teacher.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Link href={`/school/${schoolSlug}/teachers/${teacher.id}?persona=${currentPersona}`}>
                            <Button size="sm">View</Button>
                          </Link>
                          <Button size="sm" onClick={() => setEditingTeacher(teacher)}>Edit</Button>
                          <Button size="sm" onClick={() => setDeletingTeacher(teacher)}>Archive</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTeachers.length)} of {filteredTeachers.length} teachers
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
      {deletingTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Archive Teacher</CardTitle>
              <p className="text-gray-600 mt-4">
                Are you sure you want to archive <strong>{deletingTeacher.firstName} {deletingTeacher.lastName}</strong>?
                This action can be undone by restoring the teacher.
              </p>
              <div className="flex gap-4 justify-end mt-6">
                <Button onClick={() => setDeletingTeacher(null)}>Cancel</Button>
                <Button onClick={() => handleDeleteTeacher(deletingTeacher.id)}>Archive</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </SchoolShell>
  );
}
