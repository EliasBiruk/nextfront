// Mock data for JoyEdu School Frontend Prototype
// This is frontend-only mock data for prototype validation
// DO NOT use this as a real backend implementation

// Mock users for admin interface
export const mockUsers = [
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    roles: ['student'],
    status: 'Active',
    schoolId: 'school-1',
  },
  {
    id: 'user-2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    roles: ['instructor'],
    status: 'Active',
    schoolId: 'school-1',
  },
  {
    id: 'user-3',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@example.com',
    roles: ['school'],
    status: 'Active',
    schoolId: 'school-1',
  },
  {
    id: 'user-4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    roles: ['student'],
    status: 'Active',
    schoolId: 'school-1',
  },
  {
    id: 'user-5',
    firstName: 'Robert',
    lastName: 'Wilson',
    email: 'robert.wilson@example.com',
    roles: ['student'],
    status: 'Inactive',
    schoolId: 'school-1',
  },
  {
    id: 'user-6',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@joyedu.com',
    roles: ['admin'],
    status: 'Active',
  },
];

// Timetable slots for classes
export const mockTimetableSlots = [
  { id: 'slot-1', day: 'Monday', period: 1, startTime: '08:00', endTime: '08:45' },
  { id: 'slot-2', day: 'Monday', period: 2, startTime: '08:50', endTime: '09:35' },
  { id: 'slot-3', day: 'Monday', period: 3, startTime: '09:40', endTime: '10:25' },
  { id: 'slot-4', day: 'Monday', period: 4, startTime: '10:30', endTime: '11:15' },
  { id: 'slot-5', day: 'Monday', period: 5, startTime: '11:20', endTime: '12:05' },
  { id: 'slot-6', day: 'Monday', period: 6, startTime: '12:05', endTime: '12:50' },
  { id: 'slot-7', day: 'Monday', period: 7, startTime: '13:00', endTime: '13:45' },
  { id: 'slot-8', day: 'Monday', period: 8, startTime: '13:50', endTime: '14:35' },
];

// Attendance records
export const mockAttendance = [
  {
    id: 'attendance-1',
    studentId: 'student-1',
    classId: 'class-1',
    date: '2024-03-06',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-2',
    studentId: 'student-2',
    classId: 'class-2',
    date: '2024-03-06',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-3',
    studentId: 'student-3',
    classId: 'class-3',
    date: '2024-03-06',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-4',
    studentId: 'student-1',
    classId: 'class-1',
    date: '2024-03-05',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-5',
    studentId: 'student-2',
    classId: 'class-2',
    date: '2024-03-05',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-6',
    studentId: 'student-3',
    classId: 'class-3',
    date: '2024-03-05',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-7',
    studentId: 'student-1',
    classId: 'class-1',
    date: '2024-03-04',
    status: 'Absent',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-8',
    studentId: 'student-2',
    classId: 'class-2',
    date: '2024-03-04',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-9',
    studentId: 'student-3',
    classId: 'class-3',
    date: '2024-03-04',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-10',
    studentId: 'student-2',
    classId: 'class-1',
    date: '2024-03-06',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-11',
    studentId: 'student-2',
    classId: 'class-1',
    date: '2024-03-05',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-12',
    studentId: 'student-2',
    classId: 'class-1',
    date: '2024-03-04',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-13',
    studentId: 'student-3',
    classId: 'class-2',
    date: '2024-03-06',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-14',
    studentId: 'student-3',
    classId: 'class-2',
    date: '2024-03-05',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-15',
    studentId: 'student-3',
    classId: 'class-2',
    date: '2024-03-04',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-16',
    studentId: 'student-1',
    classId: 'class-3',
    date: '2024-03-06',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-17',
    studentId: 'student-1',
    classId: 'class-3',
    date: '2024-03-05',
    status: 'Present',
    markedBy: 'teacher-1',
  },
  {
    id: 'attendance-18',
    studentId: 'student-1',
    classId: 'class-3',
    date: '2024-03-04',
    status: 'Present',
    markedBy: 'teacher-1',
  },
];

export const mockSchools = [
  {
    id: 'school-1',
    slug: 'springfield-academy',
    name: 'Springfield Academy',
    address: '123 Education Lane, Springfield, IL 62701',
    phone: '+1 (555) 123-4567',
    email: 'info@springfieldacademy.edu',
    website: 'https://www.springfieldacademy.edu',
    logo: '🏫',
    primaryColor: '#2563EB',
    secondaryColor: '#16A34A',
    accentColor: '#F97316',
    motto: 'Excellence in Education, Character in Life',
    tagline: 'Building Tomorrow\'s Leaders Today',
    establishedYear: 1985,
    educationLevel: 'K-12',
    curriculumType: 'National Curriculum',
    totalCapacity: 3000,
    currentEnrollment: 2450,
    studentTeacherRatio: '15:1',
    averageClassSize: 25,
  },
];

export const mockStudents = [
  {
    id: 'student-1',
    schoolId: 'school-1',
    firstName: 'Alex',
    lastName: 'Thompson',
    grade: '10',
    section: 'A',
    rollNumber: '2024-1001',
    dateOfBirth: '2009-03-15',
    gender: 'Male',
    enrollmentDate: '2019-08-15',
    status: 'Active',
    guardianId: 'guardian-1',
    classId: 'class-1',
    gpa: 3.8,
    attendanceRate: 96,
    photo: null,
    address: '789 Family Drive, Springfield, IL 62702',
    phone: '+1 (555) 456-7890',
    email: 'alex.thompson@school.edu',
  },
  {
    id: 'student-2',
    schoolId: 'school-1',
    firstName: 'Emma',
    lastName: 'Thompson',
    grade: '8',
    section: 'B',
    rollNumber: '2024-2001',
    dateOfBirth: '2011-07-22',
    gender: 'Female',
    enrollmentDate: '2019-08-15',
    status: 'Active',
    guardianId: 'guardian-1',
    classId: 'class-2',
    gpa: 3.5,
    attendanceRate: 94,
    photo: null,
    address: '789 Family Drive, Springfield, IL 62702',
    phone: '+1 (555) 456-7890',
    email: 'emma.thompson@school.edu',
  },
  {
    id: 'student-3',
    schoolId: 'school-1',
    firstName: 'Jake',
    lastName: 'Thompson',
    grade: '5',
    section: 'A',
    rollNumber: '2024-3001',
    dateOfBirth: '2014-11-08',
    gender: 'Male',
    enrollmentDate: '2019-08-15',
    status: 'Active',
    guardianId: 'guardian-1',
    classId: 'class-3',
    gpa: 3.9,
    attendanceRate: 98,
    photo: null,
    address: '789 Family Drive, Springfield, IL 62702',
    phone: '+1 (555) 456-7890',
    email: 'jake.thompson@school.edu',
  },
];

export const mockTeachers = [
  {
    id: 'teacher-1',
    schoolId: 'school-1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    employeeId: 'EMP-001',
    email: 'sarah.johnson@school.edu',
    phone: '+1 (555) 111-2222',
    department: 'Mathematics',
    subjects: ['Mathematics'],
    classes: ['class-1', 'class-4', 'class-5'],
    qualification: 'M.Sc. Mathematics',
    experience: 12,
    joinDate: '2012-08-01',
    status: 'Active',
    employmentType: 'Full-time',
    position: 'Senior Teacher',
    dateOfBirth: '1985-04-15',
    gender: 'Female',
    address: '456 Faculty Lane, Springfield, IL 62703',
    photo: null,
  },
  {
    id: 'teacher-2',
    schoolId: 'school-1',
    firstName: 'Michael',
    lastName: 'Chen',
    employeeId: 'EMP-002',
    email: 'michael.chen@school.edu',
    phone: '+1 (555) 222-3333',
    department: 'Science',
    subjects: ['Physics', 'Chemistry'],
    classes: ['class-2', 'class-3'],
    qualification: 'Ph.D. Physics',
    experience: 8,
    joinDate: '2016-08-01',
    status: 'Active',
    employmentType: 'Full-time',
    position: 'Department Head',
    dateOfBirth: '1988-09-22',
    gender: 'Male',
    address: '789 Science Road, Springfield, IL 62704',
    photo: null,
  },
  {
    id: 'teacher-3',
    schoolId: 'school-1',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    employeeId: 'EMP-003',
    email: 'emily.rodriguez@school.edu',
    phone: '+1 (555) 333-4444',
    department: 'English',
    subjects: ['English', 'Literature'],
    classes: ['class-1', 'class-2'],
    qualification: 'M.A. English Literature',
    experience: 5,
    joinDate: '2019-08-01',
    status: 'Active',
    employmentType: 'Full-time',
    position: 'Teacher',
    dateOfBirth: '1992-11-30',
    gender: 'Female',
    address: '321 Literature Ave, Springfield, IL 62705',
    photo: null,
  },
];

export const mockClasses = [
  {
    id: 'class-1',
    schoolId: 'school-1',
    grade: '10',
    section: 'A',
    room: '201',
    classTeacherId: 'teacher-1',
    capacity: 30,
    currentStudents: 2,
    academicYear: '2024-2025',
    subjectIds: ['subject-1'],
    studentIds: ['student-1', 'student-2'],
    status: 'Active',
    timetable: [
      { day: 'Monday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Monday', period: 2, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Monday', period: 3, subjectId: 'subject-2', teacherId: 'teacher-2' },
      { day: 'Tuesday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Tuesday', period: 2, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Wednesday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Wednesday', period: 2, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Thursday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Thursday', period: 2, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Friday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
    ],
  },
  {
    id: 'class-2',
    schoolId: 'school-1',
    grade: '8',
    section: 'B',
    room: '102',
    classTeacherId: 'teacher-1',
    capacity: 30,
    currentStudents: 2,
    academicYear: '2024-2025',
    subjectIds: ['subject-1', 'subject-2'],
    studentIds: ['student-2', 'student-3'],
    status: 'Active',
    timetable: [
      { day: 'Monday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Monday', period: 2, subjectId: 'subject-2', teacherId: 'teacher-2' },
      { day: 'Tuesday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Tuesday', period: 2, subjectId: 'subject-2', teacherId: 'teacher-2' },
      { day: 'Wednesday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Wednesday', period: 2, subjectId: 'subject-2', teacherId: 'teacher-2' },
      { day: 'Thursday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Thursday', period: 2, subjectId: 'subject-2', teacherId: 'teacher-2' },
      { day: 'Friday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Friday', period: 2, subjectId: 'subject-2', teacherId: 'teacher-2' },
    ],
  },
  {
    id: 'class-3',
    schoolId: 'school-1',
    grade: '5',
    section: 'A',
    room: '501',
    classTeacherId: 'teacher-1',
    capacity: 25,
    currentStudents: 2,
    academicYear: '2024-2025',
    subjectIds: ['subject-1', 'subject-2'],
    studentIds: ['student-3', 'student-1'],
    status: 'Active',
    timetable: [
      { day: 'Monday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Monday', period: 2, subjectId: 'subject-2', teacherId: 'teacher-3' },
      { day: 'Tuesday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Tuesday', period: 2, subjectId: 'subject-2', teacherId: 'teacher-3' },
      { day: 'Wednesday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Wednesday', period: 2, subjectId: 'subject-2', teacherId: 'teacher-3' },
      { day: 'Thursday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Thursday', period: 2, subjectId: 'subject-2', teacherId: 'teacher-3' },
      { day: 'Friday', period: 1, subjectId: 'subject-1', teacherId: 'teacher-1' },
      { day: 'Friday', period: 2, subjectId: 'subject-2', teacherId: 'teacher-3' },
    ],
  },
  {
    id: 'class-4',
    schoolId: 'school-1',
    grade: '10',
    section: 'B',
    room: '202',
    classTeacherId: 'teacher-2',
    capacity: 30,
    currentStudents: 27,
    academicYear: '2024-2025',
    subjectIds: ['subject-2'],
    studentIds: [],
    status: 'Active',
    timetable: [],
  },
  {
    id: 'class-5',
    schoolId: 'school-1',
    grade: '12',
    section: 'A',
    room: '301',
    classTeacherId: 'teacher-3',
    capacity: 25,
    currentStudents: 23,
    academicYear: '2024-2025',
    subjectIds: ['subject-2'],
    studentIds: [],
    status: 'Active',
    timetable: [],
  },
];

export const mockSubjects = [
  {
    id: 'subject-1',
    schoolId: 'school-1',
    name: 'Mathematics',
    code: 'MATH',
    department: 'Mathematics',
    description: 'Mathematics curriculum for all grades',
  },
  {
    id: 'subject-2',
    schoolId: 'school-1',
    name: 'English',
    code: 'ENG',
    department: 'English',
    description: 'English language and literature',
  },
];

export const mockGuardians = [
  {
    id: 'guardian-1',
    schoolId: 'school-1',
    firstName: 'Mrs.',
    lastName: 'Thompson',
    relationship: 'Mother',
    email: 'mrs.thompson@email.com',
    phone: '+1 (555) 456-7890',
    address: '789 Family Drive, Springfield, IL 62702',
    occupation: 'Accountant',
    studentIds: ['student-1', 'student-2', 'student-3'],
  },
];

export const mockAssignments = [
  {
    id: 'assignment-1',
    schoolId: 'school-1',
    classId: 'class-1',
    subjectId: 'subject-1',
    teacherId: 'teacher-1',
    title: 'Quadratic Equations Practice',
    description: 'Complete exercises 1-20 from Chapter 5',
    dueDate: '2024-03-15',
    totalPoints: 100,
    status: 'Published',
    createdAt: '2024-03-01',
  },
];

// Academic years and terms
export const mockAcademicYears = [
  {
    id: 'year-1',
    schoolId: 'school-1',
    name: '2024-2025',
    status: 'Active',
    startDate: '2024-08-15',
    endDate: '2025-06-15',
  },
  {
    id: 'year-2',
    schoolId: 'school-1',
    name: '2023-2024',
    status: 'Completed',
    startDate: '2023-08-15',
    endDate: '2024-06-15',
  },
  {
    id: 'year-3',
    schoolId: 'school-1',
    name: '2022-2023',
    status: 'Completed',
    startDate: '2022-08-15',
    endDate: '2023-06-15',
  },
];

export const mockTerms = [
  {
    id: 'term-1',
    yearId: 'year-1',
    schoolId: 'school-1',
    name: 'Fall Semester',
    status: 'Active',
    startDate: '2024-08-15',
    endDate: '2024-12-20',
  },
  {
    id: 'term-2',
    yearId: 'year-1',
    schoolId: 'school-1',
    name: 'Spring Semester',
    status: 'Upcoming',
    startDate: '2025-01-05',
    endDate: '2025-05-30',
  },
  {
    id: 'term-3',
    yearId: 'year-1',
    schoolId: 'school-1',
    name: 'Summer Semester',
    status: 'Upcoming',
    startDate: '2025-06-01',
    endDate: '2025-06-30',
  },
];

// Grade level information
export const mockGradeLevels = [
  {
    id: 'grade-1',
    schoolId: 'school-1',
    grade: '9th Grade',
    coordinator: 'Ms. Johnson',
    totalClasses: 4,
    totalSections: 12,
    totalStudents: 320,
    status: 'Active',
  },
  {
    id: 'grade-2',
    schoolId: 'school-1',
    grade: '10th Grade',
    coordinator: 'Mr. Smith',
    totalClasses: 4,
    totalSections: 12,
    totalStudents: 310,
    status: 'Active',
  },
  {
    id: 'grade-3',
    schoolId: 'school-1',
    grade: '11th Grade',
    coordinator: 'Dr. Chen',
    totalClasses: 3,
    totalSections: 9,
    totalStudents: 240,
    status: 'Active',
  },
  {
    id: 'grade-4',
    schoolId: 'school-1',
    grade: '12th Grade',
    coordinator: 'Mrs. Williams',
    totalClasses: 3,
    totalSections: 9,
    totalStudents: 225,
    status: 'Active',
  },
];



// Timetable schedules
export const mockSchedules = [
  {
    id: 'schedule-1',
    schoolId: 'school-1',
    classId: 'class-1',
    day: 'Monday',
    period: 1,
    subjectId: 'subject-1',
    teacherId: 'teacher-1',
    roomId: 'room-1',
    time: '8:00 AM - 8:45 AM',
    status: 'Scheduled',
  },
  {
    id: 'schedule-2',
    schoolId: 'school-1',
    classId: 'class-1',
    day: 'Monday',
    period: 2,
    subjectId: 'subject-2',
    teacherId: 'teacher-2',
    roomId: 'room-2',
    time: '8:50 AM - 9:35 AM',
    status: 'Scheduled',
  },
  {
    id: 'schedule-3',
    schoolId: 'school-1',
    classId: 'class-1',
    day: 'Monday',
    period: 3,
    subjectId: 'subject-1',
    teacherId: 'teacher-1',
    roomId: 'room-1',
    time: '9:40 AM - 10:25 AM',
    status: 'Scheduled',
  },
];

// Inventory items
export const mockInventory = [
  {
    id: 'inv-1',
    schoolId: 'school-1',
    name: 'A4 Paper Reams',
    category: 'Office Supplies',
    sku: 'OFF-001',
    location: 'Main Building - Storage Room',
    quantity: 500,
    minStock: 100,
    unit: 'Reams',
    unitPrice: 5,
    status: 'In Stock',
    value: 2500,
  },
  {
    id: 'inv-2',
    schoolId: 'school-1',
    name: 'Science Lab Equipment',
    category: 'Equipment',
    sku: 'EQP-045',
    location: 'Science Lab',
    quantity: 45,
    minStock: 20,
    unit: 'Pieces',
    unitPrice: 1000,
    status: 'In Stock',
    value: 45000,
  },
  {
    id: 'inv-3',
    schoolId: 'school-1',
    name: 'Student Desks',
    category: 'Furniture',
    sku: 'FUR-012',
    location: 'Classroom 10-A',
    quantity: 30,
    minStock: 35,
    unit: 'Desks',
    unitPrice: 100,
    status: 'Low Stock',
    value: 3000,
  },
  {
    id: 'inv-4',
    schoolId: 'school-1',
    name: 'Textbooks - Mathematics',
    category: 'Books',
    sku: 'BK-078',
    location: 'Library',
    quantity: 0,
    minStock: 50,
    unit: 'Copies',
    unitPrice: 45,
    status: 'Out of Stock',
    value: 0,
  },
  {
    id: 'inv-5',
    schoolId: 'school-1',
    name: 'Whiteboard Markers',
    category: 'Classroom Materials',
    sku: 'CLS-023',
    location: 'Staff Room',
    quantity: 120,
    minStock: 50,
    unit: 'Boxes',
    unitPrice: 5,
    status: 'In Stock',
    value: 600,
  },
];

// Examination data
export const mockExaminations = [
  {
    id: 'exam-1',
    schoolId: 'school-1',
    name: 'Mid-Term Examination',
    type: 'Mid-Term',
    classId: 'class-1',
    subjectId: 'subject-1',
    date: '2024-09-15',
    duration: '2 weeks',
    status: 'Scheduled',
    roomCount: 45,
    students: 2450,
    createdBy: 'teacher-1',
  },
  {
    id: 'exam-2',
    schoolId: 'school-1',
    name: 'Physics Unit Test',
    type: 'Quiz',
    classId: 'class-2',
    subjectId: 'subject-1',
    date: '2024-09-01',
    duration: '1 hour',
    status: 'Scheduled',
    roomCount: 2,
    students: 60,
    createdBy: 'teacher-2',
  },
  {
    id: 'exam-3',
    schoolId: 'school-1',
    name: 'Mathematics Assessment',
    type: 'Quiz',
    classId: 'class-3',
    subjectId: 'subject-1',
    date: '2024-09-03',
    duration: '1.5 hours',
    status: 'Scheduled',
    roomCount: 2,
    students: 56,
    createdBy: 'teacher-3',
  },
  {
    id: 'exam-4',
    schoolId: 'school-1',
    name: 'English Literature Exam',
    type: 'Mid-Term',
    classId: 'class-1',
    subjectId: 'subject-2',
    date: '2024-09-05',
    duration: '2 hours',
    status: 'Scheduled',
    roomCount: 1,
    students: 32,
    createdBy: 'teacher-4',
  },
  {
    id: 'exam-5',
    schoolId: 'school-1',
    name: 'History Final Exam',
    type: 'Final',
    classId: 'class-4',
    subjectId: 'subject-2',
    date: '2024-09-10',
    duration: '3 hours',
    status: 'Scheduled',
    roomCount: 1,
    students: 25,
    createdBy: 'teacher-1',
  },
];

// Rooms for timetable and examinations
export const mockRooms = [
  {
    id: 'room-1',
    schoolId: 'school-1',
    name: 'Room 101',
    type: 'Classroom',
    capacity: 30,
    building: 'Main Building',
    floor: 1,
    equipment: ['Projector', 'Whiteboard'],
  },
  {
    id: 'room-2',
    schoolId: 'school-1',
    name: 'Room 102',
    type: 'Classroom',
    capacity: 30,
    building: 'Main Building',
    floor: 1,
    equipment: ['Projector', 'Whiteboard'],
  },
  {
    id: 'room-3',
    schoolId: 'school-1',
    name: 'Science Lab 1',
    type: 'Laboratory',
    capacity: 25,
    building: 'Science Building',
    floor: 1,
    equipment: ['Lab Equipment', 'Microscopes', 'Safety Equipment'],
  },
  {
    id: 'room-4',
    schoolId: 'school-1',
    name: 'Computer Lab 1',
    type: 'Computer Lab',
    capacity: 30,
    building: 'Main Building',
    floor: 2,
    equipment: ['Computers', 'Projector', 'Internet'],
  },
];

export const mockGrades = [
  {
    id: 'grade-1',
    studentId: 'student-1',
    subjectId: 'subject-1',
    subject: 'Mathematics',
    assignmentId: 'assignment-1',
    score: 95,
    totalPoints: 100,
    percentage: 95,
    grade: 'A',
    gradedBy: 'teacher-1',
    gradedAt: '2024-03-16',
  },
  {
    id: 'grade-2',
    studentId: 'student-1',
    subjectId: 'subject-2',
    subject: 'English',
    assignmentId: 'assignment-2',
    score: 88,
    totalPoints: 100,
    percentage: 88,
    grade: 'B+',
    gradedBy: 'teacher-3',
    gradedAt: '2024-03-16',
  },
  {
    id: 'grade-3',
    studentId: 'student-2',
    subjectId: 'subject-1',
    subject: 'Mathematics',
    assignmentId: 'assignment-1',
    score: 78,
    totalPoints: 100,
    percentage: 78,
    grade: 'B',
    gradedBy: 'teacher-1',
    gradedAt: '2024-03-16',
  },
  {
    id: 'grade-4',
    studentId: 'student-2',
    subjectId: 'subject-2',
    subject: 'English',
    assignmentId: 'assignment-2',
    score: 92,
    totalPoints: 100,
    percentage: 92,
    grade: 'A-',
    gradedBy: 'teacher-3',
    gradedAt: '2024-03-16',
  },
  {
    id: 'grade-5',
    studentId: 'student-3',
    subjectId: 'subject-1',
    subject: 'Mathematics',
    assignmentId: 'assignment-1',
    score: 98,
    totalPoints: 100,
    percentage: 98,
    grade: 'A+',
    gradedBy: 'teacher-1',
    gradedAt: '2024-03-16',
  },
];

export const mockFees = [
  {
    id: 'fee-1',
    schoolId: 'school-1',
    studentId: 'student-1',
    feeStructureId: 'fee-structure-1',
    academicYear: '2024-2025',
    totalAmount: 5000,
    paidAmount: 5000,
    balance: 0,
    status: 'Paid',
    dueDate: '2024-08-15',
    type: 'Tuition',
    amount: 5000,
  },
  {
    id: 'fee-2',
    schoolId: 'school-1',
    studentId: 'student-2',
    feeStructureId: 'fee-structure-1',
    academicYear: '2024-2025',
    totalAmount: 4500,
    paidAmount: 2000,
    balance: 2500,
    status: 'Pending',
    dueDate: '2024-08-15',
    type: 'Tuition',
    amount: 4500,
  },
  {
    id: 'fee-3',
    schoolId: 'school-1',
    studentId: 'student-3',
    feeStructureId: 'fee-structure-1',
    academicYear: '2024-2025',
    totalAmount: 4000,
    paidAmount: 4000,
    balance: 0,
    status: 'Paid',
    dueDate: '2024-08-15',
    type: 'Tuition',
    amount: 4000,
  },
];

export const mockAnnouncements = [
  {
    id: 'announcement-1',
    schoolId: 'school-1',
    title: 'Parent-Teacher Meeting',
    content: 'Parent-teacher meeting scheduled for March 15, 2024 at 4:00 PM',
    targetAudience: 'Guardians',
    priority: 'Normal',
    createdAt: '2024-03-01',
    createdBy: 'admin-1',
  },
];

// Re-export attendance for convenience
export { mockAttendance as attendanceRecords };
export { mockTimetableSlots as timetableSlots };

// Prototype personas for testing different role experiences
export const mockPersonas = [
  {
    id: 'persona-school-owner',
    name: 'School Owner',
    type: 'school-admin',
    schoolId: 'school-1',
    description: 'School owner with full administrative access',
  },
  {
    id: 'persona-teacher',
    name: 'Teacher',
    type: 'teacher',
    schoolId: 'school-1',
    userId: 'teacher-1',
    description: 'Classroom teacher with assigned classes and students',
  },
  {
    id: 'persona-school-student',
    name: 'School Student',
    type: 'student',
    schoolId: 'school-1',
    userId: 'student-1',
    description: 'School-enrolled student with JoyEdu integration',
  },
  {
    id: 'persona-guardian',
    name: 'Guardian',
    type: 'guardian',
    schoolId: 'school-1',
    userId: 'guardian-1',
    description: 'Parent/guardian with multiple children',
  },
];

// Local state for CRUD operations (frontend prototype only)
let localStudents = [...mockStudents];
let localTeachers = [...mockTeachers];
let localClasses = [...mockClasses];

// Helper functions for prototype data access
export const getSchoolBySlug = (slug: string) => {
  return mockSchools.find(s => s.slug === slug) || mockSchools[0];
};

export const getStudentById = (id: string) => {
  return localStudents.find(s => s.id === id);
};

export const getStudentsByClass = (classId: string) => {
  return localStudents.filter(s => s.classId === classId);
};

export const getGuardiansByStudent = (studentId: string) => {
  const student = localStudents.find(s => s.id === studentId);
  return mockGuardians.filter(g => g.studentIds.includes(studentId));
};

// CRUD operations (frontend prototype with local state)
export const createStudent = (student: any) => {
  const newStudent = {
    ...student,
    id: `student-${Date.now()}`,
    gpa: 0,
    attendanceRate: 100,
    status: 'Active',
  };
  localStudents.push(newStudent);
  return newStudent;
};

export const updateStudent = (id: string, updates: Partial<typeof mockStudents[0]>) => {
  const index = localStudents.findIndex(s => s.id === id);
  if (index !== -1) {
    localStudents[index] = { ...localStudents[index], ...updates };
    return localStudents[index];
  }
  return null;
};

export const deleteStudent = (id: string) => {
  const index = localStudents.findIndex(s => s.id === id);
  if (index !== -1) {
    const deleted = localStudents[index];
    localStudents[index] = { ...localStudents[index], status: 'Archived' };
    return deleted;
  }
  return null;
};

export const archiveStudent = (id: string) => {
  return deleteStudent(id);
};

export const getStudents = () => localStudents;

// Teacher CRUD operations (frontend prototype with local state)
export const getTeacherById = (id: string) => {
  return localTeachers.find(t => t.id === id);
};

export const getTeachersBySubject = (subject: string) => {
  return localTeachers.filter(t => t.subjects.includes(subject));
};

export const getTeachersByDepartment = (department: string) => {
  return localTeachers.filter(t => t.department === department);
};

export const getTeachers = () => localTeachers;

export const createTeacher = (teacher: any) => {
  const newTeacher = {
    ...teacher,
    id: `teacher-${Date.now()}`,
    employeeId: `EMP-${Math.floor(Math.random() * 9000) + 1000}`,
    status: 'Active',
    joinDate: new Date().toISOString().split('T')[0],
  };
  localTeachers.push(newTeacher);
  return newTeacher;
};

export const updateTeacher = (id: string, updates: any) => {
  const index = localTeachers.findIndex(t => t.id === id);
  if (index !== -1) {
    localTeachers[index] = { ...localTeachers[index], ...updates };
    return localTeachers[index];
  }
  return null;
};

export const archiveTeacher = (id: string) => {
  const index = localTeachers.findIndex(t => t.id === id);
  if (index !== -1) {
    const archived = localTeachers[index];
    localTeachers[index] = { ...localTeachers[index], status: 'Archived' };
    return archived;
  }
  return null;
};

// Class CRUD operations (frontend prototype with local state)
export const getClassById = (id: string) => {
  return localClasses.find(c => c.id === id);
};

export const getClassesByGrade = (grade: string) => {
  return localClasses.filter(c => c.grade === grade);
};

export const getClassesByTeacher = (teacherId: string) => {
  return localClasses.filter(c => c.classTeacherId === teacherId);
};

export const getClassesBySubject = (subjectId: string) => {
  return localClasses.filter(c => c.subjectIds.includes(subjectId));
};

export const getClasses = () => localClasses;

export const createClass = (classData: any) => {
  const newClass = {
    ...classData,
    id: `class-${Date.now()}`,
    currentStudents: 0,
    status: 'Active',
    timetable: [],
  };
  localClasses.push(newClass);
  return newClass;
};

export const updateClass = (id: string, updates: any) => {
  const index = localClasses.findIndex(c => c.id === id);
  if (index !== -1) {
    localClasses[index] = { ...localClasses[index], ...updates };
    return localClasses[index];
  }
  return null;
};

export const archiveClass = (id: string) => {
  const index = localClasses.findIndex(c => c.id === id);
  if (index !== -1) {
    const archived = localClasses[index];
    localClasses[index] = { ...localClasses[index], status: 'Archived' };
    return archived;
  }
  return null;
};

// Instructor applications
export const mockInstructorApplications = [
  {
    id: 'app-1',
    userId: 'user-2',
    firstName: 'Sarah',
    lastName: 'Instructor',
    email: 'instructor@joyedu.com',
    phone: '+1 (555) 123-4567',
    expertise: ['Web Development', 'React', 'JavaScript'],
    experience: 5,
    qualifications: 'B.S. Computer Science',
    bio: 'Passionate about teaching web development with 5 years of industry experience.',
    website: 'https://sarahinstructor.com',
    linkedin: 'https://linkedin.com/in/sarahinstructor',
    status: 'APPROVED',
    submittedAt: '2024-01-15',
    reviewedAt: '2024-01-20',
    reviewedBy: 'admin-1',
    feedback: 'Excellent qualifications and teaching experience.' as string | null,
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
    status: 'UNDER_REVIEW',
    submittedAt: '2024-02-10',
    reviewedAt: null as string | null,
    reviewedBy: null as string | null,
    feedback: null as string | null,
  },
  {
    id: 'app-3',
    userId: 'user-8',
    firstName: 'Emily',
    lastName: 'Designer',
    email: 'emily.designer@joyedu.com',
    phone: '+1 (555) 456-7890',
    expertise: ['UI/UX Design', 'Figma', 'Design Systems'],
    experience: 7,
    qualifications: 'B.F.A. Design',
    bio: 'Senior designer with expertise in creating intuitive user experiences.',
    website: 'https://emilydesigner.com',
    linkedin: 'https://linkedin.com/in/emilydesigner',
    status: 'SUBMITTED',
    submittedAt: '2024-03-01',
    reviewedAt: null as string | null,
    reviewedBy: null as string | null,
    feedback: null as string | null,
  },
];

let localInstructorApplications = [...mockInstructorApplications];

export const getInstructorApplications = () => localInstructorApplications;

export const getInstructorApplicationById = (id: string) => {
  return localInstructorApplications.find(app => app.id === id);
};

export const getInstructorApplicationsByStatus = (status: string) => {
  return localInstructorApplications.filter(app => app.status === status);
};

export const createInstructorApplication = (application: any) => {
  const newApplication = {
    ...application,
    id: `app-${Date.now()}`,
    status: 'SUBMITTED',
    submittedAt: new Date().toISOString().split('T')[0],
    reviewedAt: null,
    reviewedBy: null,
    feedback: null,
  };
  localInstructorApplications.push(newApplication);
  return newApplication;
};

export const updateInstructorApplicationStatus = (id: string, status: string, feedback?: string) => {
  const index = localInstructorApplications.findIndex(app => app.id === id);
  if (index !== -1) {
    localInstructorApplications[index] = {
      ...localInstructorApplications[index],
      status,
      feedback: feedback ?? null,
      reviewedAt: new Date().toISOString().split('T')[0],
      reviewedBy: 'admin-1',
    };
    return localInstructorApplications[index];
  }
  return null;
};

// Courses for JoyEdu learning platform
export const mockCourses = [
  {
    id: 'course-1',
    title: 'Complete JavaScript Masterclass',
    description: 'From beginner to advanced JavaScript developer',
    instructor: 'Sarah Johnson',
    instructorId: 'instructor-1',
    category: 'Programming',
    level: 'Beginner',
    duration: '40 hours',
    lessons: 45,
    price: 99.99,
    rating: 4.8,
    students: 45000,
    thumbnail: '📚',
    scope: 'PLATFORM',
    audience: 'PUBLIC',
    status: 'PUBLISHED',
    tags: ['JavaScript', 'Web Development', 'Programming'],
    prerequisites: [],
  },
  {
    id: 'course-2',
    title: 'React.js Complete Guide',
    description: 'Build modern web applications with React',
    instructor: 'Michael Chen',
    instructorId: 'instructor-2',
    category: 'Programming',
    level: 'Intermediate',
    duration: '35 hours',
    lessons: 38,
    price: 129.99,
    rating: 4.9,
    students: 32000,
    thumbnail: '⚛️',
    scope: 'PLATFORM',
    audience: 'PUBLIC',
    status: 'PUBLISHED',
    tags: ['React', 'JavaScript', 'Frontend'],
    prerequisites: ['JavaScript'],
  },
  {
    id: 'course-3',
    title: 'Python for Data Science',
    description: 'Learn Python and data analysis fundamentals',
    instructor: 'Emily Rodriguez',
    instructorId: 'instructor-3',
    category: 'Data Science',
    level: 'Beginner',
    duration: '30 hours',
    lessons: 32,
    price: 89.99,
    rating: 4.7,
    students: 28000,
    thumbnail: '🐍',
    scope: 'PLATFORM',
    audience: 'PUBLIC',
    status: 'PUBLISHED',
    tags: ['Python', 'Data Science', 'Machine Learning'],
    prerequisites: [],
  },
  {
    id: 'course-4',
    title: 'UI/UX Design Fundamentals',
    description: 'Create beautiful and functional user interfaces',
    instructor: 'Lisa Park',
    instructorId: 'instructor-4',
    category: 'Design',
    level: 'Beginner',
    duration: '25 hours',
    lessons: 28,
    price: 79.99,
    rating: 4.6,
    students: 18000,
    thumbnail: '🎨',
    scope: 'PLATFORM',
    audience: 'PUBLIC',
    status: 'PUBLISHED',
    tags: ['UI', 'UX', 'Design', 'Figma'],
    prerequisites: [],
  },
];

let localCourses = [...mockCourses];

export { localCourses };

// Student enrollments
export const mockEnrollments = [
  {
    id: 'enrollment-1',
    userId: 'user-1',
    courseId: 'course-1',
    enrolledAt: '2024-02-01',
    progress: 35,
    completedAt: null,
    certificateId: null,
  },
];

let localEnrollments = [...mockEnrollments];

// Certificates
export const mockCertificates = [
  {
    id: 'cert-1',
    userId: 'user-1',
    courseId: 'course-2',
    issuedAt: '2024-01-15',
    verificationCode: 'JOY-2024-ABC123',
    status: 'ACTIVE',
  },
];

let localCertificates = [...mockCertificates];

// Student progress tracking
export const mockProgress = {
  'user-1': {
    'course-1': {
      completedLessons: ['l1', 'l2', 'l3'],
      currentLesson: 'l4',
      quizScores: { 'quiz-1': 85 },
      totalProgress: 35,
    },
  },
};

export const getCourses = () => localCourses;

export const getCourseById = (id: string) => {
  return localCourses.find(c => c.id === id);
};

export const getEnrollmentsByUser = (userId: string) => {
  return localEnrollments.filter(e => e.userId === userId);
};

export const getEnrollment = (userId: string, courseId: string) => {
  return localEnrollments.find(e => e.userId === userId && e.courseId === courseId);
};

export const enrollInCourse = (userId: string, courseId: string) => {
  const existing = getEnrollment(userId, courseId);
  if (existing) return existing;

  const newEnrollment = {
    id: `enrollment-${Date.now()}`,
    userId,
    courseId,
    enrolledAt: new Date().toISOString().split('T')[0],
    progress: 0,
    completedAt: null,
    certificateId: null,
  };
  localEnrollments.push(newEnrollment);
  return newEnrollment;
};

export const updateEnrollmentProgress = (userId: string, courseId: string, progress: number) => {
  const index = localEnrollments.findIndex(e => e.userId === userId && e.courseId === courseId);
  if (index !== -1) {
    localEnrollments[index].progress = progress;
    if (progress === 100) {
      (localEnrollments[index] as any).completedAt = new Date().toISOString().split('T')[0];
    }
    return localEnrollments[index];
  }
  return null;
};

export const getCertificatesByUser = (userId: string) => {
  return localCertificates.filter(c => c.userId === userId);
};

export const issueCertificate = (userId: string, courseId: string) => {
  const existing = localCertificates.find(c => c.userId === userId && c.courseId === courseId);
  if (existing) return existing;

  const newCertificate = {
    id: `cert-${Date.now()}`,
    userId,
    courseId,
    issuedAt: new Date().toISOString().split('T')[0],
    verificationCode: `JOY-${Date.now().toString(36).toUpperCase()}`,
    status: 'ACTIVE',
  };
  localCertificates.push(newCertificate);
  
  // Update enrollment with certificate ID
  const enrollmentIndex = localEnrollments.findIndex(e => e.userId === userId && e.courseId === courseId);
  if (enrollmentIndex !== -1) {
    (localEnrollments[enrollmentIndex] as any).certificateId = newCertificate.id;
  }
  
  return newCertificate;
};

export const verifyCertificate = (verificationCode: string) => {
  return localCertificates.find(c => c.verificationCode === verificationCode);
};

// Gamification - XP, Achievements, Streaks
export const mockAchievements = [
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
  {
    id: 'ach-5',
    title: 'Code Explorer',
    description: 'Use the playground 10 times',
    icon: '💻',
    xpReward: 150,
    requirement: { type: 'playground_uses', value: 10 },
  },
  {
    id: 'ach-6',
    title: 'Knowledge Seeker',
    description: 'Enroll in 5 courses',
    icon: '📚',
    xpReward: 300,
    requirement: { type: 'courses_enrolled', value: 5 },
  },
];

export const mockUserGamification: Record<string, any> = {
  'user-1': {
    xp: 1250,
    level: 5,
    streak: 12,
    lastActiveDate: new Date().toISOString().split('T')[0],
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

let localUserGamification = { ...mockUserGamification };

export const getUserGamification = (userId: string) => {
  return localUserGamification[userId] || {
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: null,
    achievements: [],
    stats: {
      lessonsCompleted: 0,
      quizzesCompleted: 0,
      coursesCompleted: 0,
      coursesEnrolled: 0,
      playgroundUses: 0,
    },
  };
};

export const addXP = (userId: string, amount: number) => {
  if (!localUserGamification[userId]) {
    localUserGamification[userId] = {
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      achievements: [],
      stats: {
        lessonsCompleted: 0,
        quizzesCompleted: 0,
        coursesCompleted: 0,
        coursesEnrolled: 0,
        playgroundUses: 0,
      },
    };
  }

  localUserGamification[userId].xp += amount;
  
  // Calculate level (every 1000 XP = 1 level)
  const newLevel = Math.floor(localUserGamification[userId].xp / 1000) + 1;
  localUserGamification[userId].level = newLevel;
  
  return localUserGamification[userId];
};

export const updateStreak = (userId: string) => {
  if (!localUserGamification[userId]) {
    localUserGamification[userId] = {
      xp: 0,
      level: 1,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      achievements: [],
      stats: {
        lessonsCompleted: 0,
        quizzesCompleted: 0,
        coursesCompleted: 0,
        coursesEnrolled: 0,
        playgroundUses: 0,
      },
    };
    return localUserGamification[userId];
  }

  const today = new Date().toISOString().split('T')[0];
  const lastActive = localUserGamification[userId].lastActiveDate;
  
  if (lastActive === today) {
    // Already active today, no change
    return localUserGamification[userId];
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (lastActive === yesterdayStr) {
    // Consecutive day, increment streak
    localUserGamification[userId].streak += 1;
  } else if (lastActive !== today) {
    // Streak broken, reset to 1
    localUserGamification[userId].streak = 1;
  }
  
  localUserGamification[userId].lastActiveDate = today;
  
  return localUserGamification[userId];
};

export const checkAchievements = (userId: string) => {
  const userGamification = getUserGamification(userId);
  const newAchievements: string[] = [];
  
  mockAchievements.forEach(achievement => {
    if (userGamification.achievements.includes(achievement.id)) return;
    
    const { type, value } = achievement.requirement;
    const statValue = userGamification.stats[type as keyof typeof userGamification.stats] as number || 0;
    
    if (statValue >= value) {
      newAchievements.push(achievement.id);
      userGamification.achievements.push(achievement.id);
      addXP(userId, achievement.xpReward);
    }
  });
  
  return newAchievements;
};

export const updateStat = (userId: string, stat: string, value: number) => {
  if (!localUserGamification[userId]) {
    localUserGamification[userId] = {
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      achievements: [],
      stats: {
        lessonsCompleted: 0,
        quizzesCompleted: 0,
        coursesCompleted: 0,
        coursesEnrolled: 0,
        playgroundUses: 0,
      },
    };
  }
  
  localUserGamification[userId].stats[stat] += value;
  
  // Update streak when user is active
  updateStreak(userId);
  
  // Check for new achievements
  const newAchievements = checkAchievements(userId);
  
  return { gamification: localUserGamification[userId], newAchievements };
};

export const getAchievements = () => mockAchievements;

