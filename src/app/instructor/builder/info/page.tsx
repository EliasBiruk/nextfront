'use client';

import { useEffect, useState, Suspense } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { coursesService } from '@/services';
import { useAuth } from '@/context/AuthContext';

function CourseInfoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser } = useAuth();
  const courseId = searchParams.get('id');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web-development',
    level: 'beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    language: 'english',
    thumbnail: '',
    trailer: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadCourse() {
      if (!courseId || !currentUser) return;
      setIsLoading(true);
      try {
        const response = await coursesService().getCourseById({ courseId });
        setFormData({
          title: response.course.title || '',
          description: response.course.description || '',
          category: response.course.category || 'web-development',
          level: response.course.level || 'beginner',
          language: response.course.language || 'english',
          thumbnail: response.course.thumbnail || '',
          trailer: response.course.trailer || '',
        });
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourse();
  }, [courseId, currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (courseId) {
        await coursesService().updateCourse({ courseId, ...formData });
        router.push('/instructor/builder/curriculum');
      } else {
        const response = await coursesService().createCourse({
          ...formData,
          instructorId: currentUser?.id,
          scope: 'PLATFORM',
          audience: 'PUBLIC',
          tags: [],
          prerequisites: [],
          duration: '0 hours',
          price: 0,
        });
        router.push(`/instructor/builder/curriculum?id=${response.course.id}`);
      }
    } catch (error) {
      console.error('Failed to save course:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout actor="instructor" userName={currentUser?.firstName || 'Instructor'} instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Information</h1>
        <p className="text-gray-600">Edit your course details and settings</p>
      </div>

      {isLoading ? (
        <Card>
          <CardBody>
            <p className="text-gray-600">Loading course information...</p>
          </CardBody>
        </Card>
      ) : (
        <div className="max-w-3xl">
          <Card>
            <CardBody>
              <CardTitle>Basic Information</CardTitle>
              
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="programming">Programming</option>
                      <option value="design">Design</option>
                      <option value="business">Business</option>
                      <option value="marketing">Marketing</option>
                      <option value="data-science">Data Science</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-development">Mobile Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Level *
                    </label>
                    <select
                      required
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language *
                  </label>
                  <select
                    required
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="portuguese">Portuguese</option>
                    <option value="chinese">Chinese</option>
                    <option value="japanese">Japanese</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trailer Video URL
                  </label>
                  <input
                    type="url"
                    value={formData.trailer}
                    onChange={(e) => setFormData({ ...formData, trailer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save & Continue'}
                  </button>
                  <Link
                    href="/instructor/builder/curriculum"
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                  >
                    Go to Curriculum
                  </Link>
                  <Link
                    href="/instructor/courses"
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                  >
                    Back to Courses
                  </Link>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}

export default function CourseInfo() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CourseInfoContent />
    </Suspense>
  );
}