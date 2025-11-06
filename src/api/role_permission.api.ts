import axios from "axios";
import apiClient from "./client";
import { ApiErrorClass } from "../types/ApiError";
import { AddRolePermissionSchema } from "../schemas/addRolePermission.schema";
import { AddRolePermissionResponse } from "../types/admin/role_permission/AddRolePermissionType";
import { DeleteRolePermissionSchema } from "../schemas/deleteRolePermission.schema";
import { DeleteRolePermissionResponse } from "../types/admin/role_permission/DeleteRolePermissionType";

export const addRolePermission = async (data: AddRolePermissionSchema): Promise<AddRolePermissionResponse> => {
  try {
    const response = await apiClient.patch(
      '/admin/role-permission/upsert',
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

export const deleteRolePermission = async (data: DeleteRolePermissionSchema): Promise<DeleteRolePermissionResponse> => {
  try {
    const response = await apiClient.delete(
      '/admin/role-permission/delete',
      {data: {...data}}
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