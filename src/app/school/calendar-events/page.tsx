import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolCalendarEvents() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Calendar & Events</h1>
        <p className="text-gray-600">Manage school calendar, academic calendar, events, holidays, and activities</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Add Event</Button>
          <Button variant="outline">Add Holiday</Button>
          <Button variant="outline">Schedule Meeting</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Types</option>
            <option>Academic</option>
            <option>Holiday</option>
            <option>Event</option>
            <option>Meeting</option>
            <option>Examination</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>

      {/* Calendar Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Total Events</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">12</div>
            <p className="text-gray-600 text-sm">This Month</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">8</div>
            <p className="text-gray-600 text-sm">Holidays</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">15</div>
            <p className="text-gray-600 text-sm">Meetings</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">10</div>
            <p className="text-gray-600 text-sm">Examinations</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="font-semibold">School Calendar</div>
            <div className="text-sm text-gray-600">Overall calendar</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🎓</div>
            <div className="font-semibold">Academic Calendar</div>
            <div className="text-sm text-gray-600">Academic schedule</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🎉</div>
            <div className="font-semibold">Events</div>
            <div className="text-sm text-gray-600">School events</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🏖️</div>
            <div className="font-semibold">Holidays</div>
            <div className="text-sm text-gray-600">School holidays</div>
          </CardBody>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardBody>
          <CardTitle>Upcoming Events</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Mid-Term Examinations',
                type: 'Examination',
                date: '2024-09-15',
                endDate: '2024-09-30',
                location: 'All Classrooms',
                participants: 'All Students',
                status: 'Scheduled',
                priority: 'High'
              },
              {
                name: 'Parent-Teacher Conference',
                type: 'Meeting',
                date: '2024-09-20',
                endDate: '2024-09-20',
                location: 'School Hall',
                participants: 'Parents & Teachers',
                status: 'Scheduled',
                priority: 'Medium'
              },
              {
                name: 'Fall Festival',
                type: 'Event',
                date: '2024-10-15',
                endDate: '2024-10-15',
                location: 'School Grounds',
                participants: 'All Students & Staff',
                status: 'Scheduled',
                priority: 'Normal'
              },
              {
                name: 'Labor Day Holiday',
                type: 'Holiday',
                date: '2024-09-02',
                endDate: '2024-09-02',
                location: 'School Closed',
                participants: 'All',
                status: 'Confirmed',
                priority: 'Normal'
              },
              {
                name: 'Staff Development Day',
                type: 'Meeting',
                date: '2024-09-10',
                endDate: '2024-09-10',
                location: 'Conference Room',
                participants: 'All Staff',
                status: 'Scheduled',
                priority: 'Medium'
              },
            ].map((event) => (
              <div key={event.name} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {event.type === 'Examination' ? '📝' : 
                       event.type === 'Meeting' ? '👥' : 
                       event.type === 'Event' ? '🎉' : 
                       event.type === 'Holiday' ? '🏖️' : '📅'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{event.name}</h3>
                        <Badge variant={
                          event.priority === 'High' ? 'danger' : 
                          event.priority === 'Medium' ? 'warning' : 'info'
                        }>
                          {event.priority}
                        </Badge>
                        <Badge variant="success">{event.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{event.type} • {event.location}</p>
                      <p className="text-xs text-gray-400 mt-1">Date: {event.date} • End: {event.endDate}</p>
                      <p className="text-xs text-gray-400">Participants: {event.participants}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Details</Button>
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