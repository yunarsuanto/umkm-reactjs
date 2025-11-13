import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Pagination } from '../types/Pagination';
import { ApiErrorType } from '../types/ApiError';
import { getCategoryLessonPublic } from '@/api/category_lessons.api';
import { GetCategoryLessonRequest, GetCategoryLessonResponse } from '@/types/admin/category_lesson/GetCategoryLessonTypes';
import { GetCategoryLessonPublicRequest, GetCategoryLessonPublicResponse } from '@/types/admin/category_lesson/GetCategoryLessonPublicTypes';

export const useCategoryLessonsPublic = (pagination: Pagination, req: GetCategoryLessonPublicRequest, options: {enabled: boolean}) => {
  return useQuery<GetCategoryLessonPublicResponse, ApiErrorType>({
    queryKey: ['category-lessons', pagination.page, pagination.limit, pagination.search],
    queryFn: () => getCategoryLessonPublic(pagination, req),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
