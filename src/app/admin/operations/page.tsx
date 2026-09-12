'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function AdminOperations() {
  const [operations, setOperations] = useState([
    {
      id: 'op-1',
      name: 'Database Backup',
      type: 'maintenance',
      status: 'completed',
      startedAt: '2024-08-25T02:00:00Z',
      completedAt: '2024-08-25T02:15:00Z',
      duration: '15 minutes',
      performedBy: 'System',
      result: 'Success'
    },
    {
      id: 'op-2',
      name: 'Cache Clear',
      type: 'maintenance',
      status: 'completed',
      startedAt: '2024-08-25T01:00:00Z',
      completedAt: '2024-08-25T01:02:00Z',
      duration: '2 minutes',
      performedBy: 'admin@joyedu.com',
      result: 'Success'
    },
    {
      id: 'op-3',
      name: 'User Data Export',
      type: 'export',
      status: 'in_progress',
      startedAt: '2024-08-25T10:30:00Z',
      completedAt: null,
      duration: null,
      performedBy: 'admin@joyedu.com',
      result: null
    },
    {
      id: 'op-4',
      name: 'Content Index Rebuild',
      type: 'maintenance',
      status: 'pending',
      startedAt: null,
      completedAt: null,
      duration: null,
      performedBy: null,
      result: null
    },
    {
      id: 'op-5',
      name: 'System Health Check',
      type: 'monitoring',
      status: 'completed',
      startedAt: '2024-08-24T23:00:00Z',
      completedAt: '2024-08-24T23:05:00Z',
      duration: '5 minutes',
      performedBy: 'System',
      result: 'Success'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const statuses = ['pending', 'in_progress', 'completed', 'failed'];
  const types = ['maintenance', 'export', 'import', 'monitoring', 'cleanup'];

  const filteredOperations = operations.filter(op => {
    const matchesStatus = filterStatus === 'all' || op.status === filterStatus;
    const matchesType = filterType === 'all' || op.type === filterType;
    return matchesStatus && matchesType;
  });

  const handleRunOperation = (id: string) => {
    setOperations(prev => prev.map(op => 
      op.id === id ? { ...op, status: 'in_progress' as const, startedAt: new Date().toISOString(), completedAt: null, duration: null, performedBy: op.performedBy || 'System', result: null } : op
    ));
    alert('Operation started');
  };

  const handleCancelOperation = (id: string) => {
    setOperations(prev => prev.map(op => 
      op.id === id ? { ...op, status: 'pending' as const, startedAt: null, completedAt: null, duration: null, performedBy: null, result: null } : op
    ));
    alert('Operation cancelled');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance': return '🔧';
      case 'export': return '📤';
      case 'import': return '📥';
      case 'monitoring': return '📊';
      case 'cleanup': return '🧹';
      default: return '⚙️';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const pendingCount = operations.filter(o => o.status === 'pending').length;
  const inProgressCount = operations.filter(o => o.status === 'in_progress').length;

  return (
    <DashboardLayout actor="admin" userName="Admin">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Operations</h1>
        <p className="text-gray-600">Manage system operations and maintenance tasks</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowScheduleModal(true)}>+ Schedule Operation</Button>
          <Button variant="outline">Run Health Check</Button>
          <Button variant="outline">View Logs</Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status.replace('_', ' ').toUpperCase()}</option>
            ))}
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Operations Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{operations.length}</div>
            <p className="text-gray-600 text-sm">Total Operations</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-gray-600 mb-1">{pendingCount}</div>
            <p className="text-gray-600 text-sm">Pending</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{inProgressCount}</div>
            <p className="text-gray-600 text-sm">In Progress</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {operations.filter(o => o.status === 'completed').length}
            </div>
            <p className="text-gray-600 text-sm">Completed</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{types.length}</div>
            <p className="text-gray-600 text-sm">Operation Types</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">💾</div>
            <div className="font-semibold">Database Backup</div>
            <div className="text-sm text-gray-600">Backup database</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🧹</div>
            <div className="font-semibold">Cache Clear</div>
            <div className="text-sm text-gray-600">Clear system cache</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">Health Check</div>
            <div className="text-sm text-gray-600">System health</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📤</div>
            <div className="font-semibold">Data Export</div>
            <div className="text-sm text-gray-600">Export data</div>
          </CardBody>
        </Card>
      </div>

      {/* Operations List */}
      <Card>
        <CardBody>
          <CardTitle>Operations ({filteredOperations.length})</CardTitle>
          <div className="mt-4 space-y-4">
            {filteredOperations.map((operation) => (
              <div key={operation.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl">
                      {getTypeIcon(operation.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{operation.name}</h3>
                        <Badge className={getStatusColor(operation.status)}>
                          {operation.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge variant="default">{operation.type}</Badge>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>Performed by: {operation.performedBy || 'Not started'}</span>
                        {operation.startedAt && (
                          <span>Started: {new Date(operation.startedAt).toLocaleString()}</span>
                        )}
                        {operation.duration && (
                          <span>Duration: {operation.duration}</span>
                        )}
                      </div>
                      {operation.result && (
                        <p className="text-sm text-gray-600 mt-1">Result: {operation.result}</p>
                      )}
                      {operation.status === 'in_progress' && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Processing... 60%</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {operation.status === 'pending' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleRunOperation(operation.id)}
                      >
                        Run Now
                      </Button>
                    )}
                    {operation.status === 'in_progress' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCancelOperation(operation.id)}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredOperations.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No operations found matching your filters.
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Schedule Operation Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardBody>
              <CardTitle>Schedule Operation</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operation Type *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    {types.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Time</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Repeat</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="once">Once</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Add notes about this operation..."
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => {
                  setShowScheduleModal(false);
                  alert('Operation scheduled successfully!');
                }}>
                  Schedule
                </Button>
                <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
