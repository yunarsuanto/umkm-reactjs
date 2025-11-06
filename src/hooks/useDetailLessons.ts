import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiErrorType } from "../types/ApiError";
import { DetailLessonResponse } from "@/types/admin/lesson/DetailLessonTypes";
import { detailLesson } from "@/api/lessons.api";

export const useDetailLessons = (id: string, options?: { enabled?: boolean }) => {
  return useQuery<DetailLessonResponse, ApiErrorType>({
    queryKey: ['lessons', id],
    queryFn: () => detailLesson(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};