'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function InstructorPayouts() {
  const { currentUser } = useAuth();
  const [isRequesting, setIsRequesting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [payouts, setPayouts] = useState([
    {
      id: 1,
      amount: '$5,000',
      date: '2024-08-15',
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: 2,
      amount: '$4,200',
      date: '2024-07-15',
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: 3,
      amount: '$3,910',
      date: '2024-06-15',
      status: 'completed',
      method: 'Bank Transfer'
    },
  ]);

  const handleRequestPayout = () => {
    setIsRequesting(true);
    // Simulate API call
    setTimeout(() => {
      const newPayout = {
        id: Date.now(),
        amount: '$8,450',
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        method: 'Bank Transfer'
      };
      setPayouts([newPayout, ...payouts]);
      setIsRequesting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payouts</h1>
        <p className="text-gray-600">Manage your payout requests and history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-green-600 mb-1">$8,450</div>
            <div className="text-sm text-gray-600">Available for Payout</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">$13,110</div>
            <div className="text-sm text-gray-600">Total Paid Out</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900 mb-1">{payouts.length}</div>
            <div className="text-sm text-gray-600">Total Payouts</div>
          </CardBody>
        </Card>
      </div>

      <Card className="mb-8">
        <CardBody>
          <div className="flex items-center justify-between mb-6">
            <CardTitle>Request Payout</CardTitle>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              You have <strong>$8,450</strong> available for payout. Minimum payout amount is $100.
            </p>
          </div>
          {showSuccess && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
              <p className="text-sm text-green-800">
                Payout request submitted successfully!
              </p>
            </div>
          )}
          <Button 
            onClick={handleRequestPayout}
            disabled={isRequesting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isRequesting ? 'Processing...' : 'Request Payout'}
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle>Payout History</CardTitle>
          <div className="space-y-4 mt-4">
            {payouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{payout.amount}</div>
                  <div className="text-sm text-gray-600">{payout.date} • {payout.method}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  payout.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : payout.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}