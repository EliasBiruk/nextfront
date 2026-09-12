'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { mockUsers } from '@/data/mockData';

export default function AdminUsers() {
  const [users, setUsers] = useState(mockUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.roles.includes(filterRole);
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && user.status === 'Active') ||
                         (filterStatus === 'inactive' && user.status === 'Inactive');
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, status: newStatus } : u
    ));
  };

  const handleRoleChange = (userId: string, role: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const hasRole = u.roles.includes(role);
        return { 
          ...u, 
          roles: hasRole ? u.roles.filter(r => r !== role) : [...u.roles, role] 
        };
      }
      return u;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="admin" userName="Administrator" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2 text-[var(--joyedu-text-primary)]">User Management</h1>
              <p className="text-[var(--joyedu-text-secondary)]">Manage all platform users</p>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4">
                <Button onClick={() => setShowAddModal(true)}>+ Add User</Button>
                <Button variant="outline">Export Users</Button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 border border-[var(--joyedu-border-300)] rounded-lg text-sm bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)]"
                />
                <select 
                  className="px-3 py-2 border border-[var(--joyedu-border-300)] rounded-lg text-sm bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)]"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="school">School</option>
                  <option value="admin">Admin</option>
                </select>
                <select 
                  className="px-3 py-2 border border-[var(--joyedu-border-300)] rounded-lg text-sm bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)]"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{users.length}</div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {users.filter(u => u.roles.includes('student')).length}
                  </div>
                  <p className="text-gray-600 text-sm">Students</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {users.filter(u => u.roles.includes('instructor')).length}
                  </div>
                  <p className="text-gray-600 text-sm">Instructors</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {users.filter(u => u.roles.includes('school')).length}
                  </div>
                  <p className="text-gray-600 text-sm">School Users</p>
                </CardBody>
              </Card>
            </div>

            {/* User List */}
            <Card>
              <CardBody>
                <CardTitle>Users ({filteredUsers.length} users)</CardTitle>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                            {user.firstName[0]}{user.lastName[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                              <Badge variant={user.status === 'Active' ? 'success' : 'warning'}>
                                {user.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className="flex gap-2 mt-2">
                              {user.roles.map(role => (
                                <Badge key={role} variant="default" size="sm">
                                  {role}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="default" size="sm" onClick={() => handleStatusChange(user.id, user.status === 'Active' ? 'Inactive' : 'Active')}>
                            {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button variant="default" size="sm" onClick={() => handleDelete(user.id)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No users found matching your filters</div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Add User Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <CardBody>
                    <CardTitle>Add New User</CardTitle>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-600">Add user form would go here with fields for:</p>
                      <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
                        <li>First Name, Last Name</li>
                        <li>Email</li>
                        <li>Roles (Student, Instructor, School, Admin)</li>
                        <li>School (if applicable)</li>
                        <li>Password</li>
                      </ul>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
                      <Button variant="outline">Add User</Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}