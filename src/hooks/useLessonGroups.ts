import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Pagination } from '../types/Pagination';
import { ApiErrorType } from '../types/ApiError';
import { getLessonGroup } from '@/api/lesson_items.api';
import { GetLessonGroupRequest, GetLessonGroupResponse } from '@/types/admin/lesson_item/GetLessonGroupTypes';

export const useLessonGroups = (pagination: Pagination, req: GetLessonGroupRequest, options: {enabled: boolean}) => {
  return useQuery<GetLessonGroupResponse, ApiErrorType>({
    queryKey: ['lesson-groups', pagination.page, pagination.limit, pagination.search, req.lesson_id],
    queryFn: () => getLessonGroup(pagination, req),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
