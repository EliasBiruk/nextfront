import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolStudentServices() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Services</h1>
        <p className="text-gray-600">Manage student profiles, documents, ID cards, certificates, and support services</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ New Request</Button>
          <Button variant="outline">Generate ID Card</Button>
          <Button variant="outline">Issue Certificate</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Services</option>
            <option>Profiles</option>
            <option>Documents</option>
            <option>ID Cards</option>
            <option>Certificates</option>
            <option>Requests</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Service Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">156</div>
            <p className="text-gray-600 text-sm">Pending Requests</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">2,420</div>
            <p className="text-gray-600 text-sm">ID Cards Issued</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">890</div>
            <p className="text-gray-600 text-sm">Certificates</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Leave Requests</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">12</div>
            <p className="text-gray-600 text-sm">Transfers</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👤</div>
            <div className="font-semibold">Profiles</div>
            <div className="text-sm text-gray-600">Student profiles</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📄</div>
            <div className="font-semibold">Documents</div>
            <div className="text-sm text-gray-600">Document management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🪪</div>
            <div className="font-semibold">ID Cards</div>
            <div className="text-sm text-gray-600">ID card issuance</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🎓</div>
            <div className="font-semibold">Certificates</div>
            <div className="text-sm text-gray-600">Certificate management</div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Service Requests */}
      <Card>
        <CardBody>
          <CardTitle>Recent Service Requests</CardTitle>
          <div className="space-y-4">
            {[
              {
                type: 'Document Request',
                student: 'John Smith (STU2024001)',
                request: 'Transcript Copy',
                submitted: '2024-08-25',
                status: 'Pending',
                priority: 'Normal'
              },
              {
                type: 'ID Card Request',
                student: 'Emma Johnson (STU2024002)',
                request: 'Replacement ID Card',
                submitted: '2024-08-24',
                status: 'In Progress',
                priority: 'High'
              },
              {
                type: 'Leave Request',
                student: 'Michael Chen (STU2024003)',
                request: 'Medical Leave - 3 days',
                submitted: '2024-08-23',
                status: 'Completed',
                priority: 'Normal'
              },
              {
                type: 'Certificate Request',
                student: 'Sarah Williams (STU2024004)',
                request: 'Academic Achievement Certificate',
                submitted: '2024-08-22',
                status: 'Completed',
                priority: 'Normal'
              },
              {
                type: 'Transfer Request',
                student: 'David Brown (STU2024005)',
                request: 'Transfer to Class 11-A',
                submitted: '2024-08-21',
                status: 'Pending',
                priority: 'High'
              },
            ].map((request) => (
              <div key={request.student} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {request.type === 'Document Request' ? '📄' : 
                       request.type === 'ID Card Request' ? '🪪' : 
                       request.type === 'Leave Request' ? '📅' : 
                       request.type === 'Certificate Request' ? '🎓' : '🔄'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{request.type}</h3>
                        <Badge variant={
                          request.priority === 'High' ? 'danger' : 'info'
                        }>
                          {request.priority}
                        </Badge>
                        <Badge variant={
                          request.status === 'Completed' ? 'success' : 
                          request.status === 'In Progress' ? 'warning' : 'default'
                        }>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{request.request}</p>
                      <p className="text-xs text-gray-400 mt-1">Student: {request.student} • Submitted: {request.submitted}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Process</Button>
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