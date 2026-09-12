'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (will connect to backend later)
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)]">
        <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)] py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-[var(--joyedu-text-primary)] mb-8">Contact Us</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardBody>
                  <CardTitle>Get in Touch</CardTitle>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 text-[var(--joyedu-text-primary)]">Email</h3>
                      <p className="text-[var(--joyedu-text-secondary)]">support@joyedu.com</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[var(--joyedu-text-primary)]">Phone</h3>
                      <p className="text-[var(--joyedu-text-secondary)]">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[var(--joyedu-text-primary)]">Office</h3>
                      <p className="text-[var(--joyedu-text-secondary)]">123 Education Street<br/>San Francisco, CA 94102</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[var(--joyedu-text-primary)]">Hours</h3>
                      <p className="text-[var(--joyedu-text-secondary)]">Monday - Friday: 9AM - 6PM PST</p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle>Quick Links</CardTitle>
                  <div className="space-y-2">
                    <a href="/help" className="block text-[var(--joyedu-primary)] hover:underline">Help Center</a>
                    <a href="/privacy" className="block text-[var(--joyedu-primary)] hover:underline">Privacy Policy</a>
                    <a href="/terms" className="block text-[var(--joyedu-primary)] hover:underline">Terms of Service</a>
                    <a href="/accessibility" className="block text-[var(--joyedu-primary)] hover:underline">Accessibility</a>
                  </div>
                </CardBody>
              </Card>
            </div>

            <Card>
              <CardBody>
                <CardTitle>Send us a Message</CardTitle>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Subject</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={5}
                      className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-lg focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-surface-1)] text-[var(--joyedu-text-primary)]"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}