'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const router = useRouter();

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order History</h1>
        <p className="text-gray-600">Track and manage your orders.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">12</div>
                <div className="text-blue-100 text-sm">Total Orders</div>
              </div>
              <div className="text-4xl opacity-80">📦</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">10</div>
                <div className="text-green-100 text-sm">Completed</div>
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
                <div className="text-orange-100 text-sm">Processing</div>
              </div>
              <div className="text-4xl opacity-80">⏳</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">1</div>
                <div className="text-purple-100 text-sm">Cancelled</div>
              </div>
              <div className="text-4xl opacity-80">❌</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Order History */}
      <Card>
        <CardBody>
          <CardTitle>Order History</CardTitle>
          <div className="space-y-4">
            {[
              {
                id: 'ORD-001',
                date: 'Sep 5, 2026',
                status: 'completed',
                total: '$199',
                items: [
                  { name: 'JavaScript Fundamentals', type: 'course', price: '$199' }
                ],
                tracking: ['Order Placed', 'Payment Confirmed', 'Access Granted'],
                icon: '📦'
              },
              {
                id: 'ORD-002',
                date: 'Sep 3, 2026',
                status: 'completed',
                total: '$249',
                items: [
                  { name: 'React Development', type: 'course', price: '$249' }
                ],
                tracking: ['Order Placed', 'Payment Confirmed', 'Access Granted'],
                icon: '📦'
              },
              {
                id: 'ORD-003',
                date: 'Sep 1, 2026',
                status: 'processing',
                total: '$49',
                items: [
                  { name: 'Premium Plan - Monthly', type: 'subscription', price: '$49' }
                ],
                tracking: ['Order Placed', 'Payment Confirmed'],
                icon: '⏳'
              },
              {
                id: 'ORD-004',
                date: 'Aug 28, 2026',
                status: 'completed',
                total: '$199',
                items: [
                  { name: 'Python for Data Science', type: 'course', price: '$199' }
                ],
                tracking: ['Order Placed', 'Payment Confirmed', 'Access Granted'],
                icon: '📦'
              },
              {
                id: 'ORD-005',
                date: 'Aug 20, 2026',
                status: 'completed',
                total: '$89',
                items: [
                  { name: 'TypeScript Fundamentals', type: 'course', price: '$89' }
                ],
                tracking: ['Order Placed', 'Payment Confirmed', 'Access Granted'],
                icon: '📦'
              },
              {
                id: 'ORD-006',
                date: 'Aug 15, 2026',
                status: 'completed',
                total: '$348',
                items: [
                  { name: 'CSS Masterclass', type: 'course', price: '$149' },
                  { name: 'Node.js Backend Development', type: 'course', price: '$199' }
                ],
                tracking: ['Order Placed', 'Payment Confirmed', 'Access Granted'],
                icon: '📦'
              },
              {
                id: 'ORD-007',
                date: 'Aug 10, 2026',
                status: 'cancelled',
                total: '$0',
                items: [
                  { name: 'Advanced Python', type: 'course', price: '$199' }
                ],
                tracking: ['Order Placed', 'Cancelled'],
                icon: '❌'
              },
              {
                id: 'ORD-008',
                date: 'Jul 25, 2026',
                status: 'completed',
                total: '$129',
                items: [
                  { name: 'Database Design', type: 'course', price: '$129' }
                ],
                tracking: ['Order Placed', 'Payment Confirmed', 'Access Granted'],
                icon: '📦'
              },
            ].map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{order.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'processing' ? 'bg-orange-100 text-orange-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">Items ({order.items.length})</div>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">{item.type === 'course' ? '📚' : '⭐'}</span>
                            <span className="text-gray-900">{item.name}</span>
                          </div>
                          <span className="text-gray-600">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 mt-2 pt-2 flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span className="text-gray-900">{order.total}</span>
                    </div>
                  </div>

                  {/* Order Tracking */}
                  <div className="mb-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">Order Status</div>
                    <div className="flex items-center gap-2">
                      {order.tracking.map((step, index) => (
                        <div key={step} className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${
                            index < order.tracking.length ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <span className="text-sm text-gray-600 ml-2">{step}</span>
                          {index < order.tracking.length - 1 && (
                            <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                      View Details
                    </button>
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition">
                      Download Receipt
                    </button>
                    {order.status === 'processing' && (
                      <button className="px-3 py-1 border border-red-300 text-red-700 text-sm rounded hover:bg-red-50 transition">
                        Cancel Order
                      </button>
                    )}
                    {order.status === 'completed' && (
                      <Link
                        href="/student/payments/refunds"
                        className="px-3 py-1 border border-orange-300 text-orange-700 text-sm rounded hover:bg-orange-50 transition"
                      >
                        Request Refund
                      </Link>
                    )}
                  </div>
                  <button className="text-blue-600 hover:underline text-sm font-medium">
                    Contact Support →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
