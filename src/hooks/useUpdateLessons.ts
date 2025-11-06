import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeCreateModal } from '../features/userSlice';
import { addLesson, updateLesson } from '@/api/lessons.api';
import { UpdateLessonResponse } from '@/types/admin/lesson/UpdateLessonTypes';
import { UpdateLessonSchema } from '@/schemas/updateLesson.schema';

export const useUpdateLessons = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation<UpdateLessonResponse, ApiErrorType, UpdateLessonSchema>({ 
    mutationFn: updateLesson,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['lessons'], exact: false });
      dispatch(closeCreateModal());
    },
  });
};