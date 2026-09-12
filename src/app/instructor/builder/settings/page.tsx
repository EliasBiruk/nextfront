'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { coursesService } from '@/services';
import { useAuth } from '@/context/AuthContext';

function CourseSettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser } = useAuth();
  const courseId = searchParams.get('id');
  
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadCourse() {
      if (!courseId || !currentUser) return;
      setIsLoading(true);
      try {
        const response = await coursesService().getCourseById({ courseId });
        setCourse(response.course);
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourse();
  }, [courseId, currentUser]);

  const handleSubmitForReview = () => {
    if (courseId) {
      router.push(`/instructor/publishing/lifecycle/${courseId}`);
    }
  };

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Settings</h1>
        <p className="text-gray-600">Configure your course settings and preferences</p>
        {course && (
          <p className="text-sm text-gray-500 mt-1">Course: {course.title}</p>
        )}
      </div>

      {isLoading ? (
        <Card>
          <CardBody>
            <p className="text-gray-600">Loading course settings...</p>
          </CardBody>
        </Card>
      ) : (
        <div className="max-w-2xl">
          <Card>
            <CardBody>
              <CardTitle>Course Settings</CardTitle>
              <div className="space-y-6 mt-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Course Status</h4>
                  <p className="text-sm text-gray-600">
                    {course?.status === 'DRAFT' ? 'Draft - Not yet submitted for review' : 
                     course?.status === 'UNDER_REVIEW' ? 'Under Review - Being reviewed by JoyEdu team' :
                     course?.status === 'PUBLISHED' ? 'Published - Live and available to students' :
                     course?.status || 'Draft'}
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => courseId && router.push(`/instructor/builder/preview?id=${courseId}`)}
                    variant="outline"
                  >
                    Preview Course
                  </Button>
                  <Button
                    onClick={handleSubmitForReview}
                    disabled={course?.status === 'UNDER_REVIEW' || course?.status === 'PUBLISHED'}
                  >
                    {course?.status === 'UNDER_REVIEW' ? 'Under Review' :
                     course?.status === 'PUBLISHED' ? 'Published' :
                     'Submit for Review'}
                  </Button>
                  <Button
                    onClick={() => courseId && router.push(`/instructor/builder/pricing?id=${courseId}`)}
                    variant="outline"
                  >
                    Back
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

export default function CourseSettings() {
  return (
    <Suspense fallback={<div>Loading settings...</div>}>
      <CourseSettingsContent />
    </Suspense>
  );
}