'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { verifyCertificate, getCertificatesByUser, getCourses } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';

export default function CertificateVerifyPage() {
  const { currentUser } = useAuth();
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const userCertificates = currentUser ? getCertificatesByUser(currentUser.id) : [];
  const allCourses = getCourses();

  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      setError('Please enter a verification code');
      return;
    }

    setIsVerifying(true);
    setError('');
    setVerificationResult(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = verifyCertificate(verificationCode.trim());
    
    if (result) {
      const course = allCourses.find(c => c.id === result.courseId);
      setVerificationResult({ ...result, course });
    } else {
      setError('Certificate not found. Please check the verification code.');
    }

    setIsVerifying(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 text-[var(--joyedu-text-primary)]">Certificate Verification</h1>
              <p className="text-[var(--joyedu-text-secondary)]">
                Verify the authenticity of a JoyEdu certificate by entering its verification code
              </p>
            </div>

            {/* Verification Form */}
            <Card className="mb-8">
              <CardBody>
                <CardTitle>Verify Certificate</CardTitle>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                    placeholder="e.g., JOY-ABC123XYZ"
                    className="w-full px-4 py-3 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)] text-lg font-mono"
                  />
                  <p className="text-sm text-[var(--joyedu-text-muted)] mt-2">
                    Enter the verification code found on the certificate
                  </p>
                  
                  {error && (
                    <div className="mt-4 p-4 bg-[var(--joyedu-error-bg)] border border-[var(--joyedu-error-200)] rounded-lg text-[var(--joyedu-error-text)]">
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="mt-4"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify Certificate'}
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Verification Result */}
            {verificationResult && (
              <Card className="mb-8 border-[var(--joyedu-success-500)]">
                <CardBody>
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">🎖️</div>
                    <h2 className="text-2xl font-bold text-[var(--joyedu-success-700)] mb-2">Certificate Verified</h2>
                    <p className="text-[var(--joyedu-text-secondary)]">
                      This certificate is authentic and valid
                    </p>
                  </div>

                  <div className="bg-[var(--joyedu-success-50)] border border-[var(--joyedu-success-200)] rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-[var(--joyedu-text-secondary)]">Course</div>
                        <div className="font-semibold text-[var(--joyedu-text-primary)]">{verificationResult.course?.title}</div>
                      </div>
                      <div>
                        <div className="text-sm text-[var(--joyedu-text-secondary)]">Issued Date</div>
                        <div className="font-semibold text-[var(--joyedu-text-primary)]">{verificationResult.issuedAt}</div>
                      </div>
                      <div>
                        <div className="text-sm text-[var(--joyedu-text-secondary)]">Verification Code</div>
                        <div className="font-semibold text-[var(--joyedu-text-primary)] font-mono">{verificationResult.verificationCode}</div>
                      </div>
                      <div>
                        <div className="text-sm text-[var(--joyedu-text-secondary)]">Status</div>
                        <div className="font-semibold text-[var(--joyedu-success)]">{verificationResult.status}</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* User's Certificates */}
            {currentUser && userCertificates.length > 0 && (
              <Card>
                <CardBody>
                  <CardTitle>Your Certificates</CardTitle>
                  <div className="space-y-4 mt-4">
                    {userCertificates.map((cert) => {
                      const course = allCourses.find(c => c.id === cert.courseId);
                      return (
                        <div key={cert.id} className="p-4 border border-[var(--joyedu-border-200)] rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-4xl">🎖️</div>
                            <div>
                              <div className="font-semibold text-[var(--joyedu-text-primary)]">{course?.title}</div>
                              <div className="text-sm text-[var(--joyedu-text-secondary)]">Issued: {cert.issuedAt}</div>
                              <div className="text-xs text-[var(--joyedu-text-muted)] font-mono mt-1">
                                Code: {cert.verificationCode}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Certificate
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
