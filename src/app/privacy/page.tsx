import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-8">Privacy Policy</h1>
            
            <Card className="mb-6">
              <CardBody>
                <CardTitle>Last Updated: September 5, 2026</CardTitle>
                <div className="prose prose-blue max-w-none">
                  <h2>1. Information We Collect</h2>
                  <p>JoyEdu collects information you provide directly, including:</p>
                  <ul>
                    <li>Account information (name, email, password)</li>
                    <li>Profile information (bio, avatar, role preferences)</li>
                    <li>Learning progress and achievements</li>
                    <li>Payment information (processed securely)</li>
                  </ul>

                  <h2>2. How We Use Your Information</h2>
                  <p>We use your information to:</p>
                  <ul>
                    <li>Provide and improve our educational services</li>
                    <li>Process payments and manage subscriptions</li>
                    <li>Send important account notifications</li>
                    <li>Personalize your learning experience</li>
                    <li>Prevent fraud and ensure platform security</li>
                  </ul>

                  <h2>3. Data Security</h2>
                  <p>We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits.</p>

                  <h2>4. Your Rights</h2>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Delete your account and data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Export your data</li>
                  </ul>

                  <h2>5. Third-Party Services</h2>
                  <p>We may use third-party services for analytics, payment processing, and content delivery. These services have their own privacy policies.</p>

                  <h2>6. Children's Privacy</h2>
                  <p>JoyEdu is not intended for children under 13. We do not knowingly collect personal information from children.</p>

                  <h2>7. Changes to This Policy</h2>
                  <p>We may update this privacy policy from time to time. We will notify you of significant changes via email or platform notice.</p>

                  <h2>8. Contact Us</h2>
                  <p>If you have questions about this privacy policy, please contact us at privacy@joyedu.com</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}