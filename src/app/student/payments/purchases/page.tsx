'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PurchasesPage() {
  const router = useRouter();

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Purchase History</h1>
        <p className="text-gray-600">View all your course purchases and downloads.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">8</div>
                <div className="text-blue-100 text-sm">Total Purchases</div>
              </div>
              <div className="text-4xl opacity-80">🛒</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">$1,247</div>
                <div className="text-green-100 text-sm">Total Spent</div>
              </div>
              <div className="text-4xl opacity-80">💰</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">3</div>
                <div className="text-purple-100 text-sm">Refund Eligible</div>
              </div>
              <div className="text-4xl opacity-80">🔄</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Purchase History */}
      <Card>
        <CardBody>
          <CardTitle>Purchase History</CardTitle>
          <div className="space-y-4">
            {[
              {
                id: 'PUR-001',
                name: 'JavaScript Fundamentals',
                type: 'course',
                amount: '$199',
                date: 'Sep 5, 2026',
                status: 'completed',
                refundEligible: false,
                downloadAvailable: true,
                icon: '📚',
                progress: 78
              },
              {
                id: 'PUR-002',
                name: 'React Development',
                type: 'course',
                amount: '$249',
                date: 'Sep 3, 2026',
                status: 'completed',
                refundEligible: true,
                downloadAvailable: true,
                icon: '⚛️',
                progress: 45
              },
              {
                id: 'PUR-003',
                name: 'Python for Data Science',
                type: 'course',
                amount: '$199',
                date: 'Aug 28, 2026',
                status: 'completed',
                refundEligible: true,
                downloadAvailable: true,
                icon: '🐍',
                progress: 30
              },
              {
                id: 'PUR-004',
                name: 'TypeScript Fundamentals',
                type: 'course',
                amount: '$89',
                date: 'Aug 20, 2026',
                status: 'completed',
                refundEligible: true,
                downloadAvailable: true,
                icon: '📘',
                progress: 0
              },
              {
                id: 'PUR-005',
                name: 'CSS Masterclass',
                type: 'course',
                amount: '$149',
                date: 'Aug 15, 2026',
                status: 'completed',
                refundEligible: false,
                downloadAvailable: true,
                icon: '🎨',
                progress: 100
              },
              {
                id: 'PUR-006',
                name: 'Node.js Backend Development',
                type: 'course',
                amount: '$199',
                date: 'Aug 10, 2026',
                status: 'completed',
                refundEligible: false,
                downloadAvailable: true,
                icon: '🟢',
                progress: 92
              },
              {
                id: 'PUR-007',
                name: 'Premium Plan - Monthly',
                type: 'subscription',
                amount: '$49',
                date: 'Sep 1, 2026',
                status: 'active',
                refundEligible: false,
                downloadAvailable: false,
                icon: '⭐',
                progress: null
              },
              {
                id: 'PUR-008',
                name: 'Database Design',
                type: 'course',
                amount: '$129',
                date: 'Jul 25, 2026',
                status: 'completed',
                refundEligible: false,
                downloadAvailable: true,
                icon: '🗄️',
                progress: 100
              },
            ].map((purchase) => (
              <div
                key={purchase.id}
                className="border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{purchase.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{purchase.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded ${
                          purchase.status === 'active' ? 'bg-green-100 text-green-700' :
                          purchase.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {purchase.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {purchase.id} • {purchase.type} • {purchase.date}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-gray-900">{purchase.amount}</span>
                        {purchase.progress !== null && (
                          <span className="text-sm text-gray-600">Progress: {purchase.progress}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {purchase.downloadAvailable && (
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                        Download
                      </button>
                    )}
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition">
                      View Receipt
                    </button>
                    {purchase.refundEligible && (
                      <Link
                        href="/student/payments/refunds"
                        className="px-3 py-1 border border-orange-300 text-orange-700 text-sm rounded hover:bg-orange-50 transition"
                      >
                        Request Refund
                      </Link>
                    )}
                  </div>
                  <Link
                    href="/student/courses"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    View Course →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Refund Policy */}
      <Card className="mt-8">
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
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
