'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { adminService } from '@/services';
import { useAuth } from '@/context/AuthContext';

export default function AdminApplications() {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    async function loadApplications() {
      try {
        const response = await adminService().getApplications();
        setApplications(response.data || []);
      } catch (error) {
        console.error('Failed to load applications:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadApplications();
  }, []);

  const filteredApplications = applications.filter(app => {
    return filterStatus === 'all' || app.status === filterStatus;
  });

  const handleReview = (application: any) => {
    setSelectedApplication(application);
    setShowReviewModal(true);
  };

  const handleDecision = async (applicationId: string, status: string, feedback?: string) => {
    try {
      await adminService().updateApplicationStatus(applicationId, status, feedback);
      setApplications(prev => prev.map(app => {
        if (app.id === applicationId) {
          return { ...app, status, feedback: feedback || null };
        }
        return app;
      }));
      setShowReviewModal(false);
      setSelectedApplication(null);
    } catch (error) {
      console.error('Failed to update application:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="admin" userName={currentUser?.firstName || 'Administrator'} />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2 text-[var(--joyedu-text-primary)]">Application Management</h1>
              <p className="text-[var(--joyedu-text-secondary)]">Review instructor and school applications</p>
            </div>

            {isLoading ? (
              <Card>
                <CardBody>
                  <p className="text-[var(--joyedu-text-secondary)]">Loading applications...</p>
                </CardBody>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <Button>Export Applications</Button>
                  </div>
                  <div className="flex gap-2">
                    <select 
                      className="px-3 py-2 border border-[var(--joyedu-border-300)] rounded-lg text-sm bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)]"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="SUBMITTED">Submitted</option>
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Application Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardBody className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{applications.length}</div>
                      <p className="text-gray-600 text-sm">Total Applications</p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="text-center">
                      <div className="text-3xl font-bold text-yellow-600 mb-1">
                    {applications.filter(a => a.status === 'SUBMITTED' || a.status === 'UNDER_REVIEW').length}
                  </div>
                  <p className="text-gray-600 text-sm">Pending</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {applications.filter(a => a.status === 'APPROVED').length}
                  </div>
                  <p className="text-gray-600 text-sm">Approved</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {applications.filter(a => a.status === 'REJECTED').length}
                  </div>
                  <p className="text-gray-600 text-sm">Rejected</p>
                </CardBody>
              </Card>
            </div>

            {/* Applications List */}
            <Card>
              <CardBody>
                <CardTitle>Applications ({filteredApplications.length} applications)</CardTitle>
                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <div key={application.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                            {application.firstName[0]}{application.lastName[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{application.firstName} {application.lastName}</h3>
                              <Badge variant={
                                application.status === 'APPROVED' ? 'success' : 
                                application.status === 'REJECTED' ? 'danger' : 
                                application.status === 'UNDER_REVIEW' ? 'warning' : 'default'
                              }>
                                {application.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{application.email}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Submitted: {application.submittedAt} • Expertise: {application.expertise}
                            </p>
                            {application.feedback && (
                              <p className="text-sm text-gray-600 mt-2">
                                <span className="font-semibold">Feedback:</span> {application.feedback}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleReview(application)} size="sm">
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredApplications.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No applications found matching your filters</div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Review Modal */}
            {showReviewModal && selectedApplication && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <CardBody>
                    <CardTitle>Review Application: {selectedApplication.firstName} {selectedApplication.lastName}</CardTitle>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="font-semibold">Applicant Details</h4>
                        <p className="text-sm text-gray-600">Email: {selectedApplication.email}</p>
                        <p className="text-sm text-gray-600">Expertise: {selectedApplication.expertise}</p>
                        <p className="text-sm text-gray-600">Experience: {selectedApplication.experience} years</p>
                        <p className="text-sm text-gray-600">Bio: {selectedApplication.bio}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Your Decision</h4>
                        <textarea
                          placeholder="Add feedback (optional)..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-2"
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button 
                          onClick={() => {
                            const feedbackInput = document.querySelector('textarea[placeholder="Add feedback (optional)..."]') as HTMLTextAreaElement;
                            handleDecision(selectedApplication.id, 'APPROVED', feedbackInput?.value);
                          }}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="danger"
                          onClick={() => {
                            const feedbackInput = document.querySelector('textarea[placeholder="Add feedback (optional)..."]') as HTMLTextAreaElement;
                            handleDecision(selectedApplication.id, 'REJECTED', feedbackInput?.value);
                          }}
                        >
                          Reject
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            const feedbackInput = document.querySelector('textarea[placeholder="Add feedback (optional)..."]') as HTMLTextAreaElement;
                            handleDecision(selectedApplication.id, 'UNDER_REVIEW', feedbackInput?.value);
                          }}
                        >
                          Request More Info
                        </Button>
                        <Button onClick={() => setShowReviewModal(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </>
          )}
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
}