import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { copyLesson } from '@/api/lessons.api';
import { CopyLessonResponse } from '@/types/admin/lesson/CopyLessonTypes';
import { CopyLessonSchema } from '@/schemas/copyLesson.schema';
import { setCopyModal } from '@/features/lessonSlice';

export const useCopyLessons = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  
  return useMutation<CopyLessonResponse, ApiErrorType, CopyLessonSchema>({ 
    mutationFn: copyLesson,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['lessons'], exact: false });
      dispatch(setCopyModal(false));
    },
  });
};
