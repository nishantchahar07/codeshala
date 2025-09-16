import api from '../utils/api';
import { Course, CreateCourseData, ApiResponse } from '../types';

export const courseService = {
  // Get all courses
  getAllCourses: async (): Promise<ApiResponse<Course[]>> => {
    const response = await api.get('/course/getAllCourses');
    return response.data;
  },

  // Create course
  createCourse: async (data: CreateCourseData): Promise<ApiResponse<Course>> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('whatWillYouLearn', data.whatWillYouLearn);
    formData.append('category', data.category);
    formData.append('thumbnailImage', data.thumbnailImage);

    const response = await api.post('/course/createCourse', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get course by ID
  getCourseById: async (courseId: string): Promise<ApiResponse<Course>> => {
    const response = await api.get(`/course/getCourseDetails/${courseId}`);
    return response.data;
  },

  // Get instructor courses
  getInstructorCourses: async (): Promise<ApiResponse<Course[]>> => {
    const response = await api.get('/course/getInstructorCourses');
    return response.data;
  },

  // Update course
  updateCourse: async (courseId: string, data: Partial<CreateCourseData>): Promise<ApiResponse<Course>> => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'thumbnailImage' && value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'number') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value as string);
        }
      }
    });

    const response = await api.put(`/course/updateCourse/${courseId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete course
  deleteCourse: async (courseId: string): Promise<ApiResponse> => {
    const response = await api.delete(`/course/deleteCourse/${courseId}`);
    return response.data;
  },

  // Enroll in course
  enrollInCourse: async (courseId: string): Promise<ApiResponse> => {
    const response = await api.post('/course/enrollStudent', { courseId });
    return response.data;
  },

  // Get enrolled courses
  getEnrolledCourses: async (): Promise<ApiResponse<Course[]>> => {
    const response = await api.get('/course/getEnrolledCourses');
    return response.data;
  },
};