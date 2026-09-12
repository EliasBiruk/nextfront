'use client';

import { use, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { mockSchools, mockTeachers } from '@/data/mockData';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: string;
  salary: number;
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface Vacancy {
  id: string;
  title: string;
  department: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string;
  status: 'Open' | 'Closed' | 'Filled';
  postedDate: string;
  applications: number;
}

export default function HRDashboard({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('employees');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showVacancyModal, setShowVacancyModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';
  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];

  // Mock HR data
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 'emp-1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      employeeId: 'EMP-001',
      department: 'Mathematics',
      position: 'Senior Teacher',
      email: 'sarah.johnson@school.edu',
      phone: '+1 (555) 111-2222',
      status: 'Active',
      joinDate: '2012-08-01',
      salary: 65000,
    },
    {
      id: 'emp-2',
      firstName: 'Michael',
      lastName: 'Chen',
      employeeId: 'EMP-002',
      department: 'Science',
      position: 'Department Head',
      email: 'michael.chen@school.edu',
      phone: '+1 (555) 222-3333',
      status: 'Active',
      joinDate: '2016-08-01',
      salary: 75000,
    },
    {
      id: 'emp-3',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      employeeId: 'EMP-003',
      department: 'English',
      position: 'Teacher',
      email: 'emily.rodriguez@school.edu',
      phone: '+1 (555) 333-4444',
      status: 'On Leave',
      joinDate: '2019-08-01',
      salary: 55000,
    },
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 'leave-1',
      employeeId: 'emp-3',
      employeeName: 'Emily Rodriguez',
      type: 'Sick Leave',
      startDate: '2024-03-10',
      endDate: '2024-03-15',
      days: 5,
      reason: 'Medical leave for recovery',
      status: 'Approved',
    },
    {
      id: 'leave-2',
      employeeId: 'emp-1',
      employeeName: 'Sarah Johnson',
      type: 'Vacation',
      startDate: '2024-04-01',
      endDate: '2024-04-05',
      days: 4,
      reason: 'Family vacation',
      status: 'Pending',
    },
  ]);

  const [vacancies, setVacancies] = useState<Vacancy[]>([
    {
      id: 'vac-1',
      title: 'Mathematics Teacher',
      department: 'Mathematics',
      type: 'Full-time',
      description: 'Teach mathematics to grades 9-12',
      requirements: ['B.S. in Mathematics', 'Teaching certification', '2+ years experience'],
      salary: '$55,000 - $65,000',
      status: 'Open',
      postedDate: '2024-02-15',
      applications: 12,
    },
    {
      id: 'vac-2',
      title: 'Science Lab Assistant',
      department: 'Science',
      type: 'Part-time',
      description: 'Assist in science laboratory activities',
      requirements: ['B.S. in Science', 'Lab experience'],
      salary: '$30,000 - $35,000',
      status: 'Open',
      postedDate: '2024-03-01',
      applications: 8,
    },
  ]);

  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.status === 'Active').length,
    onLeave: employees.filter(e => e.status === 'On Leave').length,
    pendingLeaves: leaveRequests.filter(l => l.status === 'Pending').length,
    openVacancies: vacancies.filter(v => v.status === 'Open').length,
    totalApplications: vacancies.reduce((sum, v) => sum + v.applications, 0),
  };

  const handleLeaveAction = (leaveId: string, action: 'approve' | 'reject') => {
    setLeaveRequests(leaveRequests.map(leave => 
      leave.id === leaveId 
        ? { ...leave, status: action === 'approve' ? 'Approved' : 'Rejected' as const }
        : leave
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Approved':
      case 'Open':
        return <Badge variant="success">{status}</Badge>;
      case 'Pending':
        return <Badge variant="warning">{status}</Badge>;
      case 'On Leave':
      case 'Rejected':
      case 'Closed':
      case 'Terminated':
        return <Badge variant="danger">{status}</Badge>;
      case 'Filled':
        return <Badge variant="info">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderEmployees = () => (
    <div className="space-y-6">
      {/* HR Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-blue-100 mb-1">Total Employees</div>
            <div className="text-3xl font-bold">{stats.totalEmployees}</div>
            <div className="text-sm text-blue-100 mt-1">All departments</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-green-100 mb-1">Active</div>
            <div className="text-3xl font-bold">{stats.activeEmployees}</div>
            <div className="text-sm text-green-100 mt-1">Currently working</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-yellow-100 mb-1">On Leave</div>
            <div className="text-3xl font-bold">{stats.onLeave}</div>
            <div className="text-sm text-yellow-100 mt-1">Currently absent</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-purple-100 mb-1">Open Vacancies</div>
            <div className="text-3xl font-bold">{stats.openVacancies}</div>
            <div className="text-sm text-purple-100 mt-1">{stats.totalApplications} applications</div>
          </CardBody>
        </Card>
      </div>

      {/* Employee List */}
      <Card>
        <CardBody>
          <CardTitle>Employee Directory</CardTitle>
          <div className="space-y-3 mt-4">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{employee.firstName} {employee.lastName}</div>
                  <div className="text-sm text-gray-500">{employee.position} • {employee.department}</div>
                  <div className="text-xs text-gray-400">{employee.employeeId} • Joined: {employee.joinDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${employee.salary.toLocaleString()}/yr</div>
                  {getStatusBadge(employee.status)}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderLeaveManagement = () => (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <CardTitle>Leave Requests</CardTitle>
          <div className="space-y-3 mt-4">
            {leaveRequests.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{leave.employeeName}</div>
                  <div className="text-sm text-gray-500">{leave.type} • {leave.days} days</div>
                  <div className="text-xs text-gray-400">{leave.startDate} to {leave.endDate}</div>
                  <div className="text-xs text-gray-500 mt-1">Reason: {leave.reason}</div>
                </div>
                <div className="text-right">
                  {getStatusBadge(leave.status)}
                  {leave.status === 'Pending' && (
                    <div className="flex gap-2 mt-2">
                      <Button 
                        onClick={() => handleLeaveAction(leave.id, 'approve')} 
                        size="sm"
                        variant="outline"
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleLeaveAction(leave.id, 'reject')} 
                        size="sm" 
                        variant="danger"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderRecruitment = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Job Vacancies</h2>
        <Button onClick={() => setShowVacancyModal(true)}>+ Post Vacancy</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vacancies.map((vacancy) => (
          <Card key={vacancy.id}>
            <CardBody>
              <div className="flex items-start justify-between mb-3">
                <CardTitle>{vacancy.title}</CardTitle>
                {getStatusBadge(vacancy.status)}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Department</span>
                  <span className="font-medium">{vacancy.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium">{vacancy.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary</span>
                  <span className="font-medium">{vacancy.salary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-medium">{vacancy.applications}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">{vacancy.description}</p>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Requirements: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {vacancy.requirements.map((req, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  View Applications
                </Button>
                {vacancy.status === 'Open' && (
                  <Button size="sm" variant="danger">
                    Close
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPayroll = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Payroll Overview</h2>

      <Card>
        <CardBody>
          <CardTitle>Monthly Payroll Summary</CardTitle>
          <div className="mt-4 space-y-3">
            {employees.filter(e => e.status === 'Active').map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{employee.firstName} {employee.lastName}</div>
                  <div className="text-sm text-gray-500">{employee.position} • {employee.department}</div>
                  <div className="text-xs text-gray-400">{employee.employeeId}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${(employee.salary / 12).toFixed(2)}</div>
                  <div className="text-xs text-gray-500">Monthly</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Total Monthly Payroll</span>
              <span className="text-2xl font-bold text-gray-900">
                ${employees.filter(e => e.status === 'Active').reduce((sum, e) => sum + (e.salary / 12), 0).toFixed(2)}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">HR Dashboard</h1>
        <p className="text-gray-600">Human Resources Management • {school.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('employees')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'employees' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Employees
        </button>
        <button
          onClick={() => setActiveTab('leave')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'leave' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Leave Management
        </button>
        <button
          onClick={() => setActiveTab('recruitment')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'recruitment' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Recruitment
        </button>
        <button
          onClick={() => setActiveTab('payroll')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'payroll' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Payroll
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'employees' && renderEmployees()}
      {activeTab === 'leave' && renderLeaveManagement()}
      {activeTab === 'recruitment' && renderRecruitment()}
      {activeTab === 'payroll' && renderPayroll()}
    </SchoolShell>
  );
}
