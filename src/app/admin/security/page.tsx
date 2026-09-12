'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function AdminSecurity() {
  const [securityLogs, setSecurityLogs] = useState([
    {
      id: 'log-1',
      type: 'alert',
      event: 'Multiple Failed Login Attempts',
      severity: 'high',
      ip: '192.168.1.100',
      user: 'Unknown',
      timestamp: '2024-08-25T10:30:00Z',
      details: '5 failed login attempts within 5 minutes'
    },
    {
      id: 'log-2',
      type: 'warning',
      event: 'Unusual Access Pattern',
      severity: 'medium',
      ip: '203.45.67.89',
      user: 'user@example.com',
      timestamp: '2024-08-25T09:15:00Z',
      details: 'Access from unusual geographic location'
    },
    {
      id: 'log-3',
      type: 'info',
      event: 'Password Reset Request',
      severity: 'low',
      ip: '198.51.100.42',
      user: 'teacher@school.edu',
      timestamp: '2024-08-25T08:00:00Z',
      details: 'Password reset link sent successfully'
    },
    {
      id: 'log-4',
      type: 'success',
      event: 'Successful Login',
      severity: 'low',
      ip: '10.0.0.15',
      user: 'admin@joyedu.com',
      timestamp: '2024-08-25T07:30:00Z',
      details: 'Admin login from trusted IP'
    },
    {
      id: 'log-5',
      type: 'alert',
      event: 'API Rate Limit Exceeded',
      severity: 'high',
      ip: '172.16.0.23',
      user: 'api-user-123',
      timestamp: '2024-08-24T23:45:00Z',
      details: 'Rate limit exceeded for API endpoint'
    }
  ]);

  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showBlockModal, setShowBlockModal] = useState(false);

  const severities = ['high', 'medium', 'low'];
  const types = ['alert', 'warning', 'info', 'success'];

  const filteredLogs = securityLogs.filter(log => {
    const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
    const matchesType = filterType === 'all' || log.type === filterType;
    return matchesSeverity && matchesType;
  });

  const handleBlockIP = (ip: string) => {
    if (confirm(`Block IP address ${ip}?`)) {
      alert(`IP ${ip} has been blocked`);
    }
  };

  const handleResolve = (id: string) => {
    setSecurityLogs(prev => prev.filter(log => log.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return '⚠️';
      case 'success': return '✅';
      case 'warning': return '🔔';
      case 'info': return 'ℹ️';
      default: return '📋';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const highSeverityCount = securityLogs.filter(l => l.severity === 'high').length;
  const mediumSeverityCount = securityLogs.filter(l => l.severity === 'medium').length;

  return (
    <DashboardLayout actor="admin" userName="Admin">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Security Management</h1>
        <p className="text-gray-600">Monitor platform security and manage access controls</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowBlockModal(true)}>+ Block IP Address</Button>
          <Button variant="outline">View Blocked IPs</Button>
          <Button variant="outline">Security Audit</Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
          >
            <option value="all">All Severities</option>
            {severities.map(sev => (
              <option key={sev} value={sev}>{sev.charAt(0).toUpperCase() + sev.slice(1)}</option>
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

      {/* Security Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{securityLogs.length}</div>
            <p className="text-gray-600 text-sm">Total Events</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{highSeverityCount}</div>
            <p className="text-gray-600 text-sm">High Severity</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{mediumSeverityCount}</div>
            <p className="text-gray-600 text-sm">Medium Severity</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">24</div>
            <p className="text-gray-600 text-sm">Blocked IPs</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">99.9%</div>
            <p className="text-gray-600 text-sm">System Uptime</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🔒</div>
            <div className="font-semibold">Blocked IPs</div>
            <div className="text-sm text-gray-600">Manage blocked IPs</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="font-semibold">User Sessions</div>
            <div className="text-sm text-gray-600">Active sessions</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🔑</div>
            <div className="font-semibold">API Keys</div>
            <div className="text-sm text-gray-600">Manage API keys</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">Security Reports</div>
            <div className="text-sm text-gray-600">View reports</div>
          </CardBody>
        </Card>
      </div>

      {/* Security Logs */}
      <Card>
        <CardBody>
          <CardTitle>Security Logs ({filteredLogs.length})</CardTitle>
          <div className="mt-4 space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl">
                      {getTypeIcon(log.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{log.event}</h3>
                        <Badge className={getSeverityColor(log.severity)}>
                          {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>👤 {log.user}</span>
                        <span>🌐 {log.ip}</span>
                        <span>🕐 {new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{log.details}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {log.severity === 'high' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleBlockIP(log.ip)}
                      >
                        Block IP
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleResolve(log.id)}
                    >
                      Resolve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredLogs.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No security logs found matching your filters.
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Block IP Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Block IP Address</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IP Address *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 192.168.1.100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason *</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Reason for blocking this IP..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="1h">1 Hour</option>
                    <option value="24h">24 Hours</option>
                    <option value="7d">7 Days</option>
                    <option value="30d">30 Days</option>
                    <option value="permanent">Permanent</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => {
                  setShowBlockModal(false);
                  alert('IP address blocked successfully!');
                }}>
                  Block IP
                </Button>
                <Button variant="outline" onClick={() => setShowBlockModal(false)}>
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
