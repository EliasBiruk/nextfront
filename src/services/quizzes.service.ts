/**
 * Quizzes Service
 * 
 * Handles all quiz-related operations including getting quizzes, starting attempts,
 * submitting answers, and managing quiz questions.
 * 
 * Uses mock data for prototype validation.
 */

import { BaseService } from './base.service';
import {
  GetQuizRequest,
  StartQuizAttemptRequest,
  SubmitQuizAnswerRequest,
  SubmitQuizAttemptRequest,
  GetQuizAttemptsRequest,
  CreateQuizRequest,
  UpdateQuizRequest,
  DeleteQuizRequest,
} from '@/types/apiRequests';
import {
  GetQuizResponse,
  StartQuizAttemptResponse,
  SubmitQuizAnswerResponse,
  SubmitQuizAttemptResponse,
  GetQuizAttemptsResponse,
  CreateQuizResponse,
  UpdateQuizResponse,
  DeleteQuizResponse,
} from '@/types/apiResponses';
import { mockQuizzes, mockQuizAttempts } from '@/data/mockEntities';

export class QuizzesService extends BaseService {
  async getQuiz(request: GetQuizRequest): Promise<GetQuizResponse> {
    return this.simulateApiCall(() => {
      const quiz = mockQuizzes.find(q => q.id === request.quizId);
      if (!quiz) {
        throw new Error('Quiz not found');
      }
      return quiz;
    });
  }

  async startQuizAttempt(request: StartQuizAttemptRequest): Promise<StartQuizAttemptResponse> {
    return this.simulateApiCall(() => {
      const newAttempt = {
        id: `attempt-${Date.now()}`,
        quizId: request.quizId,
        userId: 'user-1',
        startedAt: new Date().toISOString(),
        completedAt: undefined,
        score: 0,
        passed: false,
        answers: [],
        timeSpent: 0,
      };
      mockQuizAttempts.push(newAttempt as any);
      return newAttempt;
    });
  }

  async submitQuizAnswer(request: SubmitQuizAnswerRequest): Promise<SubmitQuizAnswerResponse> {
    return this.simulateApiCall(() => {
      return {
        correct: true,
        explanation: 'This is a mock explanation',
      };
    });
  }

  async submitQuizAttempt(request: SubmitQuizAttemptRequest): Promise<SubmitQuizAttemptResponse> {
    return this.simulateApiCall(() => {
      const attemptIndex = mockQuizAttempts.findIndex(a => a.id === request.attemptId);
      if (attemptIndex === -1) {
        throw new Error('Attempt not found');
      }
      mockQuizAttempts[attemptIndex] = {
        ...mockQuizAttempts[attemptIndex],
        completedAt: new Date().toISOString(),
        score: 85,
        passed: true,
      };
      return mockQuizAttempts[attemptIndex];
    });
  }

  async getQuizAttempts(request: GetQuizAttemptsRequest): Promise<GetQuizAttemptsResponse> {
    const response = await this.simulateApiCall(() => {
      let filteredAttempts = [...mockQuizAttempts];

      if (request.userId) {
        filteredAttempts = filteredAttempts.filter(a => a.userId === request.userId);
      }
      if (request.quizId) {
        filteredAttempts = filteredAttempts.filter(a => a.quizId === request.quizId);
      }

      const page = 1;
      const pageSize = 10;
      const startIndex = (page - 1) * pageSize;
      const paginatedAttempts = filteredAttempts.slice(startIndex, startIndex + pageSize);

      return {
        data: paginatedAttempts,
        total: filteredAttempts.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredAttempts.length / pageSize),
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to get quiz attempts');
  }

  async createQuiz(request: CreateQuizRequest): Promise<CreateQuizResponse> {
    return this.simulateApiCall(() => {
      const quizId = `quiz-${Date.now()}`;
      const newQuiz = {
        id: quizId,
        ...request,
        totalQuestions: request.questions.length,
        questions: request.questions.map((q, index) => ({
          ...q,
          id: `question-${Date.now()}-${index}`,
          quizId,
        })),
        createdAt: new Date().toISOString(),
      };
      mockQuizzes.push(newQuiz as any);
      return newQuiz;
    });
  }

  async updateQuiz(request: UpdateQuizRequest): Promise<UpdateQuizResponse> {
    return this.simulateApiCall(() => {
      const quizIndex = mockQuizzes.findIndex(q => q.id === request.quizId);
      if (quizIndex === -1) {
        throw new Error('Quiz not found');
      }
      const updatedQuiz = {
        ...mockQuizzes[quizIndex],
        ...request,
        totalQuestions: request.questions ? request.questions.length : mockQuizzes[quizIndex].totalQuestions,
        questions: request.questions ? request.questions.map(q => ({
          ...q,
          quizId: request.quizId,
          id: q.id || `question-${Date.now()}-${Math.random()}`,
        })) : mockQuizzes[quizIndex].questions,
      };
      mockQuizzes[quizIndex] = updatedQuiz as any;
      return updatedQuiz;
    });
  }

  async deleteQuiz(request: DeleteQuizRequest): Promise<DeleteQuizResponse> {
    return this.simulateApiCall(() => {
      const quizIndex = mockQuizzes.findIndex(q => q.id === request.quizId);
      if (quizIndex === -1) {
        throw new Error('Quiz not found');
      }
      mockQuizzes.splice(quizIndex, 1);
      return { success: true };
    });
  }
}
