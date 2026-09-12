'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      type: 'alert',
      title: 'System Maintenance Scheduled',
      message: 'The JoyEdu platform will undergo maintenance on Sunday from 2 AM to 4 AM UTC.',
      priority: 'high',
      status: 'unread',
      createdAt: '2024-08-25T10:30:00Z',
      category: 'System'
    },
    {
      id: 'notif-2',
      type: 'info',
      title: 'New Feature Available',
      message: 'The gradebook module has been updated with new analytics features.',
      priority: 'medium',
      status: 'unread',
      createdAt: '2024-08-24T14:15:00Z',
      category: 'Feature'
    },
    {
      id: 'notif-3',
      type: 'success',
      title: 'Monthly Report Ready',
      message: 'Your school\'s monthly performance report for August is now available.',
      priority: 'low',
      status: 'read',
      createdAt: '2024-08-23T09:00:00Z',
      category: 'Report'
    },
    {
      id: 'notif-4',
      type: 'warning',
      title: 'License Expiring Soon',
      message: 'Your school license will expire in 30 days. Please renew to avoid service interruption.',
      priority: 'high',
      status: 'unread',
      createdAt: '2024-08-22T16:45:00Z',
      category: 'Billing'
    },
    {
      id: 'notif-5',
      type: 'info',
      title: 'Teacher Attendance Updated',
      message: 'Teacher attendance records for the week have been processed.',
      priority: 'low',
      status: 'read',
      createdAt: '2024-08-21T11:20:00Z',
      category: 'Attendance'
    }
  ]);

  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const categories = ['System', 'Feature', 'Report', 'Billing', 'Attendance', 'Student', 'Staff'];
  const priorities = ['high', 'medium', 'low'];

  const filteredNotifications = notifications.filter(notif => {
    const matchesCategory = filterCategory === 'all' || notif.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || notif.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, status: 'read' } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, status: 'read' })));
  };

  const deleteNotification = (id: string) => {
    if (confirm('Delete this notification?')) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return '⚠️';
      case 'success': return '✅';
      case 'warning': return '🔔';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">Manage school notifications and alerts</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All as Read
          </Button>
          <Button variant="outline" onClick={() => setShowSettingsModal(true)}>
            Notification Settings
          </Button>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* Notification Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{notifications.length}</div>
            <p className="text-gray-600 text-sm">Total Notifications</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{unreadCount}</div>
            <p className="text-gray-600 text-sm">Unread</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {notifications.filter(n => n.priority === 'high').length}
            </div>
            <p className="text-gray-600 text-sm">High Priority</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{categories.length}</div>
            <p className="text-gray-600 text-sm">Categories</p>
          </CardBody>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardBody>
          <CardTitle>Notifications ({filteredNotifications.length})</CardTitle>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border rounded-lg transition ${
                  notification.status === 'unread' 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        <Badge variant="default">{notification.category}</Badge>
                        {notification.status === 'unread' && (
                          <Badge variant="info">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {notification.status === 'unread' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark Read
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteNotification(notification.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredNotifications.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No notifications found matching your filters.
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Notification Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Notification Settings</CardTitle>
              <div className="mt-4 space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Push Notifications</h4>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quiet Hours
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      defaultValue="22:00"
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <span className="self-center">to</span>
                    <input
                      type="time"
                      defaultValue="08:00"
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowSettingsModal(false)}>Save Settings</Button>
                <Button variant="outline" onClick={() => setShowSettingsModal(false)}>Cancel</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
