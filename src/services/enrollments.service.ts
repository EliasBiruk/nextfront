/**
 * Enrollments Service
 * 
 * Handles all enrollment-related operations including enrolling in courses,
 * getting enrollments, updating progress, and canceling enrollments.
 * 
 * Uses mock data for prototype validation.
 */

import { BaseService } from './base.service';
import {
  EnrollInCourseRequest,
  GetEnrollmentsRequest,
  UpdateEnrollmentProgressRequest,
  CancelEnrollmentRequest,
} from '@/types/apiRequests';
import {
  EnrollInCourseResponse,
  GetEnrollmentsResponse,
  UpdateEnrollmentProgressResponse,
  CancelEnrollmentResponse,
} from '@/types/apiResponses';
import { mockEnrollments } from '@/data/mockEntities';
import { EnrollmentStatus } from '@/types';

export class EnrollmentsService extends BaseService {
  async enrollInCourse(request: EnrollInCourseRequest): Promise<EnrollInCourseResponse> {
    return this.simulateApiCall(() => {
      // Check if already enrolled
      const existingEnrollment = mockEnrollments.find(
        e => e.userId === 'user-1' && e.courseId === request.courseId
      );
      if (existingEnrollment) {
        throw new Error('Already enrolled in this course');
      }

      const newEnrollment = {
        id: `enrollment-${Date.now()}`,
        userId: 'user-1',
        courseId: request.courseId,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        status: EnrollmentStatus.ACTIVE,
        lastAccessedAt: new Date().toISOString(),
      };
      mockEnrollments.push(newEnrollment);
      return newEnrollment;
    });
  }

  async getEnrollments(request: GetEnrollmentsRequest): Promise<GetEnrollmentsResponse> {
    const response = await this.simulateApiCall(() => {
      let filteredEnrollments = [...mockEnrollments];

      if (request.userId) {
        filteredEnrollments = filteredEnrollments.filter(e => e.userId === request.userId);
      }
      if (request.courseId) {
        filteredEnrollments = filteredEnrollments.filter(e => e.courseId === request.courseId);
      }
      if (request.status) {
        filteredEnrollments = filteredEnrollments.filter(e => e.status === request.status);
      }

      // Apply pagination
      const page = request.pagination?.page || 1;
      const pageSize = request.pagination?.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const paginatedEnrollments = filteredEnrollments.slice(startIndex, startIndex + pageSize);

      return {
        data: paginatedEnrollments,
        total: filteredEnrollments.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredEnrollments.length / pageSize),
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to get enrollments');
  }

  async updateEnrollmentProgress(request: UpdateEnrollmentProgressRequest): Promise<UpdateEnrollmentProgressResponse> {
    return this.simulateApiCall(() => {
      const enrollmentIndex = mockEnrollments.findIndex(e => e.id === request.enrollmentId);
      if (enrollmentIndex === -1) {
        throw new Error('Enrollment not found');
      }
      mockEnrollments[enrollmentIndex] = {
        ...mockEnrollments[enrollmentIndex],
        progress: request.progress,
        lastAccessedAt: new Date().toISOString(),
      };
      return mockEnrollments[enrollmentIndex];
    });
  }

  async cancelEnrollment(request: CancelEnrollmentRequest): Promise<CancelEnrollmentResponse> {
    return this.simulateApiCall(() => {
      const enrollmentIndex = mockEnrollments.findIndex(e => e.id === request.enrollmentId);
      if (enrollmentIndex === -1) {
        throw new Error('Enrollment not found');
      }
      mockEnrollments[enrollmentIndex] = {
        ...mockEnrollments[enrollmentIndex],
        status: EnrollmentStatus.DROPPED,
      };
      return { success: true };
    });
  }
}
