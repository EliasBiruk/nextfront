'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolCommunication() {
  const [communications, setCommunications] = useState([
    {
      id: 'comm-1',
      type: 'Announcement',
      title: 'School Closure Due to Weather',
      sender: 'Principal Office',
      recipient: 'All Students & Staff',
      date: '2024-08-25',
      status: 'Active',
      priority: 'High',
      readCount: 2450,
      content: 'Due to severe weather conditions, the school will be closed tomorrow. Please stay safe.'
    },
    {
      id: 'comm-2',
      type: 'Class Announcement',
      title: 'Math Test Schedule Change',
      sender: 'Prof. Williams',
      recipient: 'Class 10-A',
      date: '2024-08-24',
      status: 'Active',
      priority: 'Medium',
      readCount: 30,
      content: 'The math test has been rescheduled from Friday to Monday. Please prepare accordingly.'
    },
    {
      id: 'comm-3',
      type: 'Message',
      title: 'Parent-Teacher Conference Reminder',
      sender: 'Ms. Brown',
      recipient: 'Parents of Class 9-C',
      date: '2024-08-23',
      status: 'Active',
      priority: 'Medium',
      readCount: 28,
      content: 'Reminder: Parent-teacher conferences are scheduled for next week. Please sign up for a time slot.'
    },
    {
      id: 'comm-4',
      type: 'Announcement',
      title: 'New Library Resources Available',
      sender: 'Library Department',
      recipient: 'All Students',
      date: '2024-08-22',
      status: 'Active',
      priority: 'Low',
      readCount: 1800,
      content: 'New books and digital resources have been added to the library. Check them out!'
    },
    {
      id: 'comm-5',
      type: 'Message',
      title: 'Sports Tryouts Registration',
      sender: 'Athletics Department',
      recipient: 'All Students',
      date: '2024-08-21',
      status: 'Scheduled',
      priority: 'Medium',
      readCount: 0,
      content: 'Sports tryouts registration opens next week. Sign up for your favorite sports.'
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState<any>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCommunications = communications.filter(comm => {
    const matchesSearch = comm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || comm.type === filterType;
    const matchesStatus = filterStatus === 'all' || comm.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = (commId: string) => {
    if (confirm('Are you sure you want to delete this communication?')) {
      setCommunications(prev => prev.filter(c => c.id !== commId));
    }
  };

  const handleArchive = (commId: string) => {
    setCommunications(prev => prev.map(c => 
      c.id === commId ? { ...c, status: 'Archived' } : c
    ));
  };

  const handleSend = (commId: string) => {
    setCommunications(prev => prev.map(c => 
      c.id === commId ? { ...c, status: 'Active' } : c
    ));
    alert('Communication sent successfully!');
  };

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Communication</h1>
        <p className="text-gray-600">Manage announcements, messages, and school communication</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowAddModal(true)}>+ New Announcement</Button>
          <Button variant="outline" onClick={() => setShowAddModal(true)}>Send Message</Button>
          <Button variant="outline" onClick={() => alert('Poll creation feature coming soon!')}>Create Poll</Button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search communications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Announcement">Announcements</option>
            <option value="Message">Messages</option>
            <option value="Class Announcement">Class Announcements</option>
            <option value="Emergency">Emergency</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Communication Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{communications.length}</div>
            <p className="text-gray-600 text-sm">Total Messages</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {communications.filter(c => c.type === 'Announcement').length}
            </div>
            <p className="text-gray-600 text-sm">Announcements</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {communications.filter(c => c.type === 'Message').length}
            </div>
            <p className="text-gray-600 text-sm">Messages</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {communications.filter(c => c.status === 'Active').length}
            </div>
            <p className="text-gray-600 text-sm">Active</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {communications.filter(c => c.status === 'Scheduled').length}
            </div>
            <p className="text-gray-600 text-sm">Scheduled</p>
          </CardBody>
        </Card>
      </div>

      {/* Communications List */}
      <Card>
        <CardBody>
          <CardTitle>Communications ({filteredCommunications.length} communications)</CardTitle>
          <div className="space-y-4">
            {filteredCommunications.map((communication) => (
              <div key={communication.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {communication.type === 'Announcement' ? '📢' : communication.type === 'Class Announcement' ? '🏫' : '💬'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{communication.title}</h3>
                        <Badge variant={
                          communication.priority === 'High' ? 'danger' : 
                          communication.priority === 'Medium' ? 'warning' : 'info'
                        }>
                          {communication.priority}
                        </Badge>
                        <Badge variant={communication.status === 'Active' ? 'success' : communication.status === 'Scheduled' ? 'warning' : 'default'}>
                          {communication.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{communication.type} • From: {communication.sender}</p>
                      <p className="text-sm text-gray-600">To: {communication.recipient}</p>
                      <p className="text-xs text-gray-400 mt-1">Date: {communication.date} • Read by: {communication.readCount} people</p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{communication.content}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedCommunication(communication)}>
                      View
                    </Button>
                    {communication.status === 'Scheduled' && (
                      <Button variant="outline" size="sm" onClick={() => handleSend(communication.id)}>
                        Send Now
                      </Button>
                    )}
                    {communication.status === 'Active' && (
                      <Button variant="outline" size="sm" onClick={() => handleArchive(communication.id)}>
                        Archive
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleDelete(communication.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredCommunications.length === 0 && (
              <div className="text-center py-8 text-gray-500">No communications found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Add Communication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardBody>
              <CardTitle>New Communication</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Announcement</option>
                    <option>Message</option>
                    <option>Class Announcement</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., School Closure Due to Weather"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={4}
                    placeholder="Enter your message content..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>All Students & Staff</option>
                    <option>All Students</option>
                    <option>All Staff</option>
                    <option>All Parents</option>
                    <option>Specific Class</option>
                    <option>Specific Users</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input type="radio" name="schedule" className="mr-2" defaultChecked />
                      <span>Send Now</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="schedule" className="mr-2" />
                      <span>Schedule for Later</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                  <input
                    type="file"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    multiple
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { 
                  setShowAddModal(false);
                  alert('Communication created successfully!');
                }}>
                  Create Communication
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* View Communication Modal */}
      {selectedCommunication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardBody>
              <CardTitle>{selectedCommunication.title}</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold">Details</h4>
                  <p className="text-sm text-gray-600">Type: {selectedCommunication.type}</p>
                  <p className="text-sm text-gray-600">From: {selectedCommunication.sender}</p>
                  <p className="text-sm text-gray-600">To: {selectedCommunication.recipient}</p>
                  <p className="text-sm text-gray-600">Date: {selectedCommunication.date}</p>
                  <p className="text-sm text-gray-600">Priority: {selectedCommunication.priority}</p>
                  <p className="text-sm text-gray-600">Read by: {selectedCommunication.readCount} people</p>
                </div>
                <div>
                  <h4 className="font-semibold">Content</h4>
                  <p className="text-sm text-gray-600 mt-2">{selectedCommunication.content}</p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setSelectedCommunication(null)}>Close</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}