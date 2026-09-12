/**
 * Admin Service
 * 
 * Handles all administrator-related operations including managing instructor applications,
 * schools, platform statistics, and system settings.
 * 
 * Uses mock data for prototype validation.
 */

import { BaseService } from './base.service';
import { mockInstructorApplications, mockSchools } from '@/data/mockEntities';
import { ApplicationStatus } from '@/types';

export class AdminService extends BaseService {
  async getAdminStats() {
    return this.simulateApiCall(() => {
      const pendingApplications = mockInstructorApplications.filter(
        a => a.status === ApplicationStatus.SUBMITTED
      ).length;
      const activeSchools = mockSchools.filter(s => s.status === 'active').length;
      
      return {
        totalUsers: 125000,
        activeCourses: 8500,
        partnerSchools: 450,
        monthlyRevenue: '$2.4M',
        pendingApplications,
        activeSchools,
        systemHealth: {
          api: 'operational',
          database: 'operational',
          cache: 'operational',
          storage: 'operational',
        },
        userDistribution: {
          students: 95000,
          instructors: 25000,
          schools: 450,
          admins: 50,
        },
      };
    });
  }

  async getPendingApplications() {
    return this.simulateApiCall(() => {
      const pendingApplications = mockInstructorApplications.filter(
        a => a.status === ApplicationStatus.SUBMITTED
      );

      return {
        data: pendingApplications,
        total: pendingApplications.length,
      };
    });
  }

  async approveApplication(applicationId: string) {
    return this.simulateApiCall(() => {
      const applicationIndex = mockInstructorApplications.findIndex(
        a => a.id === applicationId
      );
      if (applicationIndex === -1) {
        throw new Error('Application not found');
      }
      mockInstructorApplications[applicationIndex] = {
        ...mockInstructorApplications[applicationIndex],
        status: ApplicationStatus.APPROVED,
        reviewedAt: new Date().toISOString(),
      };
      return mockInstructorApplications[applicationIndex];
    });
  }

  async rejectApplication(applicationId: string) {
    return this.simulateApiCall(() => {
      const applicationIndex = mockInstructorApplications.findIndex(
        a => a.id === applicationId
      );
      if (applicationIndex === -1) {
        throw new Error('Application not found');
      }
      mockInstructorApplications[applicationIndex] = {
        ...mockInstructorApplications[applicationIndex],
        status: ApplicationStatus.REJECTED,
        reviewedAt: new Date().toISOString(),
      };
      return mockInstructorApplications[applicationIndex];
    });
  }

  async getSchoolsForApproval() {
    return this.simulateApiCall(() => {
      const pendingSchools = mockSchools.filter(s => s.status === 'pending');

      return {
        data: pendingSchools,
        total: pendingSchools.length,
      };
    });
  }

  async approveSchool(schoolId: string) {
    return this.simulateApiCall(() => {
      const schoolIndex = mockSchools.findIndex(s => s.id === schoolId);
      if (schoolIndex === -1) {
        throw new Error('School not found');
      }
      mockSchools[schoolIndex] = {
        ...mockSchools[schoolIndex],
        status: 'active' as const,
      };
      return mockSchools[schoolIndex];
    });
  }

  async rejectSchool(schoolId: string) {
    return this.simulateApiCall(() => {
      const schoolIndex = mockSchools.findIndex(s => s.id === schoolId);
      if (schoolIndex === -1) {
        throw new Error('School not found');
      }
      mockSchools[schoolIndex] = {
        ...mockSchools[schoolIndex],
        status: 'suspended' as const,
      };
      return mockSchools[schoolIndex];
    });
  }
}
