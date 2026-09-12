'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import Link from 'next/link';
import { coursesService } from '@/services';
import { Course } from '@/types';

function GuestCoursesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Load courses from service
  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await coursesService().getCourses({
          status: 'PUBLISHED',
          category: selectedCategory || undefined,
          level: selectedLevel as any || undefined,
          pagination: { page: currentPage, pageSize: 12 },
        });
        setCourses(response.data);
        setTotal(response.total);
      } catch (error) {
        console.error('Failed to load courses:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourses();
  }, [selectedCategory, selectedLevel, currentPage]);

  // Update selected category when URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const categories = [
    { name: 'Development', count: 2450, icon: '💻' },
    { name: 'Data Science', count: 890, icon: '📊' },
    { name: 'Design', count: 650, icon: '🎨' },
    { name: 'Business', count: 520, icon: '💼' },
    { name: 'Marketing', count: 380, icon: '📱' },
    { name: 'Photography', count: 290, icon: '📷' },
  ];

  // Filter courses based on selections (client-side filtering for search)
  const filteredCourses = courses.filter(course => {
    if (selectedPrice === 'free' && course.price !== 0) return false;
    if (selectedPrice === 'paid' && course.price === 0) return false;
    if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (selectedSort) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return b.students - a.students;
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the filter function
    console.log('Searching for:', searchTerm);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[var(--joyedu-primary-600)] to-[var(--joyedu-primary-700)] text-white py-16">
          <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Courses</h1>
              <p className="text-xl text-[var(--joyedu-primary-100)] mb-8">
                Discover thousands of courses from expert instructors worldwide
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search courses, skills, topics..."
                    className="w-full px-6 py-4 rounded-lg text-[var(--joyedu-text-primary)] focus:ring-2 focus:ring-[var(--joyedu-primary-300)] bg-[var(--joyedu-surface-1)]"
                  />
                  <button type="submit" className="absolute right-2 top-2 px-4 py-2 bg-[var(--joyedu-primary)] text-white rounded hover:bg-[var(--joyedu-primary-hover)] transition">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 max-w-[var(--joyedu-container-2xl)]">
          <div className="max-w-7xl mx-auto">
            {/* Categories */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--joyedu-text-primary)]">Browse by Category</h2>
                <Link href="/guest/categories" className="text-[var(--joyedu-primary)] hover:underline text-sm font-medium">
                  View All Categories →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`bg-[var(--joyedu-surface-1)] p-4 rounded-lg shadow-[var(--joyedu-shadow-sm)] hover:shadow-[var(--joyedu-shadow-md)] transition text-center cursor-pointer ${
                      selectedCategory === cat.name ? 'ring-2 ring-[var(--joyedu-primary-500)]' : ''
                    }`}
                  >
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">{cat.name}</div>
                    <div className="text-xs text-[var(--joyedu-text-muted)]">{cat.count} courses</div>
                  </button>
                ))}
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="bg-[var(--joyedu-bg-tertiary)] p-4 rounded-lg shadow-[var(--joyedu-shadow-sm)] hover:shadow-[var(--joyedu-shadow-md)] transition text-center cursor-pointer"
                  >
                    <div className="text-3xl mb-2">✕</div>
                    <div className="font-medium text-sm text-[var(--joyedu-text-primary)]">Clear</div>
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardBody>
                <div className="flex flex-col md:flex-row gap-4">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                  >
                    <option value="">All Categories</option>
                    <option value="development">Development</option>
                    <option value="data science">Data Science</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="photography">Photography</option>
                  </select>
                  <select 
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                  >
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <select 
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <select 
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                  >
                    <option value="">All Prices</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </CardBody>
            </Card>

            {/* Course Grid */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[var(--joyedu-text-primary)]">
                  {selectedCategory ? `${selectedCategory} Courses` : 'All Courses'}
                </h2>
                <div className="text-[var(--joyedu-text-secondary)]">Showing {sortedCourses.length} of {total} courses</div>
              </div>

              {isLoading ? (
                <div className="text-center py-12 text-[var(--joyedu-text-muted)]">Loading courses...</div>
              ) : sortedCourses.length === 0 ? (
                <div className="text-center py-12 text-[var(--joyedu-text-muted)]">No courses found matching your criteria.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedCourses.map((course) => (
                    <Link key={course.id} href={`/guest/courses/${course.id}`} className="block">
                      <Card className="hover:shadow-lg transition overflow-hidden">
                        <div className="relative h-48">
                          <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          {course.price === 0 && (
                            <div className="absolute top-4 right-4">
                              <Badge variant="success">Free</Badge>
                            </div>
                          )}
                        </div>
                        <CardBody>
                          <span className="text-xs font-medium text-[var(--joyedu-primary)] uppercase tracking-wide">{course.category}</span>
                          <h3 className="font-bold text-lg mt-2 mb-2 line-clamp-2 text-[var(--joyedu-text-primary)]">{course.title}</h3>
                          <p className="text-[var(--joyedu-text-secondary)] text-sm mb-4">{course.instructor}</p>
                          <div className="flex items-center gap-4 text-sm text-[var(--joyedu-text-muted)] mb-4">
                            <div className="flex items-center gap-1">
                              <span className="text-[var(--joyedu-warning)]">★</span>
                              <span className="font-medium">{course.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{course.students.toLocaleString()} students</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold text-[var(--joyedu-primary)]">
                                {course.price === 0 ? 'Free' : `$${course.price}`}
                              </span>
                            </div>
                            <span className="text-sm text-[var(--joyedu-text-muted)]">{course.level} • {course.duration}</span>
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!isLoading && sortedCourses.length > 0 && (
                <div className="flex justify-center mt-12 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {[1, 2, 3].map((page) => (
                    <Button 
                      key={page}
                      variant={page === currentPage ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <span className="px-3 py-2">...</span>
                  <Button variant="outline" size="sm">{Math.ceil(total / 12)}</Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function GuestCoursesPage() {
  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <GuestCoursesContent />
    </Suspense>
  );
}