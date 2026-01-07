import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCategoryLesson } from '@/api/user/category_lessons.api';
import { Pagination } from '@/types/Pagination';
import { GetCategoryLessonRequest, GetCategoryLessonResponse } from '@/types/admin/category_lesson/GetCategoryLessonTypes';
import { ApiErrorType } from '@/types/ApiError';

export const useCategoryLessonsForUser = (pagination: Pagination, req: GetCategoryLessonRequest, options: {enabled: boolean}) => {
  return useQuery<GetCategoryLessonResponse, ApiErrorType>({
    queryKey: ['category-lessons-for-user', pagination.page, pagination.limit, pagination.search, req.category_lesson_type],
    queryFn: () => getCategoryLesson(pagination, req),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
