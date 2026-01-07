import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { detailLesson } from '@/api/user/lessons.api';
import { DetailLessonResponse } from '@/types/admin/lesson/DetailLessonTypes';

export const useLessonDetailForUser = (id: string, options: {enabled: boolean}) => {
  return useQuery<DetailLessonResponse, ApiErrorType>({
    queryKey: ['lesson-detail-for-user', id],
    queryFn: () => detailLesson(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
