'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';
import { coursesService } from '@/services';
import { Course } from '@/types';

export default function GuestPage() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedCourses() {
      try {
        const response = await coursesService().getCourses({
          status: 'PUBLISHED',
          pagination: { page: 1, pageSize: 3 },
        });
        setFeaturedCourses(response.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to load featured courses:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeaturedCourses();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[var(--joyedu-primary-600)] to-[var(--joyedu-primary-700)] text-white py-20">
          <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to JoyEdu</h1>
              <p className="text-xl text-[var(--joyedu-primary-100)] mb-8">
                Your gateway to world-class education. Explore courses, discover instructors, and find schools.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/guest/courses" className="px-8 py-3 bg-[var(--joyedu-surface-1)] text-[var(--joyedu-primary-700)] rounded-lg font-semibold hover:bg-[var(--joyedu-primary-50)] transition shadow-[var(--joyedu-shadow-sm)]">
                  Explore Courses
                </Link>
                <Link href="/auth/signup" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-12">
          <div className="max-w-7xl mx-auto">
            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Link href="/guest/courses" className="block">
                <Card className="hover:shadow-[var(--joyedu-shadow-lg)] transition text-center">
                  <CardBody>
                    <div className="text-5xl mb-4">📚</div>
                    <h3 className="font-bold text-xl mb-2 text-[var(--joyedu-text-primary)]">Courses</h3>
                    <p className="text-[var(--joyedu-text-secondary)] text-sm">Browse 8,500+ courses</p>
                  </CardBody>
                </Card>
              </Link>

              <Link href="/guest/categories" className="block">
                <Card className="hover:shadow-[var(--joyedu-shadow-lg)] transition text-center">
                  <CardBody>
                    <div className="text-5xl mb-4">🏷️</div>
                    <h3 className="font-bold text-xl mb-2 text-[var(--joyedu-text-primary)]">Categories</h3>
                    <p className="text-[var(--joyedu-text-secondary)] text-sm">Explore 50+ categories</p>
                  </CardBody>
                </Card>
              </Link>

              <Link href="/guest/instructors" className="block">
                <Card className="hover:shadow-[var(--joyedu-shadow-lg)] transition text-center">
                  <CardBody>
                    <div className="text-5xl mb-4">👨‍🏫</div>
                    <h3 className="font-bold text-xl mb-2 text-[var(--joyedu-text-primary)]">Instructors</h3>
                    <p className="text-[var(--joyedu-text-secondary)] text-sm">Meet 15,000+ experts</p>
                  </CardBody>
                </Card>
              </Link>

              <Link href="/guest/schools" className="block">
                <Card className="hover:shadow-[var(--joyedu-shadow-lg)] transition text-center">
                  <CardBody>
                    <div className="text-5xl mb-4">🏫</div>
                    <h3 className="font-bold text-xl mb-2 text-[var(--joyedu-text-primary)]">Schools</h3>
                    <p className="text-[var(--joyedu-text-secondary)] text-sm">Discover 450+ schools</p>
                  </CardBody>
                </Card>
              </Link>
            </div>

            {/* Featured Courses */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[var(--joyedu-text-primary)]">Featured Courses</h2>
                <Link href="/guest/courses" className="text-[var(--joyedu-primary)] hover:underline">View all →</Link>
              </div>
              {isLoading ? (
                <div className="text-center py-8 text-[var(--joyedu-text-muted)]">Loading featured courses...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredCourses.map((course) => (
                    <Link key={course.id} href={`/guest/courses/${course.id}`} className="block">
                      <Card className="hover:shadow-[var(--joyedu-shadow-lg)] transition">
                        <CardBody>
                          <div className="h-32 relative overflow-hidden rounded-lg mb-4">
                            <img 
                              src={course.thumbnail} 
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs text-[var(--joyedu-primary)] font-medium">{course.category}</span>
                          <h3 className="font-bold text-lg mt-2 mb-2 text-[var(--joyedu-text-primary)]">{course.title}</h3>
                          <p className="text-[var(--joyedu-text-secondary)] text-sm mb-4">{course.instructor}</p>
                          <div className="flex items-center gap-4 text-sm text-[var(--joyedu-text-muted)] mb-4">
                            <div className="flex items-center gap-1">
                              <span className="text-[var(--joyedu-warning)]">★</span>
                              <span className="font-medium text-[var(--joyedu-text-primary)]">{course.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{course.students.toLocaleString()} students</span>
                          </div>
                          <div className="text-2xl font-bold text-[var(--joyedu-primary)]">
                            {course.price === 0 ? 'Free' : `$${course.price}`}
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Why JoyEdu */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-center mb-8 text-[var(--joyedu-text-primary)]">Why Choose JoyEdu?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                  <div className="text-4xl mb-3">🎓</div>
                  <h3 className="font-semibold text-lg mb-2 text-[var(--joyedu-text-primary)]">Learn at Your Pace</h3>
                  <p className="text-[var(--joyedu-text-secondary)] text-sm">Access courses anytime, anywhere with lifetime access</p>
                </div>
                <div className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                  <div className="text-4xl mb-3">🏆</div>
                  <h3 className="font-semibold text-lg mb-2 text-[var(--joyedu-text-primary)]">Expert Instructors</h3>
                  <p className="text-[var(--joyedu-text-secondary)] text-sm">Learn from industry professionals and academics</p>
                </div>
                <div className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                  <div className="text-4xl mb-3">🎖️</div>
                  <h3 className="font-semibold text-lg mb-2 text-[var(--joyedu-text-primary)]">Verified Certificates</h3>
                  <p className="text-[var(--joyedu-text-secondary)] text-sm">Earn recognized certificates for your achievements</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Card className="bg-gradient-to-r from-[var(--joyedu-primary-50)] to-[var(--joyedu-primary-100)] border-[var(--joyedu-primary-200)]">
                <CardBody className="py-12">
                  <h2 className="text-2xl font-bold mb-4 text-[var(--joyedu-text-primary)]">Ready to Start Learning?</h2>
                  <p className="text-[var(--joyedu-text-secondary)] mb-6 max-w-2xl mx-auto">
                    Join 125,000+ learners already using JoyEdu to achieve their goals.
                  </p>
                  <Link href="/auth/signup" className="inline-block px-8 py-3 bg-[var(--joyedu-primary)] text-white rounded-lg font-semibold hover:bg-[var(--joyedu-primary-hover)] transition shadow-[var(--joyedu-shadow-sm)]">
                    Get Started Free
                  </Link>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}