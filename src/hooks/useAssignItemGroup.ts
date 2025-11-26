import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeCreateModal } from '../features/userSlice';
import { assignItemGroup } from '@/api/lesson_items.api';
import { AddLessonGroupAssignItemSchema } from '@/schemas/addLessonGroupAssignItem.schema';
import { AssignItemGroupResponse } from '@/types/admin/lesson_item/AssignItemGroupTypes';

export const useAssignItemGroups = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation<AssignItemGroupResponse, ApiErrorType, AddLessonGroupAssignItemSchema>({ 
    mutationFn: assignItemGroup,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['lesson-groups'], exact: false });
      dispatch(closeCreateModal());
    },
  });
};