'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function PaymentsNotifications() {
  const notifications = [
    {
      id: 1,
      type: 'purchase',
      title: 'Purchase confirmed',
      message: 'Your purchase of "Advanced React Patterns" was successful',
      amount: '$49.99',
      invoice: '#INV-2026-004',
      time: '2 hours ago',
      read: false,
      icon: '✅',
      action: 'View Receipt',
      actionLink: '/student/payments'
    },
    {
      id: 2,
      type: 'invoice',
      title: 'Invoice due reminder',
      message: 'Invoice #INV-2026-003 is due on September 15, 2026',
      amount: '$29.99',
      invoice: '#INV-2026-003',
      time: '1 day ago',
      read: false,
      icon: '📄',
      action: 'Pay Now',
      actionLink: '/student/payments'
    },
    {
      id: 3,
      type: 'refund',
      title: 'Refund processed',
      message: 'Your refund for cancelled course has been processed',
      amount: '$19.99',
      invoice: '#REF-2026-001',
      time: '3 days ago',
      read: true,
      icon: '💰',
      action: 'View Details',
      actionLink: '/student/payments'
    },
    {
      id: 4,
      type: 'subscription',
      title: 'Subscription renewed',
      message: 'Your monthly subscription has been renewed successfully',
      amount: '$9.99',
      invoice: '#SUB-2026-009',
      time: '5 days ago',
      read: true,
      icon: '🔄',
      action: 'Manage Subscription',
      actionLink: '/student/payments'
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment method issue',
      message: 'Your payment method is expiring soon. Please update your card',
      amount: null,
      invoice: null,
      time: '1 week ago',
      read: true,
      icon: '⚠️',
      action: 'Update Payment',
      actionLink: '/student/account'
    },
    {
      id: 6,
      type: 'purchase',
      title: 'Bundle purchase',
      message: 'You purchased the Web Development Bundle',
      amount: '$149.99',
      invoice: '#INV-2026-002',
      time: '1 week ago',
      read: true,
      icon: '📦',
      action: 'View Bundle',
      actionLink: '/student/courses'
    },
    {
      id: 7,
      type: 'invoice',
      title: 'Invoice generated',
      message: 'New invoice #INV-2026-005 has been generated',
      amount: '$39.99',
      invoice: '#INV-2026-005',
      time: '2 weeks ago',
      read: true,
      icon: '📋',
      action: 'View Invoice',
      actionLink: '/student/payments'
    },
    {
      id: 8,
      type: 'subscription',
      title: 'Subscription upcoming',
      message: 'Your subscription will renew on October 1, 2026',
      amount: '$9.99',
      invoice: '#SUB-2026-010',
      time: '2 weeks ago',
      read: true,
      icon: '📅',
      action: 'Manage Subscription',
      actionLink: '/student/payments'
    },
    {
      id: 9,
      type: 'refund',
      title: 'Refund requested',
      message: 'Your refund request is being processed',
      amount: '$14.99',
      invoice: '#REF-2026-002',
      time: '3 weeks ago',
      read: true,
      icon: '⏳',
      action: 'Track Status',
      actionLink: '/student/payments'
    },
    {
      id: 10,
      type: 'payment',
      title: 'Payment successful',
      message: 'Your payment was processed successfully',
      amount: '$29.99',
      invoice: '#INV-2026-001',
      time: '3 weeks ago',
      read: true,
      icon: '💳',
      action: 'View Receipt',
      actionLink: '/student/payments'
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type: string) => {
    const colors = {
      purchase: 'bg-green-100 text-green-700',
      invoice: 'bg-blue-100 text-blue-700',
      refund: 'bg-yellow-100 text-yellow-700',
      subscription: 'bg-purple-100 text-purple-700',
      payment: 'bg-orange-100 text-orange-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <DashboardLayout actor="student" userName="Kapi">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Payment Notifications</h1>
          <Link href="/student/notifications" className="text-blue-600 hover:underline text-sm">
            View All Notifications →
          </Link>
        </div>
        <p className="text-gray-600">Track your purchases, invoices, refunds, and subscription status</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
            <div className="text-sm text-gray-600">Total Notifications</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
            <div className="text-sm text-gray-600">Unread</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-green-600">$299.95</div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="text-2xl font-bold text-blue-600">Active</div>
            <div className="text-sm text-gray-600">Subscription Status</div>
          </CardBody>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Payment Notifications ({notifications.length})</CardTitle>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg transition ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                } hover:border-blue-300`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{notification.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                      {!notification.read && (
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">New</span>
                      )}
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getTypeColor(notification.type)}`}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      {notification.amount && (
                        <span className="text-xs text-green-600 font-medium">
                          {notification.amount}
                        </span>
                      )}
                      {notification.invoice && (
                        <span className="text-xs text-blue-600 font-medium">
                          {notification.invoice}
                        </span>
                      )}
                      <Link
                        href={notification.actionLink}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {notification.action} →
                      </Link>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition" title="Mark as read">
                      ✓
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition" title="Delete">
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardBody>
          <CardTitle>Payment Summary</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-700 font-medium">Total Purchases</span>
                <span className="text-2xl">📦</span>
              </div>
              <div className="text-2xl font-bold text-green-900 mb-1">$299.95</div>
              <div className="text-xs text-green-600">8 purchases this year</div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-700 font-medium">Subscription</span>
                <span className="text-2xl">🔄</span>
              </div>
              <div className="text-2xl font-bold text-blue-900 mb-1">$9.99/month</div>
              <div className="text-xs text-blue-600">Renews Oct 1, 2026</div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-yellow-700 font-medium">Pending Invoices</span>
                <span className="text-2xl">📄</span>
              </div>
              <div className="text-2xl font-bold text-yellow-900 mb-1">$29.99</div>
              <div className="text-xs text-yellow-600">1 invoice due Sep 15</div>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-purple-700 font-medium">Refunds Processed</span>
                <span className="text-2xl">💰</span>
              </div>
              <div className="text-2xl font-bold text-purple-900 mb-1">$34.98</div>
              <div className="text-xs text-purple-600">2 refunds this year</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
