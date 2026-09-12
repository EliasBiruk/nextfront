'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockSchools, mockPersonas } from '@/data/mockData';

interface SchoolShellProps {
  children: React.ReactNode;
  schoolSlug: string;
  currentPersona?: string;
}

export default function SchoolShell({ children, schoolSlug, currentPersona }: SchoolShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [personaSwitcherOpen, setPersonaSwitcherOpen] = useState(false);

  const school = mockSchools.find(s => s.slug === schoolSlug) || mockSchools[0];
  const currentPersonaData = mockPersonas.find(p => p.id === currentPersona);

  const roleNavigation = [
    { label: 'Dashboard', href: `/school/${schoolSlug}/dashboard`, icon: '🏠' },
    { label: 'Management', href: `/school/${schoolSlug}/management`, icon: '👔' },
    { label: 'Teacher', href: `/school/${schoolSlug}/teacher`, icon: '👨‍🏫' },
    { label: 'Student', href: `/school/${schoolSlug}/student`, icon: '👨‍🎓' },
    { label: 'Guardian', href: `/school/${schoolSlug}/guardian`, icon: '👨‍👩‍👧‍👦' },
    { label: 'Staff', href: `/school/${schoolSlug}/staff`, icon: '👥' },
    { label: 'HR', href: `/school/${schoolSlug}/hr`, icon: '📋' },
    { label: 'Finance', href: `/school/${schoolSlug}/finance`, icon: '💰' },
    { label: 'Library', href: `/school/${schoolSlug}/library`, icon: '📚' },
    { label: 'Transport', href: `/school/${schoolSlug}/transport`, icon: '🚌' },
    { label: 'Students', href: `/school/${schoolSlug}/students`, icon: '🎓' },
    { label: 'Teachers', href: `/school/${schoolSlug}/teachers`, icon: '👩‍🏫' },
    { label: 'Classes', href: `/school/${schoolSlug}/classes`, icon: '🏫' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Prototype Persona Switcher */}
      <div className="fixed top-0 right-0 z-50 p-4">
        <button
          onClick={() => setPersonaSwitcherOpen(!personaSwitcherOpen)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition text-sm"
        >
          🎭 Prototype: {currentPersonaData?.name || 'Not Selected'}
        </button>

        {personaSwitcherOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
            <div className="text-xs text-gray-500 mb-2 font-bold">PROTOTYPE ONLY - NOT REAL AUTH</div>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {mockPersonas.map(persona => (
                <button
                  key={persona.id}
                  onClick={() => {
                    window.location.href = `/school/${schoolSlug}/dashboard?persona=${persona.id}`;
                  }}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition text-sm ${
                    currentPersona === persona.id ? 'bg-purple-100 border-2 border-purple-500' : ''
                  }`}
                >
                  <div className="font-medium">{persona.name}</div>
                  <div className="text-xs text-gray-500">{persona.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* School Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
              {school.logo}
            </div>
            {sidebarOpen && (
              <div>
                <div className="font-bold text-gray-900 text-sm">{school.name}</div>
                <div className="text-xs text-gray-500">{school.tagline}</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {roleNavigation.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Sidebar Toggle */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-sm"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* School Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{school.name}</h1>
              <p className="text-sm text-gray-500">{school.motto}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                🔔
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">🔍</button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                  {currentPersonaData?.name.charAt(0) || 'U'}
                </div>
                {sidebarOpen && (
                  <div className="text-sm">
                    <div className="font-medium">{currentPersonaData?.name || 'User'}</div>
                    <div className="text-xs text-gray-500">{currentPersonaData?.type || 'Guest'}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
