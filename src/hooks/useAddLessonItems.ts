import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeCreateModal } from '../features/userSlice';
import { addLessonItem } from '@/api/lesson_items.api';
import { AddLessonItemResponse } from '@/types/admin/lesson_item/AddLessonItemTypes';
import { AddLessonItemSchema } from '@/schemas/addLessonItem.schema';

export const useAddLessonItems = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation<AddLessonItemResponse, ApiErrorType, AddLessonItemSchema>({ 
    mutationFn: addLessonItem,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['lesson-items'], exact: false });
      dispatch(closeCreateModal());
    },
  });
};