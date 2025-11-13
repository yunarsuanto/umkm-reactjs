import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadFileResponse } from "../types/general/generalTypes";
import { ApiErrorType } from "../types/ApiError";
import { UploadFileSchema } from "../schemas/uploadFile.schema";
import { uploadFile, uploadFileBase64 } from "../api/upload_file.ap";
import { UploadFileBase64Schema } from "@/schemas/uploadFileBase64.schema";

export const useUploadFileBase64 = () => {
  const queryClient = useQueryClient();
  return useMutation<UploadFileResponse, ApiErrorType, UploadFileBase64Schema>({ 
    mutationFn: uploadFileBase64,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['category-lessons'], exact: false });
      queryClient.removeQueries({ queryKey: ['lessons'], exact: false });
    },
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  return useMutation<UploadFileResponse, ApiErrorType, UploadFileSchema>({ 
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['category-lessons'], exact: false });
      queryClient.removeQueries({ queryKey: ['lessons'], exact: false });
    },
  });
};