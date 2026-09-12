import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-8">Cookie Policy</h1>
            
            <Card className="mb-6">
              <CardBody>
                <CardTitle>Last Updated: September 5, 2026</CardTitle>
                <div className="prose prose-blue max-w-none">
                  <h2>1. What Are Cookies</h2>
                  <p>Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience.</p>

                  <h2>2. How We Use Cookies</h2>
                  <p>We use cookies to:</p>
                  <ul>
                    <li>Remember your login preferences</li>
                    <li>Track your learning progress</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Personalize content and recommendations</li>
                    <li>Improve website performance</li>
                  </ul>

                  <h2>3. Types of Cookies We Use</h2>
                  <h3>Essential Cookies</h3>
                  <p>Required for the website to function properly, including authentication and security.</p>

                  <h3>Performance Cookies</h3>
                  <p>Help us understand how visitors use our website by collecting anonymous data.</p>

                  <h3>Functionality Cookies</h3>
                  <p>Remember your preferences and settings to provide enhanced features.</p>

                  <h3>Targeting Cookies</h3>
                  <p>Used to deliver relevant advertisements and measure their effectiveness.</p>

                  <h2>4. Managing Cookies</h2>
                  <p>You can control and manage cookies in various ways:</p>
                  <ul>
                    <li>Browser settings to block or delete cookies</li>
                    <li>Opt-out of tracking through our cookie consent banner</li>
                    <li>Adjust preferences in your account settings</li>
                  </ul>

                  <h2>5. Third-Party Cookies</h2>
                  <p>We may use third-party services that set cookies, including analytics tools and payment processors. These have their own cookie policies.</p>

                  <h2>6. Cookie Duration</h2>
                  <p>Session cookies expire when you close your browser. Persistent cookies remain until their expiration date or until you delete them.</p>

                  <h2>7. Updates to This Policy</h2>
                  <p>We may update this cookie policy from time to time. Changes will be posted on this page with an updated revision date.</p>

                  <h2>8. Contact Us</h2>
                  <p>If you have questions about our use of cookies, please contact us at privacy@joyedu.com</p>
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