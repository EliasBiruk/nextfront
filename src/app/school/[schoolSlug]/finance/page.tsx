'use client';

import { use, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { mockSchools, mockStudents, mockFees } from '@/data/mockData';

interface Invoice {
  id: string;
  studentId: string;
  studentName: string;
  type: string;
  amount: number;
  status: 'Pending' | 'Paid' | 'Overdue';
  dueDate: string;
  issuedDate: string;
}

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Approved' | 'Paid';
}

interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  period: string;
}

export default function FinanceDashboard({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';
  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];

  // Mock finance data
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'inv-1',
      studentId: 'student-1',
      studentName: 'Alex Thompson',
      type: 'Tuition Fee',
      amount: 5000,
      status: 'Paid',
      dueDate: '2024-08-15',
      issuedDate: '2024-07-15',
    },
    {
      id: 'inv-2',
      studentId: 'student-2',
      studentName: 'Emma Thompson',
      type: 'Tuition Fee',
      amount: 4500,
      status: 'Pending',
      dueDate: '2024-08-15',
      issuedDate: '2024-07-15',
    },
    {
      id: 'inv-3',
      studentId: 'student-3',
      studentName: 'Jake Thompson',
      type: 'Tuition Fee',
      amount: 4000,
      status: 'Paid',
      dueDate: '2024-08-15',
      issuedDate: '2024-07-15',
    },
    {
      id: 'inv-4',
      studentId: 'student-1',
      studentName: 'Alex Thompson',
      type: 'Lab Fee',
      amount: 500,
      status: 'Overdue',
      dueDate: '2024-09-01',
      issuedDate: '2024-08-01',
    },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 'exp-1',
      category: 'Salaries',
      description: 'Teacher salaries - September',
      amount: 45000,
      date: '2024-09-01',
      status: 'Paid',
    },
    {
      id: 'exp-2',
      category: 'Utilities',
      description: 'Electricity bill',
      amount: 2500,
      date: '2024-09-05',
      status: 'Pending',
    },
    {
      id: 'exp-3',
      category: 'Supplies',
      description: 'Office supplies',
      amount: 800,
      date: '2024-09-10',
      status: 'Approved',
    },
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: 'budget-1',
      category: 'Salaries',
      allocated: 500000,
      spent: 45000,
      remaining: 455000,
      period: '2024-2025',
    },
    {
      id: 'budget-2',
      category: 'Utilities',
      allocated: 30000,
      spent: 2500,
      remaining: 27500,
      period: '2024-2025',
    },
    {
      id: 'budget-3',
      category: 'Supplies',
      allocated: 20000,
      spent: 800,
      remaining: 19200,
      period: '2024-2025',
    },
    {
      id: 'budget-4',
      category: 'Maintenance',
      allocated: 15000,
      spent: 2000,
      remaining: 13000,
      period: '2024-2025',
    },
  ]);

  const stats = {
    totalRevenue: invoices.reduce((sum, inv) => sum + (inv.status === 'Paid' ? inv.amount : 0), 0),
    pendingPayments: invoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0),
    overduePayments: invoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0),
    totalExpenses: expenses.filter(exp => exp.status === 'Paid').reduce((sum, exp) => sum + exp.amount, 0),
    totalBudget: budgets.reduce((sum, budget) => sum + budget.allocated, 0),
    budgetSpent: budgets.reduce((sum, budget) => sum + budget.spent, 0),
  };

  const handlePayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentAmount(invoice.amount.toString());
    setShowInvoiceModal(true);
  };

  const processPayment = async () => {
    if (!selectedInvoice) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setInvoices(invoices.map(inv => 
      inv.id === selectedInvoice.id 
        ? { ...inv, status: 'Paid' as const }
        : inv
    ));
    
    setIsProcessing(false);
    setShowInvoiceModal(false);
    setSelectedInvoice(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
      case 'Approved':
        return <Badge variant="success">{status}</Badge>;
      case 'Pending':
        return <Badge variant="warning">{status}</Badge>;
      case 'Overdue':
        return <Badge variant="danger">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-green-100 mb-1">Total Revenue</div>
            <div className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-green-100 mt-1">Collected payments</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-yellow-100 mb-1">Pending Payments</div>
            <div className="text-3xl font-bold">${stats.pendingPayments.toLocaleString()}</div>
            <div className="text-sm text-yellow-100 mt-1">{invoices.filter(inv => inv.status === 'Pending').length} invoices</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-red-100 mb-1">Overdue Payments</div>
            <div className="text-3xl font-bold">${stats.overduePayments.toLocaleString()}</div>
            <div className="text-sm text-red-100 mt-1">{invoices.filter(inv => inv.status === 'Overdue').length} invoices</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-blue-100 mb-1">Total Expenses</div>
            <div className="text-3xl font-bold">${stats.totalExpenses.toLocaleString()}</div>
            <div className="text-sm text-blue-100 mt-1">This period</div>
          </CardBody>
        </Card>
      </div>

      {/* Budget Overview */}
      <Card>
        <CardBody>
          <CardTitle>Budget Overview</CardTitle>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Total Budget</div>
              <div className="text-2xl font-bold text-gray-900">${stats.totalBudget.toLocaleString()}</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Spent</div>
              <div className="text-lg font-semibold text-gray-900">${stats.budgetSpent.toLocaleString()}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(stats.budgetSpent / stats.totalBudget) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {((stats.budgetSpent / stats.totalBudget) * 100).toFixed(1)}% of budget used
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Recent Invoices */}
      <Card>
        <CardBody>
          <CardTitle>Recent Invoices</CardTitle>
          <div className="space-y-3 mt-4">
            {invoices.slice(0, 5).map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{invoice.studentName}</div>
                  <div className="text-sm text-gray-500">{invoice.type} • Due: {invoice.dueDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${invoice.amount.toLocaleString()}</div>
                  {getStatusBadge(invoice.status)}
                  {invoice.status !== 'Paid' && (
                    <Button 
                      onClick={() => handlePayment(invoice)} 
                      size="sm" 
                      className="mt-2"
                    >
                      Record Payment
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Invoices & Payments</h2>
        <Button onClick={() => setShowInvoiceModal(true)}>+ Create Invoice</Button>
      </div>

      <Card>
        <CardBody>
          <CardTitle>All Invoices</CardTitle>
          <div className="space-y-3 mt-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{invoice.studentName}</div>
                  <div className="text-sm text-gray-500">{invoice.type} • Issued: {invoice.issuedDate}</div>
                  <div className="text-xs text-gray-400">Due: {invoice.dueDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${invoice.amount.toLocaleString()}</div>
                  {getStatusBadge(invoice.status)}
                  {invoice.status !== 'Paid' && (
                    <Button 
                      onClick={() => handlePayment(invoice)} 
                      size="sm" 
                      className="mt-2"
                    >
                      Record Payment
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderExpenses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Expenses</h2>
        <Button onClick={() => setShowExpenseModal(true)}>+ Add Expense</Button>
      </div>

      <Card>
        <CardBody>
          <CardTitle>Expense Records</CardTitle>
          <div className="space-y-3 mt-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{expense.category}</div>
                  <div className="text-sm text-gray-500">{expense.description}</div>
                  <div className="text-xs text-gray-400">Date: {expense.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${expense.amount.toLocaleString()}</div>
                  {getStatusBadge(expense.status)}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderBudgets = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Budget Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => (
          <Card key={budget.id}>
            <CardBody>
              <CardTitle>{budget.category}</CardTitle>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Allocated</span>
                  <span className="font-medium">${budget.allocated.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spent</span>
                  <span className="font-medium">${budget.spent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining</span>
                  <span className="font-medium text-green-600">${budget.remaining.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(budget.spent / budget.allocated) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {((budget.spent / budget.allocated) * 100).toFixed(1)}% used • {budget.period}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Finance Dashboard</h1>
        <p className="text-gray-600">Financial Management • {school.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'overview' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'invoices' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Invoices
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'expenses' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Expenses
        </button>
        <button
          onClick={() => setActiveTab('budgets')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'budgets' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Budgets
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'invoices' && renderInvoices()}
      {activeTab === 'expenses' && renderExpenses()}
      {activeTab === 'budgets' && renderBudgets()}

      {/* Payment Modal */}
      {showInvoiceModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Record Payment</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student
                  </label>
                  <div className="text-gray-900 font-medium">{selectedInvoice.studentName}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Type
                  </label>
                  <div className="text-gray-900">{selectedInvoice.type}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount Due
                  </label>
                  <div className="text-2xl font-bold text-gray-900">${selectedInvoice.amount.toLocaleString()}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Amount *
                  </label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    max={selectedInvoice.amount}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    This is a payment simulation. In a real implementation, this would connect to a payment gateway.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={processPayment} 
                    disabled={isProcessing || !paymentAmount || parseFloat(paymentAmount) <= 0}
                    className="flex-1"
                  >
                    {isProcessing ? 'Processing...' : 'Record Payment'}
                  </Button>
                  <Button 
                    onClick={() => setShowInvoiceModal(false)} 
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </SchoolShell>
  );
}
