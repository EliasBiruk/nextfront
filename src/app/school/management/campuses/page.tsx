import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolCampuses() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Campuses</h1>
        <p className="text-gray-600">Manage school campuses and locations</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Add Campus</Button>
          <Button variant="outline">Import Campus Data</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">🗺️</Button>
          <Button variant="outline" size="sm">📊</Button>
        </div>
      </div>

      {/* Campus Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">3</div>
            <p className="text-gray-600 text-sm">Total Campuses</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">8</div>
            <p className="text-gray-600 text-sm">Total Buildings</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">156</div>
            <p className="text-gray-600 text-sm">Total Rooms</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Total Students</p>
          </CardBody>
        </Card>
      </div>

      {/* Campuses List */}
      <Card>
        <CardBody>
          <CardTitle>Campus Directory</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Main Campus',
                address: '123 Education Lane, Springfield, IL 62701',
                type: 'Primary',
                buildings: 5,
                rooms: 89,
                students: 1800,
                status: 'Active',
                established: '1985'
              },
              {
                name: 'West Campus',
                address: '456 Learning Street, Springfield, IL 62702',
                type: 'Secondary',
                buildings: 2,
                rooms: 42,
                students: 450,
                status: 'Active',
                established: '2005'
              },
              {
                name: 'East Campus',
                address: '789 Knowledge Avenue, Springfield, IL 62703',
                type: 'Specialized',
                buildings: 1,
                rooms: 25,
                students: 200,
                status: 'Active',
                established: '2015'
              },
            ].map((campus) => (
              <div key={campus.name} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      🏫
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{campus.name}</h3>
                        <Badge variant={campus.type === 'Primary' ? 'success' : campus.type === 'Secondary' ? 'info' : 'warning'}>
                          {campus.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{campus.address}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>{campus.buildings} buildings</span>
                        <span>{campus.rooms} rooms</span>
                        <span>{campus.students} students</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Established: {campus.established}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={campus.status === 'Active' ? 'success' : 'warning'}>
                      {campus.status}
                    </Badge>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View Map</Button>
                      <Button variant="outline" size="sm">Buildings</Button>
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