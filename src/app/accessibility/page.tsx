import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';

export default function Accessibility() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-8">Accessibility Statement</h1>
            
            <Card className="mb-6">
              <CardBody>
                <CardTitle>Last Updated: September 5, 2026</CardTitle>
                <div className="prose prose-blue max-w-none">
                  <h2>Our Commitment</h2>
                  <p>JoyEdu is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>

                  <h2>Accessibility Standards</h2>
                  <p>We aim to comply with:</p>
                  <ul>
                    <li>WCAG 2.1 Level AA (Web Content Accessibility Guidelines)</li>
                    <li>Section 508 of the Rehabilitation Act</li>
                    <li>ADA (Americans with Disabilities Act) standards</li>
                  </ul>

                  <h2>Accessibility Features</h2>
                  <h3>Visual Design</h3>
                  <ul>
                    <li>High contrast color combinations</li>
                    <li>Scalable text that can be resized without loss of content</li>
                    <li>Clear and consistent visual hierarchy</li>
                    <li>Adequate spacing between interactive elements</li>
                  </ul>

                  <h3>Navigation</h3>
                  <ul>
                    <li>Keyboard navigation support</li>
                    <li>Skip-to-content links</li>
                    <li>Consistent navigation structure</li>
                    <li>Descriptive link text</li>
                  </ul>

                  <h3>Content</h3>
                  <ul>
                    <li>Alt text for all images</li>
                    <li>Captions for video content</li>
                    <li>Clear and simple language</li>
                    <li>Consistent layout and design</li>
                  </ul>

                  <h3>Forms</h3>
                  <ul>
                    <li>Clear labels for all form fields</li>
                    <li>Error messages that are easy to understand</li>
                    <li>Sufficient time to complete forms</li>
                    <li>Form validation with helpful feedback</li>
                  </ul>

                  <h2>Assistive Technology</h2>
                  <p>Our platform is designed to work with:</p>
                  <ul>
                    <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
                    <li>Screen magnification software</li>
                    <li>Speech recognition software</li>
                    <li>Alternative input devices</li>
                  </ul>

                  <h2>Ongoing Efforts</h2>
                  <p>We regularly:</p>
                  <ul>
                    <li>Test our platform with assistive technologies</li>
                    <li>Train our team on accessibility best practices</li>
                    <li>Incorporate accessibility into our development process</li>
                    <li>Seek feedback from users with disabilities</li>
                  </ul>

                  <h2>Feedback and Support</h2>
                  <p>If you encounter accessibility barriers on JoyEdu, please contact us at accessibility@joyedu.com. We will respond within 3 business days and work to address the issue.</p>

                  <h2>Third-Party Content</h2>
                  <p>Some content on our platform may be provided by third parties. While we encourage accessibility compliance, we cannot guarantee that all third-party content meets our standards.</p>
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