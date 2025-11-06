import axios from "axios";
import apiClient from "./client";
import { ApiErrorClass } from "../types/ApiError";
import { AddPermissionSchema } from '../schemas/addPermission.schema';
import { UpdatePermissionSchema } from "../schemas/updatePermission.schema";
import { GetPermissionResponse } from "../types/admin/permission/GetPermissionTypes";
import { AddPermissionResponse } from "../types/admin/permission/AddPermissionTypes";
import { UpdatePermissionResponse } from "../types/admin/permission/UpdatePermissionTypes";
import { DeletePermissionSchema } from "../schemas/deletePermission.schema";
import { DeletePermissionResponse } from "../types/admin/permission/DeletePermissionTypes";
import { Pagination } from "../types/Pagination";
import { setMode } from "../features/generalSlice";

export const getPermission = async (pagination: Pagination): Promise<GetPermissionResponse> => {
  try {
    const response = await apiClient.get(
      `/admin/permission/get?page=${pagination.page}&limit=${pagination.limit}&search=${pagination.search}`
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

export const addPermission = async (data: AddPermissionSchema): Promise<AddPermissionResponse> => {
  try {
    const response = await apiClient.post(
      '/admin/permission/create',
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

export const updatePermission = async (data: UpdatePermissionSchema): Promise<UpdatePermissionResponse> => {
  try {
    const response = await apiClient.patch(
      `/admin/permission/update`,
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

export const deletePermission = async (data: DeletePermissionSchema): Promise<DeletePermissionResponse> => {
  try {
    const response = await apiClient.delete(
      `/admin/permission/delete`,
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