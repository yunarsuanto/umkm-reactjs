import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { deleteUserRole } from '../api/user_role.api';
import { DeleteUserRoleSchema } from '../schemas/deleteUserRole.schema';
import { DeleteUserRoleResponse } from '../types/admin/user_role/DeleteUserRoleType';

export const useDeleteUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteUserRoleResponse, ApiErrorType, DeleteUserRoleSchema>({ 
    mutationFn: deleteUserRole,
    onSuccess: (_, variables) => {
      // queryClient.invalidateQueries({ queryKey: ['roles'] });
      if (variables.role_id) {
        queryClient.invalidateQueries({ queryKey: ['users', variables.user_id] });
      }
    },
  });
};