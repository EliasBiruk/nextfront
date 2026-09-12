'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function InvoicesPage() {
  const router = useRouter();

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Invoices</h1>
        <p className="text-gray-600">View and download your invoices.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">12</div>
                <div className="text-blue-100 text-sm">Total Invoices</div>
              </div>
              <div className="text-4xl opacity-80">📄</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">11</div>
                <div className="text-green-100 text-sm">Paid</div>
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
                <div className="text-3xl font-bold mb-1">$1,247</div>
                <div className="text-purple-100 text-sm">Total Billed</div>
              </div>
              <div className="text-4xl opacity-80">💰</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Invoice List */}
      <Card>
        <CardBody>
          <CardTitle>Invoice List</CardTitle>
          <div className="space-y-4">
            {[
              {
                id: 'INV-001',
                orderId: 'ORD-001',
                date: 'Sep 5, 2026',
                dueDate: 'Sep 5, 2026',
                amount: '$199',
                status: 'paid',
                paidDate: 'Sep 5, 2026',
                items: ['JavaScript Fundamentals'],
                icon: '📄'
              },
              {
                id: 'INV-002',
                orderId: 'ORD-002',
                date: 'Sep 3, 2026',
                dueDate: 'Sep 3, 2026',
                amount: '$249',
                status: 'paid',
                paidDate: 'Sep 3, 2026',
                items: ['React Development'],
                icon: '📄'
              },
              {
                id: 'INV-003',
                orderId: 'ORD-003',
                date: 'Sep 1, 2026',
                dueDate: 'Sep 1, 2026',
                amount: '$49',
                status: 'paid',
                paidDate: 'Sep 1, 2026',
                items: ['Premium Plan - Monthly'],
                icon: '📄'
              },
              {
                id: 'INV-004',
                orderId: 'ORD-004',
                date: 'Aug 28, 2026',
                dueDate: 'Aug 28, 2026',
                amount: '$199',
                status: 'paid',
                paidDate: 'Aug 28, 2026',
                items: ['Python for Data Science'],
                icon: '📄'
              },
              {
                id: 'INV-005',
                orderId: 'ORD-005',
                date: 'Aug 20, 2026',
                dueDate: 'Aug 20, 2026',
                amount: '$89',
                status: 'paid',
                paidDate: 'Aug 20, 2026',
                items: ['TypeScript Fundamentals'],
                icon: '📄'
              },
              {
                id: 'INV-006',
                orderId: 'ORD-006',
                date: 'Aug 15, 2026',
                dueDate: 'Aug 15, 2026',
                amount: '$348',
                status: 'paid',
                paidDate: 'Aug 15, 2026',
                items: ['CSS Masterclass', 'Node.js Backend Development'],
                icon: '📄'
              },
              {
                id: 'INV-007',
                orderId: 'ORD-007',
                date: 'Aug 10, 2026',
                dueDate: 'Aug 10, 2026',
                amount: '$0',
                status: 'cancelled',
                paidDate: null,
                items: ['Advanced Python'],
                icon: '📄'
              },
              {
                id: 'INV-008',
                orderId: 'ORD-008',
                date: 'Jul 25, 2026',
                dueDate: 'Jul 25, 2026',
                amount: '$129',
                status: 'paid',
                paidDate: 'Jul 25, 2026',
                items: ['Database Design'],
                icon: '📄'
              },
              {
                id: 'INV-009',
                orderId: 'ORD-009',
                date: 'Jul 10, 2026',
                dueDate: 'Jul 10, 2026',
                amount: '$49',
                status: 'paid',
                paidDate: 'Jul 10, 2026',
                items: ['Premium Plan - Monthly'],
                icon: '📄'
              },
              {
                id: 'INV-010',
                orderId: 'ORD-010',
                date: 'Jun 10, 2026',
                dueDate: 'Jun 10, 2026',
                amount: '$49',
                status: 'paid',
                paidDate: 'Jun 10, 2026',
                items: ['Premium Plan - Monthly'],
                icon: '📄'
              },
              {
                id: 'INV-011',
                orderId: 'ORD-011',
                date: 'May 10, 2026',
                dueDate: 'May 10, 2026',
                amount: '$49',
                status: 'paid',
                paidDate: 'May 10, 2026',
                items: ['Premium Plan - Monthly'],
                icon: '📄'
              },
              {
                id: 'INV-012',
                orderId: 'ORD-012',
                date: 'Sep 8, 2026',
                dueDate: 'Sep 10, 2026',
                amount: '$89',
                status: 'pending',
                paidDate: null,
                items: ['TypeScript Fundamentals'],
                icon: '📄'
              },
            ].map((invoice) => (
              <div
                key={invoice.id}
                className={`border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition ${
                  invoice.status === 'pending' ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{invoice.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{invoice.id}</h3>
                        <p className="text-sm text-gray-600">{invoice.orderId} • {invoice.date}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                      invoice.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                      invoice.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </div>

                  {/* Invoice Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Amount</div>
                      <div className="font-medium text-gray-900">{invoice.amount}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Due Date</div>
                      <div className="font-medium text-gray-900">{invoice.dueDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Paid Date</div>
                      <div className="font-medium text-gray-900">{invoice.paidDate || '—'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Items</div>
                      <div className="font-medium text-gray-900">{invoice.items.length}</div>
                    </div>
                  </div>

                  {/* Invoice Items */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">Items</div>
                    <div className="space-y-1">
                      {invoice.items.map((item, index) => (
                        <div key={index} className="text-sm text-gray-600">• {item}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Invoice Actions */}
                <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                      Download PDF
                    </button>
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition">
                      Print
                    </button>
                    {invoice.status === 'pending' && (
                      <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition">
                        Pay Now
                      </button>
                    )}
                  </div>
                  <Link
                    href="/student/payments/transactions"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    View Payment History →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Billing Information */}
      <Card className="mt-8">
        <CardBody>
          <CardTitle>Billing Information</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Billing Address</div>
              <div className="font-medium text-gray-900">Kapi Student</div>
              <div className="text-sm text-gray-600">123 Learning Street</div>
              <div className="text-sm text-gray-600">Education City, EC 12345</div>
              <div className="text-sm text-gray-600">United States</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Payment Settings</div>
              <div className="font-medium text-gray-900">Default Payment Method</div>
              <div className="text-sm text-gray-600">Visa ending in 4242</div>
              <div className="text-sm text-gray-600 mt-2">Billing Cycle</div>
              <div className="text-sm text-gray-600">Monthly (1st of each month)</div>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/student/account"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Update Billing Information →
            </Link>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
