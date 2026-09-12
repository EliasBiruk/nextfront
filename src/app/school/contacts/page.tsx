import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolContacts() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Contacts</h1>
        <p className="text-gray-600">Manage external contacts and important relationships</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Add Contact</Button>
          <Button variant="outline">Import Contacts</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Categories</option>
            <option>Suppliers</option>
            <option>Partners</option>
            <option>Government</option>
            <option>Emergency Services</option>
            <option>Other</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Contact Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Total Contacts</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">18</div>
            <p className="text-gray-600 text-sm">Suppliers</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
            <p className="text-gray-600 text-sm">Partners</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">8</div>
            <p className="text-gray-600 text-sm">Government</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">7</div>
            <p className="text-gray-600 text-sm">Emergency</p>
          </CardBody>
        </Card>
      </div>

      {/* Contacts List */}
      <Card>
        <CardBody>
          <CardTitle>Contact Directory</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Springfield Book Supply Co.',
                contactId: 'CON2024001',
                category: 'Suppliers',
                type: 'Business',
                contactPerson: 'John Supplier',
                email: 'orders@springfieldbooks.com',
                phone: '+1 (555) 200-1111',
                address: '100 Book Street, Springfield, IL 62701',
                status: 'Active',
                lastContact: '2024-08-20'
              },
              {
                name: 'State Education Department',
                contactId: 'CON2024002',
                category: 'Government',
                type: 'Government Agency',
                contactPerson: 'Mary Official',
                email: 'education@state.gov',
                phone: '+1 (555) 300-2222',
                address: '200 Government Plaza, Springfield, IL 62701',
                status: 'Active',
                lastContact: '2024-08-15'
              },
              {
                name: 'Tech Solutions Inc.',
                contactId: 'CON2024003',
                category: 'Partners',
                type: 'Technology Partner',
                contactPerson: 'James Tech',
                email: 'partnership@techsolutions.com',
                phone: '+1 (555) 400-3333',
                address: '300 Innovation Drive, Springfield, IL 62702',
                status: 'Active',
                lastContact: '2024-08-18'
              },
              {
                name: 'Springfield General Hospital',
                contactId: 'CON2024004',
                category: 'Emergency Services',
                type: 'Medical Facility',
                contactPerson: 'Dr. Emergency',
                email: 'emergency@springfieldhospital.com',
                phone: '+1 (555) 911-0000',
                address: '400 Health Avenue, Springfield, IL 62703',
                status: 'Active',
                lastContact: '2024-08-10'
              },
              {
                name: 'Office Depot Education',
                contactId: 'CON2024005',
                category: 'Suppliers',
                type: 'Office Supplies',
                contactPerson: 'Lisa Office',
                email: 'education@officedepot.com',
                phone: '+1 (555) 200-4444',
                address: '500 Supply Road, Springfield, IL 62704',
                status: 'Active',
                lastContact: '2024-08-12'
              },
              {
                name: 'Local Police Department',
                contactId: 'CON2024006',
                category: 'Emergency Services',
                type: 'Law Enforcement',
                contactPerson: 'Officer Safety',
                email: 'community@springfieldpd.gov',
                phone: '+1 (555) 911-1111',
                address: '600 Safety Boulevard, Springfield, IL 62705',
                status: 'Active',
                lastContact: '2024-08-05'
              },
              {
                name: 'University Partnership Program',
                contactId: 'CON2024007',
                category: 'Partners',
                type: 'Educational Partner',
                contactPerson: 'Prof. Partnership',
                email: 'partnership@university.edu',
                phone: '+1 (555) 400-5555',
                address: '700 College Road, Springfield, IL 62706',
                status: 'Inactive',
                lastContact: '2024-06-20'
              },
            ].map((contact) => (
              <div key={contact.contactId} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {contact.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{contact.name}</h3>
                        <Badge variant={
                          contact.category === 'Suppliers' ? 'info' : 
                          contact.category === 'Partners' ? 'success' : 
                          contact.category === 'Government' ? 'warning' : 'danger'
                        }>
                          {contact.category}
                        </Badge>
                        <Badge variant={contact.status === 'Active' ? 'success' : 'warning'}>
                          {contact.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{contact.type}</p>
                      <p className="text-xs text-gray-400 mt-1">Contact: {contact.contactPerson} • ID: {contact.contactId}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>📧 {contact.email}</span>
                        <span>📞 {contact.phone}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">📍 {contact.address}</p>
                      <p className="text-xs text-gray-400 mt-1">Last Contact: {contact.lastContact}</p>
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