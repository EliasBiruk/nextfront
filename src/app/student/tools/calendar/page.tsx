'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const events = [
    {
      id: 1,
      title: 'Python Quiz',
      type: 'exam',
      date: '2024-01-15',
      time: '10:00 AM',
      description: 'Chapter 1-5 assessment',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Web Development Project Due',
      type: 'deadline',
      date: '2024-01-18',
      time: '11:59 PM',
      description: 'Submit final project',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Study Group Session',
      type: 'event',
      date: '2024-01-20',
      time: '2:00 PM',
      description: 'Data structures review',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'JavaScript Assignment',
      type: 'deadline',
      date: '2024-01-22',
      time: '5:00 PM',
      description: 'Functions and arrays exercise',
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Midterm Exam',
      type: 'exam',
      date: '2024-01-25',
      time: '9:00 AM',
      description: 'Comprehensive assessment',
      priority: 'high'
    },
    {
      id: 6,
      title: 'Career Workshop',
      type: 'event',
      date: '2024-01-28',
      time: '3:00 PM',
      description: 'Resume building and interview tips',
      priority: 'low'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const getEventTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      exam: 'bg-red-100 text-red-800 border-red-300',
      deadline: 'bg-orange-100 text-orange-800 border-orange-300',
      event: 'bg-blue-100 text-blue-800 border-blue-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getEventTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      exam: '📝',
      deadline: '⏰',
      event: '📅'
    };
    return icons[type] || '📌';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-green-600'
    };
    return colors[priority] || 'text-gray-600';
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Calendar</h1>
        <p className="text-gray-600">Your learning schedule, deadlines, and events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  ← Previous
                </button>
                <h2 className="text-xl font-semibold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={nextMonth}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  Next →
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  if (!day) {
                    return <div key={index} className="h-24 bg-gray-50 rounded-lg" />;
                  }

                  const dayEvents = getEventsForDate(day);
                  const isToday = day.toISOString().split('T')[0] === todayStr;
                  const isSelected = selectedDate && day.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(day)}
                      className={`h-24 p-2 rounded-lg cursor-pointer transition border-2 ${
                        isToday ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:border-gray-300'
                      } ${isSelected ? 'border-blue-600 bg-blue-100' : ''}`}
                    >
                      <div className={`font-semibold text-sm mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs px-1 py-0.5 rounded border ${getEventTypeColor(event.type)} truncate`}
                            title={event.title}
                          >
                            {getEventTypeIcon(event.type)} {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardBody>
              <CardTitle>Upcoming Events</CardTitle>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <span className={`text-xs font-medium ${getPriorityColor(event.priority)}`}>
                        {event.priority}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {event.date} at {event.time}
                    </div>
                    <p className="text-xs text-gray-600">{event.description}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Create Event */}
          <Card>
            <CardBody>
              <CardTitle>Quick Actions</CardTitle>
              <div className="space-y-2">
                <button
                  onClick={() => setShowEventModal(true)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  + Add Event
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                  View All Events
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                  Export Calendar
                </button>
              </div>
            </CardBody>
          </Card>

          {/* Event Types Legend */}
          <Card>
            <CardBody>
              <CardTitle>Event Types</CardTitle>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📝</span>
                  <span className="text-sm">Exams</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⏰</span>
                  <span className="text-sm">Deadlines</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  <span className="text-sm">Events</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <Card className="mt-6">
          <CardBody>
            <CardTitle>
              Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </CardTitle>
            <div className="space-y-3">
              {getEventsForDate(selectedDate).map(event => (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border ${getEventTypeColor(event.type)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getEventTypeIcon(event.type)}</span>
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <div className="text-sm text-gray-600">
                          {event.time} • <span className={`font-medium ${getPriorityColor(event.priority)}`}>{event.priority} priority</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-white text-gray-700 rounded hover:bg-gray-100 transition text-sm">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              ))}
              {getEventsForDate(selectedDate).length === 0 && (
                <p className="text-gray-600 text-center py-4">No events scheduled for this date</p>
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </DashboardLayout>
  );
}
