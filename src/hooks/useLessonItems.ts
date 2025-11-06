import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Pagination } from '../types/Pagination';
import { ApiErrorType } from '../types/ApiError';
import { GetLessonItemRequest, GetLessonItemResponse } from '@/types/admin/lesson_item/GetLessonItemTypes';
import { getLessonItem } from '@/api/lesson_items.api';

export const useLessonItems = (pagination: Pagination, req: GetLessonItemRequest, options: {enabled: boolean}) => {
  return useQuery<GetLessonItemResponse, ApiErrorType>({
    queryKey: ['lesson-items', pagination.page, pagination.limit, pagination.search, req.lesson_id],
    queryFn: () => getLessonItem(pagination, req),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
