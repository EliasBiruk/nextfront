'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: '1',
      class: 'Class 10-A',
      teacher: 'Prof. Williams',
      total: 30,
      present: 28,
      absent: 2,
      late: 0,
      rate: 93.3,
      status: 'Good'
    },
    {
      id: '2',
      class: 'Class 11-B',
      teacher: 'Dr. Chen',
      total: 28,
      present: 26,
      absent: 1,
      late: 1,
      rate: 92.9,
      status: 'Good'
    },
    {
      id: '3',
      class: 'Class 9-C',
      teacher: 'Ms. Brown',
      total: 32,
      present: 25,
      absent: 5,
      late: 2,
      rate: 78.1,
      status: 'Warning'
    },
    {
      id: '4',
      class: 'Class 12-A',
      teacher: 'Mr. Davis',
      total: 25,
      present: 24,
      absent: 1,
      late: 0,
      rate: 96.0,
      status: 'Excellent'
    },
    {
      id: '5',
      class: 'Class 10-B',
      teacher: 'Prof. Johnson',
      total: 29,
      present: 27,
      absent: 2,
      late: 0,
      rate: 93.1,
      status: 'Good'
    },
  ]);

  const [dateRange, setDateRange] = useState('Today');
  const [attendanceType, setAttendanceType] = useState('All Types');
  const [showTakeAttendanceModal, setShowTakeAttendanceModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const handleMarkAbsent = (classId: string) => {
    setAttendanceRecords(prev => prev.map(record => {
      if (record.id === classId) {
        const newAbsent = record.absent + 1;
        const newPresent = Math.max(0, record.present - 1);
        const newRate = ((newPresent / record.total) * 100).toFixed(1);
        return {
          ...record,
          present: newPresent,
          absent: newAbsent,
          rate: parseFloat(newRate),
          status: newRate >= 95 ? 'Excellent' : newRate >= 90 ? 'Good' : newRate >= 80 ? 'Warning' : 'Poor' as string
        };
      }
      return record;
    }));
    alert(`Marked absent for ${attendanceRecords.find(r => r.id === classId)?.class}`);
  };

  const handleTakeAttendance = (classId: string) => {
    setSelectedClass(attendanceRecords.find(r => r.id === classId));
    setShowTakeAttendanceModal(true);
  };

  const handleExportReport = () => {
    alert('Exporting attendance report...');
  };

  const overallRate = attendanceRecords.reduce((sum, r) => sum + r.rate, 0) / attendanceRecords.length;
  const totalAbsent = attendanceRecords.reduce((sum, r) => sum + r.absent, 0);

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance</h1>
        <p className="text-gray-600">Track and manage student, teacher, and staff attendance</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowTakeAttendanceModal(true)}>+ Take Attendance</Button>
          <Button variant="outline" onClick={handleExportReport}>Export Report</Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Custom Range</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={attendanceType}
            onChange={(e) => setAttendanceType(e.target.value)}
          >
            <option>All Types</option>
            <option>Student</option>
            <option>Teacher</option>
            <option>Staff</option>
          </select>
        </div>
      </div>

      {/* Attendance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{overallRate.toFixed(1)}%</div>
            <p className="text-gray-600 text-sm">Overall Rate</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">92.5%</div>
            <p className="text-gray-600 text-sm">Student Rate</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">96.8%</div>
            <p className="text-gray-600 text-sm">Teacher Rate</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">93.1%</div>
            <p className="text-gray-600 text-sm">Staff Rate</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{totalAbsent}</div>
            <p className="text-gray-600 text-sm">Absent Today</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👨‍🎓</div>
            <div className="font-semibold">Student Attendance</div>
            <div className="text-sm text-gray-600">Student tracking</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👨‍🏫</div>
            <div className="font-semibold">Teacher Attendance</div>
            <div className="text-sm text-gray-600">Teacher tracking</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👨‍💼</div>
            <div className="font-semibold">Staff Attendance</div>
            <div className="text-sm text-gray-600">Staff tracking</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">Attendance Reports</div>
            <div className="text-sm text-gray-600">Generate reports</div>
          </CardBody>
        </Card>
      </div>

      {/* Today's Attendance Overview */}
      <Card>
        <CardBody>
          <CardTitle>Today's Attendance Overview</CardTitle>
          <div className="space-y-4">
            {attendanceRecords.map((attendance) => (
              <div key={attendance.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      🏫
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{attendance.class}</h3>
                        <Badge variant={
                          attendance.status === 'Excellent' ? 'success' : 
                          attendance.status === 'Good' ? 'info' : 
                          attendance.status === 'Warning' ? 'warning' : 'danger'
                        }>
                          {attendance.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Teacher: {attendance.teacher}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Total: <span className="font-semibold">{attendance.total}</span></span>
                        <span className="text-gray-600">Present: <span className="font-semibold text-green-600">{attendance.present}</span></span>
                        <span className="text-gray-600">Absent: <span className="font-semibold text-red-600">{attendance.absent}</span></span>
                        <span className="text-gray-600">Late: <span className="font-semibold text-orange-600">{attendance.late}</span></span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Attendance Rate</span>
                          <span className="text-sm font-semibold">{attendance.rate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${
                            attendance.rate >= 95 ? 'bg-green-600' : 
                            attendance.rate >= 90 ? 'bg-blue-600' : 
                            attendance.rate >= 80 ? 'bg-yellow-600' : 'bg-red-600'
                          }`} style={{ width: `${attendance.rate}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleTakeAttendance(attendance.id)}>Take Attendance</Button>
                    <Button variant="outline" size="sm" onClick={() => handleMarkAbsent(attendance.id)}>Mark Absent</Button>
                    <Button variant="outline" size="sm">Report</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Take Attendance Modal */}
      {showTakeAttendanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Take Attendance</CardTitle>
              <div className="mt-4">
                {selectedClass && (
                  <p className="text-gray-600 mb-4">Taking attendance for {selectedClass.class}</p>
                )}
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
                    <span>Total Students</span>
                    <span className="font-semibold">{selectedClass?.total || 30}</span>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
                    <span>Present</span>
                    <input type="number" className="w-20 px-2 py-1 border border-gray-300 rounded" defaultValue={selectedClass?.present || 0} />
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
                    <span>Absent</span>
                    <input type="number" className="w-20 px-2 py-1 border border-gray-300 rounded" defaultValue={selectedClass?.absent || 0} />
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
                    <span>Late</span>
                    <input type="number" className="w-20 px-2 py-1 border border-gray-300 rounded" defaultValue={selectedClass?.late || 0} />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowTakeAttendanceModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { setShowTakeAttendanceModal(false); alert('Attendance saved successfully!'); }}>Save Attendance</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}