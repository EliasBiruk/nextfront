'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { RoleSwitcher } from '@/components/shared/RoleSwitcher';

interface HeaderProps {
  actor?: 'guest' | 'student' | 'instructor' | 'school' | 'admin';
  userName?: string;
  onMobileMenuToggle?: () => void;
}

export default function Header({ actor = 'guest', userName, onMobileMenuToggle }: HeaderProps) {
  const { currentUser, currentRole, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    if (onMobileMenuToggle) {
      onMobileMenuToggle();
    } else {
      setMobileMenuOpen(!mobileMenuOpen);
    }
  };

  // Use auth context if available, otherwise fall back to props
  const effectiveActor = isAuthenticated ? currentRole : actor;
  const effectiveUserName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : userName;

  const getNavLinks = () => {
    switch (effectiveActor) {
      case 'student':
        return [
          { href: '/student', label: 'Dashboard', icon: '🏠' },
          { href: '/student/learning', label: 'My Learning', icon: '📚' },
          { href: '/student/courses', label: 'Courses', icon: '📚' },
          { href: '/student/assessments', label: 'Assessments', icon: '📝' },
          { href: '/student/playground', label: 'Playground', icon: '🎮' },
          { href: '/student/achievements', label: 'Achievements', icon: '🏆' },
        ];
      case 'instructor':
        return [
          { href: '/instructor/courses', label: 'My Courses', icon: '📚' },
          { href: '/instructor/analytics', label: 'Analytics', icon: '📊' },
          { href: '/instructor/students', label: 'Students', icon: '👥' },
          { href: '/instructor/applications', label: 'Applications', icon: '📝' },
        ];
      case 'school':
        return [
          { href: '/school/dashboard', label: 'Dashboard', icon: '🏠' },
          { href: '/school/students', label: 'Students', icon: '👥' },
          { href: '/school/academics', label: 'Academics', icon: '📚' },
          { href: '/school/attendance', label: 'Attendance', icon: '📅' },
          { href: '/school/finance', label: 'Finance', icon: '💰' },
        ];
      case 'admin':
        return [
          { href: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
          { href: '/admin/users', label: 'Users', icon: '👥' },
          { href: '/admin/courses', label: 'Courses', icon: '📚' },
          { href: '/admin/schools', label: 'Schools', icon: '🏫' },
          { href: '/admin/applications', label: 'Applications', icon: '📝' },
          { href: '/admin/finance', label: 'Finance', icon: '💰' },
        ];
      default:
        return [
          { href: '/guest/courses', label: 'Courses', icon: '📚' },
          { href: '/guest/instructors', label: 'Instructors', icon: '👨‍🏫' },
          { href: '/guest/schools', label: 'Schools', icon: '🏫' },
          { href: '/playground', label: 'Playground', icon: '💻' },
          { href: '/certificates', label: 'Certificates', icon: '🎖️' },
          { href: '/pricing', label: 'Pricing', icon: '💰' },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <header className="border-b border-[var(--joyedu-header-border)] bg-[var(--joyedu-header-bg)] sticky top-0 z-[var(--joyedu-z-sticky)]">
      <div className="container mx-auto px-4 max-w-[var(--joyedu-container-2xl)]">
        <div className="flex items-center justify-between h-[var(--joyedu-header-height)]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--joyedu-primary-600)] to-[var(--joyedu-primary-700)] text-white font-bold text-xl shadow-[var(--joyedu-shadow-sm)]">
              J
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-[var(--joyedu-text-primary)]">JoyEdu</span>
              <span className="text-xs text-[var(--joyedu-text-muted)] block -mt-1">Education Ecosystem</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search courses, instructors, schools..."
                className="w-full pl-10 pr-4 py-2 border border-[var(--joyedu-border-300)] rounded-[var(--joyedu-radius-md)] focus:ring-2 focus:ring-[var(--joyedu-primary-500)] focus:border-[var(--joyedu-primary-500)] text-sm bg-[var(--joyedu-bg-primary)] text-[var(--joyedu-text-primary)] placeholder:text-[var(--joyedu-text-muted)] transition-all"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-[var(--joyedu-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--joyedu-text-secondary)] hover:bg-[var(--joyedu-bg-tertiary)] hover:text-[var(--joyedu-text-primary)] transition text-sm font-medium"
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/auth/login"
                  className="hidden sm:block px-4 py-2 text-[var(--joyedu-text-secondary)] hover:bg-[var(--joyedu-bg-tertiary)] rounded-lg transition text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-[var(--joyedu-primary)] text-white rounded-lg hover:bg-[var(--joyedu-primary-hover)] transition text-sm font-medium shadow-[var(--joyedu-shadow-sm)]"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-[var(--joyedu-text-muted)] hover:bg-[var(--joyedu-bg-tertiary)] rounded-lg transition">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 h-2 w-2 bg-[var(--joyedu-error)] rounded-full"></span>
                </button>

                {/* Role Switcher */}
                <RoleSwitcher />

                {/* Logout */}
                <button
                  onClick={() => {
                    logout();
                    window.location.href = '/';
                  }}
                  className="px-4 py-2 text-[var(--joyedu-text-secondary)] hover:bg-[var(--joyedu-bg-tertiary)] rounded-lg transition text-sm font-medium"
                >
                  Log out
                </button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="lg:hidden p-2 text-[var(--joyedu-text-muted)] hover:bg-[var(--joyedu-bg-tertiary)] rounded-lg transition"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--joyedu-border-200)]">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--joyedu-text-secondary)] hover:bg-[var(--joyedu-bg-tertiary)] transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </nav>
            {actor === 'guest' && (
              <div className="mt-4 pt-4 border-t border-[var(--joyedu-border-200)] flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  className="px-4 py-3 text-center text-[var(--joyedu-text-secondary)] hover:bg-[var(--joyedu-bg-tertiary)] rounded-lg transition font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-3 text-center bg-[var(--joyedu-primary)] text-white rounded-lg hover:bg-[var(--joyedu-primary-hover)] transition font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}