'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function SchoolInstructorTimetable() {
  const schedule = [
    { day: 'Monday', classes: ['08:00 - Grade 10A (Math)', '13:00 - Grade 11A (Math)'] },
    { day: 'Tuesday', classes: ['10:00 - Grade 10B (Math)', '14:00 - Grade 11B (Math)'] },
    { day: 'Wednesday', classes: ['08:00 - Grade 10A (Math)', '13:00 - Grade 11A (Math)'] },
    { day: 'Thursday', classes: ['10:00 - Grade 10B (Math)', '14:00 - Grade 11B (Math)'] },
    { day: 'Friday', classes: ['08:00 - Grade 10A (Math)', '13:00 - Grade 11A (Math)'] },
  ];

  return (
    <DashboardLayout actor="instructor" userName="Mr. Johnson" instructorType="school">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Timetable</h1>
        <p className="text-gray-600">View your weekly teaching schedule</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Link href="/instructor/school/timetable" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
          My Timetable
        </Link>
        <Link href="/instructor/school/timetable/class" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Class Timetable
        </Link>
        <Link href="/instructor/school/timetable/calendar" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          Academic Calendar
        </Link>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Weekly Schedule</CardTitle>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-medium text-gray-900">Day</th>
                  <th className="text-left p-3 font-medium text-gray-900">Schedule</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((day) => (
                  <tr key={day.day} className="border-b border-gray-100">
                    <td className="p-3 font-medium text-gray-900">{day.day}</td>
                    <td className="p-3">
                      <div className="space-y-2">
                        {day.classes.map((classItem, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                            <span className="text-blue-600">📐</span>
                            <span className="text-sm text-gray-900">{classItem}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Today's Classes</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✅</span>
            <span className="text-sm text-gray-700">08:00 - Grade 10A (Mathematics) - Room 201</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">🔄</span>
            <span className="text-sm text-gray-700">10:00 - Grade 10B (Mathematics) - Room 201</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">⏳</span>
            <span className="text-sm text-gray-700">13:00 - Grade 11A (Mathematics) - Room 201</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}