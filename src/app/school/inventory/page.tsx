'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function SchoolInventory() {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'A4 Paper Reams',
      category: 'Office Supplies',
      sku: 'OFF-001',
      location: 'Main Building - Storage Room',
      quantity: 500,
      minStock: 100,
      unit: 'Reams',
      status: 'In Stock',
      value: 2500
    },
    {
      id: '2',
      name: 'Science Lab Equipment',
      category: 'Equipment',
      sku: 'EQP-045',
      location: 'Science Lab',
      quantity: 45,
      minStock: 20,
      unit: 'Pieces',
      status: 'In Stock',
      value: 45000
    },
    {
      id: '3',
      name: 'Student Desks',
      category: 'Furniture',
      sku: 'FUR-012',
      location: 'Classroom 10-A',
      quantity: 30,
      minStock: 35,
      unit: 'Desks',
      status: 'Low Stock',
      value: 3000
    },
    {
      id: '4',
      name: 'Textbooks - Mathematics',
      category: 'Books',
      sku: 'BK-078',
      location: 'Library',
      quantity: 0,
      minStock: 50,
      unit: 'Copies',
      status: 'Out of Stock',
      value: 0
    },
    {
      id: '5',
      name: 'Whiteboard Markers',
      category: 'Classroom Materials',
      sku: 'CLS-023',
      location: 'Staff Room',
      quantity: 120,
      minStock: 50,
      unit: 'Boxes',
      status: 'In Stock',
      value: 600
    },
  ]);

  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [stockAction, setStockAction] = useState<'in' | 'out'>('in');
  const [stockQuantity, setStockQuantity] = useState('');

  const categories = ['Office Supplies', 'Classroom Materials', 'Equipment', 'Furniture', 'Books'];
  const locations = ['Main Building', 'Science Lab', 'Library', 'Staff Room', 'Classroom'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesLocation = filterLocation === 'all' || item.location.includes(filterLocation);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleAddItem = (newItem: any) => {
    const item = {
      ...newItem,
      id: Date.now().toString(),
      status: newItem.quantity > newItem.minStock ? 'In Stock' : 
              newItem.quantity === 0 ? 'Out of Stock' : 'Low Stock',
      value: newItem.quantity * newItem.unitPrice
    };
    setItems([...items, item]);
    setShowAddModal(false);
  };

  const handleStockAdjustment = () => {
    if (!selectedItem || !stockQuantity) return;
    
    const quantity = parseInt(stockQuantity);
    const newQuantity = stockAction === 'in' 
      ? selectedItem.quantity + quantity 
      : Math.max(0, selectedItem.quantity - quantity);
    
    const updatedItems = items.map(item => {
      if (item.id === selectedItem.id) {
        const newValue = newQuantity * (item.value / item.quantity);
        return {
          ...item,
          quantity: newQuantity,
          status: newQuantity > item.minStock ? 'In Stock' : 
                  newQuantity === 0 ? 'Out of Stock' : 'Low Stock',
          value: newValue
        };
      }
      return item;
    });
    
    setItems(updatedItems);
    setShowStockModal(false);
    setSelectedItem(null);
    setStockQuantity('');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const inStock = items.filter(item => item.status === 'In Stock').length;
  const lowStock = items.filter(item => item.status === 'Low Stock').length;
  const outOfStock = items.filter(item => item.status === 'Out of Stock').length;
  const totalValue = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <DashboardLayout actor="school" userName="Springfield Academy">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Inventory</h1>
        <p className="text-gray-600">Manage school inventory, stock, assets, and supplies</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={() => setShowAddModal(true)}>+ Add Item</Button>
          <Button variant="outline" onClick={() => { setStockAction('in'); setShowStockModal(true); }}>Stock In</Button>
          <Button variant="outline" onClick={() => { setStockAction('out'); setShowStockModal(true); }}>Stock Out</Button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
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
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value="all">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{totalItems.toLocaleString()}</div>
            <p className="text-gray-600 text-sm">Total Items</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{inStock}</div>
            <p className="text-gray-600 text-sm">In Stock</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{lowStock}</div>
            <p className="text-gray-600 text-sm">Low Stock</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{outOfStock}</div>
            <p className="text-gray-600 text-sm">Out of Stock</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">${(totalValue / 1000).toFixed(0)}K</div>
            <p className="text-gray-600 text-sm">Total Value</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📦</div>
            <div className="font-semibold">Items</div>
            <div className="text-sm text-gray-600">Item management</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">Stock</div>
            <div className="text-sm text-gray-600">Stock levels</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">🔄</div>
            <div className="font-semibold">Transfers</div>
            <div className="text-sm text-gray-600">Stock transfers</div>
          </CardBody>
        </Card>

        <Card className="hover:border-blue-500 transition cursor-pointer">
          <CardBody className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold">Reports</div>
            <div className="text-sm text-gray-600">Inventory reports</div>
          </CardBody>
        </Card>
      </div>

      {/* Inventory Items */}
      <Card>
        <CardBody>
          <CardTitle>Inventory Items ({filteredItems.length} items)</CardTitle>
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      📦
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge variant={
                          item.status === 'In Stock' ? 'success' : 
                          item.status === 'Low Stock' ? 'warning' : 'danger'
                        }>
                          {item.status}
                        </Badge>
                        <Badge variant="default" size="sm">{item.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">SKU: {item.sku} • {item.location}</p>
                      <p className="text-xs text-gray-400 mt-1">Unit: {item.unit} • Min Stock: {item.minStock}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Quantity: <span className="font-semibold">{item.quantity}</span></span>
                        <span className="text-gray-600">Value: <span className="font-semibold">${item.value.toLocaleString()}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>View</Button>
                    <Button variant="outline" size="sm" onClick={() => { setSelectedItem(item); setStockAction('in'); setShowStockModal(true); }}>Stock In</Button>
                    <Button variant="outline" size="sm" onClick={() => { setSelectedItem(item); setStockAction('out'); setShowStockModal(true); }}>Stock Out</Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">No items found matching your filters</div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>Add Inventory Item</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., A4 Paper Reams"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., OFF-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Reams"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Stock Level</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price ($)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 5.00"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="outline" onClick={() => handleAddItem({})}>Add Item</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {showStockModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <CardTitle>{stockAction === 'in' ? 'Stock In' : 'Stock Out'} - {selectedItem.name}</CardTitle>
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-4">
                  Current quantity: <span className="font-semibold">{selectedItem.quantity} {selectedItem.unit}</span>
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {stockAction === 'in' ? 'Quantity to Add' : 'Quantity to Remove'}
                  </label>
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 10"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => { setShowStockModal(false); setSelectedItem(null); setStockQuantity(''); }}>Cancel</Button>
                <Button variant="outline" onClick={handleStockAdjustment}>Confirm</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}