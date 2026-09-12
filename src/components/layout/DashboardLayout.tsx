'use client';

import { ReactNode, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  actor: 'student' | 'instructor' | 'school' | 'admin';
  userName?: string;
  studentType?: 'joyedu' | 'school';
  instructorType?: 'joyedu' | 'school';
  schoolRole?: 'school_admin' | 'teacher' | 'student' | 'guardian';
}

export default function DashboardLayout({ 
  children, 
  actor, 
  userName, 
  studentType = 'joyedu', 
  instructorType = 'joyedu',
  schoolRole = 'school_admin'
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--joyedu-bg-secondary)] flex flex-col">
      <Header 
        actor={actor} 
        userName={userName} 
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <div className="flex flex-1 relative">
        {/* Mobile sidebar overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-[var(--joyedu-bg-overlay)] z-[var(--joyedu-z-modal-backdrop)] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        
        {/* Sidebar - fixed on desktop, slide-in on mobile */}
        <div className={`
          fixed inset-y-0 left-0 z-[var(--joyedu-z-sticky)] w-[var(--joyedu-sidebar-width)] transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar 
            actor={actor} 
            userName={userName} 
            studentType={studentType} 
            instructorType={instructorType}
            schoolRole={schoolRole}
            onClose={() => setMobileMenuOpen(false)}
          />
        </div>
        
        {/* Main content */}
        <main className="flex-1 lg:ml-[var(--joyedu-sidebar-width)] min-w-0">
          <div className="p-4 md:p-6 lg:p-8 max-w-[var(--joyedu-container-2xl)] mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer sidebarOffset={true} />
    </div>
  );
}