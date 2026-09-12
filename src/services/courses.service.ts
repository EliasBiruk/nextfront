/**
 * Courses Service
 * 
 * Handles all course-related operations including listing, creating, updating,
 * and deleting courses.
 * 
 * Uses mock data for prototype validation.
 */

import { BaseService } from './base.service';
import {
  GetCoursesRequest,
  GetCourseByIdRequest,
  CreateCourseRequest,
  UpdateCourseRequest,
  DeleteCourseRequest,
  SubmitCourseForReviewRequest,
} from '@/types/apiRequests';
import {
  GetCoursesResponse,
  GetCourseByIdResponse,
  CreateCourseResponse,
  UpdateCourseResponse,
  DeleteCourseResponse,
  SubmitCourseForReviewResponse,
} from '@/types/apiResponses';
import { mockCourses } from '@/data/mockEntities';
import { CourseStatus, CourseScope, CourseAudience } from '@/types';

export class CoursesService extends BaseService {
  async getCourses(request: GetCoursesRequest): Promise<GetCoursesResponse> {
    const response = await this.simulateApiCall(() => {
      let filteredCourses = [...mockCourses];

      // Filter by instructorId if provided
      if (request.instructorId) {
        filteredCourses = filteredCourses.filter(c => c.instructorId === request.instructorId);
      }

      // Apply filters
      if (request.filters?.category) {
        filteredCourses = filteredCourses.filter(c => c.category === request.filters?.category);
      }
      if (request.filters?.level) {
        filteredCourses = filteredCourses.filter(c => c.level === request.filters?.level);
      }
      if (request.filters?.price === 'free') {
        filteredCourses = filteredCourses.filter(c => c.price === 0);
      }
      if (request.filters?.price === 'paid') {
        filteredCourses = filteredCourses.filter(c => c.price > 0);
      }
      if (request.filters?.rating) {
        filteredCourses = filteredCourses.filter(c => c.rating >= (request.filters?.rating || 0));
      }
      if (request.filters?.search) {
        const search = request.filters.search.toLowerCase();
        filteredCourses = filteredCourses.filter(c =>
          c.title.toLowerCase().includes(search) ||
          c.description.toLowerCase().includes(search) ||
          c.instructor.toLowerCase().includes(search)
        );
      }

      // Apply sorting
      if (request.filters?.sortBy === 'popular') {
        filteredCourses.sort((a, b) => b.students - a.students);
      } else if (request.filters?.sortBy === 'newest') {
        filteredCourses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (request.filters?.sortBy === 'rating') {
        filteredCourses.sort((a, b) => b.rating - a.rating);
      } else if (request.filters?.sortBy === 'price-low') {
        filteredCourses.sort((a, b) => a.price - b.price);
      } else if (request.filters?.sortBy === 'price-high') {
        filteredCourses.sort((a, b) => b.price - a.price);
      }

      // Apply pagination
      const page = request.pagination?.page || 1;
      const pageSize = request.pagination?.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const paginatedCourses = filteredCourses.slice(startIndex, startIndex + pageSize);

      return {
        data: paginatedCourses,
        total: filteredCourses.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredCourses.length / pageSize),
        filters: request.filters,
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to get courses');
  }

  async getCourseById(request: GetCourseByIdRequest): Promise<GetCourseByIdResponse> {
    const response = await this.simulateApiCall(() => {
      const course = mockCourses.find(c => c.id === request.courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      return course;
    });

    if (response.success && response.data) {
      return { course: response.data };
    }
    throw new Error(response.error?.message || 'Failed to get course');
  }

  async createCourse(request: CreateCourseRequest): Promise<CreateCourseResponse> {
    const response = await this.simulateApiCall(() => {
      const newCourse = {
        id: `course-${Date.now()}`,
        ...request,
        instructor: 'Current User',
        instructorId: request.instructorId || 'user-1',
        rating: 0,
        students: 0,
        lessons: 0,
        thumbnail: request.thumbnail || '',
        scope: request.scope === 'PLATFORM' ? CourseScope.PLATFORM : CourseScope.SCHOOL,
        audience: request.audience === 'PUBLIC' ? CourseAudience.PUBLIC : 
                  request.audience === 'SCHOOL_ONLY' ? CourseAudience.SCHOOL_ONLY : 
                  CourseAudience.PRIVATE,
        status: CourseStatus.DRAFT,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockCourses.push(newCourse as any);
      return newCourse;
    });

    if (response.success && response.data) {
      return { course: response.data };
    }
    throw new Error(response.error?.message || 'Failed to create course');
  }

  async updateCourse(request: UpdateCourseRequest): Promise<UpdateCourseResponse> {
    const response = await this.simulateApiCall(() => {
      const courseIndex = mockCourses.findIndex(c => c.id === request.courseId);
      if (courseIndex === -1) {
        throw new Error('Course not found');
      }
      const updatedCourse = {
        ...mockCourses[courseIndex],
        ...request,
        status: request.status ? 
                  (request.status === 'DRAFT' ? CourseStatus.DRAFT :
                   request.status === 'UNDER_REVIEW' ? CourseStatus.UNDER_REVIEW :
                   request.status === 'PUBLISHED' ? CourseStatus.PUBLISHED :
                   request.status === 'REJECTED' ? CourseStatus.REJECTED :
                   CourseStatus.ARCHIVED) :
                  mockCourses[courseIndex].status,
        updatedAt: new Date().toISOString(),
      };
      mockCourses[courseIndex] = updatedCourse as any;
      return updatedCourse;
    });

    if (response.success && response.data) {
      return { course: response.data };
    }
    throw new Error(response.error?.message || 'Failed to update course');
  }

  async deleteCourse(request: DeleteCourseRequest): Promise<DeleteCourseResponse> {
    const response = await this.simulateApiCall(() => {
      const courseIndex = mockCourses.findIndex(c => c.id === request.courseId);
      if (courseIndex === -1) {
        throw new Error('Course not found');
      }
      mockCourses.splice(courseIndex, 1);
      return { success: true };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to delete course');
  }

  async submitCourseForReview(request: SubmitCourseForReviewRequest): Promise<SubmitCourseForReviewResponse> {
    const response = await this.simulateApiCall(() => {
      const courseIndex = mockCourses.findIndex(c => c.id === request.courseId);
      if (courseIndex === -1) {
        throw new Error('Course not found');
      }
      const updatedCourse = {
        ...mockCourses[courseIndex],
        status: CourseStatus.UNDER_REVIEW,
        updatedAt: new Date().toISOString(),
      };
      mockCourses[courseIndex] = updatedCourse as any;
      return updatedCourse;
    });

    if (response.success && response.data) {
      return { course: response.data };
    }
    throw new Error(response.error?.message || 'Failed to submit course for review');
  }
}
