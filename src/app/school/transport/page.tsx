import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolTransport() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transport</h1>
        <p className="text-gray-600">Manage school vehicles, routes, stops, and student transportation</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Add Vehicle</Button>
          <Button variant="outline">Create Route</Button>
          <Button variant="outline">Assign Student</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Types</option>
            <option>Buses</option>
            <option>Vans</option>
            <option>Private Vehicles</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Maintenance</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Transport Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">12</div>
            <p className="text-gray-600 text-sm">Total Vehicles</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">8</div>
            <p className="text-gray-600 text-sm">Active Routes</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Stops</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">320</div>
            <p className="text-gray-600 text-sm">Students Transported</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">15</div>
            <p className="text-gray-600 text-sm">Drivers</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🚌</div>
            <div className="font-semibold">Vehicles</div>
            <div className="text-sm text-gray-600">Vehicle management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🛣️</div>
            <div className="font-semibold">Routes</div>
            <div className="text-sm text-gray-600">Route management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🚏</div>
            <div className="font-semibold">Stops</div>
            <div className="text-sm text-gray-600">Stop management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📍</div>
            <div className="font-semibold">Tracking</div>
            <div className="text-sm text-gray-600">Real-time tracking</div>
          </CardBody>
        </Card>
      </div>

      {/* Vehicle List */}
      <Card>
        <CardBody>
          <CardTitle>Vehicle Fleet</CardTitle>
          <div className="space-y-4">
            {[
              {
                vehicle: 'School Bus #1',
                plate: 'ABC-1234',
                type: 'Bus',
                capacity: 45,
                driver: 'John Driver',
                route: 'Route A - North Side',
                status: 'Active',
                maintenance: 'Up to date',
                students: 42
              },
              {
                vehicle: 'School Bus #2',
                plate: 'DEF-5678',
                type: 'Bus',
                capacity: 45,
                driver: 'Sarah Driver',
                route: 'Route B - South Side',
                status: 'Active',
                maintenance: 'Up to date',
                students: 38
              },
              {
                vehicle: 'School Van #1',
                plate: 'GHI-9012',
                type: 'Van',
                capacity: 15,
                driver: 'Mike Driver',
                route: 'Route C - Downtown',
                status: 'Active',
                maintenance: 'Up to date',
                students: 12
              },
              {
                vehicle: 'School Bus #3',
                plate: 'JKL-3456',
                type: 'Bus',
                capacity: 45,
                driver: 'Emily Driver',
                route: 'Route D - East Side',
                status: 'Maintenance',
                maintenance: 'Scheduled',
                students: 0
              },
              {
                vehicle: 'School Van #2',
                plate: 'MNO-7890',
                type: 'Van',
                capacity: 15,
                driver: 'Tom Driver',
                route: 'Route E - West Side',
                status: 'Active',
                maintenance: 'Up to date',
                students: 14
              },
            ].map((vehicle) => (
              <div key={vehicle.plate} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      🚌
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{vehicle.vehicle}</h3>
                        <Badge variant={vehicle.status === 'Active' ? 'success' : 'warning'}>
                          {vehicle.status}
                        </Badge>
                        <Badge variant="outline" size="sm">{vehicle.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Plate: {vehicle.plate} • Route: {vehicle.route}</p>
                      <p className="text-xs text-gray-400 mt-1">Driver: {vehicle.driver} • Capacity: {vehicle.capacity}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Students: <span className="font-semibold">{vehicle.students}</span></span>
                        <span className="text-gray-600">Maintenance: <span className="font-semibold">{vehicle.maintenance}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Track</Button>
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