/**
 * Authentication Service
 * 
 * Handles all authentication-related operations including login, signup, logout,
 * password reset, and token management.
 * 
 * Uses mock data for prototype validation.
 */

import { BaseService } from './base.service';
import {
  LoginRequest,
  SignupRequest,
  LogoutRequest,
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '@/types/apiRequests';
import {
  LoginResponse,
  SignupResponse,
  LogoutResponse,
  RefreshTokenResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from '@/types/apiResponses';
import { mockUsers } from '@/data/mockEntities';
import { UserRole } from '@/types';

export class AuthService extends BaseService {
  private currentUser: any = null;
  private accessToken: string | null = null;
  private refreshTokenValue: string | null = null;

  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await this.simulateApiCall(() => {
      // Find user by email and role
      const user = mockUsers.find(
        u => u.email === request.email && u.role === request.role
      );

      if (!user) {
        throw new Error('Invalid credentials or role');
      }

      // Simulate password check (in real app, this would be a hash comparison)
      if (request.password !== 'password') {
        throw new Error('Invalid password');
      }

      this.currentUser = user;
      this.accessToken = this.generateToken(user);
      this.refreshTokenValue = this.generateRefreshToken(user);

      // Store in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('refreshToken', this.refreshTokenValue);
      }

      return {
        user,
        accessToken: this.accessToken,
        refreshToken: this.refreshTokenValue,
        expiresIn: 3600, // 1 hour
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Login failed');
  }

  async signup(request: SignupRequest): Promise<SignupResponse> {
    const response = await this.simulateApiCall(() => {
      // Validate passwords match
      if (request.password !== request.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email === request.email);
      if (existingUser) {
        throw new Error('Email already registered');
      }

      // Create new user (in real app, this would be sent to backend)
      const newUser = {
        id: `user-${Date.now()}`,
        email: request.email,
        firstName: request.fullName?.split(' ')[0] || '',
        lastName: request.fullName?.split(' ')[1] || '',
        fullName: request.fullName,
        role: request.role as UserRole,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.currentUser = newUser;
      this.accessToken = this.generateToken(newUser);
      this.refreshTokenValue = this.generateRefreshToken(newUser);

      return {
        user: newUser,
        accessToken: this.accessToken,
        refreshToken: this.refreshTokenValue,
        expiresIn: 3600,
        requiresVerification: request.role === 'instructor' || request.role === 'school',
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Signup failed');
  }

  async logout(request?: LogoutRequest): Promise<LogoutResponse> {
    const response = await this.simulateApiCall(() => {
      this.currentUser = null;
      this.accessToken = null;
      this.refreshTokenValue = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }

      return {
        success: true,
        message: 'Logged out successfully',
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Logout failed');
  }

  async refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const response = await this.simulateApiCall(() => {
      if (!this.currentUser) {
        throw new Error('No user session');
      }

      this.accessToken = this.generateToken(this.currentUser);
      this.refreshTokenValue = this.generateRefreshToken(this.currentUser);

      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('refreshToken', this.refreshTokenValue);
      }

      return {
        accessToken: this.accessToken,
        refreshToken: this.refreshTokenValue,
        expiresIn: 3600,
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Token refresh failed');
  }

  async forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const response = await this.simulateApiCall(() => {
      const user = mockUsers.find(u => u.email === request.email);
      if (!user) {
        // For security, don't reveal if email exists
        return {
          success: true,
          message: 'If the email exists, a reset link has been sent',
        };
      }

      return {
        success: true,
        message: 'Password reset email sent',
        resetTokenExpiry: new Date(Date.now() + 3600000).toISOString(),
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Password reset failed');
  }

  async resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response = await this.simulateApiCall(() => {
      if (request.newPassword !== request.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      return {
        success: true,
        message: 'Password reset successfully',
      };
    });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Password reset failed');
  }

  getCurrentUser(): any {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null || this.getCurrentUser() !== null;
  }

  private generateToken(user: any): string {
    return `jwt-${user.id}-${Date.now()}`;
  }

  private generateRefreshToken(user: any): string {
    return `refresh-${user.id}-${Date.now()}`;
  }
}
