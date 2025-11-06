import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { detailRole } from '../api/roles.api';
import { ApiErrorType } from '../types/ApiError';
import { DetailRoleResponse } from '../types/admin/role/DetailRoleTypes';

export const useShowRole = (id: string, options?: { enabled?: boolean }) => {
  return useQuery<DetailRoleResponse, ApiErrorType>({
    queryKey: ['roles', id],
    queryFn: () => detailRole(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
