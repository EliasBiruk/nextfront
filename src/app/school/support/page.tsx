import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolSupport() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Support</h1>
        <p className="text-gray-600">Manage helpdesk tickets, support requests, and knowledge base</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Create Ticket</Button>
          <Button variant="outline">Add Knowledge Article</Button>
          <Button variant="outline">View Dashboard</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Categories</option>
            <option>Technical</option>
            <option>Academic</option>
            <option>Administrative</option>
            <option>Financial</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </div>
      </div>

      {/* Support Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">245</div>
            <p className="text-gray-600 text-sm">Total Tickets</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">56</div>
            <p className="text-gray-600 text-sm">Open Tickets</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">89</div>
            <p className="text-gray-600 text-sm">In Progress</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">100</div>
            <p className="text-gray-600 text-sm">Resolved</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">180</div>
            <p className="text-gray-600 text-sm">Knowledge Articles</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🎫</div>
            <div className="font-semibold">Tickets</div>
            <div className="text-sm text-gray-600">Support tickets</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold">Open Tickets</div>
            <div className="text-sm text-gray-600">Pending issues</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold">Resolved</div>
            <div className="text-sm text-gray-600">Completed tickets</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-semibold">Knowledge Base</div>
            <div className="text-sm text-gray-600">Help articles</div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Support Tickets */}
      <Card>
        <CardBody>
          <CardTitle>Recent Support Tickets</CardTitle>
          <div className="space-y-4">
            {[
              {
                id: 'TKT-2024-089',
                subject: 'Cannot access student portal',
                category: 'Technical',
                requester: 'John Smith (STU2024001)',
                assignedTo: 'IT Support',
                priority: 'High',
                status: 'Open',
                created: '2024-08-25',
                lastUpdated: '2024-08-25'
              },
              {
                id: 'TKT-2024-088',
                subject: 'Grade discrepancy in Math',
                category: 'Academic',
                requester: 'Emma Johnson (STU2024002)',
                assignedTo: 'Academic Affairs',
                priority: 'Medium',
                status: 'In Progress',
                created: '2024-08-24',
                lastUpdated: '2024-08-25'
              },
              {
                id: 'TKT-2024-087',
                subject: 'Fee payment not reflecting',
                category: 'Financial',
                requester: 'Michael Chen (STU2024003)',
                assignedTo: 'Finance Department',
                priority: 'High',
                status: 'Resolved',
                created: '2024-08-23',
                lastUpdated: '2024-08-24'
              },
              {
                id: 'TKT-2024-086',
                subject: 'Library book return issue',
                category: 'Administrative',
                requester: 'Sarah Williams (STU2024004)',
                assignedTo: 'Library Staff',
                priority: 'Low',
                status: 'Resolved',
                created: '2024-08-22',
                lastUpdated: '2024-08-23'
              },
              {
                id: 'TKT-2024-085',
                subject: 'Timetable conflict',
                category: 'Academic',
                requester: 'David Brown (STU2024005)',
                assignedTo: 'Academic Affairs',
                priority: 'Medium',
                status: 'In Progress',
                created: '2024-08-21',
                lastUpdated: '2024-08-22'
              },
            ].map((ticket) => (
              <div key={ticket.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      🎫
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{ticket.id} - {ticket.subject}</h3>
                        <Badge variant="outline" size="sm">{ticket.category}</Badge>
                        <Badge variant={
                          ticket.priority === 'High' ? 'danger' : 
                          ticket.priority === 'Medium' ? 'warning' : 'info'
                        }>
                          {ticket.priority}
                        </Badge>
                        <Badge variant={
                          ticket.status === 'Resolved' ? 'success' : 
                          ticket.status === 'In Progress' ? 'warning' : 
                          ticket.status === 'Open' ? 'danger' : 'default'
                        }>
                          {ticket.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Requester: {ticket.requester} • Assigned to: {ticket.assignedTo}</p>
                      <p className="text-xs text-gray-400 mt-1">Created: {ticket.created} • Last Updated: {ticket.lastUpdated}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Update</Button>
                    <Button variant="outline" size="sm">Close</Button>
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