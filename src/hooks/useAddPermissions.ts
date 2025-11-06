import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPermission } from '../api/permissions.api';
import { ApiErrorType } from '../types/ApiError';
import { AddPermissionSchema } from '../schemas/addPermission.schema';
import { useAppDispatch } from '../app/hooks';
import { closeCreateModal } from '../features/permissionSlice';
import { AddPermissionResponse } from '../types/admin/permission/AddPermissionTypes';

export const useAddPermissions = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation<AddPermissionResponse, ApiErrorType, AddPermissionSchema>({ 
    mutationFn: addPermission,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['permissions'], exact: false });
      dispatch(closeCreateModal());
    },
  });
};