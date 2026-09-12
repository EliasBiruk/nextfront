'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { coursesService } from '@/services';
import { CourseStatus, Course } from '@/types';
import { useAuth } from '@/context/AuthContext';

export default function CourseLifecyclePage({ params }: { params: { courseId: string } }) {
  const { courseId } = useParams();
  const { currentUser } = useAuth();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [transitionReason, setTransitionReason] = useState('');
  const [targetStatus, setTargetStatus] = useState<CourseStatus | null>(null);

  const statusColors: Record<CourseStatus, string> = {
    DRAFT: 'bg-gray-100 text-gray-700',
    UNDER_REVIEW: 'bg-yellow-100 text-yellow-700',
    PUBLISHED: 'bg-green-100 text-green-700',
    ARCHIVED: 'bg-purple-100 text-purple-700',
    REJECTED: 'bg-red-100 text-red-700'
  };

  const statusDescriptions: Record<CourseStatus, string> = {
    DRAFT: 'Course is in draft mode. Only you can see and edit it.',
    UNDER_REVIEW: 'Course is under review by the JoyEdu team.',
    PUBLISHED: 'Course is live and available to students.',
    ARCHIVED: 'Course is archived and no longer visible to students.',
    REJECTED: 'Course was rejected. Review feedback and make changes.'
  };

  const allowedTransitions: Record<CourseStatus, CourseStatus[]> = {
    DRAFT: [CourseStatus.UNDER_REVIEW, CourseStatus.ARCHIVED],
    UNDER_REVIEW: [CourseStatus.PUBLISHED, CourseStatus.REJECTED, CourseStatus.DRAFT],
    PUBLISHED: [CourseStatus.ARCHIVED],
    ARCHIVED: [CourseStatus.DRAFT, CourseStatus.PUBLISHED],
    REJECTED: [CourseStatus.DRAFT, CourseStatus.UNDER_REVIEW]
  };

  const transitionLabels: Record<CourseStatus, string> = {
    DRAFT: 'Submit for Review',
    UNDER_REVIEW: 'Under Review',
    PUBLISHED: 'Archive Course',
    ARCHIVED: 'Restore Course',
    REJECTED: 'Resubmit'
  };

  useEffect(() => {
    async function loadCourse() {
      if (!courseId) return;
      setIsLoading(true);
      try {
        const response = await coursesService().getCourseById({ courseId: courseId as string });
        setCourse(response.course);
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourse();
  }, [courseId]);

  const initiateTransition = (newStatus: CourseStatus) => {
    setTargetStatus(newStatus);
    setTransitionReason('');
    setShowTransitionModal(true);
  };

  const confirmTransition = async () => {
    if (!targetStatus || !course) return;

    try {
      await coursesService().updateCourse({ courseId: course.id, status: targetStatus });
      
      // Reload course to get updated status
      const response = await coursesService().getCourseById({ courseId: course.id });
      setCourse(response.course);
      
      setShowTransitionModal(false);
      setTargetStatus(null);
      setTransitionReason('');
    } catch (error) {
      console.error('Failed to update course status:', error);
    }
  };

  const getStatusTimeline = () => {
    if (!course) return [];
    
    const timeline = [];
    if (course.publishedAt) {
      timeline.push({ status: 'Published', date: course.publishedAt });
    }
    if (course.updatedAt) {
      timeline.push({ status: 'Last Updated', date: course.updatedAt });
    }
    return timeline;
  };

  if (isLoading) {
    return (
      <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
        <Card>
          <CardBody>
            <p className="text-gray-600">Loading course lifecycle...</p>
          </CardBody>
        </Card>
      </DashboardLayout>
    );
  }

  if (!course) {
    return (
      <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
        <Card>
          <CardBody>
            <p className="text-gray-600">Course not found.</p>
          </CardBody>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Lifecycle</h1>
        <p className="text-gray-600">Manage course status and transitions</p>
      </div>

      {/* Current Status Card */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
              <div className="flex items-center gap-3 mb-4">
                <Badge className={statusColors[course.status]}>{course.status}</Badge>
                <span className="text-sm text-gray-500">Last updated: {new Date(course.updatedAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700">{statusDescriptions[course.status]}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Lifecycle Flow */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Lifecycle Flow</CardTitle>
          <div className="flex items-center justify-between mt-4 overflow-x-auto pb-4">
            {['DRAFT', 'UNDER_REVIEW', 'PUBLISHED', 'ARCHIVED'].map((status, index) => {
              const isActive = course.status === status;
              const isPast = ['DRAFT', 'UNDER_REVIEW', 'PUBLISHED', 'ARCHIVED'].indexOf(course.status) > index;

              return (
                <div key={status} className="flex items-center min-w-[120px]">
                  <div
                    className={`flex flex-col items-center ${
                      isActive ? 'text-blue-600' : isPast ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${
                        isActive
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : isPast
                          ? 'bg-green-100 border-2 border-green-500'
                          : 'bg-gray-100 border-2 border-gray-300'
                      }`}
                    >
                      {isActive ? '●' : isPast ? '✓' : index + 1}
                    </div>
                    <span className="text-xs font-medium mt-2">{status.replace('_', ' ')}</span>
                  </div>
                  {index < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        isPast && !isActive ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          
          {course.status === CourseStatus.REJECTED && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">Course Rejected</h4>
              <p className="text-red-800">This course was rejected. Please review the feedback and make necessary changes before resubmitting.</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Available Transitions */}
      <Card className="mb-6">
        <CardBody>
          <CardTitle>Available Actions</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {allowedTransitions[course.status].map((nextStatus) => (
              <button
                key={nextStatus}
                onClick={() => initiateTransition(nextStatus)}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusColors[nextStatus]}`}>
                  {nextStatus === CourseStatus.UNDER_REVIEW && '📤'}
                  {nextStatus === CourseStatus.PUBLISHED && '🚀'}
                  {nextStatus === CourseStatus.ARCHIVED && '📦'}
                  {nextStatus === CourseStatus.DRAFT && '✏️'}
                  {nextStatus === CourseStatus.REJECTED && '✗'}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {transitionLabels[nextStatus]}
                  </div>
                  <div className="text-sm text-gray-600">
                    {statusDescriptions[nextStatus]}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Timeline */}
      {getStatusTimeline().length > 0 && (
        <Card className="mb-6">
          <CardBody>
            <CardTitle>Status History</CardTitle>
            <div className="mt-4 space-y-4">
              {getStatusTimeline().map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5" />
                  <div>
                    <div className="font-medium text-gray-900">{item.status}</div>
                    <div className="text-sm text-gray-600">{new Date(item.date).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Transition Modal */}
      {showTransitionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardBody>
              <CardTitle>Confirm Status Change</CardTitle>
              <div className="mt-4">
                <p className="text-gray-700 mb-4">
                  Are you sure you want to change the course status from <strong>{course.status}</strong> to <strong>{targetStatus}</strong>?
                </p>
                <div className="flex gap-3">
                  <Button onClick={confirmTransition}>Confirm</Button>
                  <Button onClick={() => setShowTransitionModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
