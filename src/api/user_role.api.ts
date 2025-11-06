import axios from "axios";
import apiClient from "./client";
import { ApiErrorClass } from "../types/ApiError";
import { AddUserRoleSchema } from "../schemas/addUserRole.schema";
import { AddUserRoleResponse } from "../types/admin/user_role/AddUserRoleType";
import { DeleteUserRoleResponse } from "../types/admin/user_role/DeleteUserRoleType";
import { DeleteUserRoleSchema } from "../schemas/deleteUserRole.schema";

export const addUserRole = async (data: AddUserRoleSchema): Promise<AddUserRoleResponse> => {
  try {
    const response = await apiClient.patch(
      '/admin/user-role/upsert',
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

export const deleteUserRole = async (data: DeleteUserRoleSchema): Promise<DeleteUserRoleResponse> => {
  try {
    const response = await apiClient.delete(
      '/admin/user-role/delete',
      {data: {user_id: data.user_id, role_id: data.role_id}}
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