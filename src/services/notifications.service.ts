/**
 * Notifications Service
 * 
 * Handles all notification-related operations including getting notifications,
 * marking as read, and managing notification preferences.
 * 
 * Uses mock data for prototype validation.
 */

import { BaseService } from './base.service';
import {
  GetNotificationsRequest,
  MarkNotificationReadRequest,
  MarkAllNotificationsReadRequest,
} from '@/types/apiRequests';
import {
  GetNotificationsResponse,
  MarkNotificationReadResponse,
  MarkAllNotificationsReadResponse,
} from '@/types/apiResponses';
import { mockNotifications } from '@/data/mockEntities';

export class NotificationsService extends BaseService {
  async getNotifications(request: GetNotificationsRequest): Promise<GetNotificationsResponse> {
    const response = await this.simulateApiCall(() => {
      let filteredNotifications = [...mockNotifications];

      if (request.userId) {
        filteredNotifications = filteredNotifications.filter(n => n.userId === request.userId);
      }
      if (request.type) {
        filteredNotifications = filteredNotifications.filter(n => n.type === request.type);
      }

      // Sort by createdAt descending
      filteredNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      const page = request.pagination?.page || 1;
      const pageSize = request.pagination?.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + pageSize);

      return {
        data: paginatedNotifications,
        total: filteredNotifications.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredNotifications.length / pageSize),
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to get notifications');
  }

  async markNotificationRead(request: MarkNotificationReadRequest): Promise<MarkNotificationReadResponse> {
    return this.simulateApiCall(() => {
      const notificationIndex = mockNotifications.findIndex(n => n.id === request.notificationId);
      if (notificationIndex === -1) {
        throw new Error('Notification not found');
      }
      return mockNotifications[notificationIndex];
    });
  }

  async markAllNotificationsRead(request: MarkAllNotificationsReadRequest): Promise<MarkAllNotificationsReadResponse> {
    return this.simulateApiCall(() => {
      const userNotifications = mockNotifications.filter(n => n.userId === request.userId);
      return { success: true, count: userNotifications.length };
    });
  }
}
