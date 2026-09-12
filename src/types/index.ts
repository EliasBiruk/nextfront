/**
 * JoyEdu Frontend Data Model Types
 * 
 * This file defines the normalized frontend data model types and interfaces
 * that align with realistic backend payload structures for the prototype.
 * 
 * These types are used across the application for type safety and to ensure
 * consistency between mock data and expected backend responses.
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum UserRole {
  GUEST = 'guest',
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  SCHOOL = 'school',
  ADMIN = 'admin',
}

export enum SchoolRole {
  OWNER = 'owner',
  ADMINISTRATOR = 'administrator',
  TEACHER = 'teacher',
  STAFF = 'staff',
}

export enum CourseScope {
  PLATFORM = 'PLATFORM',
  SCHOOL = 'SCHOOL',
}

export enum CourseAudience {
  PUBLIC = 'PUBLIC',
  SCHOOL_ONLY = 'SCHOOL_ONLY',
  PRIVATE = 'PRIVATE',
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  UNDER_REVIEW = 'UNDER_REVIEW',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED',
}

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
  SUSPENDED = 'SUSPENDED',
}

export enum LessonType {
  VIDEO = 'video',
  TEXT = 'text',
  QUIZ = 'quiz',
  EXERCISE = 'exercise',
  SUMMARY = 'summary',
}

export enum QuizAnswerState {
  PENDING = 'PENDING',
  ANSWERED = 'ANSWERED',
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  avatar?: string;
  role: UserRole;
  schoolRole?: SchoolRole;
  schoolId?: string;
  schoolSlug?: string;
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentSchoolId?: string;
  currentSchoolSlug?: string;
  currentSchoolRole?: SchoolRole;
}

// ============================================================================
// SCHOOL ENTITIES
// ============================================================================

export interface School {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  description: string;
  location: string;
  country: string;
  website?: string;
  email: string;
  phone: string;
  currentEnrollment: number;
  establishedYear: number;
  type: 'public' | 'private' | 'charter' | 'online';
  status: 'active' | 'pending' | 'suspended' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface SchoolStudent {
  id: string;
  schoolId: string;
  userId: string;
  studentId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  grade: string;
  section: string;
  dateOfBirth: string;
  enrollmentDate: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  status: 'active' | 'inactive' | 'graduated' | 'transferred';
  photo?: string;
}

export interface SchoolTeacher {
  id: string;
  schoolId: string;
  userId: string;
  teacherId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  department: string;
  subject: string;
  classes: string[];
  email: string;
  phone: string;
  hireDate: string;
  qualification: string;
  status: 'active' | 'inactive' | 'on_leave';
  photo?: string;
}

export interface SchoolClass {
  id: string;
  schoolId: string;
  name: string;
  grade: string;
  section: string;
  classTeacherId: string;
  roomNumber: string;
  capacity: number;
  currentEnrollment: number;
  academicYear: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface SchoolSubject {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  grade: string;
  teacherId: string;
  weeklyHours: number;
  description: string;
}

// ============================================================================
// COURSE ENTITIES (JoyEdu Platform)
// ============================================================================

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  price: number;
  rating: number;
  students: number;
  thumbnail: string;
  scope: CourseScope;
  audience: CourseAudience;
  status: CourseStatus;
  tags: string[];
  prerequisites: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  curriculum?: CourseChapter[];
  language?: string;
  trailer?: string;
}

export interface CourseChapter {
  id: string;
  courseId: string;
  title: string;
  order: number;
  topics: CourseTopic[];
}

export interface CourseTopic {
  id: string;
  chapterId: string;
  title: string;
  order: number;
  subtopics: CourseSubtopic[];
}

export interface CourseSubtopic {
  id: string;
  topicId: string;
  title: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  subtopicId: string;
  title: string;
  type: LessonType;
  duration: string;
  content?: string;
  videoUrl?: string;
  order: number;
  isFree: boolean;
}

// ============================================================================
// ENROLLMENT & PROGRESS
// ============================================================================

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
  status: EnrollmentStatus;
  completedAt?: string;
  certificateId?: string;
  lastAccessedAt?: string;
}

export interface LessonProgress {
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  timeSpent: number; // in seconds
}

export interface CourseProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  currentLessonId: string;
  quizScores: Record<string, number>;
  totalProgress: number;
  lastAccessedAt: string;
}

// ============================================================================
// QUIZZES & ASSESSMENTS
// ============================================================================

export interface Quiz {
  id: string;
  courseId: string;
  lessonId?: string;
  title: string;
  description: string;
  type: 'lesson' | 'chapter' | 'final';
  duration: number; // in minutes
  passingScore: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  order: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  startedAt: string;
  completedAt?: string;
  score: number;
  passed: boolean;
  answers: QuizAnswer[];
  timeSpent: number; // in seconds
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  state: QuizAnswerState;
  timeSpent: number;
}

// ============================================================================
// CERTIFICATES
// ============================================================================

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: string;
  verificationCode: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  expiresAt?: string;
  certificateUrl?: string;
}

// ============================================================================
// INSTRUCTOR APPLICATIONS
// ============================================================================

export interface InstructorApplication {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  expertise: string[];
  experience: number;
  qualifications: string;
  bio: string;
  website?: string;
  linkedin?: string;
  status: ApplicationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  feedback?: string;
}

// ============================================================================
// GAMIFICATION
// ============================================================================

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  requirement: {
    type: string;
    value: number;
  };
}

export interface UserGamification {
  userId: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  achievements: string[];
  stats: {
    lessonsCompleted: number;
    quizzesCompleted: number;
    coursesCompleted: number;
    coursesEnrolled: number;
    playgroundUses: number;
  };
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
  expiresAt?: string;
}

// ============================================================================
// SCHOOL MANAGEMENT ENTITIES
// ============================================================================

export interface AttendanceRecord {
  id: string;
  schoolId: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string;
  notes?: string;
}

export interface GradeRecord {
  id: string;
  schoolId: string;
  studentId: string;
  subjectId: string;
  term: string;
  assessmentType: string;
  score: number;
  maxScore: number;
  grade: string;
  gradedAt: string;
  gradedBy: string;
}

export interface FeeRecord {
  id: string;
  schoolId: string;
  studentId: string;
  type: 'tuition' | 'transport' | 'library' | 'lab' | 'other';
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'waived';
  academicYear: string;
  term: string;
}

export interface TimetableSlot {
  id: string;
  schoolId: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
  academicYear: string;
}

export interface SchoolAnnouncement {
  id: string;
  schoolId: string;
  title: string;
  content: string;
  targetAudience: 'all' | 'students' | 'teachers' | 'staff' | 'parents';
  priority: NotificationPriority;
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    timestamp: string;
    requestId: string;
  };
}

// ============================================================================
// FILTER & SEARCH TYPES
// ============================================================================

export interface CourseFilters {
  category?: string;
  level?: string;
  price?: 'free' | 'paid';
  rating?: number;
  search?: string;
  sortBy?: 'popular' | 'newest' | 'rating' | 'price-low' | 'price-high';
}

export interface SchoolFilters {
  location?: string;
  type?: 'public' | 'private' | 'charter' | 'online';
  search?: string;
}
