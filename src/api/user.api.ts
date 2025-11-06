import axios from "axios";
import { GetUserResponse } from "../types/admin/user/GetUserTypes";
import { Pagination } from "../types/Pagination";
import apiClient from "./client";
import { setMode } from "../features/generalSlice";
import { ApiErrorClass } from "../types/ApiError";
import { DetailUserResponse } from "../types/admin/user/DetailUserTypes";
import { AddUserSchema } from "../schemas/addUser.schema";
import { AddUserResponse } from "../types/admin/user/AddUserTypes";
import { UpdateUserSchema } from "../schemas/updateUser.schema";
import { UpdateUserResponse } from "../types/admin/user/UpdateUserTypes";
import { DeleteUserSchema } from "../schemas/deleteUser.schema";
import { DeleteUserResponse } from "../types/admin/user/DeleteUserTypes";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const getUser = async (pagination: Pagination): Promise<GetUserResponse> => {
  try {
    const response = await apiClient.get(
      `/admin/user/get?page=${pagination.page}&limit=${pagination.limit}&search=${pagination.search}`
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

export const detailUser = async (id: string): Promise<DetailUserResponse> => {
  try {
    const response = await apiClient.get(
      `/admin/user/detail/${id}`
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

export const addUser = async (data: AddUserSchema): Promise<AddUserResponse> => {
  try {
    const response = await apiClient.post(
      '/admin/user/create',
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

export const updateUser = async (data: UpdateUserSchema): Promise<UpdateUserResponse> => {
  try {
    const response = await apiClient.patch(
      `/admin/user/update`,
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

export const deleteUser = async (data: DeleteUserSchema): Promise<DeleteUserResponse> => {
  try {
    const response = await apiClient.delete(
      `/admin/user/delete`,
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
