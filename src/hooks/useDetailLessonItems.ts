import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiErrorType } from "../types/ApiError";
import { detailLessonItem } from "@/api/lesson_items.api";
import { DetailLessonItemResponse } from "@/types/admin/lesson_item/DetailLessonItemTypes";

export const useDetailLessonItems = (id: string, options?: { enabled?: boolean }) => {
  return useQuery<DetailLessonItemResponse, ApiErrorType>({
    queryKey: ['lesson-items', id],
    queryFn: () => detailLessonItem(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};