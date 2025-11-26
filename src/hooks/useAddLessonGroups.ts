import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeCreateModal } from '../features/userSlice';
import { addLessonGroup } from '@/api/lesson_items.api';
import { AddLessonGroupSchema } from '@/schemas/addLessonGroup.schema';
import { AddLessonGroupResponse } from '@/types/admin/lesson_item/AddLessonGroupTypes';

export const useAddLessonGroups = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation<AddLessonGroupResponse, ApiErrorType, AddLessonGroupSchema>({ 
    mutationFn: addLessonGroup,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['lesson-groups'], exact: false });
      dispatch(closeCreateModal());
    },
  });
};