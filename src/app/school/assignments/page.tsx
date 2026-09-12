'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';

export default function SchoolAssignments() {
  const [assignments, setAssignments] = useState([
    {
      id: 'assign-1',
      title: 'Calculus Problem Set 5',
      subject: 'Mathematics',
      class: 'Class 10-A',
      teacher: 'Prof. Williams',
      dueDate: '2024-08-30',
      status: 'Published',
      totalStudents: 30,
      submitted: 25,
      graded: 20,
      type: 'Homework',
      maxPoints: 100,
    },
    {
      id: 'assign-2',
      title: 'Physics Lab Report: Motion',
      subject: 'Science',
      class: 'Class 11-B',
      teacher: 'Dr. Chen',
      dueDate: '2024-08-28',
      status: 'Grading',
      totalStudents: 28,
      submitted: 26,
      graded: 15,
      type: 'Lab Report',
      maxPoints: 50,
    },
    {
      id: 'assign-3',
      title: 'Essay: Modern Literature',
      subject: 'English',
      class: 'Class 9-C',
      teacher: 'Ms. Brown',
      dueDate: '2024-08-25',
      status: 'Completed',
      totalStudents: 32,
      submitted: 30,
      graded: 30,
      type: 'Essay',
      maxPoints: 100,
    },
    {
      id: 'assign-4',
      title: 'History Research Project',
      subject: 'History',
      class: 'Class 12-A',
      teacher: 'Mr. Davis',
      dueDate: '2024-09-05',
      status: 'Published',
      totalStudents: 25,
      submitted: 10,
      graded: 5,
      type: 'Project',
      maxPoints: 200,
    },
    {
      id: 'assign-5',
      title: 'Programming Assignment: Arrays',
      subject: 'Computer Science',
      class: 'Class 10-B',
      teacher: 'Dr. Wilson',
      dueDate: '2024-08-27',
      status: 'Grading',
      totalStudents: 29,
      submitted: 27,
      graded: 20,
      type: 'Programming',
      maxPoints: 75,
    },
  ]);
  const [submissions, setSubmissions] = useState([
    { id: 'sub-1', assignmentId: 'assign-1', studentId: 'STU2024001', studentName: 'John Smith', submittedDate: '2024-08-28', grade: null, feedback: '' },
    { id: 'sub-2', assignmentId: 'assign-1', studentId: 'STU2024002', studentName: 'Emma Johnson', submittedDate: '2024-08-29', grade: 85, feedback: 'Excellent work!' },
    { id: 'sub-3', assignmentId: 'assign-2', studentId: 'STU2024003', studentName: 'Michael Chen', submittedDate: '2024-08-27', grade: 92, feedback: 'Great analysis' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showGradingModal, setShowGradingModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
    const matchesSubject = filterSubject === 'all' || assignment.subject === filterSubject;
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const handleGradeSubmission = (submissionId: string, grade: number, feedback: string) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        return { ...sub, grade, feedback };
      }
      return sub;
    }));
    
    // Update assignment graded count
    const submission = submissions.find(s => s.id === submissionId);
    if (submission) {
      setAssignments(prev => prev.map(assign => {
        if (assign.id === submission.assignmentId) {
          return { ...assign, graded: assign.graded + 1 };
        }
        return assign;
      }));
    }
  };

  const handleDelete = (assignmentId: string) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(prev => prev.filter(a => a.id !== assignmentId));
    }
  };

  const handlePublish = (assignmentId: string) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId) {
        return { ...a, status: 'Published' };
      }
      return a;
    }));
  };

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assignments</h1>
        <p className="text-gray-600">Manage assignments, submissions, and grading</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowAddModal(true)}>+ Create Assignment</Button>
          <Button variant="outline">Import Assignments</Button>
          <Button variant="outline">Grade Submissions</Button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Drafts">Drafts</option>
            <option value="Published">Published</option>
            <option value="Grading">Grading</option>
            <option value="Completed">Completed</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            <option value="all">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="History">History</option>
            <option value="Computer Science">Computer Science</option>
          </select>
        </div>
      </div>

      {/* Assignment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{assignments.length}</div>
            <p className="text-gray-600 text-sm">Total Assignments</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {assignments.filter(a => a.status === 'Published').length}
            </div>
            <p className="text-gray-600 text-sm">Active</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {assignments.reduce((sum, a) => sum + a.submitted, 0)}
            </div>
            <p className="text-gray-600 text-sm">Submissions</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {assignments.reduce((sum, a) => sum + a.graded, 0)}
            </div>
            <p className="text-gray-600 text-sm">Graded</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {assignments.reduce((sum, a) => sum + (a.submitted - a.graded), 0)}
            </div>
            <p className="text-gray-600 text-sm">Pending</p>
          </CardBody>
        </Card>
      </div>

      {/* Assignments List */}
      <Card>
        <CardBody>
          <CardTitle>Assignments ({filteredAssignments.length} assignments)</CardTitle>
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      📝
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{assignment.title}</h3>
                        <Badge variant={
                          assignment.status === 'Published' ? 'success' : 
                          assignment.status === 'Grading' ? 'warning' : 
                          assignment.status === 'Completed' ? 'info' : 'default'
                        }>
                          {assignment.status}
                        </Badge>
                        <Badge variant="default" size="sm">{assignment.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{assignment.subject} • {assignment.class}</p>
                      <p className="text-xs text-gray-400 mt-1">Teacher: {assignment.teacher} • Due: {assignment.dueDate} • Max Points: {assignment.maxPoints}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Total: <span className="font-semibold">{assignment.totalStudents}</span></span>
                        <span className="text-gray-600">Submitted: <span className="font-semibold text-green-600">{assignment.submitted}</span></span>
                        <span className="text-gray-600">Graded: <span className="font-semibold text-blue-600">{assignment.graded}</span></span>
                      </div>
                      <div className="mt-2">
                        <ProgressBar progress={Math.round((assignment.submitted / assignment.totalStudents) * 100)} />
                        <p className="text-xs text-gray-500 mt-1">{Math.round((assignment.submitted / assignment.totalStudents) * 100)}% submitted</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedAssignment(assignment)}>
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowGradingModal(true)}>
                      Submissions
                    </Button>
                    {assignment.status === 'Grading' && (
                      <Button variant="outline" size="sm">Grade All</Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleDelete(assignment.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredAssignments.length === 0 && (
              <div className="text-center py-8 text-gray-500">No assignments found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Create Assignment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardBody>
              <CardTitle>Create Assignment</CardTitle>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Create assignment form would go here with fields for:</p>
                <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
                  <li>Title</li>
                  <li>Description</li>
                  <li>Subject</li>
                  <li>Class/Section</li>
                  <li>Due Date</li>
                  <li>Max Points</li>
                  <li>Assignment Type</li>
                  <li>Attachments</li>
                </ul>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="outline">Create Assignment</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Grading Modal */}
      {showGradingModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardBody>
              <CardTitle>Grade Submissions: {selectedAssignment.title}</CardTitle>
              <div className="mt-4 space-y-4">
                {submissions.filter(s => s.assignmentId === selectedAssignment.id).map((submission) => (
                  <div key={submission.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{submission.studentName}</h4>
                        <p className="text-sm text-gray-500">Submitted: {submission.submittedDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Grade"
                          defaultValue={submission.grade || ''}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-sm text-gray-500">/ {selectedAssignment.maxPoints}</span>
                      </div>
                    </div>
                    <textarea
                      placeholder="Feedback..."
                      defaultValue={submission.feedback}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      rows={2}
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => {
                        const gradeInput = document.querySelector(`input[placeholder="Grade"]`) as HTMLInputElement;
                        const feedbackInput = document.querySelector(`textarea[placeholder="Feedback..."]`) as HTMLTextAreaElement;
                        if (gradeInput && feedbackInput) {
                          handleGradeSubmission(submission.id, parseInt(gradeInput.value) || 0, feedbackInput.value);
                        }
                      }}
                    >
                      Save Grade
                    </Button>
                  </div>
                ))}
                {submissions.filter(s => s.assignmentId === selectedAssignment.id).length === 0 && (
                  <div className="text-center py-8 text-gray-500">No submissions yet</div>
                )}
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowGradingModal(false)}>Close</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}