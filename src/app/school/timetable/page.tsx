'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolTimetable() {
  const [schedules, setSchedules] = useState([
    {
      id: '1',
      period: 'Period 1',
      time: '8:00 AM - 8:45 AM',
      class: 'Class 10-A',
      subject: 'Mathematics',
      teacher: 'Prof. Williams',
      room: 'Room 101',
      status: 'Scheduled',
      day: 'Monday'
    },
    {
      id: '2',
      period: 'Period 2',
      time: '8:50 AM - 9:35 AM',
      class: 'Class 10-A',
      subject: 'Physics',
      teacher: 'Dr. Chen',
      room: 'Science Lab 1',
      status: 'Scheduled',
      day: 'Monday'
    },
    {
      id: '3',
      period: 'Period 3',
      time: '9:40 AM - 10:25 AM',
      class: 'Class 10-A',
      subject: 'English',
      teacher: 'Ms. Brown',
      room: 'Room 102',
      status: 'Scheduled',
      day: 'Monday'
    },
    {
      id: '4',
      period: 'Period 4',
      time: '10:30 AM - 11:15 AM',
      class: 'Class 10-A',
      subject: 'History',
      teacher: 'Mr. Davis',
      room: 'Room 103',
      status: 'Scheduled',
      day: 'Monday'
    },
    {
      id: '5',
      period: 'Lunch',
      time: '11:15 AM - 12:00 PM',
      class: 'Class 10-A',
      subject: 'Lunch Break',
      teacher: 'N/A',
      room: 'Cafeteria',
      status: 'Scheduled',
      day: 'Monday'
    },
    {
      id: '6',
      period: 'Period 5',
      time: '12:00 PM - 12:45 PM',
      class: 'Class 10-A',
      subject: 'Computer Science',
      teacher: 'Dr. Wilson',
      room: 'Computer Lab 1',
      status: 'Scheduled',
      day: 'Monday'
    },
  ]);

  const [viewType, setViewType] = useState('master');
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showConflictModal, setShowConflictModal] = useState(false);

  const conflicts = schedules.filter(s => s.status === 'Conflict');
  const filteredSchedules = schedules.filter(s => s.day === selectedDay);

  const handleReschedule = (scheduleId: string) => {
    alert(`Rescheduling schedule ${scheduleId}`);
  };

  const handleAutoSchedule = () => {
    alert('Auto-scheduling in progress...');
  };

  const handleCheckConflicts = () => {
    setShowConflictModal(true);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const classes = ['9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Timetable</h1>
        <p className="text-gray-600">Manage class schedules, teacher timetables, and room allocations</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowAddScheduleModal(true)}>+ Create Schedule</Button>
          <Button variant="outline" onClick={handleAutoSchedule}>Auto Schedule</Button>
          <Button variant="outline" onClick={handleCheckConflicts}>Check Conflicts</Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
          >
            <option value="master">Master Timetable</option>
            <option value="class">Class Timetable</option>
            <option value="teacher">Teacher Timetable</option>
            <option value="room">Room Timetable</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          {viewType === 'class' && (
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>Class {cls}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Timetable Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Total Classes</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">180</div>
            <p className="text-gray-600 text-sm">Teachers</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">156</div>
            <p className="text-gray-600 text-sm">Rooms</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">8</div>
            <p className="text-gray-600 text-sm">Periods/Day</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{conflicts.length}</div>
            <p className="text-gray-600 text-sm">Conflicts</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer" onClick={() => setViewType('master')}>
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">Master Timetable</div>
            <div className="text-sm text-gray-600">Overall schedule</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer" onClick={() => setViewType('class')}>
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🏫</div>
            <div className="font-semibold">Class Timetable</div>
            <div className="text-sm text-gray-600">Class schedules</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer" onClick={() => setViewType('teacher')}>
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👨‍🏫</div>
            <div className="font-semibold">Teacher Timetable</div>
            <div className="text-sm text-gray-600">Teacher schedules</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer" onClick={() => setViewType('room')}>
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🚪</div>
            <div className="font-semibold">Room Timetable</div>
            <div className="text-sm text-gray-600">Room allocations</div>
          </CardBody>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardBody>
          <CardTitle>{selectedDay} Schedule - {viewType === 'class' ? `Class ${selectedClass}` : viewType.charAt(0).toUpperCase() + viewType.slice(1) + ' View'}</CardTitle>
          <div className="space-y-4">
            {filteredSchedules.map((schedule) => (
              <div key={schedule.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      🕐
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{schedule.period}</h3>
                        <Badge variant={schedule.status === 'Conflict' ? 'danger' : 'success'}>{schedule.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{schedule.time}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Class: <span className="font-semibold">{schedule.class}</span></span>
                        <span className="text-gray-600">Subject: <span className="font-semibold">{schedule.subject}</span></span>
                        <span className="text-gray-600">Teacher: <span className="font-semibold">{schedule.teacher}</span></span>
                        <span className="text-gray-600">Room: <span className="font-semibold">{schedule.room}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Details</Button>
                    <Button variant="outline" size="sm" onClick={() => handleReschedule(schedule.id)}>Reschedule</Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredSchedules.length === 0 && (
              <div className="text-center py-8 text-gray-500">No schedules found for {selectedDay}</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Add Schedule Modal */}
      {showAddScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Create Schedule</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Period 1</option>
                    <option>Period 2</option>
                    <option>Period 3</option>
                    <option>Period 4</option>
                    <option>Period 5</option>
                    <option>Period 6</option>
                    <option>Period 7</option>
                    <option>Period 8</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    {classes.map(cls => (
                      <option key={cls} value={cls}>Class {cls}</option>
                    ))}
                  </select>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teacher</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Prof. Williams"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Room 101"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddScheduleModal(false)}>Cancel</Button>
                <Button variant="outline">Create Schedule</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Conflict Modal */}
      {showConflictModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Schedule Conflicts</CardTitle>
              <div className="mt-4">
                {conflicts.length === 0 ? (
                  <p className="text-gray-600">No conflicts detected in the current schedule.</p>
                ) : (
                  <div className="space-y-2">
                    {conflicts.map(conflict => (
                      <div key={conflict.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="font-medium text-red-800">{conflict.period} - {conflict.class}</p>
                        <p className="text-sm text-red-600">{conflict.subject} • {conflict.room}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowConflictModal(false)}>Close</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}