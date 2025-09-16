import api from '../utils/api';
import { Section, CreateSectionData, UpdateSectionData, ApiResponse } from '../types';

export const sectionService = {
  // Create section
  createSection: async (data: CreateSectionData): Promise<ApiResponse<Section>> => {
    const response = await api.post('/course/addSection', data);
    return response.data;
  },

  // Update section
  updateSection: async (data: UpdateSectionData): Promise<ApiResponse<Section>> => {
    const response = await api.post('/course/updateSection', data);
    return response.data;
  },

  // Delete section
  deleteSection: async (sectionId: string): Promise<ApiResponse> => {
    const response = await api.post('/course/deleteSection', { sectionId });
    return response.data;
  },
};