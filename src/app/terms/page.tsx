import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-8">Terms of Service</h1>
            
            <Card className="mb-6">
              <CardBody>
                <CardTitle>Last Updated: September 5, 2026</CardTitle>
                <div className="prose prose-blue max-w-none">
                  <h2>1. Acceptance of Terms</h2>
                  <p>By accessing and using JoyEdu, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

                  <h2>2. User Accounts</h2>
                  <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

                  <h2>3. Acceptable Use</h2>
                  <p>You agree to use JoyEdu only for lawful purposes and in accordance with these Terms. You may not:</p>
                  <ul>
                    <li>Use the platform for any illegal purpose</li>
                    <li>Violate any local, state, national, or international law</li>
                    <li>Infringe upon intellectual property rights</li>
                    <li>Upload malicious code or viruses</li>
                    <li>Harass, abuse, or harm other users</li>
                  </ul>

                  <h2>4. Course Content</h2>
                  <p>All course content is protected by copyright. You may not:</p>
                  <ul>
                    <li>Reproduce, distribute, or create derivative works</li>
                    <li>Share course materials with non-enrolled users</li>
                    <li>Use content for commercial purposes without permission</li>
                  </ul>

                  <h2>5. Payments and Refunds</h2>
                  <p>Payments are processed through secure payment gateways. Refunds are available according to our refund policy for eligible courses.</p>

                  <h2>6. Instructor Responsibilities</h2>
                  <p>Instructors must:</p>
                  <ul>
                    <li>Provide accurate course descriptions</li>
                    <li>Deliver high-quality educational content</li>
                    <li>Respond to student inquiries</li>
                    <li>Adhere to content guidelines</li>
                  </ul>

                  <h2>7. School Responsibilities</h2>
                  <p>Schools using JoyEdu's management system must comply with applicable education laws and protect student privacy.</p>

                  <h2>8. Intellectual Property</h2>
                  <p>All JoyEdu branding, design, and technology are owned by JoyEdu. You may not use our intellectual property without permission.</p>

                  <h2>9. Termination</h2>
                  <p>We reserve the right to terminate accounts that violate these Terms. You may also terminate your account at any time.</p>

                  <h2>10. Limitation of Liability</h2>
                  <p>JoyEdu shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.</p>

                  <h2>11. Governing Law</h2>
                  <p>These Terms are governed by the laws of the jurisdiction in which JoyEdu is headquartered.</p>

                  <h2>12. Contact Us</h2>
                  <p>For questions about these Terms, please contact us at legal@joyedu.com</p>
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