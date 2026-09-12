'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { mockStudents } from '@/data/mockData';

export default function SchoolAdmissions() {
  const [applications, setApplications] = useState([
    {
      id: 'APP2024056',
      name: 'Alice Johnson',
      grade: '9',
      section: 'A',
      submittedDate: '2024-08-20',
      status: 'Under Review',
      entranceScore: 85,
      interviewScheduled: true,
      email: 'alice.johnson@email.com',
      phone: '+1 (555) 111-0001',
    },
    {
      id: 'APP2024055',
      name: 'Bob Smith',
      grade: '10',
      section: 'B',
      submittedDate: '2024-08-19',
      status: 'Pending',
      entranceScore: null,
      interviewScheduled: false,
      email: 'bob.smith@email.com',
      phone: '+1 (555) 111-0002',
    },
    {
      id: 'APP2024054',
      name: 'Carol Williams',
      grade: '11',
      section: 'A',
      submittedDate: '2024-08-18',
      status: 'Accepted',
      entranceScore: 92,
      interviewScheduled: true,
      email: 'carol.williams@email.com',
      phone: '+1 (555) 111-0003',
    },
    {
      id: 'APP2024053',
      name: 'David Brown',
      grade: '9',
      section: 'C',
      submittedDate: '2024-08-17',
      status: 'Waitlist',
      entranceScore: 78,
      interviewScheduled: true,
      email: 'david.brown@email.com',
      phone: '+1 (555) 111-0004',
    },
    {
      id: 'APP2024052',
      name: 'Emma Davis',
      grade: '12',
      section: 'A',
      submittedDate: '2024-08-16',
      status: 'Rejected',
      entranceScore: 65,
      interviewScheduled: true,
      email: 'emma.davis@email.com',
      phone: '+1 (555) 111-0005',
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGrade, setFilterGrade] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesGrade = filterGrade === 'all' || app.grade === filterGrade;
    return matchesSearch && matchesStatus && matchesGrade;
  });

  const handleDecision = (applicationId: string, decision: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: decision };
      }
      return app;
    }));
  };

  const handleEnroll = (applicationId: string) => {
    const application = applications.find(a => a.id === applicationId);
    if (!application) return;

    // Create a new student record from the application
    const newStudent = {
      id: `STU${Date.now()}`,
      firstName: application.name.split(' ')[0],
      lastName: application.name.split(' ')[1] || '',
      grade: application.grade,
      section: application.section,
      email: application.email,
      phone: application.phone,
      dateOfBirth: '2010-01-01',
      status: 'Active',
      attendanceRate: 100,
      gpa: 0,
      schoolId: 'school-1',
    };

    // In a real app, this would add to the students database
    console.log('Enrolling student:', newStudent);
    alert(`${application.name} has been enrolled as ${newStudent.id}`);
    
    // Remove from applications after enrollment
    setApplications(prev => prev.filter(app => app.id !== applicationId));
  };

  const handleScheduleInterview = (applicationId: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return { ...app, interviewScheduled: true };
      }
      return app;
    }));
    alert(`Interview scheduled for application ${applicationId}`);
  };

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admissions</h1>
        <p className="text-gray-600">Manage student applications and admission process</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowAddModal(true)}>+ New Application</Button>
          <Button variant="outline">Import Applications</Button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search applications..."
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
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Waitlist">Waitlist</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
          >
            <option value="all">All Grades</option>
            <option value="9">9th Grade</option>
            <option value="10">10th Grade</option>
            <option value="11">11th Grade</option>
            <option value="12">12th Grade</option>
          </select>
        </div>
      </div>

      {/* Admissions Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{applications.length}</div>
            <p className="text-gray-600 text-sm">Total Applications</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {applications.filter(a => a.status === 'Pending' || a.status === 'Under Review').length}
            </div>
            <p className="text-gray-600 text-sm">Pending Review</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {applications.filter(a => a.status === 'Accepted').length}
            </div>
            <p className="text-gray-600 text-sm">Accepted</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {applications.filter(a => a.status === 'Rejected').length}
            </div>
            <p className="text-gray-600 text-sm">Rejected</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {applications.filter(a => a.status === 'Waitlist').length}
            </div>
            <p className="text-gray-600 text-sm">Waitlist</p>
          </CardBody>
        </Card>
      </div>

      {/* Applications List */}
      <Card>
        <CardBody>
          <CardTitle>Applications ({filteredApplications.length} applications)</CardTitle>
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div key={application.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {application.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{application.name}</h3>
                        <Badge variant={
                          application.status === 'Accepted' ? 'success' : 
                          application.status === 'Rejected' ? 'danger' : 
                          application.status === 'Under Review' ? 'warning' : 
                          application.status === 'Waitlist' ? 'info' : 'default'
                        }>
                          {application.status}
                        </Badge>
                        {application.interviewScheduled && (
                          <Badge variant="default" size="sm">Interview Scheduled</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">Grade {application.grade}{application.section}</p>
                      <p className="text-xs text-gray-400 mt-1">ID: {application.id} • Submitted: {application.submittedDate}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>📧 {application.email}</span>
                        <span>📞 {application.phone}</span>
                      </div>
                      {application.entranceScore !== null && (
                        <div className="mt-2 text-sm">
                          <span className="text-gray-600">Entrance Score: </span>
                          <span className="font-semibold">{application.entranceScore}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                      Review
                    </Button>
                    {!application.interviewScheduled && application.status !== 'Rejected' && (
                      <Button variant="outline" size="sm" onClick={() => handleScheduleInterview(application.id)}>
                        Schedule Interview
                      </Button>
                    )}
                    {application.status === 'Pending' || application.status === 'Under Review' ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleDecision(application.id, 'Accepted')}>
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDecision(application.id, 'Rejected')}>
                          Reject
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDecision(application.id, 'Waitlist')}>
                          Waitlist
                        </Button>
                      </>
                    ) : null}
                    {application.status === 'Accepted' && (
                      <Button variant="success" size="sm" onClick={() => handleEnroll(application.id)}>
                        Enroll Student
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredApplications.length === 0 && (
              <div className="text-center py-8 text-gray-500">No applications found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardBody>
              <CardTitle>New Application</CardTitle>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Application form would go here with fields for:</p>
                <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
                  <li>Student Name</li>
                  <li>Date of Birth</li>
                  <li>Grade Applying For</li>
                  <li>Parent/Guardian Information</li>
                  <li>Contact Information</li>
                  <li>Previous School Records</li>
                  <li>Documents Upload</li>
                </ul>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="outline">Submit Application</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}