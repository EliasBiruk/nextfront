'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';

export default function StudentAttendance() {
  const attendanceStats = {
    overall: 95,
    present: 142,
    absent: 5,
    late: 3
  };

  const attendanceRecords = [
    {
      id: 1,
      date: 'Sep 6, 2026',
      day: 'Monday',
      status: 'Present',
      checkIn: '8:00 AM',
      checkOut: '3:00 PM',
      subject: 'All Subjects'
    },
    {
      id: 2,
      date: 'Sep 5, 2026',
      day: 'Friday',
      status: 'Present',
      checkIn: '8:05 AM',
      checkOut: '3:00 PM',
      subject: 'All Subjects'
    },
    {
      id: 3,
      date: 'Sep 4, 2026',
      day: 'Thursday',
      status: 'Late',
      checkIn: '8:35 AM',
      checkOut: '3:00 PM',
      subject: 'All Subjects'
    },
    {
      id: 4,
      date: 'Sep 3, 2026',
      day: 'Wednesday',
      status: 'Present',
      checkIn: '8:00 AM',
      checkOut: '3:00 PM',
      subject: 'All Subjects'
    },
    {
      id: 5,
      date: 'Sep 2, 2026',
      day: 'Tuesday',
      status: 'Absent',
      checkIn: '-',
      checkOut: '-',
      subject: 'All Subjects',
      reason: 'Sick Leave'
    },
    {
      id: 6,
      date: 'Sep 1, 2026',
      day: 'Monday',
      status: 'Present',
      checkIn: '8:00 AM',
      checkOut: '3:00 PM',
      subject: 'All Subjects'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'success';
      case 'Absent': return 'danger';
      case 'Late': return 'warning';
      case 'Excused': return 'info';
      default: return 'default';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-50 border-green-200';
      case 'Absent': return 'bg-red-50 border-red-200';
      case 'Late': return 'bg-yellow-50 border-yellow-200';
      case 'Excused': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <DashboardLayout actor="student" userName="Student">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance</h1>
        <p className="text-gray-600">View your attendance records</p>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{attendanceStats.overall}%</div>
                <div className="text-green-100 text-sm">Overall</div>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{attendanceStats.present}</div>
                <div className="text-blue-100 text-sm">Present</div>
              </div>
              <div className="text-4xl opacity-80">✅</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{attendanceStats.absent}</div>
                <div className="text-red-100 text-sm">Absent</div>
              </div>
              <div className="text-4xl opacity-80">❌</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{attendanceStats.late}</div>
                <div className="text-yellow-100 text-sm">Late</div>
              </div>
              <div className="text-4xl opacity-80">⏰</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Monthly Calendar View */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>September 2026</CardTitle>
          <div className="grid grid-cols-7 gap-1 md:gap-2 mt-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs md:text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
            {[...Array(30)].map((_, i) => {
              const day = i + 1;
              const isWeekend = day % 7 === 0 || day % 7 === 6;
              const isPresent = [1, 2, 4, 5, 6].includes(day);
              const isAbsent = day === 3;
              const isLate = day === 4;
              
              return (
                <div
                  key={day}
                  className={`text-center py-2 rounded-lg text-sm ${
                    isWeekend 
                      ? 'bg-gray-100 text-gray-400' 
                      : isPresent 
                      ? 'bg-green-100 text-green-700' 
                      : isAbsent 
                      ? 'bg-red-100 text-red-700' 
                      : isLate 
                      ? 'bg-yellow-100 text-yellow-700' 
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 rounded"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-100 rounded"></div>
              <span>Absent</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-100 rounded"></div>
              <span>Late</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-100 rounded"></div>
              <span>Weekend</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Attendance Records */}
      <Card>
        <CardBody>
          <CardTitle>Attendance Records</CardTitle>
          <div className="space-y-4">
            {attendanceRecords.map((record) => (
              <div
                key={record.id}
                className={`p-4 border rounded-lg ${getStatusBgColor(record.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{record.date}</h3>
                      <span className="text-sm text-gray-600">{record.day}</span>
                      <Badge variant={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{record.subject}</p>
                    {record.reason && (
                      <p className="text-xs text-gray-500 mt-1">Reason: {record.reason}</p>
                    )}
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-gray-600">
                      <div>In: {record.checkIn}</div>
                      <div>Out: {record.checkOut}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
