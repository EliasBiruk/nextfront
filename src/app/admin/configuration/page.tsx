'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function AdminConfiguration() {
  const [configs, setConfigs] = useState([
    {
      id: 'config-1',
      key: 'MAX_COURSE_SIZE',
      value: '500',
      description: 'Maximum file size for course uploads in MB',
      category: 'Storage',
      status: 'active',
      updatedAt: '2024-08-20'
    },
    {
      id: 'config-2',
      key: 'SESSION_TIMEOUT',
      value: '1800',
      description: 'User session timeout in seconds',
      category: 'Security',
      status: 'active',
      updatedAt: '2024-08-18'
    },
    {
      id: 'config-3',
      key: 'API_RATE_LIMIT',
      value: '1000',
      description: 'API rate limit per hour',
      category: 'API',
      status: 'active',
      updatedAt: '2024-08-15'
    },
    {
      id: 'config-4',
      key: 'EMAIL_BOUNCE_THRESHOLD',
      value: '5',
      description: 'Number of bounces before marking email as invalid',
      category: 'Email',
      status: 'active',
      updatedAt: '2024-08-10'
    },
    {
      id: 'config-5',
      key: 'VIDEO_MAX_DURATION',
      value: '3600',
      description: 'Maximum video duration in seconds',
      category: 'Media',
      status: 'active',
      updatedAt: '2024-08-05'
    }
  ]);

  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<any>(null);

  const categories = ['Storage', 'Security', 'API', 'Email', 'Media', 'Payment', 'Notification'];

  const filteredConfigs = configs.filter(config => 
    filterCategory === 'all' || config.category === filterCategory
  );

  const handleEdit = (config: any) => {
    setSelectedConfig(config);
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this configuration?')) {
      setConfigs(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setConfigs(prev => prev.map(c => 
      c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
    ));
  };

  return (
    <DashboardLayout actor="admin" userName="Admin">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuration</h1>
        <p className="text-gray-600">Manage platform configuration settings</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => {
            setSelectedConfig(null);
            setShowAddModal(true);
          }}>
            + Add Configuration
          </Button>
          <Button variant="outline">Export Config</Button>
          <Button variant="outline">Import Config</Button>
        </div>
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
      </div>

      {/* Configuration Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{configs.length}</div>
            <p className="text-gray-600 text-sm">Total Configs</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {configs.filter(c => c.status === 'active').length}
            </div>
            <p className="text-gray-600 text-sm">Active</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {configs.filter(c => c.status === 'inactive').length}
            </div>
            <p className="text-gray-600 text-sm">Inactive</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{categories.length}</div>
            <p className="text-gray-600 text-sm">Categories</p>
          </CardBody>
        </Card>
      </div>

      {/* Configurations List */}
      <Card>
        <CardBody>
          <CardTitle>Configurations ({filteredConfigs.length})</CardTitle>
          <div className="mt-4 space-y-4">
            {filteredConfigs.map((config) => (
              <div key={config.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      ⚙️
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold font-mono">{config.key}</h3>
                        <Badge variant={config.status === 'active' ? 'success' : 'default'}>
                          {config.status}
                        </Badge>
                        <Badge variant="default">{config.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Value: <span className="font-semibold font-mono">{config.value}</span></span>
                        <span className="text-gray-600">Updated: {config.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleToggleStatus(config.id)}
                    >
                      {config.status === 'active' ? 'Disable' : 'Enable'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(config)}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(config.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredConfigs.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No configurations found matching your filters.
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Add/Edit Configuration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardBody>
              <CardTitle>{selectedConfig ? 'Edit Configuration' : 'Add Configuration'}</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Configuration Key *</label>
                  <input
                    type="text"
                    defaultValue={selectedConfig?.key || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono"
                    placeholder="e.g., MAX_UPLOAD_SIZE"
                    disabled={!!selectedConfig}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value *</label>
                  <input
                    type="text"
                    defaultValue={selectedConfig?.value || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono"
                    placeholder="e.g., 500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                    defaultValue={selectedConfig?.description || ''}
                    placeholder="Describe this configuration..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    {categories.map(cat => (
                      <option key={cat} value={cat} selected={selectedConfig?.category === cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => {
                  setShowAddModal(false);
                  setSelectedConfig(null);
                  alert(selectedConfig ? 'Configuration updated successfully!' : 'Configuration added successfully!');
                }}>
                  {selectedConfig ? 'Update' : 'Add'}
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowAddModal(false);
                  setSelectedConfig(null);
                }}>
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
