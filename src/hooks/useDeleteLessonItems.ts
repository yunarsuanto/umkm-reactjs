import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeDeleteModal } from '../features/categoryLessonSlice';
import { deleteLessonItem } from '@/api/lesson_items.api';
import { DeleteLessonItemResponse } from '@/types/admin/lesson_item/DeleteLessonItemTypes';

export const useDeleteLessonItems = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  
  return useMutation<
    DeleteLessonItemResponse,
    ApiErrorType,
    { id: string }
  >({
    mutationFn: deleteLessonItem,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['lesson-items'], exact: false });
      dispatch(closeDeleteModal());
    },
  });
};
