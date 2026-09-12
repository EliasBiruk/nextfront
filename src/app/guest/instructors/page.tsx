import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

export default function GuestInstructorsPage() {
  const instructors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior Software Engineer',
      expertise: 'Web Development, React, JavaScript',
      courses: 12,
      students: 45000,
      rating: 4.8,
      avatar: '👩‍💼',
      bio: 'Former Google engineer with 10+ years of experience in web development. Passionate about teaching complex concepts in simple ways.',
      verified: true
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      title: 'Data Science Professor',
      expertise: 'Python, Machine Learning, Statistics',
      courses: 8,
      students: 32000,
      rating: 4.9,
      avatar: '👨‍🏫',
      bio: 'Stanford Ph.D. in Computer Science. Published researcher in machine learning and artificial intelligence.',
      verified: true
    },
    {
      id: 3,
      name: 'Emma Williams',
      title: 'Senior UX Designer',
      expertise: 'UI/UX Design, User Research, Prototyping',
      courses: 6,
      students: 18000,
      rating: 4.7,
      avatar: '👩‍🎨',
      bio: 'Lead UX designer at Fortune 500 companies. Expert in creating intuitive and accessible user experiences.',
      verified: true
    },
    {
      id: 4,
      name: 'James Anderson',
      title: 'Digital Marketing Expert',
      expertise: 'SEO, Social Media, Content Marketing',
      courses: 9,
      students: 25000,
      rating: 4.6,
      avatar: '👨‍💼',
      bio: 'Helped 500+ businesses grow their online presence. Google certified digital marketing specialist.',
      verified: true
    },
    {
      id: 5,
      name: 'Dr. Lisa Park',
      title: 'AI Research Scientist',
      expertise: 'Machine Learning, Deep Learning, NLP',
      courses: 5,
      students: 15000,
      rating: 4.8,
      avatar: '👩‍🔬',
      bio: 'MIT graduate specializing in natural language processing. Published author in top AI conferences.',
      verified: true
    },
    {
      id: 6,
      name: 'Tom Richards',
      title: 'Professional Photographer',
      expertise: 'Portrait, Landscape, Product Photography',
      courses: 4,
      students: 12000,
      rating: 4.5,
      avatar: '👨‍📷',
      bio: 'Award-winning photographer with work featured in National Geographic and Vogue.',
      verified: false
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[var(--joyedu-success-600)] to-[var(--joyedu-success-700)] text-white py-16">
          <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Learn from the Best</h1>
              <p className="text-xl text-[var(--joyedu-success-100)] mb-8">
                Connect with 15,000+ expert instructors from around the world
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/guest/apply-instructor" className="px-8 py-3 bg-[var(--joyedu-surface-1)] text-[var(--joyedu-success-700)] rounded-lg font-semibold hover:bg-[var(--joyedu-success-50)] transition shadow-[var(--joyedu-shadow-sm)]">
                  Become an Instructor
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-12">
          <div className="max-w-7xl mx-auto">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                <div className="text-3xl font-bold text-[var(--joyedu-success)] mb-2">15,000+</div>
                <div className="text-[var(--joyedu-text-secondary)]">Instructors</div>
              </div>
              <div className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                <div className="text-3xl font-bold text-[var(--joyedu-success)] mb-2">8,500+</div>
                <div className="text-[var(--joyedu-text-secondary)]">Courses</div>
              </div>
              <div className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                <div className="text-3xl font-bold text-[var(--joyedu-success)] mb-2">180+</div>
                <div className="text-[var(--joyedu-text-secondary)]">Countries</div>
              </div>
              <div className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                <div className="text-3xl font-bold text-[var(--joyedu-success)] mb-2">4.8</div>
                <div className="text-[var(--joyedu-text-secondary)]">Avg. Rating</div>
              </div>
            </div>

            {/* Instructor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructors.map((instructor) => (
                <Link key={instructor.id} href={`/guest/instructors/${instructor.id}`} className="block">
                  <Card className="hover:shadow-[var(--joyedu-shadow-lg)] transition">
                    <CardBody>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-5xl">{instructor.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-[var(--joyedu-text-primary)]">{instructor.name}</h3>
                            {instructor.verified && (
                              <span className="text-[var(--joyedu-primary)]" title="Verified Instructor">✓</span>
                            )}
                          </div>
                          <p className="text-[var(--joyedu-text-secondary)] text-sm">{instructor.title}</p>
                        </div>
                      </div>
                      
                      <p className="text-[var(--joyedu-text-secondary)] text-sm mb-4 line-clamp-2">{instructor.bio}</p>
                      
                      <div className="text-sm text-[var(--joyedu-primary)] font-medium mb-4">
                        {instructor.expertise}
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center mb-4">
                        <div>
                          <div className="font-bold text-[var(--joyedu-text-primary)]">{instructor.courses}</div>
                          <div className="text-xs text-[var(--joyedu-text-muted)]">Courses</div>
                        </div>
                        <div>
                          <div className="font-bold text-[var(--joyedu-text-primary)]">{(instructor.students / 1000).toFixed(0)}k</div>
                          <div className="text-xs text-[var(--joyedu-text-muted)]">Students</div>
                        </div>
                        <div>
                          <div className="font-bold text-[var(--joyedu-text-primary)]">{instructor.rating}</div>
                          <div className="text-xs text-[var(--joyedu-text-muted)]">Rating</div>
                        </div>
                      </div>

                      <Button className="w-full">View Profile</Button>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-r from-[var(--joyedu-success-50)] to-[var(--joyedu-success-100)] border-[var(--joyedu-success-200)]">
                <CardBody className="py-12">
                  <h2 className="text-2xl font-bold mb-4 text-[var(--joyedu-text-primary)]">Share Your Expertise</h2>
                  <p className="text-[var(--joyedu-text-secondary)] mb-6 max-w-2xl mx-auto">
                    Join thousands of instructors who are teaching what they love and earning money on JoyEdu.
                  </p>
                  <Link href="/guest/apply-instructor" className="inline-block px-8 py-3 bg-[var(--joyedu-success)] text-white rounded-lg font-semibold hover:bg-[var(--joyedu-success-700)] transition shadow-[var(--joyedu-shadow-sm)]">
                    Become an Instructor
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