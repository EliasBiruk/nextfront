import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

export default function GuestSchoolsPage() {
  const schools = [
    {
      id: 1,
      name: 'Springfield Academy',
      location: 'California, USA',
      students: 2450,
      teachers: 180,
      courses: 45,
      rating: 4.7,
      logo: '🏫',
      type: 'K-12',
      description: 'A premier K-12 institution providing world-class education with modern facilities and innovative teaching methods.',
      verified: true
    },
    {
      id: 2,
      name: 'Tech Institute of Silicon Valley',
      location: 'California, USA',
      students: 1800,
      teachers: 120,
      courses: 35,
      rating: 4.8,
      logo: '💻',
      type: 'Technical',
      description: 'Specialized technical education focusing on software engineering, data science, and emerging technologies.',
      verified: true
    },
    {
      id: 3,
      name: 'Global International School',
      location: 'Singapore',
      students: 3200,
      teachers: 220,
      courses: 60,
      rating: 4.9,
      logo: '🌍',
      type: 'International',
      description: 'Leading international school with diverse curriculum and global recognition for academic excellence.',
      verified: true
    },
    {
      id: 4,
      name: 'Creative Arts Academy',
      location: 'New York, USA',
      students: 950,
      teachers: 85,
      courses: 28,
      rating: 4.6,
      logo: '🎨',
      type: 'Arts',
      description: 'Dedicated to nurturing creative talent in visual arts, music, dance, and performing arts.',
      verified: true
    },
    {
      id: 5,
      name: 'Science & Technology Academy',
      location: 'London, UK',
      students: 1500,
      teachers: 110,
      courses: 40,
      rating: 4.7,
      logo: '🔬',
      type: 'STEM',
      description: 'Focus on STEM education with state-of-the-art laboratories and research opportunities.',
      verified: true
    },
    {
      id: 6,
      name: 'Language Institute',
      location: 'Berlin, Germany',
      students: 1200,
      teachers: 90,
      courses: 32,
      rating: 4.5,
      logo: '📚',
      type: 'Language',
      description: 'Specialized language education offering courses in 15+ languages with immersive learning experiences.',
      verified: false
    },
  ];

  const features = [
    { icon: '👥', title: 'Student Management', desc: 'Complete student information system' },
    { icon: '📚', title: 'Academic Management', desc: 'Curriculum, classes, and gradebook' },
    { icon: '📅', title: 'Attendance Tracking', desc: 'Automated attendance monitoring' },
    { icon: '💰', title: 'Finance & Fees', desc: 'Comprehensive financial management' },
    { icon: '📋', title: 'Assignments & Exams', desc: 'Assessment and evaluation tools' },
    { icon: '🏫', title: 'Library & Resources', desc: 'Digital library management' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[var(--joyedu-accent-600)] to-[var(--joyedu-accent-700)] text-white py-16">
          <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">JoyEdu for Schools</h1>
              <p className="text-xl text-[var(--joyedu-accent-100)] mb-8">
                Complete school management platform for modern educational institutions
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/auth/signup" className="px-8 py-3 bg-[var(--joyedu-surface-1)] text-[var(--joyedu-accent-700)] rounded-lg font-semibold hover:bg-[var(--joyedu-accent-50)] transition shadow-[var(--joyedu-shadow-sm)]">
                  Request a Demo
                </Link>
                <Link href="/guest/courses" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-12">
          <div className="max-w-7xl mx-auto">
            {/* Features */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-[var(--joyedu-text-primary)]">Everything Your School Needs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <div key={feature.title} className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h3 className="font-semibold text-lg mb-2 text-[var(--joyedu-text-primary)]">{feature.title}</h3>
                    <p className="text-[var(--joyedu-text-secondary)] text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                <div className="text-3xl font-bold text-[var(--joyedu-accent)] mb-2">450+</div>
                <div className="text-[var(--joyedu-text-secondary)]">Partner Schools</div>
              </div>
              <div className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                <div className="text-3xl font-bold text-[var(--joyedu-accent)] mb-2">1.2M+</div>
                <div className="text-[var(--joyedu-text-secondary)]">Students Managed</div>
              </div>
              <div className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                <div className="text-3xl font-bold text-[var(--joyedu-accent)] mb-2">23</div>
                <div className="text-[var(--joyedu-text-secondary)]">Countries</div>
              </div>
              <div className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                <div className="text-3xl font-bold text-[var(--joyedu-accent)] mb-2">99.9%</div>
                <div className="text-[var(--joyedu-text-secondary)]">Uptime</div>
              </div>
            </div>

            {/* School Grid */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[var(--joyedu-text-primary)]">Featured Schools</h2>
                <div className="flex gap-2">
                  <select className="px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]">
                    <option>All Types</option>
                    <option>K-12</option>
                    <option>Technical</option>
                    <option>International</option>
                    <option>Arts</option>
                  </select>
                  <select className="px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]">
                    <option>All Locations</option>
                    <option>USA</option>
                    <option>Europe</option>
                    <option>Asia</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map((school) => (
                  <Link key={school.id} href={`/guest/schools/${school.id}`} className="block">
                    <Card className="hover:shadow-[var(--joyedu-shadow-lg)] transition">
                      <CardBody>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="text-5xl">{school.logo}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg text-[var(--joyedu-text-primary)]">{school.name}</h3>
                              {school.verified && (
                                <span className="text-[var(--joyedu-primary)]" title="Verified School">✓</span>
                              )}
                            </div>
                            <p className="text-[var(--joyedu-text-secondary)] text-sm">{school.location}</p>
                            <span className="inline-block mt-2 text-xs bg-[var(--joyedu-accent-100)] text-[var(--joyedu-accent-700)] px-2 py-1 rounded">
                              {school.type}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-[var(--joyedu-text-secondary)] text-sm mb-4 line-clamp-2">{school.description}</p>

                        <div className="grid grid-cols-3 gap-4 text-center mb-4">
                          <div>
                            <div className="font-bold text-[var(--joyedu-text-primary)]">{(school.students / 1000).toFixed(1)}k</div>
                            <div className="text-xs text-[var(--joyedu-text-muted)]">Students</div>
                          </div>
                          <div>
                            <div className="font-bold text-[var(--joyedu-text-primary)]">{school.teachers}</div>
                            <div className="text-xs text-[var(--joyedu-text-muted)]">Teachers</div>
                          </div>
                          <div>
                            <div className="font-bold text-[var(--joyedu-text-primary)]">{school.rating}</div>
                            <div className="text-xs text-[var(--joyedu-text-muted)]">Rating</div>
                          </div>
                        </div>

                        <Button className="w-full">View School</Button>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-r from-[var(--joyedu-accent-50)] to-[var(--joyedu-accent-100)] border-[var(--joyedu-accent-200)]">
                <CardBody className="py-12">
                  <h2 className="text-2xl font-bold mb-4 text-[var(--joyedu-text-primary)]">Transform Your School Management</h2>
                  <p className="text-[var(--joyedu-text-secondary)] mb-6 max-w-2xl mx-auto">
                    Join 450+ schools using JoyEdu to streamline operations and improve educational outcomes.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link href="/auth/signup" className="inline-block px-8 py-3 bg-[var(--joyedu-accent)] text-white rounded-lg font-semibold hover:bg-[var(--joyedu-accent-700)] transition shadow-[var(--joyedu-shadow-sm)]">
                      Request a Demo
                    </Link>
                    <Link href="/guest/courses" className="inline-block px-8 py-3 border-2 border-[var(--joyedu-accent)] text-[var(--joyedu-accent)] rounded-lg font-semibold hover:bg-[var(--joyedu-accent-50)] transition">
                      Learn More
                    </Link>
                  </div>
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