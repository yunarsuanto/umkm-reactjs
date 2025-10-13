import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPermissions } from '../api/permissions.api';
import { ApiErrorType } from '../types/ApiError';
import { AddPermissionSchema } from '../schemas/addPermission.schema';
import { useAppDispatch } from '../app/hooks';
import { closeCreateModal } from '../features/permission/permissionSlice';
import { AddPermissionResponse } from '../types/admin/permission/AddPermissionTypes';

export const useAddPermissions = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<AddPermissionResponse, ApiErrorType, AddPermissionSchema>({ 
    mutationFn: addPermissions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      dispatch(closeCreateModal());
    },
  });
};