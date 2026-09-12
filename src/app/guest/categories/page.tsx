import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function GuestCategoriesPage() {
  const categories = [
    { 
      name: 'Development', 
      count: 2450, 
      icon: '💻',
      description: 'Web development, mobile apps, software engineering, and more',
      subcategories: ['Web Development', 'Mobile Development', 'Data Science', 'DevOps', 'Game Development']
    },
    { 
      name: 'Business', 
      count: 520, 
      icon: '💼',
      description: 'Finance, marketing, management, entrepreneurship, and leadership',
      subcategories: ['Finance', 'Marketing', 'Management', 'Entrepreneurship', 'Project Management']
    },
    { 
      name: 'Design', 
      count: 650, 
      icon: '🎨',
      description: 'UI/UX design, graphic design, illustration, and animation',
      subcategories: ['UI/UX Design', 'Graphic Design', 'Illustration', 'Animation', 'Fashion Design']
    },
    { 
      name: 'Marketing', 
      count: 380, 
      icon: '📱',
      description: 'Digital marketing, social media, SEO, and content marketing',
      subcategories: ['Digital Marketing', 'Social Media', 'SEO', 'Content Marketing', 'Email Marketing']
    },
    { 
      name: 'Photography', 
      count: 290, 
      icon: '📷',
      description: 'Portrait, landscape, product, and professional photography',
      subcategories: ['Portrait', 'Landscape', 'Product', 'Wedding', 'Street Photography']
    },
    { 
      name: 'Music', 
      count: 340, 
      icon: '🎵',
      description: 'Music production, instruments, theory, and audio engineering',
      subcategories: ['Music Production', 'Guitar', 'Piano', 'Music Theory', 'Audio Engineering']
    },
    { 
      name: 'Health & Fitness', 
      count: 280, 
      icon: '💪',
      description: 'Fitness training, nutrition, yoga, and mental wellness',
      subcategories: ['Fitness', 'Nutrition', 'Yoga', 'Meditation', 'Personal Training']
    },
    { 
      name: 'Teaching', 
      count: 190, 
      icon: '📚',
      description: 'Teaching methods, classroom management, and educational technology',
      subcategories: ['Teaching Methods', 'Classroom Management', 'EdTech', 'Curriculum Design', 'Special Education']
    },
    { 
      name: 'Academic', 
      count: 420, 
      icon: '🎓',
      description: 'Mathematics, science, languages, and academic subjects',
      subcategories: ['Mathematics', 'Science', 'Languages', 'History', 'Literature']
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[var(--joyedu-primary-600)] to-[var(--joyedu-primary-700)] text-white py-16">
          <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Categories</h1>
              <p className="text-xl text-[var(--joyedu-primary-100)] mb-8">
                Explore courses across 50+ categories
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-12">
          <div className="max-w-7xl mx-auto">
            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  href={`/guest/courses?category=${encodeURIComponent(category.name.toLowerCase())}`} 
                  className="block"
                >
                  <Card className="hover:shadow-[var(--joyedu-shadow-lg)] transition">
                    <CardBody>
                      <div className="flex items-start gap-4">
                        <div className="text-5xl">{category.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl mb-2 text-[var(--joyedu-text-primary)]">{category.name}</h3>
                          <p className="text-[var(--joyedu-text-secondary)] text-sm mb-3">{category.description}</p>
                          <div className="text-sm text-[var(--joyedu-primary)] font-medium mb-3">
                            {category.count} courses
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.subcategories.slice(0, 3).map((sub) => (
                              <span key={sub} className="text-xs bg-[var(--joyedu-bg-tertiary)] px-2 py-1 rounded text-[var(--joyedu-text-primary)]">
                                {sub}
                              </span>
                            ))}
                            {category.subcategories.length > 3 && (
                              <span className="text-xs text-[var(--joyedu-text-muted)]">+{category.subcategories.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}