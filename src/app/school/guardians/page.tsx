import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolGuardians() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Guardians</h1>
        <p className="text-gray-600">Manage student guardians and parent information</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Add Guardian</Button>
          <Button variant="outline">Import Guardians</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Relationships</option>
            <option>Parent</option>
            <option>Guardian</option>
            <option>Emergency Contact</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Guardian Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">1,850</div>
            <p className="text-gray-600 text-sm">Total Guardians</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">1,680</div>
            <p className="text-gray-600 text-sm">Active</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">2,450</div>
            <p className="text-gray-600 text-sm">Linked Students</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">92%</div>
            <p className="text-gray-600 text-sm">Contact Rate</p>
          </CardBody>
        </Card>
      </div>

      {/* Guardians List */}
      <Card>
        <CardBody>
          <CardTitle>Guardian Directory</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'John Smith',
                guardianId: 'GRD2024001',
                relationship: 'Father',
                students: ['John Smith Jr. (STU2024001)', 'Emma Smith (STU2024005)'],
                email: 'john.smith@email.com',
                phone: '+1 (555) 111-2222',
                address: '123 Oak Street, Springfield, IL 62701',
                status: 'Active',
                emergencyContact: true
              },
              {
                name: 'Mary Johnson',
                guardianId: 'GRD2024002',
                relationship: 'Mother',
                students: ['Michael Johnson (STU2024002)'],
                email: 'mary.johnson@email.com',
                phone: '+1 (555) 333-4444',
                address: '456 Maple Avenue, Springfield, IL 62702',
                status: 'Active',
                emergencyContact: true
              },
              {
                name: 'Robert Williams',
                guardianId: 'GRD2024003',
                relationship: 'Guardian',
                students: ['Sarah Williams (STU2024003)', 'David Williams (STU2024008)'],
                email: 'robert.williams@email.com',
                phone: '+1 (555) 555-6666',
                address: '789 Pine Road, Springfield, IL 62703',
                status: 'Active',
                emergencyContact: false
              },
              {
                name: 'Jennifer Davis',
                guardianId: 'GRD2024004',
                relationship: 'Mother',
                students: ['Emily Davis (STU2024004)'],
                email: 'jennifer.davis@email.com',
                phone: '+1 (555) 777-8888',
                address: '321 Elm Court, Springfield, IL 62704',
                status: 'Inactive',
                emergencyContact: true
              },
              {
                name: 'Thomas Brown',
                guardianId: 'GRD2024005',
                relationship: 'Father',
                students: ['Christopher Brown (STU2024006)', 'Sophie Brown (STU2024009)'],
                email: 'thomas.brown@email.com',
                phone: '+1 (555) 999-0000',
                address: '654 Cedar Lane, Springfield, IL 62705',
                status: 'Active',
                emergencyContact: true
              },
            ].map((guardian) => (
              <div key={guardian.guardianId} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {guardian.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{guardian.name}</h3>
                        <Badge variant={guardian.status === 'Active' ? 'success' : 'warning'}>
                          {guardian.status}
                        </Badge>
                        {guardian.emergencyContact && (
                          <Badge variant="danger" size="sm">Emergency</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{guardian.relationship}</p>
                      <p className="text-xs text-gray-400 mt-1">ID: {guardian.guardianId}</p>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Linked Students:</p>
                        {guardian.students.map((student) => (
                          <Badge key={student} variant="default" size="sm" className="mr-1 mt-1">{student}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>📧 {guardian.email}</span>
                        <span>📞 {guardian.phone}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">📍 {guardian.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Profile</Button>
                    <Button variant="outline" size="sm">Students</Button>
                    <Button variant="outline" size="sm">Communication</Button>
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