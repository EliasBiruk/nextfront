'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SidebarProps {
  actor: 'student' | 'instructor' | 'school' | 'admin';
  userName?: string;
  onClose?: () => void;
  studentType?: 'joyedu' | 'school';
  instructorType?: 'joyedu' | 'school';
  schoolRole?: 'school_admin' | 'teacher' | 'student' | 'guardian';
}

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: string | number;
  children?: NavItem[];
}

export default function Sidebar({ actor, userName, onClose, studentType = 'joyedu', instructorType = 'joyedu', schoolRole = 'school_admin' }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (href: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedItems(newExpanded);
  };

  const getNavItems = (): NavItem[] => {
    switch (actor) {
      case 'student':
        if (studentType === 'school') {
          return [
            { href: '/student/school', label: 'Dashboard', icon: '🏠' },
            { href: '/student/courses', label: 'My Learning', icon: '📚' },
            { href: '/student/academics', label: 'Academics', icon: '🎓' },
            { href: '/student/assignments', label: 'Assignments', icon: '📝' },
            { href: '/student/quizzes', label: 'Quizzes', icon: '📋' },
            { href: '/student/exams', label: 'Exams', icon: '📋' },
            { href: '/student/attendance', label: 'Attendance', icon: '📅' },
            { href: '/student/grades', label: 'Grades', icon: '📊' },
            { href: '/student/playground', label: 'Playground', icon: '🎮' },
            { href: '/student/achievements', label: 'Achievements', icon: '🏆' },
            { href: '/student/certificates', label: 'Certificates', icon: '🎖️' },
            { href: '/student/school', label: 'School', icon: '🏫' },
            { href: '/student/messages', label: 'Messages', icon: '💬' },
            { href: '/student/analytics/performance', label: 'Analytics', icon: '📊' },
            { href: '/student/account/language', label: 'Settings', icon: '⚙️' },
          ];
        }
        return [
          { href: '/student', label: 'Dashboard', icon: '🏠' },
          {
            href: '/student/learning',
            label: 'My Learning',
            icon: '📚',
            children: [
              { href: '/student/learning', label: 'Overview', icon: '📊' },
              { href: '/student/learning/in-progress', label: 'In Progress', icon: '🔄' },
              { href: '/student/learning/completed', label: 'Completed', icon: '✅' },
              { href: '/student/learning/saved', label: 'Saved', icon: '❤️' },
              { href: '/student/learning/history', label: 'Learning History', icon: '📜' },
            ]
          },
          {
            href: '/student/courses',
            label: 'Courses',
            icon: '📖',
            children: [
              { href: '/student/courses/browse', label: 'Browse Courses', icon: '🔍' },
              { href: '/student/courses', label: 'My Courses', icon: '📚' },
              { href: '/student/courses/recommended', label: 'Recommended', icon: '⭐' },
              { href: '/student/courses/categories', label: 'Categories', icon: '🏷️' },
            ]
          },

          {
            href: '/student/learning/bookmarks',
            label: 'Learning',
            icon: '🎓',
            children: [
              { href: '/student/notes', label: 'Notes', icon: '📒' },
              { href: '/student/learning/bookmarks', label: 'Bookmarks', icon: '🔖' },
              { href: '/student/learning/resources', label: 'Resources', icon: '📁' },
              { href: '/student/learning/discussions', label: 'Discussions', icon: '💬' },
            ]
          },
          {
            href: '/student/assessments',
            label: 'Assessments',
            icon: '📝',
            children: [
              { href: '/student/quizzes', label: 'Quizzes', icon: '📝' },
              { href: '/student/exercises', label: 'Exercises', icon: '💻' },
              { href: '/student/exams', label: 'Exams', icon: '📋' },
              { href: '/student/assessments/upcoming', label: 'Upcoming', icon: '📅' },
              { href: '/student/assessments/in-progress', label: 'In Progress', icon: '🔄' },
              { href: '/student/assessments/completed', label: 'Completed', icon: '✅' },
              { href: '/student/assessments/results', label: 'Results', icon: '📊' },
            ]
          },
          { 
            href: '/student/playground', 
            label: 'Playground', 
            icon: '🎮',
            children: [
              { href: '/student/playground', label: 'Home', icon: '🏠' },
              { href: '/student/playground/projects', label: 'My Projects', icon: '📁' },
              { href: '/student/playground/new', label: 'New Project', icon: '➕' },
              { href: '/student/playground/html', label: 'HTML', icon: '🌐' },
              { href: '/student/playground/css', label: 'CSS', icon: '🎨' },
              { href: '/student/playground/javascript', label: 'JavaScript', icon: '⚡' },
              { href: '/student/playground/react', label: 'React', icon: '⚛️' },
              { href: '/student/playground/python', label: 'Python', icon: '🐍' },
              { href: '/student/playground/challenges', label: 'Challenges', icon: '🎯' },
              { href: '/student/playground/saved', label: 'Saved Projects', icon: '💾' },
              { href: '/student/playground/shared', label: 'Shared Projects', icon: '🔗' },
            ]
          },
          {
            href: '/student/achievements',
            label: 'Achievements',
            icon: '🏆',
            children: [
              { href: '/student/achievements', label: 'Overview', icon: '📊' },
              { href: '/student/achievements/badges', label: 'Badges', icon: '🏅' },
              { href: '/student/achievements/achievements', label: 'Achievements', icon: '🎖️' },
              { href: '/student/achievements/xp', label: 'XP / Points', icon: '⭐' },
              { href: '/student/achievements/levels', label: 'Levels', icon: '📈' },
              { href: '/student/achievements/rewards', label: 'Rewards', icon: '🎁' },
            ]
          },
          {
            href: '/student/certificates',
            label: 'Certificates',
            icon: '🎖️',
            children: [
              { href: '/student/certificates', label: 'My Certificates', icon: '📜' },
              { href: '/student/certificates/pending', label: 'Pending', icon: '⏳' },
              { href: '/student/certificates/verify', label: 'Verify / Share', icon: '🔗' },
            ]
          },
          {
            href: '/student/exams',
            label: 'Exams',
            icon: '📋',
            children: [
              { href: '/student/exams', label: 'Available Exams', icon: '📋' },
              { href: '/student/exams/upcoming', label: 'Upcoming', icon: '📅' },
              { href: '/student/exams/attempts', label: 'My Attempts', icon: '📝' },
              { href: '/student/exams/results', label: 'Results', icon: '📊' },
            ]
          },
          { 
            href: '/student/stories', 
            label: 'Stories', 
            icon: '📖',
            children: [
              { href: '/student/stories', label: 'Discover', icon: '🔍' },
              { href: '/student/stories/following', label: 'Following', icon: '👥' },
              { href: '/student/stories/saved', label: 'Saved', icon: '❤️' },
              { href: '/student/stories/history', label: 'History', icon: '📜' },
            ]
          },
          { 
            href: '/student/analytics/performance', 
            label: 'Analytics', 
            icon: '📊',
            children: [
              { href: '/student/analytics/overview', label: 'Learning Overview', icon: '📊' },
              { href: '/student/analytics/courses', label: 'Course Progress', icon: '📚' },
              { href: '/student/analytics/time', label: 'Time Spent', icon: '⏱️' },
              { href: '/student/analytics/quizzes', label: 'Quiz Performance', icon: '📝' },
              { href: '/student/analytics/exercises', label: 'Exercise Performance', icon: '💻' },
              { href: '/student/analytics/exams', label: 'Exam Performance', icon: '📋' },
              { href: '/student/analytics/skills', label: 'Skills', icon: '🎯' },
              { href: '/student/analytics/activity', label: 'Activity History', icon: '📜' },
            ]
          },
          {
            href: '/student/tools',
            label: 'Tools',
            icon: '🛠️',
            children: [
              { href: '/student/notes', label: 'Notes', icon: '📒' },
              { href: '/student/tools/bookmarks', label: 'Bookmarks', icon: '🔖' },
              { href: '/student/tools/calendar', label: 'Calendar', icon: '📅' },
              { href: '/student/tools/planner', label: 'Study Planner', icon: '📋' },
              { href: '/student/tools/downloads', label: 'Downloads', icon: '⬇️' },
            ]
          },
          { 
            href: '/student/payments', 
            label: 'Payments', 
            icon: '💳',
            children: [
              { href: '/student/payments/purchases', label: 'Purchases', icon: '🛒' },
              { href: '/student/payments/orders', label: 'Orders', icon: '📦' },
              { href: '/student/payments/invoices', label: 'Invoices', icon: '📄' },
              { href: '/student/payments/transactions', label: 'Transactions', icon: '💰' },
              { href: '/student/payments/refunds', label: 'Refunds', icon: '↩️' },
              { href: '/student/payments/methods', label: 'Payment Methods', icon: '💳' },
            ]
          },
          {
            href: '/student/messages',
            label: 'Messages',
            icon: '💬',
            children: [
              { href: '/student/messages', label: 'Inbox', icon: '📥' },
              { href: '/student/messages/conversations', label: 'Conversations', icon: '💬' },
              { href: '/student/messages/outbox', label: 'Outbox', icon: '�' },
            ]
          },
          { 
            href: '/student/notifications', 
            label: 'Notifications', 
            icon: '🔔',
            children: [
              { href: '/student/notifications/all', label: 'All', icon: '🔔' },
              { href: '/student/notifications/learning', label: 'Learning', icon: '🎓' },
              { href: '/student/notifications/assessments', label: 'Assessments', icon: '📝' },
              { href: '/student/notifications/achievements', label: 'Achievements', icon: '🏆' },
              { href: '/student/notifications/payments', label: 'Payments', icon: '💳' },
              { href: '/student/notifications/system', label: 'System', icon: '⚙️' },
            ]
          },
          { 
            href: '/student/account', 
            label: 'Account', 
            icon: '👤',
            children: [
              { href: '/student/account/profile', label: 'Profile', icon: '👤' },
              { href: '/student/account/settings', label: 'Settings', icon: '⚙️' },
              { href: '/student/account/security', label: 'Security', icon: '🔒' },
              { href: '/student/account/preferences', label: 'Preferences', icon: '🎨' },
              { href: '/student/account/privacy', label: 'Privacy', icon: '🔐' },
              { href: '/student/account/devices', label: 'Devices / Sessions', icon: '📱' },
              { href: '/student/account/roles', label: 'Role Switching', icon: '🔄' },
            ]
          },
        ];
      case 'instructor':
        if (instructorType === 'school') {
          return [
            { href: '/instructor/school', label: 'Dashboard', icon: '🏠' },
            {
              href: '/instructor/school/classes',
              label: 'My Classes',
              icon: '🏫',
              children: [
                { href: '/instructor/school/classes', label: 'All Classes', icon: '📚' },
                { href: '/instructor/school/classes/current', label: 'Current Classes', icon: '🔄' },
                { href: '/instructor/school/classes/sections', label: 'Class Sections', icon: '📋' },
                { href: '/instructor/school/classes/archived', label: 'Archived Classes', icon: '📦' },
              ]
            },
            {
              href: '/instructor/school/students',
              label: 'Students',
              icon: '👥',
              children: [
                { href: '/instructor/school/students', label: 'My Students', icon: '👤' },
                { href: '/instructor/school/students/profiles', label: 'Student Profiles', icon: '📋' },
                { href: '/instructor/school/students/progress', label: 'Progress', icon: '📈' },
                { href: '/instructor/school/students/at-risk', label: 'At Risk', icon: '⚠️' },
                { href: '/instructor/school/students/attendance', label: 'Attendance', icon: '📅' },
                { href: '/instructor/school/students/performance', label: 'Performance', icon: '📊' },
              ]
            },
            {
              href: '/instructor/school/courses',
              label: 'Courses',
              icon: '📚',
              children: [
                { href: '/instructor/school/courses', label: 'My Courses', icon: '📖' },
                { href: '/instructor/school/courses/school', label: 'School Courses', icon: '🏫' },
                { href: '/instructor/school/courses/joyedu', label: 'JoyEdu Courses', icon: '🌐' },
                { href: '/instructor/school/courses/content', label: 'Course Content', icon: '📄' },
              ]
            },
            {
              href: '/instructor/school/curriculum',
              label: 'Curriculum',
              icon: '📋',
              children: [
                { href: '/instructor/school/curriculum/subjects', label: 'Subjects', icon: '📚' },
                { href: '/instructor/school/curriculum', label: 'Curriculum', icon: '📖' },
                { href: '/instructor/school/curriculum/units', label: 'Units', icon: '📑' },
                { href: '/instructor/school/curriculum/chapters', label: 'Chapters', icon: '📄' },
                { href: '/instructor/school/curriculum/topics', label: 'Topics', icon: '📝' },
                { href: '/instructor/school/curriculum/lessons', label: 'Lessons', icon: '🎓' },
              ]
            },
            {
              href: '/instructor/school/assignments',
              label: 'Assignments',
              icon: '📝',
              children: [
                { href: '/instructor/school/assignments/create', label: 'Create Assignment', icon: '➕' },
                { href: '/instructor/school/assignments/drafts', label: 'Drafts', icon: '📄' },
                { href: '/instructor/school/assignments/published', label: 'Published', icon: '✅' },
                { href: '/instructor/school/assignments/submissions', label: 'Submissions', icon: '📥' },
                { href: '/instructor/school/assignments/grading', label: 'Grading', icon: '📊' },
                { href: '/instructor/school/assignments/history', label: 'History', icon: '📜' },
              ]
            },
            {
              href: '/instructor/school/quizzes',
              label: 'Quizzes',
              icon: '📋',
              children: [
                { href: '/instructor/school/quizzes/create', label: 'Create Quiz', icon: '➕' },
                { href: '/instructor/school/quizzes/bank', label: 'Question Bank', icon: '📚' },
                { href: '/instructor/school/quizzes/published', label: 'Published', icon: '✅' },
                { href: '/instructor/school/quizzes/attempts', label: 'Attempts', icon: '📝' },
                { href: '/instructor/school/quizzes/results', label: 'Results', icon: '📊' },
              ]
            },
            {
              href: '/instructor/school/exams',
              label: 'Exams',
              icon: '📋',
              children: [
                { href: '/instructor/school/exams', label: 'School Exams', icon: '🏫' },
                { href: '/instructor/school/exams/create', label: 'Create / Manage', icon: '➕' },
                { href: '/instructor/school/exams/schedule', label: 'Exam Schedule', icon: '📅' },
                { href: '/instructor/school/exams/attempts', label: 'Attempts', icon: '📝' },
                { href: '/instructor/school/exams/grading', label: 'Grading', icon: '📊' },
                { href: '/instructor/school/exams/results', label: 'Results', icon: '📈' },
              ]
            },
            {
              href: '/instructor/school/gradebook',
              label: 'Gradebook',
              icon: '📊',
              children: [
                { href: '/instructor/school/gradebook', label: 'Overview', icon: '📊' },
                { href: '/instructor/school/gradebook/classes', label: 'Classes', icon: '🏫' },
                { href: '/instructor/school/gradebook/subjects', label: 'Subjects', icon: '📚' },
                { href: '/instructor/school/gradebook/assessments', label: 'Assessments', icon: '📝' },
                { href: '/instructor/school/gradebook/grades', label: 'Grades', icon: '📊' },
                { href: '/instructor/school/gradebook/final', label: 'Final Grades', icon: '🎓' },
                { href: '/instructor/school/gradebook/reports', label: 'Reports', icon: '📄' },
              ]
            },
            {
              href: '/instructor/school/attendance',
              label: 'Attendance',
              icon: '📅',
              children: [
                { href: '/instructor/school/attendance/take', label: 'Take Attendance', icon: '✅' },
                { href: '/instructor/school/attendance/today', label: 'Today', icon: '📅' },
                { href: '/instructor/school/attendance/class', label: 'Class Attendance', icon: '🏫' },
                { href: '/instructor/school/attendance/subject', label: 'Subject Attendance', icon: '📚' },
                { href: '/instructor/school/attendance/history', label: 'History', icon: '📜' },
              ]
            },
            {
              href: '/instructor/school/timetable',
              label: 'Timetable',
              icon: '🕐',
              children: [
                { href: '/instructor/school/timetable', label: 'My Timetable', icon: '👤' },
                { href: '/instructor/school/timetable/class', label: 'Class Timetable', icon: '🏫' },
                { href: '/instructor/school/timetable/calendar', label: 'Academic Calendar', icon: '📅' },
              ]
            },
            {
              href: '/instructor/school/messages',
              label: 'Communication',
              icon: '💬',
              children: [
                { href: '/instructor/school/messages', label: 'Messages', icon: '💬' },
                { href: '/instructor/school/messages/students', label: 'Students', icon: '👥' },
                { href: '/instructor/school/messages/guardians', label: 'Guardians', icon: '👨‍👩‍👧‍👦' },
                { href: '/instructor/school/messages/school', label: 'School Announcements', icon: '🏫' },
                { href: '/instructor/school/messages/class', label: 'Class Announcements', icon: '📢' },
              ]
            },
            {
              href: '/instructor/school/resources',
              label: 'Resources',
              icon: '📁',
              children: [
                { href: '/instructor/school/resources', label: 'Teaching Materials', icon: '📚' },
                { href: '/instructor/school/resources/files', label: 'Files', icon: '📄' },
                { href: '/instructor/school/resources/courses', label: 'Course Resources', icon: '📖' },
                { href: '/instructor/school/resources/shared', label: 'Shared Resources', icon: '🔗' },
              ]
            },
            {
              href: '/instructor/school/analytics',
              label: 'Analytics',
              icon: '📊',
              children: [
                { href: '/instructor/school/analytics/class', label: 'Class Performance', icon: '🏫' },
                { href: '/instructor/school/analytics/student', label: 'Student Performance', icon: '👤' },
                { href: '/instructor/school/analytics/attendance', label: 'Attendance', icon: '📅' },
                { href: '/instructor/school/analytics/assignments', label: 'Assignment Performance', icon: '📝' },
                { href: '/instructor/school/analytics/quizzes', label: 'Quiz Performance', icon: '📋' },
                { href: '/instructor/school/analytics/exams', label: 'Exam Performance', icon: '📋' },
                { href: '/instructor/school/analytics/learning', label: 'Learning Progress', icon: '📈' },
              ]
            },
            {
              href: '/instructor/school/playground',
              label: 'Playground',
              icon: '🎮',
              children: [
                { href: '/instructor/school/playground', label: 'My Projects', icon: '📁' },
                { href: '/instructor/school/playground/challenges', label: 'Challenges', icon: '🎯' },
                { href: '/instructor/school/playground/student', label: 'Student Projects', icon: '👥' },
              ]
            },
            {
              href: '/instructor/school/achievements',
              label: 'Achievements',
              icon: '🏆',
              children: [
                { href: '/instructor/school/achievements/student', label: 'Student Achievements', icon: '👥' },
                { href: '/instructor/school/achievements/class', label: 'Class Progress', icon: '🏫' },
              ]
            },
            {
              href: '/instructor/school/documents',
              label: 'Documents',
              icon: '📄',
              children: [
                { href: '/instructor/school/documents', label: 'Teaching Documents', icon: '📚' },
                { href: '/instructor/school/documents/reports', label: 'Reports', icon: '📊' },
                { href: '/instructor/school/documents/resources', label: 'Resources', icon: '📁' },
              ]
            },
            {
              href: '/instructor/school/notifications',
              label: 'Notifications',
              icon: '🔔',
              children: [
                { href: '/instructor/school/notifications', label: 'All', icon: '🔔' },
                { href: '/instructor/school/notifications/students', label: 'Students', icon: '👥' },
                { href: '/instructor/school/notifications/assignments', label: 'Assignments', icon: '📝' },
                { href: '/instructor/school/notifications/exams', label: 'Exams', icon: '📋' },
                { href: '/instructor/school/notifications/attendance', label: 'Attendance', icon: '📅' },
                { href: '/instructor/school/notifications/messages', label: 'Messages', icon: '💬' },
                { href: '/instructor/school/notifications/school', label: 'School', icon: '🏫' },
              ]
            },
            {
              href: '/instructor/school/account',
              label: 'Account',
              icon: '👤',
              children: [
                { href: '/instructor/school/account/profile', label: 'Profile', icon: '👤' },
                { href: '/instructor/school/account/settings', label: 'Settings', icon: '⚙️' },
                { href: '/instructor/school/account/security', label: 'Security', icon: '🔒' },
                { href: '/instructor/school/account/switch', label: 'Switch Role / Context', icon: '🔄' },
              ]
            },
          ];
        }
        return [
          { href: '/instructor', label: 'Dashboard', icon: '🏠' },
          {
            href: '/instructor/courses',
            label: 'My Courses',
            icon: '📚',
            children: [
              { href: '/instructor/courses', label: 'All Courses', icon: '📚' },
              { href: '/instructor/courses/drafts', label: 'Drafts', icon: '📄' },
              { href: '/instructor/courses/review', label: 'In Review', icon: '👁️' },
              { href: '/instructor/courses/approved', label: 'Approved', icon: '✅' },
              { href: '/instructor/courses/published', label: 'Published', icon: '🌐' },
              { href: '/instructor/courses/rejected', label: 'Rejected', icon: '❌' },
              { href: '/instructor/courses/archived', label: 'Archived', icon: '📦' },
            ]
          },
          {
            href: '/instructor/builder',
            label: 'Course Builder',
            icon: '🔨',
            children: [
              { href: '/instructor/builder', label: 'Overview', icon: '🔨' },
              { href: '/instructor/builder/create', label: 'Create Course', icon: '➕' },
              { href: '/instructor/builder/info', label: 'Course Information', icon: 'ℹ️' },
              { href: '/instructor/builder/curriculum', label: 'Curriculum', icon: '📋' },
              { href: '/instructor/builder/chapters', label: 'Chapters', icon: '📑' },
              { href: '/instructor/builder/topics', label: 'Topics', icon: '📝' },
              { href: '/instructor/builder/subtopics', label: 'Subtopics', icon: '📄' },
              { href: '/instructor/builder/lessons', label: 'Lessons', icon: '🎓' },
              { href: '/instructor/builder/quizzes', label: 'Quizzes', icon: '📋' },
              { href: '/instructor/builder/exercises', label: 'Exercises', icon: '💻' },
              { href: '/instructor/builder/summaries', label: 'Summaries', icon: '📝' },
              { href: '/instructor/builder/resources', label: 'Resources', icon: '📁' },
              { href: '/instructor/builder/pricing', label: 'Pricing', icon: '💰' },
              { href: '/instructor/builder/settings', label: 'Course Settings', icon: '⚙️' },
              { href: '/instructor/builder/preview', label: 'Preview', icon: '👁️' },
            ]
          },
          {
            href: '/instructor/curriculum',
            label: 'Curriculum',
            icon: '📋',
            children: [
              { href: '/instructor/builder/curriculum', label: 'Courses', icon: '📚' },
              { href: '/instructor/builder/chapters', label: 'Chapters', icon: '📑' },
              { href: '/instructor/builder/topics', label: 'Topics', icon: '📝' },
              { href: '/instructor/builder/subtopics', label: 'Subtopics', icon: '📄' },
              { href: '/instructor/builder/lessons', label: 'Lessons', icon: '🎓' },
              { href: '/instructor/builder/quizzes', label: 'Quizzes', icon: '📋' },
              { href: '/instructor/builder/exercises', label: 'Exercises', icon: '💻' },
              { href: '/instructor/builder/summaries', label: 'Summaries', icon: '📝' },
              { href: '/instructor/builder/curriculum', label: 'Reorder / Manage', icon: '🔄' },
            ]
          },
          {
            href: '/instructor/assessments',
            label: 'Assessments',
            icon: '📝',
            children: [
              { href: '/instructor/assessments/quiz-builder', label: 'Quiz Builder', icon: '📋' },
              { href: '/instructor/assessments/exercise-builder', label: 'Exercise Builder', icon: '💻' },
              { href: '/instructor/assessments/bank', label: 'Question Bank', icon: '📚' },
              { href: '/instructor/assessments/questions', label: 'Questions', icon: '❓' },
              { href: '/instructor/assessments/attempts', label: 'Attempts', icon: '📝' },
              { href: '/instructor/assessments/results', label: 'Results', icon: '📊' },
              { href: '/instructor/assessments/performance', label: 'Performance', icon: '📈' },
            ]
          },
          {
            href: '/instructor/students',
            label: 'Students',
            icon: '👥',
            children: [
              { href: '/instructor/students', label: 'All Students', icon: '👥' },
              { href: '/instructor/students/enrollments', label: 'Enrollments', icon: '📝' },
              { href: '/instructor/students/active', label: 'Active Students', icon: '🔄' },
              { href: '/instructor/students/completed', label: 'Completed Students', icon: '✅' },
              { href: '/instructor/students/progress', label: 'Progress', icon: '📈' },
              { href: '/instructor/students/performance', label: 'Performance', icon: '📊' },
              { href: '/instructor/students/certificates', label: 'Certificates', icon: '🎖️' },
            ]
          },
          {
            href: '/instructor/communication',
            label: 'Communication',
            icon: '💬',
            children: [
              { href: '/instructor/communication/inbox', label: 'Inbox', icon: '📥' },
              { href: '/instructor/communication/messages', label: 'Messages', icon: '💬' },
              { href: '/instructor/communication/discussions', label: 'Course Discussions', icon: '💭' },
              { href: '/instructor/communication/announcements', label: 'Announcements', icon: '📢' },
              { href: '/instructor/communication/questions', label: 'Student Questions', icon: '❓' },
            ]
          },
          {
            href: '/instructor/analytics',
            label: 'Analytics',
            icon: '📊',
            children: [
              { href: '/instructor/analytics', label: 'Overview', icon: '📊' },
              { href: '/instructor/analytics/courses', label: 'Course Analytics', icon: '📚' },
              { href: '/instructor/analytics/students', label: 'Student Analytics', icon: '👥' },
              { href: '/instructor/analytics/enrollments', label: 'Enrollment Analytics', icon: '📝' },
              { href: '/instructor/analytics/completion', label: 'Completion Analytics', icon: '✅' },
              { href: '/instructor/analytics/quizzes', label: 'Quiz Analytics', icon: '📋' },
              { href: '/instructor/analytics/exercises', label: 'Exercise Analytics', icon: '💻' },
              { href: '/instructor/analytics/revenue', label: 'Revenue Analytics', icon: '💰' },
              { href: '/instructor/analytics/engagement', label: 'Engagement', icon: '📈' },
            ]
          },
          {
            href: '/instructor/publishing',
            label: 'Publishing',
            icon: '🚀',
            children: [
              { href: '/instructor/publishing/submit', label: 'Submission', icon: '📤' },
              { href: '/instructor/publishing/status', label: 'Review Status', icon: '👁️' },
              { href: '/instructor/publishing/feedback', label: 'Feedback', icon: '💬' },
              { href: '/instructor/publishing/resubmit', label: 'Resubmission', icon: '🔄' },
              { href: '/instructor/publishing/publish', label: 'Publishing', icon: '🌐' },
              { href: '/instructor/publishing/history', label: 'Version History', icon: '📜' },
              { href: '/instructor/publishing/archive', label: 'Archive', icon: '📦' },
            ]
          },
          {
            href: '/instructor/financial',
            label: 'Financial',
            icon: '💰',
            children: [
              { href: '/instructor/financial', label: 'Overview', icon: '📊' },
              { href: '/instructor/financial/revenue', label: 'Revenue', icon: '💰' },
              { href: '/instructor/financial/sales', label: 'Sales', icon: '🛒' },
              { href: '/instructor/financial/transactions', label: 'Transactions', icon: '💳' },
              { href: '/instructor/financial/earnings', label: 'Earnings', icon: '💵' },
              { href: '/instructor/financial/payouts', label: 'Payouts', icon: '💸' },
              { href: '/instructor/financial/payout-history', label: 'Payout History', icon: '📜' },
              { href: '/instructor/financial/invoices', label: 'Invoices', icon: '📄' },
              { href: '/instructor/financial/tax', label: 'Tax / Financial Info', icon: '🏛️' },
            ]
          },
          {
            href: '/instructor/resources',
            label: 'Resources',
            icon: '📁',
            children: [
              { href: '/instructor/resources/media', label: 'Media', icon: '🎬' },
              { href: '/instructor/resources/files', label: 'Files', icon: '📄' },
              { href: '/instructor/resources/courses', label: 'Course Resources', icon: '📚' },
              { href: '/instructor/resources/templates', label: 'Templates', icon: '📋' },
            ]
          },
          {
            href: '/instructor/profile',
            label: 'Profile',
            icon: '👤',
            children: [
              { href: '/instructor/profile/public', label: 'Public Profile', icon: '🌐' },
              { href: '/instructor/profile/instructor', label: 'Instructor Profile', icon: '👨‍🏫' },
              { href: '/instructor/profile/expertise', label: 'Expertise', icon: '🎯' },
              { href: '/instructor/profile/qualifications', label: 'Qualifications', icon: '🎓' },
              { href: '/instructor/profile/social', label: 'Social Links', icon: '🔗' },
              { href: '/instructor/profile/portfolio', label: 'Portfolio', icon: '💼' },
            ]
          },
          {
            href: '/instructor/notifications',
            label: 'Notifications',
            icon: '🔔',
            children: [
              { href: '/instructor/notifications', label: 'All', icon: '🔔' },
              { href: '/instructor/notifications/students', label: 'Students', icon: '👥' },
              { href: '/instructor/notifications/courses', label: 'Courses', icon: '📚' },
              { href: '/instructor/notifications/reviews', label: 'Reviews', icon: '⭐' },
              { href: '/instructor/notifications/publishing', label: 'Publishing', icon: '🚀' },
              { href: '/instructor/notifications/financial', label: 'Financial', icon: '💰' },
              { href: '/instructor/notifications/system', label: 'System', icon: '⚙️' },
            ]
          },
          {
            href: '/instructor/account',
            label: 'Account',
            icon: '👤',
            children: [
              { href: '/instructor/account/settings', label: 'Settings', icon: '⚙️' },
              { href: '/instructor/account/security', label: 'Security', icon: '🔒' },
              { href: '/instructor/account/preferences', label: 'Preferences', icon: '🎨' },
              { href: '/instructor/account/privacy', label: 'Privacy', icon: '🔐' },
              { href: '/instructor/account/devices', label: 'Devices / Sessions', icon: '📱' },
              { href: '/instructor/account/switch', label: 'Switch Role', icon: '🔄' },
            ]
          },
        ];
      case 'school':
        return [
          { href: '/school/dashboard', label: 'Dashboard', icon: '🏠' },
          {
            href: '/school/management',
            label: 'School Management',
            icon: '🏫',
            children: [
              { href: '/school/management/profile', label: 'School Profile', icon: '📋' },
              { href: '/school/management/information', label: 'School Information', icon: 'ℹ️' },
              { href: '/school/management/branding', label: 'Branding', icon: '🎨' },
              { href: '/school/management/departments', label: 'Departments', icon: '🏢' },
              { href: '/school/management/campuses', label: 'Campuses', icon: '🏗️' },
              { href: '/school/management/buildings', label: 'Buildings', icon: '🏢' },
              { href: '/school/management/rooms', label: 'Rooms', icon: '🚪' },
              { href: '/school/management/policies', label: 'School Policies', icon: '📜' },
            ]
          },
          {
            href: '/school/people',
            label: 'People',
            icon: '👥',
            children: [
              { href: '/school/students', label: 'Students', icon: '👨‍🎓' },
              { href: '/school/instructors', label: 'Instructors / Teachers', icon: '👨‍🏫' },
              { href: '/school/staff', label: 'Staff', icon: '👨‍💼' },
              { href: '/school/guardians', label: 'Guardians', icon: '👨‍👩‍👧‍👦' },
              { href: '/school/administrators', label: 'Administrators', icon: '👔' },
              { href: '/school/contacts', label: 'Contacts', icon: '📞' },
            ]
          },
          {
            href: '/school/admissions',
            label: 'Admissions',
            icon: '📝',
            children: [
              { href: '/school/admissions/applications', label: 'Applications', icon: '📋' },
              { href: '/school/admissions/applicants', label: 'Applicants', icon: '👤' },
              { href: '/school/admissions/review', label: 'Application Review', icon: '👁️' },
              { href: '/school/admissions/entrance-exams', label: 'Entrance Exams', icon: '📝' },
              { href: '/school/admissions/interviews', label: 'Interviews', icon: '💬' },
              { href: '/school/admissions/accepted', label: 'Accepted', icon: '✅' },
              { href: '/school/admissions/rejected', label: 'Rejected', icon: '❌' },
              { href: '/school/admissions/waitlist', label: 'Waitlist', icon: '⏳' },
              { href: '/school/admissions/documents', label: 'Admission Documents', icon: '📄' },
            ]
          },
          {
            href: '/school/enrollment',
            label: 'Enrollment',
            icon: '📝',
            children: [
              { href: '/school/enrollment/enroll', label: 'Enroll Student', icon: '➕' },
              { href: '/school/enrollment/active', label: 'Active Enrollment', icon: '🔄' },
              { href: '/school/enrollment/history', label: 'Enrollment History', icon: '📜' },
              { href: '/school/enrollment/transfers', label: 'Transfers', icon: '🔄' },
              { href: '/school/enrollment/withdrawals', label: 'Withdrawals', icon: '📤' },
              { href: '/school/enrollment/promotions', label: 'Promotions', icon: '⬆️' },
              { href: '/school/enrollment/graduation', label: 'Graduation', icon: '🎓' },
            ]
          },
          {
            href: '/school/academics',
            label: 'Academics',
            icon: '📚',
            children: [
              { href: '/school/academics/years', label: 'Academic Years', icon: '📅' },
              { href: '/school/academics/terms', label: 'Terms / Semesters', icon: '📊' },
              { href: '/school/academics/grades', label: 'Grades', icon: '📈' },
              { href: '/school/academics/classes', label: 'Classes', icon: '🏫' },
              { href: '/school/academics/sections', label: 'Sections', icon: '📋' },
              { href: '/school/academics/subjects', label: 'Subjects', icon: '📚' },
              { href: '/school/academics/departments', label: 'Departments', icon: '🏢' },
              { href: '/school/academics/class-teachers', label: 'Class Teachers', icon: '👨‍🏫' },
              { href: '/school/academics/settings', label: 'Academic Settings', icon: '⚙️' },
            ]
          },
          {
            href: '/school/curriculum',
            label: 'Curriculum',
            icon: '📋',
            children: [
              { href: '/school/curriculum/overview', label: 'Curriculum', icon: '📋' },
              { href: '/school/curriculum/programs', label: 'Programs', icon: '🎯' },
              { href: '/school/curriculum/subjects', label: 'Subjects', icon: '📚' },
              { href: '/school/curriculum/units', label: 'Units', icon: '📑' },
              { href: '/school/curriculum/chapters', label: 'Chapters', icon: '📄' },
              { href: '/school/curriculum/topics', label: 'Topics', icon: '📝' },
              { href: '/school/curriculum/lessons', label: 'Lessons', icon: '🎓' },
              { href: '/school/curriculum/outcomes', label: 'Learning Outcomes', icon: '🎯' },
              { href: '/school/curriculum/resources', label: 'Resources', icon: '📁' },
              { href: '/school/curriculum/mapping', label: 'Curriculum Mapping', icon: '🗺️' },
            ]
          },
          {
            href: '/school/courses',
            label: 'Courses',
            icon: '📖',
            children: [
              { href: '/school/courses/school', label: 'School Courses', icon: '🏫' },
              { href: '/school/courses/joyedu', label: 'JoyEdu Courses', icon: '🌐' },
              { href: '/school/courses/assigned', label: 'Assigned Courses', icon: '📋' },
              { href: '/school/courses/catalog', label: 'Course Catalog', icon: '📚' },
              { href: '/school/courses/enrollments', label: 'Enrollments', icon: '👥' },
              { href: '/school/courses/settings', label: 'Course Settings', icon: '⚙️' },
            ]
          },
          {
            href: '/school/timetable',
            label: 'Timetable',
            icon: '🕐',
            children: [
              { href: '/school/timetable/master', label: 'Master Timetable', icon: '📊' },
              { href: '/school/timetable/class', label: 'Class Timetable', icon: '🏫' },
              { href: '/school/timetable/teacher', label: 'Teacher Timetable', icon: '👨‍🏫' },
              { href: '/school/timetable/room', label: 'Room Timetable', icon: '🚪' },
              { href: '/school/timetable/periods', label: 'Periods', icon: '⏰' },
              { href: '/school/timetable/scheduling', label: 'Scheduling', icon: '📅' },
              { href: '/school/timetable/conflicts', label: 'Conflicts', icon: '⚠️' },
            ]
          },
          {
            href: '/school/attendance',
            label: 'Attendance',
            icon: '📅',
            children: [
              { href: '/school/attendance/overview', label: 'Overview', icon: '📊' },
              { href: '/school/attendance/students', label: 'Student Attendance', icon: '👨‍🎓' },
              { href: '/school/attendance/teachers', label: 'Teacher Attendance', icon: '👨‍🏫' },
              { href: '/school/attendance/staff', label: 'Staff Attendance', icon: '👨‍💼' },
              { href: '/school/attendance/daily', label: 'Daily Attendance', icon: '📅' },
              { href: '/school/attendance/class', label: 'Class Attendance', icon: '🏫' },
              { href: '/school/attendance/subject', label: 'Subject Attendance', icon: '📚' },
              { href: '/school/attendance/absences', label: 'Absences', icon: '❌' },
              { href: '/school/attendance/late', label: 'Late Arrivals', icon: '⏰' },
              { href: '/school/attendance/reports', label: 'Attendance Reports', icon: '📊' },
            ]
          },
          {
            href: '/school/assignments',
            label: 'Assignments',
            icon: '📝',
            children: [
              { href: '/school/assignments/all', label: 'All Assignments', icon: '📋' },
              { href: '/school/assignments/create', label: 'Create Assignment', icon: '➕' },
              { href: '/school/assignments/drafts', label: 'Drafts', icon: '📄' },
              { href: '/school/assignments/published', label: 'Published', icon: '✅' },
              { href: '/school/assignments/submissions', label: 'Submissions', icon: '📥' },
              { href: '/school/assignments/grading', label: 'Grading', icon: '📊' },
              { href: '/school/assignments/reports', label: 'Assignment Reports', icon: '📈' },
            ]
          },
          {
            href: '/school/quizzes',
            label: 'Quizzes',
            icon: '📋',
            children: [
              { href: '/school/quizzes/library', label: 'Quiz Library', icon: '📚' },
              { href: '/school/quizzes/create', label: 'Create Quiz', icon: '➕' },
              { href: '/school/quizzes/bank', label: 'Question Bank', icon: '📖' },
              { href: '/school/quizzes/published', label: 'Published', icon: '✅' },
              { href: '/school/quizzes/attempts', label: 'Attempts', icon: '📝' },
              { href: '/school/quizzes/results', label: 'Results', icon: '📊' },
              { href: '/school/quizzes/analytics', label: 'Analytics', icon: '📈' },
            ]
          },
          {
            href: '/school/examination',
            label: 'Examination',
            icon: '📋',
            children: [
              { href: '/school/examination/dashboard', label: 'Examination Dashboard', icon: '📊' },
              { href: '/school/examination/types', label: 'Exam Types', icon: '🏷️' },
              { href: '/school/examination/schedules', label: 'Exam Schedules', icon: '📅' },
              { href: '/school/examination/rooms', label: 'Exam Rooms', icon: '🚪' },
              { href: '/school/examination/candidates', label: 'Exam Candidates', icon: '👥' },
              { href: '/school/examination/banks', label: 'Question Banks', icon: '📚' },
              { href: '/school/examination/papers', label: 'Exam Papers', icon: '📄' },
              { href: '/school/examination/attempts', label: 'Exam Attempts', icon: '📝' },
              { href: '/school/examination/grading', label: 'Grading', icon: '📊' },
              { href: '/school/examination/results', label: 'Results', icon: '📈' },
              { href: '/school/examination/report-cards', label: 'Report Cards', icon: '🎓' },
              { href: '/school/examination/reports', label: 'Examination Reports', icon: '📊' },
            ]
          },
          {
            href: '/school/gradebook',
            label: 'Gradebook',
            icon: '📊',
            children: [
              { href: '/school/gradebook/overview', label: 'Overview', icon: '📊' },
              { href: '/school/gradebook/classes', label: 'Classes', icon: '🏫' },
              { href: '/school/gradebook/subjects', label: 'Subjects', icon: '📚' },
              { href: '/school/gradebook/assessments', label: 'Assessments', icon: '📝' },
              { href: '/school/gradebook/entry', label: 'Grade Entry', icon: '✏️' },
              { href: '/school/gradebook/approval', label: 'Grade Approval', icon: '✅' },
              { href: '/school/gradebook/final', label: 'Final Grades', icon: '🎓' },
              { href: '/school/gradebook/gpa', label: 'GPA / Averages', icon: '📈' },
              { href: '/school/gradebook/cards', label: 'Report Cards', icon: '🎓' },
              { href: '/school/gradebook/reports', label: 'Grade Reports', icon: '📊' },
            ]
          },
          {
            href: '/school/student-services',
            label: 'Student Services',
            icon: '🎓',
            children: [
              { href: '/school/student-services/profiles', label: 'Student Profiles', icon: '👤' },
              { href: '/school/student-services/documents', label: 'Student Documents', icon: '📄' },
              { href: '/school/student-services/id-cards', label: 'Student ID Cards', icon: '🪪' },
              { href: '/school/student-services/certificates', label: 'Certificates', icon: '🎖️' },
              { href: '/school/student-services/requests', label: 'Student Requests', icon: '📝' },
              { href: '/school/student-services/leave', label: 'Leave Requests', icon: '📅' },
              { href: '/school/student-services/transfers', label: 'Transfers', icon: '🔄' },
              { href: '/school/student-services/support', label: 'Student Support', icon: '🆘' },
            ]
          },
          {
            href: '/school/discipline',
            label: 'Discipline',
            icon: '⚖️',
            children: [
              { href: '/school/discipline/incidents', label: 'Incidents', icon: '⚠️' },
              { href: '/school/discipline/cases', label: 'Cases', icon: '📋' },
              { href: '/school/discipline/warnings', label: 'Warnings', icon: '⚠️' },
              { href: '/school/discipline/actions', label: 'Actions', icon: '🔨' },
              { href: '/school/discipline/suspensions', label: 'Suspensions', icon: '🚫' },
              { href: '/school/discipline/resolutions', label: 'Resolutions', icon: '✅' },
              { href: '/school/discipline/reports', label: 'Reports', icon: '📊' },
            ]
          },
          {
            href: '/school/communication',
            label: 'Communication',
            icon: '💬',
            children: [
              { href: '/school/communication/announcements', label: 'Announcements', icon: '📢' },
              { href: '/school/communication/messages', label: 'Messages', icon: '💬' },
              { href: '/school/communication/conversations', label: 'Conversations', icon: '💭' },
              { href: '/school/communication/students', label: 'Student Communication', icon: '👨‍🎓' },
              { href: '/school/communication/teachers', label: 'Teacher Communication', icon: '👨‍🏫' },
              { href: '/school/communication/guardians', label: 'Guardian Communication', icon: '👨‍👩‍👧‍👦' },
              { href: '/school/communication/class', label: 'Class Announcements', icon: '🏫' },
              { href: '/school/communication/notifications', label: 'Notification Center', icon: '🔔' },
            ]
          },
          {
            href: '/school/calendar',
            label: 'Calendar & Events',
            icon: '📅',
            children: [
              { href: '/school/calendar/school', label: 'School Calendar', icon: '🏫' },
              { href: '/school/calendar/academic', label: 'Academic Calendar', icon: '📚' },
              { href: '/school/calendar/events', label: 'Events', icon: '🎉' },
              { href: '/school/calendar/holidays', label: 'Holidays', icon: '🏖️' },
              { href: '/school/calendar/meetings', label: 'Meetings', icon: '🤝' },
              { href: '/school/calendar/examinations', label: 'Examinations', icon: '📝' },
              { href: '/school/calendar/activities', label: 'Activities', icon: '🎯' },
            ]
          },
          {
            href: '/school/finance',
            label: 'Finance',
            icon: '💰',
            children: [
              { href: '/school/finance/dashboard', label: 'Finance Dashboard', icon: '📊' },
              { href: '/school/finance/fees', label: 'Student Fees', icon: '💵' },
              { href: '/school/finance/structures', label: 'Fee Structures', icon: '📋' },
              { href: '/school/finance/invoices', label: 'Invoices', icon: '📄' },
              { href: '/school/finance/payments', label: 'Payments', icon: '💳' },
              { href: '/school/finance/outstanding', label: 'Outstanding Balances', icon: '⚠️' },
              { href: '/school/finance/refunds', label: 'Refunds', icon: '↩️' },
              { href: '/school/finance/expenses', label: 'Expenses', icon: '💸' },
              { href: '/school/finance/budgets', label: 'Budgets', icon: '📊' },
              { href: '/school/finance/scholarships', label: 'Scholarships', icon: '🎓' },
              { href: '/school/finance/discounts', label: 'Discounts', icon: '🏷️' },
              { href: '/school/finance/payroll', label: 'Payroll', icon: '💼' },
              { href: '/school/finance/reports', label: 'Financial Reports', icon: '📈' },
            ]
          },
          {
            href: '/school/hr',
            label: 'HR',
            icon: '👥',
            children: [
              { href: '/school/hr/employees', label: 'Employees', icon: '👤' },
              { href: '/school/hr/teachers', label: 'Teacher Management', icon: '👨‍🏫' },
              { href: '/school/hr/staff', label: 'Staff Management', icon: '👨‍💼' },
              { href: '/school/hr/departments', label: 'Departments', icon: '🏢' },
              { href: '/school/hr/positions', label: 'Positions', icon: '💼' },
              { href: '/school/hr/contracts', label: 'Contracts', icon: '📄' },
              { href: '/school/hr/leave', label: 'Leave', icon: '📅' },
              { href: '/school/hr/attendance', label: 'Attendance', icon: '📊' },
              { href: '/school/hr/payroll', label: 'Payroll', icon: '💰' },
              { href: '/school/hr/performance', label: 'Performance', icon: '📈' },
              { href: '/school/hr/recruitment', label: 'Recruitment', icon: '🔍' },
              { href: '/school/hr/reports', label: 'HR Reports', icon: '📊' },
            ]
          },
          {
            href: '/school/library',
            label: 'Library',
            icon: '📚',
            children: [
              { href: '/school/library/dashboard', label: 'Library Dashboard', icon: '📊' },
              { href: '/school/library/books', label: 'Books', icon: '📖' },
              { href: '/school/library/categories', label: 'Categories', icon: '🏷️' },
              { href: '/school/library/authors', label: 'Authors', icon: '✍️' },
              { href: '/school/library/copies', label: 'Copies', icon: '📚' },
              { href: '/school/library/members', label: 'Members', icon: '👥' },
              { href: '/school/library/borrowing', label: 'Borrowing', icon: '📤' },
              { href: '/school/library/returns', label: 'Returns', icon: '📥' },
              { href: '/school/library/reservations', label: 'Reservations', icon: '🔒' },
              { href: '/school/library/fines', label: 'Fines', icon: '💰' },
              { href: '/school/library/reports', label: 'Library Reports', icon: '📊' },
            ]
          },
          {
            href: '/school/transport',
            label: 'Transport',
            icon: '🚌',
            children: [
              { href: '/school/transport/dashboard', label: 'Transport Dashboard', icon: '📊' },
              { href: '/school/transport/vehicles', label: 'Vehicles', icon: '🚗' },
              { href: '/school/transport/routes', label: 'Routes', icon: '🗺️' },
              { href: '/school/transport/stops', label: 'Stops', icon: '🛑' },
              { href: '/school/transport/drivers', label: 'Drivers', icon: '👨‍✈️' },
              { href: '/school/transport/attendants', label: 'Attendants', icon: '👨‍💼' },
              { href: '/school/transport/assignments', label: 'Assignments', icon: '📋' },
              { href: '/school/transport/students', label: 'Student Transport', icon: '👨‍🎓' },
              { href: '/school/transport/tracking', label: 'Tracking', icon: '📍' },
              { href: '/school/transport/maintenance', label: 'Maintenance', icon: '🔧' },
              { href: '/school/transport/reports', label: 'Transport Reports', icon: '📊' },
            ]
          },
          {
            href: '/school/inventory',
            label: 'Inventory',
            icon: '📦',
            children: [
              { href: '/school/inventory/dashboard', label: 'Inventory Dashboard', icon: '📊' },
              { href: '/school/inventory/items', label: 'Items', icon: '📦' },
              { href: '/school/inventory/categories', label: 'Categories', icon: '🏷️' },
              { href: '/school/inventory/locations', label: 'Locations', icon: '📍' },
              { href: '/school/inventory/stock', label: 'Stock', icon: '📊' },
              { href: '/school/inventory/stock-in', label: 'Stock In', icon: '📥' },
              { href: '/school/inventory/stock-out', label: 'Stock Out', icon: '📤' },
              { href: '/school/inventory/transfers', label: 'Transfers', icon: '🔄' },
              { href: '/school/inventory/adjustments', label: 'Adjustments', icon: '⚙️' },
              { href: '/school/inventory/assets', label: 'Assets', icon: '💼' },
              { href: '/school/inventory/reports', label: 'Inventory Reports', icon: '📊' },
            ]
          },
          {
            href: '/school/procurement',
            label: 'Procurement',
            icon: '🛒',
            children: [
              { href: '/school/procurement/dashboard', label: 'Procurement Dashboard', icon: '📊' },
              { href: '/school/procurement/requests', label: 'Requests', icon: '📝' },
              { href: '/school/procurement/requisitions', label: 'Purchase Requisitions', icon: '📋' },
              { href: '/school/procurement/orders', label: 'Purchase Orders', icon: '📄' },
              { href: '/school/procurement/suppliers', label: 'Suppliers', icon: '🏢' },
              { href: '/school/procurement/quotations', label: 'Quotations', icon: '💰' },
              { href: '/school/procurement/approvals', label: 'Approvals', icon: '✅' },
              { href: '/school/procurement/receiving', label: 'Receiving', icon: '📥' },
              { href: '/school/procurement/invoices', label: 'Invoices', icon: '📄' },
              { href: '/school/procurement/reports', label: 'Procurement Reports', icon: '📊' },
            ]
          },
          {
            href: '/school/health',
            label: 'Health',
            icon: '🏥',
            children: [
              { href: '/school/health/dashboard', label: 'Health Dashboard', icon: '📊' },
              { href: '/school/health/profiles', label: 'Student Health Profiles', icon: '👤' },
              { href: '/school/health/records', label: 'Medical Records', icon: '📋' },
              { href: '/school/health/visits', label: 'Visits', icon: '🏥' },
              { href: '/school/health/incidents', label: 'Incidents', icon: '⚠️' },
              { href: '/school/health/medications', label: 'Medications', icon: '💊' },
              { href: '/school/health/immunizations', label: 'Immunizations', icon: '💉' },
              { href: '/school/health/reports', label: 'Health Reports', icon: '📊' },
            ]
          },
          {
            href: '/school/extracurricular',
            label: 'Extracurricular',
            icon: '🎯',
            children: [
              { href: '/school/extracurricular/clubs', label: 'Clubs', icon: '🎪' },
              { href: '/school/extracurricular/activities', label: 'Activities', icon: '🎯' },
              { href: '/school/extracurricular/sports', label: 'Sports', icon: '⚽' },
              { href: '/school/extracurricular/teams', label: 'Teams', icon: '👥' },
              { href: '/school/extracurricular/competitions', label: 'Competitions', icon: '🏆' },
              { href: '/school/extracurricular/memberships', label: 'Memberships', icon: '👤' },
              { href: '/school/extracurricular/achievements', label: 'Achievements', icon: '🎖️' },
            ]
          },
          {
            href: '/school/alumni',
            label: 'Alumni',
            icon: '🎓',
            children: [
              { href: '/school/alumni/directory', label: 'Alumni Directory', icon: '📖' },
              { href: '/school/alumni/graduates', label: 'Graduates', icon: '🎓' },
              { href: '/school/alumni/profiles', label: 'Alumni Profiles', icon: '👤' },
              { href: '/school/alumni/events', label: 'Events', icon: '🎉' },
              { href: '/school/alumni/communication', label: 'Communication', icon: '💬' },
              { href: '/school/alumni/reports', label: 'Alumni Reports', icon: '📊' },
            ]
          },
          {
            href: '/school/documents',
            label: 'Documents',
            icon: '📄',
            children: [
              { href: '/school/documents/center', label: 'Document Center', icon: '📁' },
              { href: '/school/documents/student', label: 'Student Documents', icon: '👨‍🎓' },
              { href: '/school/documents/staff', label: 'Staff Documents', icon: '👨‍💼' },
              { href: '/school/documents/academic', label: 'Academic Documents', icon: '📚' },
              { href: '/school/documents/certificates', label: 'Certificates', icon: '🎖️' },
              { href: '/school/documents/report-cards', label: 'Report Cards', icon: '🎓' },
              { href: '/school/documents/templates', label: 'Templates', icon: '📋' },
              { href: '/school/documents/verification', label: 'Document Verification', icon: '✅' },
            ]
          },
          {
            href: '/school/id-cards',
            label: 'ID Cards',
            icon: '🪪',
            children: [
              { href: '/school/id-cards/students', label: 'Student ID Cards', icon: '👨‍🎓' },
              { href: '/school/id-cards/teachers', label: 'Teacher ID Cards', icon: '👨‍🏫' },
              { href: '/school/id-cards/staff', label: 'Staff ID Cards', icon: '👨‍💼' },
              { href: '/school/id-cards/templates', label: 'Card Templates', icon: '📋' },
              { href: '/school/id-cards/printing', label: 'Printing', icon: '🖨️' },
              { href: '/school/id-cards/status', label: 'Card Status', icon: '📊' },
            ]
          },
          {
            href: '/school/analytics',
            label: 'Analytics',
            icon: '📊',
            children: [
              { href: '/school/analytics/overview', label: 'Overview', icon: '📊' },
              { href: '/school/analytics/students', label: 'Student Analytics', icon: '👨‍🎓' },
              { href: '/school/analytics/academic', label: 'Academic Analytics', icon: '📚' },
              { href: '/school/analytics/attendance', label: 'Attendance Analytics', icon: '📅' },
              { href: '/school/analytics/teachers', label: 'Teacher Analytics', icon: '👨‍🏫' },
              { href: '/school/analytics/finance', label: 'Finance Analytics', icon: '💰' },
              { href: '/school/analytics/enrollment', label: 'Enrollment Analytics', icon: '📝' },
              { href: '/school/analytics/examination', label: 'Examination Analytics', icon: '📋' },
              { href: '/school/analytics/operational', label: 'Operational Analytics', icon: '⚙️' },
            ]
          },
          {
            href: '/school/reports',
            label: 'Reports',
            icon: '📊',
            children: [
              { href: '/school/reports/students', label: 'Student Reports', icon: '👨‍🎓' },
              { href: '/school/reports/academic', label: 'Academic Reports', icon: '📚' },
              { href: '/school/reports/attendance', label: 'Attendance Reports', icon: '📅' },
              { href: '/school/reports/finance', label: 'Finance Reports', icon: '💰' },
              { href: '/school/reports/hr', label: 'HR Reports', icon: '👥' },
              { href: '/school/reports/examination', label: 'Examination Reports', icon: '📋' },
              { href: '/school/reports/inventory', label: 'Inventory Reports', icon: '📦' },
              { href: '/school/reports/transport', label: 'Transport Reports', icon: '🚌' },
              { href: '/school/reports/custom', label: 'Custom Reports', icon: '⚙️' },
            ]
          },
          {
            href: '/school/website',
            label: 'School Website',
            icon: '🌐',
            children: [
              { href: '/school/website/dashboard', label: 'Website Dashboard', icon: '📊' },
              { href: '/school/website/pages', label: 'Pages', icon: '📄' },
              { href: '/school/website/homepage', label: 'Homepage', icon: '🏠' },
              { href: '/school/website/news', label: 'News', icon: '📰' },
              { href: '/school/website/events', label: 'Events', icon: '🎉' },
              { href: '/school/website/gallery', label: 'Gallery', icon: '🖼️' },
              { href: '/school/website/programs', label: 'Programs', icon: '🎯' },
              { href: '/school/website/admissions', label: 'Admissions', icon: '📝' },
              { href: '/school/website/directory', label: 'Staff Directory', icon: '👥' },
              { href: '/school/website/contact', label: 'Contact Information', icon: '📞' },
              { href: '/school/website/settings', label: 'Website Settings', icon: '⚙️' },
            ]
          },
          {
            href: '/school/front-desk',
            label: 'Front Desk',
            icon: '🚪',
            children: [
              { href: '/school/front-desk/visitors', label: 'Visitors', icon: '👤' },
              { href: '/school/front-desk/log', label: 'Visitor Log', icon: '📋' },
              { href: '/school/front-desk/appointments', label: 'Appointments', icon: '📅' },
              { href: '/school/front-desk/checkin', label: 'Check-in / Check-out', icon: '✅' },
              { href: '/school/front-desk/deliveries', label: 'Deliveries', icon: '📦' },
              { href: '/school/front-desk/reports', label: 'Front Desk Reports', icon: '📊' },
            ]
          },
          {
            href: '/school/support',
            label: 'Support',
            icon: '🆘',
            children: [
              { href: '/school/support/dashboard', label: 'Support Dashboard', icon: '📊' },
              { href: '/school/support/tickets', label: 'Tickets', icon: '🎫' },
              { href: '/school/support/open', label: 'Open Tickets', icon: '📂' },
              { href: '/school/support/assigned', label: 'Assigned Tickets', icon: '👤' },
              { href: '/school/support/resolved', label: 'Resolved Tickets', icon: '✅' },
              { href: '/school/support/knowledge', label: 'Knowledge Base', icon: '📚' },
            ]
          },
          {
            href: '/school/settings',
            label: 'Settings',
            icon: '⚙️',
            children: [
              { href: '/school/settings/school', label: 'School Settings', icon: '🏫' },
              { href: '/school/settings/academic', label: 'Academic Settings', icon: '📚' },
              { href: '/school/settings/attendance', label: 'Attendance Settings', icon: '📅' },
              { href: '/school/settings/grading', label: 'Grading Settings', icon: '📊' },
              { href: '/school/settings/examination', label: 'Examination Settings', icon: '📋' },
              { href: '/school/settings/finance', label: 'Finance Settings', icon: '💰' },
              { href: '/school/settings/notifications', label: 'Notification Settings', icon: '🔔' },
              { href: '/school/settings/roles', label: 'Role & Permissions', icon: '👤' },
              { href: '/school/settings/integrations', label: 'Integrations', icon: '🔗' },
              { href: '/school/settings/data', label: 'Data / Import / Export', icon: '💾' },
              { href: '/school/settings/security', label: 'Security', icon: '🔒' },
            ]
          },
          {
            href: '/school/audit',
            label: 'Audit',
            icon: '🔍',
            children: [
              { href: '/school/audit/dashboard', label: 'Audit Dashboard', icon: '📊' },
              { href: '/school/audit/logs', label: 'Activity Logs', icon: '📋' },
              { href: '/school/audit/login', label: 'Login History', icon: '🔐' },
              { href: '/school/audit/changes', label: 'Data Changes', icon: '🔄' },
              { href: '/school/audit/financial', label: 'Financial Audit', icon: '💰' },
              { href: '/school/audit/security', label: 'Security Events', icon: '🚨' },
              { href: '/school/audit/compliance', label: 'Compliance', icon: '✅' },
            ]
          },
        ];
      case 'admin':
        return [
          { href: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
          {
            href: '/admin/users',
            label: 'Users',
            icon: '👥',
            children: [
              { href: '/admin/users', label: 'All Users', icon: '👥' },
              { href: '/admin/users/students', label: 'Students', icon: '👨‍🎓' },
              { href: '/admin/users/instructors', label: 'Instructors', icon: '👨‍🏫' },
              { href: '/admin/users/school-admins', label: 'School Admins', icon: '👔' },
              { href: '/admin/users/platform-admins', label: 'Platform Admins', icon: '🛡️' },
              { href: '/admin/users/verification', label: 'Verification', icon: '✅' },
              { href: '/admin/users/banned', label: 'Banned Users', icon: '🚫' },
            ]
          },
          {
            href: '/admin/courses',
            label: 'Courses',
            icon: '📚',
            children: [
              { href: '/admin/courses', label: 'All Courses', icon: '📚' },
              { href: '/admin/courses/published', label: 'Published', icon: '✅' },
              { href: '/admin/courses/drafts', label: 'Drafts', icon: '📄' },
              { href: '/admin/courses/review', label: 'Under Review', icon: '👁️' },
              { href: '/admin/courses/flagged', label: 'Flagged', icon: '🚩' },
              { href: '/admin/courses/categories', label: 'Categories', icon: '🏷️' },
              { href: '/admin/courses/approval', label: 'Course Approval', icon: '✅' },
            ]
          },
          {
            href: '/admin/schools',
            label: 'Schools',
            icon: '🏫',
            children: [
              { href: '/admin/schools', label: 'All Schools', icon: '🏫' },
              { href: '/admin/schools/active', label: 'Active Schools', icon: '✅' },
              { href: '/admin/schools/pending', label: 'Pending Approval', icon: '⏳' },
              { href: '/admin/schools/suspended', label: 'Suspended', icon: '🚫' },
              { href: '/admin/schools/verification', label: 'School Verification', icon: '✅' },
              { href: '/admin/schools/analytics', label: 'School Analytics', icon: '📊' },
            ]
          },
          {
            href: '/admin/applications',
            label: 'Applications',
            icon: '📝',
            badge: 5,
            children: [
              { href: '/admin/applications', label: 'All Applications', icon: '📝' },
              { href: '/admin/applications/instructors', label: 'Instructor Applications', icon: '👨‍🏫' },
              { href: '/admin/applications/schools', label: 'School Applications', icon: '🏫' },
              { href: '/admin/applications/pending', label: 'Pending Review', icon: '⏳' },
              { href: '/admin/applications/approved', label: 'Approved', icon: '✅' },
              { href: '/admin/applications/rejected', label: 'Rejected', icon: '❌' },
            ]
          },
          {
            href: '/admin/finance',
            label: 'Finance',
            icon: '💰',
            children: [
              { href: '/admin/finance', label: 'Overview', icon: '📊' },
              { href: '/admin/finance/revenue', label: 'Revenue', icon: '💵' },
              { href: '/admin/finance/transactions', label: 'Transactions', icon: '💳' },
              { href: '/admin/finance/payouts', label: 'Payouts', icon: '💸' },
              { href: '/admin/finance/subscriptions', label: 'Subscriptions', icon: '📋' },
              { href: '/admin/finance/invoices', label: 'Invoices', icon: '📄' },
              { href: '/admin/finance/refunds', label: 'Refunds', icon: '↩️' },
              { href: '/admin/finance/tax', label: 'Tax Reports', icon: '🏛️' },
            ]
          },
          {
            href: '/admin/moderation',
            label: 'Moderation',
            icon: '🛡️',
            children: [
              { href: '/admin/moderation', label: 'Moderation Queue', icon: '🛡️' },
              { href: '/admin/moderation/content', label: 'Content Moderation', icon: '📝' },
              { href: '/admin/moderation/reports', label: 'User Reports', icon: '🚨' },
              { href: '/admin/moderation/comments', label: 'Comments', icon: '💬' },
              { href: '/admin/moderation/reviews', label: 'Reviews', icon: '⭐' },
              { href: '/admin/moderation/spam', label: 'Spam Detection', icon: '📧' },
              { href: '/admin/moderation/harassment', label: 'Harassment Reports', icon: '⚠️' },
            ]
          },
          {
            href: '/admin/security',
            label: 'Security',
            icon: '🔒',
            children: [
              { href: '/admin/security', label: 'Security Overview', icon: '🔒' },
              { href: '/admin/security/alerts', label: 'Security Alerts', icon: '🚨' },
              { href: '/admin/security/login', label: 'Login Activity', icon: '🔐' },
              { href: '/admin/security/sessions', label: 'Active Sessions', icon: '📱' },
              { href: '/admin/security/2fa', label: 'Two-Factor Auth', icon: '🔑' },
              { href: '/admin/security/ip', label: 'IP Whitelist', icon: '🌐' },
              { href: '/admin/security/audit', label: 'Security Audit', icon: '🔍' },
            ]
          },
          {
            href: '/admin/analytics',
            label: 'Analytics',
            icon: '📊',
            children: [
              { href: '/admin/analytics', label: 'Overview', icon: '📊' },
              { href: '/admin/analytics/users', label: 'User Analytics', icon: '👥' },
              { href: '/admin/analytics/courses', label: 'Course Analytics', icon: '📚' },
              { href: '/admin/analytics/schools', label: 'School Analytics', icon: '🏫' },
              { href: '/admin/analytics/revenue', label: 'Revenue Analytics', icon: '💰' },
              { href: '/admin/analytics/engagement', label: 'Engagement', icon: '📈' },
              { href: '/admin/analytics/retention', label: 'Retention', icon: '♻️' },
              { href: '/admin/analytics/performance', label: 'Performance', icon: '⚡' },
            ]
          },
          {
            href: '/admin/operations',
            label: 'Operations',
            icon: '⚙️',
            children: [
              { href: '/admin/operations', label: 'Operations Overview', icon: '⚙️' },
              { href: '/admin/operations/system', label: 'System Status', icon: '🖥️' },
              { href: '/admin/operations/database', label: 'Database', icon: '🗄️' },
              { href: '/admin/operations/api', label: 'API Management', icon: '🔌' },
              { href: '/admin/operations/cdn', label: 'CDN', icon: '🌐' },
              { href: '/admin/operations/backups', label: 'Backups', icon: '💾' },
              { href: '/admin/operations/logs', label: 'System Logs', icon: '📋' },
              { href: '/admin/operations/maintenance', label: 'Maintenance', icon: '🔧' },
            ]
          },
          {
            href: '/admin/configuration',
            label: 'Configuration',
            icon: '🔧',
            children: [
              { href: '/admin/configuration', label: 'Platform Settings', icon: '⚙️' },
              { href: '/admin/configuration/features', label: 'Feature Flags', icon: '🚩' },
              { href: '/admin/configuration/integrations', label: 'Integrations', icon: '🔗' },
              { href: '/admin/configuration/payment', label: 'Payment Gateways', icon: '💳' },
              { href: '/admin/configuration/email', label: 'Email Settings', icon: '📧' },
              { href: '/admin/configuration/sms', label: 'SMS Settings', icon: '📱' },
              { href: '/admin/configuration/storage', label: 'Storage', icon: '☁️' },
              { href: '/admin/configuration/api', label: 'API Configuration', icon: '🔌' },
            ]
          },
          {
            href: '/admin/notifications',
            label: 'Notifications',
            icon: '🔔',
            children: [
              { href: '/admin/notifications', label: 'Notification Center', icon: '🔔' },
              { href: '/admin/notifications/send', label: 'Send Notification', icon: '📤' },
              { href: '/admin/notifications/templates', label: 'Templates', icon: '📋' },
              { href: '/admin/notifications/history', label: 'History', icon: '📜' },
              { href: '/admin/notifications/settings', label: 'Notification Settings', icon: '⚙️' },
              { href: '/admin/notifications/push', label: 'Push Notifications', icon: '📱' },
              { href: '/admin/notifications/email', label: 'Email Notifications', icon: '📧' },
            ]
          },
          {
            href: '/admin/settings',
            label: 'Settings',
            icon: '⚙️',
            children: [
              { href: '/admin/settings', label: 'Platform Settings', icon: '⚙️' },
              { href: '/admin/settings/general', label: 'General', icon: '📋' },
              { href: '/admin/settings/legal', label: 'Legal & Compliance', icon: '⚖️' },
              { href: '/admin/settings/privacy', label: 'Privacy Policy', icon: '🔒' },
              { href: '/admin/settings/terms', label: 'Terms of Service', icon: '📜' },
              { href: '/admin/settings/support', label: 'Support Settings', icon: '🆘' },
              { href: '/admin/settings/admin', label: 'Admin Management', icon: '🛡️' },
            ]
          },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.href);

    return (
      <li key={item.href}>
        <div className="flex items-center">
          <Link
            href={item.href}
            onClick={onClose}
            className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
              isActive
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            style={{ paddingLeft: `${12 + level * 16}px` }}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && (
              <>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
          {hasChildren && !collapsed && (
            <button
              onClick={() => toggleExpanded(item.href)}
              className="p-1 hover:bg-gray-100 rounded transition"
            >
              <svg 
                className={`h-4 w-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        {hasChildren && isExpanded && !collapsed && (
          <ul className="mt-1 space-y-1">
            {item.children?.map((child) => renderNavItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold">
              J
            </div>
            <span className="font-bold text-gray-900">JoyEdu</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {collapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
              {userName?.substring(0, 2).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">{userName || 'User'}</div>
              <div className="text-xs text-gray-500 capitalize">{actor}</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="p-4 overflow-y-auto h-[calc(100vh-200px)]">
        <ul className="space-y-1">
          {navItems.map((item) => renderNavItem(item))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <Link
          href="/auth/login"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <span className="text-xl">🚪</span>
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  );
}