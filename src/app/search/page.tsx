import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[var(--joyedu-text-primary)] mb-2">Search JoyEdu</h1>
              <p className="text-[var(--joyedu-text-secondary)]">Find courses, instructors, schools, and more</p>
            </div>

            {/* Search Bar */}
            <Card className="mb-6">
              <CardBody>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Search for courses, instructors, schools..."
                    className="flex-1 px-4 py-3 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                  />
                  <select className="px-4 py-3 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]">
                    <option value="all">All</option>
                    <option value="courses">Courses</option>
                    <option value="instructors">Instructors</option>
                    <option value="schools">Schools</option>
                  </select>
                  <button className="px-6 py-3 bg-[var(--joyedu-primary)] text-white rounded-lg hover:bg-[var(--joyedu-primary-hover)] transition">
                    Search
                  </button>
                </div>
              </CardBody>
            </Card>

            {/* Search Results */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--joyedu-text-primary)] mb-4">Search Results</h2>
              <div className="space-y-4">
                {[
                  {
                    type: 'Course',
                    title: 'Complete Web Development Bootcamp',
                    description: 'Learn HTML, CSS, JavaScript, and more from scratch',
                    url: '/guest/courses'
                  },
                  {
                    type: 'Instructor',
                    title: 'Dr. Sarah Johnson',
                    description: 'Web Development expert with 15+ years experience',
                    url: '/guest/instructors'
                  },
                  {
                    type: 'School',
                    title: 'Tech University',
                    description: 'Leading technology-focused institution',
                    url: '/guest/schools'
                  },
                ].map((result) => (
                  <Card key={result.title} className="hover:shadow-[var(--joyedu-shadow-md)] transition cursor-pointer">
                    <CardBody>
                      <div className="flex items-start gap-4">
                        <Badge variant="info">{result.type}</Badge>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-[var(--joyedu-text-primary)]">{result.title}</h3>
                          <p className="text-[var(--joyedu-text-secondary)]">{result.description}</p>
                        </div>
                        <span className="text-[var(--joyedu-text-muted)]">→</span>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>

            {/* No Results State */}
            <Card className="mt-6">
              <CardBody className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-[var(--joyedu-text-primary)] mb-2">No Results Found</h3>
                <p className="text-[var(--joyedu-text-secondary)]">Try different keywords or browse our categories</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}