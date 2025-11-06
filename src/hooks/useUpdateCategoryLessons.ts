import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { updateCategoryLesson } from '../api/category_lessons.api';
import { UpdateCategoryLessonResponse } from '../types/admin/category_lesson/UpdateCategoryLessonTypes';
import { UpdateCategoryLessonSchema } from '../schemas/updateCategoryLesson.schema';

export const useUpdateCategoryLessons = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateCategoryLessonResponse, ApiErrorType, UpdateCategoryLessonSchema>({ 
    mutationFn: updateCategoryLesson,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['category-lessons'], exact: false });
    },
  });
};