import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { DeleteCategoryLessonResponse } from '../types/admin/category_lesson/DeleteCategoryLessonTypes';
import { deleteCategoryLesson } from '../api/category_lessons.api';
import { closeDeleteModal } from '../features/categoryLessonSlice';

export const useDeleteCategoryLessons = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  
  return useMutation<
    DeleteCategoryLessonResponse,
    ApiErrorType,
    { id: string }
  >({
    mutationFn: deleteCategoryLesson,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['category-lessons'], exact: false });
      dispatch(closeDeleteModal());
    },
  });
};
