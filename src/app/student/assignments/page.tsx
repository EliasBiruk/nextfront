'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';

export default function StudentAssignments() {
  const assignments = [
    {
      id: 1,
      title: 'Math Problem Set 5',
      subject: 'Mathematics',
      teacher: 'Prof. Williams',
      dueDate: 'Sep 12, 2026',
      status: 'Pending',
      progress: 0,
      points: 100
    },
    {
      id: 2,
      title: 'Science Lab Report',
      subject: 'Science',
      teacher: 'Dr. Johnson',
      dueDate: 'Sep 10, 2026',
      status: 'Submitted',
      progress: 100,
      points: 50,
      grade: 92
    },
    {
      id: 3,
      title: 'Essay: Climate Change',
      subject: 'English',
      teacher: 'Ms. Brown',
      dueDate: 'Sep 15, 2026',
      status: 'In Progress',
      progress: 60,
      points: 75
    },
    {
      id: 4,
      title: 'History Timeline Project',
      subject: 'History',
      teacher: 'Mr. Davis',
      dueDate: 'Sep 8, 2026',
      status: 'Completed',
      progress: 100,
      points: 80,
      grade: 88
    },
    {
      id: 5,
      title: 'Reading Comprehension',
      subject: 'English',
      teacher: 'Ms. Brown',
      dueDate: 'Sep 20, 2026',
      status: 'Pending',
      progress: 0,
      points: 40
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Submitted': return 'success';
      case 'In Progress': return 'warning';
      case 'Pending': return 'default';
      case 'Overdue': return 'danger';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout actor="student" userName="Student">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assignments</h1>
        <p className="text-gray-600">View and manage your assignments</p>
      </div>

      {/* Assignment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{assignments.length}</div>
                <div className="text-blue-100 text-sm">Total</div>
              </div>
              <div className="text-4xl opacity-80">📋</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {assignments.filter(a => a.status === 'Completed' || a.status === 'Submitted').length}
                </div>
                <div className="text-green-100 text-sm">Submitted</div>
              </div>
              <div className="text-4xl opacity-80">✅</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {assignments.filter(a => a.status === 'Pending' || a.status === 'In Progress').length}
                </div>
                <div className="text-orange-100 text-sm">Pending</div>
              </div>
              <div className="text-4xl opacity-80">⏳</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {Math.round(assignments.filter(a => a.grade).reduce((acc, a) => acc + (a.grade || 0), 0) / assignments.filter(a => a.grade).length)}
                </div>
                <div className="text-purple-100 text-sm">Avg Grade</div>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium whitespace-nowrap">All</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition whitespace-nowrap">Pending</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition whitespace-nowrap">In Progress</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition whitespace-nowrap">Submitted</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition whitespace-nowrap">Completed</button>
      </div>

      {/* Assignments List */}
      <Card>
        <CardBody>
          <CardTitle>My Assignments</CardTitle>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                      <Badge variant={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{assignment.subject} • {assignment.teacher}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <span>📅 Due: {assignment.dueDate}</span>
                      <span>🎯 {assignment.points} points</span>
                      {assignment.grade && <span>📊 Grade: {assignment.grade}%</span>}
                    </div>
                  </div>
                  <div className="text-right min-w-[120px]">
                    {assignment.progress > 0 && (
                      <>
                        <div className="text-sm font-medium text-blue-600 mb-1">{assignment.progress}%</div>
                        <ProgressBar progress={assignment.progress} />
                      </>
                    )}
                  </div>
                </div>
                {assignment.status === 'Pending' && (
                  <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                    Start Assignment
                  </button>
                )}
                {assignment.status === 'In Progress' && (
                  <button className="mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition">
                    Continue
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
