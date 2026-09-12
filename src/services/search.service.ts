/**
 * Search Service
 * 
 * Handles all search-related operations including searching for courses,
 * instructors, schools, and other platform content.
 * 
 * Uses mock data for prototype validation.
 */

import { BaseService } from './base.service';
import { mockCourses, mockSchools, mockInstructorApplications } from '@/data/mockEntities';

export class SearchService extends BaseService {
  async search(query: string, type?: string) {
    return this.simulateApiCall(() => {
      const searchQuery = query.toLowerCase();
      const results: any = {
        courses: [],
        schools: [],
        instructors: [],
      };

      // Search courses
      if (!type || type === 'courses') {
        results.courses = mockCourses.filter(c =>
          c.title.toLowerCase().includes(searchQuery) ||
          c.description.toLowerCase().includes(searchQuery) ||
          c.category.toLowerCase().includes(searchQuery) ||
          c.instructor.toLowerCase().includes(searchQuery)
        );
      }

      // Search schools
      if (!type || type === 'schools') {
        results.schools = mockSchools.filter(s =>
          s.name.toLowerCase().includes(searchQuery) ||
          s.description.toLowerCase().includes(searchQuery) ||
          s.location.toLowerCase().includes(searchQuery)
        );
      }

      // Search instructors
      if (!type || type === 'instructors') {
        results.instructors = mockInstructorApplications.filter(i =>
          i.firstName.toLowerCase().includes(searchQuery) ||
          i.lastName.toLowerCase().includes(searchQuery) ||
          i.expertise.some(e => e.toLowerCase().includes(searchQuery))
        );
      }

      return results;
    });
  }

  async searchCourses(query: string, filters?: any) {
    return this.simulateApiCall(() => {
      const searchQuery = query.toLowerCase();
      let results = mockCourses.filter(c =>
        c.title.toLowerCase().includes(searchQuery) ||
        c.description.toLowerCase().includes(searchQuery) ||
        c.category.toLowerCase().includes(searchQuery) ||
        c.instructor.toLowerCase().includes(searchQuery)
      );

      if (filters?.category) {
        results = results.filter(c => c.category === filters.category);
      }
      if (filters?.level) {
        results = results.filter(c => c.level === filters.level);
      }
      if (filters?.price === 'free') {
        results = results.filter(c => c.price === 0);
      }
      if (filters?.price === 'paid') {
        results = results.filter(c => c.price > 0);
      }

      return {
        data: results,
        total: results.length,
      };
    });
  }

  async searchSchools(query: string, filters?: any) {
    return this.simulateApiCall(() => {
      const searchQuery = query.toLowerCase();
      let results = mockSchools.filter(s =>
        s.name.toLowerCase().includes(searchQuery) ||
        s.description.toLowerCase().includes(searchQuery) ||
        s.location.toLowerCase().includes(searchQuery)
      );

      if (filters?.type) {
        results = results.filter(s => s.type === filters.type);
      }
      if (filters?.country) {
        results = results.filter(s => s.country === filters.country);
      }

      return {
        data: results,
        total: results.length,
      };
    });
  }

  async searchInstructors(query: string, filters?: any) {
    return this.simulateApiCall(() => {
      const searchQuery = query.toLowerCase();
      let results = mockInstructorApplications.filter(i =>
        i.firstName.toLowerCase().includes(searchQuery) ||
        i.lastName.toLowerCase().includes(searchQuery) ||
        i.expertise.some(e => e.toLowerCase().includes(searchQuery))
      );

      if (filters?.expertise) {
        results = results.filter(i => i.expertise.includes(filters.expertise));
      }

      return {
        data: results,
        total: results.length,
      };
    });
  }
}
