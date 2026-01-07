import { Pagination } from '@/types/Pagination';
import axios from 'axios';
import apiClient from '../client';
import { GetCategoryLessonRequest, GetCategoryLessonResponse } from '@/types/admin/category_lesson/GetCategoryLessonTypes';
import { setMode } from '@/features/generalSlice';
import { ApiErrorClass } from '@/types/ApiError';
import { DetailCategoryLessonResponse } from '@/types/admin/category_lesson/DetailCategoryLessonTypes';
export const getCategoryLesson = async (pagination: Pagination, req: GetCategoryLessonRequest): Promise<GetCategoryLessonResponse> => {
  try {
    const response = await apiClient.get(
      `/user/category-lesson/get?page=${pagination.page}&limit=${pagination.limit}&search=${pagination.search}&category_lesson_type=${req.category_lesson_type}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if(error.status === 401){
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('role');
        setMode('public');
      }
      if(error.status === 500){
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('role');
        setMode('public');
      }
      if(error.status === 403){
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('role');
        setMode('public');
      }
      throw new ApiErrorClass(
        error.message,
        error.response?.status,
        error.response?.data
      );
    }
    throw error;
  }
};

export const detailCategoryLesson = async (id: string): Promise<DetailCategoryLessonResponse> => {
  try {
    const response = await apiClient.get(
      `/user/category-lesson/detail/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if(error.status === 401){
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('role');
        setMode('public');
      }
      if(error.status === 500){
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('role');
        setMode('public');
      }
      if(error.status === 403){
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('role');
        setMode('public');
      }
      throw new ApiErrorClass(
        error.message,
        error.response?.status,
        error.response?.data
      );
    }
    throw error;
  }
};