'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import { useAuth } from '@/context/AuthContext';

export default function InstructorResources() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Resources</h1>
        <p className="text-gray-600">Access teaching materials, templates, and support resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardBody>
            <div className="text-4xl mb-4">📚</div>
            <CardTitle>Course Templates</CardTitle>
            <p className="text-sm text-gray-600 mt-2">Pre-built course structures and templates to get started quickly</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-4xl mb-4">🎥</div>
            <CardTitle>Video Production</CardTitle>
            <p className="text-sm text-gray-600 mt-2">Guides and best practices for creating high-quality video content</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-4xl mb-4">📝</div>
            <CardTitle>Quiz Builder</CardTitle>
            <p className="text-sm text-gray-600 mt-2">Tools and templates for creating engaging quizzes and assessments</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-4xl mb-4">🎨</div>
            <CardTitle>Design Assets</CardTitle>
            <p className="text-sm text-gray-600 mt-2">Branding materials, thumbnails, and course graphics</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-4xl mb-4">📊</div>
            <CardTitle>Analytics Guide</CardTitle>
            <p className="text-sm text-gray-600 mt-2">Understanding and using course performance analytics</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-4xl mb-4">💬</div>
            <CardTitle>Community</CardTitle>
            <p className="text-sm text-gray-600 mt-2">Connect with other instructors and share best practices</p>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
