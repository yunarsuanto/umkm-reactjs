import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPermissions } from '../api/permissions.api';
import { ApiErrorType } from '../types/ApiError';
import { GetPermissionResponse } from '../types/admin/permission/GetPermissionTypes';
import { Pagination } from "../types/Pagination";

export const usePermissions = (pagination: Pagination, options: {enabled: boolean}) => {
  return useQuery<GetPermissionResponse, ApiErrorType>({
    queryKey: ['permissions', pagination.page, pagination.limit],
    queryFn: () => getPermissions(pagination),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
