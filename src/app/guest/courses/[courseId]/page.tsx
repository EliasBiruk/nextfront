'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { coursesService, enrollmentsService } from '@/services';
import { Course } from '@/types';

export default function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [enrollment, setEnrollment] = useState<any>(null);

  const courseId = params.courseId as string;

  useEffect(() => {
    async function loadCourse() {
      try {
        const response = await coursesService().getCourseById(courseId);
        setCourse(response);
        
        if (currentUser) {
          const enrollmentResponse = await enrollmentsService().getEnrollment({
            userId: currentUser.id,
            courseId,
          });
          setEnrollment(enrollmentResponse);
        }
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourse();
  }, [courseId, currentUser]);

  const handleEnroll = async () => {
    if (!isAuthenticated || !currentUser) {
      router.push('/auth/login');
      return;
    }

    setIsEnrolling(true);
    try {
      await enrollmentsService().enrollInCourse({
        userId: currentUser.id,
        courseId,
      });
      setEnrollmentSuccess(true);
      
      // Reload enrollment
      const enrollmentResponse = await enrollmentsService().getEnrollment({
        userId: currentUser.id,
        courseId,
      });
      setEnrollment(enrollmentResponse);
    } catch (error) {
      console.error('Failed to enroll:', error);
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleStartLearning = () => {
    router.push(`/student/learning/player/${courseId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header actor="guest" />
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-gray-500">Loading course...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header actor="guest" />
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-gray-500">Course not found</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-gray-50">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="info">{course.level}</Badge>
                  <span className="text-blue-200">{course.category}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-blue-100 mb-6">{course.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👨‍🏫</span>
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-blue-200">({course.students.toLocaleString()} students)</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="bg-white text-gray-900">
                  <CardBody>
                    <div className="aspect-video mb-4 bg-gray-200 rounded-lg flex items-center justify-center text-6xl">
                      {course.thumbnail}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-3xl font-bold text-blue-600">${course.price}</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Level</span>
                        <span className="font-medium">{course.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lessons</span>
                        <span className="font-medium">{course.lessons}</span>
                      </div>
                    </div>
                    
                    {enrollmentSuccess ? (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-2">
                        <p className="text-green-800 font-medium text-center">
                          ✓ Successfully enrolled!
                        </p>
                      </div>
                    ) : enrollment ? (
                      <Button onClick={handleStartLearning} className="w-full mb-2">
                        Continue Learning ({enrollment.progress}%)
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleEnroll} 
                        className="w-full mb-2" 
                        disabled={isEnrolling}
                      >
                        {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                      </Button>
                    )}
                    
                    <Button variant="outline" className="w-full">Add to Wishlist</Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <Card>
                  <CardBody>
                    <CardTitle>About This Course</CardTitle>
                    <p className="text-gray-700">{course.description}</p>
                  </CardBody>
                </Card>

                {/* Tags */}
                <Card>
                  <CardBody>
                    <CardTitle>Topics Covered</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* Instructor Info */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardBody>
                    <CardTitle>Instructor</CardTitle>
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-2">👨‍🏫</div>
                      <h3 className="font-semibold text-lg">{course.instructor}</h3>
                    </div>
                    <Link href="/guest/instructors" className="block w-full text-center text-blue-600 hover:underline text-sm mb-4">
                      View All Instructors
                    </Link>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}