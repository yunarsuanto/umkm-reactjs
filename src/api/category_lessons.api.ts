import axios from "axios";
import { Pagination } from "../types/Pagination";
import apiClient from "./client";
import { setMode } from "../features/generalSlice";
import { ApiErrorClass } from "../types/ApiError";
import { GetCategoryLessonRequest, GetCategoryLessonResponse } from "../types/admin/category_lesson/GetCategoryLessonTypes";
import { DetailCategoryLessonResponse } from "../types/admin/category_lesson/DetailCategoryLessonTypes";
import { AddCategoryLessonSchema } from "../schemas/addCategoryLesson.schema";
import { AddCategoryLessonResponse } from "../types/admin/category_lesson/AddCategoryLessonTypes";
import { UpdateCategoryLessonSchema } from "../schemas/updateCategoryLesson.schema";
import { UpdateCategoryLessonResponse } from "../types/admin/category_lesson/UpdateCategoryLessonTypes";
import { DeleteCategoryLessonSchema } from "../schemas/deleteCategoryLesson.schema";
import { DeleteCategoryLessonResponse } from "../types/admin/category_lesson/DeleteCategoryLessonTypes";
import { GetCategoryLessonPublicRequest, GetCategoryLessonPublicResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";

export const getCategoryLessonPublic = async (pagination: Pagination, req: GetCategoryLessonPublicRequest): Promise<GetCategoryLessonPublicResponse> => {
  try {
    const response = await apiClient.get(
      `/category-lesson/get?page=${pagination.page}&limit=${pagination.limit}&search=${pagination.search}`
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

export const getCategoryLesson = async (pagination: Pagination, req: GetCategoryLessonRequest): Promise<GetCategoryLessonResponse> => {
  try {
    const response = await apiClient.get(
      `/admin/category-lesson/get?page=${pagination.page}&limit=${pagination.limit}&search=${pagination.search}`
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
      `/admin/category-lesson/detail/${id}`
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

export const addCategoryLesson = async (data: AddCategoryLessonSchema): Promise<AddCategoryLessonResponse> => {
  try {
    const response = await apiClient.post(
      '/admin/category-lesson/create',
      data
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

export const updateCategoryLesson = async (data: UpdateCategoryLessonSchema): Promise<UpdateCategoryLessonResponse> => {
  try {
    const response = await apiClient.patch(
      '/admin/category-lesson/update',
      data
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

export const deleteCategoryLesson = async (data: DeleteCategoryLessonSchema): Promise<DeleteCategoryLessonResponse> => {
  try {
    const response = await apiClient.delete(
      `/admin/category-lesson/delete`,
      {data: {id: data.id}}
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
