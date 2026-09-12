'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { useAuth, UserRole } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      login(email, password, selectedRole);
      
      // Redirect based on role
      switch (selectedRole) {
        case 'student':
          router.push('/student');
          break;
        case 'instructor':
          router.push('/instructor');
          break;
        case 'school':
          router.push('/school/springfield-academy/dashboard');
          break;
        case 'admin':
          router.push('/admin/dashboard');
          break;
        default:
          router.push('/');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (role: UserRole, email: string) => {
    setEmail(email);
    setPassword('password');
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header actor="guest" />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--joyedu-text-primary)] mb-2">Welcome Back</h1>
            <p className="text-[var(--joyedu-text-secondary)]">Sign in to your JoyEdu account</p>
          </div>

          <Card>
            <CardBody>
              <CardTitle>Sign In</CardTitle>
              
              {/* Quick Login for Prototype */}
              <div className="mb-6 p-4 bg-[var(--joyedu-primary-subtle)] rounded-lg border border-[var(--joyedu-primary-200)]">
                <p className="text-sm font-medium text-[var(--joyedu-primary-900)] mb-3">Quick Login (Prototype)</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => quickLogin('student', 'student@joyedu.com')}
                    className="text-xs px-3 py-2 bg-[var(--joyedu-surface-1)] border border-[var(--joyedu-primary-300)] rounded hover:bg-[var(--joyedu-primary-100)] transition"
                  >
                    👨‍🎓 Student
                  </button>
                  <button
                    onClick={() => quickLogin('instructor', 'instructor@joyedu.com')}
                    className="text-xs px-3 py-2 bg-[var(--joyedu-surface-1)] border border-[var(--joyedu-primary-300)] rounded hover:bg-[var(--joyedu-primary-100)] transition"
                  >
                    👩‍🏫 Instructor
                  </button>
                  <button
                    onClick={() => quickLogin('school', 'school@joyedu.com')}
                    className="text-xs px-3 py-2 bg-[var(--joyedu-surface-1)] border border-[var(--joyedu-primary-300)] rounded hover:bg-[var(--joyedu-primary-100)] transition"
                  >
                    🏫 School Admin
                  </button>
                  <button
                    onClick={() => quickLogin('admin', 'admin@joyedu.com')}
                    className="text-xs px-3 py-2 bg-[var(--joyedu-surface-1)] border border-[var(--joyedu-primary-300)] rounded hover:bg-[var(--joyedu-primary-100)] transition"
                  >
                    🔧 Platform Admin
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[var(--joyedu-text-primary)] mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)]"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Login As
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="school">School Administrator</option>
                    <option value="admin">Platform Administrator</option>
                  </select>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-[var(--joyedu-error-bg)] border border-[var(--joyedu-error-200)] rounded-lg">
                    <p className="text-[var(--joyedu-error-text)] text-sm">{error}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-center text-sm text-[var(--joyedu-text-secondary)]">
                  Don't have an account?{' '}
                  <Link href="/auth/signup" className="text-[var(--joyedu-primary)] hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <span className="mr-2">G</span>
                    Google
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <span className="mr-2">M</span>
                    Microsoft
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}