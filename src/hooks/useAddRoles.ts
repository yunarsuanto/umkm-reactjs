import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeCreateModal } from '../features/roleSlice';
import { AddRoleResponse } from '../types/admin/role/AddRoleTypes';
import { AddRoleSchema } from '../schemas/addRole.schema';
import { addRole } from '../api/roles.api';

export const useAddRoles = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation<AddRoleResponse, ApiErrorType, AddRoleSchema>({ 
    mutationFn: addRole,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['roles'], exact: false });
      dispatch(closeCreateModal());
    },
  });
};