'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentsOverview() {
  const router = useRouter();

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payments & Billing</h1>
        <p className="text-gray-600">Manage your payments, view history, and handle billing.</p>
      </div>

      {/* Payment Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">$1,247</div>
                <div className="text-blue-100 text-sm">Total Spent</div>
              </div>
              <div className="text-4xl opacity-80">💳</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">$89</div>
                <div className="text-orange-100 text-sm">Pending</div>
              </div>
              <div className="text-4xl opacity-80">⏳</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">3</div>
                <div className="text-green-100 text-sm">Payment Methods</div>
              </div>
              <div className="text-4xl opacity-80">💼</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">12</div>
                <div className="text-purple-100 text-sm">Transactions</div>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Quick Actions</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/student/payments/methods"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="text-2xl">➕</div>
              <div className="font-medium text-gray-900">Add Payment Method</div>
            </Link>
            <Link
              href="/student/payments/transactions"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="text-2xl">📜</div>
              <div className="font-medium text-gray-900">View Transactions</div>
            </Link>
            <Link
              href="/student/payments/invoices"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="text-2xl">📄</div>
              <div className="font-medium text-gray-900">Download Invoices</div>
            </Link>
            <Link
              href="/student/payments/refunds"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="text-2xl">💰</div>
              <div className="font-medium text-gray-900">Request Refund</div>
            </Link>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>Recent Transactions</CardTitle>
                <Link href="/student/payments/transactions" className="text-blue-600 hover:underline text-sm font-medium">
                  View all →
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { id: 'TXN-001', type: 'course', name: 'JavaScript Fundamentals', amount: '$199', date: 'Sep 5, 2026', status: 'completed', icon: '📚' },
                  { id: 'TXN-002', type: 'course', name: 'React Development', amount: '$249', date: 'Sep 3, 2026', status: 'completed', icon: '⚛️' },
                  { id: 'TXN-003', type: 'subscription', name: 'Premium Plan', amount: '$49', date: 'Sep 1, 2026', status: 'completed', icon: '⭐' },
                  { id: 'TXN-004', type: 'course', name: 'Python for Data Science', amount: '$199', date: 'Aug 28, 2026', status: 'completed', icon: '🐍' },
                  { id: 'TXN-005', type: 'refund', name: 'Refund - Old Course', amount: '-$99', date: 'Aug 25, 2026', status: 'completed', icon: '💰' },
                ].map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                    onClick={() => router.push('/student/payments/transactions')}
                  >
                    <div className="text-2xl">{transaction.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{transaction.name}</h3>
                      <p className="text-sm text-gray-600">{transaction.id} • {transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${transaction.type === 'refund' ? 'text-green-600' : 'text-gray-900'}`}>
                        {transaction.amount}
                      </div>
                      <div className="text-xs text-green-600">{transaction.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Saved Payment Methods */}
        <div>
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>Saved Methods</CardTitle>
                <Link href="/student/payments/methods" className="text-blue-600 hover:underline text-sm font-medium">
                  Manage →
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { type: 'card', name: 'Visa ending in 4242', default: true, icon: '💳' },
                  { type: 'card', name: 'Mastercard ending in 8888', default: false, icon: '💳' },
                  { type: 'paypal', name: 'PayPal - kapi@email.com', default: false, icon: '🅿️' },
                ].map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                    onClick={() => router.push('/student/payments/methods')}
                  >
                    <div className="text-2xl">{method.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{method.name}</div>
                      {method.default && (
                        <div className="text-xs text-blue-600">Default</div>
                      )}
                    </div>
                  </div>
                ))}
                <Link
                  href="/student/payments/methods"
                  className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="text-xl">➕</div>
                  <div className="font-medium text-gray-600">Add New Method</div>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Payment Security */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Payment Security</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-3xl">🔒</div>
              <div>
                <div className="font-semibold text-green-900 mb-1">Secure Transactions</div>
                <div className="text-sm text-green-700">All payments are encrypted with 256-bit SSL encryption</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-3xl">🛡️</div>
              <div>
                <div className="font-semibold text-blue-900 mb-1">Fraud Protection</div>
                <div className="text-sm text-blue-700">24/7 monitoring and fraud detection systems</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-3xl">📋</div>
              <div>
                <div className="font-semibold text-purple-900 mb-1">PCI Compliant</div>
                <div className="text-sm text-purple-700">Fully compliant with PCI DSS standards</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Pending Payments */}
      <Card>
        <CardBody>
          <CardTitle>Pending Payments</CardTitle>
          <div className="space-y-3">
            {[
              { id: 'INV-004', name: 'TypeScript Fundamentals', amount: '$89', dueDate: 'Sep 10, 2026', status: 'pending' },
            ].map((payment) => (
              <div
                key={payment.id}
                className="flex items-center gap-4 p-4 border border-orange-200 rounded-lg bg-orange-50"
              >
                <div className="text-2xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{payment.name}</h3>
                  <p className="text-sm text-gray-600">{payment.id} • Due: {payment.dueDate}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{payment.amount}</div>
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
            {[
              { id: 'INV-004', name: 'TypeScript Fundamentals', amount: '$89', dueDate: 'Sep 10, 2026', status: 'pending' },
            ].length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">✅</div>
                <div>No pending payments</div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
