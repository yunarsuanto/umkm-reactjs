import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiErrorType } from "../types/ApiError";
import { DetailCategoryLessonResponse } from "../types/admin/category_lesson/DetailCategoryLessonTypes";
import { detailCategoryLesson } from "../api/category_lessons.api";

export const useDetailCategoryLessons = (id: string, options?: { enabled?: boolean }) => {
  return useQuery<DetailCategoryLessonResponse, ApiErrorType>({
    queryKey: ['category-lessons', id],
    queryFn: () => detailCategoryLesson(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};