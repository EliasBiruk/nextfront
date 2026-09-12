'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function InstructorTransactions() {
  const { currentUser } = useAuth();

  const transactions = [
    {
      id: 1,
      type: 'sale',
      description: 'Course sale: React & Next.js Full Stack',
      amount: '$49.99',
      date: '2024-09-10',
      status: 'completed'
    },
    {
      id: 2,
      type: 'sale',
      description: 'Course sale: TypeScript Fundamentals',
      amount: '$39.99',
      date: '2024-09-09',
      status: 'completed'
    },
    {
      id: 3,
      type: 'payout',
      description: 'Payout request processed',
      amount: '-$5,000',
      date: '2024-08-15',
      status: 'completed'
    },
    {
      id: 4,
      type: 'sale',
      description: 'Course sale: Advanced JavaScript Patterns',
      amount: '$59.99',
      date: '2024-08-14',
      status: 'completed'
    },
    {
      id: 5,
      type: 'refund',
      description: 'Refund: React & Next.js Full Stack',
      amount: '-$49.99',
      date: '2024-08-10',
      status: 'completed'
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sale': return '💰';
      case 'payout': return '💸';
      case 'refund': return '↩️';
      default: return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sale': return 'text-green-600';
      case 'payout': return 'text-blue-600';
      case 'refund': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transactions</h1>
        <p className="text-gray-600">View all your financial transactions</p>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Transaction History</CardTitle>
          <div className="space-y-4 mt-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{getTypeIcon(transaction.type)}</div>
                  <div>
                    <div className="font-medium text-gray-900">{transaction.description}</div>
                    <div className="text-sm text-gray-600">{transaction.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${getTypeColor(transaction.type)}`}>
                    {transaction.amount}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">{transaction.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
