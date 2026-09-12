import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolPolicies() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">School Policies</h1>
        <p className="text-gray-600">Manage school policies, rules, and regulations</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Add Policy</Button>
          <Button variant="outline">Import Policies</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Categories</option>
            <option>Academic</option>
            <option>Behavioral</option>
            <option>Attendance</option>
            <option>Health & Safety</option>
            <option>Technology</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>
      </div>

      {/* Policy Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">24</div>
            <p className="text-gray-600 text-sm">Total Policies</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">18</div>
            <p className="text-gray-600 text-sm">Active Policies</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">4</div>
            <p className="text-gray-600 text-sm">Draft Policies</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">2</div>
            <p className="text-gray-600 text-sm">Pending Review</p>
          </CardBody>
        </Card>
      </div>

      {/* Policies List */}
      <Card>
        <CardBody>
          <CardTitle>Policy Directory</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Student Code of Conduct',
                category: 'Behavioral',
                status: 'Active',
                lastUpdated: '2024-08-15',
                version: '3.2',
                appliesTo: ['Students', 'Staff']
              },
              {
                name: 'Attendance Policy',
                category: 'Attendance',
                status: 'Active',
                lastUpdated: '2024-08-10',
                version: '2.1',
                appliesTo: ['Students', 'Teachers', 'Staff']
              },
              {
                name: 'Academic Integrity Policy',
                category: 'Academic',
                status: 'Active',
                lastUpdated: '2024-08-05',
                version: '4.0',
                appliesTo: ['Students', 'Teachers']
              },
              {
                name: 'Health and Safety Policy',
                category: 'Health & Safety',
                status: 'Active',
                lastUpdated: '2024-07-28',
                version: '2.5',
                appliesTo: ['Students', 'Teachers', 'Staff', 'Visitors']
              },
              {
                name: 'Technology Use Policy',
                category: 'Technology',
                status: 'Active',
                lastUpdated: '2024-07-20',
                version: '1.8',
                appliesTo: ['Students', 'Teachers', 'Staff']
              },
              {
                name: 'Grading and Assessment Policy',
                category: 'Academic',
                status: 'Active',
                lastUpdated: '2024-07-15',
                version: '3.1',
                appliesTo: ['Teachers', 'Students']
              },
              {
                name: 'Anti-Bullying Policy',
                category: 'Behavioral',
                status: 'Active',
                lastUpdated: '2024-07-10',
                version: '2.3',
                appliesTo: ['Students', 'Staff', 'Parents']
              },
              {
                name: 'Privacy and Data Protection Policy',
                category: 'Technology',
                status: 'Draft',
                lastUpdated: '2024-08-18',
                version: '1.0',
                appliesTo: ['All']
              },
            ].map((policy) => (
              <div key={policy.name} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      📜
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{policy.name}</h3>
                        <Badge variant={
                          policy.category === 'Academic' ? 'info' : 
                          policy.category === 'Behavioral' ? 'warning' : 
                          policy.category === 'Attendance' ? 'success' : 
                          policy.category === 'Health & Safety' ? 'danger' : 'default'
                        }>
                          {policy.category}
                        </Badge>
                        <Badge variant={policy.status === 'Active' ? 'success' : policy.status === 'Draft' ? 'warning' : 'info'}>
                          {policy.status}
                        </Badge>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>Version {policy.version}</span>
                        <span>Updated: {policy.lastUpdated}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {policy.appliesTo.map((entity) => (
                          <Badge key={entity} variant="default" size="sm">{entity}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">History</Button>
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