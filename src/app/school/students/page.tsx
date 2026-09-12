'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { schoolsService } from '@/services';
import { useAuth } from '@/context/AuthContext';

export default function SchoolStudents() {
  const { currentUser, currentSchoolContext } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const schoolName = currentSchoolContext?.schoolName || currentUser?.firstName || 'School';

  useEffect(() => {
    async function loadStudents() {
      if (!currentUser) return;
      try {
        const response = await schoolsService.getStudents(currentUser.id);
        setStudents(response.data || []);
      } catch (error) {
        console.error('Failed to load students:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStudents();
  }, [currentUser]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || student.grade === filterGrade;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && student.status === 'Active') ||
                         (filterStatus === 'warning' && student.status === 'Warning') ||
                         (filterStatus === 'inactive' && student.status === 'Inactive');
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const handleDelete = (studentId: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(s => s.id !== studentId));
    }
  };

  const handleStatusChange = (studentId: string, newStatus: string) => {
    setStudents(prev => prev.map(s => 
      s.id === studentId ? { ...s, status: newStatus } : s
    ));
  };

  const handleAddStudent = () => {
    setShowAddModal(true);
  };

  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setShowAddModal(true);
  };

  return (
    <DashboardLayout actor="school" userName={schoolName}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-2">Students</h1>
        <p className="text-[var(--joyedu-text-secondary)]">Manage student records, enrollment, and academic progress</p>
      </div>

      {isLoading ? (
        <Card>
          <CardBody>
            <p className="text-[var(--joyedu-text-secondary)]">Loading students...</p>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <Button onClick={handleAddStudent}>+ Add Student</Button>
              <Button>Import Students</Button>
              <Button>Bulk Operations</Button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-[var(--joyedu-border-300)] rounded-lg text-sm bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)]"
              />
              <select 
                className="px-3 py-2 border border-[var(--joyedu-border-300)] rounded-lg text-sm bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)]"
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
              >
                <option value="all">All Grades</option>
                <option value="9">9th Grade</option>
                <option value="10">10th Grade</option>
                <option value="11">11th Grade</option>
                <option value="12">12th Grade</option>
              </select>
              <select 
                className="px-3 py-2 border border-[var(--joyedu-border-300)] rounded-lg text-sm bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)]"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="warning">Warning</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Student Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-[var(--joyedu-primary)] mb-1">{students.length}</div>
            <p className="text-[var(--joyedu-text-secondary)] text-sm">Total Students</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-[var(--joyedu-success)] mb-1">
              {students.filter(s => s.status === 'Active').length}
            </div>
            <p className="text-[var(--joyedu-text-secondary)] text-sm">Active</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-[var(--joyedu-warning)] mb-1">
              {students.filter(s => s.status === 'Warning').length}
            </div>
            <p className="text-[var(--joyedu-text-secondary)] text-sm">Warning</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-[var(--joyedu-accent)] mb-1">
              {Math.round(students.reduce((sum, s) => sum + s.attendanceRate, 0) / students.length)}%
            </div>
            <p className="text-[var(--joyedu-text-secondary)] text-sm">Avg Attendance</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-[var(--joyedu-error)] mb-1">
              {(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)}
            </div>
            <p className="text-[var(--joyedu-text-secondary)] text-sm">Avg GPA</p>
          </CardBody>
        </Card>
      </div>

      {/* Student List */}
      <Card>
        <CardBody>
          <CardTitle>Student Directory ({filteredStudents.length} students)</CardTitle>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-4 border border-[var(--joyedu-border-200)] rounded-lg hover:border-[var(--joyedu-primary-500)] transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--joyedu-primary-subtle)] flex items-center justify-center text-lg font-bold text-[var(--joyedu-primary)]">
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[var(--joyedu-text-primary)]">{student.firstName} {student.lastName}</h3>
                        <Badge variant={student.status === 'Active' ? 'success' : student.status === 'Warning' ? 'warning' : 'danger'}>
                          {student.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-[var(--joyedu-text-secondary)]">Grade {student.grade}{student.section}</p>
                      <p className="text-xs text-[var(--joyedu-text-muted)] mt-1">ID: {student.id} • DOB: {student.dateOfBirth}</p>
                      <div className="flex gap-4 mt-2 text-sm text-[var(--joyedu-text-muted)]">
                        <span> {student.email}</span>
                        <span>📞 {student.phone}</span>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-[var(--joyedu-text-secondary)]">Attendance: <span className="font-semibold text-[var(--joyedu-text-primary)]">{student.attendanceRate}%</span></span>
                        <span className="text-[var(--joyedu-text-secondary)]">GPA: <span className="font-semibold text-[var(--joyedu-text-primary)]">{student.gpa}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditStudent(student)}>Edit</Button>
                    <Button variant="outline" size="sm" onClick={() => handleStatusChange(student.id, student.status === 'Active' ? 'Inactive' : 'Active')}>
                      {student.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(student.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-gray-500">No students found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Add/Edit Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardBody>
              <CardTitle>{editingStudent ? 'Edit Student' : 'Add New Student'}</CardTitle>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      defaultValue={editingStudent?.firstName || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      defaultValue={editingStudent?.lastName || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., Smith"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      defaultValue={editingStudent?.dateOfBirth || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grade *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="9">9th Grade</option>
                      <option value="10">10th Grade</option>
                      <option value="11">11th Grade</option>
                      <option value="12">12th Grade</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Warning">Warning</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    defaultValue={editingStudent?.email || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., john.smith@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    defaultValue={editingStudent?.phone || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., +1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Mrs. Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Phone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., +1 (555) 987-6543"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={2}
                    placeholder="e.g., 123 Main Street, Springfield, IL 62701"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => { setShowAddModal(false); setEditingStudent(null); }}>Cancel</Button>
                <Button variant="outline" onClick={() => { 
                  setShowAddModal(false); 
                  setEditingStudent(null);
                  alert('Student saved successfully!');
                }}>
                  {editingStudent ? 'Update Student' : 'Add Student'}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
        </>
      )}
    </DashboardLayout>
  );
}