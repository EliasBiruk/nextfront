'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolExaminations() {
  const [exams, setExams] = useState([
    {
      id: '1',
      name: 'Mid-Term Examination',
      type: 'Mid-Term',
      class: 'All Classes',
      subject: 'All Subjects',
      date: '2024-09-15',
      duration: '2 weeks',
      status: 'Scheduled',
      roomCount: 45,
      students: 2450
    },
    {
      id: '2',
      name: 'Physics Unit Test',
      type: 'Quiz',
      class: 'Class 10-A, 10-B',
      subject: 'Physics',
      date: '2024-09-01',
      duration: '1 hour',
      status: 'Scheduled',
      roomCount: 2,
      students: 60
    },
    {
      id: '3',
      name: 'Mathematics Assessment',
      type: 'Quiz',
      class: 'Class 11-A, 11-B',
      subject: 'Mathematics',
      date: '2024-09-03',
      duration: '1.5 hours',
      status: 'Scheduled',
      roomCount: 2,
      students: 56
    },
    {
      id: '4',
      name: 'English Literature Exam',
      type: 'Mid-Term',
      class: 'Class 9-C',
      subject: 'English',
      date: '2024-09-05',
      duration: '2 hours',
      status: 'Scheduled',
      roomCount: 1,
      students: 32
    },
    {
      id: '5',
      name: 'History Final Exam',
      type: 'Final',
      class: 'Class 12-A',
      subject: 'History',
      date: '2024-09-10',
      duration: '3 hours',
      status: 'Scheduled',
      roomCount: 1,
      students: 25
    },
  ]);

  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);

  const examTypes = ['Mid-Term', 'Final', 'Quiz', 'Entrance'];
  const examStatuses = ['Scheduled', 'In Progress', 'Completed', 'Grading'];

  const filteredExams = exams.filter(exam => {
    const matchesType = filterType === 'all' || exam.type === filterType;
    const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const handleScheduleExam = (examId: string) => {
    alert(`Scheduling exam ${examId}`);
  };

  const handleStartExam = (examId: string) => {
    setExams(prev => prev.map(exam => 
      exam.id === examId ? { ...exam, status: 'In Progress' } : exam
    ));
  };

  const handleCompleteExam = (examId: string) => {
    setExams(prev => prev.map(exam => 
      exam.id === examId ? { ...exam, status: 'Completed' } : exam
    ));
  };

  const handleGradeExam = (examId: string) => {
    setExams(prev => prev.map(exam => 
      exam.id === examId ? { ...exam, status: 'Grading' } : exam
    ));
  };

  const handlePublishResults = (examId: string) => {
    alert(`Publishing results for exam ${examId}`);
  };

  const totalExams = exams.length;
  const scheduled = exams.filter(e => e.status === 'Scheduled').length;
  const completed = exams.filter(e => e.status === 'Completed').length;
  const inProgress = exams.filter(e => e.status === 'In Progress').length;
  const totalStudents = exams.reduce((sum, exam) => sum + exam.students, 0);

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Examinations</h1>
        <p className="text-gray-600">Manage exams, schedules, grading, and results</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowAddExamModal(true)}>+ Schedule Exam</Button>
          <Button variant="outline">Create Question Bank</Button>
          <Button variant="outline">Generate Report Cards</Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            {examTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            {examStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Examination Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{totalExams}</div>
            <p className="text-gray-600 text-sm">Total Exams</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{scheduled}</div>
            <p className="text-gray-600 text-sm">Scheduled</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{completed}</div>
            <p className="text-gray-600 text-sm">Completed</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{inProgress}</div>
            <p className="text-gray-600 text-sm">In Progress</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{totalStudents.toLocaleString()}</div>
            <p className="text-gray-600 text-sm">Total Students</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">Dashboard</div>
            <div className="text-sm text-gray-600">Exam overview</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="font-semibold">Schedules</div>
            <div className="text-sm text-gray-600">Exam schedules</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="font-semibold">Question Banks</div>
            <div className="text-sm text-gray-600">Question management</div>
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

      {/* Upcoming Exams */}
      <Card>
        <CardBody>
          <CardTitle>Examinations ({filteredExams.length} exams)</CardTitle>
          <div className="space-y-4">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      📝
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{exam.name}</h3>
                        <Badge variant={
                          exam.type === 'Final' ? 'danger' : 
                          exam.type === 'Mid-Term' ? 'warning' : 
                          exam.type === 'Quiz' ? 'info' : 'default'
                        }>
                          {exam.type}
                        </Badge>
                        <Badge variant={
                          exam.status === 'Scheduled' ? 'success' :
                          exam.status === 'In Progress' ? 'warning' :
                          exam.status === 'Completed' ? 'default' : 'info'
                        }>
                          {exam.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{exam.subject} • {exam.class}</p>
                      <p className="text-xs text-gray-400 mt-1">Date: {exam.date} • Duration: {exam.duration}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Rooms: <span className="font-semibold">{exam.roomCount}</span></span>
                        <span className="text-gray-600">Students: <span className="font-semibold">{exam.students}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedExam(exam)}>Details</Button>
                    {exam.status === 'Scheduled' && (
                      <Button variant="outline" size="sm" onClick={() => handleStartExam(exam.id)}>Start</Button>
                    )}
                    {exam.status === 'In Progress' && (
                      <Button variant="outline" size="sm" onClick={() => handleCompleteExam(exam.id)}>Complete</Button>
                    )}
                    {exam.status === 'Completed' && (
                      <Button variant="outline" size="sm" onClick={() => handleGradeExam(exam.id)}>Grade</Button>
                    )}
                    {exam.status === 'Grading' && (
                      <Button variant="outline" size="sm" onClick={() => handlePublishResults(exam.id)}>Publish Results</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredExams.length === 0 && (
              <div className="text-center py-8 text-gray-500">No exams found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Add Exam Modal */}
      {showAddExamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Schedule New Examination</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Mid-Term Examination"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    {examTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Class 10-A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Mathematics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 2 hours"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddExamModal(false)}>Cancel</Button>
                <Button variant="outline">Schedule Exam</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}