'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

interface StaffMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  avatar: string;
}

export default function SchoolStaff() {
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      phone: '+1 (555) 123-4567',
      department: 'Science',
      position: 'Head of Science Department',
      status: 'active',
      joinDate: '2018-09-01',
      avatar: '👩‍🏫'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@school.edu',
      phone: '+1 (555) 234-5678',
      department: 'Mathematics',
      position: 'Mathematics Teacher',
      status: 'active',
      joinDate: '2019-08-15',
      avatar: '👨‍🏫'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@school.edu',
      phone: '+1 (555) 345-6789',
      department: 'English',
      position: 'English Teacher',
      status: 'active',
      joinDate: '2020-01-10',
      avatar: '👩‍🏫'
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.wilson@school.edu',
      phone: '+1 (555) 456-7890',
      department: 'Administration',
      position: 'Administrative Assistant',
      status: 'active',
      joinDate: '2021-03-20',
      avatar: '👨‍💼'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@school.edu',
      phone: '+1 (555) 567-8901',
      department: 'Science',
      position: 'Biology Teacher',
      status: 'on-leave',
      joinDate: '2019-08-15',
      avatar: '👩‍🏫'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const departments = ['Science', 'Mathematics', 'English', 'History', 'Arts', 'Administration', 'Physical Education'];

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'on-leave': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddStaff = () => {
    setEditingStaff({
      id: Date.now(),
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      avatar: '👤'
    });
    setShowAddModal(true);
  };

  const handleEditStaff = (member: StaffMember) => {
    setEditingStaff(member);
    setShowAddModal(true);
  };

  const handleDeleteStaff = (id: number) => {
    if (confirm('Are you sure you want to remove this staff member?')) {
      setStaff(staff.filter(m => m.id !== id));
    }
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;

    if (staff.find(m => m.id === editingStaff.id)) {
      setStaff(staff.map(m => m.id === editingStaff.id ? editingStaff : m));
    } else {
      setStaff([...staff, editingStaff]);
    }

    setShowAddModal(false);
    setEditingStaff(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="school" userName="Springfield Academy" />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Staff Management</h1>
                <p className="text-gray-600">Manage teachers and administrative staff</p>
              </div>
              <Button onClick={handleAddStaff}>+ Add Staff Member</Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardBody>
                  <div className="text-2xl font-bold text-gray-900">{staff.length}</div>
                  <div className="text-sm text-gray-600">Total Staff</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="text-2xl font-bold text-green-600">{staff.filter(s => s.status === 'active').length}</div>
                  <div className="text-sm text-gray-600">Active</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="text-2xl font-bold text-yellow-600">{staff.filter(s => s.status === 'on-leave').length}</div>
                  <div className="text-sm text-gray-600">On Leave</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="text-2xl font-bold text-gray-600">{departments.length}</div>
                  <div className="text-sm text-gray-600">Departments</div>
                </CardBody>
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardBody>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <input
                      type="text"
                      placeholder="Search staff..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on-leave">On Leave</option>
                  </select>
                </div>
              </CardBody>
            </Card>

            {/* Staff List */}
            <Card>
              <CardBody>
                <CardTitle>Staff Directory ({filteredStaff.length})</CardTitle>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStaff.map((member) => (
                        <tr key={member.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{member.avatar}</div>
                              <div>
                                <div className="font-medium text-gray-900">{member.name}</div>
                                <div className="text-sm text-gray-600">{member.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-700">{member.department}</td>
                          <td className="py-3 px-4 text-gray-700">{member.position}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(member.status)}>{member.status.replace('-', ' ')}</Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{new Date(member.joinDate).toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditStaff(member)}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteStaff(member.id)}
                                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredStaff.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No staff members found matching your filters.
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showAddModal && editingStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <CardBody>
              <CardTitle>{staff.find(s => s.id === editingStaff.id) ? 'Edit Staff Member' : 'Add Staff Member'}</CardTitle>
              <form onSubmit={handleSaveStaff} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={editingStaff.name}
                      onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={editingStaff.email}
                      onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editingStaff.phone}
                      onChange={(e) => setEditingStaff({ ...editingStaff, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                    <select
                      required
                      value={editingStaff.department}
                      onChange={(e) => setEditingStaff({ ...editingStaff, department: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                    <input
                      type="text"
                      required
                      value={editingStaff.position}
                      onChange={(e) => setEditingStaff({ ...editingStaff, position: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                    <select
                      required
                      value={editingStaff.status}
                      onChange={(e) => setEditingStaff({ ...editingStaff, status: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="on-leave">On Leave</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Join Date *</label>
                    <input
                      type="date"
                      required
                      value={editingStaff.joinDate}
                      onChange={(e) => setEditingStaff({ ...editingStaff, joinDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button type="submit">Save</Button>
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}