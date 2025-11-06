import axios from "axios";
import { Pagination } from "../types/Pagination";
import apiClient from "./client";
import { setMode } from "../features/generalSlice";
import { ApiErrorClass } from "../types/ApiError";
import { GetLessonRequest, GetLessonResponse } from "@/types/admin/lesson/GetLessonTypes";
import { DetailLessonResponse } from "@/types/admin/lesson/DetailLessonTypes";
import { AddLessonSchema } from "@/schemas/addLesson.schema";
import { AddLessonResponse } from "@/types/admin/lesson/AddLessonTypes";
import { UpdateLessonSchema } from "@/schemas/updateLesson.schema";
import { UpdateLessonResponse } from "@/types/admin/lesson/UpdateLessonTypes";
import { DeleteLessonSchema } from "@/schemas/deleteLesson.schema";
import { DeleteLessonResponse } from "@/types/admin/lesson/DeleteLessonTypes";
import { GetLessonItemRequest, GetLessonItemResponse } from "@/types/admin/lesson_item/GetLessonItemTypes";
import { DetailLessonItemResponse } from "@/types/admin/lesson_item/DetailLessonItemTypes";
import { AddLessonItemSchema } from "@/schemas/addLessonItem.schema";
import { AddLessonItemResponse } from "@/types/admin/lesson_item/AddLessonItemTypes";
import { UpdateLessonItemSchema } from "@/schemas/updateLessonItem.schema";
import { UpdateLessonItemResponse } from "@/types/admin/lesson_item/UpdateLessonItemTypes";
import { DeleteLessonItemSchema } from "@/schemas/deleteLessonItem.schema";
import { DeleteLessonItemResponse } from "@/types/admin/lesson_item/DeleteLessonItemTypes";

export const getLessonItem = async (pagination: Pagination, req: GetLessonItemRequest): Promise<GetLessonItemResponse> => {
  try {
    const response = await apiClient.get(
      `/admin/lesson-item/get?page=${pagination.page}&limit=${pagination.limit}&search=${pagination.search}&lesson_id=${req.lesson_id}`
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

export const detailLessonItem = async (id: string): Promise<DetailLessonItemResponse> => {
  try {
    const response = await apiClient.get(
      `/admin/lesson-item/detail/${id}`
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

export const addLessonItem = async (data: AddLessonItemSchema): Promise<AddLessonItemResponse> => {
  try {
    const response = await apiClient.post(
      '/admin/lesson-item/create',
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

export const updateLessonItem = async (data: UpdateLessonItemSchema): Promise<UpdateLessonItemResponse> => {
  try {
    const response = await apiClient.patch(
      '/admin/lesson-item/update',
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

export const deleteLessonItem = async (data: DeleteLessonItemSchema): Promise<DeleteLessonItemResponse> => {
  try {
    const response = await apiClient.delete(
      `/admin/lesson-item/delete`,
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
