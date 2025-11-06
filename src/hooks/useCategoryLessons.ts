import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Pagination } from '../types/Pagination';
import { ApiErrorType } from '../types/ApiError';
import { GetCategoryLessonRequest, GetCategoryLessonResponse } from '../types/admin/category_lesson/GetCategoryLessonTypes';
import { getCategoryLesson } from '../api/category_lessons.api';

export const useCategoryLessons = (pagination: Pagination, req: GetCategoryLessonRequest, options: {enabled: boolean}) => {
  return useQuery<GetCategoryLessonResponse, ApiErrorType>({
    queryKey: ['category-lessons', pagination.page, pagination.limit, pagination.search, req.has_parent],
    queryFn: () => getCategoryLesson(pagination, req),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
