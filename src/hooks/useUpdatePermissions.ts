import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePermission } from '../api/permissions.api';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { UpdatePermissionSchema } from '../schemas/updatePermission.schema';
import { UpdatePermissionResponse } from '../types/admin/permission/UpdatePermissionTypes';
import { closeUpdateModal } from '../features/permission/permissionSlice';

export const useUpdatePermissions = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<
    UpdatePermissionResponse,
    ApiErrorType,
    UpdatePermissionSchema & { id: string }
  >({
    mutationFn: updatePermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      dispatch(closeUpdateModal());
    },
  });
};
