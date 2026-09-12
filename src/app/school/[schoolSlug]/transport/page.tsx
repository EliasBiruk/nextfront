'use client';

import { use, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SchoolShell from '@/components/school/SchoolShell';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { mockSchools, mockStudents } from '@/data/mockData';

interface Vehicle {
  id: string;
  plateNumber: string;
  type: 'Bus' | 'Van' | 'Mini Bus';
  capacity: number;
  driverId?: string;
  driverName?: string;
  status: 'Available' | 'In Use' | 'Maintenance' | 'Out of Service';
  fuelLevel: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  phone: string;
  status: 'Available' | 'On Route' | 'On Leave' | 'Inactive';
  assignedVehicleId?: string;
  experience: number;
}

interface Route {
  id: string;
  name: string;
  description: string;
  stops: string[];
  estimatedTime: string;
  distance: string;
  status: 'Active' | 'Inactive';
  assignedVehicleId?: string;
  assignedDriverId?: string;
}

interface Trip {
  id: string;
  routeId: string;
  routeName: string;
  vehicleId: string;
  vehiclePlate: string;
  driverId: string;
  driverName: string;
  date: string;
  startTime: string;
  endTime?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  studentsAssigned: number;
  studentsPickedUp: number;
}

export default function TransportDashboard({ params }: { params: Promise<{ schoolSlug: string }> }) {
  const { schoolSlug } = use(params);
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const currentPersona = searchParams.get('persona') || 'persona-school-owner';
  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];

  // Mock transport data
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 'veh-1',
      plateNumber: 'SCH-1234',
      type: 'Bus',
      capacity: 45,
      driverId: 'driver-1',
      driverName: 'John Smith',
      status: 'In Use',
      fuelLevel: 75,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-07-15',
    },
    {
      id: 'veh-2',
      plateNumber: 'SCH-5678',
      type: 'Bus',
      capacity: 40,
      driverId: 'driver-2',
      driverName: 'Mary Johnson',
      status: 'Available',
      fuelLevel: 90,
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-08-01',
    },
    {
      id: 'veh-3',
      plateNumber: 'SCH-9012',
      type: 'Van',
      capacity: 15,
      status: 'Available',
      fuelLevel: 60,
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-07-20',
    },
    {
      id: 'veh-4',
      plateNumber: 'SCH-3456',
      type: 'Mini Bus',
      capacity: 25,
      status: 'Maintenance',
      fuelLevel: 40,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-07-10',
    },
  ]);

  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: 'driver-1',
      firstName: 'John',
      lastName: 'Smith',
      licenseNumber: 'DL-12345678',
      phone: '+1 (555) 111-2222',
      status: 'On Route',
      assignedVehicleId: 'veh-1',
      experience: 8,
    },
    {
      id: 'driver-2',
      firstName: 'Mary',
      lastName: 'Johnson',
      licenseNumber: 'DL-87654321',
      phone: '+1 (555) 333-4444',
      status: 'Available',
      assignedVehicleId: 'veh-2',
      experience: 5,
    },
    {
      id: 'driver-3',
      firstName: 'Robert',
      lastName: 'Williams',
      licenseNumber: 'DL-11223344',
      phone: '+1 (555) 555-6666',
      status: 'Available',
      experience: 3,
    },
  ]);

  const [routes, setRoutes] = useState<Route[]>([
    {
      id: 'route-1',
      name: 'Route A - North Side',
      description: 'Pickup from northern residential areas',
      stops: ['Stop 1: Main St & 1st Ave', 'Stop 2: Oak Street', 'Stop 3: Pine Avenue', 'School'],
      estimatedTime: '45 minutes',
      distance: '12 km',
      status: 'Active',
      assignedVehicleId: 'veh-1',
      assignedDriverId: 'driver-1',
    },
    {
      id: 'route-2',
      name: 'Route B - South Side',
      description: 'Pickup from southern residential areas',
      stops: ['Stop 1: South Blvd', 'Stop 2: Maple Drive', 'Stop 3: Cedar Lane', 'School'],
      estimatedTime: '35 minutes',
      distance: '10 km',
      status: 'Active',
      assignedVehicleId: 'veh-2',
      assignedDriverId: 'driver-2',
    },
    {
      id: 'route-3',
      name: 'Route C - East Side',
      description: 'Pickup from eastern residential areas',
      stops: ['Stop 1: East Road', 'Stop 2: Riverside Dr', 'School'],
      estimatedTime: '25 minutes',
      distance: '8 km',
      status: 'Inactive',
    },
  ]);

  const [trips, setTrips] = useState<Trip[]>([
    {
      id: 'trip-1',
      routeId: 'route-1',
      routeName: 'Route A - North Side',
      vehicleId: 'veh-1',
      vehiclePlate: 'SCH-1234',
      driverId: 'driver-1',
      driverName: 'John Smith',
      date: '2024-03-07',
      startTime: '07:30',
      status: 'In Progress',
      studentsAssigned: 38,
      studentsPickedUp: 32,
    },
    {
      id: 'trip-2',
      routeId: 'route-2',
      routeName: 'Route B - South Side',
      vehicleId: 'veh-2',
      vehiclePlate: 'SCH-5678',
      driverId: 'driver-2',
      driverName: 'Mary Johnson',
      date: '2024-03-07',
      startTime: '07:45',
      status: 'Scheduled',
      studentsAssigned: 35,
      studentsPickedUp: 0,
    },
    {
      id: 'trip-3',
      routeId: 'route-1',
      routeName: 'Route A - North Side',
      vehicleId: 'veh-1',
      vehiclePlate: 'SCH-1234',
      driverId: 'driver-1',
      driverName: 'John Smith',
      date: '2024-03-06',
      startTime: '15:30',
      endTime: '16:15',
      status: 'Completed',
      studentsAssigned: 40,
      studentsPickedUp: 40,
    },
  ]);

  const stats = {
    totalVehicles: vehicles.length,
    availableVehicles: vehicles.filter(v => v.status === 'Available').length,
    totalDrivers: drivers.length,
    availableDrivers: drivers.filter(d => d.status === 'Available').length,
    activeRoutes: routes.filter(r => r.status === 'Active').length,
    totalTrips: trips.length,
    activeTrips: trips.filter(t => t.status === 'In Progress').length,
    studentsTransported: trips.reduce((sum, t) => sum + t.studentsPickedUp, 0),
  };

  const handleAssignment = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedDriver(null);
    setShowAssignmentModal(true);
  };

  const processAssignment = async () => {
    if (!selectedVehicle || !selectedDriver) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update vehicle with driver
    setVehicles(vehicles.map(v => 
      v.id === selectedVehicle.id 
        ? { ...v, driverId: selectedDriver.id, driverName: `${selectedDriver.firstName} ${selectedDriver.lastName}` }
        : v
    ));
    
    // Update driver with vehicle
    setDrivers(drivers.map(d => 
      d.id === selectedDriver.id 
        ? { ...d, assignedVehicleId: selectedVehicle.id, status: 'Available' as const }
        : d
    ));
    
    setIsProcessing(false);
    setShowAssignmentModal(false);
    setSelectedVehicle(null);
    setSelectedDriver(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
      case 'Active':
      case 'Completed':
        return <Badge variant="success">{status}</Badge>;
      case 'In Use':
      case 'On Route':
      case 'In Progress':
      case 'Scheduled':
        return <Badge variant="warning">{status}</Badge>;
      case 'Maintenance':
      case 'Out of Service':
      case 'Inactive':
      case 'On Leave':
      case 'Cancelled':
        return <Badge variant="danger">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Transport Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-blue-100 mb-1">Total Vehicles</div>
            <div className="text-3xl font-bold">{stats.totalVehicles}</div>
            <div className="text-sm text-blue-100 mt-1">{stats.availableVehicles} available</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-green-100 mb-1">Drivers</div>
            <div className="text-3xl font-bold">{stats.totalDrivers}</div>
            <div className="text-sm text-green-100 mt-1">{stats.availableDrivers} available</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-yellow-100 mb-1">Active Routes</div>
            <div className="text-3xl font-bold">{stats.activeRoutes}</div>
            <div className="text-sm text-yellow-100 mt-1">{routes.length} total routes</div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardBody>
            <div className="text-sm text-purple-100 mb-1">Today's Trips</div>
            <div className="text-3xl font-bold">{stats.totalTrips}</div>
            <div className="text-sm text-purple-100 mt-1">{stats.activeTrips} in progress</div>
          </CardBody>
        </Card>
      </div>

      {/* Active Trips */}
      <Card>
        <CardBody>
          <CardTitle>Active Trips</CardTitle>
          <div className="space-y-3 mt-4">
            {trips.filter(t => t.status === 'In Progress' || t.status === 'Scheduled').map((trip) => (
              <div key={trip.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{trip.routeName}</div>
                  <div className="text-sm text-gray-500">{trip.vehiclePlate} • {trip.driverName}</div>
                  <div className="text-xs text-gray-400">{trip.date} • {trip.startTime}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {trip.studentsPickedUp}/{trip.studentsAssigned} students
                  </div>
                  {getStatusBadge(trip.status)}
                  {trip.status === 'In Progress' && (
                    <div className="mt-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(trip.studentsPickedUp / trip.studentsAssigned) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {((trip.studentsPickedUp / trip.studentsAssigned) * 100).toFixed(0)}% complete
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {trips.filter(t => t.status === 'In Progress' || t.status === 'Scheduled').length === 0 && (
              <div className="text-center py-8 text-gray-500">No active trips</div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderVehicles = () => (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <CardTitle>Vehicle Fleet</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{vehicle.plateNumber}</h3>
                    <p className="text-sm text-gray-500">{vehicle.type} • Capacity: {vehicle.capacity}</p>
                  </div>
                  {getStatusBadge(vehicle.status)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Driver</span>
                    <span className="font-medium">{vehicle.driverName || 'Unassigned'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fuel Level</span>
                    <span className="font-medium">{vehicle.fuelLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Maintenance</span>
                    <span className="font-medium">{vehicle.nextMaintenance}</span>
                  </div>
                </div>
                {vehicle.status === 'Available' && (
                  <Button 
                    onClick={() => handleAssignment(vehicle)} 
                    size="sm" 
                    className="w-full mt-3"
                  >
                    Assign Driver
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderDrivers = () => (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <CardTitle>Driver Directory</CardTitle>
          <div className="space-y-3 mt-4">
            {drivers.map((driver) => (
              <div key={driver.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{driver.firstName} {driver.lastName}</div>
                  <div className="text-sm text-gray-500">License: {driver.licenseNumber} • {driver.phone}</div>
                  <div className="text-xs text-gray-400">{driver.experience} years experience</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {driver.assignedVehicleId ? 'Assigned' : 'Unassigned'}
                  </div>
                  {getStatusBadge(driver.status)}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderRoutes = () => (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <CardTitle>Route Management</CardTitle>
          <div className="space-y-3 mt-4">
            {routes.map((route) => (
              <div key={route.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{route.name}</h3>
                    <p className="text-sm text-gray-500">{route.description}</p>
                  </div>
                  {getStatusBadge(route.status)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance</span>
                    <span className="font-medium">{route.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Time</span>
                    <span className="font-medium">{route.estimatedTime}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xs text-gray-500">Stops: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {route.stops.map((stop, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>
                {route.assignedVehicleId && (
                  <div className="mt-3 pt-3 border-t border-gray-200 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle</span>
                      <span className="font-medium">{vehicles.find(v => v.id === route.assignedVehicleId)?.plateNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Driver</span>
                      <span className="font-medium">{drivers.find(d => d.id === route.assignedDriverId)?.firstName} {drivers.find(d => d.id === route.assignedDriverId)?.lastName}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <SchoolShell schoolSlug={schoolSlug} currentPersona={currentPersona}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transport Dashboard</h1>
        <p className="text-gray-600">School Transport Management • {school.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'overview' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('vehicles')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'vehicles' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Vehicles
        </button>
        <button
          onClick={() => setActiveTab('drivers')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'drivers' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Drivers
        </button>
        <button
          onClick={() => setActiveTab('routes')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'routes' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Routes
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'vehicles' && renderVehicles()}
      {activeTab === 'drivers' && renderDrivers()}
      {activeTab === 'routes' && renderRoutes()}

      {/* Assignment Modal */}
      {showAssignmentModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Assign Driver to Vehicle</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle
                  </label>
                  <div className="text-gray-900 font-medium">{selectedVehicle.plateNumber}</div>
                  <div className="text-sm text-gray-500">{selectedVehicle.type} • Capacity: {selectedVehicle.capacity}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Driver *
                  </label>
                  <select
                    value={selectedDriver?.id || ''}
                    onChange={(e) => {
                      const driver = drivers.find(d => d.id === e.target.value);
                      setSelectedDriver(driver || null);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a driver</option>
                    {drivers.filter(d => d.status === 'Available').map(driver => (
                      <option key={driver.id} value={driver.id}>
                        {driver.firstName} {driver.lastName} ({driver.experience} years)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={processAssignment} 
                    disabled={isProcessing || !selectedDriver}
                    className="flex-1"
                  >
                    {isProcessing ? 'Processing...' : 'Assign Driver'}
                  </Button>
                  <Button 
                    onClick={() => setShowAssignmentModal(false)} 
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </SchoolShell>
  );
}
