/**
 * Schools Service
 * 
 * Handles all school-related operations including school management,
 * students, teachers, classes, subjects, attendance, grades, fees,
 * timetable, and announcements.
 * 
 * Uses mock data for prototype validation.
 */

import { BaseService } from './base.service';
import {
  GetSchoolRequest,
  CreateSchoolRequest,
  UpdateSchoolRequest,
  GetSchoolStudentsRequest,
  CreateSchoolStudentRequest,
  UpdateSchoolStudentRequest,
  GetSchoolTeachersRequest,
  CreateSchoolTeacherRequest,
  UpdateSchoolTeacherRequest,
  GetSchoolClassesRequest,
  CreateSchoolClassRequest,
  UpdateSchoolClassRequest,
  GetSchoolSubjectsRequest,
  CreateSchoolSubjectRequest,
  UpdateSchoolSubjectRequest,
} from '@/types/apiRequests';
import {
  GetSchoolResponse,
  CreateSchoolResponse,
  UpdateSchoolResponse,
  GetSchoolStudentsResponse,
  CreateSchoolStudentResponse,
  UpdateSchoolStudentResponse,
  GetSchoolTeachersResponse,
  CreateSchoolTeacherResponse,
  UpdateSchoolTeacherResponse,
  GetSchoolClassesResponse,
  CreateSchoolClassResponse,
  UpdateSchoolClassResponse,
  GetSchoolSubjectsResponse,
  CreateSchoolSubjectResponse,
  UpdateSchoolSubjectResponse,
} from '@/types/apiResponses';
import {
  mockSchools,
  mockSchoolStudents,
  mockSchoolTeachers,
  mockSchoolClasses,
  mockSchoolSubjects,
} from '@/data/mockEntities';

export class SchoolsService extends BaseService {
  async getSchool(request: GetSchoolRequest): Promise<GetSchoolResponse> {
    return this.simulateApiCall(() => {
      const school = mockSchools.find(s => 
        s.id === request.schoolId || s.slug === request.schoolSlug
      );
      if (!school) {
        throw new Error('School not found');
      }
      return school;
    });
  }

  async createSchool(request: CreateSchoolRequest): Promise<CreateSchoolResponse> {
    return this.simulateApiCall(() => {
      const newSchool = {
        id: `school-${Date.now()}`,
        ...request,
        currentEnrollment: 0,
        status: 'active' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockSchools.push(newSchool as any);
      return newSchool;
    });
  }

  async updateSchool(request: UpdateSchoolRequest): Promise<UpdateSchoolResponse> {
    return this.simulateApiCall(() => {
      const schoolIndex = mockSchools.findIndex(s => s.id === request.schoolId);
      if (schoolIndex === -1) {
        throw new Error('School not found');
      }
      mockSchools[schoolIndex] = {
        ...mockSchools[schoolIndex],
        ...request,
      };
      return mockSchools[schoolIndex];
    });
  }

  async getSchoolStudents(request: GetSchoolStudentsRequest): Promise<GetSchoolStudentsResponse> {
    const response = await this.simulateApiCall(() => {
      let filteredStudents = [...mockSchoolStudents];

      if (request.schoolId) {
        filteredStudents = filteredStudents.filter(s => s.schoolId === request.schoolId);
      }
      if (request.grade) {
        filteredStudents = filteredStudents.filter(s => s.grade === request.grade);
      }
      if (request.section) {
        filteredStudents = filteredStudents.filter(s => s.section === request.section);
      }
      if (request.status) {
        filteredStudents = filteredStudents.filter(s => s.status === request.status);
      }
      if (request.search) {
        const search = request.search.toLowerCase();
        filteredStudents = filteredStudents.filter(s =>
          s.firstName.toLowerCase().includes(search) ||
          s.lastName.toLowerCase().includes(search)
        );
      }

      const page = request.pagination?.page || 1;
      const pageSize = request.pagination?.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const paginatedStudents = filteredStudents.slice(startIndex, startIndex + pageSize);

      return {
        data: paginatedStudents,
        total: filteredStudents.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredStudents.length / pageSize),
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to get school students');
  }

  async createSchoolStudent(request: CreateSchoolStudentRequest): Promise<CreateSchoolStudentResponse> {
    return this.simulateApiCall(() => {
      const newStudent = {
        id: `student-${Date.now()}`,
        studentId: `STU-${Date.now()}`,
        fullName: `${request.firstName} ${request.lastName}`,
        status: 'active' as const,
        ...request,
        createdAt: new Date().toISOString(),
      };
      mockSchoolStudents.push(newStudent as any);
      return newStudent;
    });
  }

  async updateSchoolStudent(request: UpdateSchoolStudentRequest): Promise<UpdateSchoolStudentResponse> {
    return this.simulateApiCall(() => {
      const studentIndex = mockSchoolStudents.findIndex(s => s.id === request.studentId);
      if (studentIndex === -1) {
        throw new Error('Student not found');
      }
      mockSchoolStudents[studentIndex] = {
        ...mockSchoolStudents[studentIndex],
        ...request,
      };
      return mockSchoolStudents[studentIndex];
    });
  }

  async getSchoolTeachers(request: GetSchoolTeachersRequest): Promise<GetSchoolTeachersResponse> {
    const response = await this.simulateApiCall(() => {
      let filteredTeachers = [...mockSchoolTeachers];

      if (request.schoolId) {
        filteredTeachers = filteredTeachers.filter(t => t.schoolId === request.schoolId);
      }
      if (request.department) {
        filteredTeachers = filteredTeachers.filter(t => t.department === request.department);
      }
      if (request.status) {
        filteredTeachers = filteredTeachers.filter(t => t.status === request.status);
      }
      if (request.search) {
        const search = request.search.toLowerCase();
        filteredTeachers = filteredTeachers.filter(t =>
          t.firstName.toLowerCase().includes(search) ||
          t.lastName.toLowerCase().includes(search)
        );
      }

      const page = request.pagination?.page || 1;
      const pageSize = request.pagination?.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const paginatedTeachers = filteredTeachers.slice(startIndex, startIndex + pageSize);

      return {
        data: paginatedTeachers,
        total: filteredTeachers.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredTeachers.length / pageSize),
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to get school teachers');
  }

  async createSchoolTeacher(request: CreateSchoolTeacherRequest): Promise<CreateSchoolTeacherResponse> {
    return this.simulateApiCall(() => {
      const newTeacher = {
        id: `teacher-${Date.now()}`,
        teacherId: `TCH-${Date.now()}`,
        fullName: `${request.firstName} ${request.lastName}`,
        status: 'active' as const,
        ...request,
        createdAt: new Date().toISOString(),
      };
      mockSchoolTeachers.push(newTeacher as any);
      return newTeacher;
    });
  }

  async updateSchoolTeacher(request: UpdateSchoolTeacherRequest): Promise<UpdateSchoolTeacherResponse> {
    return this.simulateApiCall(() => {
      const teacherIndex = mockSchoolTeachers.findIndex(t => t.id === request.teacherId);
      if (teacherIndex === -1) {
        throw new Error('Teacher not found');
      }
      mockSchoolTeachers[teacherIndex] = {
        ...mockSchoolTeachers[teacherIndex],
        ...request,
      };
      return mockSchoolTeachers[teacherIndex];
    });
  }

  async getSchoolClasses(request: GetSchoolClassesRequest): Promise<GetSchoolClassesResponse> {
    const response = await this.simulateApiCall(() => {
      let filteredClasses = [...mockSchoolClasses];

      if (request.schoolId) {
        filteredClasses = filteredClasses.filter(c => c.schoolId === request.schoolId);
      }
      if (request.grade) {
        filteredClasses = filteredClasses.filter(c => c.grade === request.grade);
      }
      if (request.section) {
        filteredClasses = filteredClasses.filter(c => c.section === request.section);
      }
      if (request.status) {
        filteredClasses = filteredClasses.filter(c => c.status === request.status);
      }

      const page = request.pagination?.page || 1;
      const pageSize = request.pagination?.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const paginatedClasses = filteredClasses.slice(startIndex, startIndex + pageSize);

      return {
        data: paginatedClasses,
        total: filteredClasses.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredClasses.length / pageSize),
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to get school classes');
  }

  async createSchoolClass(request: CreateSchoolClassRequest): Promise<CreateSchoolClassResponse> {
    return this.simulateApiCall(() => {
      const newClass = {
        id: `class-${Date.now()}`,
        currentEnrollment: 0,
        status: 'active' as const,
        ...request,
        createdAt: new Date().toISOString(),
      };
      mockSchoolClasses.push(newClass as any);
      return newClass;
    });
  }

  async updateSchoolClass(request: UpdateSchoolClassRequest): Promise<UpdateSchoolClassResponse> {
    return this.simulateApiCall(() => {
      const classIndex = mockSchoolClasses.findIndex(c => c.id === request.classId);
      if (classIndex === -1) {
        throw new Error('Class not found');
      }
      mockSchoolClasses[classIndex] = {
        ...mockSchoolClasses[classIndex],
        ...request,
      };
      return mockSchoolClasses[classIndex];
    });
  }

  async getSchoolSubjects(request: GetSchoolSubjectsRequest): Promise<GetSchoolSubjectsResponse> {
    const response = await this.simulateApiCall(() => {
      let filteredSubjects = [...mockSchoolSubjects];

      if (request.schoolId) {
        filteredSubjects = filteredSubjects.filter(s => s.schoolId === request.schoolId);
      }
      if (request.grade) {
        filteredSubjects = filteredSubjects.filter(s => s.grade === request.grade);
      }

      const page = request.pagination?.page || 1;
      const pageSize = request.pagination?.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const paginatedSubjects = filteredSubjects.slice(startIndex, startIndex + pageSize);

      return {
        data: paginatedSubjects,
        total: filteredSubjects.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredSubjects.length / pageSize),
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to get school subjects');
  }

  async createSchoolSubject(request: CreateSchoolSubjectRequest): Promise<CreateSchoolSubjectResponse> {
    return this.simulateApiCall(() => {
      const newSubject = {
        id: `subject-${Date.now()}`,
        ...request,
        createdAt: new Date().toISOString(),
      };
      mockSchoolSubjects.push(newSubject as any);
      return newSubject;
    });
  }

  async updateSchoolSubject(request: UpdateSchoolSubjectRequest): Promise<UpdateSchoolSubjectResponse> {
    return this.simulateApiCall(() => {
      const subjectIndex = mockSchoolSubjects.findIndex(s => s.id === request.subjectId);
      if (subjectIndex === -1) {
        throw new Error('Subject not found');
      }
      mockSchoolSubjects[subjectIndex] = {
        ...mockSchoolSubjects[subjectIndex],
        ...request,
      };
      return mockSchoolSubjects[subjectIndex];
    });
  }
}
