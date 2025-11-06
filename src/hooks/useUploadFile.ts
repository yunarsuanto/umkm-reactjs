import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadFileResponse } from "../types/general/generalTypes";
import { ApiErrorType } from "../types/ApiError";
import { UploadFileSchema } from "../schemas/uploadFile.schema";
import { uploadFile } from "../api/upload_file.ap";

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  return useMutation<UploadFileResponse, ApiErrorType, UploadFileSchema>({ 
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['category-lessons'], exact: false });
    },
  });
};