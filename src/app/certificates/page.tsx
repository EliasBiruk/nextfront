import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';

export default function CertificatesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[var(--joyedu-text-primary)] mb-2">Certificate Verification</h1>
              <p className="text-[var(--joyedu-text-secondary)]">Verify the authenticity of JoyEdu certificates</p>
            </div>

            {/* Verification Form */}
            <Card className="mb-6">
              <CardBody>
                <CardTitle>Verify Certificate</CardTitle>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">
                      Certificate ID
                    </label>
                    <input
                      type="text"
                      placeholder="Enter certificate ID (e.g., CERT-2024-12345)"
                      className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                    />
                  </div>
                  <button className="w-full px-4 py-2 bg-[var(--joyedu-primary)] text-white rounded-lg hover:bg-[var(--joyedu-primary-hover)] transition">
                    Verify Certificate
                  </button>
                </div>
              </CardBody>
            </Card>

            {/* Sample Certificate */}
            <Card>
              <CardBody>
                <CardTitle>Sample Certificate</CardTitle>
                <div className="border-2 border-[var(--joyedu-border-200)] rounded-lg p-6 bg-gradient-to-br from-[var(--joyedu-primary-50)] to-white">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎓</div>
                    <h2 className="text-2xl font-bold text-[var(--joyedu-text-primary)] mb-2">Certificate of Completion</h2>
                    <p className="text-[var(--joyedu-text-secondary)] mb-4">This certifies that</p>
                    <h3 className="text-xl font-semibold text-[var(--joyedu-primary)] mb-4">John Smith</h3>
                    <p className="text-[var(--joyedu-text-secondary)] mb-4">has successfully completed</p>
                    <h3 className="text-lg font-semibold text-[var(--joyedu-text-primary)] mb-4">Complete Web Development Bootcamp</h3>
                    <div className="flex justify-center gap-4 text-sm text-[var(--joyedu-text-muted)] mb-4">
                      <span>Issued: Sep 1, 2026</span>
                      <span>•</span>
                      <span>ID: CERT-2024-12345</span>
                    </div>
                    <Badge variant="success">Verified</Badge>
                  </div>
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