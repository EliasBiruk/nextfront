import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Link from 'next/link';

export default function Help() {
  const faqs = [
    {
      question: 'How do I get started with JoyEdu?',
      answer: 'Simply create a free account, browse our course catalog, and enroll in courses that interest you. You can start learning immediately after enrollment.'
    },
    {
      question: 'Can I access courses offline?',
      answer: 'Yes! With our mobile app, you can download courses for offline viewing. This feature is available for all enrolled courses.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.'
    },
    {
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'Yes, we offer a 30-day money-back guarantee for most courses. Contact our support team if you need to request a refund.'
    },
    {
      question: 'How do I become an instructor?',
      answer: 'Click "Become an Instructor" on our homepage, complete the instructor application, and submit your course for review. Once approved, you can start teaching!'
    },
    {
      question: 'Is JoyEdu suitable for schools?',
      answer: 'Absolutely! JoyEdu offers a comprehensive school management system including student tracking, gradebook, attendance, finance, and more. Contact us for a demo.'
    },
    {
      question: 'Are certificates verified?',
      answer: 'Yes, all JoyEdu certificates are verified and can be shared on LinkedIn or included in your resume. Employers can verify certificates through our verification system.'
    },
    {
      question: 'What if I need technical support?',
      answer: 'Our support team is available 24/7 through email and live chat. You can also find answers in our comprehensive help documentation.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-8">Help Center</h1>
            
            {/* Search */}
            <Card className="mb-8">
              <CardBody>
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full px-4 py-3 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                />
              </CardBody>
            </Card>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Link href="/guest/courses" className="block">
                <Card className="hover:shadow-[var(--joyedu-shadow-lg)] transition">
                  <CardBody className="text-center">
                    <div className="text-3xl mb-2">📚</div>
                    <h3 className="font-semibold text-[var(--joyedu-text-primary)]">Browse Courses</h3>
                  </CardBody>
                </Card>
              </Link>
              <Link href="/contact" className="block">
                <Card className="hover:shadow-[var(--joyedu-shadow-lg)] transition">
                  <CardBody className="text-center">
                    <div className="text-3xl mb-2">💬</div>
                    <h3 className="font-semibold text-[var(--joyedu-text-primary)]">Contact Support</h3>
                  </CardBody>
                </Card>
              </Link>
              <Link href="/auth/signup" className="block">
                <Card className="hover:shadow-[var(--joyedu-shadow-lg)] transition">
                  <CardBody className="text-center">
                    <div className="text-3xl mb-2">👤</div>
                    <h3 className="font-semibold text-[var(--joyedu-text-primary)]">Create Account</h3>
                  </CardBody>
                </Card>
              </Link>
            </div>

            {/* FAQ */}
            <Card>
              <CardBody>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-[var(--joyedu-border-200)] pb-4 last:border-0">
                      <h3 className="font-semibold text-lg mb-2 text-[var(--joyedu-text-primary)]">{faq.question}</h3>
                      <p className="text-[var(--joyedu-text-secondary)]">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* More Help */}
            <div className="mt-8 text-center">
              <Card className="bg-blue-50 border-blue-200">
                <CardBody className="py-8">
                  <h2 className="text-xl font-bold mb-2">Still need help?</h2>
                  <p className="text-gray-600 mb-4">Our support team is here to assist you.</p>
                  <Link href="/contact" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                    Contact Support
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
