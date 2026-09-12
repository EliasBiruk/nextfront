'use client';

import React, { useState } from 'react';
import { useAuth, UserRole, SchoolRole } from '@/context/AuthContext';

export function RoleSwitcher() {
  const { currentUser, currentRole, currentSchoolContext, switchRole, switchSchoolRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentUser) {
    return null;
  }

  const availableRoles = currentUser.roles || [];
  const availableSchoolRoles = currentUser.schoolRoles || [];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <span className="text-2xl">{currentUser.avatar}</span>
        <div className="text-left">
          <div className="text-sm font-medium text-gray-900">
            {currentUser.firstName} {currentUser.lastName}
          </div>
          <div className="text-xs text-gray-500 capitalize">
            {currentRole}
            {currentSchoolContext && ` • ${currentSchoolContext.role.replace('_', ' ')}`}
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentUser.avatar}</span>
                <div>
                  <div className="font-medium text-gray-900">
                    {currentUser.firstName} {currentUser.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{currentUser.email}</div>
                </div>
              </div>
            </div>

            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-2">
                Platform Roles
              </div>
              {availableRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    switchRole(role);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    currentRole === role
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="text-xl">{getRoleIcon(role)}</span>
                  <div>
                    <div className="font-medium capitalize">{role}</div>
                    <div className="text-xs text-gray-500">{getRoleDescription(role)}</div>
                  </div>
                  {currentRole === role && (
                    <svg className="w-5 h-5 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {currentSchoolContext && availableSchoolRoles.length > 0 && (
              <div className="p-2 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-2">
                  School Context: {currentSchoolContext.schoolName}
                </div>
                {availableSchoolRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      switchSchoolRole(role);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      currentSchoolContext?.role === role
                        ? 'bg-green-50 text-green-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="text-xl">{getSchoolRoleIcon(role)}</span>
                    <div>
                      <div className="font-medium capitalize">{role.replace('_', ' ')}</div>
                      <div className="text-xs text-gray-500">{getSchoolRoleDescription(role)}</div>
                    </div>
                    {currentSchoolContext?.role === role && (
                      <svg className="w-5 h-5 ml-auto text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="p-2 border-t border-gray-200">
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function getRoleIcon(role: UserRole): string {
  switch (role) {
    case 'student':
      return '👨‍🎓';
    case 'instructor':
      return '👩‍🏫';
    case 'school':
      return '🏫';
    case 'admin':
      return '🔧';
    default:
      return '👤';
  }
}

function getRoleDescription(role: UserRole): string {
  switch (role) {
    case 'student':
      return 'Independent learning';
    case 'instructor':
      return 'Course creation & teaching';
    case 'school':
      return 'School management';
    case 'admin':
      return 'Platform administration';
    default:
      return '';
  }
}

function getSchoolRoleIcon(role: SchoolRole): string {
  switch (role) {
    case 'school_admin':
      return '👔';
    case 'teacher':
      return '👩‍🏫';
    case 'student':
      return '👨‍🎓';
    case 'guardian':
      return '👩';
    case 'staff':
      return '👤';
    case 'hr':
      return '📋';
    case 'finance':
      return '💰';
    case 'librarian':
      return '📚';
    case 'transport':
      return '🚌';
    default:
      return '👤';
  }
}

function getSchoolRoleDescription(role: SchoolRole): string {
  switch (role) {
    case 'school_admin':
      return 'Full school administration';
    case 'teacher':
      return 'Classroom teaching';
    case 'student':
      return 'School learning';
    case 'guardian':
      return 'Parent/guardian access';
    case 'staff':
      return 'General staff';
    case 'hr':
      return 'Human resources';
    case 'finance':
      return 'Financial management';
    case 'librarian':
      return 'Library management';
    case 'transport':
      return 'Transport management';
    default:
      return '';
  }
}
