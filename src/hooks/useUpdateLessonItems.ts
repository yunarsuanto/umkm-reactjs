import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { UpdateLessonItemResponse } from '@/types/admin/lesson_item/UpdateLessonItemTypes';
import { UpdateLessonItemSchema } from '@/schemas/updateLessonItem.schema';
import { updateLessonItem } from '@/api/lesson_items.api';

export const useUpdateLessonItems = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation<UpdateLessonItemResponse, ApiErrorType, UpdateLessonItemSchema>({ 
    mutationFn: updateLessonItem,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['lesson-items'], exact: false });
    },
  });
};