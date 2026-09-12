/**
 * Instructors Service
 * 
 * Handles all instructor-related operations including creating instructor applications,
 * getting applications, updating application status, and managing instructor profiles.
 * 
 * Uses mock data for prototype validation.
 */

import { BaseService } from './base.service';
import {
  CreateInstructorApplicationRequest,
  GetInstructorApplicationsRequest,
  UpdateInstructorApplicationStatusRequest,
} from '@/types/apiRequests';
import {
  CreateInstructorApplicationResponse,
  GetInstructorApplicationsResponse,
  UpdateInstructorApplicationStatusResponse,
} from '@/types/apiResponses';
import { mockInstructorApplications } from '@/data/mockEntities';
import { ApplicationStatus } from '@/types';

export class InstructorsService extends BaseService {
  async createInstructorApplication(request: CreateInstructorApplicationRequest): Promise<CreateInstructorApplicationResponse> {
    return this.simulateApiCall(() => {
      const newApplication = {
        id: `application-${Date.now()}`,
        ...request,
        status: ApplicationStatus.SUBMITTED,
        submittedAt: new Date().toISOString(),
        reviewedAt: undefined,
      };
      mockInstructorApplications.push(newApplication as any);
      return newApplication;
    });
  }

  async getInstructorApplications(request: GetInstructorApplicationsRequest): Promise<GetInstructorApplicationsResponse> {
    const response = await this.simulateApiCall(() => {
      let filteredApplications = [...mockInstructorApplications];

      if (request.status) {
        filteredApplications = filteredApplications.filter(a => a.status === request.status);
      }
      if (request.userId) {
        filteredApplications = filteredApplications.filter(a => a.userId === request.userId);
      }

      const page = request.pagination?.page || 1;
      const pageSize = request.pagination?.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const paginatedApplications = filteredApplications.slice(startIndex, startIndex + pageSize);

      return {
        data: paginatedApplications,
        total: filteredApplications.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredApplications.length / pageSize),
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to get instructor applications');
  }

  async updateInstructorApplicationStatus(request: UpdateInstructorApplicationStatusRequest): Promise<UpdateInstructorApplicationStatusResponse> {
    return this.simulateApiCall(() => {
      const applicationIndex = mockInstructorApplications.findIndex(a => a.id === request.applicationId);
      if (applicationIndex === -1) {
        throw new Error('Application not found');
      }
      mockInstructorApplications[applicationIndex] = {
        ...mockInstructorApplications[applicationIndex],
        status: request.status as ApplicationStatus,
        reviewedAt: new Date().toISOString(),
      };
      return mockInstructorApplications[applicationIndex];
    });
  }
}
