'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RefundsPage() {
  const router = useRouter();
  const [showNewRefundForm, setShowNewRefundForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const refundRequests = [
    {
      id: 'REF-001',
      orderId: 'ORD-007',
      courseName: 'Advanced Python',
      amount: '$199',
      requestDate: 'Aug 10, 2026',
      status: 'approved',
      processedDate: 'Aug 12, 2026',
      reason: 'Course not suitable',
      icon: '✅'
    },
    {
      id: 'REF-002',
      orderId: 'ORD-005',
      courseName: 'TypeScript Fundamentals',
      amount: '$89',
      requestDate: 'Aug 22, 2026',
      status: 'pending',
      processedDate: null,
      reason: 'Changed learning path',
      icon: '⏳'
    },
  ];

  const eligibleCourses = [
    { id: 'ORD-002', name: 'React Development', amount: '$249', purchaseDate: 'Sep 3, 2026', progress: 45 },
    { id: 'ORD-004', name: 'Python for Data Science', amount: '$199', purchaseDate: 'Aug 28, 2026', progress: 30 },
    { id: 'ORD-003', name: 'Premium Plan - Monthly', amount: '$49', purchaseDate: 'Sep 1, 2026', progress: null, type: 'subscription' },
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Refunds</h1>
        <p className="text-gray-600">Manage your refund requests and view refund history.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">2</div>
                <div className="text-blue-100 text-sm">Total Requests</div>
              </div>
              <div className="text-4xl opacity-80">📋</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">1</div>
                <div className="text-green-100 text-sm">Approved</div>
              </div>
              <div className="text-4xl opacity-80">✅</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">1</div>
                <div className="text-orange-100 text-sm">Pending</div>
              </div>
              <div className="text-4xl opacity-80">⏳</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">$99</div>
                <div className="text-purple-100 text-sm">Total Refunded</div>
              </div>
              <div className="text-4xl opacity-80">💰</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* New Refund Request */}
      <Card className="mb-8">
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Request New Refund</CardTitle>
            {!showNewRefundForm && (
              <button
                onClick={() => setShowNewRefundForm(true)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
              >
                New Refund Request
              </button>
            )}
          </div>

          {showNewRefundForm ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a course...</option>
                  {eligibleCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} - {course.amount} {course.type === 'subscription' && '(Not eligible)'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Refund</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a reason...</option>
                  <option value="not_suitable">Course not suitable</option>
                  <option value="changed_path">Changed learning path</option>
                  <option value="technical_issues">Technical issues</option>
                  <option value="quality">Content quality concerns</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide more details about your refund request..."
                ></textarea>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                  Submit Request
                </button>
                <button
                  onClick={() => setShowNewRefundForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">💰</div>
              <div>Click "New Refund Request" to submit a refund request</div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Refund Requests */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Refund Requests</CardTitle>
          <div className="space-y-4">
            {refundRequests.map((request) => (
              <div
                key={request.id}
                className="border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{request.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{request.id}</h3>
                        <p className="text-sm text-gray-600">{request.orderId} • {request.requestDate}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded ${
                      request.status === 'approved' ? 'bg-green-100 text-green-700' :
                      request.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Course</div>
                      <div className="font-medium text-gray-900">{request.courseName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Amount</div>
                      <div className="font-medium text-gray-900">{request.amount}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Reason</div>
                      <div className="font-medium text-gray-900">{request.reason}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Processed Date</div>
                      <div className="font-medium text-gray-900">{request.processedDate || '—'}</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                      View Details
                    </button>
                    {request.status === 'approved' && (
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition">
                        Download Receipt
                      </button>
                    )}
                  </div>
                  <button className="text-blue-600 hover:underline text-sm font-medium">
                    Contact Support →
                  </button>
                </div>
              </div>
            ))}
            {refundRequests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📋</div>
                <div>No refund requests found</div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Refund Policy */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Refund Policy</CardTitle>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl">📅</div>
              <div>
                <div className="font-semibold text-blue-900 mb-1">30-Day Refund Window</div>
                <div className="text-sm text-blue-700">You can request a refund within 30 days of purchase if you've completed less than 20% of the course content.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl">✅</div>
              <div>
                <div className="font-semibold text-green-900 mb-1">Quick Processing</div>
                <div className="text-sm text-green-700">Refunds are typically processed within 5-7 business days to your original payment method.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl">⚠️</div>
              <div>
                <div className="font-semibold text-orange-900 mb-1">Exceptions</div>
                <div className="text-sm text-orange-700">Subscription plans and completed courses (100% progress) are not eligible for refunds.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl">🔄</div>
              <div>
                <div className="font-semibold text-purple-900 mb-1">Partial Refunds</div>
                <div className="text-sm text-purple-700">In some cases, partial refunds may be offered based on course completion percentage.</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Eligible Courses */}
      <Card>
        <CardBody>
          <CardTitle>Eligible Courses for Refund</CardTitle>
          <div className="space-y-3">
            {eligibleCourses.filter(c => c.type !== 'subscription').map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                onClick={() => {
                  setSelectedCourse(course.id);
                  setShowNewRefundForm(true);
                }}
              >
                <div className="text-2xl">📚</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{course.name}</div>
                  <div className="text-sm text-gray-600">Purchased: {course.purchaseDate} • Progress: {course.progress}%</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{course.amount}</div>
                  <div className="text-xs text-green-600">Eligible</div>
                </div>
              </div>
            ))}
            {eligibleCourses.filter(c => c.type !== 'subscription').length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">✅</div>
                <div>No eligible courses for refund</div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
