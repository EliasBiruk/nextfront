'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { mockFees, mockStudents } from '@/data/mockData';

export default function SchoolFinance() {
  const [fees, setFees] = useState(mockFees);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const filteredFees = fees.filter(fee => {
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'paid' && fee.balance === 0) ||
                         (filterStatus === 'pending' && fee.balance > 0);
    const matchesType = filterType === 'all' || fee.type === filterType;
    return matchesStatus && matchesType;
  });

  const totalRevenue = fees.reduce((sum, f) => sum + f.amount, 0);
  const collected = fees.reduce((sum, f) => sum + (f.amount - f.balance), 0);
  const outstanding = fees.reduce((sum, f) => sum + f.balance, 0);

  const handleRecordPayment = (feeId: string) => {
    setFees(prev => prev.map(f => {
      if (f.id === feeId) {
        const paymentAmount = f.balance;
        return { ...f, balance: 0 };
      }
      return f;
    }));
  };

  const handleSendReminder = (feeId: string) => {
    alert(`Reminder sent for fee ${feeId}`);
  };

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Finance</h1>
        <p className="text-gray-600">Manage school finances, fees, payments, and budgeting</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowAddModal(true)}>+ Create Invoice</Button>
          <Button variant="outline">Record Payment</Button>
          <Button variant="outline">Fee Structure</Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Tuition">Tuition</option>
            <option value="Library">Library</option>
            <option value="Transport">Transport</option>
            <option value="Lab">Lab</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Financial Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">${(totalRevenue / 1000).toFixed(1)}K</div>
            <p className="text-gray-600 text-sm">Total Revenue</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">${(collected / 1000).toFixed(1)}K</div>
            <p className="text-gray-600 text-sm">Collected</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">${(outstanding / 1000).toFixed(1)}K</div>
            <p className="text-gray-600 text-sm">Outstanding</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{fees.length}</div>
            <p className="text-gray-600 text-sm">Total Fees</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {Math.round((collected / totalRevenue) * 100)}%
            </div>
            <p className="text-gray-600 text-sm">Collection Rate</p>
          </CardBody>
        </Card>
      </div>

      {/* Fee Records */}
      <Card>
        <CardBody>
          <CardTitle>Fee Records ({filteredFees.length} records)</CardTitle>
          <div className="space-y-4">
            {filteredFees.map((fee) => {
              const student = mockStudents.find(s => s.id === fee.studentId);
              return (
                <div key={fee.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                        💰
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{fee.type}</h3>
                          <Badge variant={fee.balance === 0 ? 'success' : 'warning'}>
                            {fee.balance === 0 ? 'Paid' : 'Pending'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {student ? `${student.firstName} ${student.lastName}` : 'Unknown'} • {fee.studentId}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Due: {fee.dueDate}</p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="text-gray-600">Amount: <span className="font-semibold">${fee.amount}</span></span>
                          <span className="text-gray-600">Balance: <span className={`font-semibold ${fee.balance === 0 ? 'text-green-600' : 'text-red-600'}`}>${fee.balance}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {fee.balance > 0 && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleRecordPayment(fee.id)}>
                            Record Payment
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleSendReminder(fee.id)}>
                            Send Reminder
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">Receipt</Button>
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredFees.length === 0 && (
              <div className="text-center py-8 text-gray-500">No fee records found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Add Invoice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardBody>
              <CardTitle>Create New Invoice</CardTitle>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Create invoice form would go here with fields for:</p>
                <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
                  <li>Select Student</li>
                  <li>Fee Type (Tuition, Library, Transport, etc.)</li>
                  <li>Amount</li>
                  <li>Due Date</li>
                  <li>Description</li>
                </ul>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="outline">Create Invoice</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}