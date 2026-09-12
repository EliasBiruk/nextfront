'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import Link from 'next/link';

export default function InstructorDetail() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock instructor data - will come from backend
  const instructor = {
    id: 1,
    name: 'Dr. Sarah Johnson',
    title: 'Senior Software Engineer',
    avatar: '👩‍💼',
    expertise: 'Web Development, React, JavaScript, Node.js',
    bio: 'Former Google engineer with 10+ years of experience in web development. Passionate about teaching complex concepts in simple ways and helping students achieve their career goals.',
    rating: 4.8,
    reviews: 1250,
    students: 45000,
    courses: 12,
    joined: 'January 2020',
    location: 'San Francisco, CA',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  };

  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      students: 12500,
      rating: 4.8,
      price: '$49.99',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Patterns',
      students: 3200,
      rating: 4.9,
      price: '$69.99',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'React Development Fundamentals',
      students: 8900,
      rating: 4.7,
      price: '$39.99',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=300&fit=crop'
    }
  ];

  const allReviews = [
    { name: 'John Smith', rating: 5, comment: 'Excellent instructor! Very clear explanations.', date: '2 days ago' },
    { name: 'Emily Davis', rating: 5, comment: 'Best web development course I\'ve taken.', date: '1 week ago' },
    { name: 'Michael Brown', rating: 4, comment: 'Great content, learned a lot.', date: '2 weeks ago' },
    { name: 'Sarah Wilson', rating: 5, comment: 'Amazing teaching style!', date: '3 weeks ago' },
    { name: 'David Lee', rating: 4, comment: 'Very comprehensive course.', date: '1 month ago' },
    { name: 'Jennifer Martinez', rating: 5, comment: 'Highly recommend this instructor.', date: '1 month ago' },
    { name: 'Robert Taylor', rating: 4, comment: 'Good practical examples.', date: '2 months ago' },
    { name: 'Lisa Anderson', rating: 5, comment: 'Changed my career path!', date: '2 months ago' },
  ];

  const handleFollow = () => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
    } else {
      alert('Following instructor! (This will connect to backend)');
    }
  };

  const handleSendMessage = () => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
    } else {
      alert('Opening message composer... (This will connect to backend)');
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/guest/instructors/${instructor.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-gray-50">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-8xl mb-4 md:mb-0">{instructor.avatar}</div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{instructor.name}</h1>
                  <p className="text-xl text-green-100 mb-4">{instructor.title}</p>
                  <div className="flex items-center justify-center md:justify-start gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold">{instructor.rating}</span>
                      <span className="text-green-200">({instructor.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <span>•</span>
                    <span>{instructor.students.toLocaleString()} students</span>
                    <span>•</span>
                    <span>{instructor.courses} courses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <Card>
                  <CardBody>
                    <CardTitle>About</CardTitle>
                    <p className="text-gray-700 leading-relaxed">{instructor.bio}</p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Location</span>
                          <div className="font-medium">{instructor.location}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Joined</span>
                          <div className="font-medium">{instructor.joined}</div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Expertise */}
                <Card>
                  <CardBody>
                    <CardTitle>Expertise</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {instructor.expertise.split(', ').map((skill, index) => (
                        <Badge key={index} variant="default">{skill.trim()}</Badge>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                {/* Courses */}
                <Card>
                  <CardBody>
                    <CardTitle>Courses ({instructor.courses})</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {courses.map((course) => (
                        <Link key={course.id} href={`/guest/courses/${course.id}`} className="block">
                          <Card className="hover:shadow-lg transition">
                            <div className="relative h-32 mb-3">
                              <img 
                                src={course.image} 
                                alt={course.title}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <span className="text-yellow-500">★</span>
                                <span>{course.rating}</span>
                              </span>
                              <span>•</span>
                              <span>{course.students.toLocaleString()} students</span>
                            </div>
                            <div className="font-bold text-blue-600 mt-2">{course.price}</div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                {/* Reviews Preview */}
                <Card>
                  <CardBody>
                    <CardTitle>Recent Reviews</CardTitle>
                  <div className="space-y-4">
                    {(showAllReviews ? allReviews : allReviews.slice(0, 3)).map((review, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{review.name}</span>
                          <div className="flex items-center gap-1 text-yellow-500">
                            {'★'.repeat(review.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="block w-full text-center text-blue-600 hover:underline text-sm mt-4"
                  >
                    {showAllReviews ? 'Show fewer reviews' : `View all ${instructor.reviews.toLocaleString()} reviews →`}
                  </button>
                  </CardBody>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Stats */}
                <Card>
                  <CardBody>
                    <CardTitle>Statistics</CardTitle>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-1">{instructor.students.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Students</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-1">{instructor.courses}</div>
                        <div className="text-sm text-gray-600">Active Courses</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-3xl font-bold text-purple-600 mb-1">{instructor.rating}</div>
                        <div className="text-sm text-gray-600">Average Rating</div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Actions */}
                <Card>
                  <CardBody>
                    <CardTitle>Actions</CardTitle>
                    <div className="space-y-3">
                      <Button onClick={handleFollow} className="w-full">Follow Instructor</Button>
                      <Button onClick={handleSendMessage} variant="outline" className="w-full">Send Message</Button>
                      <Button onClick={handleShare} variant="outline" className="w-full">Share Profile</Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Share Profile</h2>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Profile Link</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`${window.location.origin}/guest/instructors/${instructor.id}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                    />
                    <Button onClick={copyShareLink} size="sm">Copy</Button>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    📘 Facebook
                  </button>
                  <button className="flex-1 p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition">
                    🐦 Twitter
                  </button>
                  <button className="flex-1 p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition">
                    💼 LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}