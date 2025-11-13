import axios from "axios";
import apiClient from "./client";
import { ApiErrorClass } from "../types/ApiError";
import { UploadFileSchema } from "../schemas/uploadFile.schema";
import { UploadFileResponse } from "../types/general/generalTypes";
import { UploadFileBase64Schema } from "@/schemas/uploadFileBase64.schema";

export const uploadFileBase64 = async (data: UploadFileBase64Schema): Promise<UploadFileResponse> => {
  try {
    const response = await apiClient.post(
      '/general/upload-file-base64',
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

export const uploadFile = async (data: UploadFileSchema): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append('file', data.file);
  try {
    const response = await apiClient.post(
      '/general/upload-file',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
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
