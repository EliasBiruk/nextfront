import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolBuildings() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Buildings</h1>
        <p className="text-gray-600">Manage school buildings and facilities</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Add Building</Button>
          <Button variant="outline">Import Building Data</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">🗺️</Button>
          <Button variant="outline" size="sm">📊</Button>
        </div>
      </div>

      {/* Building Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">8</div>
            <p className="text-gray-600 text-sm">Total Buildings</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">156</div>
            <p className="text-gray-600 text-sm">Total Rooms</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Classrooms</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">12</div>
            <p className="text-gray-600 text-sm">Special Facilities</p>
          </CardBody>
        </Card>
      </div>

      {/* Buildings List */}
      <Card>
        <CardBody>
          <CardTitle>Building Directory</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Academic Building A',
                campus: 'Main Campus',
                floors: 4,
                rooms: 32,
                type: 'Academic',
                status: 'Active',
                yearBuilt: '1985'
              },
              {
                name: 'Science Building',
                campus: 'Main Campus',
                floors: 3,
                rooms: 24,
                type: 'Specialized',
                status: 'Active',
                yearBuilt: '1992'
              },
              {
                name: 'Arts Center',
                campus: 'Main Campus',
                floors: 2,
                rooms: 18,
                type: 'Specialized',
                status: 'Active',
                yearBuilt: '1998'
              },
              {
                name: 'Sports Complex',
                campus: 'Main Campus',
                floors: 2,
                rooms: 15,
                type: 'Athletic',
                status: 'Active',
                yearBuilt: '2000'
              },
              {
                name: 'Library Building',
                campus: 'Main Campus',
                floors: 3,
                rooms: 20,
                type: 'Academic',
                status: 'Active',
                yearBuilt: '1988'
              },
              {
                name: 'West Wing',
                campus: 'West Campus',
                floors: 2,
                rooms: 22,
                type: 'Academic',
                status: 'Active',
                yearBuilt: '2005'
              },
              {
                name: 'East Hall',
                campus: 'East Campus',
                floors: 2,
                rooms: 25,
                type: 'Academic',
                status: 'Active',
                yearBuilt: '2015'
              },
              {
                name: 'Administration Building',
                campus: 'Main Campus',
                floors: 2,
                rooms: 12,
                type: 'Administrative',
                status: 'Active',
                yearBuilt: '1985'
              },
            ].map((building) => (
              <div key={building.name} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      🏢
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{building.name}</h3>
                        <Badge variant={
                          building.type === 'Academic' ? 'info' : 
                          building.type === 'Specialized' ? 'success' : 
                          building.type === 'Athletic' ? 'warning' : 'default'
                        }>
                          {building.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{building.campus}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>{building.floors} floors</span>
                        <span>{building.rooms} rooms</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Built: {building.yearBuilt}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={building.status === 'Active' ? 'success' : 'warning'}>
                      {building.status}
                    </Badge>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Rooms</Button>
                      <Button variant="outline" size="sm">Floor Plan</Button>
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