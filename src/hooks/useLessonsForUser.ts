import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Pagination } from '../types/Pagination';
import { ApiErrorType } from '../types/ApiError';
import { GetLessonRequest, GetLessonResponse } from '@/types/admin/lesson/GetLessonTypes';
import { getLesson } from '@/api/user/lessons.api';

export const useLessonsForUser = (pagination: Pagination, req: GetLessonRequest, options: {enabled: boolean}) => {
  return useQuery<GetLessonResponse, ApiErrorType>({
    queryKey: ['lessons-for-user', pagination.page, pagination.limit, pagination.search, req.category_lesson_id],
    queryFn: () => getLesson(pagination, req),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
