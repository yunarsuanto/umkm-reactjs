import axios from "axios";
import apiClient from "./client";
import { ApiErrorClass } from "../types/ApiError";
import { UploadFileSchema } from "../schemas/uploadFile.schema";
import { UploadFileResponse } from "../types/general/generalTypes";

export const uploadFile = async (data: UploadFileSchema): Promise<UploadFileResponse> => {
  try {
    const response = await apiClient.post(
      '/general/upload-file',
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
