'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { mockSchools, mockTeachers, mockSubjects, getClasses, createClass, updateClass, archiveClass } from '@/data/mockData';
import CreateClassForm from '@/components/classes/CreateClassForm';
import EditClassForm from '@/components/classes/EditClassForm';

export default function ClassesList({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];
  const [classes, setClasses] = useState(getClasses().filter(c => c.schoolId === school.id));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('All');
  const [sortBy, setSortBy] = useState('grade');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [deletingClass, setDeletingClass] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGrade, selectedSection, selectedStatus, selectedAcademicYear, sortBy]);

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = `${cls.grade}${cls.section}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || cls.grade === selectedGrade;
    const matchesSection = selectedSection === 'All' || cls.section === selectedSection;
    const matchesStatus = selectedStatus === 'All' || cls.status === selectedStatus;
    const matchesAcademicYear = selectedAcademicYear === 'All' || cls.academicYear === selectedAcademicYear;
    return matchesSearch && matchesGrade && matchesSection && matchesStatus && matchesAcademicYear;
  }).sort((a, b) => {
    if (sortBy === 'grade') {
      if (a.grade !== b.grade) return a.grade.localeCompare(b.grade);
      return a.section.localeCompare(b.section);
    } else if (sortBy === 'students') {
      return b.currentStudents - a.currentStudents;
    } else if (sortBy === 'capacity') {
      return b.capacity - a.capacity;
    }
    return 0;
  });

  const grades = ['All', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sections = ['All', 'A', 'B', 'C'];
  const statuses = ['All', 'Active', 'Inactive', 'Archived'];
  const academicYears = ['All', '2024-2025', '2025-2026', '2026-2027'];

  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const paginatedClasses = filteredClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateClass = async (classData: any) => {
    setIsLoading(true);
    try {
      const newClass = createClass(classData);
      setClasses([...classes, newClass]);
      setShowCreateForm(false);
      setSuccessMessage('Class created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to create class. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setIsLoading(false);
  };

  const handleEditClass = async (classData: any) => {
    setIsLoading(true);
    try {
      const updatedClass = updateClass(classData.id, classData);
      if (updatedClass) {
        setClasses(classes.map(c => c.id === classData.id ? updatedClass : c));
        setEditingClass(null);
        setSuccessMessage('Class updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      setErrorMessage('Failed to update class. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setIsLoading(false);
  };

  const handleDeleteClass = async (classId: string) => {
    setIsLoading(true);
    try {
      archiveClass(classId);
      setClasses(classes.map(c => c.id === classId ? { ...c, status: 'Archived' } : c));
      setDeletingClass(null);
      setSuccessMessage('Class archived successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to archive class. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setIsLoading(false);
  };

  if (showCreateForm) {
    return (
      <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
        <div className="mb-8">
          <Link href={`/school/${schoolSlug}/classes?persona=${currentPersona}`}>
            <Button size="sm">← Back to Classes</Button>
          </Link>
        </div>
        <CreateClassForm
          schoolId={school.id}
          onSave={handleCreateClass}
          onCancel={() => setShowCreateForm(false)}
        />
      </SchoolShell>
    );
  }

  if (editingClass) {
    return (
      <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
        <div className="mb-8">
          <Link href={`/school/${schoolSlug}/classes?persona=${currentPersona}`}>
            <Button size="sm">← Back to Classes</Button>
          </Link>
        </div>
        <EditClassForm
          classData={editingClass}
          onSave={handleEditClass}
          onCancel={() => setEditingClass(null)}
        />
      </SchoolShell>
    );
  }

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Classes</h1>
        <p className="text-gray-600">Manage all classes at {school.name}</p>
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
                placeholder="Search classes..."
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
                  <option key={grade} value={grade}>{grade === 'All' ? 'All Grades' : `Grade ${grade}`}</option>
                ))}
              </select>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sections.map(section => (
                  <option key={section} value={section}>{section === 'All' ? 'All Sections' : `Section ${section}`}</option>
                ))}
              </select>
              <select
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {academicYears.map(year => (
                  <option key={year} value={year}>{year === 'All' ? 'All Years' : year}</option>
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
                <option value="grade">Sort by Grade</option>
                <option value="students">Sort by Students</option>
                <option value="capacity">Sort by Capacity</option>
              </select>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>+ Add Class</Button>
          </div>
        </CardBody>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="mb-6">
          <CardBody>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading classes...</p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && filteredClasses.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏫</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No classes found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedGrade !== 'All' || selectedSection !== 'All' || selectedStatus !== 'All' || selectedAcademicYear !== 'All'
                  ? 'Try adjusting your filters or search terms.'
                  : 'Get started by adding your first class.'}
              </p>
              {!searchTerm && selectedGrade === 'All' && selectedSection === 'All' && selectedStatus === 'All' && selectedAcademicYear === 'All' && (
                <Button onClick={() => setShowCreateForm(true)}>+ Add First Class</Button>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Classes Table */}
      {!isLoading && filteredClasses.length > 0 && (
        <Card>
          <CardBody>
            <CardTitle>Class List ({filteredClasses.length})</CardTitle>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Class</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Room</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Class Teacher</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Students</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Capacity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Subjects</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Academic Year</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedClasses.map(cls => {
                    const teacher = mockTeachers.find(t => t.id === cls.classTeacherId);
                    const subjects = cls.subjectIds.map(id => mockSubjects.find(s => s.id === id)?.name).filter(Boolean);
                    return (
                      <tr key={cls.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">Grade {cls.grade}{cls.section}</div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{cls.room}</td>
                        <td className="py-3 px-4 text-gray-700">
                          {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Not assigned'}
                        </td>
                        <td className="py-3 px-4 text-gray-700">{cls.currentStudents}</td>
                        <td className="py-3 px-4 text-gray-700">{cls.capacity}</td>
                        <td className="py-3 px-4 text-gray-700">{subjects.join(', ')}</td>
                        <td className="py-3 px-4 text-gray-700">{cls.academicYear}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            cls.status === 'Active' ? 'bg-green-100 text-green-800' :
                            cls.status === 'Archived' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {cls.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Link href={`/school/${schoolSlug}/classes/${cls.id}?persona=${currentPersona}`}>
                              <Button size="sm">View</Button>
                            </Link>
                            <Button size="sm" onClick={() => setEditingClass(cls)}>Edit</Button>
                            <Button size="sm" onClick={() => setDeletingClass(cls)}>Archive</Button>
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
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredClasses.length)} of {filteredClasses.length} classes
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
      {deletingClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Archive Class</CardTitle>
              <p className="text-gray-600 mt-4">
                Are you sure you want to archive <strong>Grade {deletingClass.grade}{deletingClass.section}</strong>?
                This action can be undone by restoring the class.
              </p>
              <div className="flex gap-4 justify-end mt-6">
                <Button onClick={() => setDeletingClass(null)}>Cancel</Button>
                <Button onClick={() => handleDeleteClass(deletingClass.id)}>Archive</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </SchoolShell>
  );
}
