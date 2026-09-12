'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getInstructorApplications, updateInstructorApplicationStatus } from '@/data/mockData';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function InstructorApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState(getInstructorApplications());
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReview = (application: any) => {
    setSelectedApplication(application);
    setFeedback(application.feedback || '');
  };

  const handleApprove = async () => {
    if (!selectedApplication) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    updateInstructorApplicationStatus(selectedApplication.id, 'APPROVED', feedback);
    setApplications(getInstructorApplications());
    setSelectedApplication(null);
    setFeedback('');
    setIsLoading(false);
  };

  const handleReject = async () => {
    if (!selectedApplication) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    updateInstructorApplicationStatus(selectedApplication.id, 'REJECTED', feedback);
    setApplications(getInstructorApplications());
    setSelectedApplication(null);
    setFeedback('');
    setIsLoading(false);
  };

  const handleRequestChanges = async () => {
    if (!selectedApplication) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    updateInstructorApplicationStatus(selectedApplication.id, 'RESUBMITTED', feedback);
    setApplications(getInstructorApplications());
    setSelectedApplication(null);
    setFeedback('');
    setIsLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return <Badge variant="info">Submitted</Badge>;
      case 'UNDER_REVIEW':
        return <Badge variant="warning">Under Review</Badge>;
      case 'APPROVED':
        return <Badge variant="success">Approved</Badge>;
      case 'REJECTED':
        return <Badge variant="danger">Rejected</Badge>;
      case 'RESUBMITTED':
        return <Badge variant="info">Resubmitted</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const pendingApplications = applications.filter(app => 
    ['SUBMITTED', 'UNDER_REVIEW', 'RESUBMITTED'].includes(app.status)
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Instructor Applications</h1>
        <p className="text-gray-600">
          Review and manage instructor applications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              <CardTitle>Pending Applications ({pendingApplications.length})</CardTitle>
              
              {pendingApplications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No pending applications
                </div>
              ) : (
                <div className="space-y-4 mt-4">
                  {pendingApplications.map((application) => (
                    <div
                      key={application.id}
                      className={`p-4 border rounded-lg cursor-pointer transition ${
                        selectedApplication?.id === application.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleReview(application)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {application.firstName} {application.lastName}
                          </h3>
                          <p className="text-sm text-gray-500">{application.email}</p>
                        </div>
                        {getStatusBadge(application.status)}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {application.expertise.slice(0, 3).map((skill: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {application.expertise.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                            +{application.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-400 mt-2">
                        Submitted: {application.submittedAt}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* All Applications */}
              <div className="mt-8">
                <h3 className="font-medium text-gray-900 mb-4">All Applications</h3>
                <div className="space-y-2">
                  {applications.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <span className="font-medium text-sm">
                          {application.firstName} {application.lastName}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {application.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(application.status)}
                        <button
                          onClick={() => handleReview(application)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Review Panel */}
        <div className="lg:col-span-1">
          {selectedApplication ? (
            <Card>
              <CardBody>
                <CardTitle>Review Application</CardTitle>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">Name</label>
                    <p className="font-medium">
                      {selectedApplication.firstName} {selectedApplication.lastName}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">Email</label>
                    <p className="text-sm">{selectedApplication.email}</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">Phone</label>
                    <p className="text-sm">{selectedApplication.phone || 'Not provided'}</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">Expertise</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedApplication.expertise.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">Experience</label>
                    <p className="text-sm">{selectedApplication.experience} years</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">Qualifications</label>
                    <p className="text-sm">{selectedApplication.qualifications || 'Not provided'}</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">Bio</label>
                    <p className="text-sm text-gray-600 mt-1">{selectedApplication.bio}</p>
                  </div>

                  {selectedApplication.website && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">Website</label>
                      <a
                        href={selectedApplication.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline block"
                      >
                        {selectedApplication.website}
                      </a>
                    </div>
                  )}

                  {selectedApplication.linkedin && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">LinkedIn</label>
                      <a
                        href={selectedApplication.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline block"
                      >
                        {selectedApplication.linkedin}
                      </a>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-medium text-gray-500">Feedback</label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={3}
                      placeholder="Add feedback for the applicant..."
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {selectedApplication.feedback && selectedApplication.status !== 'SUBMITTED' && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <label className="text-xs font-medium text-gray-500">Previous Feedback</label>
                      <p className="text-sm text-gray-600 mt-1">{selectedApplication.feedback}</p>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <Button
                      onClick={handleApprove}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? 'Processing...' : 'Approve'}
                    </Button>
                    <Button
                      onClick={handleRequestChanges}
                      disabled={isLoading}
                      variant="outline"
                      className="w-full"
                    >
                      {isLoading ? 'Processing...' : 'Request Changes'}
                    </Button>
                    <Button
                      onClick={handleReject}
                      disabled={isLoading}
                      variant="danger"
                      className="w-full"
                    >
                      {isLoading ? 'Processing...' : 'Reject'}
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody>
                <div className="text-center py-8 text-gray-500">
                  <p>Select an application to review</p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
