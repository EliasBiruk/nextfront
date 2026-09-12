'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { getCourses, localCourses } from '@/data/mockData';

export default function AdminCourses() {
  const [courses, setCourses] = useState(getCourses());
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReview = (course: any) => {
    setSelectedCourse(course);
    setFeedback(course.feedback || '');
  };

  const handleApprove = async () => {
    if (!selectedCourse) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedCourses = courses.map(course => 
      course.id === selectedCourse.id 
        ? { ...course, status: 'PUBLISHED' as const, feedback }
        : course
    );
    setCourses(updatedCourses);
    
    // Update local courses as well
    const courseIndex = localCourses.findIndex(c => c.id === selectedCourse.id);
    if (courseIndex !== -1) {
      localCourses[courseIndex] = { ...localCourses[courseIndex], status: 'PUBLISHED' as const };
    }
    
    setSelectedCourse(null);
    setFeedback('');
    setIsLoading(false);
  };

  const handleReject = async () => {
    if (!selectedCourse) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedCourses = courses.map(course => 
      course.id === selectedCourse.id 
        ? { ...course, status: 'REJECTED' as const, feedback }
        : course
    );
    setCourses(updatedCourses);
    
    // Update local courses as well
    const courseIndex = localCourses.findIndex(c => c.id === selectedCourse.id);
    if (courseIndex !== -1) {
      localCourses[courseIndex] = { ...localCourses[courseIndex], status: 'REJECTED' as const };
    }
    
    setSelectedCourse(null);
    setFeedback('');
    setIsLoading(false);
  };

  const handleRequestChanges = async () => {
    if (!selectedCourse) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedCourses = courses.map(course => 
      course.id === selectedCourse.id 
        ? { ...course, status: 'IN_REVIEW' as const, feedback }
        : course
    );
    setCourses(updatedCourses);
    
    // Update local courses as well
    const courseIndex = localCourses.findIndex(c => c.id === selectedCourse.id);
    if (courseIndex !== -1) {
      localCourses[courseIndex] = { ...localCourses[courseIndex], status: 'IN_REVIEW' as const };
    }
    
    setSelectedCourse(null);
    setFeedback('');
    setIsLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return <Badge variant="info">Draft</Badge>;
      case 'IN_REVIEW':
        return <Badge variant="warning">In Review</Badge>;
      case 'APPROVED':
        return <Badge variant="success">Approved</Badge>;
      case 'PUBLISHED':
        return <Badge variant="success">Published</Badge>;
      case 'REJECTED':
        return <Badge variant="danger">Rejected</Badge>;
      case 'ARCHIVED':
        return <Badge variant="info">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const pendingCourses = courses.filter(course => 
    ['IN_REVIEW', 'APPROVED'].includes(course.status)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="admin" userName="Administrator" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2 text-[var(--joyedu-text-primary)]">Course Management</h1>
              <p className="text-[var(--joyedu-text-secondary)]">Moderate and manage platform courses</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Courses List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardBody>
                    <CardTitle>Pending Review ({pendingCourses.length})</CardTitle>
                    
                    {pendingCourses.length === 0 ? (
                      <div className="text-center py-8 text-[var(--joyedu-text-muted)]">
                        No courses pending review
                      </div>
                    ) : (
                      <div className="space-y-4 mt-4">
                        {pendingCourses.map((course) => (
                          <div
                            key={course.id}
                            className={`p-4 border rounded-lg cursor-pointer transition ${
                              selectedCourse?.id === course.id
                                ? 'border-[var(--joyedu-primary-500)] bg-[var(--joyedu-primary-subtle)]'
                                : 'border-[var(--joyedu-border-200)] hover:border-[var(--joyedu-border-300)]'
                            }`}
                            onClick={() => handleReview(course)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-medium text-[var(--joyedu-text-primary)]">{course.title}</h3>
                                <p className="text-sm text-[var(--joyedu-text-muted)]">{course.instructor}</p>
                              </div>
                              {getStatusBadge(course.status)}
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              {course.tags?.slice(0, 3).map((tag: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 bg-[var(--joyedu-bg-tertiary)] rounded-full text-[var(--joyedu-text-secondary)]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex gap-4 mt-2 text-xs text-[var(--joyedu-text-muted)]">
                              <span>Category: {course.category}</span>
                              <span>Level: {course.level}</span>
                              <span>Price: ${course.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* All Courses */}
                    <div className="mt-8">
                      <h3 className="font-medium text-[var(--joyedu-text-primary)] mb-4">All Courses</h3>
                      <div className="space-y-2">
                        {courses.map((course) => (
                          <div
                            key={course.id}
                            className="flex items-center justify-between p-3 border border-[var(--joyedu-border-200)] rounded-lg"
                          >
                            <div>
                              <span className="font-medium text-sm">
                                {course.title}
                              </span>
                              <span className="text-xs text-[var(--joyedu-text-muted)] ml-2">
                                {course.instructor}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(course.status)}
                              <button
                                onClick={() => handleReview(course)}
                                className="text-sm text-[var(--joyedu-primary)] hover:underline"
                              >
                                Review
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* Review Panel */}
              <div className="lg:col-span-1">
                {selectedCourse ? (
                  <Card>
                    <CardBody>
                      <CardTitle>Review Course</CardTitle>
                      
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="text-xs font-medium text-gray-500">Title</label>
                          <p className="font-medium">{selectedCourse.title}</p>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-500">Instructor</label>
                          <p className="text-sm">{selectedCourse.instructor}</p>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-500">Description</label>
                          <p className="text-sm text-gray-600 mt-1">{selectedCourse.description}</p>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-500">Category</label>
                          <p className="text-sm">{selectedCourse.category}</p>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-500">Level</label>
                          <p className="text-sm">{selectedCourse.level}</p>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-500">Price</label>
                          <p className="text-sm">${selectedCourse.price}</p>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-500">Scope</label>
                          <p className="text-sm">{selectedCourse.scope}</p>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-500">Audience</label>
                          <p className="text-sm">{selectedCourse.audience}</p>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-500">Students</label>
                          <p className="text-sm">{selectedCourse.students}</p>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-500">Rating</label>
                          <p className="text-sm">{selectedCourse.rating} ⭐</p>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-500">Feedback</label>
                          <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={3}
                            placeholder="Add feedback for the instructor..."
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {selectedCourse.feedback && selectedCourse.status !== 'DRAFT' && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <label className="text-xs font-medium text-gray-500">Previous Feedback</label>
                            <p className="text-sm text-gray-600 mt-1">{selectedCourse.feedback}</p>
                          </div>
                        )}

                        <div className="flex flex-col gap-2 pt-4 border-t">
                          <Button
                            onClick={handleApprove}
                            disabled={isLoading}
                            className="w-full"
                          >
                            {isLoading ? 'Processing...' : 'Approve & Publish'}
                          </Button>
                          <Button
                            onClick={handleRequestChanges}
                            disabled={isLoading}
                            variant="outline"
                            className="w-full"
                          >
                            {isLoading ? 'Processing...' : 'Request Changes'}
                          </Button>
                          <Button
                            onClick={handleReject}
                            disabled={isLoading}
                            variant="danger"
                            className="w-full"
                          >
                            {isLoading ? 'Processing...' : 'Reject'}
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ) : (
                  <Card>
                    <CardBody>
                      <div className="text-center py-8 text-gray-500">
                        <p>Select a course to review</p>
                      </div>
                    </CardBody>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}