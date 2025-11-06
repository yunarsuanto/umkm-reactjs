import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { AddUserRoleResponse } from '../types/admin/user_role/AddUserRoleType';
import { AddUserRoleSchema } from '../schemas/addUserRole.schema';
import { addUserRole } from '../api/user_role.api';

export const useAddUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation<AddUserRoleResponse, ApiErrorType, AddUserRoleSchema>({ 
    mutationFn: addUserRole,
    onSuccess: (_, variables) => {
      // queryClient.invalidateQueries({ queryKey: ['roles'] });
      if (variables.role_id) {
        queryClient.invalidateQueries({ queryKey: ['users', variables.user_id] });
      }
    },
  });
};