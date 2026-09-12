'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolExtracurricular() {
  const [activities, setActivities] = useState([
    {
      id: '1',
      name: 'Debate Club',
      type: 'Club',
      category: 'Academic',
      advisor: 'Ms. Brown',
      members: 45,
      meetingDay: 'Tuesdays',
      meetingTime: '3:30 PM',
      status: 'Active',
      achievements: 8
    },
    {
      id: '2',
      name: 'Basketball Team',
      type: 'Sports',
      category: 'Athletics',
      advisor: 'Coach Johnson',
      members: 12,
      meetingDay: 'Mon/Wed/Fri',
      meetingTime: '4:00 PM',
      status: 'Active',
      achievements: 15
    },
    {
      id: '3',
      name: 'Robotics Club',
      type: 'Club',
      category: 'STEM',
      advisor: 'Dr. Chen',
      members: 32,
      meetingDay: 'Thursdays',
      meetingTime: '3:30 PM',
      status: 'Active',
      achievements: 12
    },
    {
      id: '4',
      name: 'Drama Society',
      type: 'Activity',
      category: 'Arts',
      advisor: 'Mr. Davis',
      members: 28,
      meetingDay: 'Wednesdays',
      meetingTime: '3:30 PM',
      status: 'Active',
      achievements: 6
    },
    {
      id: '5',
      name: 'Chess Club',
      type: 'Club',
      category: 'Academic',
      advisor: 'Prof. Williams',
      members: 35,
      meetingDay: 'Fridays',
      meetingTime: '3:30 PM',
      status: 'Active',
      achievements: 10
    },
  ]);

  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const filteredActivities = activities.filter(activity => {
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const handleDelete = (activityId: string) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      setActivities(prev => prev.filter(a => a.id !== activityId));
    }
  };

  const handleToggleStatus = (activityId: string) => {
    setActivities(prev => prev.map(a => 
      a.id === activityId ? { ...a, status: a.status === 'Active' ? 'Inactive' : 'Active' } : a
    ));
  };

  const handleViewMembers = (activityId: string) => {
    setSelectedActivity(activities.find(a => a.id === activityId));
    setShowMembersModal(true);
  };

  const clubCount = activities.filter(a => a.type === 'Club').length;
  const sportsCount = activities.filter(a => a.type === 'Sports').length;
  const totalMembers = activities.reduce((sum, a) => sum + a.members, 0);
  const totalAchievements = activities.reduce((sum, a) => sum + a.achievements, 0);

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Extracurricular</h1>
        <p className="text-gray-600">Manage clubs, activities, sports, teams, competitions, and student achievements</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowCreateModal(true)}>+ Create Club</Button>
          <Button variant="outline" onClick={() => setShowCreateModal(true)}>Register Team</Button>
          <Button variant="outline" onClick={() => setShowCreateModal(true)}>Add Activity</Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option>Clubs</option>
            <option>Sports</option>
            <option>Activities</option>
            <option>Competitions</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Seasonal</option>
          </select>
        </div>
      </div>

      {/* Extracurricular Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{clubCount}</div>
            <p className="text-gray-600 text-sm">Clubs</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{sportsCount}</div>
            <p className="text-gray-600 text-sm">Sports Teams</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{totalMembers}</div>
            <p className="text-gray-600 text-sm">Memberships</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">45</div>
            <p className="text-gray-600 text-sm">Competitions</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{totalAchievements}</div>
            <p className="text-gray-600 text-sm">Achievements</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-semibold">Clubs</div>
            <div className="text-sm text-gray-600">Club management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">⚽</div>
            <div className="font-semibold">Sports</div>
            <div className="text-sm text-gray-600">Sports programs</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="font-semibold">Competitions</div>
            <div className="text-sm text-gray-600">Competition tracking</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🎖️</div>
            <div className="font-semibold">Achievements</div>
            <div className="text-sm text-gray-600">Student awards</div>
          </CardBody>
        </Card>
      </div>

      {/* Clubs and Activities */}
      <Card>
        <CardBody>
          <CardTitle>Clubs and Activities ({filteredActivities.length} activities)</CardTitle>
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {activity.type === 'Club' ? '🎯' : 
                       activity.type === 'Sports' ? '⚽' : 
                       activity.type === 'Activity' ? '🎭' : '🏆'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{activity.name}</h3>
                        <Badge variant="default" size="sm">{activity.type}</Badge>
                        <Badge variant="default" size="sm">{activity.category}</Badge>
                        <Badge variant={activity.status === 'Active' ? 'success' : 'danger'}>{activity.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Advisor: {activity.advisor}</p>
                      <p className="text-xs text-gray-400 mt-1">Meeting: {activity.meetingDay} at {activity.meetingTime}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Members: <span className="font-semibold">{activity.members}</span></span>
                        <span className="text-gray-600">Achievements: <span className="font-semibold">{activity.achievements}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedActivity(activity)}>View</Button>
                    <Button variant="outline" size="sm" onClick={() => handleToggleStatus(activity.id)}>
                      {activity.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleViewMembers(activity.id)}>Members</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(activity.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredActivities.length === 0 && (
              <div className="text-center py-8 text-gray-500">No activities found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Create Activity Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Create New Activity</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Name *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Debate Club"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Club</option>
                    <option>Sports</option>
                    <option>Activity</option>
                    <option>Competition</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Academic</option>
                    <option>Athletics</option>
                    <option>STEM</option>
                    <option>Arts</option>
                    <option>Community Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Advisor *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Ms. Brown"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Day</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Mon/Wed/Fri</option>
                      <option>Tue/Thu</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowCreateModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => { setShowCreateModal(false); alert('Activity created successfully!'); }}>Create Activity</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Members Modal */}
      {showMembersModal && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Members - {selectedActivity.name}</CardTitle>
              <div className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Total Members:</span>
                    <span className="font-medium">{selectedActivity.members}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Advisor:</span>
                    <span className="font-medium">{selectedActivity.advisor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium">{selectedActivity.status}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Sample members:</p>
                  <div className="space-y-2">
                    <div className="p-2 border border-gray-200 rounded">John Smith (President)</div>
                    <div className="p-2 border border-gray-200 rounded">Emma Johnson (Vice President)</div>
                    <div className="p-2 border border-gray-200 rounded">Michael Chen (Member)</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowMembersModal(false)}>Close</Button>
                <Button variant="outline">Add Member</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}