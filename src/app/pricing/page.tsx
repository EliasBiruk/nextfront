import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--joyedu-primary-600)] to-[var(--joyedu-primary-700)] text-white py-20">
          <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-[var(--joyedu-primary-100)] max-w-2xl mx-auto">
              Choose the plan that works best for you. Start free, upgrade when you're ready.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-[var(--joyedu-bg-secondary)]">
          <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
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

        {/* School Pricing Details */}
        <section className="py-20 bg-[var(--joyedu-surface-1)]">
          <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[var(--joyedu-text-primary)] mb-4">School Pricing Tiers</h2>
              <p className="text-[var(--joyedu-text-secondary)] max-w-2xl mx-auto">
                Flexible pricing based on your institution size and needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardBody>
                  <CardTitle>Small School</CardTitle>
                  <div className="text-3xl font-bold text-[var(--joyedu-primary)] mb-2">$299<span className="text-lg font-normal text-[var(--joyedu-text-secondary)]">/month</span></div>
                  <p className="text-[var(--joyedu-text-secondary)] mb-4">Up to 500 students</p>
                  <ul className="space-y-2 text-sm text-[var(--joyedu-text-secondary)]">
                    <li>• Complete ERP system</li>
                    <li>• Basic analytics</li>
                    <li>• Email support</li>
                    <li>• Standard features</li>
                  </ul>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle>Medium School</CardTitle>
                  <div className="text-3xl font-bold text-[var(--joyedu-primary)] mb-2">$599<span className="text-lg font-normal text-[var(--joyedu-text-secondary)]">/month</span></div>
                  <p className="text-[var(--joyedu-text-secondary)] mb-4">Up to 2,000 students</p>
                  <ul className="space-y-2 text-sm text-[var(--joyedu-text-secondary)]">
                    <li>• All Small School features</li>
                    <li>• Advanced analytics</li>
                    <li>• Priority support</li>
                    <li>• Custom integrations</li>
                  </ul>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle>Large School</CardTitle>
                  <div className="text-3xl font-bold text-[var(--joyedu-primary)] mb-2">Custom</div>
                  <p className="text-[var(--joyedu-text-secondary)] mb-4">2,000+ students</p>
                  <ul className="space-y-2 text-sm text-[var(--joyedu-text-secondary)]">
                    <li>• All Medium School features</li>
                    <li>• Dedicated account manager</li>
                    <li>• 24/7 phone support</li>
                    <li>• Custom development</li>
                  </ul>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[var(--joyedu-bg-secondary)]">
          <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[var(--joyedu-text-primary)] mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardBody>
                  <h3 className="font-semibold mb-2 text-[var(--joyedu-text-primary)]">Can I cancel my subscription anytime?</h3>
                  <p className="text-[var(--joyedu-text-secondary)]">Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-semibold mb-2 text-[var(--joyedu-text-primary)]">Do you offer refunds?</h3>
                  <p className="text-[var(--joyedu-text-secondary)]">We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund.</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-semibold mb-2 text-[var(--joyedu-text-primary)]">What payment methods do you accept?</h3>
                  <p className="text-[var(--joyedu-text-secondary)]">We accept all major credit cards, PayPal, and bank transfers for school plans.</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-semibold mb-2 text-[var(--joyedu-text-primary)]">Can I switch between plans?</h3>
                  <p className="text-[var(--joyedu-text-secondary)]">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.</p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[var(--joyedu-primary-600)] to-[var(--joyedu-primary-700)] text-white">
          <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-[var(--joyedu-primary-100)] mb-8 max-w-2xl mx-auto">
              Join thousands of learners and schools already using JoyEdu
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/signup" 
                className="px-8 py-4 bg-[var(--joyedu-surface-1)] text-[var(--joyedu-primary-700)] rounded-lg font-semibold hover:bg-[var(--joyedu-primary-50)] transition shadow-[var(--joyedu-shadow-sm)]"
              >
                Get Started Free
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
