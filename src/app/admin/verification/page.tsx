'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function AdminVerification() {
  const [activeTab, setActiveTab] = useState('instructors');
  
  const [instructors, setInstructors] = useState([
    {
      id: 'inst-1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com',
      specialization: 'Computer Science',
      experience: '5 years',
      status: 'pending',
      submittedAt: '2024-08-25T10:30:00Z',
      documents: ['ID Proof', 'Degree Certificate', 'Teaching Certificate']
    },
    {
      id: 'inst-2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@example.com',
      specialization: 'Mathematics',
      experience: '10 years',
      status: 'pending',
      submittedAt: '2024-08-24T14:15:00Z',
      documents: ['ID Proof', 'Degree Certificate']
    },
    {
      id: 'inst-3',
      name: 'Ms. Emily Davis',
      email: 'emily.davis@example.com',
      specialization: 'English Literature',
      experience: '3 years',
      status: 'approved',
      submittedAt: '2024-08-20T09:00:00Z',
      documents: ['ID Proof', 'Degree Certificate', 'Teaching Certificate']
    }
  ]);

  const [schools, setSchools] = useState([
    {
      id: 'school-1',
      name: 'Lincoln High School',
      type: 'Public',
      location: 'Springfield, IL',
      contact: 'admin@lincoln.edu',
      status: 'pending',
      submittedAt: '2024-08-25T11:00:00Z',
      documents: ['Registration Certificate', 'Tax ID', 'Principal Authorization']
    },
    {
      id: 'school-2',
      name: 'Oak Valley Academy',
      type: 'Private',
      location: 'Oak Valley, CA',
      contact: 'contact@oakvalley.edu',
      status: 'pending',
      submittedAt: '2024-08-24T16:30:00Z',
      documents: ['Registration Certificate', 'Tax ID']
    },
    {
      id: 'school-3',
      name: 'Riverside Elementary',
      type: 'Public',
      location: 'Riverside, TX',
      contact: 'info@riverside.edu',
      status: 'approved',
      submittedAt: '2024-08-18T08:00:00Z',
      documents: ['Registration Certificate', 'Tax ID', 'Principal Authorization']
    }
  ]);

  const [courses, setCourses] = useState([
    {
      id: 'course-1',
      title: 'Advanced JavaScript Patterns',
      instructor: 'Dr. Sarah Johnson',
      category: 'Programming',
      lessons: 45,
      status: 'pending',
      submittedAt: '2024-08-25T09:30:00Z',
      reason: 'Content review required'
    },
    {
      id: 'course-2',
      title: 'Introduction to Machine Learning',
      instructor: 'Prof. Michael Chen',
      category: 'Data Science',
      lessons: 60,
      status: 'pending',
      submittedAt: '2024-08-24T13:00:00Z',
      reason: 'Quality check pending'
    },
    {
      id: 'course-3',
      title: 'English Composition 101',
      instructor: 'Ms. Emily Davis',
      category: 'Language',
      lessons: 30,
      status: 'approved',
      submittedAt: '2024-08-15T10:00:00Z',
      reason: 'Approved'
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleApprove = (id: string, type: string) => {
    if (type === 'instructors') {
      setInstructors(prev => prev.map(i => i.id === id ? { ...i, status: 'approved' } : i));
    } else if (type === 'schools') {
      setSchools(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s));
    } else if (type === 'courses') {
      setCourses(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c));
    }
    alert('Item approved successfully!');
  };

  const handleReject = (id: string, type: string) => {
    if (type === 'instructors') {
      setInstructors(prev => prev.map(i => i.id === id ? { ...i, status: 'rejected' } : i));
    } else if (type === 'schools') {
      setSchools(prev => prev.map(s => s.id === id ? { ...s, status: 'rejected' } : s));
    } else if (type === 'courses') {
      setCourses(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' } : c));
    }
    alert('Item rejected');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const tabs = [
    { id: 'instructors', label: 'Instructors', count: instructors.filter(i => i.status === 'pending').length },
    { id: 'schools', label: 'Schools', count: schools.filter(s => s.status === 'pending').length },
    { id: 'courses', label: 'Courses', count: courses.filter(c => c.status === 'pending').length }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'instructors': return instructors;
      case 'schools': return schools;
      case 'courses': return courses;
      default: return [];
    }
  };

  const currentData = getCurrentData();
  const pendingCount = currentData.filter((item: any) => item.status === 'pending').length;

  return (
    <DashboardLayout actor="admin" userName="Admin">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification</h1>
        <p className="text-gray-600">Review and verify instructors, schools, and courses</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{currentData.length}</div>
            <p className="text-gray-600 text-sm">Total</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{pendingCount}</div>
            <p className="text-gray-600 text-sm">Pending</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {currentData.filter((item: any) => item.status === 'approved').length}
            </div>
            <p className="text-gray-600 text-sm">Approved</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {currentData.filter((item: any) => item.status === 'rejected').length}
            </div>
            <p className="text-gray-600 text-sm">Rejected</p>
          </CardBody>
        </Card>
      </div>

      {/* List */}
      <Card>
        <CardBody>
          <CardTitle>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ({currentData.length})
          </CardTitle>
          <div className="mt-4 space-y-4">
            {currentData.map((item: any) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                      {activeTab === 'instructors' ? '👨‍🏫' : activeTab === 'schools' ? '🏫' : '📚'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">
                          {activeTab === 'instructors' ? item.name : 
                           activeTab === 'schools' ? item.name : 
                           item.title}
                        </h3>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.toUpperCase()}
                        </Badge>
                      </div>
                      {activeTab === 'instructors' && (
                        <>
                          <p className="text-sm text-gray-600">{item.email}</p>
                          <p className="text-sm text-gray-600">Specialization: {item.specialization}</p>
                          <p className="text-sm text-gray-600">Experience: {item.experience}</p>
                        </>
                      )}
                      {activeTab === 'schools' && (
                        <>
                          <p className="text-sm text-gray-600">{item.contact}</p>
                          <p className="text-sm text-gray-600">Type: {item.type} • Location: {item.location}</p>
                        </>
                      )}
                      {activeTab === 'courses' && (
                        <>
                          <p className="text-sm text-gray-600">Instructor: {item.instructor}</p>
                          <p className="text-sm text-gray-600">Category: {item.category} • {item.lessons} lessons</p>
                          <p className="text-sm text-gray-600">Reason: {item.reason}</p>
                        </>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Submitted: {new Date(item.submittedAt).toLocaleString()}
                      </p>
                      {item.documents && (
                        <div className="flex gap-2 mt-2">
                          {item.documents.map((doc: string, idx: number) => (
                            <Badge key={idx} variant="default" className="text-xs">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedItem(item)}
                    >
                      Review
                    </Button>
                    {item.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleApprove(item.id, activeTab)}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleReject(item.id, activeTab)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {currentData.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No items found.
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Review Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <CardBody>
              <CardTitle>Review {activeTab.slice(0, -1)}</CardTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold">Details</h4>
                  {activeTab === 'instructors' && (
                    <>
                      <p className="text-sm text-gray-600">Name: {selectedItem.name}</p>
                      <p className="text-sm text-gray-600">Email: {selectedItem.email}</p>
                      <p className="text-sm text-gray-600">Specialization: {selectedItem.specialization}</p>
                      <p className="text-sm text-gray-600">Experience: {selectedItem.experience}</p>
                    </>
                  )}
                  {activeTab === 'schools' && (
                    <>
                      <p className="text-sm text-gray-600">Name: {selectedItem.name}</p>
                      <p className="text-sm text-gray-600">Type: {selectedItem.type}</p>
                      <p className="text-sm text-gray-600">Location: {selectedItem.location}</p>
                      <p className="text-sm text-gray-600">Contact: {selectedItem.contact}</p>
                    </>
                  )}
                  {activeTab === 'courses' && (
                    <>
                      <p className="text-sm text-gray-600">Title: {selectedItem.title}</p>
                      <p className="text-sm text-gray-600">Instructor: {selectedItem.instructor}</p>
                      <p className="text-sm text-gray-600">Category: {selectedItem.category}</p>
                      <p className="text-sm text-gray-600">Lessons: {selectedItem.lessons}</p>
                    </>
                  )}
                  <p className="text-sm text-gray-600">Status: {selectedItem.status}</p>
                  <p className="text-sm text-gray-600">Submitted: {new Date(selectedItem.submittedAt).toLocaleString()}</p>
                </div>
                {selectedItem.documents && (
                  <div>
                    <h4 className="font-semibold">Documents</h4>
                    <div className="flex gap-2 mt-2">
                      {selectedItem.documents.map((doc: string, idx: number) => (
                        <Badge key={idx} variant="default">{doc}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedItem.status === 'pending' && (
                  <div className="flex gap-4 pt-4 border-t">
                    <Button onClick={() => {
                      handleApprove(selectedItem.id, activeTab);
                      setSelectedItem(null);
                    }}>
                      Approve
                    </Button>
                    <Button variant="outline" onClick={() => {
                      handleReject(selectedItem.id, activeTab);
                      setSelectedItem(null);
                    }}>
                      Reject
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setSelectedItem(null)}>
                  Close
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
