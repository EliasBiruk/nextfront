/**
 * JoyEdu Mock Entities
 * 
 * This file contains normalized mock entities with realistic backend structure
 * that align with the frontend data model types defined in src/types/index.ts
 * 
 * These entities are used for prototype validation and simulate realistic backend responses.
 */

import {
  User,
  School,
  SchoolStudent,
  SchoolTeacher,
  SchoolClass,
  SchoolSubject,
  Course,
  Enrollment,
  CourseProgress,
  Quiz,
  QuizAttempt,
  Certificate,
  InstructorApplication,
  Achievement,
  UserGamification,
  Notification,
  AttendanceRecord,
  GradeRecord,
  FeeRecord,
  TimetableSlot,
  SchoolAnnouncement,
  UserRole,
  SchoolRole,
  CourseScope,
  CourseAudience,
  CourseStatus,
  EnrollmentStatus,
  QuizAnswerState,
  ApplicationStatus,
  NotificationType,
  NotificationPriority,
} from '@/types';

// ============================================================================
// USERS
// ============================================================================

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'student@joyedu.com',
    firstName: 'John',
    lastName: 'Smith',
    fullName: 'John Smith',
    avatar: '👨‍🎓',
    role: UserRole.STUDENT,
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-09-10T12:30:00Z',
    lastActiveAt: '2024-09-10T12:30:00Z',
  },
  {
    id: 'user-2',
    email: 'instructor@joyedu.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    fullName: 'Sarah Johnson',
    avatar: '👩‍🏫',
    role: UserRole.INSTRUCTOR,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-09-10T10:15:00Z',
    lastActiveAt: '2024-09-10T10:15:00Z',
  },
  {
    id: 'user-3',
    email: 'school@joyedu.com',
    firstName: 'Robert',
    lastName: 'Anderson',
    fullName: 'Robert Anderson',
    avatar: '🏫',
    role: UserRole.SCHOOL,
    schoolRole: SchoolRole.OWNER,
    schoolId: 'school-1',
    schoolSlug: 'springfield-academy',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-09-10T09:00:00Z',
    lastActiveAt: '2024-09-10T09:00:00Z',
  },
  {
    id: 'user-4',
    email: 'admin@joyedu.com',
    firstName: 'Admin',
    lastName: 'User',
    fullName: 'Admin User',
    avatar: '🔧',
    role: UserRole.ADMIN,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-09-10T08:00:00Z',
    lastActiveAt: '2024-09-10T08:00:00Z',
  },
];

// ============================================================================
// SCHOOLS
// ============================================================================

export const mockSchools: School[] = [
  {
    id: 'school-1',
    slug: 'springfield-academy',
    name: 'Springfield Academy',
    logo: '🏫',
    description: 'A premier K-12 institution focused on academic excellence and holistic development.',
    location: 'Springfield, Illinois, USA',
    country: 'United States',
    website: 'https://springfieldacademy.edu',
    email: 'info@springfieldacademy.edu',
    phone: '+1 (555) 123-4567',
    currentEnrollment: 1250,
    establishedYear: 1985,
    type: 'private',
    status: 'active',
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-09-01T08:00:00Z',
  },
  {
    id: 'school-2',
    slug: 'tech-institute',
    name: 'Tech Institute of California',
    logo: '💻',
    description: 'Leading technology and engineering school preparing students for the future.',
    location: 'San Francisco, California, USA',
    country: 'United States',
    website: 'https://techinstitute.edu',
    email: 'admissions@techinstitute.edu',
    phone: '+1 (555) 987-6543',
    currentEnrollment: 890,
    establishedYear: 2005,
    type: 'private',
    status: 'active',
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-09-01T08:00:00Z',
  },
];

// ============================================================================
// SCHOOL STUDENTS
// ============================================================================

export const mockSchoolStudents: SchoolStudent[] = [
  {
    id: 'student-1',
    schoolId: 'school-1',
    userId: 'user-1',
    studentId: 'STU-2024-001',
    firstName: 'Emma',
    lastName: 'Williams',
    fullName: 'Emma Williams',
    grade: '10',
    section: 'A',
    dateOfBirth: '2008-05-15',
    enrollmentDate: '2020-08-15',
    guardianName: 'Michael Williams',
    guardianPhone: '+1 (555) 234-5678',
    guardianEmail: 'mwilliams@email.com',
    address: '123 Oak Street, Springfield, IL 62701',
    status: 'active',
    photo: '👩‍🎓',
  },
  {
    id: 'student-2',
    schoolId: 'school-1',
    userId: 'user-5',
    studentId: 'STU-2024-002',
    firstName: 'James',
    lastName: 'Brown',
    fullName: 'James Brown',
    grade: '10',
    section: 'B',
    dateOfBirth: '2008-08-20',
    enrollmentDate: '2020-08-15',
    guardianName: 'Patricia Brown',
    guardianPhone: '+1 (555) 345-6789',
    guardianEmail: 'pbrown@email.com',
    address: '456 Maple Avenue, Springfield, IL 62702',
    status: 'active',
    photo: '👨‍🎓',
  },
];

// ============================================================================
// SCHOOL TEACHERS
// ============================================================================

export const mockSchoolTeachers: SchoolTeacher[] = [
  {
    id: 'teacher-1',
    schoolId: 'school-1',
    userId: 'user-6',
    teacherId: 'TCH-2024-001',
    firstName: 'Dr. Lisa',
    lastName: 'Chen',
    fullName: 'Dr. Lisa Chen',
    department: 'Mathematics',
    subject: 'Algebra, Calculus',
    classes: ['class-1', 'class-2'],
    email: 'lchen@springfieldacademy.edu',
    phone: '+1 (555) 456-7890',
    hireDate: '2018-08-15',
    qualification: 'Ph.D. Mathematics, MIT',
    status: 'active',
    photo: '👩‍🏫',
  },
  {
    id: 'teacher-2',
    schoolId: 'school-1',
    userId: 'user-7',
    teacherId: 'TCH-2024-002',
    firstName: 'Prof. Michael',
    lastName: 'Rodriguez',
    fullName: 'Prof. Michael Rodriguez',
    department: 'Science',
    subject: 'Physics, Chemistry',
    classes: ['class-3', 'class-4'],
    email: 'mrodriguez@springfieldacademy.edu',
    phone: '+1 (555) 567-8901',
    hireDate: '2019-08-15',
    qualification: 'M.S. Physics, Stanford',
    status: 'active',
    photo: '👨‍🏫',
  },
];

// ============================================================================
// SCHOOL CLASSES
// ============================================================================

export const mockSchoolClasses: SchoolClass[] = [
  {
    id: 'class-1',
    schoolId: 'school-1',
    name: 'Grade 10-A',
    grade: '10',
    section: 'A',
    classTeacherId: 'teacher-1',
    roomNumber: 'Room 101',
    capacity: 30,
    currentEnrollment: 28,
    academicYear: '2024-2025',
    status: 'active',
    createdAt: '2024-08-01T08:00:00Z',
  },
  {
    id: 'class-2',
    schoolId: 'school-1',
    name: 'Grade 10-B',
    grade: '10',
    section: 'B',
    classTeacherId: 'teacher-2',
    roomNumber: 'Room 102',
    capacity: 30,
    currentEnrollment: 27,
    academicYear: '2024-2025',
    status: 'active',
    createdAt: '2024-08-01T08:00:00Z',
  },
];

// ============================================================================
// SCHOOL SUBJECTS
// ============================================================================

export const mockSchoolSubjects: SchoolSubject[] = [
  {
    id: 'subject-1',
    schoolId: 'school-1',
    name: 'Mathematics',
    code: 'MATH-101',
    grade: '10',
    teacherId: 'teacher-1',
    weeklyHours: 5,
    description: 'Advanced mathematics including algebra and calculus.',
  },
  {
    id: 'subject-2',
    schoolId: 'school-1',
    name: 'Physics',
    code: 'PHYS-101',
    grade: '10',
    teacherId: 'teacher-2',
    weeklyHours: 4,
    description: 'Introduction to physics concepts and applications.',
  },
];

// ============================================================================
// COURSES (JoyEdu Platform)
// ============================================================================

export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Complete JavaScript Masterclass',
    description: 'From beginner to advanced JavaScript developer',
    instructor: 'Sarah Johnson',
    instructorId: 'user-2',
    category: 'Programming',
    level: 'Beginner',
    duration: '40 hours',
    lessons: 45,
    price: 99.99,
    rating: 4.8,
    students: 45000,
    thumbnail: '📚',
    scope: CourseScope.PLATFORM,
    audience: CourseAudience.PUBLIC,
    status: CourseStatus.PUBLISHED,
    tags: ['JavaScript', 'Web Development', 'Programming'],
    prerequisites: [],
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-08-01T08:00:00Z',
    publishedAt: '2024-02-01T08:00:00Z',
  },
  {
    id: 'course-2',
    title: 'React.js Complete Guide',
    description: 'Build modern web applications with React',
    instructor: 'Michael Chen',
    instructorId: 'user-8',
    category: 'Programming',
    level: 'Intermediate',
    duration: '35 hours',
    lessons: 38,
    price: 129.99,
    rating: 4.9,
    students: 32000,
    thumbnail: '⚛️',
    scope: CourseScope.PLATFORM,
    audience: CourseAudience.PUBLIC,
    status: CourseStatus.PUBLISHED,
    tags: ['React', 'JavaScript', 'Frontend'],
    prerequisites: ['JavaScript'],
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-08-15T08:00:00Z',
    publishedAt: '2024-03-01T08:00:00Z',
  },
  {
    id: 'course-3',
    title: 'Python for Data Science',
    description: 'Learn Python and data analysis fundamentals',
    instructor: 'Emily Rodriguez',
    instructorId: 'user-9',
    category: 'Data Science',
    level: 'Beginner',
    duration: '30 hours',
    lessons: 32,
    price: 89.99,
    rating: 4.7,
    students: 28000,
    thumbnail: '🐍',
    scope: CourseScope.PLATFORM,
    audience: CourseAudience.PUBLIC,
    status: CourseStatus.PUBLISHED,
    tags: ['Python', 'Data Science', 'Machine Learning'],
    prerequisites: [],
    createdAt: '2024-03-01T08:00:00Z',
    updatedAt: '2024-09-01T08:00:00Z',
    publishedAt: '2024-04-01T08:00:00Z',
  },
];

// ============================================================================
// ENROLLMENTS
// ============================================================================

export const mockEnrollments: Enrollment[] = [
  {
    id: 'enrollment-1',
    userId: 'user-1',
    courseId: 'course-1',
    enrolledAt: '2024-02-01T08:00:00Z',
    progress: 35,
    status: EnrollmentStatus.ACTIVE,
    lastAccessedAt: '2024-09-10T12:30:00Z',
  },
  {
    id: 'enrollment-2',
    userId: 'user-1',
    courseId: 'course-2',
    enrolledAt: '2024-03-15T08:00:00Z',
    progress: 15,
    status: EnrollmentStatus.ACTIVE,
    lastAccessedAt: '2024-09-09T15:45:00Z',
  },
];

// ============================================================================
// COURSE PROGRESS
// ============================================================================

export const mockCourseProgress: Record<string, CourseProgress> = {
  'user-1-course-1': {
    userId: 'user-1',
    courseId: 'course-1',
    completedLessons: ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4'],
    currentLessonId: 'lesson-5',
    quizScores: { 'quiz-1': 85, 'quiz-2': 92 },
    totalProgress: 35,
    lastAccessedAt: '2024-09-10T12:30:00Z',
  },
};

// ============================================================================
// QUIZZES
// ============================================================================

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    courseId: 'course-1',
    lessonId: 'lesson-5',
    title: 'JavaScript Fundamentals Quiz',
    description: 'Test your knowledge of JavaScript basics',
    type: 'lesson',
    duration: 30,
    passingScore: 70,
    totalQuestions: 10,
    questions: [
      {
        id: 'q1',
        quizId: 'quiz-1',
        question: 'What is the correct way to declare a variable in JavaScript?',
        type: 'multiple_choice',
        options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'declare x = 5;'],
        correctAnswer: 'var x = 5;',
        explanation: 'The var keyword is used to declare variables in JavaScript.',
        points: 10,
        order: 1,
      },
      {
        id: 'q2',
        quizId: 'quiz-1',
        question: 'Which method is used to add an element to the end of an array?',
        type: 'multiple_choice',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 'push()',
        explanation: 'The push() method adds elements to the end of an array.',
        points: 10,
        order: 2,
      },
    ],
    createdAt: '2024-02-01T08:00:00Z',
  },
];

// ============================================================================
// QUIZ ATTEMPTS
// ============================================================================

export const mockQuizAttempts: QuizAttempt[] = [
  {
    id: 'attempt-1',
    userId: 'user-1',
    quizId: 'quiz-1',
    startedAt: '2024-09-10T10:00:00Z',
    completedAt: '2024-09-10T10:25:00Z',
    score: 85,
    passed: true,
    answers: [
      {
        questionId: 'q1',
        answer: 'var x = 5;',
        isCorrect: true,
        state: QuizAnswerState.CORRECT,
        timeSpent: 45,
      },
      {
        questionId: 'q2',
        answer: 'push()',
        isCorrect: true,
        state: QuizAnswerState.CORRECT,
        timeSpent: 60,
      },
    ],
    timeSpent: 1500,
  },
];

// ============================================================================
// CERTIFICATES
// ============================================================================

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    userId: 'user-1',
    courseId: 'course-2',
    issuedAt: '2024-01-15T08:00:00Z',
    verificationCode: 'JOY-2024-ABC123',
    status: 'ACTIVE',
  },
];

// ============================================================================
// INSTRUCTOR APPLICATIONS
// ============================================================================

export const mockInstructorApplications: InstructorApplication[] = [
  {
    id: 'app-1',
    userId: 'user-2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'instructor@joyedu.com',
    phone: '+1 (555) 123-4567',
    expertise: ['Web Development', 'React', 'JavaScript'],
    experience: 5,
    qualifications: 'B.S. Computer Science',
    bio: 'Passionate about teaching web development with 5 years of industry experience.',
    website: 'https://sarahinstructor.com',
    linkedin: 'https://linkedin.com/in/sarahinstructor',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-15T08:00:00Z',
    reviewedAt: '2024-01-20T08:00:00Z',
    reviewedBy: 'user-4',
    feedback: 'Excellent qualifications and teaching experience.',
  },
  {
    id: 'app-2',
    userId: 'user-7',
    firstName: 'John',
    lastName: 'Developer',
    email: 'john.developer@joyedu.com',
    phone: '+1 (555) 987-6543',
    expertise: ['Python', 'Data Science', 'Machine Learning'],
    experience: 3,
    qualifications: 'M.S. Data Science',
    bio: 'Data scientist looking to share knowledge in Python and ML.',
    website: 'https://johndeveloper.com',
    linkedin: 'https://linkedin.com/in/johndeveloper',
    status: ApplicationStatus.UNDER_REVIEW,
    submittedAt: '2024-02-10T08:00:00Z',
  },
];

// ============================================================================
// ACHIEVEMENTS
// ============================================================================

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    xpReward: 50,
    requirement: { type: 'lessons_completed', value: 1 },
  },
  {
    id: 'ach-2',
    title: 'Quiz Master',
    description: 'Score 100% on a quiz',
    icon: '🏆',
    xpReward: 100,
    requirement: { type: 'perfect_quiz', value: 1 },
  },
  {
    id: 'ach-3',
    title: 'Course Graduate',
    description: 'Complete your first course',
    icon: '🎓',
    xpReward: 500,
    requirement: { type: 'courses_completed', value: 1 },
  },
  {
    id: 'ach-4',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    xpReward: 200,
    requirement: { type: 'streak_days', value: 7 },
  },
];

// ============================================================================
// USER GAMIFICATION
// ============================================================================

export const mockUserGamification: Record<string, UserGamification> = {
  'user-1': {
    userId: 'user-1',
    xp: 1250,
    level: 5,
    streak: 12,
    lastActiveDate: '2024-09-10',
    achievements: ['ach-1', 'ach-2', 'ach-4'],
    stats: {
      lessonsCompleted: 15,
      quizzesCompleted: 8,
      coursesCompleted: 1,
      coursesEnrolled: 3,
      playgroundUses: 12,
    },
  },
};

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: NotificationType.INFO,
    priority: NotificationPriority.MEDIUM,
    title: 'New Course Available',
    message: 'A new course on Advanced React Patterns is now available!',
    actionUrl: '/guest/courses',
    isRead: false,
    createdAt: '2024-09-10T08:00:00Z',
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: NotificationType.SUCCESS,
    priority: NotificationPriority.HIGH,
    title: 'Quiz Completed',
    message: 'Congratulations! You scored 85% on JavaScript Fundamentals Quiz.',
    actionUrl: '/student/quizzes',
    isRead: true,
    createdAt: '2024-09-10T10:25:00Z',
  },
];

// ============================================================================
// ATTENDANCE RECORDS
// ============================================================================

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'att-1',
    schoolId: 'school-1',
    studentId: 'student-1',
    classId: 'class-1',
    date: '2024-09-10',
    status: 'present',
    markedBy: 'teacher-1',
  },
  {
    id: 'att-2',
    schoolId: 'school-1',
    studentId: 'student-2',
    classId: 'class-2',
    date: '2024-09-10',
    status: 'present',
    markedBy: 'teacher-2',
  },
];

// ============================================================================
// GRADE RECORDS
// ============================================================================

export const mockGradeRecords: GradeRecord[] = [
  {
    id: 'grade-1',
    schoolId: 'school-1',
    studentId: 'student-1',
    subjectId: 'subject-1',
    term: 'Fall 2024',
    assessmentType: 'Midterm Exam',
    score: 92,
    maxScore: 100,
    grade: 'A',
    gradedAt: '2024-10-15T08:00:00Z',
    gradedBy: 'teacher-1',
  },
];

// ============================================================================
// FEE RECORDS
// ============================================================================

export const mockFeeRecords: FeeRecord[] = [
  {
    id: 'fee-1',
    schoolId: 'school-1',
    studentId: 'student-1',
    type: 'tuition',
    amount: 5000,
    dueDate: '2024-08-15',
    paidDate: '2024-08-10',
    status: 'paid',
    academicYear: '2024-2025',
    term: 'Fall',
  },
];

// ============================================================================
// TIMETABLE SLOTS
// ============================================================================

export const mockTimetableSlots: TimetableSlot[] = [
  {
    id: 'slot-1',
    schoolId: 'school-1',
    classId: 'class-1',
    subjectId: 'subject-1',
    teacherId: 'teacher-1',
    dayOfWeek: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'Room 101',
    academicYear: '2024-2025',
  },
];

// ============================================================================
// SCHOOL ANNOUNCEMENTS
// ============================================================================

export const mockSchoolAnnouncements: SchoolAnnouncement[] = [
  {
    id: 'ann-1',
    schoolId: 'school-1',
    title: 'Parent-Teacher Conference',
    content: 'Parent-teacher conferences will be held on September 20th. Please sign up for a time slot.',
    targetAudience: 'parents',
    priority: NotificationPriority.HIGH,
    createdBy: 'user-3',
    createdAt: '2024-09-01T08:00:00Z',
    expiresAt: '2024-09-20T23:00:00Z',
  },
  {
    id: 'ann-2',
    schoolId: 'school-1',
    title: 'School Closure Notice',
    content: 'School will be closed on September 15th for staff development day.',
    targetAudience: 'all',
    priority: NotificationPriority.HIGH,
    createdBy: 'user-3',
    createdAt: '2024-09-05T08:00:00Z',
  },
];
