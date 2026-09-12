'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolAlumni() {
  const [alumni, setAlumni] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      graduationYear: '2024',
      degree: 'Bachelor of Science',
      currentOccupation: 'Software Engineer at Tech Corp',
      location: 'San Francisco, CA',
      status: 'Active',
      lastContact: '2024-08-25',
      engagement: 'High'
    },
    {
      id: '2',
      name: 'Michael Chen',
      graduationYear: '2023',
      degree: 'Bachelor of Arts',
      currentOccupation: 'Marketing Manager at Global Inc',
      location: 'New York, NY',
      status: 'Active',
      lastContact: '2024-08-24',
      engagement: 'Medium'
    },
    {
      id: '3',
      name: 'Emily Williams',
      graduationYear: '2022',
      degree: 'Bachelor of Business',
      currentOccupation: 'Financial Analyst at Investment Bank',
      location: 'Chicago, IL',
      status: 'Active',
      lastContact: '2024-08-23',
      engagement: 'High'
    },
    {
      id: '4',
      name: 'David Brown',
      graduationYear: '2021',
      degree: 'Bachelor of Engineering',
      currentOccupation: 'Project Manager at Construction Co',
      location: 'Austin, TX',
      status: 'Inactive',
      lastContact: '2024-07-15',
      engagement: 'Low'
    },
    {
      id: '5',
      name: 'Jennifer Davis',
      graduationYear: '2020',
      degree: 'Bachelor of Education',
      currentOccupation: 'Teacher at Local School',
      location: 'Boston, MA',
      status: 'Active',
      lastContact: '2024-08-22',
      engagement: 'Medium'
    },
  ]);

  const [filterYear, setFilterYear] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<any>(null);

  const filteredAlumni = alumni.filter(a => {
    const matchesYear = filterYear === 'all' || a.graduationYear === filterYear;
    return matchesYear;
  });

  const handleDelete = (alumniId: string) => {
    if (confirm('Are you sure you want to delete this alumni record?')) {
      setAlumni(prev => prev.filter(a => a.id !== alumniId));
    }
  };

  const handleContact = (alumniId: string) => {
    const alumnus = alumni.find(a => a.id === alumniId);
    alert(`Opening contact form for ${alumnus?.name}`);
  };

  const handleUpdateStatus = (alumniId: string) => {
    setAlumni(prev => prev.map(a => 
      a.id === alumniId ? { ...a, status: a.status === 'Active' ? 'Inactive' : 'Active' } : a
    ));
  };

  const handleSendNewsletter = () => {
    alert('Sending newsletter to all alumni...');
  };

  const activeCount = alumni.filter(a => a.status === 'Active').length;
  const thisYearGrads = alumni.filter(a => a.graduationYear === '2024').length;
  const highEngagement = alumni.filter(a => a.engagement === 'High').length;
  const engagementRate = (activeCount / alumni.length * 100).toFixed(0);

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Alumni</h1>
        <p className="text-gray-600">Manage alumni directory, profiles, events, and alumni communication</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowAddModal(true)}>+ Add Alumni</Button>
          <Button variant="outline" onClick={() => setShowEventModal(true)}>Create Event</Button>
          <Button variant="outline" onClick={handleSendNewsletter}>Send Newsletter</Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="all">All Years</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
            <option>Earlier</option>
          </select>
        </div>
      </div>

      {/* Alumni Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{alumni.length}</div>
            <p className="text-gray-600 text-sm">Total Alumni</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{activeCount}</div>
            <p className="text-gray-600 text-sm">Active Profiles</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{thisYearGrads}</div>
            <p className="text-gray-600 text-sm">This Year Grads</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">18</div>
            <p className="text-gray-600 text-sm">Upcoming Events</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{engagementRate}%</div>
            <p className="text-gray-600 text-sm">Engagement Rate</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold">Directory</div>
            <div className="text-sm text-gray-600">Alumni database</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">👤</div>
            <div className="font-semibold">Profiles</div>
            <div className="text-sm text-gray-600">Alumni profiles</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🎉</div>
            <div className="font-semibold">Events</div>
            <div className="text-sm text-gray-600">Alumni events</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📧</div>
            <div className="font-semibold">Communication</div>
            <div className="text-sm text-gray-600">Messaging system</div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Alumni Activity */}
      <Card>
        <CardBody>
          <CardTitle>Recent Alumni Activity ({filteredAlumni.length} alumni)</CardTitle>
          <div className="space-y-4">
            {filteredAlumni.map((alumni) => (
              <div key={alumni.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      🎓
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{alumni.name}</h3>
                        <Badge variant={
                          alumni.status === 'Active' ? 'success' : 'warning'
                        }>
                          {alumni.status}
                        </Badge>
                        <Badge variant={
                          alumni.engagement === 'High' ? 'success' : 
                          alumni.engagement === 'Medium' ? 'warning' : 'info'
                        }>
                          {alumni.engagement} Engagement
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{alumni.degree} • Class of {alumni.graduationYear}</p>
                      <p className="text-xs text-gray-400 mt-1">{alumni.currentOccupation} • {alumni.location}</p>
                      <p className="text-xs text-gray-400">Last Contact: {alumni.lastContact}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedAlumni(alumni)}>View Profile</Button>
                    <Button variant="outline" size="sm" onClick={() => handleContact(alumni.id)}>Contact</Button>
                    <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(alumni.id)}>
                      {alumni.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(alumni.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredAlumni.length === 0 && (
              <div className="text-center py-8 text-gray-500">No alumni found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Add Alumni Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Add New Alumni</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Sarah Johnson"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>Earlier</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Bachelor of Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Occupation</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Software Engineer at Tech Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., sarah.johnson@email.com"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { setShowAddModal(false); alert('Alumni added successfully!'); }}>Add Alumni</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Create Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Create Alumni Event</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Name *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Annual Alumni Reunion"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Reunion</option>
                    <option>Networking Event</option>
                    <option>Charity Event</option>
                    <option>Professional Development</option>
                    <option>Social Gathering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., School Campus or Venue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Event description..."
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowEventModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { setShowEventModal(false); alert('Event created successfully!'); }}>Create Event</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* View Profile Modal */}
      {selectedAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Alumni Profile - {selectedAlumni.name}</CardTitle>
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Graduation Year:</span>
                    <span className="font-medium">{selectedAlumni.graduationYear}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Degree:</span>
                    <span className="font-medium">{selectedAlumni.degree}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Current Occupation:</span>
                    <span className="font-medium">{selectedAlumni.currentOccupation}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{selectedAlumni.location}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium">{selectedAlumni.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Contact:</span>
                    <span className="font-medium">{selectedAlumni.lastContact}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setSelectedAlumni(null)}>Close</Button>
                <Button variant="outline" onClick={() => handleContact(selectedAlumni.id)}>Contact</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}