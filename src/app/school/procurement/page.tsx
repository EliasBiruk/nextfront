import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolProcurement() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Procurement</h1>
        <p className="text-gray-600">Manage purchase requests, purchase orders, suppliers, and procurement workflow</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ New Request</Button>
          <Button variant="outline">Create PO</Button>
          <Button variant="outline">Add Supplier</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Types</option>
            <option>Purchase Requests</option>
            <option>Purchase Orders</option>
            <option>Quotations</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Procurement Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">245</div>
            <p className="text-gray-600 text-sm">Total Requests</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">180</div>
            <p className="text-gray-600 text-sm">Purchase Orders</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-bold text-purple-600 mb-1">$450K</div>
            <p className="text-gray-600 text-sm">Total Value</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">35</div>
            <p className="text-gray-600 text-sm">Suppliers</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">12</div>
            <p className="text-gray-600 text-sm">Pending Approval</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold">Requests</div>
            <div className="text-sm text-gray-600">Purchase requests</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📄</div>
            <div className="font-semibold">Purchase Orders</div>
            <div className="text-sm text-gray-600">PO management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🏢</div>
            <div className="font-semibold">Suppliers</div>
            <div className="text-sm text-gray-600">Supplier database</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="font-semibold">Invoices</div>
            <div className="text-sm text-gray-600">Invoice processing</div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Procurement Activity */}
      <Card>
        <CardBody>
          <CardTitle>Recent Procurement Activity</CardTitle>
          <div className="space-y-4">
            {[
              {
                type: 'Purchase Order',
                reference: 'PO-2024-045',
                supplier: 'Office Depot Education',
                description: 'Office Supplies - Monthly Stock',
                value: 2500,
                requestedBy: 'Administration',
                date: '2024-08-25',
                status: 'Approved',
                priority: 'Normal'
              },
              {
                type: 'Purchase Request',
                reference: 'PR-2024-089',
                supplier: 'Science Lab Supplies Inc.',
                description: 'Laboratory Equipment - Microscopes',
                value: 15000,
                requestedBy: 'Science Department',
                date: '2024-08-24',
                status: 'Pending',
                priority: 'High'
              },
              {
                type: 'Quotation',
                reference: 'QT-2024-032',
                supplier: 'Tech Solutions Ltd.',
                description: 'Computer Equipment - 50 Laptops',
                value: 45000,
                requestedBy: 'IT Department',
                date: '2024-08-23',
                status: 'In Progress',
                priority: 'High'
              },
              {
                type: 'Purchase Order',
                reference: 'PO-2024-044',
                supplier: 'Textbook Distributors',
                description: 'Textbooks - Mathematics Set',
                value: 8500,
                requestedBy: 'Academic Affairs',
                date: '2024-08-22',
                status: 'Completed',
                priority: 'Normal'
              },
              {
                type: 'Purchase Request',
                reference: 'PR-2024-088',
                supplier: 'Furniture World',
                description: 'Classroom Furniture - Student Desks',
                value: 12000,
                requestedBy: 'Administration',
                date: '2024-08-21',
                status: 'Approved',
                priority: 'Medium'
              },
            ].map((activity) => (
              <div key={activity.reference} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {activity.type === 'Purchase Order' ? '📄' : 
                       activity.type === 'Purchase Request' ? '📋' : 
                       activity.type === 'Quotation' ? '💰' : '📦'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{activity.type} - {activity.reference}</h3>
                        <Badge variant={
                          activity.priority === 'High' ? 'danger' : 
                          activity.priority === 'Medium' ? 'warning' : 'info'
                        }>
                          {activity.priority}
                        </Badge>
                        <Badge variant={
                          activity.status === 'Completed' ? 'success' : 
                          activity.status === 'Approved' ? 'success' : 
                          activity.status === 'In Progress' ? 'warning' : 
                          activity.status === 'Pending' ? 'danger' : 'default'
                        }>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">Supplier: {activity.supplier} • Requested by: {activity.requestedBy}</p>
                      <p className="text-xs text-gray-400">Date: {activity.date} • Value: ${activity.value.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Update</Button>
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