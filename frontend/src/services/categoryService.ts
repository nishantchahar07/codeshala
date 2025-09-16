import api from '../utils/api';
import { Category, ApiResponse } from '../types';

export const categoryService = {
  // Get all categories
  getAllCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await api.get('/course/showAllCategories');
    return response.data;
  },

  // Create category (Admin only)
  createCategory: async (data: { name: string; description: string }): Promise<ApiResponse<Category>> => {
    const response = await api.post('/course/createCategory', data);
    return response.data;
  },

  // Update category (Admin only)
  updateCategory: async (categoryId: string, data: { name: string; description: string }): Promise<ApiResponse<Category>> => {
    const response = await api.put(`/course/updateCategory/${categoryId}`, data);
    return response.data;
  },

  // Delete category (Admin only)
  deleteCategory: async (categoryId: string): Promise<ApiResponse> => {
    const response = await api.delete(`/course/deleteCategory/${categoryId}`);
    return response.data;
  },
};