/**
 * JoyEdu Service Layer
 *
 * This directory contains the frontend service layer that handles all API interactions.
 * Each service is responsible for a specific domain and provides typed methods for
 * interacting with the backend.
 *
 * Services use mock data for prototype validation and are structured to easily
 * swap in real API calls when the backend is implemented.
 */

// Import service classes
import { AuthService } from './auth.service';
import { CoursesService } from './courses.service';
import { EnrollmentsService } from './enrollments.service';
import { ProgressService } from './progress.service';
import { QuizzesService } from './quizzes.service';
import { InstructorsService } from './instructors.service';
import { SchoolsService } from './schools.service';
import { NotificationsService } from './notifications.service';
import { AdminService } from './admin.service';
import { SearchService } from './search.service';
import { AnalyticsService } from './analytics.service';

// Export all services for direct import
export { AuthService } from './auth.service';
export { CoursesService } from './courses.service';
export { EnrollmentsService } from './enrollments.service';
export { ProgressService } from './progress.service';
export { QuizzesService } from './quizzes.service';
export { InstructorsService } from './instructors.service';
export { SchoolsService } from './schools.service';
export { NotificationsService } from './notifications.service';
export { AdminService } from './admin.service';
export { SearchService } from './search.service';
export { AnalyticsService } from './analytics.service';

// Export service instances (singleton pattern with lazy initialization)
let authServiceInstance: AuthService | null = null;
let coursesServiceInstance: CoursesService | null = null;
let enrollmentsServiceInstance: EnrollmentsService | null = null;
let progressServiceInstance: ProgressService | null = null;
let quizzesServiceInstance: QuizzesService | null = null;
let instructorsServiceInstance: InstructorsService | null = null;
let schoolsServiceInstance: SchoolsService | null = null;
let notificationsServiceInstance: NotificationsService | null = null;
let adminServiceInstance: AdminService | null = null;
let searchServiceInstance: SearchService | null = null;
let analyticsServiceInstance: AnalyticsService | null = null;

export const authService = (): AuthService => {
  if (!authServiceInstance) authServiceInstance = new AuthService();
  return authServiceInstance;
};

export const coursesService = (): CoursesService => {
  if (!coursesServiceInstance) coursesServiceInstance = new CoursesService();
  return coursesServiceInstance;
};

export const enrollmentsService = (): EnrollmentsService => {
  if (!enrollmentsServiceInstance) enrollmentsServiceInstance = new EnrollmentsService();
  return enrollmentsServiceInstance;
};

export const progressService = (): ProgressService => {
  if (!progressServiceInstance) progressServiceInstance = new ProgressService();
  return progressServiceInstance;
};

export const quizzesService = (): QuizzesService => {
  if (!quizzesServiceInstance) quizzesServiceInstance = new QuizzesService();
  return quizzesServiceInstance;
};

export const instructorsService = (): InstructorsService => {
  if (!instructorsServiceInstance) instructorsServiceInstance = new InstructorsService();
  return instructorsServiceInstance;
};

export const schoolsService = (): SchoolsService => {
  if (!schoolsServiceInstance) schoolsServiceInstance = new SchoolsService();
  return schoolsServiceInstance;
};

export const notificationsService = (): NotificationsService => {
  if (!notificationsServiceInstance) notificationsServiceInstance = new NotificationsService();
  return notificationsServiceInstance;
};

export const adminService = (): AdminService => {
  if (!adminServiceInstance) adminServiceInstance = new AdminService();
  return adminServiceInstance;
};

export const searchService = (): SearchService => {
  if (!searchServiceInstance) searchServiceInstance = new SearchService();
  return searchServiceInstance;
};

export const analyticsService = (): AnalyticsService => {
  if (!analyticsServiceInstance) analyticsServiceInstance = new AnalyticsService();
  return analyticsServiceInstance;
};

// Export base service for custom implementations
export { BaseService } from './base.service';

