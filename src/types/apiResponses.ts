/**
 * JoyEdu API Response Payload Contracts
 * 
 * This file defines the response payload contracts for all API endpoints.
 * These contracts define the expected structure of responses from the backend to the frontend.
 * 
 * These are used for type safety and to ensure consistency between frontend and backend.
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
  PaginatedResponse,
  ApiResponse,
} from './index';

// ============================================================================
// AUTHENTICATION RESPONSES
// ============================================================================

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface SignupResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  requiresVerification: boolean;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  resetTokenExpiry?: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

// ============================================================================
// COURSE RESPONSES
// ============================================================================

export interface GetCoursesResponse extends PaginatedResponse<Course> {
  filters?: {
    category?: string;
    level?: string;
    price?: string;
    rating?: number;
    search?: string;
    sortBy?: string;
  };
}

export interface GetCourseByIdResponse {
  course: Course;
  enrollment?: Enrollment;
  progress?: CourseProgress;
}

export interface CreateCourseResponse {
  course: Course;
}

export interface UpdateCourseResponse {
  course: Course;
}

export interface DeleteCourseResponse {
  success: boolean;
}

export interface SubmitCourseForReviewResponse {
  course: Course;
}

// ============================================================================
// ENROLLMENT RESPONSES
// ============================================================================

export interface EnrollInCourseResponse extends ApiResponse<Enrollment> {
  paymentRequired?: boolean;
  paymentUrl?: string;
}

export interface GetEnrollmentsResponse extends PaginatedResponse<Enrollment> {}

export interface UpdateEnrollmentProgressResponse extends ApiResponse<Enrollment> {}

export interface CancelEnrollmentResponse extends ApiResponse<{ success: boolean }> {}

// ============================================================================
// PROGRESS RESPONSES
// ============================================================================

export interface GetCourseProgressResponse extends ApiResponse<CourseProgress> {}

export interface UpdateLessonProgressResponse extends ApiResponse<CourseProgress> {}

export interface MarkLessonCompleteResponse extends ApiResponse<CourseProgress> {}

// ============================================================================
// QUIZ RESPONSES
// ============================================================================

export interface GetQuizResponse extends ApiResponse<Quiz> {
  attempt?: QuizAttempt;
  canRetake?: boolean;
  attemptsRemaining?: number;
}

export interface StartQuizAttemptResponse extends ApiResponse<QuizAttempt> {}

export interface SubmitQuizAnswerResponse extends ApiResponse<{ correct: boolean; explanation?: string }> {}

export interface SubmitQuizAttemptResponse extends ApiResponse<QuizAttempt> {}

export interface GetQuizAttemptsResponse extends PaginatedResponse<QuizAttempt> {}

export interface CreateQuizResponse extends ApiResponse<Quiz> {}

export interface UpdateQuizResponse extends ApiResponse<Quiz> {}

export interface DeleteQuizResponse extends ApiResponse<{ success: boolean }> {}

// ============================================================================
// CERTIFICATE RESPONSES
// ============================================================================

export interface GetCertificatesResponse extends PaginatedResponse<Certificate> {}

export interface VerifyCertificateResponse extends ApiResponse<{
  valid: boolean;
  certificate?: Certificate;
  course?: Course;
  user?: User;
}> {}

export interface IssueCertificateResponse extends ApiResponse<Certificate> {}

export interface RevokeCertificateResponse extends ApiResponse<Certificate> {}

// ============================================================================
// INSTRUCTOR APPLICATION RESPONSES
// ============================================================================

export interface CreateInstructorApplicationResponse extends ApiResponse<InstructorApplication> {}

export interface GetInstructorApplicationsResponse extends PaginatedResponse<InstructorApplication> {}

export interface UpdateInstructorApplicationStatusResponse extends ApiResponse<InstructorApplication> {}

// ============================================================================
// GAMIFICATION RESPONSES
// ============================================================================

export interface GetUserGamificationResponse extends ApiResponse<UserGamification> {}

export interface UpdateUserStatsResponse extends ApiResponse<UserGamification> {
  newAchievements?: Achievement[];
}

export interface CheckAchievementsResponse extends ApiResponse<{
  newAchievements: Achievement[];
  totalAchievements: number;
}> {}

export interface AddXPResponse extends ApiResponse<UserGamification> {}

export interface UpdateStreakResponse extends ApiResponse<UserGamification> {}

// ============================================================================
// NOTIFICATION RESPONSES
// ============================================================================

export interface GetNotificationsResponse extends PaginatedResponse<Notification> {}

export interface MarkNotificationReadResponse extends ApiResponse<Notification> {}

export interface MarkAllNotificationsReadResponse extends ApiResponse<{ count: number }> {}

export interface DeleteNotificationResponse extends ApiResponse<{ success: boolean }> {}

export interface CreateNotificationResponse extends ApiResponse<Notification> {}

// ============================================================================
// SCHOOL MANAGEMENT RESPONSES
// ============================================================================

export interface GetSchoolResponse extends ApiResponse<School> {}

export interface CreateSchoolResponse extends ApiResponse<School> {}

export interface UpdateSchoolResponse extends ApiResponse<School> {}

export interface GetSchoolStudentsResponse extends PaginatedResponse<SchoolStudent> {}

export interface CreateSchoolStudentResponse extends ApiResponse<SchoolStudent> {}

export interface UpdateSchoolStudentResponse extends ApiResponse<SchoolStudent> {}

export interface GetSchoolTeachersResponse extends PaginatedResponse<SchoolTeacher> {}

export interface CreateSchoolTeacherResponse extends ApiResponse<SchoolTeacher> {}

export interface UpdateSchoolTeacherResponse extends ApiResponse<SchoolTeacher> {}

export interface GetSchoolClassesResponse extends PaginatedResponse<SchoolClass> {}

export interface CreateSchoolClassResponse extends ApiResponse<SchoolClass> {}

export interface UpdateSchoolClassResponse extends ApiResponse<SchoolClass> {}

export interface GetSchoolSubjectsResponse extends PaginatedResponse<SchoolSubject> {}

export interface CreateSchoolSubjectResponse extends ApiResponse<SchoolSubject> {}

export interface UpdateSchoolSubjectResponse extends ApiResponse<SchoolSubject> {}

// ============================================================================
// ATTENDANCE RESPONSES
// ============================================================================

export interface GetAttendanceRecordsResponse extends PaginatedResponse<AttendanceRecord> {
  summary?: {
    total: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    attendanceRate: number;
  };
}

export interface CreateAttendanceRecordResponse extends ApiResponse<AttendanceRecord> {}

export interface UpdateAttendanceRecordResponse extends ApiResponse<AttendanceRecord> {}

export interface BulkMarkAttendanceResponse extends ApiResponse<{
  success: boolean;
  created: number;
  updated: number;
  failed: number;
}> {}

// ============================================================================
// GRADE RESPONSES
// ============================================================================

export interface GetGradeRecordsResponse extends PaginatedResponse<GradeRecord> {
  summary?: {
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    gradeDistribution: Record<string, number>;
  };
}

export interface CreateGradeRecordResponse extends ApiResponse<GradeRecord> {}

export interface UpdateGradeRecordResponse extends ApiResponse<GradeRecord> {}

export interface BulkCreateGradesResponse extends ApiResponse<{
  success: boolean;
  created: number;
  failed: number;
}> {}

// ============================================================================
// FEE RESPONSES
// ============================================================================

export interface GetFeeRecordsResponse extends PaginatedResponse<FeeRecord> {
  summary?: {
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
    overdueAmount: number;
  };
}

export interface CreateFeeRecordResponse extends ApiResponse<FeeRecord> {}

export interface UpdateFeeRecordResponse extends ApiResponse<FeeRecord> {}

export interface RecordPaymentResponse extends ApiResponse<FeeRecord> {}

// ============================================================================
// TIMETABLE RESPONSES
// ============================================================================

export interface GetTimetableSlotsResponse extends PaginatedResponse<TimetableSlot> {}

export interface CreateTimetableSlotResponse extends ApiResponse<TimetableSlot> {}

export interface UpdateTimetableSlotResponse extends ApiResponse<TimetableSlot> {}

export interface DeleteTimetableSlotResponse extends ApiResponse<{ success: boolean }> {}

export interface CheckTimetableConflictResponse extends ApiResponse<{
  hasConflict: boolean;
  conflicts?: Array<{
    type: 'class' | 'teacher' | 'room';
    entityId: string;
    entityName: string;
    slot: TimetableSlot;
  }>;
}> {}

// ============================================================================
// SCHOOL ANNOUNCEMENT RESPONSES
// ============================================================================

export interface GetSchoolAnnouncementsResponse extends PaginatedResponse<SchoolAnnouncement> {}

export interface CreateSchoolAnnouncementResponse extends ApiResponse<SchoolAnnouncement> {}

export interface UpdateSchoolAnnouncementResponse extends ApiResponse<SchoolAnnouncement> {}

export interface DeleteSchoolAnnouncementResponse extends ApiResponse<{ success: boolean }> {}

// ============================================================================
// ADMIN RESPONSES
// ============================================================================

export interface GetDashboardStatsResponse extends ApiResponse<{
  totalUsers: number;
  activeCourses: number;
  partnerSchools: number;
  monthlyRevenue: number;
  userGrowth: number;
  courseGrowth: number;
  schoolGrowth: number;
  revenueGrowth: number;
}> {}

export interface GetPendingApprovalsResponse extends PaginatedResponse<{
  type: 'instructor' | 'school' | 'course';
  id: string;
  name: string;
  submittedAt: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
}> {}

export interface ReviewInstructorApplicationResponse extends ApiResponse<InstructorApplication> {}

export interface ReviewSchoolApplicationResponse extends ApiResponse<School> {}

export interface ReviewCourseResponse extends ApiResponse<Course> {}

export interface GetSystemHealthResponse extends ApiResponse<{
  serverStatus: 'online' | 'offline' | 'degraded';
  databaseStatus: 'healthy' | 'unhealthy';
  apiResponseTime: number;
  uptime: number;
  storageUsage: number;
  storageCapacity: number;
}> {}

export interface GetUsersResponse extends PaginatedResponse<User> {}

export interface UpdateUserStatusResponse extends ApiResponse<User> {}

export interface GetPlatformSettingsResponse extends ApiResponse<Record<string, string>> {}

export interface UpdatePlatformSettingResponse extends ApiResponse<{ key: string; value: string }> {}

// ============================================================================
// SEARCH RESPONSES
// ============================================================================

export interface SearchResponse extends ApiResponse<{
  courses?: Course[];
  instructors?: User[];
  schools?: School[];
  totalResults: number;
  query: string;
}> {}

// ============================================================================
// FILE UPLOAD RESPONSES
// ============================================================================

export interface UploadFileResponse extends ApiResponse<{
  fileId: string;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}> {}

export interface DeleteFileResponse extends ApiResponse<{ success: boolean }> {}

// ============================================================================
// ANALYTICS RESPONSES
// ============================================================================

export interface GetCourseAnalyticsResponse extends ApiResponse<{
  enrollments: number;
  activeStudents: number;
  completionRate: number;
  averageRating: number;
  totalRevenue: number;
  engagementMetrics: {
    averageTimeSpent: number;
    averageCompletion: number;
    retentionRate: number;
  };
  timeline: Array<{
    date: string;
    enrollments: number;
    completions: number;
    revenue: number;
  }>;
}> {}

export interface GetInstructorAnalyticsResponse extends ApiResponse<{
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
  coursePerformance: Array<{
    courseId: string;
    courseTitle: string;
    enrollments: number;
    completions: number;
    revenue: number;
    rating: number;
  }>;
}> {}

export interface GetSchoolAnalyticsResponse extends ApiResponse<{
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  attendanceRate: number;
  averageGrade: number;
  financialMetrics: {
    totalFees: number;
    collectedFees: number;
    pendingFees: number;
  };
}> {}

export interface GetStudentAnalyticsResponse extends ApiResponse<{
  totalEnrollments: number;
  completedCourses: number;
  inProgressCourses: number;
  averageScore: number;
  totalLearningTime: number;
  currentStreak: number;
  xp: number;
  level: number;
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: string;
  }>;
}> {}

// ============================================================================
// ERROR RESPONSES
// ============================================================================

export interface ErrorResponse {
  success: false;
  error: {
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
// COMMON WRAPPER TYPES
// ============================================================================

export type ApiResult<T> = Promise<ApiResponse<T>>;

export type PaginatedApiResult<T> = Promise<PaginatedResponse<T>>;
