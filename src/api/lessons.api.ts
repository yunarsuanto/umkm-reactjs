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
import { GetLessonRequest, GetLessonResponse } from "@/types/admin/lesson/GetLessonTypes";
import { DetailLessonResponse } from "@/types/admin/lesson/DetailLessonTypes";
import { AddLessonSchema } from "@/schemas/addLesson.schema";
import { AddLessonResponse } from "@/types/admin/lesson/AddLessonTypes";
import { UpdateLessonSchema } from "@/schemas/updateLesson.schema";
import { UpdateLessonResponse } from "@/types/admin/lesson/UpdateLessonTypes";
import { DeleteLessonSchema } from "@/schemas/deleteLesson.schema";
import { DeleteLessonResponse } from "@/types/admin/lesson/DeleteLessonTypes";

export const getLesson = async (pagination: Pagination, req: GetLessonRequest): Promise<GetLessonResponse> => {
  try {
    const response = await apiClient.get(
      `/admin/lesson/get?page=${pagination.page}&limit=${pagination.limit}&search=${pagination.search}&category_lesson_id=${req.category_lesson_id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if(error.status === 401){
        localStorage.removeItem('token');
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
      `/admin/lesson/detail/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if(error.status === 401){
        localStorage.removeItem('token');
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

export const addLesson = async (data: AddLessonSchema): Promise<AddLessonResponse> => {
  try {
    const response = await apiClient.post(
      '/admin/lesson/create',
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiErrorClass(
        error.message,
        error.response?.status,
        error.response?.data
      );
    }
    throw error;
  }
};

export const updateLesson = async (data: UpdateLessonSchema): Promise<UpdateLessonResponse> => {
  try {
    const response = await apiClient.patch(
      '/admin/lesson/update',
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiErrorClass(
        error.message,
        error.response?.status,
        error.response?.data
      );
    }
    throw error;
  }
};

export const deleteLesson = async (data: DeleteLessonSchema): Promise<DeleteLessonResponse> => {
  try {
    const response = await apiClient.delete(
      `/admin/lesson/delete`,
      {data: {id: data.id}}
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiErrorClass(
        error.message,
        error.response?.status,
        error.response?.data
      );
    }
    throw error;
  }
};
