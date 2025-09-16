import api from '../utils/api';
import { LoginCredentials, SignupData, OtpRequest, ChangePasswordData, ApiResponse, User } from '../types';

export const authService = {
  // Send OTP
  sendOtp: async (data: OtpRequest): Promise<ApiResponse> => {
    const response = await api.post('/auth/sendotp', data);
    return response.data;
  },

  // Sign up
  signup: async (data: SignupData): Promise<ApiResponse<User>> => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  // Login
  login: async (data: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  // Change password
  changePassword: async (data: ChangePasswordData): Promise<ApiResponse> => {
    const response = await api.post('/auth/changepassword', data);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};