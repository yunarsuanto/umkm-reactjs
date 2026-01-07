import axios from "axios";
import apiClient from "./client";
import { ApiErrorClass } from "../types/ApiError";
import { Pagination } from "../types/Pagination";
import { setMode } from "../features/generalSlice";
import { GetRoleResponse } from "../types/admin/role/GetRoleTypes";
import { AddRoleResponse } from "../types/admin/role/AddRoleTypes";
import { UpdateRoleResponse } from "../types/admin/role/UpdateRoleTypes";
import { DeleteRoleResponse } from "../types/admin/role/DeleteRoleTypes";
import { AddRoleSchema } from "../schemas/addRole.schema";
import { UpdateRoleSchema } from "../schemas/updateRole.schema";
import { DeleteRoleSchema } from "../schemas/deleteRole.schema";
import { DetailRoleResponse } from "../types/admin/role/DetailRoleTypes";

export const getRole = async (pagination: Pagination): Promise<GetRoleResponse> => {
  try {
    const response = await apiClient.get(
      `/admin/role/get?page=${pagination.page}&limit=${pagination.limit}&search=${pagination.search}`
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

export const detailRole = async (id: string): Promise<DetailRoleResponse> => {
  try {
    const response = await apiClient.get(
      `/admin/role/detail/${id}`
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

export const addRole = async (data: AddRoleSchema): Promise<AddRoleResponse> => {
  try {
    const response = await apiClient.post(
      '/admin/role/create',
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

export const updateRole = async (data: UpdateRoleSchema): Promise<UpdateRoleResponse> => {
  try {
    const response = await apiClient.patch(
      `/admin/role/update`,
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

export const deleteRole = async (data: DeleteRoleSchema): Promise<DeleteRoleResponse> => {
  try {
    const response = await apiClient.delete(
      `/admin/role/delete`,
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