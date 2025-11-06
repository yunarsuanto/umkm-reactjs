import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getRole } from '../api/roles.api';
import { ApiErrorType } from '../types/ApiError';
import { GetRoleResponse } from '../types/admin/role/GetRoleTypes';
import { Pagination } from "../types/Pagination";

export const useRoles = (pagination: Pagination, options: {enabled: boolean}) => {
  return useQuery<GetRoleResponse, ApiErrorType>({
    queryKey: ['roles', pagination.page, pagination.limit, pagination.search],
    queryFn: () => getRole(pagination),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
