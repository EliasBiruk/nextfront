/**
 * Analytics Service
 * 
 * Handles all analytics-related operations including course analytics,
 * student progress analytics, instructor performance analytics, and platform-wide analytics.
 * 
 * Uses mock data for prototype validation.
 */

import { BaseService } from './base.service';
import { mockCourses, mockEnrollments, mockCourseProgress } from '@/data/mockEntities';
import { EnrollmentStatus } from '@/types';

export class AnalyticsService extends BaseService {
  async getCourseAnalytics(courseId: string) {
    return this.simulateApiCall(() => {
      const course = mockCourses.find(c => c.id === courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      
      const enrollments = mockEnrollments.filter(e => e.courseId === courseId);
      const completedEnrollments = enrollments.filter(e => e.progress === 100);
      
      return {
        courseId,
        courseTitle: course.title,
        totalEnrollments: enrollments.length,
        activeEnrollments: enrollments.filter(e => e.status === EnrollmentStatus.ACTIVE).length,
        completedEnrollments: completedEnrollments.length,
        averageProgress: enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length || 0,
        averageRating: course.rating,
        revenue: course.price * enrollments.length,
        completionRate: enrollments.length > 0 ? (completedEnrollments.length / enrollments.length) * 100 : 0,
        engagementMetrics: {
          averageTimeSpent: 120, // minutes
          averageLessonsCompleted: 5,
          averageQuizScore: 85,
        },
        enrollmentTrend: [
          { date: '2024-01', count: 10 },
          { date: '2024-02', count: 15 },
          { date: '2024-03', count: 20 },
          { date: '2024-04', count: 25 },
          { date: '2024-05', count: 30 },
        ],
      };
    });
  }

  async getStudentAnalytics(studentId: string) {
    return this.simulateApiCall(() => {
      const enrollments = mockEnrollments.filter(e => e.userId === studentId);
      const completedCourses = enrollments.filter(e => e.progress === 100);
      
      return {
        studentId,
        totalEnrollments: enrollments.length,
        completedCourses: completedCourses.length,
        inProgressCourses: enrollments.filter(e => e.progress > 0 && e.progress < 100).length,
        totalLearningTime: 1250, // minutes
        averageProgress: enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length || 0,
        certificatesEarned: completedCourses.length,
        quizAverageScore: 87,
        streakDays: 15,
        learningActivity: [
          { date: '2024-01-01', minutes: 45 },
          { date: '2024-01-02', minutes: 60 },
          { date: '2024-01-03', minutes: 30 },
          { date: '2024-01-04', minutes: 90 },
          { date: '2024-01-05', minutes: 75 },
        ],
      };
    });
  }

  async getInstructorAnalytics(instructorId: string) {
    return this.simulateApiCall(() => {
      const courses = mockCourses.filter(c => c.instructorId === instructorId);
      const courseIds = courses.map(c => c.id);
      const enrollments = mockEnrollments.filter(e => courseIds.includes(e.courseId));
      
      return {
        instructorId,
        totalCourses: courses.length,
        totalStudents: enrollments.length,
        totalRevenue: courses.reduce((sum, c) => sum + (c.price * enrollments.filter(e => e.courseId === c.id).length), 0),
        averageRating: courses.reduce((sum, c) => sum + c.rating, 0) / courses.length || 0,
        totalReviews: courses.reduce((sum, c) => sum + c.students, 0),
        activeCourses: courses.filter(c => c.status === 'PUBLISHED').length,
        draftCourses: courses.filter(c => c.status === 'DRAFT').length,
        studentEngagement: {
          averageCompletionRate: 75,
          averageTimeSpent: 110,
          averageQuizScore: 82,
        },
        monthlyEarnings: [
          { month: '2024-01', amount: 1200 },
          { month: '2024-02', amount: 1500 },
          { month: '2024-03', amount: 1800 },
          { month: '2024-04', amount: 2100 },
          { month: '2024-05', amount: 2400 },
        ],
      };
    });
  }

  async getPlatformAnalytics() {
    return this.simulateApiCall(() => {
      return {
        totalUsers: 125000,
        activeUsers: 45000,
        totalCourses: 8500,
        activeCourses: 7200,
        totalEnrollments: 250000,
        totalRevenue: 4500000,
        averageCompletionRate: 68,
        averageRating: 4.5,
        userGrowth: [
          { month: '2024-01', count: 10000 },
          { month: '2024-02', count: 12000 },
          { month: '2024-03', count: 15000 },
          { month: '2024-04', count: 18000 },
          { month: '2024-05', count: 22000 },
        ],
        revenueGrowth: [
          { month: '2024-01', amount: 300000 },
          { month: '2024-02', amount: 350000 },
          { month: '2024-03', amount: 400000 },
          { month: '2024-04', amount: 450000 },
          { month: '2024-05', amount: 500000 },
        ],
        topCategories: [
          { category: 'Technology', enrollments: 50000 },
          { category: 'Business', enrollments: 40000 },
          { category: 'Arts', enrollments: 30000 },
          { category: 'Science', enrollments: 25000 },
          { category: 'Health', enrollments: 20000 },
        ],
      };
    });
  }
}
