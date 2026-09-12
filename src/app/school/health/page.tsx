'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolHealth() {
  const [activities, setActivities] = useState([
    {
      id: '1',
      type: 'Health Visit',
      student: 'John Smith (STU2024001)',
      class: 'Class 10-A',
      description: 'Routine checkup - Fever and headache',
      date: '2024-08-25',
      status: 'Completed',
      severity: 'Minor',
      action: 'Medication prescribed'
    },
    {
      id: '2',
      type: 'Immunization',
      student: 'Emma Johnson (STU2024002)',
      class: 'Class 11-B',
      description: 'Flu vaccine - Annual immunization',
      date: '2024-08-24',
      status: 'Completed',
      severity: 'Routine',
      action: 'Record updated'
    },
    {
      id: '3',
      type: 'Medical Incident',
      student: 'Michael Chen (STU2024003)',
      class: 'Class 12-A',
      description: 'Sports injury - Ankle sprain during basketball',
      date: '2024-08-23',
      status: 'Active',
      severity: 'Moderate',
      action: 'RICE treatment, monitor'
    },
    {
      id: '4',
      type: 'Health Visit',
      student: 'Sarah Williams (STU2024004)',
      class: 'Class 9-C',
      description: 'Allergic reaction - Possible food allergy',
      date: '2024-08-22',
      status: 'Completed',
      severity: 'Moderate',
      action: 'Antihistamine administered'
    },
    {
      id: '5',
      type: 'Medical Record Update',
      student: 'David Brown (STU2024005)',
      class: 'Class 10-B',
      description: 'New medical condition - Asthma diagnosis',
      date: '2024-08-21',
      status: 'Completed',
      severity: 'Chronic',
      action: 'Profile updated, inhaler prescribed'
    },
  ]);

  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showImmunizationModal, setShowImmunizationModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const filteredActivities = activities.filter(activity => {
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const handleDelete = (activityId: string) => {
    if (confirm('Are you sure you want to delete this health record?')) {
      setActivities(prev => prev.filter(a => a.id !== activityId));
    }
  };

  const handleUpdateStatus = (activityId: string) => {
    setActivities(prev => prev.map(a => 
      a.id === activityId ? { ...a, status: a.status === 'Active' ? 'Completed' : 'Active' } : a
    ));
  };

  const activeIncidents = activities.filter(a => a.status === 'Active').length;
  const immunizations = activities.filter(a => a.type === 'Immunization').length;
  const healthVisits = activities.filter(a => a.type === 'Health Visit').length;

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Health</h1>
        <p className="text-gray-600">Manage student health profiles, medical records, visits, and immunizations</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowAddRecordModal(true)}>+ Add Health Record</Button>
          <Button variant="outline" onClick={() => setShowVisitModal(true)}>Log Visit</Button>
          <Button variant="outline" onClick={() => setShowImmunizationModal(true)}>Record Immunization</Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option>Health Visit</option>
            <option>Immunization</option>
            <option>Medical Incident</option>
            <option>Medical Record Update</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option>Active</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Health Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{activities.length}</div>
            <p className="text-gray-600 text-sm">Health Profiles</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{activities.length}</div>
            <p className="text-gray-600 text-sm">Medical Records</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{healthVisits}</div>
            <p className="text-gray-600 text-sm">Visits This Month</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{activeIncidents}</div>
            <p className="text-gray-600 text-sm">Active Incidents</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{immunizations}</div>
            <p className="text-gray-600 text-sm">Immunizations</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👤</div>
            <div className="font-semibold">Health Profiles</div>
            <div className="text-sm text-gray-600">Student health data</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold">Medical Records</div>
            <div className="text-sm text-gray-600">Medical history</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🏥</div>
            <div className="font-semibold">Visits</div>
            <div className="text-sm text-gray-600">Health center visits</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">💉</div>
            <div className="font-semibold">Immunizations</div>
            <div className="text-sm text-gray-600">Vaccination records</div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Health Activity */}
      <Card>
        <CardBody>
          <CardTitle>Recent Health Activity ({filteredActivities.length} records)</CardTitle>
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {activity.type === 'Health Visit' ? '🏥' : 
                       activity.type === 'Immunization' ? '💉' : 
                       activity.type === 'Medical Incident' ? '⚠️' : '📋'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{activity.type}</h3>
                        <Badge variant={
                          activity.severity === 'Minor' || activity.severity === 'Routine' ? 'success' : 
                          activity.severity === 'Moderate' ? 'warning' : 
                          activity.severity === 'Chronic' ? 'info' : 'danger'
                        }>
                          {activity.severity}
                        </Badge>
                        <Badge variant={
                          activity.status === 'Completed' ? 'success' : 
                          activity.status === 'Active' ? 'warning' : 'default'
                        }>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">Student: {activity.student} • {activity.class}</p>
                      <p className="text-xs text-gray-400">Date: {activity.date} • Action: {activity.action}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedActivity(activity)}>View</Button>
                    {activity.status === 'Active' && (
                      <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(activity.id)}>Mark Complete</Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleDelete(activity.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredActivities.length === 0 && (
              <div className="text-center py-8 text-gray-500">No health records found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Add Health Record Modal */}
      {showAddRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Add Health Record</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Select Student</option>
                    <option>John Smith (STU2024001)</option>
                    <option>Emma Johnson (STU2024002)</option>
                    <option>Michael Chen (STU2024003)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Record Type *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Medical Condition</option>
                    <option>Allergy</option>
                    <option>Medication</option>
                    <option>Chronic Condition</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Describe the medical condition..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Minor</option>
                    <option>Moderate</option>
                    <option>Severe</option>
                    <option>Chronic</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddRecordModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { setShowAddRecordModal(false); alert('Health record added successfully!'); }}>Add Record</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Log Visit Modal */}
      {showVisitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Log Health Visit</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Select Student</option>
                    <option>John Smith (STU2024001)</option>
                    <option>Emma Johnson (STU2024002)</option>
                    <option>Michael Chen (STU2024003)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visit Type *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Routine Checkup</option>
                    <option>Emergency</option>
                    <option>Follow-up</option>
                    <option>Sports Injury</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chief Complaint *</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Describe the reason for visit..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Action Taken</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Medication prescribed, RICE treatment"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowVisitModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { setShowVisitModal(false); alert('Visit logged successfully!'); }}>Log Visit</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Record Immunization Modal */}
      {showImmunizationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Record Immunization</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Select Student</option>
                    <option>John Smith (STU2024001)</option>
                    <option>Emma Johnson (STU2024002)</option>
                    <option>Michael Chen (STU2024003)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vaccine *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Flu Vaccine</option>
                    <option>Tetanus</option>
                    <option>MMR</option>
                    <option>Hepatitis B</option>
                    <option>COVID-19</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Administered *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., ABC12345"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowImmunizationModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { setShowImmunizationModal(false); alert('Immunization recorded successfully!'); }}>Record Immunization</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* View Details Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Health Record Details</CardTitle>
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{selectedActivity.type}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Student:</span>
                    <span className="font-medium">{selectedActivity.student}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Class:</span>
                    <span className="font-medium">{selectedActivity.class}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Description:</span>
                    <span className="font-medium">{selectedActivity.description}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Severity:</span>
                    <span className="font-medium">{selectedActivity.severity}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium">{selectedActivity.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedActivity.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setSelectedActivity(null)}>Close</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}