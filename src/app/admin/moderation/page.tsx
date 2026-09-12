'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function AdminModeration() {
  const [reports, setReports] = useState([
    {
      id: 'report-1',
      type: 'course',
      title: 'Advanced JavaScript Patterns',
      reportedBy: 'user123@example.com',
      reason: 'Inappropriate content',
      status: 'pending',
      severity: 'high',
      reportedAt: '2024-08-25T10:30:00Z',
      description: 'Course contains offensive language in lesson 3',
      contentType: 'Course'
    },
    {
      id: 'report-2',
      type: 'comment',
      title: 'Comment on Python Basics',
      reportedBy: 'user456@example.com',
      reason: 'Spam',
      status: 'pending',
      severity: 'low',
      reportedAt: '2024-08-25T09:15:00Z',
      description: 'User posting promotional links in comments',
      contentType: 'Comment'
    },
    {
      id: 'report-3',
      type: 'user',
      title: 'User Profile: spammer99',
      reportedBy: 'system',
      reason: 'Suspicious activity',
      status: 'under_review',
      severity: 'medium',
      reportedAt: '2024-08-24T16:00:00Z',
      description: 'Multiple account creation from same IP',
      contentType: 'User'
    },
    {
      id: 'report-4',
      type: 'course',
      title: 'Web Development Fundamentals',
      reportedBy: 'user789@example.com',
      reason: 'Copyright violation',
      status: 'resolved',
      severity: 'high',
      reportedAt: '2024-08-23T14:30:00Z',
      description: 'Content copied from another platform without attribution',
      contentType: 'Course'
    },
    {
      id: 'report-5',
      type: 'review',
      title: 'Review for React Course',
      reportedBy: 'instructor@example.com',
      reason: 'Fake review',
      status: 'pending',
      severity: 'medium',
      reportedAt: '2024-08-23T11:00:00Z',
      description: 'Review appears to be bot-generated',
      contentType: 'Review'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const statuses = ['pending', 'under_review', 'resolved', 'rejected'];
  const severities = ['high', 'medium', 'low'];
  const types = ['course', 'comment', 'user', 'review'];

  const filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || report.severity === filterSeverity;
    const matchesType = filterType === 'all' || report.type === filterType;
    return matchesStatus && matchesSeverity && matchesType;
  });

  const handleApprove = (id: string) => {
    setReports(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'resolved' } : r
    ));
    alert('Report resolved - content approved');
  };

  const handleReject = (id: string) => {
    setReports(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'rejected' } : r
    ));
    alert('Report resolved - content removed');
  };

  const handleEscalate = (id: string) => {
    setReports(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'under_review' } : r
    ));
    alert('Report escalated for further review');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return '📚';
      case 'comment': return '💬';
      case 'user': return '👤';
      case 'review': return '⭐';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'under_review': return 'bg-blue-100 text-blue-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const pendingCount = reports.filter(r => r.status === 'pending').length;
  const highSeverityCount = reports.filter(r => r.severity === 'high').length;

  return (
    <DashboardLayout actor="admin" userName="Admin">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Moderation</h1>
        <p className="text-gray-600">Review and moderate reported content across the platform</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button>Auto-Moderation Settings</Button>
          <Button variant="outline">Moderation Guidelines</Button>
          <Button variant="outline">Export Reports</Button>
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

      {/* Moderation Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{reports.length}</div>
            <p className="text-gray-600 text-sm">Total Reports</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{pendingCount}</div>
            <p className="text-gray-600 text-sm">Pending</p>
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
            <div className="text-3xl font-bold text-green-600 mb-1">
              {reports.filter(r => r.status === 'resolved').length}
            </div>
            <p className="text-gray-600 text-sm">Resolved</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{types.length}</div>
            <p className="text-gray-600 text-sm">Content Types</p>
          </CardBody>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardBody>
          <CardTitle>Reports ({filteredReports.length})</CardTitle>
          <div className="mt-4 space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl">
                      {getTypeIcon(report.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{report.title}</h3>
                        <Badge className={getSeverityColor(report.severity)}>
                          {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                        </Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge variant="default">{report.contentType}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>Reported by: {report.reportedBy}</span>
                        <span>Reason: {report.reason}</span>
                        <span>{new Date(report.reportedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedReport(report)}
                    >
                      Details
                    </Button>
                    {report.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleApprove(report.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleReject(report.id)}
                        >
                          Reject
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEscalate(report.id)}
                        >
                          Escalate
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredReports.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No reports found matching your filters.
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <CardBody>
              <CardTitle>Report Details</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold">Content Information</h4>
                  <p className="text-sm text-gray-600">Type: {selectedReport.contentType}</p>
                  <p className="text-sm text-gray-600">Title: {selectedReport.title}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Report Information</h4>
                  <p className="text-sm text-gray-600">Reported by: {selectedReport.reportedBy}</p>
                  <p className="text-sm text-gray-600">Reason: {selectedReport.reason}</p>
                  <p className="text-sm text-gray-600">Description: {selectedReport.description}</p>
                  <p className="text-sm text-gray-600">Severity: {selectedReport.severity}</p>
                  <p className="text-sm text-gray-600">Status: {selectedReport.status}</p>
                  <p className="text-sm text-gray-600">Reported: {new Date(selectedReport.reportedAt).toLocaleString()}</p>
                </div>
                {selectedReport.status === 'pending' && (
                  <div className="flex gap-4 pt-4 border-t">
                    <Button onClick={() => {
                      handleApprove(selectedReport.id);
                      setSelectedReport(null);
                    }}>
                      Approve Content
                    </Button>
                    <Button variant="outline" onClick={() => {
                      handleReject(selectedReport.id);
                      setSelectedReport(null);
                    }}>
                      Remove Content
                    </Button>
                    <Button variant="outline" onClick={() => {
                      handleEscalate(selectedReport.id);
                      setSelectedReport(null);
                    }}>
                      Escalate
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setSelectedReport(null)}>
                  Close
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
