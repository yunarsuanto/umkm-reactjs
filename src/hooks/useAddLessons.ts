import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeCreateModal } from '../features/userSlice';
import { AddLessonSchema } from '@/schemas/addLesson.schema';
import { AddLessonResponse } from '@/types/admin/lesson/AddLessonTypes';
import { addLesson } from '@/api/lessons.api';

export const useAddLessons = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation<AddLessonResponse, ApiErrorType, AddLessonSchema>({ 
    mutationFn: addLesson,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['lessons'], exact: false });
      dispatch(closeCreateModal());
    },
  });
};