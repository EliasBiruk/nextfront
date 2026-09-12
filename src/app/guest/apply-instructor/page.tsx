'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { createInstructorApplication } from '@/data/mockData';

export default function InstructorApplicationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    expertise: '',
    experience: '',
    qualifications: '',
    bio: '',
    website: '',
    linkedin: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.expertise) {
      setError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const expertiseArray = formData.expertise.split(',').map(s => s.trim()).filter(s => s);
      
      createInstructorApplication({
        userId: `user-${Date.now()}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        expertise: expertiseArray,
        experience: parseInt(formData.experience) || 0,
        qualifications: formData.qualifications,
        bio: formData.bio,
        website: formData.website,
        linkedin: formData.linkedin,
      });

      setSuccess(true);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header actor="guest" />
        
        <main className="flex-1 flex items-center justify-center py-12 px-4 bg-[var(--joyedu-bg-secondary)]">
          <div className="max-w-md w-full">
            <Card>
              <CardBody>
                <div className="text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-2xl font-bold mb-2 text-[var(--joyedu-text-primary)]">Application Submitted!</h2>
                  <p className="text-[var(--joyedu-text-secondary)] mb-6">
                    Thank you for your interest in becoming a JoyEdu instructor. 
                    Your application has been submitted and is under review.
                  </p>
                  <p className="text-sm text-[var(--joyedu-text-muted)] mb-6">
                    We'll review your application and get back to you within 5-7 business days.
                  </p>
                  <Button onClick={() => router.push('/')} className="w-full">
                    Return to Home
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 py-12 px-4 bg-[var(--joyedu-bg-secondary)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[var(--joyedu-text-primary)]">Become a JoyEdu Instructor</h1>
            <p className="text-[var(--joyedu-text-secondary)]">
              Share your knowledge with thousands of learners worldwide
            </p>
          </div>

          <Card>
            <CardBody>
              <CardTitle>Instructor Application</CardTitle>
              
              {error && (
                <div className="mb-4 p-4 bg-[var(--joyedu-error-bg)] border border-[var(--joyedu-error-200)] rounded-lg text-[var(--joyedu-error-text)]">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">
                    Areas of Expertise * (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    placeholder="e.g., Web Development, React, JavaScript"
                    className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                    required
                  />
                  <p className="text-xs text-[var(--joyedu-text-muted)] mt-1">
                    List the topics you're qualified to teach
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">
                    Qualifications / Degrees
                  </label>
                  <input
                    type="text"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    placeholder="e.g., B.S. Computer Science, M.S. Data Science"
                    className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your teaching experience and philosophy..."
                    className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">
                      Website / Portfolio
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                      className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-[var(--joyedu-primary-50)] rounded-lg border border-[var(--joyedu-primary-200)]">
                <h3 className="font-medium text-[var(--joyedu-primary-900)] mb-2">What happens next?</h3>
                <ol className="text-sm text-[var(--joyedu-primary-800)] space-y-1 list-decimal list-inside">
                  <li>Our team reviews your application</li>
                  <li>We may request additional information or a demo</li>
                  <li>Upon approval, you'll receive instructor onboarding</li>
                  <li>Start creating courses and earning revenue!</li>
                </ol>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
