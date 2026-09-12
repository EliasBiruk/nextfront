/**
 * Base Service Class
 * 
 * Provides common functionality for all services including:
 * - Mock data simulation
 * - Error handling
 * - Loading states
 * - API response formatting
 */

import { ApiResponse, PaginatedResponse } from '@/types';

export class BaseService {
  protected delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  protected createSuccessResponse<T>(data: T): ApiResponse<T> {
    return {
      success: true,
      data,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId(),
      },
    };
  }

  protected createPaginatedResponse<T>(
    data: T[],
    total: number,
    page: number,
    pageSize: number
  ): PaginatedResponse<T> {
    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  protected createErrorResponse<T>(
    code: string,
    message: string,
    details?: any
  ): ApiResponse<T> {
    return {
      success: false,
      error: {
        code,
        message,
        details,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId(),
      },
    };
  }

  private generateRequestId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  protected async simulateApiCall<T>(
    operation: () => T,
    delayMs: number = 300
  ): Promise<ApiResponse<T>> {
    await this.delay(delayMs);
    try {
      const result = operation();
      return this.createSuccessResponse(result);
    } catch (error) {
      return this.createErrorResponse(
        'OPERATION_FAILED',
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    }
  }
}
