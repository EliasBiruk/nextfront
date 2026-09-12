'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

interface VerificationResult {
  valid: boolean;
  certificateId: string;
  courseName: string;
  studentName: string;
  completionDate: string;
  instructor: string;
  issueDate: string;
}

interface VerificationHistory {
  id: string;
  certificateId: string;
  verifiedAt: string;
  result: 'valid' | 'invalid';
}

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationHistory] = useState<VerificationHistory[]>([
    {
      id: '1',
      certificateId: 'CERT-2024-001',
      verifiedAt: '2024-01-15T10:30:00',
      result: 'valid',
    },
    {
      id: '2',
      certificateId: 'CERT-2024-002',
      verifiedAt: '2024-01-10T14:45:00',
      result: 'valid',
    },
    {
      id: '3',
      certificateId: 'INVALID-ID',
      verifiedAt: '2024-01-05T09:15:00',
      result: 'invalid',
    },
  ]);

  const handleVerify = () => {
    if (!certificateId.trim()) return;

    setIsVerifying(true);

    // Simulate verification delay
    setTimeout(() => {
      // Mock verification logic
      if (certificateId.startsWith('CERT-')) {
        setVerificationResult({
          valid: true,
          certificateId,
          courseName: 'Advanced React Development',
          studentName: 'Kapi',
          completionDate: '2024-01-10',
          instructor: 'Dr. Sarah Johnson',
          issueDate: '2024-01-12',
        });
      } else {
        setVerificationResult({
          valid: false,
          certificateId,
          courseName: '',
          studentName: '',
          completionDate: '',
          instructor: '',
          issueDate: '',
        });
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleDownload = () => {
    // Mock download functionality
    alert('Certificate download initiated');
  };

  const handleShareLink = () => {
    // Mock share link functionality
    const shareUrl = `https://school.edu/certificate/${verificationResult?.certificateId}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard');
  };

  const handleSocialShare = (platform: string) => {
    // Mock social share functionality
    alert(`Sharing to ${platform}`);
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Certificate</h1>
        <p className="text-gray-600">Verify the authenticity of certificates</p>
      </div>

      <div className="space-y-6">
        {/* Verification Form */}
        <Card>
          <CardBody>
            <CardTitle>Certificate Verification</CardTitle>
            <div className="flex gap-4">
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter Certificate ID (e.g., CERT-2024-001)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleVerify}
                disabled={isVerifying || !certificateId.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </CardBody>
        </Card>

        {/* Verification Result */}
        {verificationResult && (
          <Card>
            <CardBody>
              <CardTitle>Verification Result</CardTitle>
              <div
                className={`p-4 rounded-lg mb-4 ${
                  verificationResult.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {verificationResult.valid ? (
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <span className={`font-semibold ${verificationResult.valid ? 'text-green-800' : 'text-red-800'}`}>
                    {verificationResult.valid ? 'Valid Certificate' : 'Invalid Certificate'}
                  </span>
                </div>
              </div>

              {verificationResult.valid && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Certificate ID</p>
                      <p className="font-medium text-gray-900">{verificationResult.certificateId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Course Name</p>
                      <p className="font-medium text-gray-900">{verificationResult.courseName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Student Name</p>
                      <p className="font-medium text-gray-900">{verificationResult.studentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Instructor</p>
                      <p className="font-medium text-gray-900">{verificationResult.instructor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completion Date</p>
                      <p className="font-medium text-gray-900">{new Date(verificationResult.completionDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="font-medium text-gray-900">{new Date(verificationResult.issueDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Sharing Options */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Share Certificate</h4>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </button>
                      <button
                        onClick={handleShareLink}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Copy Link
                      </button>
                      <button
                        onClick={() => handleSocialShare('LinkedIn')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleSocialShare('Twitter')}
                        className="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        Twitter
                      </button>
                    </div>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        )}

        {/* Verification History */}
        <Card>
          <CardBody>
            <CardTitle>Verification History</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Certificate ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Verified At</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {verificationHistory.map((history) => (
                    <tr key={history.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{history.certificateId}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(history.verifiedAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            history.result === 'valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {history.result === 'valid' ? 'Valid' : 'Invalid'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
