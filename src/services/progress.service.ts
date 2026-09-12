/**
 * Progress Service
 * 
 * Handles all progress-related operations including getting course progress,
 * updating lesson progress, and marking lessons as complete.
 * 
 * Uses mock data for prototype validation.
 */

import { BaseService } from './base.service';
import {
  GetCourseProgressRequest,
  UpdateLessonProgressRequest,
  MarkLessonCompleteRequest,
} from '@/types/apiRequests';
import {
  GetCourseProgressResponse,
  UpdateLessonProgressResponse,
  MarkLessonCompleteResponse,
} from '@/types/apiResponses';
import { mockCourseProgress } from '@/data/mockEntities';

export class ProgressService extends BaseService {
  async getCourseProgress(request: GetCourseProgressRequest): Promise<GetCourseProgressResponse> {
    return this.simulateApiCall(() => {
      const progressKey = `${request.userId}-${request.courseId}`;
      const progress = mockCourseProgress[progressKey];
      if (!progress) {
        throw new Error('Progress not found');
      }
      return progress;
    });
  }

  async updateLessonProgress(request: UpdateLessonProgressRequest): Promise<UpdateLessonProgressResponse> {
    return this.simulateApiCall(() => {
      const progressKey = `${request.userId}-${request.courseId}`;
      const progress = mockCourseProgress[progressKey];
      if (!progress) {
        throw new Error('Progress not found');
      }
      return progress;
    });
  }

  async markLessonComplete(request: MarkLessonCompleteRequest): Promise<MarkLessonCompleteResponse> {
    return this.simulateApiCall(() => {
      const progressKey = `${request.userId}-${request.courseId}`;
      const progress = mockCourseProgress[progressKey];
      if (!progress) {
        throw new Error('Progress not found');
      }
      return progress;
    });
  }
}
