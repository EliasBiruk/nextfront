import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolIdCards() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ID Cards</h1>
        <p className="text-gray-600">Manage student, teacher, and staff ID cards, templates, and printing</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Generate ID Card</Button>
          <Button variant="outline">Create Template</Button>
          <Button variant="outline">Print Cards</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Types</option>
            <option>Student ID Cards</option>
            <option>Teacher ID Cards</option>
            <option>Staff ID Cards</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Issued</option>
            <option>Expired</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* ID Card Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">2,450</div>
            <p className="text-gray-600 text-sm">Total Cards</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">2,050</div>
            <p className="text-gray-600 text-sm">Student Cards</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">280</div>
            <p className="text-gray-600 text-sm">Teacher Cards</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">120</div>
            <p className="text-gray-600 text-sm">Staff Cards</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Pending Issue</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👨‍🎓</div>
            <div className="font-semibold">Student Cards</div>
            <div className="text-sm text-gray-600">Student ID cards</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👨‍🏫</div>
            <div className="font-semibold">Teacher Cards</div>
            <div className="text-sm text-gray-600">Teacher ID cards</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👨‍💼</div>
            <div className="font-semibold">Staff Cards</div>
            <div className="text-sm text-gray-600">Staff ID cards</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🎨</div>
            <div className="font-semibold">Templates</div>
            <div className="text-sm text-gray-600">Card templates</div>
          </CardBody>
        </Card>
      </div>

      {/* ID Card List */}
      <Card>
        <CardBody>
          <CardTitle>ID Card Management</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'John Smith',
                type: 'Student ID Card',
                cardNumber: 'STU2024001-ID',
                role: 'Student',
                class: 'Class 10-A',
                issuedDate: '2024-08-15',
                expiryDate: '2025-08-15',
                status: 'Active',
                template: 'Standard Student Template'
              },
              {
                name: 'Ms. Brown',
                type: 'Teacher ID Card',
                cardNumber: 'TCH2024001-ID',
                role: 'Teacher',
                class: 'Science Department',
                issuedDate: '2024-08-10',
                expiryDate: '2025-08-10',
                status: 'Active',
                template: 'Standard Teacher Template'
              },
              {
                name: 'Mr. Davis',
                type: 'Staff ID Card',
                cardNumber: 'STF2024001-ID',
                role: 'Staff',
                class: 'Administration',
                issuedDate: '2024-08-05',
                expiryDate: '2025-08-05',
                status: 'Active',
                template: 'Standard Staff Template'
              },
              {
                name: 'Emma Johnson',
                type: 'Student ID Card',
                cardNumber: 'STU2024002-ID',
                role: 'Student',
                class: 'Class 11-B',
                issuedDate: '2024-08-20',
                expiryDate: '2025-08-20',
                status: 'Pending',
                template: 'Standard Student Template'
              },
              {
                name: 'Dr. Chen',
                type: 'Teacher ID Card',
                cardNumber: 'TCH2024002-ID',
                role: 'Teacher',
                class: 'Mathematics Department',
                issuedDate: '2024-08-12',
                expiryDate: '2025-08-12',
                status: 'Active',
                template: 'Standard Teacher Template'
              },
            ].map((card) => (
              <div key={card.cardNumber} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      🪪
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{card.name}</h3>
                        <Badge variant="default" size="sm">{card.type}</Badge>
                        <Badge variant={
                          card.status === 'Active' ? 'success' : 
                          card.status === 'Pending' ? 'warning' : 'danger'
                        }>
                          {card.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Card: {card.cardNumber} • {card.role}</p>
                      <p className="text-xs text-gray-400 mt-1">{card.class} • Template: {card.template}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Issued: <span className="font-semibold">{card.issuedDate}</span></span>
                        <span className="text-gray-600">Expires: <span className="font-semibold">{card.expiryDate}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Print</Button>
                    <Button variant="outline" size="sm">Renew</Button>
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