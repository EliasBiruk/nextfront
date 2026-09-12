'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolReports() {
  const [reports, setReports] = useState([
    {
      id: '1',
      name: 'Student Performance Report - Q2 2024',
      category: 'Student Report',
      type: 'Performance Analytics',
      generatedBy: 'Academic Affairs',
      date: '2024-08-25',
      status: 'Completed',
      format: 'PDF',
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'Attendance Summary - August 2024',
      category: 'Attendance Report',
      type: 'Attendance Analytics',
      generatedBy: 'Administration',
      date: '2024-08-24',
      status: 'Completed',
      format: 'Excel',
      size: '1.8 MB'
    },
    {
      id: '3',
      name: 'Financial Summary - Monthly Report',
      category: 'Finance Report',
      type: 'Financial Analytics',
      generatedBy: 'Finance Department',
      date: '2024-08-23',
      status: 'Completed',
      format: 'PDF',
      size: '3.2 MB'
    },
    {
      id: '4',
      name: 'Examination Results - Mid-Term 2024',
      category: 'Academic Report',
      type: 'Examination Analytics',
      generatedBy: 'Academic Affairs',
      date: '2024-08-22',
      status: 'In Progress',
      format: 'PDF',
      size: 'Processing'
    },
    {
      id: '5',
      name: 'HR Performance Report - Q2 2024',
      category: 'HR Report',
      type: 'HR Analytics',
      generatedBy: 'HR Department',
      date: '2024-08-21',
      status: 'Completed',
      format: 'Excel',
      size: '2.1 MB'
    },
  ]);

  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const filteredReports = reports.filter(report => {
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const handleDownload = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    alert(`Downloading ${report?.name} (${report?.format})`);
  };

  const handleSchedule = (reportId: string) => {
    setSelectedReport(reports.find(r => r.id === reportId));
    setShowScheduleModal(true);
  };

  const handleDelete = (reportId: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      setReports(prev => prev.filter(r => r.id !== reportId));
    }
  };

  const totalReports = reports.length;
  const studentReports = reports.filter(r => r.category === 'Student Report').length;
  const academicReports = reports.filter(r => r.category === 'Academic Report').length;
  const financeReports = reports.filter(r => r.category === 'Finance Report').length;
  const customReports = reports.filter(r => r.category === 'Custom Report').length;

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">Generate and manage student, academic, attendance, finance, HR, examination, inventory, and transport reports</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowGenerateModal(true)}>+ Generate Report</Button>
          <Button variant="outline" onClick={() => setShowGenerateModal(true)}>Create Custom Report</Button>
          <Button variant="outline" onClick={() => setShowScheduleModal(true)}>Schedule Reports</Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option>Student Report</option>
            <option>Academic Report</option>
            <option>Attendance Report</option>
            <option>Finance Report</option>
            <option>HR Report</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Scheduled</option>
          </select>
        </div>
      </div>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{totalReports}</div>
            <p className="text-gray-600 text-sm">Total Reports</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{studentReports}</div>
            <p className="text-gray-600 text-sm">Student Reports</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{academicReports}</div>
            <p className="text-gray-600 text-sm">Academic Reports</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{financeReports}</div>
            <p className="text-gray-600 text-sm">Finance Reports</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{customReports}</div>
            <p className="text-gray-600 text-sm">Custom Reports</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👨‍🎓</div>
            <div className="font-semibold">Student Reports</div>
            <div className="text-sm text-gray-600">Student analytics</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-semibold">Academic Reports</div>
            <div className="text-sm text-gray-600">Academic performance</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="font-semibold">Finance Reports</div>
            <div className="text-sm text-gray-600">Financial data</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">Custom Reports</div>
            <div className="text-sm text-gray-600">Custom analytics</div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardBody>
          <CardTitle>Recent Reports ({filteredReports.length} reports)</CardTitle>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      📊
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{report.name}</h3>
                        <Badge variant="default" size="sm">{report.category}</Badge>
                        <Badge variant={
                          report.status === 'Completed' ? 'success' : 
                          report.status === 'In Progress' ? 'warning' : 'default'
                        }>
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{report.type} • {report.format}</p>
                      <p className="text-xs text-gray-400 mt-1">Generated by: {report.generatedBy} • Size: {report.size}</p>
                      <p className="text-xs text-gray-400">Date: {report.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>View</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(report.id)}>Download</Button>
                    <Button variant="outline" size="sm" onClick={() => handleSchedule(report.id)}>Schedule</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(report.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredReports.length === 0 && (
              <div className="text-center py-8 text-gray-500">No reports found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Generate New Report</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Name *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Student Performance Report"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Student Report</option>
                    <option>Academic Report</option>
                    <option>Attendance Report</option>
                    <option>Finance Report</option>
                    <option>HR Report</option>
                    <option>Custom Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Performance Analytics</option>
                    <option>Attendance Analytics</option>
                    <option>Financial Analytics</option>
                    <option>Examination Analytics</option>
                    <option>HR Analytics</option>
                    <option>Custom Analytics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg" />
                    <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowGenerateModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { setShowGenerateModal(false); alert('Report generation started!'); }}>Generate Report</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Schedule Report</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Student Performance Report</option>
                    <option>Attendance Summary</option>
                    <option>Financial Summary</option>
                    <option>Examination Results</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="email@example.com, ..."
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowScheduleModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { setShowScheduleModal(false); alert('Report scheduled successfully!'); }}>Schedule Report</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* View Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Report Details</CardTitle>
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{selectedReport.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{selectedReport.category}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{selectedReport.type}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">{selectedReport.format}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{selectedReport.size}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Generated By:</span>
                    <span className="font-medium">{selectedReport.generatedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedReport.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setSelectedReport(null)}>Close</Button>
                <Button variant="outline" onClick={() => handleDownload(selectedReport.id)}>Download</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}