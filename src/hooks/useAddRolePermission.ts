import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { AddRolePermissionResponse } from '../types/admin/role_permission/AddRolePermissionType';
import { AddRolePermissionSchema } from '../schemas/addRolePermission.schema';
import { addRolePermission, deleteRolePermission } from '../api/role_permission.api';
import { DeleteRolePermissionResponse } from '../types/admin/role_permission/DeleteRolePermissionType';
import { DeleteRolePermissionSchema } from '../schemas/deleteRolePermission.schema';

export const useAddRolePermission = () => {
  const queryClient = useQueryClient();
  return useMutation<AddRolePermissionResponse, ApiErrorType, AddRolePermissionSchema>({ 
    mutationFn: addRolePermission,
    onSuccess: (_, variables) => {
      // queryClient.invalidateQueries({ queryKey: ['roles'] });
      if (variables.role_id) {
        queryClient.invalidateQueries({ queryKey: ['roles', variables.role_id] });
      }
    },
  });
};

export const useDeleteRolePermission = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteRolePermissionResponse, ApiErrorType, DeleteRolePermissionSchema>({ 
    mutationFn: deleteRolePermission,
    onSuccess: (_, variables) => {
      // queryClient.invalidateQueries({ queryKey: ['roles'] });
      if (variables.role_id) {
        queryClient.invalidateQueries({ queryKey: ['roles', variables.role_id] });
      }
    },
  });
};