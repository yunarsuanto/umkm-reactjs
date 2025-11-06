import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeUpdateModal } from '../features/roleSlice';
import { UpdateRoleResponse } from '../types/admin/role/UpdateRoleTypes';
import { UpdateRoleSchema } from '../schemas/updateRole.schema';
import { updateRole } from '../api/roles.api';

export const useUpdateRoles = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<
    UpdateRoleResponse,
    ApiErrorType,
    UpdateRoleSchema & { id: string }
  >({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['roles'], exact: false });
      dispatch(closeUpdateModal());
    },
  });
};
