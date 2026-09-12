'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolGradebook() {
  const [students, setStudents] = useState([
    {
      id: '1',
      name: 'John Smith',
      studentId: 'STU2024001',
      class: 'Class 10-A',
      gpa: 3.8,
      percentage: 92,
      subjects: [
        { name: 'Mathematics', grade: 'A', score: 95 },
        { name: 'Science', grade: 'A-', score: 90 },
        { name: 'English', grade: 'A', score: 92 },
        { name: 'History', grade: 'B+', score: 88 },
      ],
      status: 'Approved'
    },
    {
      id: '2',
      name: 'Emma Johnson',
      studentId: 'STU2024002',
      class: 'Class 11-B',
      gpa: 3.5,
      percentage: 87,
      subjects: [
        { name: 'Mathematics', grade: 'B+', score: 87 },
        { name: 'Science', grade: 'A-', score: 90 },
        { name: 'English', grade: 'B+', score: 85 },
        { name: 'History', grade: 'B', score: 82 },
      ],
      status: 'Pending'
    },
    {
      id: '3',
      name: 'Michael Chen',
      studentId: 'STU2024003',
      class: 'Class 12-A',
      gpa: 4.0,
      percentage: 98,
      subjects: [
        { name: 'Mathematics', grade: 'A+', score: 98 },
        { name: 'Science', grade: 'A+', score: 99 },
        { name: 'English', grade: 'A', score: 95 },
        { name: 'History', grade: 'A', score: 96 },
      ],
      status: 'Approved'
    },
    {
      id: '4',
      name: 'Sarah Williams',
      studentId: 'STU2024004',
      class: 'Class 9-C',
      gpa: 2.9,
      percentage: 78,
      subjects: [
        { name: 'Mathematics', grade: 'C+', score: 78 },
        { name: 'Science', grade: 'C', score: 75 },
        { name: 'English', grade: 'B-', score: 80 },
        { name: 'History', grade: 'C+', score: 77 },
      ],
      status: 'Pending'
    },
    {
      id: '5',
      name: 'David Brown',
      studentId: 'STU2024005',
      class: 'Class 10-B',
      gpa: 3.2,
      percentage: 84,
      subjects: [
        { name: 'Mathematics', grade: 'B', score: 84 },
        { name: 'Science', grade: 'B+', score: 86 },
        { name: 'English', grade: 'B', score: 83 },
        { name: 'History', grade: 'B-', score: 81 },
      ],
      status: 'Approved'
    },
  ]);

  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [showReportCardModal, setShowReportCardModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const filteredStudents = students.filter(student => {
    const matchesGrade = selectedGrade === 'all' || student.class.includes(selectedGrade);
    return matchesGrade;
  });

  const handleApproveGrades = () => {
    setStudents(prev => prev.map(student => ({
      ...student,
      status: 'Approved'
    })));
    alert('All pending grades have been approved');
  };

  const handleGenerateReportCards = () => {
    alert('Generating report cards for all students...');
  };

  const handleEditGrades = (studentId: string) => {
    setSelectedStudent(students.find(s => s.id === studentId));
    setShowAddGradeModal(true);
  };

  const handleViewReportCard = (studentId: string) => {
    setSelectedStudent(students.find(s => s.id === studentId));
    setShowReportCardModal(true);
  };

  const handleApproveStudent = (studentId: string) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        return { ...student, status: 'Approved' };
      }
      return student;
    }));
  };

  const avgGPA = students.reduce((sum, s) => sum + s.gpa, 0) / students.length;
  const avgPercentage = students.reduce((sum, s) => sum + s.percentage, 0) / students.length;
  const passRate = students.filter(s => s.percentage >= 70).length / students.length * 100;
  const approvedCount = students.filter(s => s.status === 'Approved').length;
  const pendingCount = students.filter(s => s.status === 'Pending').length;

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Gradebook</h1>
        <p className="text-gray-600">Manage grades, assessments, and student performance tracking</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowAddGradeModal(true)}>+ Enter Grades</Button>
          <Button variant="outline" onClick={handleApproveGrades}>Approve Grades</Button>
          <Button variant="outline" onClick={handleGenerateReportCards}>Generate Report Cards</Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
          >
            <option>Academic Year 2024-2025</option>
            <option>Academic Year 2023-2024</option>
            <option>Academic Year 2022-2023</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            <option value="all">All Grades</option>
            <option>9th Grade</option>
            <option>10th Grade</option>
            <option>11th Grade</option>
            <option>12th Grade</option>
          </select>
        </div>
      </div>

      {/* Gradebook Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{students.length}</div>
            <p className="text-gray-600 text-sm">Total Students</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{avgGPA.toFixed(1)}</div>
            <p className="text-gray-600 text-sm">Avg. GPA</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{passRate.toFixed(0)}%</div>
            <p className="text-gray-600 text-sm">Pass Rate</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{approvedCount}</div>
            <p className="text-gray-600 text-sm">Approved</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{pendingCount}</div>
            <p className="text-gray-600 text-sm">Pending</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">Overview</div>
            <div className="text-sm text-gray-600">Gradebook overview</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🏫</div>
            <div className="font-semibold">Classes</div>
            <div className="text-sm text-gray-600">Class grades</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-semibold">Subjects</div>
            <div className="text-sm text-gray-600">Subject grades</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold">Report Cards</div>
            <div className="text-sm text-gray-600">Student reports</div>
          </CardBody>
        </Card>
      </div>

      {/* Student Grades Overview */}
      <Card>
        <CardBody>
          <CardTitle>Student Grades Overview ({filteredStudents.length} students)</CardTitle>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{student.name}</h3>
                        <Badge variant={student.status === 'Approved' ? 'success' : 'warning'}>
                          {student.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{student.class} • ID: {student.studentId}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">GPA: <span className="font-semibold">{student.gpa}</span></span>
                        <span className="text-gray-600">Percentage: <span className="font-semibold">{student.percentage}%</span></span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700 mb-1">Subject Grades:</p>
                        <div className="flex flex-wrap gap-1">
                          {student.subjects.map((subject: any) => (
                            <Badge key={subject.name} variant="default" size="sm">
                              {subject.name}: {subject.grade} ({subject.score}%)
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>View Details</Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditGrades(student.id)}>Edit Grades</Button>
                    <Button variant="outline" size="sm" onClick={() => handleViewReportCard(student.id)}>Report Card</Button>
                    {student.status === 'Pending' && (
                      <Button variant="outline" size="sm" onClick={() => handleApproveStudent(student.id)}>Approve</Button>
                    )}
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

      {/* Add Grade Modal */}
      {showAddGradeModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Edit Grades - {selectedStudent.name}</CardTitle>
              <div className="mt-4 space-y-4">
                {selectedStudent.subjects.map((subject: any, index: number) => (
                  <div key={subject.name} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{subject.name}</span>
                      <span className="text-sm text-gray-500">Current: {subject.grade} ({subject.score}%)</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Score (0-100)"
                        defaultValue={subject.score}
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="B-">B-</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="C-">C-</option>
                        <option value="D+">D+</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddGradeModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { setShowAddGradeModal(false); alert('Grades updated successfully!'); }}>Save Grades</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Report Card Modal */}
      {showReportCardModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Report Card - {selectedStudent.name}</CardTitle>
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Student ID:</span>
                    <span className="font-medium">{selectedStudent.studentId}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Class:</span>
                    <span className="font-medium">{selectedStudent.class}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Academic Year:</span>
                    <span className="font-medium">{academicYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overall GPA:</span>
                    <span className="font-medium">{selectedStudent.gpa}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Subject Grades:</h4>
                  <div className="space-y-2">
                    {selectedStudent.subjects.map((subject: any) => (
                      <div key={subject.name} className="flex justify-between p-2 border border-gray-200 rounded">
                        <span>{subject.name}</span>
                        <span className="font-medium">{subject.grade} ({subject.score}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between p-2 bg-blue-50 rounded-lg">
                  <span className="font-medium">Overall Percentage:</span>
                  <span className="font-bold text-blue-600">{selectedStudent.percentage}%</span>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowReportCardModal(false)}>Close</Button>
                <Button variant="outline">Download PDF</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}