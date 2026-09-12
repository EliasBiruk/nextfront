'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User roles
export type UserRole = 'guest' | 'student' | 'instructor' | 'school' | 'admin';

// School-specific roles
export type SchoolRole = 'school_admin' | 'teacher' | 'student' | 'guardian' | 'staff' | 'hr' | 'finance' | 'librarian' | 'transport';

// Course scopes
export type CourseScope = 'PERSONAL' | 'SCHOOL' | 'PLATFORM';

// Course audiences
export type CourseAudience = 'PRIVATE' | 'SCHOOL_ONLY' | 'PUBLIC' | 'MARKETPLACE';

// Course lifecycle states
export type CourseStatus = 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED' | 'REJECTED';

// Instructor application states
export type ApplicationStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'RESUBMITTED';

// Quiz answer states
export type AnswerState = 'NOT_STARTED' | 'IN_PROGRESS' | 'ANSWERED' | 'NOT_ANSWERED' | 'REVEALED' | 'CORRECT' | 'INCORRECT';

// User interface
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  schoolRoles?: SchoolRole[];
  schoolId?: string;
  avatar?: string;
}

// School context interface
interface SchoolContext {
  schoolId: string;
  schoolSlug: string;
  schoolName: string;
  role: SchoolRole;
}

// Auth context interface
interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole;
  currentSchoolContext: SchoolContext | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  switchSchoolContext: (schoolContext: SchoolContext) => void;
  switchSchoolRole: (role: SchoolRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for prototype
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'student@joyedu.com',
    firstName: 'Alex',
    lastName: 'Student',
    roles: ['student'],
    avatar: '👨‍🎓',
  },
  {
    id: 'user-2',
    email: 'instructor@joyedu.com',
    firstName: 'Sarah',
    lastName: 'Instructor',
    roles: ['student', 'instructor'],
    avatar: '👩‍🏫',
  },
  {
    id: 'user-3',
    email: 'school@joyedu.com',
    firstName: 'John',
    lastName: 'Admin',
    roles: ['school'],
    schoolRoles: ['school_admin'],
    schoolId: 'school-1',
    avatar: '🏫',
  },
  {
    id: 'user-4',
    email: 'admin@joyedu.com',
    firstName: 'Platform',
    lastName: 'Admin',
    roles: ['admin'],
    avatar: '🔧',
  },
  {
    id: 'user-5',
    email: 'guardian@joyedu.com',
    firstName: 'Mrs.',
    lastName: 'Thompson',
    roles: ['school'],
    schoolRoles: ['guardian'],
    schoolId: 'school-1',
    avatar: '👩',
  },
  {
    id: 'user-6',
    email: 'teacher@joyedu.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    roles: ['school', 'instructor'],
    schoolRoles: ['teacher'],
    schoolId: 'school-1',
    avatar: '👩‍🏫',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [currentSchoolContext, setCurrentSchoolContext] = useState<SchoolContext | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('joyedu_user');
    const savedRole = localStorage.getItem('joyedu_role');
    const savedSchoolContext = localStorage.getItem('joyedu_school_context');

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedRole) {
      setCurrentRole(savedRole as UserRole);
    }
    if (savedSchoolContext) {
      setCurrentSchoolContext(JSON.parse(savedSchoolContext));
    }
  }, []);

  const login = (email: string, password: string, role: UserRole) => {
    // Mock login - in real app this would validate credentials
    const user = mockUsers.find(u => u.email === email) || mockUsers[0];
    setCurrentUser(user);
    setCurrentRole(role);
    
    // Set school context if applicable
    if (user.schoolId && (role === 'school' || user.roles.includes('school'))) {
      const schoolRole = user.schoolRoles?.[0] || 'school_admin';
      setCurrentSchoolContext({
        schoolId: user.schoolId,
        schoolSlug: 'springfield-academy',
        schoolName: 'Springfield Academy',
        role: schoolRole,
      });
    }

    localStorage.setItem('joyedu_user', JSON.stringify(user));
    localStorage.setItem('joyedu_role', role);
    if (user.schoolId) {
      localStorage.setItem('joyedu_school_context', JSON.stringify({
        schoolId: user.schoolId,
        schoolSlug: 'springfield-academy',
        schoolName: 'Springfield Academy',
        role: user.schoolRoles?.[0] || 'school_admin',
      }));
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole('guest');
    setCurrentSchoolContext(null);
    localStorage.removeItem('joyedu_user');
    localStorage.removeItem('joyedu_role');
    localStorage.removeItem('joyedu_school_context');
  };

  const switchRole = (role: UserRole) => {
    if (currentUser && currentUser.roles.includes(role)) {
      setCurrentRole(role);
      localStorage.setItem('joyedu_role', role);
      
      // Update school context if switching to school role
      if (role === 'school' && currentUser.schoolId) {
        const schoolRole = currentUser.schoolRoles?.[0] || 'school_admin';
        setCurrentSchoolContext({
          schoolId: currentUser.schoolId,
          schoolSlug: 'springfield-academy',
          schoolName: 'Springfield Academy',
          role: schoolRole,
        });
      }
    }
  };

  const switchSchoolContext = (schoolContext: SchoolContext) => {
    setCurrentSchoolContext(schoolContext);
    localStorage.setItem('joyedu_school_context', JSON.stringify(schoolContext));
  };

  const switchSchoolRole = (role: SchoolRole) => {
    if (currentSchoolContext) {
      const newContext = { ...currentSchoolContext, role };
      setCurrentSchoolContext(newContext);
      localStorage.setItem('joyedu_school_context', JSON.stringify(newContext));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        currentSchoolContext,
        isAuthenticated: !!currentUser,
        login,
        logout,
        switchRole,
        switchSchoolContext,
        switchSchoolRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
