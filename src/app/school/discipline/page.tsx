'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolDiscipline() {
  const [incidents, setIncidents] = useState([
    {
      id: '1',
      type: 'Behavioral',
      student: 'John Smith (STU2024001)',
      class: 'Class 10-A',
      incident: 'Disruptive behavior in class',
      reportedBy: 'Prof. Williams',
      date: '2024-08-25',
      status: 'In Progress',
      severity: 'Medium',
      action: 'Warning Issued'
    },
    {
      id: '2',
      type: 'Attendance',
      student: 'Emma Johnson (STU2024002)',
      class: 'Class 11-B',
      incident: 'Repeated tardiness',
      reportedBy: 'Dr. Chen',
      date: '2024-08-24',
      status: 'Open',
      severity: 'Low',
      action: 'Counseling Required'
    },
    {
      id: '3',
      type: 'Academic',
      student: 'Michael Chen (STU2024003)',
      class: 'Class 12-A',
      incident: 'Plagiarism in assignment',
      reportedBy: 'Ms. Brown',
      date: '2024-08-23',
      status: 'Resolved',
      severity: 'High',
      action: 'Grade Penalty + Warning'
    },
    {
      id: '4',
      type: 'Behavioral',
      student: 'Sarah Williams (STU2024004)',
      class: 'Class 9-C',
      incident: 'Bullying incident',
      reportedBy: 'Mr. Davis',
      date: '2024-08-22',
      status: 'In Progress',
      severity: 'High',
      action: 'Suspension Pending'
    },
    {
      id: '5',
      type: 'Other',
      student: 'David Brown (STU2024005)',
      class: 'Class 10-B',
      incident: 'Vandalism of school property',
      reportedBy: 'Security',
      date: '2024-08-21',
      status: 'Resolved',
      severity: 'High',
      action: 'Community Service + Fine'
    },
  ]);

  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  const filteredIncidents = incidents.filter(incident => {
    const matchesType = filterType === 'all' || incident.type === filterType;
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const handleCloseCase = (incidentId: string) => {
    setIncidents(prev => prev.map(incident => {
      if (incident.id === incidentId) {
        return { ...incident, status: 'Closed' };
      }
      return incident;
    }));
    alert(`Case closed for incident ${incidentId}`);
  };

  const handleUpdateIncident = (incidentId: string) => {
    setSelectedIncident(incidents.find(i => i.id === incidentId));
    setShowReportModal(true);
  };

  const handleIssueWarning = (incidentId: string) => {
    setSelectedIncident(incidents.find(i => i.id === incidentId));
    setShowWarningModal(true);
  };

  const handleGenerateReport = () => {
    alert('Generating discipline report...');
  };

  const totalIncidents = incidents.length;
  const openCases = incidents.filter(i => i.status === 'Open').length;
  const warningsIssued = incidents.filter(i => i.action.includes('Warning')).length;
  const suspensions = incidents.filter(i => i.action.includes('Suspension')).length;
  const resolved = incidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Discipline</h1>
        <p className="text-gray-600">Manage student discipline, incidents, warnings, and disciplinary actions</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowReportModal(true)}>+ Report Incident</Button>
          <Button variant="outline" onClick={() => setShowWarningModal(true)}>Issue Warning</Button>
          <Button variant="outline" onClick={handleGenerateReport}>Generate Report</Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option>Behavioral</option>
            <option>Academic</option>
            <option>Attendance</option>
            <option>Other</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </div>
      </div>

      {/* Discipline Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{totalIncidents}</div>
            <p className="text-gray-600 text-sm">Total Incidents</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{openCases}</div>
            <p className="text-gray-600 text-sm">Open Cases</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{warningsIssued}</div>
            <p className="text-gray-600 text-sm">Warnings Issued</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{suspensions}</div>
            <p className="text-gray-600 text-sm">Suspensions</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{resolved}</div>
            <p className="text-gray-600 text-sm">Resolved</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">⚠️</div>
            <div className="font-semibold">Incidents</div>
            <div className="text-sm text-gray-600">Incident reports</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold">Cases</div>
            <div className="text-sm text-gray-600">Discipline cases</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🚫</div>
            <div className="font-semibold">Warnings</div>
            <div className="text-sm text-gray-600">Warning records</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">Reports</div>
            <div className="text-sm text-gray-600">Discipline reports</div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardBody>
          <CardTitle>Recent Incidents ({filteredIncidents.length} incidents)</CardTitle>
          <div className="space-y-4">
            {filteredIncidents.map((incident) => (
              <div key={incident.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      ⚠️
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{incident.incident}</h3>
                        <Badge variant={
                          incident.severity === 'High' ? 'danger' : 
                          incident.severity === 'Medium' ? 'warning' : 'info'
                        }>
                          {incident.severity}
                        </Badge>
                        <Badge variant={
                          incident.status === 'Resolved' ? 'success' : 
                          incident.status === 'In Progress' ? 'warning' : 
                          incident.status === 'Open' ? 'danger' : 'default'
                        }>
                          {incident.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{incident.type} • {incident.class}</p>
                      <p className="text-xs text-gray-400 mt-1">Student: {incident.student} • Reported by: {incident.reportedBy}</p>
                      <p className="text-xs text-gray-400">Date: {incident.date} • Action: {incident.action}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedIncident(incident)}>View Details</Button>
                    <Button variant="outline" size="sm" onClick={() => handleUpdateIncident(incident.id)}>Update</Button>
                    {incident.status !== 'Closed' && (
                      <Button variant="outline" size="sm" onClick={() => handleCloseCase(incident.id)}>Close Case</Button>
                    )}
                    {incident.status === 'Open' && (
                      <Button variant="outline" size="sm" onClick={() => handleIssueWarning(incident.id)}>Issue Warning</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredIncidents.length === 0 && (
              <div className="text-center py-8 text-gray-500">No incidents found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Report Incident Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Report New Incident</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Select Student</option>
                    <option>John Smith (STU2024001)</option>
                    <option>Emma Johnson (STU2024002)</option>
                    <option>Michael Chen (STU2024003)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Behavioral</option>
                    <option>Academic</option>
                    <option>Attendance</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Incident Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Describe the incident in detail..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reported By</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowReportModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { setShowReportModal(false); alert('Incident reported successfully!'); }}>Submit Report</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Issue Warning Modal */}
      {showWarningModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Issue Warning - {selectedIncident.student}</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Warning Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Verbal Warning</option>
                    <option>Written Warning</option>
                    <option>Parent Notification</option>
                    <option>Probation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Warning Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Describe the warning and any follow-up actions..."
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowWarningModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { 
                  setShowWarningModal(false);
                  setIncidents(prev => prev.map(i => 
                    i.id === selectedIncident.id 
                      ? { ...i, action: 'Warning Issued', status: 'In Progress' }
                      : i
                  ));
                  alert('Warning issued successfully!');
                }}>
                  Issue Warning
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}