'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function InstructorFinancial() {
  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Financial Overview</h1>
        <p className="text-gray-600">Track your earnings, payouts, and financial performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">$30,800</div>
            <div className="text-sm text-gray-600">Gross Sales</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">$21,560</div>
            <div className="text-sm text-gray-600">Your Earnings (70%)</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-green-600 mb-1">$8,450</div>
            <div className="text-sm text-gray-600">Available for Payout</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">$13,110</div>
            <div className="text-sm text-gray-600">Paid Out</div>
          </CardBody>
        </Card>
      </div>

      <Card className="mb-8">
        <CardBody>
          <CardTitle>Revenue Breakdown</CardTitle>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Gross Sales</div>
                <div className="text-sm text-gray-600">Total course sales</div>
              </div>
              <div className="text-xl font-bold text-gray-900">$30,800</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Refunds & Adjustments</div>
                <div className="text-sm text-gray-600">Returned payments</div>
              </div>
              <div className="text-xl font-bold text-red-600">-$1,240</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Platform Share (30%)</div>
                <div className="text-sm text-gray-600">JoyEdu platform fee</div>
              </div>
              <div className="text-xl font-bold text-orange-600">-$8,000</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div>
                <div className="font-medium text-gray-900">Instructor Earnings</div>
                <div className="text-sm text-gray-600">Your share (70%)</div>
              </div>
              <div className="text-xl font-bold text-green-600">$21,560</div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/instructor/financial/payouts">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">💸</div>
              <CardTitle>Payouts</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">Request and track payouts</p>
            </CardBody>
          </Card>
        </Link>
        <Link href="/instructor/financial/transactions">
          <Card className="hover:border-blue-500 hover:shadow-lg transition cursor-pointer">
            <CardBody>
              <div className="text-3xl mb-2">💳</div>
              <CardTitle>Transactions</CardTitle>
              <p className="text-gray-600 mt-2 text-sm">View all transactions</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
}