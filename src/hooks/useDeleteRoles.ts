import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeDeleteModal } from '../features/roleSlice';
import { DeleteRoleResponse } from '../types/admin/role/DeleteRoleTypes';
import { deleteRole } from '../api/roles.api';

export const useDeleteRoles = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  
  return useMutation<
    DeleteRoleResponse,
    ApiErrorType,
    { id: string }
  >({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['roles'], exact: false });
      dispatch(closeDeleteModal());
    },
  });
};
