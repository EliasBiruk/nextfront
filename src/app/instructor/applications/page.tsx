import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function InstructorApplications() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="instructor" userName="Dr. Sarah Johnson" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Course Applications</h1>
              <p className="text-gray-600">Track course submission and review status</p>
            </div>

            {/* Active Applications */}
            <Card className="mb-6">
              <CardBody>
                <CardTitle>Active Applications</CardTitle>
                <div className="space-y-4">
                  {[
                    {
                      title: 'React for Beginners',
                      submitted: '3 days ago',
                      status: 'In Review',
                      reviewer: 'JoyEdu Review Team',
                      notes: 'Your course is currently being reviewed for quality and content standards.'
                    },
                    {
                      title: 'Node.js Fundamentals',
                      submitted: '1 week ago',
                      status: 'Pending',
                      reviewer: 'Waiting for assignment',
                      notes: 'Your application is in the queue and will be reviewed shortly.'
                    },
                  ].map((app) => (
                    <div key={app.title} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{app.title}</h3>
                          <p className="text-sm text-gray-600">Submitted {app.submitted}</p>
                        </div>
                        <Badge variant={
                          app.status === 'In Review' ? 'warning' : 'default'
                        }>
                          {app.status}
                        </Badge>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-gray-600"><strong>Reviewer:</strong> {app.reviewer}</p>
                        <p className="text-sm text-gray-600 mt-1">{app.notes}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Withdraw</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Application History */}
            <Card>
              <CardBody>
                <CardTitle>Application History</CardTitle>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Complete Web Development Bootcamp',
                      submitted: '2 months ago',
                      status: 'Approved',
                      approvedDate: 'Jan 15, 2026',
                      currentStatus: 'Published'
                    },
                    {
                      title: 'Advanced JavaScript Patterns',
                      submitted: '3 months ago',
                      status: 'Approved',
                      approvedDate: 'Dec 20, 2025',
                      currentStatus: 'Published'
                    },
                  ].map((app) => (
                    <div key={app.title} className="p-4 border border-gray-200 rounded-lg bg-green-50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{app.title}</h3>
                          <p className="text-sm text-gray-600">Submitted {app.submitted}</p>
                        </div>
                        <Badge variant="success">{app.status}</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Approved: {app.approvedDate}</p>
                        <p>Current Status: <span className="font-medium">{app.currentStatus}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Apply for New Course */}
            <Card className="mt-6">
              <CardBody>
                <CardTitle>Submit New Course</CardTitle>
                <p className="text-gray-600 mb-4">Ready to share your knowledge with the world?</p>
                <Button>Start New Application</Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}