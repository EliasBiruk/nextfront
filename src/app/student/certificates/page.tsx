'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { useAuth } from '@/context/AuthContext';
import { enrollmentsService, coursesService } from '@/services';

export default function StudentCertificates() {
  const { currentUser } = useAuth();
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCertificates() {
      if (!currentUser) return;
      try {
        const enrollments = await enrollmentsService().getEnrollments({
          userId: currentUser.id,
          pagination: { page: 1, pageSize: 50 },
        });
        
        const completedEnrollments = enrollments.data.filter((e: any) => e.progress === 100);
        const certs = await Promise.all(
          completedEnrollments.map(async (enrollment: any) => {
            const courseResponse = await coursesService().getCourseById(enrollment.courseId);
            const course = courseResponse.course;
            return {
              id: enrollment.id,
              courseId: enrollment.courseId,
              courseTitle: course.title,
              issuedAt: enrollment.completedAt || new Date().toISOString(),
              verificationCode: `CERT-${enrollment.id}-${Date.now()}`,
              progress: enrollment.progress,
            };
          })
        );
        setCertificates(certs);
      } catch (error) {
        console.error('Failed to load certificates:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCertificates();
  }, [currentUser]);

  const handleViewCertificate = (certificate: any) => {
    setSelectedCertificate(certificate);
    setShowDetailModal(true);
  };

  const handleDownload = (certificate: any) => {
    alert(`Certificate download simulation for: ${certificate.courseTitle}\nCertificate ID: ${certificate.verificationCode}`);
  };

  const handleShare = (certificate: any) => {
    if (navigator.share) {
      navigator.share({
        title: `Certificate: ${certificate.courseTitle}`,
        text: `I earned a certificate for ${certificate.courseTitle} on JoyEdu!`,
        url: `${window.location.origin}/certificates/verify?code=${certificate.verificationCode}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/certificates/verify?code=${certificate.verificationCode}`);
      alert('Certificate link copied to clipboard!');
    }
  };

  return (
    <DashboardLayout actor="student" userName={currentUser?.firstName || 'Student'}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Certificates</h1>
        <p className="text-gray-600">View your earned certificates and achievements</p>
      </div>

      {isLoading ? (
        <Card>
          <CardBody>
            <p className="text-gray-600">Loading certificates...</p>
          </CardBody>
        </Card>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <CardBody>
                <div className="text-sm text-blue-100 mb-1">Total Certificates</div>
                <div className="text-3xl font-bold">{certificates.length}</div>
                <div className="text-sm text-blue-100 mt-1">Courses completed</div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
              <CardBody>
                <div className="text-sm text-purple-100 mb-1">Achievement Level</div>
                <div className="text-3xl font-bold">18</div>
                <div className="text-sm text-purple-100 mt-1">4,820 XP earned</div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
              <CardBody>
                <div className="text-sm text-green-100 mb-1">Learning Streak</div>
                <div className="text-3xl font-bold">12 days</div>
                <div className="text-sm text-green-100 mt-1">Keep it up!</div>
              </CardBody>
            </Card>
          </div>

          {/* Certificates List */}
          <Card>
            <CardBody>
              <CardTitle>Earned Certificates</CardTitle>
              
              {certificates.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎖️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No certificates yet</h3>
                  <p className="text-gray-600 mb-4">Complete courses to earn certificates</p>
                  <Button onClick={() => window.location.href = '/student/courses'}>
                    Browse Courses
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {certificates.map((certificate) => {
                    return (
                      <div key={certificate.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                        <div className="bg-gradient-to-br from-blue-50 to-white p-6">
                          <div className="text-center">
                            <div className="text-6xl mb-4">🎓</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Certificate of Completion</h3>
                            <p className="text-gray-600 mb-4">{certificate.courseTitle}</p>
                            <div className="flex justify-center gap-4 text-sm text-gray-500 mb-4">
                              <span>Issued: {new Date(certificate.issuedAt).toLocaleDateString()}</span>
                            </div>
                            <Badge variant="success">Verified</Badge>
                          </div>
                        </div>
                        <div className="p-4 bg-white border-t border-gray-200">
                          <div className="space-y-2">
                            <Button 
                              onClick={() => handleViewCertificate(certificate)}
                              className="w-full"
                            >
                              View Certificate
                            </Button>
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => handleDownload(certificate)}
                                size="sm"
                                className="flex-1"
                              >
                                Download
                              </Button>
                              <Button 
                                onClick={() => handleShare(certificate)}
                                size="sm"
                                className="flex-1"
                              >
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardBody>
          </Card>

          {/* Certificate Detail Modal */}
          {showDetailModal && selectedCertificate && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Card className="max-w-2xl w-full mx-4">
                <CardBody>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle>Certificate Details</CardTitle>
                    <button 
                      onClick={() => setShowDetailModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="border-2 border-gray-200 rounded-lg p-8 bg-gradient-to-br from-blue-50 to-white">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎓</div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Certificate of Completion</h2>
                      <p className="text-gray-600 mb-4">This certifies that</p>
                      <h3 className="text-xl font-semibold text-blue-600 mb-4">
                        {currentUser?.firstName} {currentUser?.lastName}
                      </h3>
                      <p className="text-gray-600 mb-4">has successfully completed</p>
                      <h3 className="text-lg font-semibold mb-4">{selectedCertificate.courseTitle}</h3>
                      <div className="flex justify-center gap-4 text-sm text-gray-500 mb-4">
                        <span>Issued: {new Date(selectedCertificate.issuedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>ID: {selectedCertificate.verificationCode}</span>
                      </div>
                      <Badge variant="success">Verified</Badge>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Verification:</strong> This certificate can be verified at{' '}
                      <a 
                        href={`/certificates/verify?code=${selectedCertificate.verificationCode}`}
                        className="text-blue-600 hover:underline"
                      >
                        joyedu.com/certificates/verify
                      </a>
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button 
                      onClick={() => handleDownload(selectedCertificate)}
                      className="flex-1"
                    >
                      Download PDF
                    </Button>
                    <Button 
                      onClick={() => handleShare(selectedCertificate)}
                      className="flex-1"
                    >
                      Share Certificate
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
}