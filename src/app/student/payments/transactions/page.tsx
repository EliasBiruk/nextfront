'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TransactionsPage() {
  const router = useRouter();
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [filterAmount, setFilterAmount] = useState('all');

  const transactions = [
    { id: 'TXN-001', type: 'course', name: 'JavaScript Fundamentals', amount: '$199', date: 'Sep 5, 2026', status: 'completed', method: 'Visa ****4242', icon: '📚' },
    { id: 'TXN-002', type: 'course', name: 'React Development', amount: '$249', date: 'Sep 3, 2026', status: 'completed', method: 'Visa ****4242', icon: '⚛️' },
    { id: 'TXN-003', type: 'subscription', name: 'Premium Plan', amount: '$49', date: 'Sep 1, 2026', status: 'completed', method: 'PayPal', icon: '⭐' },
    { id: 'TXN-004', type: 'course', name: 'Python for Data Science', amount: '$199', date: 'Aug 28, 2026', status: 'completed', method: 'Mastercard ****8888', icon: '🐍' },
    { id: 'TXN-005', type: 'refund', name: 'Refund - Old Course', amount: '-$99', date: 'Aug 25, 2026', status: 'completed', method: 'Visa ****4242', icon: '💰' },
    { id: 'TXN-006', type: 'course', name: 'TypeScript Fundamentals', amount: '$89', date: 'Aug 20, 2026', status: 'completed', method: 'Visa ****4242', icon: '📘' },
    { id: 'TXN-007', type: 'course', name: 'CSS Masterclass', amount: '$149', date: 'Aug 15, 2026', status: 'completed', method: 'Mastercard ****8888', icon: '🎨' },
    { id: 'TXN-008', type: 'course', name: 'Node.js Backend Development', amount: '$199', date: 'Aug 15, 2026', status: 'completed', method: 'Visa ****4242', icon: '🟢' },
    { id: 'TXN-009', type: 'subscription', name: 'Premium Plan', amount: '$49', date: 'Aug 1, 2026', status: 'completed', method: 'PayPal', icon: '⭐' },
    { id: 'TXN-010', type: 'course', name: 'Database Design', amount: '$129', date: 'Jul 25, 2026', status: 'completed', method: 'Visa ****4242', icon: '🗄️' },
    { id: 'TXN-011', type: 'subscription', name: 'Premium Plan', amount: '$49', date: 'Jul 1, 2026', status: 'completed', method: 'PayPal', icon: '⭐' },
    { id: 'TXN-012', type: 'subscription', name: 'Premium Plan', amount: '$49', date: 'Jun 1, 2026', status: 'completed', method: 'PayPal', icon: '⭐' },
  ];

  const filteredTransactions = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (filterDate !== 'all') {
      const transactionDate = new Date(t.date);
      const now = new Date();
      if (filterDate === '30days') {
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
        if (transactionDate < thirtyDaysAgo) return false;
      } else if (filterDate === '90days') {
        const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90));
        if (transactionDate < ninetyDaysAgo) return false;
      } else if (filterDate === 'thisyear') {
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        if (transactionDate < startOfYear) return false;
      }
    }
    if (filterAmount !== 'all') {
      const amount = parseFloat(t.amount.replace(/[^0-9.-]+/g, ''));
      if (filterAmount === 'under100' && amount >= 100) return false;
      if (filterAmount === '100to200' && (amount < 100 || amount >= 200)) return false;
      if (filterAmount === 'over200' && amount < 200) return false;
    }
    return true;
  });

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transaction History</h1>
        <p className="text-gray-600">View all your transactions with details and receipts.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">12</div>
                <div className="text-blue-100 text-sm">Total Transactions</div>
              </div>
              <div className="text-4xl opacity-80">📊</div>
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
                <div className="text-3xl font-bold mb-1">$99</div>
                <div className="text-purple-100 text-sm">Total Refunded</div>
              </div>
              <div className="text-4xl opacity-80">💸</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">3</div>
                <div className="text-orange-100 text-sm">Payment Methods</div>
              </div>
              <div className="text-4xl opacity-80">💳</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Filter Transactions</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="course">Courses</option>
                <option value="subscription">Subscriptions</option>
                <option value="refund">Refunds</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="thisyear">This Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <select
                value={filterAmount}
                onChange={(e) => setFilterAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Amounts</option>
                <option value="under100">Under $100</option>
                <option value="100to200">$100 - $200</option>
                <option value="over200">Over $200</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
              Export CSV
            </button>
          </div>
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{transaction.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{transaction.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                          transaction.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {transaction.id} • {transaction.date}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">Method: {transaction.method}</span>
                        <span className="text-gray-600">Type: {transaction.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium text-lg ${transaction.type === 'refund' ? 'text-green-600' : 'text-gray-900'}`}>
                        {transaction.amount}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                      View Receipt
                    </button>
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition">
                      Download PDF
                    </button>
                    {transaction.type === 'course' && (
                      <Link
                        href="/student/payments/refunds"
                        className="px-3 py-1 border border-orange-300 text-orange-700 text-sm rounded hover:bg-orange-50 transition"
                      >
                        Request Refund
                      </Link>
                    )}
                  </div>
                  <Link
                    href="/student/payments/invoices"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    View Invoice →
                  </Link>
                </div>
              </div>
            ))}
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🔍</div>
                <div>No transactions found matching your filters</div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Payment Method Summary */}
      <Card className="mt-8">
        <CardBody>
          <CardTitle>Payment Method Summary</CardTitle>
          <div className="space-y-3">
            {[
              { method: 'Visa ****4242', count: 6, total: '$934', icon: '💳' },
              { method: 'Mastercard ****8888', count: 2, total: '$348', icon: '💳' },
              { method: 'PayPal', count: 4, total: '$196', icon: '🅿️' },
            ].map((summary) => (
              <div key={summary.method} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl">{summary.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{summary.method}</div>
                  <div className="text-sm text-gray-600">{summary.count} transactions</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{summary.total}</div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
