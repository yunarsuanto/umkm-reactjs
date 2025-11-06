import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeDeleteModal } from '../features/categoryLessonSlice';
import { DeleteLessonResponse } from '@/types/admin/lesson/DeleteLessonTypes';
import { deleteLesson } from '@/api/lessons.api';

export const useDeleteLessons = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  
  return useMutation<
    DeleteLessonResponse,
    ApiErrorType,
    { id: string }
  >({
    mutationFn: deleteLesson,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['lessons'], exact: false });
      dispatch(closeDeleteModal());
    },
  });
};
