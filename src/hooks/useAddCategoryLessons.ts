import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeCreateModal } from '../features/userSlice';
import { AddCategoryLessonResponse } from '../types/admin/category_lesson/AddCategoryLessonTypes';
import { addCategoryLesson } from '../api/category_lessons.api';
import { AddCategoryLessonSchema } from '../schemas/addCategoryLesson.schema';

export const useAddCategoryLessons = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation<AddCategoryLessonResponse, ApiErrorType, AddCategoryLessonSchema>({ 
    mutationFn: addCategoryLesson,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['category-lessons'], exact: false });
      dispatch(closeCreateModal());
    },
  });
};