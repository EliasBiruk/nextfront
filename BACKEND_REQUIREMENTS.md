# JoyEdu Backend Requirements

This document outlines the backend requirements discovered during frontend prototype verification. The frontend prototype is complete and serves as a clear specification for backend development.

## Authentication & Authorization

### User Management
- **Users Table**: Store user profiles with roles (student, instructor, school, admin)
- **Password Hashing**: Secure password storage using bcrypt or similar
- **JWT Tokens**: Access tokens (1 hour expiry) and refresh tokens
- **Role-Based Access Control**: Enforce role-based permissions
- **Multi-Role Support**: Users can have multiple roles (e.g., student + instructor)

### Endpoints
- `POST /api/auth/login` - User authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - Session termination
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/forgot-password` - Password reset initiation
- `POST /api/auth/reset-password` - Password reset completion

### Data Model
```typescript
User {
  id: string
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  fullName: string
  avatar: string
  roles: UserRole[]
  schoolRoles?: SchoolRole[]
  schoolId?: string
  schoolSlug?: string
  createdAt: ISO8601
  updatedAt: ISO8601
  lastActiveAt: ISO8601
}
```

## Course Management

### Courses Table
- Store course information with lifecycle states
- Support for different scopes (PERSONAL, SCHOOL, PLATFORM)
- Support for different audiences (PRIVATE, SCHOOL_ONLY, PUBLIC, MARKETPLACE)

### Course Lifecycle States
- `DRAFT` - Course being created
- `UNDER_REVIEW` - Submitted for review
- `PUBLISHED` - Available to students
- `ARCHIVED` - No longer available
- `REJECTED` - Review failed

### Endpoints
- `GET /api/courses` - List courses with filters, pagination, sorting
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (instructor only)
- `PUT /api/courses/:id` - Update course (instructor only)
- `DELETE /api/courses/:id` - Delete course (instructor only)
- `POST /api/courses/:id/submit` - Submit for review
- `PUT /api/courses/:id/status` - Update course status (admin only)

### Data Model
```typescript
Course {
  id: string
  title: string
  description: string
  instructor: string
  instructorId: string
  category: string
  level: string
  language: string
  duration: string
  lessons: number
  price: number
  rating: number
  students: number
  thumbnail: string
  trailer: string
  scope: CourseScope
  audience: CourseAudience
  status: CourseStatus
  tags: string[]
  prerequisites: string[]
  createdAt: ISO8601
  updatedAt: ISO8601
  publishedAt: ISO8601
}
```

## Enrollment Management

### Enrollments Table
- Track student enrollments in courses
- Track progress and completion status

### Endpoints
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments` - List enrollments with filters
- `GET /api/enrollments/:id` - Get enrollment details
- `PUT /api/enrollments/:id/progress` - Update progress
- `DELETE /api/enrollments/:id` - Cancel enrollment

### Data Model
```typescript
Enrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: ISO8601
  progress: number (0-100)
  status: EnrollmentStatus (ACTIVE, COMPLETED, CANCELLED)
  lastAccessedAt: ISO8601
}
```

## Course Progress Tracking

### Progress Table
- Detailed tracking of lesson completion
- Quiz scores and attempts
- Current lesson position

### Endpoints
- `GET /api/progress/:userId/:courseId` - Get course progress
- `PUT /api/progress/:userId/:courseId` - Update progress
- `POST /api/progress/lesson-complete` - Mark lesson complete
- `POST /api/progress/quiz-score` - Record quiz score

### Data Model
```typescript
CourseProgress {
  userId: string
  courseId: string
  completedLessons: string[]
  currentLessonId: string
  quizScores: Record<string, number>
  totalProgress: number
  lastAccessedAt: ISO8601
}
```

## Quiz Management

### Quizzes Table
- Store quiz definitions with questions
- Support for multiple question types
- Passing score configuration

### Quiz Attempts Table
- Track student quiz attempts
- Store answers and scores

### Endpoints
- `GET /api/quizzes` - List quizzes
- `GET /api/quizzes/:id` - Get quiz details
- `POST /api/quizzes` - Create quiz (instructor)
- `POST /api/quizzes/:id/attempts` - Submit quiz attempt
- `GET /api/quizzes/:id/attempts` - Get attempt history

### Data Model
```typescript
Quiz {
  id: string
  courseId: string
  lessonId: string
  title: string
  description: string
  type: string (lesson, final, practice)
  duration: number (minutes)
  passingScore: number
  totalQuestions: number
  questions: Question[]
  createdAt: ISO8601
}

QuizAttempt {
  id: string
  userId: string
  quizId: string
  startedAt: ISO8601
  completedAt: ISO8601
  score: number
  passed: boolean
  answers: Answer[]
  timeSpent: number (seconds)
}
```

## Instructor Applications

### Applications Table
- Track instructor applications
- Support for review workflow

### Endpoints
- `POST /api/instructors/applications` - Submit application
- `GET /api/instructors/applications` - List applications (admin)
- `GET /api/instructors/applications/:id` - Get application details
- `PUT /api/instructors/applications/:id/status` - Update status (admin)

### Data Model
```typescript
InstructorApplication {
  id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  expertise: string[]
  experience: number
  qualifications: string
  bio: string
  website: string
  linkedin: string
  status: ApplicationStatus
  submittedAt: ISO8601
  reviewedAt: ISO8601
  reviewedBy: string
  feedback: string
}
```

## School Management

### Schools Table
- Store school profiles
- Track school status and enrollment

### School Students Table
- Student enrollment in schools
- Grade level and class assignments

### School Teachers Table
- Teacher assignments to schools
- Department and subject assignments

### School Classes Table
- Class definitions with capacity
- Academic year tracking

### Endpoints
- `GET /api/schools` - List schools
- `GET /api/schools/:id` - Get school details
- `POST /api/schools` - Register school
- `PUT /api/schools/:id` - Update school
- `GET /api/schools/:id/students` - List school students
- `GET /api/schools/:id/teachers` - List school teachers
- `GET /api/schools/:id/classes` - List school classes
- `POST /api/schools/:id/classes` - Create class

### Data Model
```typescript
School {
  id: string
  slug: string
  name: string
  logo: string
  description: string
  location: string
  country: string
  website: string
  email: string
  phone: string
  currentEnrollment: number
  establishedYear: number
  type: string (private, public)
  status: string
  createdAt: ISO8601
  updatedAt: ISO8601
}

SchoolClass {
  id: string
  schoolId: string
  name: string
  grade: string
  section: string
  classTeacherId: string
  roomNumber: string
  capacity: number
  currentEnrollment: number
  academicYear: string
  status: string
  createdAt: ISO8601
}
```

## Attendance Management

### Attendance Records Table
- Daily attendance tracking
- Status tracking (present, absent, late)

### Endpoints
- `GET /api/attendance` - List attendance records
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/student/:id` - Get student attendance history
- `GET /api/attendance/class/:id` - Get class attendance

### Data Model
```typescript
AttendanceRecord {
  id: string
  schoolId: string
  studentId: string
  classId: string
  date: ISO8601
  status: string (present, absent, late)
  markedBy: string
}
```

## Grade Management

### Grade Records Table
- Store assessment grades
- Track term and academic year

### Endpoints
- `GET /api/grades` - List grade records
- `POST /api/grades` - Create grade record
- `PUT /api/grades/:id` - Update grade
- `GET /api/grades/student/:id` - Get student grades

### Data Model
```typescript
GradeRecord {
  id: string
  schoolId: string
  studentId: string
  subjectId: string
  term: string
  assessmentType: string
  score: number
  maxScore: number
  grade: string
  gradedAt: ISO8601
  gradedBy: string
}
```

## Gamification

### Achievements Table
- Achievement definitions
- XP rewards and requirements

### User Gamification Table
- Track user XP, level, streak
- Track earned achievements

### Endpoints
- `GET /api/achievements` - List achievements
- `GET /api/gamification/:userId` - Get user gamification data
- `POST /api/gamification/:userId/achievement` - Award achievement
- `PUT /api/gamification/:userId/xp` - Update XP

### Data Model
```typescript
Achievement {
  id: string
  title: string
  description: string
  icon: string
  xpReward: number
  requirement: { type: string, value: number }
}

UserGamification {
  userId: string
  xp: number
  level: number
  streak: number
  lastActiveDate: string
  achievements: string[]
  stats: {
    lessonsCompleted: number
    quizzesCompleted: number
    coursesCompleted: number
    coursesEnrolled: number
    playgroundUses: number
  }
}
```

## Notifications

### Notifications Table
- User notifications
- Priority and type classification

### Endpoints
- `GET /api/notifications` - List user notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `POST /api/notifications` - Create notification

### Data Model
```typescript
Notification {
  id: string
  userId: string
  type: NotificationType
  priority: NotificationPriority
  title: string
  message: string
  actionUrl: string
  isRead: boolean
  createdAt: ISO8601
}
```

## Analytics

### Analytics Endpoints
- `GET /api/analytics/student/:userId` - Student learning analytics
- `GET /api/analytics/instructor/:userId` - Instructor performance analytics
- `GET /api/analytics/school/:schoolId` - School analytics
- `GET /api/analytics/platform` - Platform-wide analytics (admin)

### Analytics Metrics
- Student: courses completed, time spent, quiz scores, streak
- Instructor: course performance, student engagement, revenue
- School: enrollment trends, attendance rates, grade distributions
- Platform: user growth, course metrics, revenue

## Search & Filtering

### Search Service
- Full-text search across courses, instructors, schools
- Faceted search with filters (category, level, price, rating)
- Sorting options (popular, newest, rating, price)

### Endpoints
- `GET /api/search` - General search
- `GET /api/search/courses` - Course search
- `GET /api/search/instructors` - Instructor search
- `GET /api/search/schools` - School search

## File Storage

### Requirements
- Store course thumbnails and trailers
- Store instructor profile photos
- Store school logos
- Store certificate PDFs
- CDN integration for static assets

### Endpoints
- `POST /api/upload` - Upload file
- `GET /api/files/:id` - Retrieve file
- `DELETE /api/files/:id` - Delete file

## Certificate Generation

### Certificates Table
- Store issued certificates
- Verification codes

### Endpoints
- `GET /api/certificates` - List user certificates
- `POST /api/certificates` - Generate certificate
- `GET /api/certificates/verify/:code` - Verify certificate
- `GET /api/certificates/:id/download` - Download PDF

### Data Model
```typescript
Certificate {
  id: string
  userId: string
  courseId: string
  issuedAt: ISO8601
  verificationCode: string
  status: string
}
```

## Admin Operations

### Platform Management
- User management (CRUD)
- Course moderation
- School approval
- Application review
- Platform analytics
- Configuration management

### Endpoints
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id/status` - Update user status
- `GET /api/admin/applications` - List pending applications
- `PUT /api/admin/applications/:id/approve` - Approve application
- `PUT /api/admin/applications/:id/reject` - Reject application
- `GET /api/admin/stats` - Platform statistics

## API Specifications

### Request/Response Format
- All endpoints return JSON
- Standard response format:
```typescript
{
  success: boolean
  data?: any
  error?: {
    code: string
    message: string
    details?: any
  }
}
```

### Pagination
- Standard pagination parameters:
```typescript
{
  page: number
  pageSize: number
}
```

- Response includes pagination metadata:
```typescript
{
  data: any[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
```

### Error Handling
- HTTP status codes:
  - 200: Success
  - 201: Created
  - 400: Bad Request
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
  - 500: Internal Server Error

### Rate Limiting
- Implement rate limiting for public endpoints
- Higher limits for authenticated users
- No limits for admin users

## Database Requirements

### Recommended Database
- PostgreSQL for relational data
- Redis for caching and sessions
- Elasticsearch for full-text search

### Key Indexes
- Users: email, roles
- Courses: status, category, instructorId
- Enrollments: userId, courseId
- Applications: status, submittedAt
- Schools: slug, status

## Security Requirements

### Authentication
- JWT-based authentication
- Secure password hashing (bcrypt)
- Token refresh mechanism

### Authorization
- Role-based access control (RBAC)
- Resource ownership verification
- Admin override capabilities

### Data Protection
- HTTPS only
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

## Performance Requirements

### Response Times
- API responses < 200ms for cached data
- API responses < 500ms for database queries
- File uploads < 5s for 10MB files

### Scalability
- Horizontal scaling support
- Database connection pooling
- Caching strategy (Redis)
- CDN for static assets

## Monitoring & Logging

### Requirements
- Request logging
- Error tracking
- Performance monitoring
- User activity audit logs
- API usage analytics

## Deployment Requirements

### Environment Variables
- Database connection strings
- JWT secret keys
- File storage credentials
- Email service credentials
- Third-party API keys

### Infrastructure
- Containerized deployment (Docker)
- Load balancing
- Auto-scaling
- Backup strategy
- Disaster recovery plan
