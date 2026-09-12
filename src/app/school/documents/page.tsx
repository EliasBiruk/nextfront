import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolDocuments() {
  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Documents</h1>
        <p className="text-gray-600">Manage document center, student/staff/academic documents, certificates, and verification</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>+ Upload Document</Button>
          <Button variant="outline">Create Template</Button>
          <Button variant="outline">Verify Document</Button>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Categories</option>
            <option>Student Documents</option>
            <option>Staff Documents</option>
            <option>Academic Documents</option>
            <option>Certificates</option>
            <option>Report Cards</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Archived</option>
            <option>Pending Review</option>
          </select>
        </div>
      </div>

      {/* Document Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">12,450</div>
            <p className="text-gray-600 text-sm">Total Documents</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">8,890</div>
            <p className="text-gray-600 text-sm">Student Documents</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">2,450</div>
            <p className="text-gray-600 text-sm">Staff Documents</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">1,110</div>
            <p className="text-gray-600 text-sm">Certificates</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">156</div>
            <p className="text-gray-600 text-sm">Templates</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📁</div>
            <div className="font-semibold">Document Center</div>
            <div className="text-sm text-gray-600">Central repository</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👤</div>
            <div className="font-semibold">Student Documents</div>
            <div className="text-sm text-gray-600">Student files</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📜</div>
            <div className="font-semibold">Certificates</div>
            <div className="text-sm text-gray-600">Certificate management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold">Verification</div>
            <div className="text-sm text-gray-600">Document verification</div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Documents */}
      <Card>
        <CardBody>
          <CardTitle>Recent Documents</CardTitle>
          <div className="space-y-4">
            {[
              {
                name: 'Transcript - John Smith',
                category: 'Student Document',
                type: 'Academic Record',
                student: 'John Smith (STU2024001)',
                uploadedBy: 'Academic Affairs',
                date: '2024-08-25',
                status: 'Active',
                size: '2.4 MB',
                verified: true
              },
              {
                name: 'Teaching Certificate - Ms. Brown',
                category: 'Staff Document',
                type: 'Professional Certification',
                student: 'Ms. Brown (TCH2024001)',
                uploadedBy: 'HR Department',
                date: '2024-08-24',
                status: 'Active',
                size: '1.8 MB',
                verified: true
              },
              {
                name: 'Graduation Certificate - Class of 2024',
                category: 'Certificate',
                type: 'Academic Certificate',
                student: 'Multiple Students',
                uploadedBy: 'Academic Affairs',
                date: '2024-08-23',
                status: 'Active',
                size: '15.2 MB',
                verified: true
              },
              {
                name: 'Report Card - Mid-Term 2024',
                category: 'Academic Document',
                type: 'Grade Report',
                student: 'All Students',
                uploadedBy: 'Academic Affairs',
                date: '2024-08-22',
                status: 'Active',
                size: '8.5 MB',
                verified: true
              },
              {
                name: 'Employment Contract - New Hires',
                category: 'Staff Document',
                type: 'Legal Document',
                student: 'Multiple Staff',
                uploadedBy: 'HR Department',
                date: '2024-08-21',
                status: 'Pending Review',
                size: '4.2 MB',
                verified: false
              },
            ].map((document) => (
              <div key={document.name} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      📄
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{document.name}</h3>
                        <Badge variant="default" size="sm">{document.category}</Badge>
                        <Badge variant={
                          document.status === 'Active' ? 'success' : 'warning'
                        }>
                          {document.status}
                        </Badge>
                        {document.verified && <Badge variant="success">Verified</Badge>}
                      </div>
                      <p className="text-sm text-gray-600">{document.type} • {document.student}</p>
                      <p className="text-xs text-gray-400 mt-1">Uploaded by: {document.uploadedBy} • Size: {document.size}</p>
                      <p className="text-xs text-gray-400">Date: {document.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Download</Button>
                    <Button variant="outline" size="sm">Verify</Button>
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