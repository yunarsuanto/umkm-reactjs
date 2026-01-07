import axios from "axios";
import { GetLessonRequest, GetLessonResponse } from "@/types/admin/lesson/GetLessonTypes";
import apiClient from "../client";
import { Pagination } from "@/types/Pagination";
import { setMode } from "@/features/generalSlice";
import { ApiErrorClass } from "@/types/ApiError";
import { DetailLessonResponse } from "@/types/admin/lesson/DetailLessonTypes";

export const getLesson = async (pagination: Pagination, req: GetLessonRequest): Promise<GetLessonResponse> => {
  try {
    const response = await apiClient.get(
      `/user/lesson/get?page=${pagination.page}&limit=${pagination.limit}&search=${pagination.search}&category_lesson_id=${req.category_lesson_id}`
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

export const detailLesson = async (id: string): Promise<DetailLessonResponse> => {
  try {
    const response = await apiClient.get(
      `/user/lesson/detail/${id}`
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