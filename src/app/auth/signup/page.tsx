'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { authService, instructorsService } from '@/services';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'student' | 'instructor' | 'school'>('student');
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    subjectArea: '',
    schoolName: '',
    location: '',
    studentCount: '',
    teacherCount: '',
    contactPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      if (selectedRole === 'student') {
        const response = await authService().signup({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          age: parseInt(formData.age),
          role: 'student',
        });
        login(formData.email, formData.password, 'student');
        router.push('/student/dashboard');
      } else if (selectedRole === 'instructor') {
        await instructorsService().createInstructorApplication({
          userId: '', // Will be set after signup
          firstName: formData.fullName.split(' ')[0],
          lastName: formData.fullName.split(' ').slice(1).join(' '),
          email: formData.email,
          phone: formData.contactPhone,
          expertise: formData.subjectArea.split(',').map(s => s.trim()),
          experience: 0,
          qualifications: '',
          bio: '',
        });
        alert('Instructor application submitted! We will review your application and contact you.');
        router.push('/guest');
      } else if (selectedRole === 'school') {
        // School registration would go through schools service
        alert('School registration request submitted! Our team will contact you for onboarding.');
        router.push('/guest');
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 bg-[var(--joyedu-bg-secondary)] flex items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full">
          <Card>
            <CardBody>
              <CardTitle>Create Account</CardTitle>
              <p className="text-[var(--joyedu-text-secondary)] mb-6">Join JoyEdu and start your learning journey</p>
              
              {error && (
                <div className="mb-6 p-4 bg-[var(--joyedu-error-bg)] border border-[var(--joyedu-error-200)] rounded-lg">
                  <p className="text-[var(--joyedu-error-text)] text-sm">{error}</p>
                </div>
              )}
              
              {/* Role Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-3">I want to join as:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('student')}
                    className={`p-4 border-2 rounded-lg text-center transition ${
                      selectedRole === 'student' 
                        ? 'border-[var(--joyedu-primary-500)] bg-[var(--joyedu-primary-subtle)]' 
                        : 'border-[var(--joyedu-border-200)] hover:border-[var(--joyedu-primary-300)]'
                    }`}
                  >
                    <div className="text-2xl mb-2">👨‍🎓</div>
                    <div className="font-medium">Student</div>
                    <div className="text-xs text-[var(--joyedu-text-muted)]">Learn new skills</div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setSelectedRole('instructor')}
                    className={`p-4 border-2 rounded-lg text-center transition ${
                      selectedRole === 'instructor' 
                        ? 'border-[var(--joyedu-primary-500)] bg-[var(--joyedu-primary-subtle)]' 
                        : 'border-[var(--joyedu-border-200)] hover:border-[var(--joyedu-primary-300)]'
                    }`}
                  >
                    <div className="text-2xl mb-2">�‍🏫</div>
                    <div className="font-medium">Instructor</div>
                    <div className="text-xs text-[var(--joyedu-text-muted)]">Teach courses</div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setSelectedRole('school')}
                    className={`p-4 border-2 rounded-lg text-center transition ${
                      selectedRole === 'school' 
                        ? 'border-[var(--joyedu-primary-500)] bg-[var(--joyedu-primary-subtle)]' 
                        : 'border-[var(--joyedu-border-200)] hover:border-[var(--joyedu-primary-300)]'
                    }`}
                  >
                    <div className="text-2xl mb-2">🏫</div>
                    <div className="font-medium">School</div>
                    <div className="text-xs text-[var(--joyedu-text-muted)]">Manage institution</div>
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">Google</Button>
                  <Button variant="outline" className="w-full">Facebook</Button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">Google</Button>
                  <Button variant="outline" className="w-full">Facebook</Button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Student Fields */}
                {selectedRole === 'student' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                        placeholder="18"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Instructor Fields */}
                {selectedRole === 'instructor' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                        placeholder="Dr. Sarah Johnson"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                        placeholder="35"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Subject Area You Can Teach</label>
                      <input
                        type="text"
                        value={formData.subjectArea}
                        onChange={(e) => setFormData({...formData, subjectArea: e.target.value})}
                        className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                        placeholder="Web Development, Data Science, etc."
                        required
                      />
                    </div>
                  </>
                )}

                {/* School Fields */}
                {selectedRole === 'school' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">School Name</label>
                      <input
                        type="text"
                        value={formData.schoolName}
                        onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                        className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                        placeholder="Springfield Academy"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                        placeholder="California, USA (or 'Online' for online schools)"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                        className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Number of Students</label>
                      <input
                        type="number"
                        value={formData.studentCount}
                        onChange={(e) => setFormData({...formData, studentCount: e.target.value})}
                        className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                        placeholder="500"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Number of Teachers</label>
                      <input
                        type="number"
                        value={formData.teacherCount}
                        onChange={(e) => setFormData({...formData, teacherCount: e.target.value})}
                        className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                        placeholder="50"
                        required
                      />
                    </div>
                  </>
                )}
                
                {/* Common Fields */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-[var(--joyedu-text-muted)]">
                    I agree to the <Link href="/terms" className="text-[var(--joyedu-primary)] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[var(--joyedu-primary)] hover:underline">Privacy Policy</Link>
                  </label>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : selectedRole === 'instructor' ? 'Apply as Instructor' : selectedRole === 'school' ? 'Request School Access' : 'Create Account'}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-center text-sm text-[var(--joyedu-text-secondary)]">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-[var(--joyedu-primary)] hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
              
              {selectedRole === 'instructor' && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Instructor applications are reviewed by our team. You will receive an email once your application is approved.
                  </p>
                </div>
              )}
              
              {selectedRole === 'school' && (
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Note:</strong> School registrations require verification and onboarding. Our team will contact you within 2-3 business days with pricing details based on your institution size.
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}