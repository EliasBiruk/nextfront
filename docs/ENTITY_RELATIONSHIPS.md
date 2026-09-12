# JoyEdu Entity Relationships

This document defines the relationships between entities in the JoyEdu platform data model.

## Core Entity Relationships

### User-Centric Relationships

```
User (1) ----< (N) Enrollment
User (1) ----< (N) CourseProgress
User (1) ----< (N) QuizAttempt
User (1) ----< (N) Certificate
User (1) ----< (N) Notification
User (1) ----< (N) UserGamification
User (1) ----< (N) InstructorApplication
```

### School-Centric Relationships

```
School (1) ----< (N) SchoolStudent
School (1) ----< (N) SchoolTeacher
School (1) ----< (N) SchoolClass
School (1) ----< (N) SchoolSubject
School (1) ----< (N) AttendanceRecord
School (1) ----< (N) GradeRecord
School (1) ----< (N) FeeRecord
School (1) ----< (N) TimetableSlot
School (1) ----< (N) SchoolAnnouncement
```

### Course-Centric Relationships

```
Course (1) ----< (N) Enrollment
Course (1) ----< (N) CourseChapter
Course (1) ----< (N) CourseProgress
Course (1) ----< (N) Quiz
Course (1) ----< (N) Certificate
```

### Lesson-Centric Relationships

```
CourseChapter (1) ----< (N) CourseTopic
CourseTopic (1) ----< (N) CourseSubtopic
CourseSubtopic (1) ----< (N) CourseLesson
CourseLesson (1) ----< (N) Quiz
```

### Quiz-Centric Relationships

```
Quiz (1) ----< (N) QuizQuestion
Quiz (1) ----< (N) QuizAttempt
QuizAttempt (1) ----< (N) QuizAnswer
```

## Detailed Relationship Definitions

### User Relationships

#### User → School
- **Type**: Many-to-One (Optional)
- **Description**: A User can optionally belong to a School (for school users)
- **Foreign Key**: `User.schoolId` → `School.id`
- **Use Cases**: School administrators, teachers, students

#### User → Enrollment
- **Type**: One-to-Many
- **Description**: A User can have multiple Enrollments across different courses
- **Foreign Key**: `Enrollment.userId` → `User.id`
- **Use Cases**: Student course enrollments

#### User → CourseProgress
- **Type**: One-to-Many
- **Description**: A User has progress tracking for each enrolled course
- **Foreign Key**: `CourseProgress.userId` → `User.id`
- **Composite Key**: `userId + courseId`

#### User → QuizAttempt
- **Type**: One-to-Many
- **Description**: A User can attempt quizzes multiple times
- **Foreign Key**: `QuizAttempt.userId` → `User.id`
- **Use Cases**: Quiz retakes, progress tracking

#### User → Certificate
- **Type**: One-to-Many
- **Description**: A User earns certificates upon course completion
- **Foreign Key**: `Certificate.userId` → `User.id`
- **Use Cases**: Certification verification, achievement tracking

#### User → Notification
- **Type**: One-to-Many
- **Description**: A User receives notifications
- **Foreign Key**: `Notification.userId` → `User.id`
- **Use Cases**: System alerts, course updates, achievements

#### User → UserGamification
- **Type**: One-to-One
- **Description**: Each User has gamification stats (XP, level, achievements)
- **Foreign Key**: `UserGamification.userId` → `User.id`
- **Use Cases**: Gamification, achievements, streaks

#### User → InstructorApplication
- **Type**: One-to-Many
- **Description**: A User can submit instructor applications
- **Foreign Key**: `InstructorApplication.userId` → `User.id`
- **Use Cases**: Instructor onboarding workflow

### School Relationships

#### School → SchoolStudent
- **Type**: One-to-Many
- **Description**: A School has many Students
- **Foreign Key**: `SchoolStudent.schoolId` → `School.id`
- **Use Cases**: Student management, enrollment tracking

#### School → SchoolTeacher
- **Type**: One-to-Many
- **Description**: A School employs many Teachers
- **Foreign Key**: `SchoolTeacher.schoolId` → `School.id`
- **Use Cases**: Staff management, subject assignment

#### School → SchoolClass
- **Type**: One-to-Many
- **Description**: A School has many Classes
- **Foreign Key**: `SchoolClass.schoolId` → `School.id`
- **Use Cases**: Class scheduling, student assignment

#### School → SchoolSubject
- **Type**: One-to-Many
- **Description**: A School offers many Subjects
- **Foreign Key**: `SchoolSubject.schoolId` → `School.id`
- **Use Cases**: Curriculum management

#### School → AttendanceRecord
- **Type**: One-to-Many
- **Description**: A School tracks attendance records
- **Foreign Key**: `AttendanceRecord.schoolId` → `School.id`
- **Use Cases**: Attendance tracking, reporting

#### School → GradeRecord
- **Type**: One-to-Many
- **Description**: A School maintains grade records
- **Foreign Key**: `GradeRecord.schoolId` → `School.id`
- **Use Cases**: Academic performance tracking

#### School → FeeRecord
- **Type**: One-to-Many
- **Description**: A School manages fee records
- **Foreign Key**: `FeeRecord.schoolId` → `School.id`
- **Use Cases**: Financial management, payment tracking

#### School → TimetableSlot
- **Type**: One-to-Many
- **Description**: A School has timetable slots
- **Foreign Key**: `TimetableSlot.schoolId` → `School.id`
- **Use Cases**: Scheduling, resource allocation

#### School → SchoolAnnouncement
- **Type**: One-to-Many
- **Description**: A School creates announcements
- **Foreign Key**: `SchoolAnnouncement.schoolId` → `School.id`
- **Use Cases**: Communication, event notifications

### Course Relationships

#### Course → Enrollment
- **Type**: One-to-Many
- **Description**: A Course can have many Enrollments
- **Foreign Key**: `Enrollment.courseId` → `Course.id`
- **Use Cases**: Student enrollment tracking

#### Course → CourseChapter
- **Type**: One-to-Many
- **Description**: A Course is divided into Chapters
- **Foreign Key**: `CourseChapter.courseId` → `Course.id`
- **Use Cases**: Course structure organization

#### Course → CourseProgress
- **Type**: One-to-Many
- **Description**: A Course has progress tracking per user
- **Foreign Key**: `CourseProgress.courseId` → `Course.id`
- **Composite Key**: `userId + courseId`

#### Course → Quiz
- **Type**: One-to-Many
- **Description**: A Course contains Quizzes
- **Foreign Key**: `Quiz.courseId` → `Course.id`
- **Use Cases**: Assessment, knowledge testing

#### Course → Certificate
- **Type**: One-to-Many
- **Description**: A Course issues Certificates upon completion
- **Foreign Key**: `Certificate.courseId` → `Course.id`
- **Use Cases**: Certification, credential verification

### Lesson Hierarchy Relationships

#### CourseChapter → CourseTopic
- **Type**: One-to-Many
- **Description**: A Chapter contains Topics
- **Foreign Key**: `CourseTopic.chapterId` → `CourseChapter.id`
- **Use Cases**: Course content organization

#### CourseTopic → CourseSubtopic
- **Type**: One-to-Many
- **Description**: A Topic contains Subtopics
- **Foreign Key**: `CourseSubtopic.topicId` → `CourseTopic.id`
- **Use Cases**: Detailed content breakdown

#### CourseSubtopic → CourseLesson
- **Type**: One-to-Many
- **Description**: A Subtopic contains Lessons
- **Foreign Key**: `CourseLesson.subtopicId` → `CourseSubtopic.id`
- **Use Cases**: Individual learning units

#### CourseLesson → Quiz
- **Type**: One-to-One (Optional)
- **Description**: A Lesson may have an associated Quiz
- **Foreign Key**: `Quiz.lessonId` → `CourseLesson.id`
- **Use Cases**: Lesson assessments

### Quiz Relationships

#### Quiz → QuizQuestion
- **Type**: One-to-Many
- **Description**: A Quiz contains Questions
- **Foreign Key**: `QuizQuestion.quizId` → `Quiz.id`
- **Use Cases**: Quiz content

#### Quiz → QuizAttempt
- **Type**: One-to-Many
- **Description**: A Quiz can be attempted multiple times
- **Foreign Key**: `QuizAttempt.quizId` → `Quiz.id`
- **Use Cases**: Quiz history, retakes

#### QuizAttempt → QuizAnswer
- **Type**: One-to-Many
- **Description**: An Attempt contains Answers for each question
- **Foreign Key**: `QuizAnswer.questionId` → `QuizQuestion.id`
- **Use Cases**: Answer tracking, scoring

### Cross-Domain Relationships

#### SchoolStudent → SchoolClass
- **Type**: Many-to-One
- **Description**: A Student belongs to a Class
- **Foreign Key**: `SchoolStudent.classId` (implicit) → `SchoolClass.id`
- **Use Cases**: Class assignment, scheduling

#### SchoolTeacher → SchoolClass
- **Type**: Many-to-Many
- **Description**: A Teacher can teach multiple Classes
- **Foreign Key**: `SchoolTeacher.classes[]` → `SchoolClass.id[]`
- **Use Cases**: Subject assignment, scheduling

#### SchoolTeacher → SchoolSubject
- **Type**: Many-to-One
- **Description**: A Teacher teaches a Subject
- **Foreign Key**: `SchoolSubject.teacherId` → `SchoolTeacher.id`
- **Use Cases**: Subject assignment

#### SchoolClass → SchoolSubject
- **Type**: Many-to-Many
- **Description**: A Class takes multiple Subjects
- **Foreign Key**: Implicit via timetable
- **Use Cases**: Curriculum assignment

#### TimetableSlot → SchoolClass
- **Type**: Many-to-One
- **Description**: A TimetableSlot belongs to a Class
- **Foreign Key**: `TimetableSlot.classId` → `SchoolClass.id`
- **Use Cases**: Scheduling

#### TimetableSlot → SchoolSubject
- **Type**: Many-to-One
- **Description**: A TimetableSlot is for a Subject
- **Foreign Key**: `TimetableSlot.subjectId` → `SchoolSubject.id`
- **Use Cases**: Subject scheduling

#### TimetableSlot → SchoolTeacher
- **Type**: Many-to-One
- **Description**: A TimetableSlot is taught by a Teacher
- **Foreign Key**: `TimetableSlot.teacherId` → `SchoolTeacher.id`
- **Use Cases**: Teacher scheduling

#### AttendanceRecord → SchoolStudent
- **Type**: Many-to-One
- **Description**: Attendance is tracked per Student
- **Foreign Key**: `AttendanceRecord.studentId` → `SchoolStudent.id`
- **Use Cases**: Attendance tracking

#### AttendanceRecord → SchoolClass
- **Type**: Many-to-One
- **Description**: Attendance is tracked per Class
- **Foreign Key**: `AttendanceRecord.classId` → `SchoolClass.id`
- **Use Cases**: Class attendance

#### GradeRecord → SchoolStudent
- **Type**: Many-to-One
- **Description**: Grades are recorded per Student
- **Foreign Key**: `GradeRecord.studentId` → `SchoolStudent.id`
- **Use Cases**: Academic performance

#### GradeRecord → SchoolSubject
- **Type**: Many-to-One
- **Description**: Grades are recorded per Subject
- **Foreign Key**: `GradeRecord.subjectId` → `SchoolSubject.id`
- **Use Cases**: Subject performance

#### FeeRecord → SchoolStudent
- **Type**: Many-to-One
- **Description**: Fees are charged per Student
- **Foreign Key**: `FeeRecord.studentId` → `SchoolStudent.id`
- **Use Cases**: Financial tracking

## Relationship Cardinality Summary

| Entity | Related Entity | Cardinality | Description |
|--------|---------------|-------------|-------------|
| User | School | N:1 | Users can belong to a school |
| User | Enrollment | 1:N | Users have many enrollments |
| User | CourseProgress | 1:N | Users track progress per course |
| User | QuizAttempt | 1:N | Users attempt quizzes |
| User | Certificate | 1:N | Users earn certificates |
| User | Notification | 1:N | Users receive notifications |
| User | UserGamification | 1:1 | Users have gamification stats |
| School | SchoolStudent | 1:N | Schools have many students |
| School | SchoolTeacher | 1:N | Schools employ many teachers |
| School | SchoolClass | 1:N | Schools have many classes |
| School | SchoolSubject | 1:N | Schools offer many subjects |
| Course | Enrollment | 1:N | Courses have many enrollments |
| Course | CourseChapter | 1:N | Courses have chapters |
| Course | Quiz | 1:N | Courses contain quizzes |
| Course | Certificate | 1:N | Courses issue certificates |
| CourseChapter | CourseTopic | 1:N | Chapters contain topics |
| CourseTopic | CourseSubtopic | 1:N | Topics contain subtopics |
| CourseSubtopic | CourseLesson | 1:N | Subtopics contain lessons |
| Quiz | QuizQuestion | 1:N | Quizzes have questions |
| Quiz | QuizAttempt | 1:N | Quizzes have attempts |
| QuizAttempt | QuizAnswer | 1:N | Attempts have answers |

## Cascade Rules

### Delete Cascade
- **User deletion**: Cascades to Enrollment, CourseProgress, QuizAttempt, Certificate, Notification, UserGamification, InstructorApplication
- **Course deletion**: Cascades to Enrollment, CourseChapter, CourseProgress, Quiz, Certificate
- **School deletion**: Cascades to SchoolStudent, SchoolTeacher, SchoolClass, SchoolSubject, AttendanceRecord, GradeRecord, FeeRecord, TimetableSlot, SchoolAnnouncement
- **Quiz deletion**: Cascades to QuizQuestion, QuizAttempt

### Update Cascade
- **User ID updates**: Propagate to all related entities
- **Course ID updates**: Propagate to all related entities
- **School ID updates**: Propagate to all related entities

## Index Recommendations

### Primary Keys
- All entities have `id` as primary key

### Foreign Key Indexes
- `Enrollment.userId`, `Enrollment.courseId`
- `CourseProgress.userId`, `CourseProgress.courseId`
- `QuizAttempt.userId`, `QuizAttempt.quizId`
- `SchoolStudent.schoolId`
- `SchoolTeacher.schoolId`
- `SchoolClass.schoolId`
- `CourseChapter.courseId`
- `Quiz.courseId`, `Quiz.lessonId`
- `Certificate.userId`, `Certificate.courseId`

### Composite Indexes
- `CourseProgress(userId, courseId)`
- `Enrollment(userId, courseId)`
- `AttendanceRecord(schoolId, studentId, date)`
- `GradeRecord(schoolId, studentId, subjectId, term)`
- `TimetableSlot(schoolId, classId, dayOfWeek)`
