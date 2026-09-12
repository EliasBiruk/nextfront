import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolRooms() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Rooms</h1>
        <p className="text-gray-600">Manage school rooms and facilities</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Add Room</Button>
          <Button variant="outline">Import Room Data</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Buildings</option>
            <option>Academic Building A</option>
            <option>Science Building</option>
            <option>Arts Center</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Room Types</option>
            <option>Classroom</option>
            <option>Laboratory</option>
            <option>Office</option>
            <option>Special Facility</option>
          </select>
        </div>
      </div>

      {/* Room Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">156</div>
            <p className="text-gray-600 text-sm">Total Rooms</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Classrooms</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">18</div>
            <p className="text-gray-600 text-sm">Laboratories</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">32</div>
            <p className="text-gray-600 text-sm">Offices</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">12</div>
            <p className="text-gray-600 text-sm">Special Facilities</p>
          </CardBody>
        </Card>
      </div>

      {/* Rooms List */}
      <Card>
        <CardBody>
          <CardTitle>Room Directory</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Room 101',
                building: 'Academic Building A',
                floor: 1,
                type: 'Classroom',
                capacity: 30,
                features: ['Projector', 'Whiteboard', 'WiFi'],
                status: 'Available'
              },
              {
                name: 'Room 102',
                building: 'Academic Building A',
                floor: 1,
                type: 'Classroom',
                capacity: 35,
                features: ['Projector', 'Smart Board', 'WiFi'],
                status: 'In Use'
              },
              {
                name: 'Chemistry Lab 1',
                building: 'Science Building',
                floor: 1,
                type: 'Laboratory',
                capacity: 25,
                features: ['Lab Equipment', 'Fume Hoods', 'Safety Equipment'],
                status: 'Available'
              },
              {
                name: 'Physics Lab 1',
                building: 'Science Building',
                floor: 2,
                type: 'Laboratory',
                capacity: 28,
                features: ['Lab Equipment', 'Projector', 'WiFi'],
                status: 'In Use'
              },
              {
                name: 'Computer Lab 1',
                building: 'Science Building',
                floor: 3,
                type: 'Laboratory',
                capacity: 30,
                features: ['Computers', 'Projector', 'WiFi'],
                status: 'Available'
              },
              {
                name: 'Art Studio 1',
                building: 'Arts Center',
                floor: 1,
                type: 'Special Facility',
                capacity: 20,
                features: ['Art Supplies', 'Easels', 'Storage'],
                status: 'Available'
              },
              {
                name: 'Music Room 1',
                building: 'Arts Center',
                floor: 2,
                type: 'Special Facility',
                capacity: 15,
                features: ['Instruments', 'Sound System', 'Practice Rooms'],
                status: 'In Use'
              },
              {
                name: 'Principal Office',
                building: 'Administration Building',
                floor: 1,
                type: 'Office',
                capacity: 5,
                features: ['Private Office', 'Meeting Area', 'WiFi'],
                status: 'In Use'
              },
            ].map((room) => (
              <div key={room.name} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      🚪
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{room.name}</h3>
                        <Badge variant={
                          room.type === 'Classroom' ? 'info' : 
                          room.type === 'Laboratory' ? 'success' : 
                          room.type === 'Office' ? 'default' : 'warning'
                        }>
                          {room.type}
                        </Badge>
                        <Badge variant={room.status === 'Available' ? 'success' : 'warning'}>
                          {room.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{room.building} • Floor {room.floor}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>Capacity: {room.capacity}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {room.features.map((feature) => (
                          <Badge key={feature} variant="default" size="sm">{feature}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Schedule</Button>
                    <Button variant="outline" size="sm">Equipment</Button>
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