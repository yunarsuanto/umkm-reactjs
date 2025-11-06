import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePermission } from '../api/permissions.api';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeDeleteModal } from '../features/permissionSlice';
import { DeletePermissionResponse } from '../types/admin/permission/DeletePermissionTypes';

export const useDeletePermissions = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  
  return useMutation<
    DeletePermissionResponse,
    ApiErrorType,
    { id: string }
  >({
    mutationFn: deletePermission,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['permissions'], exact: false });
      dispatch(closeDeleteModal());
    },
  });
};
