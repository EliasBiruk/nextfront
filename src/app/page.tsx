import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--joyedu-primary-600)] via-[var(--joyedu-primary-700)] to-[var(--joyedu-primary-800)]"></div>
        
        {/* Cinematic Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop')] bg-cover bg-center bg-no-repeat opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--joyedu-primary-600)]/90 via-[var(--joyedu-primary-700)]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--joyedu-primary-600)]/90 via-transparent to-[var(--joyedu-primary-900)]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-[var(--joyedu-primary-600)]/95 via-[var(--joyedu-primary-700)]/60 to-transparent"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[var(--joyedu-primary-400)]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-40 w-64 h-64 bg-[var(--joyedu-accent-400)]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-60 w-48 h-48 bg-[var(--joyedu-accent-400)]/10 rounded-full blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left z-10">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                Learn. Teach. Grow.
              </h1>
              <p className="text-xl md:text-2xl text-[var(--joyedu-primary-100)] mb-8 max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
                One platform for modern learning, teaching, and education management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/guest/courses" 
                  className="px-8 py-4 bg-[var(--joyedu-surface-1)] text-[var(--joyedu-primary-700)] rounded-lg font-semibold hover:bg-[var(--joyedu-primary-50)] transition shadow-[var(--joyedu-shadow-lg)] text-lg transform hover:scale-105"
                >
                  Start Learning
                </Link>
                <Link 
                  href="/guest/courses" 
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition text-lg transform hover:scale-105"
                >
                  Explore Courses
                </Link>
              </div>
              
              {/* Stats */}
              <div className="mt-12 flex justify-center lg:justify-start gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white drop-shadow-md">125K+</div>
                  <div className="text-sm text-[var(--joyedu-primary-200)]">Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white drop-shadow-md">8.5K+</div>
                  <div className="text-sm text-[var(--joyedu-primary-200)]">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white drop-shadow-md">15K+</div>
                  <div className="text-sm text-[var(--joyedu-primary-200)]">Instructors</div>
                </div>
              </div>
            </div>
            
            {/* Integrated Visual - Desktop Only */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Blended Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=1000&fit=crop"
                    alt="Students learning together"
                    className="w-full h-[600px] object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--joyedu-primary-900)]/40 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--joyedu-primary-900)]/30 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">✓</div>
                    <div>
                      <div className="font-semibold text-white">Active</div>
                      <div className="text-xs text-[var(--joyedu-primary-200)]">Learning Now</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--joyedu-warning-500)] rounded-full flex items-center justify-center text-xl">🎓</div>
                    <div>
                      <div className="font-semibold text-white">Certified</div>
                      <div className="text-xs text-[var(--joyedu-primary-200)]">Courses</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Hero Visual */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 h-48 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop"
            alt="Students learning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--joyedu-primary-900)]/80 to-transparent"></div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-[var(--joyedu-surface-1)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-4">What can you do on JoyEdu?</h2>
            <p className="text-xl text-[var(--joyedu-text-secondary)] max-w-2xl mx-auto">
              Whether you want to learn, teach, or manage an entire school, JoyEdu has everything you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--joyedu-primary-100)] rounded-2xl flex items-center justify-center text-3xl group-hover:bg-[var(--joyedu-primary-200)] transition">
                🎓
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--joyedu-text-primary)]">Learn</h3>
              <p className="text-[var(--joyedu-text-secondary)]">Access thousands of courses from expert instructors worldwide</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--joyedu-success-100)] rounded-2xl flex items-center justify-center text-3xl group-hover:bg-[var(--joyedu-success-200)] transition">
                💻
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--joyedu-text-primary)]">Practice</h3>
              <p className="text-[var(--joyedu-text-secondary)]">Build real projects with interactive coding exercises</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--joyedu-accent-100)] rounded-2xl flex items-center justify-center text-3xl group-hover:bg-[var(--joyedu-accent-200)] transition">
                🎖️
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--joyedu-text-primary)]">Earn Certificates</h3>
              <p className="text-[var(--joyedu-text-secondary)]">Get recognized for your achievements with verified certificates</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--joyedu-warning-100)] rounded-2xl flex items-center justify-center text-3xl group-hover:bg-[var(--joyedu-warning-200)] transition">
                🏫
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--joyedu-text-primary)]">Manage Schools</h3>
              <p className="text-[var(--joyedu-text-secondary)]">Complete school management system for institutions</p>
            </div>
          </div>

          {/* Exam System Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--joyedu-error-100)] rounded-2xl flex items-center justify-center text-3xl group-hover:bg-[var(--joyedu-error-200)] transition">
                📝
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--joyedu-text-primary)]">Exit Exams</h3>
              <p className="text-[var(--joyedu-text-secondary)]">University exit exams and ministry examinations for higher education</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--joyedu-info-bg)] rounded-2xl flex items-center justify-center text-3xl group-hover:bg-[var(--joyedu-info-200)] transition">
                🎯
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--joyedu-text-primary)]">Entrance Exams</h3>
              <p className="text-[var(--joyedu-text-secondary)]">8th and 12th grade entrance exam preparation with comprehensive testing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Discovery */}
      <section className="py-20 bg-[var(--joyedu-bg-secondary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-4">Explore Popular Courses</h2>
            <p className="text-xl text-[var(--joyedu-text-secondary)]">Start learning in-demand skills from industry experts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: 'Complete Web Development Bootcamp',
                instructor: 'Dr. Sarah Johnson',
                rating: 4.8,
                students: 12500,
                price: '$49.99',
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
                category: 'Development',
                level: 'Beginner',
                duration: '42 hours'
              },
              {
                title: 'Data Science with Python',
                instructor: 'Prof. Michael Chen',
                rating: 4.9,
                students: 8900,
                price: '$59.99',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
                category: 'Data Science',
                level: 'Intermediate',
                duration: '38 hours'
              },
              {
                title: 'UI/UX Design Masterclass',
                instructor: 'Emma Williams',
                rating: 4.7,
                students: 6200,
                price: '$39.99',
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
                category: 'Design',
                level: 'Beginner',
                duration: '28 hours'
              },
            ].map((course) => (
              <Link key={course.title} href="/guest/courses" className="block">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
                  <div className="h-48 relative">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">{course.category}</span>
                    <h3 className="font-bold text-lg mt-2 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.instructor}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[var(--joyedu-primary)]">{course.price}</span>
                      <span className="text-sm text-[var(--joyedu-text-muted)]">{course.level} • {course.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/guest/courses" 
              className="inline-block px-8 py-3 bg-[var(--joyedu-primary)] text-white rounded-lg font-semibold hover:bg-[var(--joyedu-primary-hover)] transition shadow-[var(--joyedu-shadow-sm)]"
            >
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Experience */}
      <section className="py-20 bg-[var(--joyedu-surface-1)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-6">Learn at your own pace</h2>
              <p className="text-xl text-[var(--joyedu-text-secondary)] mb-8">
                JoyEdu is more than just video tutorials. Get a complete learning experience designed to help you master new skills.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: '🎬', title: 'Video Lessons', desc: 'High-quality video content from expert instructors' },
                  { icon: '📝', title: 'Interactive Quizzes', desc: 'Test your knowledge with built-in assessments' },
                  { icon: '💻', title: 'Hands-on Exercises', desc: 'Practice what you learn with coding challenges' },
                  { icon: '📊', title: 'Progress Tracking', desc: 'Monitor your learning journey with detailed analytics' },
                  { icon: '🎖️', title: 'Certificates', desc: 'Earn verified certificates upon completion' },
                  { icon: '📒', title: 'Personal Notes', desc: 'Take notes and highlight important concepts' },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-[var(--joyedu-text-primary)]">{feature.title}</h3>
                      <p className="text-[var(--joyedu-text-secondary)]">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-[var(--joyedu-shadow-2xl)]">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
                  alt="Student learning online"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[var(--joyedu-surface-1)] rounded-xl p-4 shadow-[var(--joyedu-shadow-xl)]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--joyedu-primary)]">8,500+</div>
                    <div className="text-xs text-[var(--joyedu-text-secondary)]">Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--joyedu-primary)]">15,000+</div>
                    <div className="text-xs text-[var(--joyedu-text-secondary)]">Instructors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Playground */}
      <section className="py-20 bg-[var(--joyedu-bg-tertiary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[var(--joyedu-text-primary)]">Learn by doing</h2>
              <p className="text-xl text-[var(--joyedu-text-secondary)] mb-8">
                Don't just watch tutorials. Build it yourself with our interactive coding playground.
              </p>
              
              <div className="mb-8">
                <p className="text-lg text-[var(--joyedu-text-secondary)] mb-4">Practice directly in your browser with:</p>
                <div className="grid grid-cols-2 gap-4">
                  {['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Node.js'].map((lang) => (
                    <div key={lang} className="flex items-center gap-3 px-4 py-3 bg-[var(--joyedu-bg-tertiary)] rounded-lg border border-[var(--joyedu-border-200)]">
                      <div className="w-8 h-8 bg-[var(--joyedu-primary)] rounded flex items-center justify-center text-sm font-bold text-white">
                        {lang[0]}
                      </div>
                      <span className="text-[var(--joyedu-text-primary)]">{lang}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                href="/playground" 
                className="inline-block px-8 py-4 bg-[var(--joyedu-primary)] text-white rounded-lg font-semibold hover:bg-[var(--joyedu-primary-hover)] transition shadow-[var(--joyedu-shadow-sm)]"
              >
                Try the Playground →
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop"
                  alt="Coding in browser"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="bg-[var(--joyedu-surface-1)]/95 rounded-lg p-4 w-full border border-[var(--joyedu-border-200)] backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-[var(--joyedu-error)] rounded-full"></div>
                    <div className="w-3 h-3 bg-[var(--joyedu-warning)] rounded-full"></div>
                    <div className="w-3 h-3 bg-[var(--joyedu-success)] rounded-full"></div>
                  </div>
                  <div className="text-sm text-[var(--joyedu-text-primary)] font-mono">
                    const playground = new JoyEduPlayground();
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification */}
      <section className="py-20 bg-[var(--joyedu-surface-1)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-4">Make progress feel rewarding</h2>
            <p className="text-xl text-[var(--joyedu-text-secondary)]">Stay motivated with gamified learning</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: '🔥', title: 'Learning Streaks', desc: 'Maintain momentum with daily learning' },
              { icon: '⭐', title: 'Points', desc: 'Earn points for completing activities' },
              { icon: '🏆', title: 'Achievements', desc: 'Unlock achievements for milestones' },
              { icon: '🎖️', title: 'Badges', desc: 'Collect badges for accomplishments' },
              { icon: '📈', title: 'Levels', desc: 'Progress through learning levels' },
              { icon: '🎁', title: 'Rewards', desc: 'Get rewards for your dedication' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-gradient-to-br from-[var(--joyedu-primary-50)] to-[var(--joyedu-accent-50)] rounded-xl hover:shadow-[var(--joyedu-shadow-lg)] transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-2 text-[var(--joyedu-text-primary)]">{item.title}</h3>
                <p className="text-sm text-[var(--joyedu-text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Students */}
      <section className="py-20 bg-[var(--joyedu-bg-secondary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-4">Everything you need to keep learning</h2>
              <p className="text-xl text-[var(--joyedu-text-secondary)] mb-8">
                A complete learning ecosystem designed for your success
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  'Personalized learning paths',
                  'Progress tracking and analytics',
                  'Interactive quizzes and exercises',
                  'Formal examinations',
                  'Personal notes and bookmarks',
                  'Achievement system',
                  'Verified certificates',
                  'Learning communities',
                  'Mobile learning access',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 p-4 bg-[var(--joyedu-surface-1)] rounded-lg shadow-[var(--joyedu-shadow-sm)]">
                    <div className="w-6 h-6 bg-[var(--joyedu-success)] rounded-full flex items-center justify-center text-white text-sm">✓</div>
                    <span className="text-[var(--joyedu-text-primary)]">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/auth/signup" 
                className="inline-block px-8 py-4 bg-[var(--joyedu-primary)] text-white rounded-lg font-semibold hover:bg-[var(--joyedu-primary-hover)] transition shadow-[var(--joyedu-shadow-sm)]"
              >
                Start Learning Today
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop"
                  alt="Student studying"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Instructors */}
      <section className="py-20 bg-[var(--joyedu-surface-1)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-[var(--joyedu-shadow-2xl)]">
                  <img 
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
                    alt="Instructor teaching"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[var(--joyedu-success)] text-white rounded-xl p-4 shadow-[var(--joyedu-shadow-xl)]">
                  <div className="text-center">
                    <div className="text-2xl font-bold">15,000+</div>
                    <div className="text-sm">Instructors</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-6">Share what you know</h2>
              <p className="text-xl text-[var(--joyedu-text-secondary)] mb-8">
                Turn your expertise into courses and reach students worldwide. Build your teaching business with JoyEdu.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: '📚', title: 'Course Builder', desc: 'Create structured courses with lessons, quizzes, and exercises' },
                  { icon: '📊', title: 'Student Analytics', desc: 'Track student progress and engagement' },
                  { icon: '💰', title: 'Revenue Tracking', desc: 'Monitor your earnings and payout schedule' },
                  { icon: '🌍', title: 'Global Reach', desc: 'Teach students from around the world' },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-[var(--joyedu-text-primary)]">{feature.title}</h3>
                      <p className="text-[var(--joyedu-text-secondary)]">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link 
                href="/auth/signup" 
                className="inline-block px-8 py-4 bg-[var(--joyedu-success)] text-white rounded-lg font-semibold hover:bg-[var(--joyedu-success-hover)] transition shadow-[var(--joyedu-shadow-sm)]"
              >
                Become an Instructor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Schools */}
      <section className="py-20 bg-[var(--joyedu-bg-tertiary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-[var(--joyedu-text-primary)]">Your school. One connected platform.</h2>
              <p className="text-xl text-[var(--joyedu-text-secondary)] mb-8 max-w-2xl">
                Manage learning and school operations from one place with JoyEdu's complete school management system.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  'Students & Admissions',
                  'Teachers & Staff',
                  'Attendance & Timetable',
                  'Assignments & Gradebook',
                  'Exams & Results',
                  'Finance & Fees',
                  'Library & Resources',
                  'Communication',
                ].map((feature) => (
                  <div key={feature} className="text-center p-6 bg-[var(--joyedu-surface-1)] rounded-xl border border-[var(--joyedu-border-200)] shadow-[var(--joyedu-shadow-sm)]">
                    <div className="text-3xl mb-2">📋</div>
                    <div className="font-medium text-[var(--joyedu-text-primary)]">{feature}</div>
                  </div>
                ))}
              </div>

              <Link 
                href="/guest/schools" 
                className="inline-block px-8 py-4 bg-[var(--joyedu-accent)] text-white rounded-lg font-semibold hover:bg-[var(--joyedu-accent-700)] transition shadow-[var(--joyedu-shadow-sm)]"
              >
                Explore JoyEdu for Schools
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop"
                  alt="Modern classroom"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[var(--joyedu-warning)] text-white rounded-xl p-4 shadow-[var(--joyedu-shadow-xl)]">
                <div className="text-center">
                  <div className="text-2xl font-bold">450+</div>
                  <div className="text-sm">Partner Schools</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-20 bg-[var(--joyedu-surface-1)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gradient-to-br from-[var(--joyedu-primary-600)] to-[var(--joyedu-accent-600)] rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-6xl mb-4">🎖️</div>
                <h3 className="text-2xl font-bold mb-2">Certificate of Completion</h3>
                <p className="text-[var(--joyedu-primary-100)] mb-4">This certifies that</p>
                <div className="text-xl font-semibold mb-4">John Smith</div>
                <p className="text-[var(--joyedu-primary-100)] mb-4">has successfully completed</p>
                <div className="text-lg font-semibold mb-4">Complete Web Development Bootcamp</div>
                <div className="flex justify-between text-sm text-[var(--joyedu-primary-200)]">
                  <span>Issued: September 1, 2026</span>
                  <span>ID: CERT-2024-12345</span>
                </div>
                <div className="mt-6 inline-block px-4 py-2 bg-white/20 rounded-full text-sm">
                  ✓ Verified
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-6">Learn it. Complete it. Prove it.</h2>
              <p className="text-xl text-[var(--joyedu-text-secondary)] mb-8">
                Earn JoyEdu certificates when you complete your learning goals. Get recognized for your skills and advance your career.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: '✓', title: 'Course Completion', desc: 'Complete all lessons and pass assessments' },
                  { icon: '✓', title: 'Skill Verification', desc: 'Demonstrate your practical skills' },
                  { icon: '✓', title: 'Shareable Credentials', desc: 'Add certificates to LinkedIn and resume' },
                  { icon: '✓', title: 'Lifetime Access', desc: 'Access your certificates anytime' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="text-2xl text-[var(--joyedu-success)]">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-[var(--joyedu-text-primary)]">{item.title}</h3>
                      <p className="text-[var(--joyedu-text-secondary)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link 
                href="/certificates" 
                className="inline-block px-8 py-4 bg-[var(--joyedu-primary)] text-white rounded-lg font-semibold hover:bg-[var(--joyedu-primary-hover)] transition shadow-[var(--joyedu-shadow-sm)]"
              >
                View Sample Certificates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-[var(--joyedu-bg-secondary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-[var(--joyedu-text-secondary)] max-w-2xl mx-auto">
              Choose the plan that works best for you. Start free, upgrade when you're ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-[var(--joyedu-surface-1)] rounded-2xl shadow-[var(--joyedu-shadow-lg)] p-8 border border-[var(--joyedu-border-200)]">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-[var(--joyedu-text-primary)]">Free</h3>
                <div className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-2">$0</div>
                <p className="text-[var(--joyedu-text-secondary)]">Perfect for getting started</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-success)]">✓</span>
                  <span className="text-[var(--joyedu-text-primary)]">Access to free courses</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-success)]">✓</span>
                  <span className="text-[var(--joyedu-text-primary)]">Basic playground access</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-success)]">✓</span>
                  <span className="text-[var(--joyedu-text-primary)]">Community support</span>
                </li>
                <li className="flex items-center gap-3 text-[var(--joyedu-text-muted)]">
                  <span>✗</span>
                  <span>Premium courses</span>
                </li>
                <li className="flex items-center gap-3 text-[var(--joyedu-text-muted)]">
                  <span>✗</span>
                  <span>Certificates</span>
                </li>
                <li className="flex items-center gap-3 text-[var(--joyedu-text-muted)]">
                  <span>✗</span>
                  <span>Priority support</span>
                </li>
              </ul>

              <Link 
                href="/auth/signup" 
                className="block w-full text-center px-6 py-3 border-2 border-[var(--joyedu-primary)] text-[var(--joyedu-primary)] rounded-lg font-semibold hover:bg-[var(--joyedu-primary-50)] transition"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-[var(--joyedu-primary-600)] to-[var(--joyedu-primary-700)] rounded-2xl shadow-[var(--joyedu-shadow-lg)] p-8 text-white transform scale-105">
              <div className="text-center mb-8">
                <div className="inline-block px-3 py-1 bg-[var(--joyedu-warning)] text-[var(--joyedu-warning-900)] rounded-full text-sm font-semibold mb-4">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-2">$19<span className="text-lg font-normal">/month</span></div>
                <p className="text-[var(--joyedu-primary-100)]">For serious learners</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-warning)]">✓</span>
                  <span>All free features</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-warning)]">✓</span>
                  <span>Unlimited courses</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-warning)]">✓</span>
                  <span>Verified certificates</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-warning)]">✓</span>
                  <span>Advanced playground</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-warning)]">✓</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-warning)]">✓</span>
                  <span>Offline access</span>
                </li>
              </ul>

              <Link 
                href="/auth/signup" 
                className="block w-full text-center px-6 py-3 bg-[var(--joyedu-surface-1)] text-[var(--joyedu-primary)] rounded-lg font-semibold hover:bg-[var(--joyedu-primary-50)] transition"
              >
                Start Pro Trial
              </Link>
            </div>

            {/* School Plan */}
            <div className="bg-[var(--joyedu-surface-1)] rounded-2xl shadow-[var(--joyedu-shadow-lg)] p-8 border border-[var(--joyedu-border-200)]">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-[var(--joyedu-text-primary)]">School</h3>
                <div className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-2">Custom</div>
                <p className="text-[var(--joyedu-text-secondary)]">For institutions</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-success)]">✓</span>
                  <span className="text-[var(--joyedu-text-primary)]">Complete school ERP</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-success)]">✓</span>
                  <span className="text-[var(--joyedu-text-primary)]">Student management</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-success)]">✓</span>
                  <span className="text-[var(--joyedu-text-primary)]">Academic tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-success)]">✓</span>
                  <span className="text-[var(--joyedu-text-primary)]">Exam system</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-success)]">✓</span>
                  <span className="text-[var(--joyedu-text-primary)]">Dedicated support</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--joyedu-success)]">✓</span>
                  <span className="text-[var(--joyedu-text-primary)]">Custom integrations</span>
                </li>
              </ul>

              <Link 
                href="/contact" 
                className="block w-full text-center px-6 py-3 border-2 border-[var(--joyedu-warning)] text-[var(--joyedu-warning)] rounded-lg font-semibold hover:bg-[var(--joyedu-warning-50)] transition"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[var(--joyedu-primary-600)] to-[var(--joyedu-primary-700)] text-white">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] text-center">
          <h2 className="text-4xl font-bold mb-4">Your next step starts here</h2>
          <p className="text-xl text-[var(--joyedu-primary-100)] mb-8 max-w-2xl mx-auto">
            Learn something new. Teach something valuable. Build a better education experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup" 
              className="px-8 py-4 bg-[var(--joyedu-surface-1)] text-[var(--joyedu-primary-700)] rounded-lg font-semibold hover:bg-[var(--joyedu-primary-50)] transition shadow-[var(--joyedu-shadow-sm)]"
            >
              Get Started Free
            </Link>
            <Link 
              href="/guest/courses" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}