'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PaymentMethodsPage() {
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<string | null>(null);

  const paymentMethods = [
    {
      id: 'card-1',
      type: 'card',
      name: 'Visa ending in 4242',
      brand: 'Visa',
      last4: '4242',
      expiryDate: '12/2027',
      default: true,
      addedDate: 'Jan 15, 2026',
      icon: '💳'
    },
    {
      id: 'card-2',
      type: 'card',
      name: 'Mastercard ending in 8888',
      brand: 'Mastercard',
      last4: '8888',
      expiryDate: '08/2026',
      default: false,
      addedDate: 'Mar 20, 2026',
      icon: '💳'
    },
    {
      id: 'paypal-1',
      type: 'paypal',
      name: 'PayPal - kapi@email.com',
      email: 'kapi@email.com',
      default: false,
      addedDate: 'May 10, 2026',
      icon: '🅿️'
    },
  ];

  return (
    <DashboardLayout actor="student" userName="Kapi">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Methods</h1>
        <p className="text-gray-600">Manage your saved payment methods.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">3</div>
                <div className="text-blue-100 text-sm">Saved Methods</div>
              </div>
              <div className="text-4xl opacity-80">💳</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">1</div>
                <div className="text-green-100 text-sm">Default Method</div>
              </div>
              <div className="text-4xl opacity-80">⭐</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">2</div>
                <div className="text-purple-100 text-sm">Card Types</div>
              </div>
              <div className="text-4xl opacity-80">💼</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Add New Payment Method */}
      <Card className="mb-8">
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Add New Payment Method</CardTitle>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
              >
                Add New Method
              </button>
            )}
          </div>

          {showAddForm ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select type...</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank">Bank Account</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="Kapi Student"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="setDefault" className="rounded" />
                <label htmlFor="setDefault" className="text-sm text-gray-700">Set as default payment method</label>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                  Add Payment Method
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <div className="text-3xl">💳</div>
                <div className="font-medium text-gray-600">Credit/Debit Card</div>
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <div className="text-3xl">🅿️</div>
                <div className="font-medium text-gray-600">PayPal</div>
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <div className="text-3xl">🏦</div>
                <div className="font-medium text-gray-600">Bank Account</div>
              </button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Saved Payment Methods */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Saved Payment Methods</CardTitle>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{method.name}</h3>
                          {method.default && (
                            <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Added: {method.addedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.default && (
                        <button className="px-3 py-1 border border-blue-300 text-blue-700 text-sm rounded hover:bg-blue-50 transition">
                          Set Default
                        </button>
                      )}
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition">
                        Edit
                      </button>
                      <button className="px-3 py-1 border border-red-300 text-red-700 text-sm rounded hover:bg-red-50 transition">
                        Remove
                      </button>
                    </div>
                  </div>

                  {method.type === 'card' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Brand</div>
                        <div className="font-medium text-gray-900">{method.brand}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Last 4 Digits</div>
                        <div className="font-medium text-gray-900">{method.last4}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Expiry Date</div>
                        <div className="font-medium text-gray-900">{method.expiryDate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Status</div>
                        <div className="font-medium text-green-600">Active</div>
                      </div>
                    </div>
                  )}

                  {method.type === 'paypal' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Email</div>
                        <div className="font-medium text-gray-900">{method.email}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Type</div>
                        <div className="font-medium text-gray-900">PayPal</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Status</div>
                        <div className="font-medium text-green-600">Connected</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Payment Security */}
      <Card className="mb-8">
        <CardBody>
          <CardTitle>Payment Security Features</CardTitle>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-3xl">🔒</div>
              <div>
                <div className="font-semibold text-green-900 mb-1">256-bit SSL Encryption</div>
                <div className="text-sm text-green-700">All payment information is encrypted using industry-standard SSL technology</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-3xl">🛡️</div>
              <div>
                <div className="font-semibold text-blue-900 mb-1">PCI DSS Compliant</div>
                <div className="text-sm text-blue-700">We maintain full compliance with PCI DSS security standards</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-3xl">👁️</div>
              <div>
                <div className="font-semibold text-purple-900 mb-1">Masked Card Numbers</div>
                <div className="text-sm text-purple-700">Only the last 4 digits of your card are displayed for your security</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-3xl">🔐</div>
              <div>
                <div className="font-semibold text-orange-900 mb-1">No Card Storage</div>
                <div className="text-sm text-orange-700">We don't store your full card details on our servers</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Payment Method Usage */}
      <Card>
        <CardBody>
          <CardTitle>Payment Method Usage</CardTitle>
          <div className="space-y-3">
            {[
              { method: 'Visa ****4242', transactions: 6, lastUsed: 'Sep 5, 2026', icon: '💳' },
              { method: 'Mastercard ****8888', transactions: 2, lastUsed: 'Aug 15, 2026', icon: '💳' },
              { method: 'PayPal', transactions: 4, lastUsed: 'Sep 1, 2026', icon: '🅿️' },
            ].map((usage) => (
              <div key={usage.method} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl">{usage.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{usage.method}</div>
                  <div className="text-sm text-gray-600">{usage.transactions} transactions</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Last Used</div>
                  <div className="font-medium text-gray-900">{usage.lastUsed}</div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
