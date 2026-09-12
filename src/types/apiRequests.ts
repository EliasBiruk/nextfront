/**
 * JoyEdu API Request Payload Contracts
 * 
 * This file defines the request payload contracts for all API endpoints.
 * These contracts define the expected structure of requests sent from the frontend to the backend.
 * 
 * These are used for type safety and to ensure consistency between frontend and backend.
 */

// ============================================================================
// AUTHENTICATION REQUESTS
// ============================================================================

export interface LoginRequest {
  email: string;
  password: string;
  role: 'student' | 'instructor' | 'school' | 'admin';
  rememberMe?: boolean;
}

export interface SignupRequest {
  role: 'student' | 'instructor' | 'school';
  email: string;
  password: string;
  confirmPassword: string;
  // Student fields
  fullName?: string;
  age?: number;
  // Instructor fields
  subjectArea?: string;
  // School fields
  schoolName?: string;
  location?: string;
  contactPhone?: string;
  studentCount?: number;
  teacherCount?: number;
}

export interface LogoutRequest {
  refreshToken?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// ============================================================================
// COURSE REQUESTS
// ============================================================================

export interface GetCoursesRequest {
  instructorId?: string;
  filters?: {
    category?: string;
    level?: string;
    price?: 'free' | 'paid';
    rating?: number;
    search?: string;
    sortBy?: 'popular' | 'newest' | 'rating' | 'price-low' | 'price-high';
  };
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface GetCourseByIdRequest {
  courseId: string;
}

export interface CreateCourseRequest {
  instructorId?: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  thumbnail?: string;
  tags: string[];
  prerequisites: string[];
  scope: 'PLATFORM' | 'SCHOOL';
  audience: 'PUBLIC' | 'SCHOOL_ONLY' | 'PRIVATE';
}

export interface UpdateCourseRequest {
  courseId: string;
  title?: string;
  description?: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  price?: number;
  thumbnail?: string;
  tags?: string[];
  prerequisites?: string[];
  status?: 'DRAFT' | 'UNDER_REVIEW' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED';
}

export interface DeleteCourseRequest {
  courseId: string;
}

export interface SubmitCourseForReviewRequest {
  courseId: string;
}

// ============================================================================
// ENROLLMENT REQUESTS
// ============================================================================

export interface EnrollInCourseRequest {
  courseId: string;
  paymentMethod?: string;
  promoCode?: string;
}

export interface GetEnrollmentsRequest {
  userId?: string;
  courseId?: string;
  status?: 'ACTIVE' | 'COMPLETED' | 'DROPPED' | 'SUSPENDED';
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface UpdateEnrollmentProgressRequest {
  enrollmentId: string;
  progress: number;
  lessonId?: string;
}

export interface CancelEnrollmentRequest {
  enrollmentId: string;
  reason?: string;
}

// ============================================================================
// PROGRESS REQUESTS
// ============================================================================

export interface GetCourseProgressRequest {
  userId: string;
  courseId: string;
}

export interface UpdateLessonProgressRequest {
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  timeSpent: number;
}

export interface MarkLessonCompleteRequest {
  userId: string;
  courseId: string;
  lessonId: string;
}

// ============================================================================
// QUIZ REQUESTS
// ============================================================================

export interface GetQuizRequest {
  quizId: string;
  courseId?: string;
}

export interface StartQuizAttemptRequest {
  quizId: string;
  courseId?: string;
}

export interface SubmitQuizAnswerRequest {
  attemptId: string;
  questionId: string;
  answer: string | string[];
  timeSpent: number;
}

export interface SubmitQuizAttemptRequest {
  attemptId: string;
  answers: Array<{
    questionId: string;
    answer: string | string[];
    timeSpent: number;
  }>;
}

export interface GetQuizAttemptsRequest {
  userId: string;
  quizId?: string;
  courseId?: string;
}

export interface CreateQuizRequest {
  courseId: string;
  lessonId?: string;
  title: string;
  description: string;
  type: 'lesson' | 'chapter' | 'final';
  duration: number;
  passingScore: number;
  questions: Array<{
    question: string;
    type: 'multiple_choice' | 'true_false' | 'short_answer';
    options?: string[];
    correctAnswer: string | string[];
    explanation?: string;
    points: number;
    order: number;
  }>;
}

export interface UpdateQuizRequest {
  quizId: string;
  title?: string;
  description?: string;
  duration?: number;
  passingScore?: number;
  questions?: Array<{
    id?: string;
    question: string;
    type: 'multiple_choice' | 'true_false' | 'short_answer';
    options?: string[];
    correctAnswer: string | string[];
    explanation?: string;
    points: number;
    order: number;
  }>;
}

export interface DeleteQuizRequest {
  quizId: string;
}

// ============================================================================
// CERTIFICATE REQUESTS
// ============================================================================

export interface GetCertificatesRequest {
  userId: string;
  courseId?: string;
}

export interface VerifyCertificateRequest {
  verificationCode: string;
}

export interface IssueCertificateRequest {
  userId: string;
  courseId: string;
}

export interface RevokeCertificateRequest {
  certificateId: string;
  reason?: string;
}

// ============================================================================
// INSTRUCTOR APPLICATION REQUESTS
// ============================================================================

export interface CreateInstructorApplicationRequest {
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
}

export interface GetInstructorApplicationsRequest {
  status?: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  userId?: string;
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface UpdateInstructorApplicationStatusRequest {
  applicationId: string;
  status: 'APPROVED' | 'REJECTED';
  feedback?: string;
}

// ============================================================================
// GAMIFICATION REQUESTS
// ============================================================================

export interface GetUserGamificationRequest {
  userId: string;
}

export interface UpdateUserStatsRequest {
  userId: string;
  stat: string;
  value: number;
}

export interface CheckAchievementsRequest {
  userId: string;
}

export interface AddXPRequest {
  userId: string;
  amount: number;
  reason?: string;
}

export interface UpdateStreakRequest {
  userId: string;
}

// ============================================================================
// NOTIFICATION REQUESTS
// ============================================================================

export interface GetNotificationsRequest {
  userId: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  isRead?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface MarkNotificationReadRequest {
  notificationId: string;
  isRead: boolean;
}

export interface MarkAllNotificationsReadRequest {
  userId: string;
}

export interface DeleteNotificationRequest {
  notificationId: string;
}

export interface CreateNotificationRequest {
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  message: string;
  actionUrl?: string;
  expiresAt?: string;
}

// ============================================================================
// SCHOOL MANAGEMENT REQUESTS
// ============================================================================

export interface GetSchoolRequest {
  schoolId?: string;
  schoolSlug?: string;
}

export interface CreateSchoolRequest {
  name: string;
  slug: string;
  description: string;
  location: string;
  country: string;
  website?: string;
  email: string;
  phone: string;
  type: 'public' | 'private' | 'charter' | 'online';
  establishedYear: number;
}

export interface UpdateSchoolRequest {
  schoolId: string;
  name?: string;
  description?: string;
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
  logo?: string;
}

export interface GetSchoolStudentsRequest {
  schoolId: string;
  grade?: string;
  section?: string;
  status?: 'active' | 'inactive' | 'graduated' | 'transferred';
  search?: string;
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface CreateSchoolStudentRequest {
  schoolId: string;
  userId: string;
  firstName: string;
  lastName: string;
  grade: string;
  section: string;
  dateOfBirth: string;
  enrollmentDate: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
}

export interface UpdateSchoolStudentRequest {
  studentId: string;
  firstName?: string;
  lastName?: string;
  grade?: string;
  section?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  address?: string;
  status?: 'active' | 'inactive' | 'graduated' | 'transferred';
}

export interface GetSchoolTeachersRequest {
  schoolId: string;
  department?: string;
  status?: 'active' | 'inactive' | 'on_leave';
  search?: string;
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface CreateSchoolTeacherRequest {
  schoolId: string;
  userId: string;
  firstName: string;
  lastName: string;
  department: string;
  subject: string;
  classes: string[];
  email: string;
  phone: string;
  hireDate: string;
  qualification: string;
}

export interface UpdateSchoolTeacherRequest {
  teacherId: string;
  department?: string;
  subject?: string;
  classes?: string[];
  status?: 'active' | 'inactive' | 'on_leave';
}

export interface GetSchoolClassesRequest {
  schoolId: string;
  grade?: string;
  section?: string;
  status?: 'active' | 'inactive';
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface CreateSchoolClassRequest {
  schoolId: string;
  name: string;
  grade: string;
  section: string;
  classTeacherId: string;
  roomNumber: string;
  capacity: number;
  academicYear: string;
}

export interface UpdateSchoolClassRequest {
  classId: string;
  name?: string;
  classTeacherId?: string;
  roomNumber?: string;
  capacity?: number;
  status?: 'active' | 'inactive';
}

export interface GetSchoolSubjectsRequest {
  schoolId: string;
  grade?: string;
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface CreateSchoolSubjectRequest {
  schoolId: string;
  name: string;
  code: string;
  grade: string;
  teacherId: string;
  weeklyHours: number;
  description: string;
}

export interface UpdateSchoolSubjectRequest {
  subjectId: string;
  name?: string;
  teacherId?: string;
  weeklyHours?: number;
  description?: string;
}

// ============================================================================
// ATTENDANCE REQUESTS
// ============================================================================

export interface GetAttendanceRecordsRequest {
  schoolId: string;
  studentId?: string;
  classId?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: 'present' | 'absent' | 'late' | 'excused';
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface CreateAttendanceRecordRequest {
  schoolId: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string;
  notes?: string;
}

export interface UpdateAttendanceRecordRequest {
  recordId: string;
  status?: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface BulkMarkAttendanceRequest {
  schoolId: string;
  classId: string;
  date: string;
  markedBy: string;
  records: Array<{
    studentId: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    notes?: string;
  }>;
}

// ============================================================================
// GRADE REQUESTS
// ============================================================================

export interface GetGradeRecordsRequest {
  schoolId: string;
  studentId?: string;
  subjectId?: string;
  term?: string;
  academicYear?: string;
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface CreateGradeRecordRequest {
  schoolId: string;
  studentId: string;
  subjectId: string;
  term: string;
  assessmentType: string;
  score: number;
  maxScore: number;
  gradedBy: string;
}

export interface UpdateGradeRecordRequest {
  recordId: string;
  score?: number;
  maxScore?: number;
  grade?: string;
}

export interface BulkCreateGradesRequest {
  schoolId: string;
  subjectId: string;
  term: string;
  assessmentType: string;
  gradedBy: string;
  grades: Array<{
    studentId: string;
    score: number;
    maxScore: number;
  }>;
}

// ============================================================================
// FEE REQUESTS
// ============================================================================

export interface GetFeeRecordsRequest {
  schoolId: string;
  studentId?: string;
  type?: 'tuition' | 'transport' | 'library' | 'lab' | 'other';
  status?: 'pending' | 'paid' | 'overdue' | 'waived';
  academicYear?: string;
  term?: string;
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface CreateFeeRecordRequest {
  schoolId: string;
  studentId: string;
  type: 'tuition' | 'transport' | 'library' | 'lab' | 'other';
  amount: number;
  dueDate: string;
  academicYear: string;
  term: string;
}

export interface UpdateFeeRecordRequest {
  recordId: string;
  status?: 'pending' | 'paid' | 'overdue' | 'waived';
  paidDate?: string;
}

export interface RecordPaymentRequest {
  recordId: string;
  paymentDate: string;
  paymentMethod: string;
  reference?: string;
}

// ============================================================================
// TIMETABLE REQUESTS
// ============================================================================

export interface GetTimetableSlotsRequest {
  schoolId: string;
  classId?: string;
  teacherId?: string;
  subjectId?: string;
  dayOfWeek?: string;
  academicYear?: string;
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface CreateTimetableSlotRequest {
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

export interface UpdateTimetableSlotRequest {
  slotId: string;
  subjectId?: string;
  teacherId?: string;
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
  room?: string;
}

export interface DeleteTimetableSlotRequest {
  slotId: string;
}

export interface CheckTimetableConflictRequest {
  schoolId: string;
  classId?: string;
  teacherId?: string;
  room?: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  academicYear: string;
}

// ============================================================================
// SCHOOL ANNOUNCEMENT REQUESTS
// ============================================================================

export interface GetSchoolAnnouncementsRequest {
  schoolId: string;
  targetAudience?: 'all' | 'students' | 'teachers' | 'staff' | 'parents';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  active?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface CreateSchoolAnnouncementRequest {
  schoolId: string;
  title: string;
  content: string;
  targetAudience: 'all' | 'students' | 'teachers' | 'staff' | 'parents';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdBy: string;
  expiresAt?: string;
}

export interface UpdateSchoolAnnouncementRequest {
  announcementId: string;
  title?: string;
  content?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  expiresAt?: string;
}

export interface DeleteSchoolAnnouncementRequest {
  announcementId: string;
}

// ============================================================================
// ADMIN REQUESTS
// ============================================================================

export interface GetDashboardStatsRequest {
  timeframe?: 'today' | 'week' | 'month' | 'year';
}

export interface GetPendingApprovalsRequest {
  type?: 'instructor' | 'school' | 'course';
  status?: 'SUBMITTED' | 'UNDER_REVIEW';
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface ReviewInstructorApplicationRequest {
  applicationId: string;
  status: 'APPROVED' | 'REJECTED';
  feedback?: string;
}

export interface ReviewSchoolApplicationRequest {
  schoolId: string;
  status: 'APPROVED' | 'REJECTED';
  feedback?: string;
}

export interface ReviewCourseRequest {
  courseId: string;
  status: 'PUBLISHED' | 'REJECTED';
  feedback?: string;
}

export interface GetSystemHealthRequest {
  // No parameters needed
}

export interface GetUsersRequest {
  role?: 'student' | 'instructor' | 'school' | 'admin';
  status?: 'active' | 'inactive' | 'suspended';
  search?: string;
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface UpdateUserStatusRequest {
  userId: string;
  status: 'active' | 'inactive' | 'suspended';
  reason?: string;
}

export interface GetPlatformSettingsRequest {
  category?: string;
}

export interface UpdatePlatformSettingRequest {
  key: string;
  value: string;
  category: string;
}

// ============================================================================
// SEARCH REQUESTS
// ============================================================================

export interface SearchRequest {
  query: string;
  category?: 'courses' | 'instructors' | 'schools' | 'all';
  filters?: {
    level?: string;
    price?: 'free' | 'paid';
    location?: string;
    type?: string;
  };
  pagination?: {
    page: number;
    pageSize: number;
  };
}

// ============================================================================
// FILE UPLOAD REQUESTS
// ============================================================================

export interface UploadFileRequest {
  file: File;
  type: 'avatar' | 'course_thumbnail' | 'document' | 'video';
  entityId?: string;
}

export interface DeleteFileRequest {
  fileId: string;
}

// ============================================================================
// ANALYTICS REQUESTS
// ============================================================================

export interface GetCourseAnalyticsRequest {
  courseId: string;
  timeframe?: 'week' | 'month' | 'year' | 'all';
}

export interface GetInstructorAnalyticsRequest {
  instructorId: string;
  timeframe?: 'week' | 'month' | 'year' | 'all';
}

export interface GetSchoolAnalyticsRequest {
  schoolId: string;
  timeframe?: 'week' | 'month' | 'year' | 'all';
}

export interface GetStudentAnalyticsRequest {
  studentId: string;
  timeframe?: 'week' | 'month' | 'year' | 'all';
}
