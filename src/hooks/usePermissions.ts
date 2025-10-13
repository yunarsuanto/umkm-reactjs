import { useQuery } from '@tanstack/react-query';
import { getPermissions } from '../api/permissions.api';
import { ApiErrorType } from '../types/ApiError';
import { GetPermissionResponse } from '../types/admin/permission/GetPermissionTypes';

export const usePermissions = () => {
  return useQuery<GetPermissionResponse, ApiErrorType>({
    queryKey: ['permissions'],
    queryFn: getPermissions,
  });
};
