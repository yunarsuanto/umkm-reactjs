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

export const getPermissions = async (): Promise<GetPermissionResponse> => {
  try {
    const response = await apiClient.get(
      '/permission/permission.permission-handler/list-permission?page=1&limit=20&search'
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

export const addPermissions = async (data: AddPermissionSchema): Promise<AddPermissionResponse> => {
  try {
    const response = await apiClient.post(
      '/permission/permission.permission-handler/create-permission',
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
      `/permission/permission.permission-handler/update-permission`,
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
      `/permission/permission.permission-handler/delete-permission`,
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