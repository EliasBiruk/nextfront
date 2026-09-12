'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

export default function AdminFinance() {
  const financialStats = {
    totalRevenue: 845200,
    monthlyRevenue: 84500,
    pendingPayouts: 32400,
    paidPayouts: 512800,
    refunds: 8900,
    netProfit: 675400
  };

  const recentTransactions = [
    { id: 'TXN-001', type: 'Course Sale', amount: 199, date: 'Sep 6, 2026', status: 'Completed' },
    { id: 'TXN-002', type: 'School Subscription', amount: 599, date: 'Sep 5, 2026', status: 'Completed' },
    { id: 'TXN-003', type: 'Instructor Payout', amount: -450, date: 'Sep 4, 2026', status: 'Processing' },
    { id: 'TXN-004', type: 'Refund', amount: -89, date: 'Sep 3, 2026', status: 'Completed' },
    { id: 'TXN-005', type: 'Course Sale', amount: 249, date: 'Sep 2, 2026', status: 'Completed' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="admin" userName="Administrator" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-[var(--joyedu-text-primary)]">Platform Finance</h1>
              <p className="text-[var(--joyedu-text-secondary)]">Manage platform revenue and financial operations</p>
            </div>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-[var(--joyedu-primary-500)] to-[var(--joyedu-primary-600)] text-white border-0">
                <CardBody>
                  <div className="text-2xl font-bold mb-1">${(financialStats.totalRevenue / 1000).toFixed(0)}K</div>
                  <div className="text-[var(--joyedu-primary-100)] text-sm">Total Revenue</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-success-500)] to-[var(--joyedu-success-600)] text-white border-0">
                <CardBody>
                  <div className="text-2xl font-bold mb-1">${(financialStats.monthlyRevenue / 1000).toFixed(0)}K</div>
                  <div className="text-[var(--joyedu-success-100)] text-sm">Monthly</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-warning-500)] to-[var(--joyedu-warning-600)] text-white border-0">
                <CardBody>
                  <div className="text-2xl font-bold mb-1">${(financialStats.pendingPayouts / 1000).toFixed(0)}K</div>
                  <div className="text-[var(--joyedu-warning-100)] text-sm">Pending</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-accent-500)] to-[var(--joyedu-accent-600)] text-white border-0">
                <CardBody>
                  <div className="text-2xl font-bold mb-1">${(financialStats.paidPayouts / 1000).toFixed(0)}K</div>
                  <div className="text-[var(--joyedu-accent-100)] text-sm">Paid</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-error-500)] to-[var(--joyedu-error-600)] text-white border-0">
                <CardBody>
                  <div className="text-2xl font-bold mb-1">${(financialStats.refunds / 1000).toFixed(0)}K</div>
                  <div className="text-[var(--joyedu-error-100)] text-sm">Refunds</div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--joyedu-info-500)] to-[var(--joyedu-info-600)] text-white border-0">
                <CardBody>
                  <div className="text-2xl font-bold mb-1">${(financialStats.netProfit / 1000).toFixed(0)}K</div>
                  <div className="text-[var(--joyedu-info-100)] text-sm">Net Profit</div>
                </CardBody>
              </Card>
            </div>

            {/* Revenue Breakdown */}
            <Card className="mb-8">
              <CardBody>
                <CardTitle>Revenue Breakdown</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  <div className="p-4 bg-[var(--joyedu-primary-subtle)] rounded-lg border border-[var(--joyedu-primary-200)]">
                    <div className="text-sm text-[var(--joyedu-text-secondary)] mb-1">Course Sales</div>
                    <div className="text-2xl font-bold text-[var(--joyedu-primary)]">$524,300</div>
                    <div className="text-xs text-[var(--joyedu-text-muted)] mt-1">62% of total</div>
                  </div>
                  <div className="p-4 bg-[var(--joyedu-accent-subtle)] rounded-lg border border-[var(--joyedu-accent-200)]">
                    <div className="text-sm text-[var(--joyedu-text-secondary)] mb-1">School Subscriptions</div>
                    <div className="text-2xl font-bold text-[var(--joyedu-accent)]">$285,400</div>
                    <div className="text-xs text-[var(--joyedu-text-muted)] mt-1">34% of total</div>
                  </div>
                  <div className="p-4 bg-[var(--joyedu-success-subtle)] rounded-lg border border-[var(--joyedu-success-200)]">
                    <div className="text-sm text-[var(--joyedu-text-secondary)] mb-1">Other Revenue</div>
                    <div className="text-2xl font-bold text-[var(--joyedu-success)]">$35,500</div>
                    <div className="text-xs text-[var(--joyedu-text-muted)] mt-1">4% of total</div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardBody>
                <CardTitle>Recent Transactions</CardTitle>
                <div className="mt-4 space-y-3">
                  {recentTransactions.map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{txn.type}</div>
                        <div className="text-sm text-gray-600">{txn.id} • {txn.date}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {txn.amount > 0 ? '+' : ''}${Math.abs(txn.amount)}
                        </div>
                        <div className="text-xs text-gray-500">{txn.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}